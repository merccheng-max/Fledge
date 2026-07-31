import {
  CATEGORY_ORDER,
  GEAR_CATALOG,
  type ActivityType,
  type GearCategory,
  type GearItem,
} from "./gear";
import { getParkById } from "./parks";

export interface TripInput {
  parkId: string;
  /** ISO date (YYYY-MM-DD) of arrival. */
  startDate: string;
  days: number;
  groupSize: number;
  activity: ActivityType;
}

export interface ComputedQuantity {
  /** Short human-readable total, e.g. "24 gal total" */
  total: string;
  /** The math shown, e.g. "2 gal/person/day × 3 days × 4 people (hot desert park)" */
  formula: string;
}

export interface ChecklistItem extends GearItem {
  quantity?: ComputedQuantity;
}

export interface ChecklistCategoryGroup {
  category: GearCategory;
  items: ChecklistItem[];
}

export interface Checklist {
  categories: ChecklistCategoryGroup[];
}

export function computeWater(input: TripInput, isHotDesert: boolean): ComputedQuantity {
  const baseRate = isHotDesert ? 2 : 1;
  const exertionBump = input.activity !== "camping" ? 0.5 : 0;
  const rate = baseRate + exertionBump;
  const total = rate * input.days * input.groupSize;
  const notes = [
    isHotDesert && "bumped up for a hot desert park",
    exertionBump > 0 && "bumped up for on-foot exertion",
  ].filter(Boolean);
  return {
    total: `${total} gal total`,
    formula: `${rate} gal/person/day × ${input.days} day${input.days === 1 ? "" : "s"} × ${input.groupSize} people${
      notes.length ? ` (${notes.join(", ")})` : ""
    }`,
  };
}

function computeFood(input: TripInput): ComputedQuantity {
  const rate = 2;
  const total = rate * input.days * input.groupSize;
  return {
    total: `~${total} lbs total`,
    formula: `${rate} lbs/person/day × ${input.days} day${input.days === 1 ? "" : "s"} × ${input.groupSize} people`,
  };
}

function computeIce(input: TripInput, isHotDesert: boolean): ComputedQuantity {
  const restockInterval = isHotDesert ? 1 : 2;
  const bags = Math.max(1, Math.ceil(input.days / restockInterval));
  return {
    total: `~${bags} bag${bags === 1 ? "" : "s"}`,
    formula: `restock roughly every ${restockInterval} day${restockInterval === 1 ? "" : "s"}${
      isHotDesert ? " (hot desert park loses ice fast)" : ""
    } over ${input.days} day${input.days === 1 ? "" : "s"}`,
  };
}

export function generateChecklist(input: TripInput): Checklist {
  const park = getParkById(input.parkId);
  const isHotDesert = park?.isHotDesert ?? false;

  const forActivity = GEAR_CATALOG.filter((item) => item.activities.includes(input.activity));

  const withQuantities: ChecklistItem[] = forActivity.map((item) => {
    if (!item.hasComputedQuantity) return item;

    let quantity: ComputedQuantity | undefined;
    if (item.id === "drinking-water") quantity = computeWater(input, isHotDesert);
    else if (item.id === "food-supply") quantity = computeFood(input);
    else if (item.id === "ice") quantity = computeIce(input, isHotDesert);

    return { ...item, quantity };
  });

  const categories: ChecklistCategoryGroup[] = CATEGORY_ORDER.map((category) => ({
    category,
    items: withQuantities.filter((item) => item.category === category),
  })).filter((group) => group.items.length > 0);

  return { categories };
}
