// MV3 service worker. Owns the actual network call to Fledge's /api/extension-score
// route — done here (not in the content script) so it runs under the extension's
// host_permissions grant rather than the retailer page's CSP.

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message?.type !== "FLEDGE_SCORE_PRODUCT") return false;

  (async () => {
    try {
      const { apiBaseUrl, trip } = await chrome.storage.local.get(["apiBaseUrl", "trip"]);

      if (!apiBaseUrl) {
        sendResponse({ ok: false, error: "Set your Fledge app URL in the extension popup first." });
        return;
      }
      if (!trip) {
        sendResponse({ ok: false, error: "Paste your Fledge trip link in the extension popup first." });
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
  })();

  return true; // keep the message channel open for the async response
});
