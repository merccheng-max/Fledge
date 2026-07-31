import { computeWater } from "@/data/checklist-engine";
import { getGearById } from "@/data/gear";
import { estimateColdestNightF, getParkById, type Park } from "@/data/parks";

export interface FitScoreInput {
  parkId: string;
  startDate: string;
  days: number;
  groupSize: number;
  itemId: string;
  /** Raw key/value spec pairs scraped from the product page, keys as-labeled by the retailer. */
  specs: Record<string, string>;
}

export interface FitScoreResult {
  itemName: string;
  /** null when this item doesn't have a scoring rule yet — shown as "not enough to score" rather than faked. */
  score: number | null;
  verdict: string;
  reasons: string[];
  commonlyMissed: boolean;
}

function findSpecValue(specs: Record<string, string>, keywords: string[]): string | undefined {
  const entry = Object.entries(specs).find(([key]) =>
    keywords.some((keyword) => key.toLowerCase().includes(keyword)),
  );
  return entry?.[1];
}

function extractNumber(value: string | undefined): number | undefined {
  if (!value) return undefined;
  const match = value.match(/-?\d+(\.\d+)?/);
  return match ? Number(match[0]) : undefined;
}

function clampScore(score: number): number {
  return Math.max(0, Math.min(100, Math.round(score)));
}

function scoreTent(specs: Record<string, string>, groupSize: number, coldestNightF: number) {
  const reasons: string[] = [];
  let score = 20; // baseline for having a scoreable product at all

  const capacity = extractNumber(findSpecValue(specs, ["capacity", "person", "sleeps"]));
  if (capacity !== undefined) {
    if (capacity >= groupSize && capacity <= groupSize + 1) {
      score += 40;
      reasons.push(`Fits your group of ${groupSize} well (rated for ${capacity}).`);
    } else if (capacity >= groupSize) {
      score += 28;
      reasons.push(
        `Rated for ${capacity}, more than your group of ${groupSize} — comfortable but heavier/pricier than needed.`,
      );
    } else {
      score += 5;
      reasons.push(`Rated for ${capacity}, which is under your group size of ${groupSize}.`);
    }
  } else {
    reasons.push("Couldn't find a capacity rating on this page to check against your group size.");
  }

  const seasonText = findSpecValue(specs, ["season"]) ?? "";
  const seasonRating = extractNumber(seasonText);
  const needsFourSeason = coldestNightF <= 20;
  if (seasonRating !== undefined) {
    if (needsFourSeason && seasonRating < 4) {
      score += 10;
      reasons.push(
        `This trip's coldest expected night (~${coldestNightF}°F) really calls for a 4-season tent — this one's rated ${seasonRating}-season.`,
      );
    } else {
      score += 30;
      reasons.push(`${seasonRating}-season rating fits the conditions on this trip.`);
    }
  } else {
    reasons.push("No season rating found on the page.");
  }

  return { score: clampScore(score), reasons };
}

function scoreSleepingBag(specs: Record<string, string>, coldestNightF: number) {
  const reasons: string[] = [];
  let score = 20;

  const tempRating = extractNumber(findSpecValue(specs, ["temperature", "temp rating", "rating"]));
  if (tempRating !== undefined) {
    const margin = coldestNightF - tempRating;
    if (margin >= 10) {
      score += 70;
      reasons.push(
        `Rated to ${tempRating}°F, comfortably below this trip's estimated coldest night (~${coldestNightF}°F).`,
      );
    } else if (margin >= 0) {
      score += 50;
      reasons.push(
        `Rated to ${tempRating}°F — close to this trip's estimated coldest night (~${coldestNightF}°F). Fine, but a liner is worth adding.`,
      );
    } else {
      score += 10;
      reasons.push(
        `Rated to ${tempRating}°F, which is warmer than this trip's estimated coldest night (~${coldestNightF}°F) — you'd likely be cold.`,
      );
    }
  } else {
    reasons.push("Couldn't find a temperature rating on this page.");
  }

  return { score: clampScore(score), reasons };
}

function scoreWaterContainers(
  specs: Record<string, string>,
  input: { days: number; groupSize: number },
  park: Park,
) {
  const reasons: string[] = [];
  let score = 20;

  const required = computeWater({ parkId: park.id, ...input, startDate: "" }, park.isHotDesert);
  const requiredGallons = extractNumber(required.total);

  const capacityRaw = findSpecValue(specs, ["capacity", "volume", "size"]);
  const capacityGal = extractNumber(capacityRaw);
  const isLiters =
    capacityRaw?.toLowerCase().includes("liter") || capacityRaw?.toLowerCase().includes(" l");
  const normalizedGal =
    capacityGal !== undefined && isLiters ? capacityGal * 0.264172 : capacityGal;

  if (normalizedGal !== undefined && requiredGallons !== undefined) {
    const ratio = normalizedGal / requiredGallons;
    if (ratio >= 1) {
      score += 80;
      reasons.push(
        `Holds roughly ${normalizedGal.toFixed(1)} gal, covering your trip's ${required.total} requirement on its own.`,
      );
    } else if (ratio >= 0.5) {
      score += 55;
      reasons.push(
        `Holds roughly ${normalizedGal.toFixed(1)} gal — you'll need at least one more of these (or a bigger one) to cover ${required.total}.`,
      );
    } else {
      score += 25;
      reasons.push(
        `Holds roughly ${normalizedGal.toFixed(1)} gal — well short of this trip's ${required.total} requirement on its own; plan on multiple containers.`,
      );
    }
  } else {
    reasons.push(
      `Couldn't find a clear capacity to compare against this trip's ${required.total} requirement.`,
    );
  }

  return { score: clampScore(score), reasons };
}

function scoreCooler(specs: Record<string, string>, input: { days: number; groupSize: number }) {
  const reasons: string[] = [];
  let score = 20;

  const recommendedQt = input.groupSize * input.days * 6;
  const capacityQt = extractNumber(findSpecValue(specs, ["quart", "capacity", "size"]));

  if (capacityQt !== undefined) {
    const ratio = capacityQt / recommendedQt;
    if (ratio >= 1) {
      score += 70;
      reasons.push(
        `~${capacityQt}qt comfortably covers a rough ${recommendedQt}qt baseline for ${input.groupSize} people over ${input.days} day(s).`,
      );
    } else if (ratio >= 0.7) {
      score += 45;
      reasons.push(
        `~${capacityQt}qt is a bit under a rough ${recommendedQt}qt baseline for this trip — workable with more frequent ice restocks.`,
      );
    } else {
      score += 15;
      reasons.push(
        `~${capacityQt}qt is notably under a rough ${recommendedQt}qt baseline for ${input.groupSize} people over ${input.days} day(s).`,
      );
    }
  } else {
    reasons.push("Couldn't find a quart/capacity spec on this page.");
  }

  return { score: clampScore(score), reasons };
}

function scoreRainShell(specs: Record<string, string>, park: Park, season: string) {
  const reasons: string[] = [];
  let score = 30;

  const stormRisk = season === "summer" && !park.isHotDesert;
  const waterproofRaw = findSpecValue(specs, ["waterproof", "water resistance", "mm"]);
  const rating = extractNumber(waterproofRaw);

  if (rating !== undefined) {
    const threshold = stormRisk ? 10000 : 5000;
    if (rating >= threshold) {
      score += 60;
      reasons.push(
        `${rating}mm waterproof rating comfortably clears the ${threshold.toLocaleString()}mm bar this trip's storm risk calls for.`,
      );
    } else {
      score += 25;
      reasons.push(
        `${rating}mm waterproof rating is under the ${threshold.toLocaleString()}mm this trip's storm risk calls for.`,
      );
    }
  } else {
    score += 20;
    reasons.push("No waterproof rating found — treat this as a rough check, not a precise one.");
  }

  if (stormRisk) {
    reasons.push(
      "Afternoon thunderstorms are common for this park in summer — don't skip this layer.",
    );
  }

  return { score: clampScore(score), reasons };
}

const SCORERS = new Set(["tent", "sleeping-bag", "water-containers", "cooler", "rain-shell"]);

export function isScorable(itemId: string): boolean {
  return SCORERS.has(itemId);
}

export function scoreFit(input: FitScoreInput): FitScoreResult {
  const item = getGearById(input.itemId);
  const park = getParkById(input.parkId);

  if (!item || !park) {
    return {
      itemName: item?.name ?? input.itemId,
      score: null,
      verdict: "Couldn't score this — unknown item or park.",
      reasons: [],
      commonlyMissed: item?.commonlyMissed ?? false,
    };
  }

  const arrivalDate = new Date(`${input.startDate}T00:00:00`);
  const month = Number.isNaN(arrivalDate.getTime())
    ? new Date().getMonth() + 1
    : arrivalDate.getMonth() + 1;
  const coldestNightF = estimateColdestNightF(park, month);
  const tripInput = { days: input.days, groupSize: input.groupSize };

  let result: { score: number; reasons: string[] } | undefined;

  switch (input.itemId) {
    case "tent":
      result = scoreTent(input.specs, input.groupSize, coldestNightF);
      break;
    case "sleeping-bag":
      result = scoreSleepingBag(input.specs, coldestNightF);
      break;
    case "water-containers":
      result = scoreWaterContainers(input.specs, tripInput, park);
      break;
    case "cooler":
      result = scoreCooler(input.specs, tripInput);
      break;
    case "rain-shell": {
      const seasonKey =
        month === 12 || month <= 2
          ? "winter"
          : month <= 5
            ? "spring"
            : month <= 8
              ? "summer"
              : "fall";
      result = scoreRainShell(input.specs, park, seasonKey);
      break;
    }
    default:
      result = undefined;
  }

  if (!result) {
    return {
      itemName: item.name,
      score: null,
      verdict: "No fit-scoring rule for this item yet — check it against the checklist manually.",
      reasons: [],
      commonlyMissed: item.commonlyMissed ?? false,
    };
  }

  const verdict =
    result.score >= 75
      ? "Strong fit for this trip"
      : result.score >= 50
        ? "Workable, with caveats"
        : "Weak fit for this trip";

  return {
    itemName: item.name,
    score: result.score,
    verdict,
    reasons: result.reasons,
    commonlyMissed: item.commonlyMissed ?? false,
  };
}
