# Fledge — Product Requirements Document

**Status:** v1 shipped
**Owner:** Mercury Cheng

## Real user

First-time or inexperienced campers planning a trip to a well-known national park, who want to show up prepared without spending hours researching gear on their own.

## Real pain point

Beginners don't know what they don't know. A group can do a reasonable amount of research and still show up underprepared — not because they're careless, but because generic checklists don't explain *why* an item matters or *how much* of something you actually need, and nothing accounts for the specific park, season, or group size. A real example: a group camping in Sequoia brought a tent and nothing else — no ground mat, no sense of how much water to bring, no idea gas stations would be sparse near the park. Nothing they'd read told them what they didn't know to ask.

## Market gap

- **Generic packing-list generators** (PackPoint, REI checklists) give you *what* to bring, not *why*, and don't reason about quantities relative to your specific group size and trip length.
- **Discovery apps** (AllTrails, campground finders) solve "where should I go," not "am I actually ready."
- **Nobody combines** quantity-reasoned recommendations, a beginner-first education layer, and trip-specific context (weather, crowd levels) in one flow.

## Solution

Fledge asks for a park, arrival date, trip length, and group size, then produces:

1. A full gear checklist, grouped by category, with quantities shown as math (e.g. "24 gal total — 2 gal/person/day × 3 days × 4 people") rather than a flat number.
2. A plain-English "what it is / why you need it" explainer for every item, with commonly-missed items visually flagged.
3. Interactive labeled diagrams for items where understanding the *parts* matters (tent, sleeping bag, camp stove, water filter) — tap a point to learn what it does.
4. Live weather when the trip falls within the ~7-day forecast window, with an honest fallback to historical seasonal notes when it doesn't (most national park reservations are made months out, so this is the common case, not the edge case).
5. A historical crowd-level indicator per park/month, clearly labeled as directional, not live data.
6. A chatbot scoped to the user's actual trip — grounded in their specific park, dates, and generated checklist, not an open-ended assistant — for follow-up questions ("why do I need a groundsheet," "how was that water number calculated").

## v1 scope decisions (and why)

- **Camping only, not backpacking or mountaineering.** Frontcountry camping is lower-stakes to get wrong (a bad recommendation means discomfort, not danger miles from the car) and matches the real originating story. Backpacking/mountaineering are deferred to a clearly-scoped v2 rather than built shallowly now — sequencing complexity deliberately, rather than rushing safety-relevant gear logic.
- **A curated set of 5 parks** (Yosemite, Sequoia & Kings Canyon, Joshua Tree, Death Valley, Zion) rather than free-text location, so every recommendation is genuinely tuned to that park rather than generic.
- **No accounts, no saved trips.** The core loop — input → checklist → chat — doesn't need persistence to prove the concept, and skipping it kept v1 shippable in scope.
- **Weather calls run server-side.** NWS's public API doesn't send CORS headers, so a browser can't call it directly — this was an actual bug found and fixed during build, not a design choice made upfront.
- **Shop links point to real retailer search pages, not fabricated product URLs.** A specific product link that 404s later is worse than a generic, durable search link.

## Roadmap (not yet built)

- **Backpacking and mountaineering support**, once camping-only recommendation accuracy is validated.
- **Chrome extension**: let users add products to their Fledge checklist while browsing a retailer, with review-based scores (quality, value, beginner-friendliness). Deferred deliberately — a browser extension is a separate technical surface (not something the current web stack or Lovable can build directly), and reliable review-parsing is realistically scoped to one retailer at a time, not "any site." Revisit after the core web app and case-study materials are complete.
- **User accounts / saved trips**, if there's demand for revisiting a plan rather than regenerating it.

## Tech notes

Built on TanStack Start (React + Vite + Cloudflare Workers), Tailwind v4, shadcn/ui. The chatbot and weather lookup both run through server routes (not client-side calls) to keep API keys server-side and avoid CORS issues. AI responses come from the Lovable AI Gateway, grounded via a system prompt that only allows answers based on the user's actual trip context.
