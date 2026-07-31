import type { ComponentType, SVGProps } from "react";
import type { Hotspot } from "../hotspot-diagram";
import { TentDiagram, TENT_HOTSPOTS } from "./tent-diagram";
import { SleepingBagDiagram, SLEEPING_BAG_HOTSPOTS } from "./sleeping-bag-diagram";
import { CampStoveDiagram, CAMP_STOVE_HOTSPOTS } from "./camp-stove-diagram";
import { WaterFilterDiagram, WATER_FILTER_HOTSPOTS } from "./water-filter-diagram";
import { IceAxeDiagram, ICE_AXE_HOTSPOTS } from "./ice-axe-diagram";
import { BackpackingPackDiagram, BACKPACKING_PACK_HOTSPOTS } from "./backpacking-pack-diagram";

interface DiagramEntry {
  Diagram: ComponentType<SVGProps<SVGSVGElement>>;
  hotspots: Hotspot[];
  /** Must match the SVG's viewBox width/height ratio, or hotspot dots will misalign. */
  aspectRatio: number;
}

/**
 * Maps a gear item's id (from src/data/gear.ts) to a labeled hotspot diagram.
 * Only items where "explore the parts" genuinely teaches something get one —
 * not every gear item needs an interactive diagram.
 */
export const GEAR_DIAGRAMS: Partial<Record<string, DiagramEntry>> = {
  tent: { Diagram: TentDiagram, hotspots: TENT_HOTSPOTS, aspectRatio: 320 / 210 },
  "sleeping-bag": {
    Diagram: SleepingBagDiagram,
    hotspots: SLEEPING_BAG_HOTSPOTS,
    aspectRatio: 200 / 300,
  },
  "camp-stove-fuel": {
    Diagram: CampStoveDiagram,
    hotspots: CAMP_STOVE_HOTSPOTS,
    aspectRatio: 260 / 240,
  },
  "backup-filter": {
    Diagram: WaterFilterDiagram,
    hotspots: WATER_FILTER_HOTSPOTS,
    aspectRatio: 280 / 220,
  },
  "ice-axe": { Diagram: IceAxeDiagram, hotspots: ICE_AXE_HOTSPOTS, aspectRatio: 140 / 300 },
  "backpacking-pack": {
    Diagram: BackpackingPackDiagram,
    hotspots: BACKPACKING_PACK_HOTSPOTS,
    aspectRatio: 220 / 300,
  },
};
