// MV3 service worker. Owns network calls that need the extension's host_permissions
// grant (rather than the retailer page's CSP): scoring against Fledge's app, and
// (when a trip is saved/linked to an account) checking items off directly via Supabase.

import { getSession, setChecklistItemChecked } from "./supabase-auth.js";

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message?.type === "FLEDGE_SCORE_PRODUCT") {
    handleScoreProduct(message, sendResponse);
    return true; // keep the message channel open for the async response
  }
  if (message?.type === "FLEDGE_SET_CHECKED") {
    handleSetChecked(message, sendResponse);
    return true;
  }
  return false;
});

async function handleScoreProduct(message, sendResponse) {
  try {
    const { apiBaseUrl, trip } = await chrome.storage.local.get(["apiBaseUrl", "trip"]);

    if (!apiBaseUrl) {
      sendResponse({ ok: false, error: "Set your Fledge app URL in the extension popup first." });
      return;
    }
    if (!trip) {
      sendResponse({ ok: false, error: "Link a trip in the extension popup first." });
      return;
    }

    const response = await fetch(`${apiBaseUrl.replace(/\/$/, "")}/api/extension-score`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        parkId: trip.parkId,
        startDate: trip.startDate,
        days: trip.days,
        groupSize: trip.groupSize,
        itemId: message.itemId,
        specs: message.specs,
      }),
    });

    if (!response.ok) {
      const body = await response.json().catch(() => ({}));
      sendResponse({ ok: false, error: body.error ?? `Request failed (${response.status}).` });
      return;
    }

    const result = await response.json();
    sendResponse({ ok: true, result });
  } catch (error) {
    sendResponse({ ok: false, error: error instanceof Error ? error.message : "Network error." });
  }
}

async function handleSetChecked(message, sendResponse) {
  try {
    const { trip } = await chrome.storage.local.get(["trip"]);
    if (!trip?.tripId) {
      sendResponse({ ok: false, error: "This trip isn't saved — nothing to check off." });
      return;
    }
    const session = await getSession();
    if (!session) {
      sendResponse({ ok: false, error: "Log in to check items off." });
      return;
    }
    await setChecklistItemChecked(session, trip.tripId, message.itemId, true);
    sendResponse({ ok: true });
  } catch (error) {
    sendResponse({ ok: false, error: error instanceof Error ? error.message : "Network error." });
  }
}
