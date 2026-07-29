import {
  Armchair,
  Droplet,
  FileCheck,
  Flame,
  Moon,
  Shirt,
  ShieldAlert,
  Sparkles,
  Tent,
  Utensils,
  type LucideIcon,
} from "lucide-react";

import type { GearCategory } from "@/data/gear";

export const CATEGORY_ICONS: Record<GearCategory, LucideIcon> = {
  permits: FileCheck,
  shelter: Tent,
  sleep: Moon,
  water: Droplet,
  food: Utensils,
  cooking: Flame,
  clothing: Shirt,
  toiletries: Sparkles,
  "camp-comfort": Armchair,
  safety: ShieldAlert,
};
