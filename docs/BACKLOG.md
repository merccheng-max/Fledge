# Backlog

Small, real, scoped improvements — pulled one at a time by the daily automated
maintenance session (see `docs/AUTOMATION.md`). Each item should be genuinely
useful on its own, not padding. Check items off as `[x]` when shipped, with the
commit SHA.

## Pending

- [ ] Add fit-scoring rules to `src/lib/fit-scoring.ts` for `backpacking-pack`
      (capacity in liters vs. trip length/group size) and `ice-axe` (length vs.
      user height/route type, or a simpler "no numeric rating on REI pages —
      skip scoring, just confirm it's rated for mountaineering" check if a
      real numeric spec isn't reliably available).
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

## Done

(nothing yet)
