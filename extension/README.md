# Fledge Trip Fit Score — Chrome extension (v1)

While shopping on REI, score a product against the actual requirements of your Fledge
trip — computed from the same checklist engine as the web app — instead of a review-sentiment
score. See `docs/PRD.md` for the reasoning behind this design.

## How it works

1. **Link a trip.** Open your trip's `/checklist?...` URL in Fledge, copy it, and paste it
   into the extension popup. The trip is fully described by that URL's search params
   (park, start date, days, group size) — no account needed, consistent with the web app's
   no-accounts v1 scope.
2. **Set your Fledge app URL** once in the popup (wherever the app is deployed). The extension
   requests permission for that origin only, via `chrome.permissions.request` — it doesn't
   ask for broad host access up front.
3. **On a REI product page**, click the floating "Check fit for trip" button. Pick which
   checklist item the product is for (auto-guessed from the page title, overridable), and
   it POSTs the scraped spec table to `/api/extension-score`, which reuses
   `src/lib/fit-scoring.ts` and `src/data/checklist-engine.ts` to score it 0–100 against
   this specific trip.

## Scope of v1

- **Retailer:** REI only. Spec-table scraping is DOM-shape-specific; scoped to one retailer
  rather than promising "any site."
- **Scored items:** tent, sleeping bag, water containers, cooler, rain shell. These are the
  items with a real, checkable requirement (capacity vs. group size, temp rating vs.
  estimated coldest night, etc.). Everything else in the catalog is selectable in the
  picker but returns "no fit-scoring rule yet" rather than a fabricated number.
- **No saved history.** Each score is a one-off check, not persisted — matches the web app's
  no-accounts decision.

## Local install (unpacked)

1. `chrome://extensions` → enable Developer Mode → "Load unpacked" → select this `extension/`
   folder.
2. Open the extension popup, set your Fledge app URL, and link a trip.
3. Visit any `rei.com/product/...` page.

## Files

- `manifest.json` — MV3 manifest.
- `popup.html` / `popup.js` / `popup.css` — trip linking + app URL setup.
- `content-rei.js` / `content.css` — injected widget + spec scraping on REI product pages.
- `background.js` — service worker; makes the actual `/api/extension-score` call under the
  extension's granted host permission (avoids the retailer page's CSP).
- `gear-catalog.js` — a manual, plain-JS mirror of `src/data/gear.ts`'s id/name/commonlyMissed
  fields, since the extension has no build step to import TypeScript directly.
