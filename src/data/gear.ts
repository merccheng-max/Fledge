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
  | "safety"
  | "navigation"
  | "technical";

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
  navigation: "Navigation & Pack",
  technical: "Technical Gear",
};

/** Order categories should appear in the checklist. */
export const CATEGORY_ORDER: GearCategory[] = [
  "permits",
  "navigation",
  "shelter",
  "sleep",
  "water",
  "food",
  "cooking",
  "clothing",
  "technical",
  "toiletries",
  "camp-comfort",
  "safety",
];

/**
 * The kind of trip this is. Each activity pulls a different subset of the gear
 * catalog and, for water, a different consumption baseline — see checklist-engine.ts.
 */
export type ActivityType = "camping" | "hiking" | "backpacking" | "mountaineering";

export const ACTIVITY_LABELS: Record<ActivityType, string> = {
  camping: "Car camping",
  hiking: "Day hiking",
  backpacking: "Backpacking",
  mountaineering: "Mountaineering",
};

/**
 * How to link out for this item, if at all:
 * - "shop": a physical retail product — links to a real REI search page.
 * - "official-reservation": links to Recreation.gov, the actual federal booking
 *   system for camping/backcountry permits at these parks, filtered to the selected park.
 * - "official-pass": links to the NPS's own page about entrance passes.
 * - omitted: no external link makes sense (e.g. consumables, planning tasks).
 */
export type ExternalLinkType = "shop" | "official-reservation" | "official-pass";

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
  externalLinkType?: ExternalLinkType;
  /** Which activity types this item belongs on the checklist for. */
  activities: ActivityType[];
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
    externalLinkType: "official-reservation",
    activities: ["camping"],
  },
  {
    id: "backcountry-permit",
    name: "Wilderness / backcountry permit",
    category: "permits",
    what: "Separate from a campground reservation — required for overnight travel outside developed campgrounds in most of these parks.",
    why: "Rangers do check, and many popular routes cap the number of permits issued per day. Showing up without one in peak season can mean turning back at the trailhead.",
    commonlyMissed: true,
    externalLinkType: "official-reservation",
    activities: ["backpacking", "mountaineering"],
  },
  {
    id: "park-entrance-pass",
    name: "Park entrance pass",
    category: "permits",
    what: "Either a per-park entrance fee or an America the Beautiful annual pass if you're visiting multiple parks this year.",
    why: "Entrance is charged per vehicle at the gate — having it ready avoids a slow, awkward fumble on arrival.",
    externalLinkType: "official-pass",
    activities: ["camping", "hiking", "backpacking", "mountaineering"],
  },

  // Navigation & Pack
  {
    id: "day-pack",
    name: "Day pack",
    category: "navigation",
    what: "A 15-25L pack sized for a single day out — water, layers, snacks, and the essentials.",
    why: "People underestimate how much a day actually needs once you add layers and water for the whole group's worth of stops.",
    externalLinkType: "shop",
    activities: ["hiking"],
  },
  {
    id: "backpacking-pack",
    name: "Backpacking pack",
    category: "navigation",
    what: "A weight-rated pack (typically 50-65L) sized to actually carry a multi-day load comfortably.",
    why: "An undersized or poorly fitted pack is the single biggest reason first-time backpackers have a miserable time — this isn't the place to make do with a daypack.",
    commonlyMissed: true,
    externalLinkType: "shop",
    activities: ["backpacking", "mountaineering"],
  },
  {
    id: "trekking-poles",
    name: "Trekking poles",
    category: "navigation",
    what: "Adjustable poles that take load off your knees on descents and add stability on uneven terrain.",
    why: "Especially worth it carrying a loaded pack — knees take a real beating on long descents without them.",
    externalLinkType: "shop",
    activities: ["hiking", "backpacking", "mountaineering"],
  },

  // Shelter
  {
    id: "tent",
    name: "Tent",
    category: "shelter",
    what: "Your primary shelter, sized for your group and rated for the season you're camping in.",
    why: "A '3-season' tent by default isn't automatically warm-weather-only — check its rating against the coldest night you'll realistically see, not just the daytime forecast.",
    externalLinkType: "shop",
    activities: ["camping", "backpacking", "mountaineering"],
  },
  {
    id: "tent-footprint",
    name: "Tent footprint / groundsheet",
    category: "shelter",
    what: "A protective sheet placed under your tent, between the tent floor and the ground.",
    why: "Without it, rocks and moisture wear through the tent floor over time, and you're more likely to wake up in a damp sleeping bag.",
    commonlyMissed: true,
    externalLinkType: "shop",
    activities: ["camping", "backpacking", "mountaineering"],
  },
  {
    id: "sleeping-pad",
    name: "Sleeping pad / ground mat",
    category: "shelter",
    what: "An insulating layer you sleep on top of, between your sleeping bag and the tent floor.",
    why: "This is about insulation, not comfort — the ground pulls heat out of your body much faster than air does. Without a pad, even a bag rated to 40°F will feel far colder than advertised.",
    commonlyMissed: true,
    externalLinkType: "shop",
    activities: ["camping", "backpacking", "mountaineering"],
  },
  {
    id: "extra-stakes",
    name: "Extra stakes & guylines",
    category: "shelter",
    what: "Backup stakes and cord beyond what the tent ships with.",
    why: "Factory stakes bend easily in rocky or hard ground, and a bent stake in wind is how a tent wall ends up in your face at 2am.",
    externalLinkType: "shop",
    activities: ["camping", "backpacking", "mountaineering"],
  },

  // Sleep
  {
    id: "sleeping-bag",
    name: "Sleeping bag",
    category: "sleep",
    what: "Rated by temperature, not by season name alone.",
    why: "Rate it to the coldest night you'll realistically see, not the daytime high. Desert parks especially trip people up here — see the clothing section for why.",
    externalLinkType: "shop",
    activities: ["camping", "backpacking", "mountaineering"],
  },
  {
    id: "sleeping-bag-liner",
    name: "Sleeping bag liner",
    category: "sleep",
    what: "A thin fabric liner that goes inside your sleeping bag.",
    why: "Adds roughly 10-15°F of warmth and keeps the bag itself clean — cheap insurance on a cold night.",
    commonlyMissed: true,
    externalLinkType: "shop",
    activities: ["camping", "backpacking", "mountaineering"],
  },
  {
    id: "camp-pillow",
    name: "Pillow",
    category: "sleep",
    what: "A camp pillow, or simply a stuff sack filled with spare clothes.",
    why: "Small comfort item — doesn't need to be fancy, but sleeping without one adds up over multiple nights.",
    externalLinkType: "shop",
    activities: ["camping"],
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
    activities: ["camping", "hiking", "backpacking", "mountaineering"],
  },
  {
    id: "water-containers",
    name: "Water storage containers",
    category: "water",
    what: "Jugs or collapsible containers for hauling and storing your water at camp.",
    why: "Most drive-up campsites don't have a potable water tap at the site itself — people often assume there's one nearby and there isn't.",
    commonlyMissed: true,
    externalLinkType: "shop",
    activities: ["camping"],
  },
  {
    id: "backup-filter",
    name: "Water filter or treatment",
    category: "water",
    what: "A portable filter or purification tablets/drops for treating water from natural sources.",
    why: "For car camping this is emergency backup only — you're hauling water in. For backpacking and mountaineering it's your primary water source: you can't carry enough for a multi-day route, so treating water from streams and lakes is the plan, not a fallback.",
    externalLinkType: "shop",
    activities: ["camping", "hiking", "backpacking", "mountaineering"],
  },

  // Food
  {
    id: "food-supply",
    name: "Food",
    category: "food",
    what: "Meals and snacks for the full length of the trip.",
    why: "Car camping doesn't have backpacking's strict weight limits, so this is a comfortable planning estimate, not a hard science.",
    hasComputedQuantity: true,
    activities: ["camping", "hiking", "backpacking", "mountaineering"],
  },
  {
    id: "ice",
    name: "Ice",
    category: "food",
    what: "Ice for your cooler, to keep perishable food safe.",
    why: "Ice disappears faster than people expect, especially in hot desert parks, where a cooler can lose its ice in a single day.",
    commonlyMissed: true,
    hasComputedQuantity: true,
    activities: ["camping"],
  },

  // Cooking
  {
    id: "camp-stove-fuel",
    name: "Camp stove + fuel",
    category: "cooking",
    what: "A portable stove and matching fuel canister.",
    why: "Many parks have seasonal fire bans, which makes a stove the only legal way to cook, not just a backup. People remember the stove and forget the fuel canister that actually fits it.",
    commonlyMissed: true,
    externalLinkType: "shop",
    activities: ["camping", "backpacking", "mountaineering"],
  },
  {
    id: "cookware",
    name: "Cookware, utensils, plates & cups",
    category: "cooking",
    what: "A basic pot/pan set and reusable dishware for the group.",
    why: "Doesn't need to be elaborate — one pot that can boil water covers most simple camp meals.",
    externalLinkType: "shop",
    activities: ["camping", "backpacking", "mountaineering"],
  },
  {
    id: "cooler",
    name: "Cooler",
    category: "cooking",
    what: "For storing perishable food safely, alongside your ice supply.",
    why: "Keeps food both safe to eat and, in bear country, properly secured when combined with a bear canister or locker.",
    externalLinkType: "shop",
    activities: ["camping"],
  },
  {
    id: "bear-canister",
    name: "Bear canister or bear locker",
    category: "cooking",
    what: "A hard-sided container (or the metal locker most campsites provide) for storing food and anything scented overnight.",
    why: "Legally required in Yosemite and Sequoia & Kings Canyon, and enforced. It's not just about wildlife safety — rangers do issue citations for food left out. Required in the backcountry of most of these parks too, not just at developed campgrounds.",
    commonlyMissed: true,
    externalLinkType: "shop",
    activities: ["camping", "backpacking", "mountaineering"],
  },
  {
    id: "fire-starter",
    name: "Fire starter, lighter & backup matches",
    category: "cooking",
    what: "Multiple, redundant ways to start a fire or light a stove.",
    why: "A single lighter running out of fuel or getting wet shouldn't be the reason you can't cook dinner.",
    externalLinkType: "shop",
    activities: ["camping", "backpacking", "mountaineering"],
  },
  {
    id: "trash-bags",
    name: "Trash bags",
    category: "cooking",
    what: "For packing out everything you bring in.",
    why: "Many sites don't provide bins, or ask you to pack out trash rather than leave it. Bring more than you think you need.",
    externalLinkType: "shop",
    activities: ["camping", "hiking", "backpacking", "mountaineering"],
  },

  // Clothing & Layering
  {
    id: "insulating-layer",
    name: "Insulating layer (fleece / puffy)",
    category: "clothing",
    what: "A warm mid-layer for once the sun goes down.",
    why: "The single biggest beginner mistake. Desert parks like Joshua Tree can hit 90°F+ by day and near-freezing at night — people pack for the daytime temperature they researched and freeze after sundown.",
    commonlyMissed: true,
    externalLinkType: "shop",
    activities: ["camping", "hiking", "backpacking", "mountaineering"],
  },
  {
    id: "rain-shell",
    name: "Waterproof / windproof shell",
    category: "clothing",
    what: "An outer layer that blocks wind and rain.",
    why: "People check the day's forecast, see 'clear,' and skip rain gear entirely — then get caught by an afternoon storm, common in Sierra parks like Sequoia and Yosemite in summer.",
    commonlyMissed: true,
    externalLinkType: "shop",
    activities: ["camping", "hiking", "backpacking", "mountaineering"],
  },
  {
    id: "warm-hat-gloves",
    name: "Warm hat & gloves",
    category: "clothing",
    what: "Basic cold-weather accessories.",
    why: "Needed even in 'warm season' parks once the sun drops — heat loss through your head and hands is disproportionate to how small these items feel.",
    externalLinkType: "shop",
    activities: ["camping", "hiking", "backpacking", "mountaineering"],
  },
  {
    id: "closed-toe-shoes",
    name: "Sturdy closed-toe shoes",
    category: "clothing",
    what: "Real shoes or boots, not sandals, for walking around camp and on any trails.",
    why: "Uneven, rocky terrain around most campsites makes sandals a twisted-ankle risk.",
    externalLinkType: "shop",
    activities: ["camping", "hiking", "backpacking"],
  },
  {
    id: "mountaineering-boots",
    name: "Insulated mountaineering boots",
    category: "clothing",
    what: "Rigid, insulated boots compatible with crampons.",
    why: "Regular hiking boots don't interface with crampons and won't hold up on snow and ice — this is purpose-built gear, not a place to improvise.",
    externalLinkType: "shop",
    activities: ["mountaineering"],
  },
  {
    id: "gaiters",
    name: "Gaiters",
    category: "clothing",
    what: "Fabric covers over your boots and lower legs that keep out snow, scree, and mud.",
    why: "Nothing ends a summit push faster than boots full of snow melting against your feet for hours.",
    externalLinkType: "shop",
    activities: ["backpacking", "mountaineering"],
  },
  {
    id: "extra-socks",
    name: "Extra socks",
    category: "clothing",
    what: "More pairs than you think you'll need.",
    why: "Consistently underpacked. Wet or cold feet are one of the fastest ways a trip goes from fine to miserable.",
    commonlyMissed: true,
    externalLinkType: "shop",
    activities: ["camping", "hiking", "backpacking", "mountaineering"],
  },
  {
    id: "sun-protection-clothing",
    name: "Sun hat & sunglasses",
    category: "clothing",
    what: "Direct sun protection, especially important in desert parks.",
    why: "Desert sun exposure is more intense than most beginners expect, even in cooler months.",
    externalLinkType: "shop",
    activities: ["camping", "hiking", "backpacking", "mountaineering"],
  },

  // Technical Gear
  {
    id: "ice-axe",
    name: "Ice axe",
    category: "technical",
    what: "A tool for self-arrest and balance on snow and moderate ice.",
    why: "On any route with sustained snow travel, this is a rescue tool, not an accessory — the whole point is stopping a slide before it becomes a fall.",
    externalLinkType: "shop",
    activities: ["mountaineering"],
  },
  {
    id: "crampons",
    name: "Crampons",
    category: "technical",
    what: "Spiked traction devices that attach to mountaineering boots for snow and ice.",
    why: "Needed the moment a route firms up past what boot soles alone can grip — check they're actually compatible with your boots before you go.",
    externalLinkType: "shop",
    activities: ["mountaineering"],
  },
  {
    id: "climbing-helmet",
    name: "Climbing helmet",
    category: "technical",
    what: "A lightweight helmet rated for rockfall and icefall impact.",
    why: "People remember the axe and crampons and forget the helmet — but rockfall and icefall are exactly the hazards a summit route is most likely to expose you to.",
    commonlyMissed: true,
    externalLinkType: "shop",
    activities: ["mountaineering"],
  },
  {
    id: "glacier-travel-kit",
    name: "Harness, rope & glacier travel kit",
    category: "technical",
    what: "Climbing harness, rope, and crevasse-rescue hardware for glaciated routes.",
    why: "Required on glaciated peaks even when the summit push itself looks like a straightforward walk — crevasses are the actual hazard, not the climbing.",
    commonlyMissed: true,
    externalLinkType: "shop",
    activities: ["mountaineering"],
  },
  {
    id: "avalanche-safety-kit",
    name: "Avalanche beacon, probe & shovel",
    category: "technical",
    what: "The standard three-piece kit for locating and digging out a buried partner.",
    why: "Non-negotiable on any route crossing avalanche terrain — and useless if you haven't practiced with it before you're relying on it for real.",
    commonlyMissed: true,
    externalLinkType: "shop",
    activities: ["mountaineering"],
  },

  // Toiletries & Hygiene
  {
    id: "toilet-paper",
    name: "Toilet paper / wet wipes",
    category: "toiletries",
    what: "Your own supply, separate from whatever the campground provides.",
    why: "Vault toilets at many campgrounds run out, or don't stock any at all. Don't assume it's provided.",
    commonlyMissed: true,
    externalLinkType: "shop",
    activities: ["camping", "backpacking", "mountaineering"],
  },
  {
    id: "hand-sanitizer",
    name: "Hand sanitizer",
    category: "toiletries",
    what: "For quick cleanup before meals when there's no sink nearby.",
    why: "Frontcountry sites rarely have handwashing stations right at the campsite, and there's never one on trail.",
    externalLinkType: "shop",
    activities: ["camping", "hiking", "backpacking", "mountaineering"],
  },
  {
    id: "biodegradable-soap",
    name: "Biodegradable soap",
    category: "toiletries",
    what: "Soap safe to use away from plumbed sinks, for dishes or hands.",
    why: "Regular soap can harm the surrounding environment if rinsed onto the ground or near water sources.",
    externalLinkType: "shop",
    activities: ["camping", "backpacking", "mountaineering"],
  },
  {
    id: "toothbrush-towel",
    name: "Toothbrush, toothpaste & quick-dry towel",
    category: "toiletries",
    what: "Basic daily hygiene items.",
    why: "Easy to forget when packing focuses on 'camping gear' and skips the ordinary bathroom bag.",
    externalLinkType: "shop",
    activities: ["camping", "backpacking", "mountaineering"],
  },

  // Camp Comfort
  {
    id: "camp-chairs",
    name: "Camp chairs",
    category: "camp-comfort",
    what: "Portable seating for the group.",
    why: "Most campgrounds provide one picnic table, which usually isn't enough seating for a full group.",
    externalLinkType: "shop",
    activities: ["camping"],
  },
  {
    id: "lantern",
    name: "Lantern or string lights",
    category: "camp-comfort",
    what: "Hands-free lighting for the camp area at night, beyond a headlamp.",
    why: "Makes cooking and hanging out after dark much easier than relying on a single flashlight beam.",
    externalLinkType: "shop",
    activities: ["camping"],
  },

  // Safety & Misc.
  {
    id: "first-aid-kit",
    name: "First aid kit",
    category: "safety",
    what: "A kit covering more than just band-aids — blister care, minor cuts, and any personal medication.",
    why: "People often have 'a kit,' but it's incomplete for what actually happens on a trip: blisters, scrapes, and headaches are the most common issues, not major injuries.",
    commonlyMissed: true,
    externalLinkType: "shop",
    activities: ["camping", "hiking", "backpacking", "mountaineering"],
  },
  {
    id: "headlamp",
    name: "Headlamp or flashlight + extra batteries",
    category: "safety",
    what: "Hands-free light for camp tasks after dark, plus spare batteries.",
    why: "People remember the headlamp and forget the spare batteries — which is the same as not having a backup at all.",
    commonlyMissed: true,
    externalLinkType: "shop",
    activities: ["camping", "hiking", "backpacking", "mountaineering"],
  },
  {
    id: "sunscreen",
    name: "Sunscreen & SPF lip balm",
    category: "safety",
    what: "Sun protection for exposed skin.",
    why: "Especially important at elevation and in desert parks, where UV exposure is stronger than it feels.",
    externalLinkType: "shop",
    activities: ["camping", "hiking", "backpacking", "mountaineering"],
  },
  {
    id: "offline-map",
    name: "Offline park map",
    category: "safety",
    what: "A physical map or a downloaded offline map, not just your phone's live maps app.",
    why: "Most parks have little to no cell service. People rely on phone maps that stop working the moment they actually need them.",
    commonlyMissed: true,
    externalLinkType: "shop",
    activities: ["camping", "hiking", "backpacking", "mountaineering"],
  },
  {
    id: "multi-tool",
    name: "Multi-tool",
    category: "safety",
    what: "A compact tool for small repairs and general utility.",
    why: "Useful often enough (gear repair, food prep, general fixes) that it earns its small amount of space.",
    externalLinkType: "shop",
    activities: ["camping", "hiking", "backpacking", "mountaineering"],
  },
  {
    id: "insect-repellent",
    name: "Insect repellent",
    category: "safety",
    what: "Protection against mosquitoes and other insects.",
    why: "Park and season dependent — notably relevant in Yosemite's meadow areas and Great Smoky Mountains in summer.",
    externalLinkType: "shop",
    activities: ["camping", "hiking", "backpacking", "mountaineering"],
  },
  {
    id: "vehicle-fuel-plan",
    name: "Fuel or charging plan for your vehicle",
    category: "safety",
    what: "A plan for where you'll refuel or recharge before and during the trip, not just 'find something along the way.'",
    why: "Gas stations, and EV chargers especially, are sparse in and around remote parks. This is exactly the kind of thing that catches beginners off guard mid-trip.",
    commonlyMissed: true,
    activities: ["camping", "hiking", "backpacking", "mountaineering"],
  },
  {
    id: "altitude-acclimatization-plan",
    name: "Altitude acclimatization plan",
    category: "safety",
    what: "A planned itinerary that gains elevation gradually rather than rushing straight to altitude.",
    why: "Altitude sickness is the single biggest reason ambitious trips turn back early — and it's preventable with a sane schedule, not toughness.",
    commonlyMissed: true,
    activities: ["mountaineering"],
  },
];

export function getGearByCategory(category: GearCategory): GearItem[] {
  return GEAR_CATALOG.filter((item) => item.category === category);
}

export function getGearById(id: string): GearItem | undefined {
  return GEAR_CATALOG.find((item) => item.id === id);
}
