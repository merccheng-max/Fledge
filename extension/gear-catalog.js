// Mirrors src/data/gear.ts (id, name, commonlyMissed) and src/data/parks.ts (id, name).
// Kept as a manual, plain-JS copy on purpose: the extension has no build step, so it
// can't import the TypeScript source directly. Update this file if gear.ts/parks.ts change.

const FLEDGE_GEAR_CATALOG = [
  { id: "campground-reservation", name: "Campground reservation confirmation", commonlyMissed: true },
  { id: "backcountry-permit", name: "Wilderness / backcountry permit", commonlyMissed: true },
  { id: "park-entrance-pass", name: "Park entrance pass", commonlyMissed: false },
  { id: "day-pack", name: "Day pack", commonlyMissed: false },
  { id: "backpacking-pack", name: "Backpacking pack", commonlyMissed: true },
  { id: "trekking-poles", name: "Trekking poles", commonlyMissed: false },
  { id: "tent", name: "Tent", commonlyMissed: false },
  { id: "tent-footprint", name: "Tent footprint / groundsheet", commonlyMissed: true },
  { id: "sleeping-pad", name: "Sleeping pad / ground mat", commonlyMissed: true },
  { id: "extra-stakes", name: "Extra stakes & guylines", commonlyMissed: false },
  { id: "sleeping-bag", name: "Sleeping bag", commonlyMissed: false },
  { id: "sleeping-bag-liner", name: "Sleeping bag liner", commonlyMissed: true },
  { id: "camp-pillow", name: "Pillow", commonlyMissed: false },
  { id: "water-containers", name: "Water storage containers", commonlyMissed: true },
  { id: "backup-filter", name: "Water filter or treatment", commonlyMissed: false },
  { id: "camp-stove-fuel", name: "Camp stove + fuel", commonlyMissed: true },
  { id: "cookware", name: "Cookware, utensils, plates & cups", commonlyMissed: false },
  { id: "cooler", name: "Cooler", commonlyMissed: false },
  { id: "bear-canister", name: "Bear canister or bear locker", commonlyMissed: true },
  { id: "fire-starter", name: "Fire starter, lighter & backup matches", commonlyMissed: false },
  { id: "trash-bags", name: "Trash bags", commonlyMissed: false },
  { id: "insulating-layer", name: "Insulating layer (fleece / puffy)", commonlyMissed: true },
  { id: "rain-shell", name: "Waterproof / windproof shell", commonlyMissed: true },
  { id: "warm-hat-gloves", name: "Warm hat & gloves", commonlyMissed: false },
  { id: "closed-toe-shoes", name: "Sturdy closed-toe shoes", commonlyMissed: false },
  { id: "mountaineering-boots", name: "Insulated mountaineering boots", commonlyMissed: false },
  { id: "gaiters", name: "Gaiters", commonlyMissed: false },
  { id: "extra-socks", name: "Extra socks", commonlyMissed: true },
  { id: "sun-protection-clothing", name: "Sun hat & sunglasses", commonlyMissed: false },
  { id: "ice-axe", name: "Ice axe", commonlyMissed: false },
  { id: "crampons", name: "Crampons", commonlyMissed: false },
  { id: "climbing-helmet", name: "Climbing helmet", commonlyMissed: true },
  { id: "glacier-travel-kit", name: "Harness, rope & glacier travel kit", commonlyMissed: true },
  { id: "avalanche-safety-kit", name: "Avalanche beacon, probe & shovel", commonlyMissed: true },
  { id: "toilet-paper", name: "Toilet paper / wet wipes", commonlyMissed: true },
  { id: "hand-sanitizer", name: "Hand sanitizer", commonlyMissed: false },
  { id: "biodegradable-soap", name: "Biodegradable soap", commonlyMissed: false },
  { id: "toothbrush-towel", name: "Toothbrush, toothpaste & quick-dry towel", commonlyMissed: false },
  { id: "camp-chairs", name: "Camp chairs", commonlyMissed: false },
  { id: "lantern", name: "Lantern or string lights", commonlyMissed: false },
  { id: "first-aid-kit", name: "First aid kit", commonlyMissed: true },
  { id: "headlamp", name: "Headlamp or flashlight + extra batteries", commonlyMissed: true },
  { id: "sunscreen", name: "Sunscreen & SPF lip balm", commonlyMissed: false },
  { id: "offline-map", name: "Offline park map", commonlyMissed: true },
  { id: "multi-tool", name: "Multi-tool", commonlyMissed: false },
  { id: "insect-repellent", name: "Insect repellent", commonlyMissed: false },
  { id: "vehicle-fuel-plan", name: "Fuel or charging plan for your vehicle", commonlyMissed: true },
  { id: "altitude-acclimatization-plan", name: "Altitude acclimatization plan", commonlyMissed: true },
];

// Ids fit-scoring.ts actually has a rule for — everything else scores as "no rule yet."
const FLEDGE_SCORABLE_ITEM_IDS = new Set([
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

// Cheap keyword guess for which catalog item a product page is probably for,
// just to pre-select the dropdown — the user can always override it.
function guessGearItemId(productTitle) {
  const title = productTitle.toLowerCase();
  if (title.includes("sleeping bag")) return "sleeping-bag";
  if (title.includes("tent")) return "tent";
  if (title.includes("cooler")) return "cooler";
  if (title.includes("rain") || title.includes("waterproof jacket") || title.includes("shell jacket"))
    return "rain-shell";
  if (title.includes("water") && (title.includes("jug") || title.includes("container") || title.includes("carrier")))
    return "water-containers";
  if (title.includes("filter") && title.includes("water")) return "backup-filter";
  if (title.includes("pad") && title.includes("sleep")) return "sleeping-pad";
  if (title.includes("stove")) return "camp-stove-fuel";
  if (title.includes("headlamp") || title.includes("flashlight")) return "headlamp";
  if (title.includes("fleece") || title.includes("puffy") || title.includes("insulated jacket"))
    return "insulating-layer";
  if (title.includes("backpack") || title.includes("pack") || title.includes("rucksack"))
    return "backpacking-pack";
  if (title.includes("mountaineering boot") || (title.includes("boot") && title.includes("crampon")))
    return "mountaineering-boots";
  return null;
}
