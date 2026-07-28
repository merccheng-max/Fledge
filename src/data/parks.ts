export type Season = "spring" | "summer" | "fall" | "winter";

export interface Park {
  id: string;
  name: string;
  state: string;
  /** Hot desert parks get a higher water/ice consumption multiplier. */
  isHotDesert: boolean;
  seasonalNotes: Partial<Record<Season, string>>;
  /** A park-wide note shown regardless of season (regulations, logistics). */
  generalNote: string;
}

export const PARKS: Park[] = [
  {
    id: "yosemite",
    name: "Yosemite National Park",
    state: "California",
    isHotDesert: false,
    seasonalNotes: {
      spring:
        "Waterfalls are at their best, but trails at higher elevations can still be snow-covered.",
      summer:
        "Afternoon thunderstorms are common in the high country — pack rain gear even if the morning looks clear.",
      fall: "Nights start dropping toward freezing at elevation once October hits.",
      winter: "Some roads and campgrounds close seasonally — check conditions before you go.",
    },
    generalNote:
      "Bear canisters or use of the provided bear lockers are legally required at every campsite. Rangers actively enforce this.",
  },
  {
    id: "sequoia-kings-canyon",
    name: "Sequoia & Kings Canyon National Parks",
    state: "California",
    isHotDesert: false,
    seasonalNotes: {
      spring: "Lower elevations are pleasant; higher trails can still have snow into early summer.",
      summer: "Afternoon thunderstorms are common at elevation — plan camp setup for the morning.",
      fall: "Nights get cold fast once you're above 6,000 ft, even on warm days.",
      winter: "Many high-elevation roads close; stick to lower-elevation campgrounds.",
    },
    generalNote:
      "Bear canisters or bear lockers are required here too, same as Yosemite — improperly stored food is both a safety risk and a citable offense.",
  },
  {
    id: "joshua-tree",
    name: "Joshua Tree National Park",
    state: "California",
    isHotDesert: true,
    seasonalNotes: {
      spring: "The most popular season — book campsites well in advance.",
      summer:
        "Daytime highs regularly exceed 100°F. This is a genuinely risky season to camp here without a serious water plan.",
      fall: "Warm days, but nights can drop near freezing — the classic desert temperature swing beginners underestimate.",
      winter: "Mild, sunny days and genuinely cold nights.",
    },
    generalNote:
      "There's no potable water at most campsites — bring every gallon you'll need with you.",
  },
  {
    id: "death-valley",
    name: "Death Valley National Park",
    state: "California",
    isHotDesert: true,
    seasonalNotes: {
      spring: "Popular and pleasant — book ahead.",
      summer:
        "Among the hottest places on Earth. Car camping here in summer isn't recommended for beginners.",
      fall: "Still warm during the day, cold once the sun drops.",
      winter: "The best season to visit — mild days, cold nights.",
    },
    generalNote:
      "Gas stations (and EV chargers especially) are sparse and far apart. Plan your fuel or charging stops before you enter the park, not after.",
  },
  {
    id: "zion",
    name: "Zion National Park",
    state: "Utah",
    isHotDesert: false,
    seasonalNotes: {
      spring: "Can be busy with unpredictable weather swings — pack for both warm and cold.",
      summer: "Hot in the canyon during the day; flash flood risk in narrow areas during storms.",
      fall: "Pleasant days, cool nights.",
      winter: "Cold, sometimes icy — check trail and road conditions before you go.",
    },
    generalNote:
      "Some campgrounds require reservations months in advance — don't assume you can book last minute.",
  },
];

export function getParkById(id: string): Park | undefined {
  return PARKS.find((park) => park.id === id);
}
