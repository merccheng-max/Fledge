# Backlog

Small, real, scoped improvements — pulled one at a time by the daily automated
maintenance session (see `docs/AUTOMATION.md`). Each item should be genuinely
useful on its own, not padding. Check items off as `[x]` when shipped, with the
commit SHA.

## Pending

- [ ] Add a fit-scoring rule to `src/lib/fit-scoring.ts` for `ice-axe` (length
      vs. user height/route type, or a simpler "no numeric rating on REI pages
      — skip scoring, just confirm it's rated for mountaineering" check if a
      real numeric spec isn't reliably available). `backpacking-pack` scoring
      (capacity in liters vs. trip length) shipped in aa997ee, along with
      sleeping-pad, insulating-layer, and mountaineering-boots.
- [ ] Document the fit-scoring rules and their reasoning more thoroughly in
      `extension/README.md` — right now it lists which items are scored but
      not *why* those specific thresholds (e.g. the 10,000mm/5,000mm waterproof
      rating split) were chosen.
- [ ] Audit copy consistency across the app now that there are 11 parks and 4
      activities — check `src/routes/index.tsx`, `src/routes/plan.tsx`, and
      any remaining "camping"-only language that should be activity-neutral.
- [ ] Add a unit test file for `src/lib/fit-scoring.ts` (currently only
      manually spot-checked via scratch scripts during development) — pick a
      lightweight test runner consistent with the rest of the stack.
- [ ] Add a unit test file for `src/data/checklist-engine.ts` covering all
      four activity types and both hot-desert and non-desert parks.

## Park expansion queue (evergreen)

Once the "Pending" section above is empty, this is the fallback source of daily
work: add ONE more real U.S. national park, matching the depth/quality of the
existing 11 (real coordinates, all 12 months of `crowdByMonth` with directional
notes, `seasonalNotes` for all 4 seasons, a genuinely researched `generalNote`,
and honest `supportedActivities` — don't add "mountaineering" just to fill the
field if the park has no real technical-peak routes). No stock/generic copy —
every note should reflect something actually true and specific about that park,
the same bar the original 11 were held to.

Take parks from this list in order. This list was assembled from general
knowledge, not a live NPS lookup — before adding one, sanity-check that it's
still an actual current NPS-designated National Park (not a National Monument,
Historic Site, etc.) and isn't already in `src/data/parks.ts`. If a listed name
turns out wrong or already covered, skip it and take the next one, and leave a
note here rather than guessing at replacement data.

New photography is a separate step (needs Wikimedia sourcing this automated
session can't do) — new parks added here should NOT be added to
`PARKS_WITH_PHOTOS` in `src/routes/checklist.tsx`; they'll correctly fall back
to the gradient hero panel until photos are sourced in a batch later.

1. Acadia National Park (Maine)
2. Olympic National Park (Washington)
3. Mount Rainier National Park (Washington)
4. North Cascades National Park (Washington)
5. Crater Lake National Park (Oregon)
6. Redwood National and State Parks (California)
7. Channel Islands National Park (California)
8. Lassen Volcanic National Park (California)
9. Pinnacles National Park (California)
10. Bryce Canyon National Park (Utah)
11. Arches National Park (Utah)
12. Canyonlands National Park (Utah)
13. Capitol Reef National Park (Utah)
14. Mesa Verde National Park (Colorado)
15. Black Canyon of the Gunnison National Park (Colorado)
16. Great Sand Dunes National Park (Colorado)
17. Great Basin National Park (Nevada)
18. Carlsbad Caverns National Park (New Mexico)
19. White Sands National Park (New Mexico)
20. Guadalupe Mountains National Park (Texas)
21. Big Bend National Park (Texas)
22. Petrified Forest National Park (Arizona)
23. Saguaro National Park (Arizona)
24. Badlands National Park (South Dakota)
25. Wind Cave National Park (South Dakota)
26. Theodore Roosevelt National Park (North Dakota)
27. Voyageurs National Park (Minnesota)
28. Isle Royale National Park (Michigan)
29. Shenandoah National Park (Virginia)
30. Mammoth Cave National Park (Kentucky)
31. Hot Springs National Park (Arkansas)
32. Congaree National Park (South Carolina)
33. Everglades National Park (Florida)
34. Biscayne National Park (Florida)
35. Dry Tortugas National Park (Florida)
36. New River Gorge National Park (West Virginia)
37. Cuyahoga Valley National Park (Ohio)
38. Indiana Dunes National Park (Indiana)
39. Denali National Park (Alaska)
40. Kenai Fjords National Park (Alaska)
41. Glacier Bay National Park (Alaska)
42. Katmai National Park (Alaska)
43. Lake Clark National Park (Alaska)
44. Wrangell-St. Elias National Park (Alaska)
45. Gates of the Arctic National Park (Alaska)
46. Haleakalā National Park (Hawaii)
47. Hawaiʻi Volcanoes National Park (Hawaii)
48. Virgin Islands National Park

If this entire list is exhausted (all added, or all a name turned out invalid
and there's nothing left to try), stop and report that honestly rather than
inventing more — do not fabricate a park.

## Done

(nothing yet)
