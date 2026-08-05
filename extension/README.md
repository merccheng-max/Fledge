# Fledge Trip Fit Score — Chrome extension (v2)

While shopping on REI, score a product against the actual requirements of your Fledge
trip — computed from the same checklist engine as the web app — instead of a review-sentiment
score. Optionally log in to check items off your saved checklist directly from the product page.
See `docs/PRD.md` for the reasoning behind this design.

## How it works

1. **Link a trip**, one of two ways:
   - **Logged in**: log in with the same email/password as the web app, then pick from
     "Your saved trips" — this links the trip's real `tripId`, so checking items off here
     writes straight to the same `trip_checklist_state` rows the web app reads, no separate
     sync step.
   - **No account**: paste your trip's `/checklist?...` URL instead. Works exactly as before —
     scoring still works, but there's no `tripId` to check items off against.
2. **Set your Fledge app URL** once in the popup (wherever the app is deployed). The extension
   requests permission for that origin only, via `chrome.permissions.request` — it doesn't
   ask for broad host access up front.
3. **On a REI product page**, click the floating "Check fit for trip" button. Pick which
   checklist item the product is for (auto-guessed from the page title, overridable), and
   it POSTs the scraped spec table to `/api/extension-score`, which reuses
   `src/lib/fit-scoring.ts` and `src/data/checklist-engine.ts` to score it 0–100 against
   this specific trip.
4. If the linked trip is saved (has a `tripId`), a **"Mark as checked off"** button appears
   under the result — writes directly to Supabase via `background.js`, respecting the same
   row-level-security policies as the web app (a user can only ever write to their own trips).

## Scope of v2

- **Retailer:** REI only. Spec-table scraping is DOM-shape-specific; scoped to one retailer
  rather than promising "any site."
- **Scored items:** tent, sleeping bag, sleeping pad, insulating layer, water containers,
  cooler, rain shell, backpacking pack, mountaineering boots. These are the items with a
  real, checkable requirement (capacity vs. group size, R-value/temp/fill-power vs. estimated
  coldest night, pack liters vs. trip length, etc.). Everything else in the catalog is
  selectable in the picker and can still be checked off, but scoring returns "no fit-scoring
  rule yet" rather than a fabricated number.
- **Auth talks to Supabase directly**, not through the Fledge app's server — the popup and
  background worker call Supabase's Auth and REST (PostgREST) endpoints with the same public
  anon key the web app uses. Authorization is enforced by Postgres row-level security, not by
  anything in this extension, so a compromised extension build still can't read or write
  another user's data.

## Local install (unpacked)

1. `chrome://extensions` → enable Developer Mode → "Load unpacked" → select this `extension/`
   folder.
2. Open the extension popup, set your Fledge app URL, and either log in + pick a saved trip,
   or paste a trip link.
3. Visit any `rei.com/product/...` page.

## Files

- `manifest.json` — MV3 manifest. Background service worker runs as an ES module so it can
  `import` `supabase-auth.js`.
- `popup.html` / `popup.js` / `popup.css` — login, trip linking (saved-trip picker or pasted
  URL), app URL setup.
- `content-rei.js` / `content.css` — injected widget, spec scraping, and the check-off button
  on REI product pages.
- `background.js` — service worker; makes the `/api/extension-score` call and the Supabase
  check-off write, both under the extension's granted host permissions (avoids the retailer
  page's CSP for the former, keeps Supabase calls out of the content-script context for the
  latter).
- `supabase-auth.js` — shared Supabase Auth + REST helpers (sign in/out, session refresh, list
  trips, set a checklist item's checked state), imported by both `popup.js` and `background.js`.
- `gear-catalog.js` — a manual, plain-JS mirror of `src/data/gear.ts`'s id/name/commonlyMissed
  fields, since the extension has no build step to import TypeScript directly.
