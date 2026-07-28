export type Season = "spring" | "summer" | "fall" | "winter";

export type CrowdLevel = "quiet" | "moderate" | "busy" | "very-busy";

export const CROWD_LABELS: Record<CrowdLevel, string> = {
  quiet: "Quiet",
  moderate: "Moderate",
  busy: "Busy",
  "very-busy": "Very busy",
};

export interface Park {
  id: string;
  name: string;
  state: string;
  /** Hot desert parks get a higher water/ice consumption multiplier. */
  isHotDesert: boolean;
  /** Coordinates of a representative campground area, used to look up live weather. */
  coordinates: { lat: number; lon: number };
  seasonalNotes: Partial<Record<Season, string>>;
  /** A park-wide note shown regardless of season (regulations, logistics). */
  generalNote: string;
  /**
   * Typical crowd level by month (1 = January ... 12 = December), based on general
   * historical visitation patterns. This is directional, not live or exact data.
   */
  crowdByMonth: Record<number, { level: CrowdLevel; note: string }>;
}

/** Maps a calendar month (1-12) to the meteorological season used for seasonalNotes. */
export function monthToSeason(month: number): Season {
  if (month === 12 || month <= 2) return "winter";
  if (month <= 5) return "spring";
  if (month <= 8) return "summer";
  return "fall";
}

export const PARKS: Park[] = [
  {
    id: "yosemite",
    name: "Yosemite National Park",
    state: "California",
    isHotDesert: false,
    coordinates: { lat: 37.7458, lon: -119.5936 },
    crowdByMonth: {
      1: { level: "quiet", note: "Cold, with some high-country roads closed for winter." },
      2: { level: "quiet", note: "Still cold; a quiet time to visit." },
      3: { level: "moderate", note: "Spring is starting to pick up visitors." },
      4: { level: "moderate", note: "Waterfalls are running and crowds are building." },
      5: { level: "busy", note: "Waterfalls peak and the weather warms up." },
      6: { level: "very-busy", note: "Summer peak season begins." },
      7: { level: "very-busy", note: "One of the busiest months of the year." },
      8: { level: "very-busy", note: "Still peak season, especially on weekends." },
      9: { level: "busy", note: "Crowds thin slightly after Labor Day." },
      10: { level: "moderate", note: "Fall colors draw some visitors, but it's calmer." },
      11: { level: "quiet", note: "Cold and quiet outside of the holiday weekend." },
      12: { level: "quiet", note: "Quiet aside from a holiday bump." },
    },
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
    coordinates: { lat: 36.6002, lon: -118.7311 },
    crowdByMonth: {
      1: { level: "quiet", note: "Snow closes many high-elevation areas." },
      2: { level: "quiet", note: "Still a quiet winter season." },
      3: { level: "moderate", note: "Lower elevations start seeing more visitors." },
      4: { level: "moderate", note: "Building toward the busier season." },
      5: { level: "busy", note: "Warmer weather brings more campers." },
      6: { level: "very-busy", note: "Summer peak season begins." },
      7: { level: "very-busy", note: "One of the busiest months of the year." },
      8: { level: "very-busy", note: "Still peak season, especially on weekends." },
      9: { level: "busy", note: "Crowds thin slightly after Labor Day." },
      10: { level: "moderate", note: "A calmer time to visit as fall sets in." },
      11: { level: "quiet", note: "Cold, with high-elevation roads closing." },
      12: { level: "quiet", note: "Quiet aside from a holiday bump." },
    },
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
    coordinates: { lat: 33.8734, lon: -115.901 },
    crowdByMonth: {
      1: { level: "busy", note: "Mild desert weather draws steady crowds." },
      2: { level: "busy", note: "One of the more popular months to visit." },
      3: {
        level: "very-busy",
        note: "Spring break and wildflower season — the busiest stretch of the year.",
      },
      4: { level: "busy", note: "Still very popular, with pleasant temperatures." },
      5: { level: "moderate", note: "Warming up; crowds start to ease." },
      6: { level: "quiet", note: "Heat keeps most visitors away." },
      7: { level: "quiet", note: "Genuinely dangerous heat — very few campers." },
      8: { level: "quiet", note: "Still extremely hot; a quiet month." },
      9: { level: "moderate", note: "Temperatures start to drop and visitors return." },
      10: { level: "busy", note: "Cooler weather brings crowds back." },
      11: { level: "busy", note: "A popular month with comfortable temperatures." },
      12: { level: "busy", note: "Holiday crowds plus mild weather." },
    },
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
    coordinates: { lat: 36.4622, lon: -116.8958 },
    crowdByMonth: {
      1: { level: "busy", note: "Mild temperatures make this a popular month." },
      2: { level: "busy", note: "One of the more popular times to visit." },
      3: { level: "very-busy", note: "Wildflower blooms in good years draw big crowds." },
      4: { level: "moderate", note: "Warming up; crowds start to ease." },
      5: { level: "quiet", note: "Heat is climbing and visitors thin out." },
      6: {
        level: "quiet",
        note: "Among the hottest places on Earth this time of year — very few campers.",
      },
      7: { level: "quiet", note: "Dangerously hot; camping isn't recommended." },
      8: { level: "quiet", note: "Still extreme heat; a very quiet month." },
      9: { level: "moderate", note: "Temperatures start to ease and visitors return." },
      10: { level: "moderate", note: "A pleasant, moderately busy month." },
      11: { level: "busy", note: "Cooler weather brings crowds back." },
      12: { level: "busy", note: "A popular month with mild daytime temperatures." },
    },
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
    coordinates: { lat: 37.2982, lon: -113.0263 },
    crowdByMonth: {
      1: { level: "quiet", note: "Cold and quiet, with occasional icy conditions." },
      2: { level: "quiet", note: "Still a quiet winter season." },
      3: { level: "moderate", note: "Crowds start to build as the weather warms." },
      4: { level: "busy", note: "A popular month with mild weather." },
      5: { level: "very-busy", note: "Summer peak season begins." },
      6: { level: "very-busy", note: "One of the busiest months of the year." },
      7: { level: "very-busy", note: "Peak season, hot in the canyon." },
      8: { level: "very-busy", note: "Still peak season, with monsoon storm risk." },
      9: { level: "busy", note: "Crowds ease slightly after summer." },
      10: { level: "busy", note: "A popular month with pleasant temperatures." },
      11: { level: "moderate", note: "Cooler weather and thinner crowds." },
      12: { level: "quiet", note: "Cold and quiet outside the holidays." },
    },
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
