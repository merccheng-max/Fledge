const PARK_NAMES = {
  yosemite: "Yosemite National Park",
  "sequoia-kings-canyon": "Sequoia & Kings Canyon National Parks",
  "joshua-tree": "Joshua Tree National Park",
  "death-valley": "Death Valley National Park",
  zion: "Zion National Park",
};

const appUrlInput = document.getElementById("app-url");
const tripLinkInput = document.getElementById("trip-link");
const statusEl = document.getElementById("status");
const summarySection = document.getElementById("trip-summary");
const summaryText = document.getElementById("trip-summary-text");

function showStatus(message, isError) {
  statusEl.textContent = message;
  statusEl.className = isError ? "status error" : "status ok";
}

function renderTripSummary(trip) {
  if (!trip) {
    summarySection.classList.add("hidden");
    return;
  }
  const parkName = PARK_NAMES[trip.parkId] ?? trip.parkId;
  summaryText.textContent = `${parkName} · ${trip.startDate} · ${trip.days} day${
    trip.days === 1 ? "" : "s"
  } · ${trip.groupSize} ${trip.groupSize === 1 ? "person" : "people"}`;
  summarySection.classList.remove("hidden");
}

function parseTripLink(rawUrl) {
  let url;
  try {
    url = new URL(rawUrl);
  } catch {
    return null;
  }
  const parkId = url.searchParams.get("park");
  const startDate = url.searchParams.get("startDate");
  const days = Number(url.searchParams.get("days"));
  const groupSize = Number(url.searchParams.get("group"));

  if (!parkId || !startDate || !Number.isFinite(days) || !Number.isFinite(groupSize)) {
    return null;
  }
  return { parkId, startDate, days, groupSize };
}

async function loadState() {
  const { apiBaseUrl, trip } = await chrome.storage.local.get(["apiBaseUrl", "trip"]);
  if (apiBaseUrl) appUrlInput.value = apiBaseUrl;
  renderTripSummary(trip);
}

document.getElementById("save-url").addEventListener("click", async () => {
  const rawUrl = appUrlInput.value.trim();
  if (!rawUrl) {
    showStatus("Enter your Fledge app URL first.", true);
    return;
  }

  let origin;
  try {
    origin = new URL(rawUrl).origin;
  } catch {
    showStatus("That doesn't look like a valid URL.", true);
    return;
  }

  const granted = await chrome.permissions.request({ origins: [`${origin}/*`] });
  if (!granted) {
    showStatus("Permission needed to reach that URL — not saved.", true);
    return;
  }

  await chrome.storage.local.set({ apiBaseUrl: origin });
  showStatus("Saved.", false);
});

document.getElementById("save-trip").addEventListener("click", async () => {
  const trip = parseTripLink(tripLinkInput.value.trim());
  if (!trip) {
    showStatus("Couldn't read a trip from that link — paste the full /checklist?... URL.", true);
    return;
  }
  await chrome.storage.local.set({ trip });
  renderTripSummary(trip);
  tripLinkInput.value = "";
  showStatus("Trip linked.", false);
});

loadState();
