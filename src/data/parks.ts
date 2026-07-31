import type { ActivityType } from "./gear";

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
  /** Which activities this park's own data actually supports — avoids offering, say, mountaineering somewhere with no real technical peaks. */
  supportedActivities: ActivityType[];
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
    supportedActivities: ["camping", "hiking", "backpacking", "mountaineering"],
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
    supportedActivities: ["camping", "hiking", "backpacking", "mountaineering"],
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
    supportedActivities: ["camping", "hiking", "backpacking"],
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
    supportedActivities: ["camping", "hiking", "backpacking"],
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
    supportedActivities: ["camping", "hiking", "backpacking"],
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
  {
    id: "grand-canyon",
    name: "Grand Canyon National Park",
    state: "Arizona",
    isHotDesert: true,
    supportedActivities: ["camping", "hiking", "backpacking"],
    coordinates: { lat: 36.0544, lon: -112.1401 },
    crowdByMonth: {
      1: { level: "quiet", note: "Cold on the rim, and the North Rim is closed for winter." },
      2: { level: "quiet", note: "Still a quiet, cold month." },
      3: { level: "moderate", note: "Spring break brings the first real bump in visitors." },
      4: { level: "busy", note: "Warming up, with the North Rim reopening mid-May." },
      5: { level: "busy", note: "Pleasant rim temperatures draw steady crowds." },
      6: { level: "very-busy", note: "Summer peak season begins." },
      7: { level: "very-busy", note: "One of the busiest months of the year." },
      8: { level: "very-busy", note: "Still peak season, with monsoon storm risk." },
      9: { level: "busy", note: "Crowds ease slightly after Labor Day." },
      10: { level: "moderate", note: "A pleasant, calmer month, until the North Rim closes." },
      11: { level: "quiet", note: "Cold, with the North Rim closed for the season." },
      12: { level: "quiet", note: "Quiet aside from a holiday bump on the South Rim." },
    },
    seasonalNotes: {
      spring:
        "Rim temperatures are pleasant, but the inner canyon warms up fast — layers matter on any rim-to-river hike.",
      summer:
        "Inner canyon temperatures regularly exceed 100°F even though the rim feels mild — this gap catches people off guard on any hike below the rim.",
      fall: "Comfortable rim days, cold nights, and a good time to avoid summer canyon heat.",
      winter: "The North Rim closes entirely; the South Rim stays open but can see snow and ice.",
    },
    generalNote:
      "The rim-to-river temperature swing is the single biggest risk here — a mild rim morning can mean dangerous heat at the bottom of the canyon by midday.",
  },
  {
    id: "yellowstone",
    name: "Yellowstone National Park",
    state: "Wyoming",
    isHotDesert: false,
    supportedActivities: ["camping", "hiking", "backpacking"],
    coordinates: { lat: 44.428, lon: -110.5885 },
    crowdByMonth: {
      1: {
        level: "quiet",
        note: "Most roads close to regular vehicles; snowcoach/ski season only.",
      },
      2: { level: "quiet", note: "Still deep winter access only." },
      3: { level: "quiet", note: "Roads are still largely closed as snow lingers." },
      4: { level: "moderate", note: "Spring plowing opens roads gradually." },
      5: { level: "busy", note: "Most park roads reopen and visitation climbs fast." },
      6: { level: "very-busy", note: "Summer peak season begins." },
      7: { level: "very-busy", note: "One of the busiest months of the year." },
      8: { level: "very-busy", note: "Still peak season, especially around geyser basins." },
      9: { level: "busy", note: "Crowds ease and wildlife activity picks up." },
      10: { level: "moderate", note: "Cooling fast, with some facilities starting to close." },
      11: { level: "quiet", note: "Most roads close to regular vehicles for winter." },
      12: { level: "quiet", note: "Winter access only." },
    },
    seasonalNotes: {
      spring:
        "Muddy trails and unpredictable snow at higher elevations even as lower valleys green up.",
      summer:
        "Afternoon thunderstorms are common, and nights stay cold even on hot days given the elevation.",
      fall: "Cold nights arrive early here — often near freezing well before the calendar says so.",
      winter: "Most interior roads close to cars entirely; this isn't a car-camping season here.",
    },
    generalNote:
      "This is bear country in the fullest sense — proper food storage isn't optional, and it's enforced with real citations, not just a suggestion.",
  },
  {
    id: "rocky-mountain",
    name: "Rocky Mountain National Park",
    state: "Colorado",
    isHotDesert: false,
    supportedActivities: ["camping", "hiking", "backpacking", "mountaineering"],
    coordinates: { lat: 40.3428, lon: -105.6836 },
    crowdByMonth: {
      1: { level: "quiet", note: "Cold, with Trail Ridge Road closed for winter." },
      2: { level: "quiet", note: "Still a quiet winter season." },
      3: { level: "moderate", note: "Lower elevations start seeing more visitors." },
      4: { level: "moderate", note: "Building toward the busier season." },
      5: {
        level: "busy",
        note: "Warmer weather brings more visitors, though high country is still snowed in.",
      },
      6: { level: "very-busy", note: "Trail Ridge Road reopens and summer peak season begins." },
      7: {
        level: "very-busy",
        note: "One of the busiest months of the year — timed entry is common.",
      },
      8: { level: "very-busy", note: "Still peak season, especially on weekends." },
      9: {
        level: "busy",
        note: "Crowds thin slightly as elk rutting season draws its own visitors.",
      },
      10: { level: "moderate", note: "A calmer time to visit before Trail Ridge Road closes." },
      11: { level: "quiet", note: "Cold, with high-elevation roads closing for winter." },
      12: { level: "quiet", note: "Quiet aside from a holiday bump." },
    },
    seasonalNotes: {
      spring:
        "Lower trails are pleasant; anything near treeline can still hold snow into early summer.",
      summer:
        "Classic Rockies pattern — clear mornings, afternoon thunderstorms, and real lightning risk above treeline.",
      fall: "Nights drop below freezing fast at elevation, even during warm afternoons.",
      winter:
        "Trail Ridge Road closes; high-country routes require real winter mountaineering skills, not casual hiking.",
    },
    generalNote:
      "Afternoon thunderstorms are dangerous above treeline — the standard local advice is to be off any exposed ridge or summit by noon, not just 'watch the weather.'",
  },
  {
    id: "grand-teton",
    name: "Grand Teton National Park",
    state: "Wyoming",
    isHotDesert: false,
    supportedActivities: ["camping", "hiking", "backpacking", "mountaineering"],
    coordinates: { lat: 43.7904, lon: -110.6818 },
    crowdByMonth: {
      1: { level: "quiet", note: "Cold and largely a winter-sports season." },
      2: { level: "quiet", note: "Still deep winter." },
      3: { level: "quiet", note: "Snow lingers into early spring." },
      4: { level: "moderate", note: "Spring thaw begins, though high routes stay snowed in." },
      5: { level: "busy", note: "Warmer weather and wildflowers draw more visitors." },
      6: { level: "very-busy", note: "Summer peak season begins." },
      7: { level: "very-busy", note: "One of the busiest months of the year." },
      8: {
        level: "very-busy",
        note: "Still peak season, with the best window for technical climbing objectives.",
      },
      9: { level: "busy", note: "Crowds ease and fall colors draw photographers." },
      10: { level: "moderate", note: "Cooling fast, with snow returning to higher elevations." },
      11: { level: "quiet", note: "Cold, with most high routes closed out by snow." },
      12: { level: "quiet", note: "Winter conditions throughout." },
    },
    seasonalNotes: {
      spring:
        "Lower valley trails open up while the range itself is still a winter mountaineering environment.",
      summer:
        "The main window for climbing objectives like the Grand — but afternoon storms build fast and are a real turnaround-time factor.",
      fall: "Cold nights come early; snow can return to the peaks with little warning.",
      winter:
        "This is a winter mountaineering and ski-touring environment, not a casual hiking season.",
    },
    generalNote:
      "This is prime grizzly country — food storage rules are strictly enforced, and bear spray is standard practice on trail, not optional gear.",
  },
  {
    id: "great-smoky-mountains",
    name: "Great Smoky Mountains National Park",
    state: "Tennessee / North Carolina",
    isHotDesert: false,
    supportedActivities: ["camping", "hiking", "backpacking"],
    coordinates: { lat: 35.6118, lon: -83.4895 },
    crowdByMonth: {
      1: { level: "quiet", note: "Cold and quiet, with occasional snow at higher elevations." },
      2: { level: "quiet", note: "Still a quiet winter season." },
      3: { level: "moderate", note: "Spring wildflowers start drawing crowds." },
      4: { level: "busy", note: "Peak wildflower season brings steady visitation." },
      5: { level: "busy", note: "Warm, humid, and increasingly busy." },
      6: { level: "very-busy", note: "Summer peak season begins." },
      7: { level: "very-busy", note: "One of the busiest months of the year." },
      8: { level: "very-busy", note: "Still peak season, hot and humid." },
      9: { level: "busy", note: "Crowds ease slightly as humidity drops." },
      10: {
        level: "very-busy",
        note: "Fall colors make this the single busiest month of the year here.",
      },
      11: { level: "moderate", note: "Cooler weather and thinner crowds after peak leaf season." },
      12: { level: "quiet", note: "Cold and quiet outside the holidays." },
    },
    seasonalNotes: {
      spring:
        "Frequent rain and fast-changing weather — pack rain gear even on a forecasted-clear day.",
      summer: "Hot, humid, and buggy at lower elevations; noticeably cooler and wetter up high.",
      fall: "Gorgeous but crowded — the busiest stretch of the year here, so book ahead.",
      winter: "Higher elevations can see real snow and ice even when the lowlands stay mild.",
    },
    generalNote:
      "This is the most-visited national park in the country by a wide margin — expect crowded trailheads and full parking lots even outside official peak season.",
  },
  {
    id: "glacier",
    name: "Glacier National Park",
    state: "Montana",
    isHotDesert: false,
    supportedActivities: ["camping", "hiking", "backpacking", "mountaineering"],
    coordinates: { lat: 48.7596, lon: -113.787 },
    crowdByMonth: {
      1: { level: "quiet", note: "Deep winter; most of the park is snowbound." },
      2: { level: "quiet", note: "Still deep winter." },
      3: { level: "quiet", note: "Snow lingers well into spring at elevation." },
      4: { level: "quiet", note: "Going-to-the-Sun Road is still closed at higher elevations." },
      5: { level: "moderate", note: "Lower elevations open up as plowing continues." },
      6: { level: "busy", note: "Going-to-the-Sun Road typically fully opens by late June." },
      7: {
        level: "very-busy",
        note: "One of the busiest months of the year, with vehicle reservations required.",
      },
      8: { level: "very-busy", note: "Still peak season across the park." },
      9: { level: "busy", note: "Crowds ease and fall colors begin." },
      10: { level: "moderate", note: "Going-to-the-Sun Road starts closing for the season." },
      11: { level: "quiet", note: "Most of the park closes down for winter." },
      12: { level: "quiet", note: "Deep winter conditions throughout." },
    },
    seasonalNotes: {
      spring:
        "Many high trails stay snowed in well into June — check current conditions, not just the calendar date.",
      summer:
        "The short window when the whole park is actually accessible — plan around Going-to-the-Sun Road's reservation system.",
      fall: "Beautiful and quieter, but the weather window for high routes closes fast.",
      winter: "Nearly the entire park is a winter mountaineering environment, not a hiking one.",
    },
    generalNote:
      "Glacier has an active, serious grizzly population — bear spray and strict food storage aren't optional here, and rangers do check.",
  },
];

export function getParkById(id: string): Park | undefined {
  return PARKS.find((park) => park.id === id);
}

/**
 * Directional estimate of the coldest overnight low a camper should plan for,
 * used to sanity-check gear like sleeping bags against a trip. Not live or
 * park-specific data (same honesty level as crowdByMonth) — a rough seasonal
 * baseline, bumped colder for hot desert parks where the day/night swing is
 * the whole point of the warning shown elsewhere in the app.
 */
export function estimateColdestNightF(park: Park, month: number): number {
  const season = monthToSeason(month);
  const baseline: Record<Season, number> = {
    winter: 15,
    spring: 32,
    summer: 40,
    fall: 30,
  };
  return park.isHotDesert ? baseline[season] - 10 : baseline[season];
}
