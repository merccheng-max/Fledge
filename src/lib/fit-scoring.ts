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

  const required = computeWater(
    { parkId: park.id, ...input, startDate: "", activity: "camping" },
    park.isHotDesert,
  );
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

function scoreSleepingPad(specs: Record<string, string>, coldestNightF: number) {
  const reasons: string[] = [];
  let score = 25;

  const rValue = extractNumber(findSpecValue(specs, ["r-value", "r value", "insulation rating"]));
  // Rough, widely-cited backpacking guideline: R 1-2 for summer, 3-4 for shoulder-season,
  // 5+ for real winter cold. Same "directional, not exact science" honesty as elsewhere.
  const neededR = coldestNightF <= 20 ? 5 : coldestNightF <= 32 ? 3.5 : coldestNightF <= 45 ? 2 : 1;

  if (rValue !== undefined) {
    if (rValue >= neededR) {
      score += 65;
      reasons.push(
        `R-value ${rValue} covers the ~R-${neededR} this trip's estimated coldest night (~${coldestNightF}°F) calls for.`,
      );
    } else if (rValue >= neededR - 1) {
      score += 40;
      reasons.push(
        `R-value ${rValue} is close to the ~R-${neededR} this trip calls for — workable, but you'll feel the ground on the coldest night.`,
      );
    } else {
      score += 10;
      reasons.push(
        `R-value ${rValue} is well under the ~R-${neededR} this trip's estimated coldest night (~${coldestNightF}°F) calls for.`,
      );
    }
  } else {
    reasons.push(
      "Couldn't find an R-value on this page — insulation is hard to judge without one.",
    );
  }

  return { score: clampScore(score), reasons };
}

function scoreInsulatingLayer(specs: Record<string, string>, coldestNightF: number) {
  const reasons: string[] = [];
  let score = 25;

  const fillPower = extractNumber(findSpecValue(specs, ["fill power"]));
  const fillWeight = extractNumber(findSpecValue(specs, ["fill weight", "insulation weight"]));

  if (fillPower !== undefined) {
    const neededFillPower = coldestNightF <= 20 ? 700 : coldestNightF <= 32 ? 600 : 500;
    if (fillPower >= neededFillPower) {
      score += 65;
      reasons.push(
        `${fillPower}-fill down is warm enough for this trip's estimated coldest night (~${coldestNightF}°F).`,
      );
    } else {
      score += 25;
      reasons.push(
        `${fillPower}-fill down is on the lighter side for this trip's estimated coldest night (~${coldestNightF}°F) — layer it under a shell.`,
      );
    }
  } else if (fillWeight !== undefined) {
    const neededGrams = coldestNightF <= 20 ? 150 : coldestNightF <= 32 ? 100 : 60;
    if (fillWeight >= neededGrams) {
      score += 60;
      reasons.push(
        `${fillWeight}g synthetic insulation is a reasonable match for this trip's estimated coldest night (~${coldestNightF}°F).`,
      );
    } else {
      score += 25;
      reasons.push(
        `${fillWeight}g synthetic insulation is light for this trip's estimated coldest night (~${coldestNightF}°F).`,
      );
    }
  } else {
    reasons.push(
      "Couldn't find a fill power or insulation weight on this page — treat this as a rough check.",
    );
  }

  return { score: clampScore(score), reasons };
}

function scoreBackpackingPack(specs: Record<string, string>, days: number) {
  const reasons: string[] = [];
  let score = 25;

  const capacityRaw = findSpecValue(specs, ["capacity", "volume", "liter"]);
  const capacityL = extractNumber(capacityRaw);
  // Rough backpacking guideline: ~30-50L for 1-3 days, ~50-70L for 4-7 days, 70L+ beyond that.
  const recommendedL = days <= 3 ? 40 : days <= 7 ? 60 : 75;

  if (capacityL !== undefined) {
    const ratio = capacityL / recommendedL;
    if (ratio >= 0.85 && ratio <= 1.3) {
      score += 65;
      reasons.push(
        `~${capacityL}L is a good match for a ${days}-day trip (rough baseline: ~${recommendedL}L).`,
      );
    } else if (ratio < 0.85) {
      score += 25;
      reasons.push(
        `~${capacityL}L is smaller than the rough ~${recommendedL}L baseline for a ${days}-day trip — fine if you pack light, tight otherwise.`,
      );
    } else {
      score += 40;
      reasons.push(
        `~${capacityL}L is bigger than the rough ~${recommendedL}L baseline for a ${days}-day trip — more room than you likely need.`,
      );
    }
  } else {
    reasons.push(`Couldn't find a liter capacity to compare against a ${days}-day trip's needs.`);
  }

  return { score: clampScore(score), reasons };
}

function scoreMountaineeringBoots(specs: Record<string, string>, coldestNightF: number) {
  const reasons: string[] = [];
  let score = 25;

  const tempRating = extractNumber(
    findSpecValue(specs, ["temperature rating", "comfort rating", "insulation rating"]),
  );

  if (tempRating !== undefined) {
    const margin = coldestNightF - tempRating;
    if (margin >= 10) {
      score += 65;
      reasons.push(
        `Rated to ${tempRating}°F, comfortably below this trip's estimated coldest conditions (~${coldestNightF}°F).`,
      );
    } else if (margin >= -5) {
      score += 40;
      reasons.push(
        `Rated to ${tempRating}°F — close to this trip's estimated coldest conditions (~${coldestNightF}°F).`,
      );
    } else {
      score += 10;
      reasons.push(
        `Rated to ${tempRating}°F, warmer than this trip's estimated coldest conditions (~${coldestNightF}°F) — likely too light.`,
      );
    }
  } else {
    reasons.push(
      "Couldn't find a temperature/comfort rating on this page — confirm it against your route's conditions manually.",
    );
  }

  return { score: clampScore(score), reasons };
}

const SCORERS = new Set([
  "tent",
  "sleeping-bag",
  "water-containers",
  "cooler",
  "rain-shell",
  "sleeping-pad",
  "insulating-layer",
  "backpacking-pack",
  "mountaineering-boots",
]);

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
    case "sleeping-pad":
      result = scoreSleepingPad(input.specs, coldestNightF);
      break;
    case "insulating-layer":
      result = scoreInsulatingLayer(input.specs, coldestNightF);
      break;
    case "backpacking-pack":
      result = scoreBackpackingPack(input.specs, input.days);
      break;
    case "mountaineering-boots":
      result = scoreMountaineeringBoots(input.specs, coldestNightF);
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
