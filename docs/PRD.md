# Fledge — Product Requirements Document

**Status:** v1 shipped
**Owner:** Mercury Cheng

## Real user

First-time or inexperienced campers planning a trip to a well-known national park, who want to show up prepared without spending hours researching gear on their own.

## Real pain point

Beginners don't know what they don't know. A group can do a reasonable amount of research and still show up underprepared — not because they're careless, but because generic checklists don't explain _why_ an item matters or _how much_ of something you actually need, and nothing accounts for the specific park, season, or group size. A real example: a group camping in Sequoia brought a tent and nothing else — no ground mat, no sense of how much water to bring, no idea gas stations would be sparse near the park. Nothing they'd read told them what they didn't know to ask.

## Market gap

- **Generic packing-list generators** (PackPoint, REI checklists) give you _what_ to bring, not _why_, and don't reason about quantities relative to your specific group size and trip length.
- **Discovery apps** (AllTrails, campground finders) solve "where should I go," not "am I actually ready."
- **Nobody combines** quantity-reasoned recommendations, a beginner-first education layer, and trip-specific context (weather, crowd levels) in one flow.

## Solution

Fledge asks for an activity type, park, arrival date, trip length, and group size, then produces:

1. A full gear checklist, grouped by category, with quantities shown as math (e.g. "24 gal total — 2 gal/person/day × 3 days × 4 people") rather than a flat number, tuned to the trip's activity type — car camping, day hiking, backpacking, or mountaineering each pull a different subset of the gear catalog and a different water-consumption baseline.
2. A plain-English "what it is / why you need it" explainer for every item, with commonly-missed items visually flagged.
3. Interactive labeled diagrams for items where understanding the _parts_ matters (tent, sleeping bag, camp stove, water filter) — tap a point to learn what it does.
4. Live weather when the trip falls within the ~7-day forecast window, with an honest fallback to historical seasonal notes when it doesn't (most national park reservations are made months out, so this is the common case, not the edge case).
5. A historical crowd-level indicator per park/month, clearly labeled as directional, not live data.
6. A chatbot scoped to the user's actual trip — grounded in their specific park, activity, dates, and generated checklist, not an open-ended assistant — for follow-up questions ("why do I need a groundsheet," "how was that water number calculated").
7. A Chrome extension that scores retail products 0–100 against a trip's computed requirements while shopping on REI — see the Roadmap section this shipped out of.

## v1 scope decisions (and why)

- **A curated set of 11 popular national parks** rather than free-text location, so every recommendation is genuinely tuned to that park rather than generic. Started at 5 (Yosemite, Sequoia & Kings Canyon, Joshua Tree, Death Valley, Zion) and expanded to the most-visited parks in the country (Grand Canyon, Yellowstone, Rocky Mountain, Grand Teton, Great Smoky Mountains, Glacier) once the checklist logic proved out — not to the long tail, where sourcing genuinely accurate seasonal/crowd data per park stops scaling.
- **Four activity types, not just camping**, each pulling a different gear-catalog subset rather than one generic list wearing different labels. Car camping shipped first as the lower-stakes case to validate the recommendation logic on; hiking, backpacking, and mountaineering followed once that held up. Each park declares which activities its own data actually supports (`supportedActivities`) — Death Valley doesn't offer mountaineering, for instance, because there's no real technical-peak route there to reason about, and offering it anyway would mean fabricating gear logic rather than deferring it.
- **No accounts, no saved trips.** The core loop — input → checklist → chat — doesn't need persistence to prove the concept, and skipping it kept v1 shippable in scope.
- **Weather calls run server-side.** NWS's public API doesn't send CORS headers, so a browser can't call it directly — this was an actual bug found and fixed during build, not a design choice made upfront.
- **Shop links point to real retailer search pages, not fabricated product URLs.** A specific product link that 404s later is worse than a generic, durable search link.

## Roadmap (not yet built)

- **Chrome extension — beyond REI.** The extension currently scores 5 gear categories (tent, sleeping bag, water containers, cooler, rain shell) against a car-camping trip's requirements, scoped to REI's product-page DOM. Next: extend fit-scoring to the hiking/backpacking/mountaineering-specific gear now in the catalog (packs, technical gear), and to a second retailer once the one-retailer-at-a-time DOM-scraping approach proves durable.
- **User accounts / saved trips**, if there's demand for revisiting a plan rather than regenerating it — this also removes the extension's current workaround of linking a trip by pasting its URL.

## Tech notes

Built on TanStack Start (React + Vite + Cloudflare Workers), Tailwind v4, shadcn/ui. The chatbot and weather lookup both run through server routes (not client-side calls) to keep API keys server-side and avoid CORS issues. AI responses come from the Lovable AI Gateway, grounded via a system prompt that only allows answers based on the user's actual trip context.
