export type GearCategory =
  | "shelter"
  | "sleep"
  | "water"
  | "food"
  | "cooking"
  | "clothing"
  | "toiletries"
  | "camp-comfort"
  | "permits"
  | "safety";

export const CATEGORY_LABELS: Record<GearCategory, string> = {
  shelter: "Shelter",
  sleep: "Sleep",
  water: "Water",
  food: "Food",
  cooking: "Cooking",
  clothing: "Clothing & Layering",
  toiletries: "Toiletries & Hygiene",
  "camp-comfort": "Camp Comfort",
  permits: "Permits & Paperwork",
  safety: "Safety & Misc.",
};

/** Order categories should appear in the checklist. */
export const CATEGORY_ORDER: GearCategory[] = [
  "permits",
  "shelter",
  "sleep",
  "water",
  "food",
  "cooking",
  "clothing",
  "toiletries",
  "camp-comfort",
  "safety",
];

export interface GearItem {
  id: string;
  name: string;
  category: GearCategory;
  /** Plain-English explanation of what the item is. */
  what: string;
  /** Plain-English explanation of why a beginner needs it / what happens if skipped. */
  why: string;
  /** Flagged as one of the items beginners most commonly forget or underestimate. */
  commonlyMissed?: boolean;
  /** True if this item has a computed quantity (water, food, ice) shown in the checklist. */
  hasComputedQuantity?: boolean;
}

export const GEAR_CATALOG: GearItem[] = [
  // Permits & Paperwork
  {
    id: "campground-reservation",
    name: "Campground reservation confirmation",
    category: "permits",
    what: "Proof of your booked site — most national park campgrounds require reservations, not walk-ups.",
    why: "Popular sites in parks like Yosemite and Sequoia book out months ahead. Showing up without one often means no site at all, not just a worse one.",
    commonlyMissed: true,
  },
  {
    id: "park-entrance-pass",
    name: "Park entrance pass",
    category: "permits",
    what: "Either a per-park entrance fee or an America the Beautiful annual pass if you're visiting multiple parks this year.",
    why: "Entrance is charged per vehicle at the gate — having it ready avoids a slow, awkward fumble on arrival.",
  },

  // Shelter
  {
    id: "tent",
    name: "Tent",
    category: "shelter",
    what: "Your primary shelter, sized for your group and rated for the season you're camping in.",
    why: "A '3-season' tent by default isn't automatically warm-weather-only — check its rating against the coldest night you'll realistically see, not just the daytime forecast.",
  },
  {
    id: "tent-footprint",
    name: "Tent footprint / groundsheet",
    category: "shelter",
    what: "A protective sheet placed under your tent, between the tent floor and the ground.",
    why: "Without it, rocks and moisture wear through the tent floor over time, and you're more likely to wake up in a damp sleeping bag.",
    commonlyMissed: true,
  },
  {
    id: "sleeping-pad",
    name: "Sleeping pad / ground mat",
    category: "shelter",
    what: "An insulating layer you sleep on top of, between your sleeping bag and the tent floor.",
    why: "This is about insulation, not comfort — the ground pulls heat out of your body much faster than air does. Without a pad, even a bag rated to 40°F will feel far colder than advertised.",
    commonlyMissed: true,
  },
  {
    id: "extra-stakes",
    name: "Extra stakes & guylines",
    category: "shelter",
    what: "Backup stakes and cord beyond what the tent ships with.",
    why: "Factory stakes bend easily in rocky or hard ground, and a bent stake in wind is how a tent wall ends up in your face at 2am.",
  },

  // Sleep
  {
    id: "sleeping-bag",
    name: "Sleeping bag",
    category: "sleep",
    what: "Rated by temperature, not by season name alone.",
    why: "Rate it to the coldest night you'll realistically see, not the daytime high. Desert parks especially trip people up here — see the clothing section for why.",
  },
  {
    id: "sleeping-bag-liner",
    name: "Sleeping bag liner",
    category: "sleep",
    what: "A thin fabric liner that goes inside your sleeping bag.",
    why: "Adds roughly 10-15°F of warmth and keeps the bag itself clean — cheap insurance on a cold night.",
    commonlyMissed: true,
  },
  {
    id: "camp-pillow",
    name: "Pillow",
    category: "sleep",
    what: "A camp pillow, or simply a stuff sack filled with spare clothes.",
    why: "Small comfort item — doesn't need to be fancy, but sleeping without one adds up over multiple nights.",
  },

  // Water
  {
    id: "drinking-water",
    name: "Drinking water",
    category: "water",
    what: "Your primary water supply for drinking, cooking, and basic cleanup.",
    why: "This is the item most beginners underestimate, especially in desert parks where the body loses water far faster than it feels like it is.",
    commonlyMissed: true,
    hasComputedQuantity: true,
  },
  {
    id: "water-containers",
    name: "Water storage containers",
    category: "water",
    what: "Jugs or collapsible containers for hauling and storing your water at camp.",
    why: "Most drive-up campsites don't have a potable water tap at the site itself — people often assume there's one nearby and there isn't.",
    commonlyMissed: true,
  },
  {
    id: "backup-filter",
    name: "Backup water filter",
    category: "water",
    what: "A portable filter or purification tablets, for emergencies only.",
    why: "Lower priority for frontcountry camping, but worth having if you're near a natural water source and run lower than planned.",
  },

  // Food
  {
    id: "food-supply",
    name: "Food",
    category: "food",
    what: "Meals and snacks for the full length of the trip.",
    why: "Car camping doesn't have backpacking's strict weight limits, so this is a comfortable planning estimate, not a hard science.",
    hasComputedQuantity: true,
  },
  {
    id: "ice",
    name: "Ice",
    category: "food",
    what: "Ice for your cooler, to keep perishable food safe.",
    why: "Ice disappears faster than people expect, especially in hot desert parks, where a cooler can lose its ice in a single day.",
    commonlyMissed: true,
    hasComputedQuantity: true,
  },

  // Cooking
  {
    id: "camp-stove-fuel",
    name: "Camp stove + fuel",
    category: "cooking",
    what: "A portable stove and matching fuel canister.",
    why: "Many parks have seasonal fire bans, which makes a stove the only legal way to cook, not just a backup. People remember the stove and forget the fuel canister that actually fits it.",
    commonlyMissed: true,
  },
  {
    id: "cookware",
    name: "Cookware, utensils, plates & cups",
    category: "cooking",
    what: "A basic pot/pan set and reusable dishware for the group.",
    why: "Doesn't need to be elaborate — one pot that can boil water covers most simple camp meals.",
  },
  {
    id: "cooler",
    name: "Cooler",
    category: "cooking",
    what: "For storing perishable food safely, alongside your ice supply.",
    why: "Keeps food both safe to eat and, in bear country, properly secured when combined with a bear canister or locker.",
  },
  {
    id: "bear-canister",
    name: "Bear canister or bear locker",
    category: "cooking",
    what: "A hard-sided container (or the metal locker most campsites provide) for storing food and anything scented overnight.",
    why: "Legally required in Yosemite and Sequoia & Kings Canyon, and enforced. It's not just about wildlife safety — rangers do issue citations for food left out.",
    commonlyMissed: true,
  },
  {
    id: "fire-starter",
    name: "Fire starter, lighter & backup matches",
    category: "cooking",
    what: "Multiple, redundant ways to start a fire or light a stove.",
    why: "A single lighter running out of fuel or getting wet shouldn't be the reason you can't cook dinner.",
  },
  {
    id: "trash-bags",
    name: "Trash bags",
    category: "cooking",
    what: "For packing out everything you bring in.",
    why: "Many sites don't provide bins, or ask you to pack out trash rather than leave it. Bring more than you think you need.",
  },

  // Clothing & Layering
  {
    id: "insulating-layer",
    name: "Insulating layer (fleece / puffy)",
    category: "clothing",
    what: "A warm mid-layer for once the sun goes down.",
    why: "The single biggest beginner mistake. Desert parks like Joshua Tree can hit 90°F+ by day and near-freezing at night — people pack for the daytime temperature they researched and freeze after sundown.",
    commonlyMissed: true,
  },
  {
    id: "rain-shell",
    name: "Waterproof / windproof shell",
    category: "clothing",
    what: "An outer layer that blocks wind and rain.",
    why: "People check the day's forecast, see 'clear,' and skip rain gear entirely — then get caught by an afternoon storm, common in Sierra parks like Sequoia and Yosemite in summer.",
    commonlyMissed: true,
  },
  {
    id: "warm-hat-gloves",
    name: "Warm hat & gloves",
    category: "clothing",
    what: "Basic cold-weather accessories.",
    why: "Needed even in 'warm season' parks once the sun drops — heat loss through your head and hands is disproportionate to how small these items feel.",
  },
  {
    id: "closed-toe-shoes",
    name: "Sturdy closed-toe shoes",
    category: "clothing",
    what: "Real shoes or boots, not sandals, for walking around camp and on any trails.",
    why: "Uneven, rocky terrain around most campsites makes sandals a twisted-ankle risk.",
  },
  {
    id: "extra-socks",
    name: "Extra socks",
    category: "clothing",
    what: "More pairs than you think you'll need.",
    why: "Consistently underpacked. Wet or cold feet are one of the fastest ways a trip goes from fine to miserable.",
    commonlyMissed: true,
  },
  {
    id: "sun-protection-clothing",
    name: "Sun hat & sunglasses",
    category: "clothing",
    what: "Direct sun protection, especially important in desert parks.",
    why: "Desert sun exposure is more intense than most beginners expect, even in cooler months.",
  },

  // Toiletries & Hygiene
  {
    id: "toilet-paper",
    name: "Toilet paper / wet wipes",
    category: "toiletries",
    what: "Your own supply, separate from whatever the campground provides.",
    why: "Vault toilets at many campgrounds run out, or don't stock any at all. Don't assume it's provided.",
    commonlyMissed: true,
  },
  {
    id: "hand-sanitizer",
    name: "Hand sanitizer",
    category: "toiletries",
    what: "For quick cleanup before meals when there's no sink nearby.",
    why: "Frontcountry sites rarely have handwashing stations right at the campsite.",
  },
  {
    id: "biodegradable-soap",
    name: "Biodegradable soap",
    category: "toiletries",
    what: "Soap safe to use away from plumbed sinks, for dishes or hands.",
    why: "Regular soap can harm the surrounding environment if rinsed onto the ground or near water sources.",
  },
  {
    id: "toothbrush-towel",
    name: "Toothbrush, toothpaste & quick-dry towel",
    category: "toiletries",
    what: "Basic daily hygiene items.",
    why: "Easy to forget when packing focuses on 'camping gear' and skips the ordinary bathroom bag.",
  },

  // Camp Comfort
  {
    id: "camp-chairs",
    name: "Camp chairs",
    category: "camp-comfort",
    what: "Portable seating for the group.",
    why: "Most campgrounds provide one picnic table, which usually isn't enough seating for a full group.",
  },
  {
    id: "lantern",
    name: "Lantern or string lights",
    category: "camp-comfort",
    what: "Hands-free lighting for the camp area at night, beyond a headlamp.",
    why: "Makes cooking and hanging out after dark much easier than relying on a single flashlight beam.",
  },

  // Safety & Misc.
  {
    id: "first-aid-kit",
    name: "First aid kit",
    category: "safety",
    what: "A kit covering more than just band-aids — blister care, minor cuts, and any personal medication.",
    why: "People often have 'a kit,' but it's incomplete for what actually happens on a trip: blisters, scrapes, and headaches are the most common issues, not major injuries.",
    commonlyMissed: true,
  },
  {
    id: "headlamp",
    name: "Headlamp or flashlight + extra batteries",
    category: "safety",
    what: "Hands-free light for camp tasks after dark, plus spare batteries.",
    why: "People remember the headlamp and forget the spare batteries — which is the same as not having a backup at all.",
    commonlyMissed: true,
  },
  {
    id: "sunscreen",
    name: "Sunscreen & SPF lip balm",
    category: "safety",
    what: "Sun protection for exposed skin.",
    why: "Especially important at elevation and in desert parks, where UV exposure is stronger than it feels.",
  },
  {
    id: "offline-map",
    name: "Offline park map",
    category: "safety",
    what: "A physical map or a downloaded offline map, not just your phone's live maps app.",
    why: "Most parks have little to no cell service. People rely on phone maps that stop working the moment they actually need them.",
    commonlyMissed: true,
  },
  {
    id: "multi-tool",
    name: "Multi-tool",
    category: "safety",
    what: "A compact tool for small repairs and general utility.",
    why: "Useful often enough (gear repair, food prep, general fixes) that it earns its small amount of space.",
  },
  {
    id: "insect-repellent",
    name: "Insect repellent",
    category: "safety",
    what: "Protection against mosquitoes and other insects.",
    why: "Park and season dependent — notably relevant in Yosemite's meadow areas in summer.",
  },
  {
    id: "vehicle-fuel-plan",
    name: "Fuel or charging plan for your vehicle",
    category: "safety",
    what: "A plan for where you'll refuel or recharge before and during the trip, not just 'find something along the way.'",
    why: "Gas stations, and EV chargers especially, are sparse in and around remote parks. This is exactly the kind of thing that catches beginners off guard mid-trip.",
    commonlyMissed: true,
  },
];

export function getGearByCategory(category: GearCategory): GearItem[] {
  return GEAR_CATALOG.filter((item) => item.category === category);
}

export function getGearById(id: string): GearItem | undefined {
  return GEAR_CATALOG.find((item) => item.id === id);
}
