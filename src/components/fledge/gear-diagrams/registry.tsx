import type { ComponentType, SVGProps } from "react";
import type { Hotspot } from "../hotspot-diagram";
import { TentDiagram, TENT_HOTSPOTS } from "./tent-diagram";
import { SleepingBagDiagram, SLEEPING_BAG_HOTSPOTS } from "./sleeping-bag-diagram";
import { CampStoveDiagram, CAMP_STOVE_HOTSPOTS } from "./camp-stove-diagram";
import { WaterFilterDiagram, WATER_FILTER_HOTSPOTS } from "./water-filter-diagram";

interface DiagramEntry {
  Diagram: ComponentType<SVGProps<SVGSVGElement>>;
  hotspots: Hotspot[];
}

/**
 * Maps a gear item's id (from src/data/gear.ts) to a labeled hotspot diagram.
 * Only items where "explore the parts" genuinely teaches something get one —
 * not every gear item needs an interactive diagram.
 */
export const GEAR_DIAGRAMS: Partial<Record<string, DiagramEntry>> = {
  tent: { Diagram: TentDiagram, hotspots: TENT_HOTSPOTS },
  "sleeping-bag": { Diagram: SleepingBagDiagram, hotspots: SLEEPING_BAG_HOTSPOTS },
  "camp-stove-fuel": { Diagram: CampStoveDiagram, hotspots: CAMP_STOVE_HOTSPOTS },
  "backup-filter": { Diagram: WaterFilterDiagram, hotspots: WATER_FILTER_HOTSPOTS },
};
