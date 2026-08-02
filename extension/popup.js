import { signIn, signOut, getSession, listTrips } from "./supabase-auth.js";

const PARK_NAMES = {
  yosemite: "Yosemite National Park",
  "sequoia-kings-canyon": "Sequoia & Kings Canyon National Parks",
  "joshua-tree": "Joshua Tree National Park",
  "death-valley": "Death Valley National Park",
  zion: "Zion National Park",
  "grand-canyon": "Grand Canyon National Park",
  yellowstone: "Yellowstone National Park",
  "rocky-mountain": "Rocky Mountain National Park",
  "grand-teton": "Grand Teton National Park",
  "great-smoky-mountains": "Great Smoky Mountains National Park",
  glacier: "Glacier National Park",
};

const appUrlInput = document.getElementById("app-url");
const tripLinkInput = document.getElementById("trip-link");
const statusEl = document.getElementById("status");
const summarySection = document.getElementById("trip-summary");
const summaryText = document.getElementById("trip-summary-text");
const loggedOutForm = document.getElementById("logged-out-form");
const loggedInState = document.getElementById("logged-in-state");
const accountEmailEl = loggedInState.querySelector(".account-email");
const savedTripsSection = document.getElementById("saved-trips-section");
const savedTripsSelect = document.getElementById("saved-trips");

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
  const savedTag = trip.tripId ? " · saved (check-off syncs)" : "";
  summaryText.textContent = `${parkName} · ${trip.startDate} · ${trip.days} day${
    trip.days === 1 ? "" : "s"
  } · ${trip.groupSize} ${trip.groupSize === 1 ? "person" : "people"}${savedTag}`;
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
  const activity = url.searchParams.get("activity") ?? "camping";
  const tripId = url.searchParams.get("tripId") ?? undefined;

  if (!parkId || !startDate || !Number.isFinite(days) || !Number.isFinite(groupSize)) {
    return null;
  }
  return { parkId, startDate, days, groupSize, activity, tripId };
}

async function refreshAccountUI() {
  const session = await getSession();
  if (session) {
    loggedOutForm.classList.add("hidden");
    loggedInState.classList.remove("hidden");
    accountEmailEl.textContent = session.email;
    savedTripsSection.classList.remove("hidden");
    await loadSavedTrips(session);
  } else {
    loggedOutForm.classList.remove("hidden");
    loggedInState.classList.add("hidden");
    savedTripsSection.classList.add("hidden");
  }
}

async function loadSavedTrips(session) {
  try {
    const trips = await listTrips(session);
    savedTripsSelect.innerHTML = trips
      .map((t) => {
        const parkName = PARK_NAMES[t.park_id] ?? t.park_id;
        return `<option value="${t.id}">${parkName} · ${t.start_date}</option>`;
      })
      .join("");
    savedTripsSelect.dataset.trips = JSON.stringify(trips);
  } catch (error) {
    showStatus(`Couldn't load saved trips: ${error.message}`, true);
  }
}

async function loadState() {
  const { apiBaseUrl, trip } = await chrome.storage.local.get(["apiBaseUrl", "trip"]);
  if (apiBaseUrl) appUrlInput.value = apiBaseUrl;
  renderTripSummary(trip);
  await refreshAccountUI();
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

document.getElementById("login-submit").addEventListener("click", async () => {
  const email = document.getElementById("login-email").value.trim();
  const password = document.getElementById("login-password").value;
  if (!email || !password) {
    showStatus("Enter your email and password.", true);
    return;
  }
  try {
    await signIn(email, password);
    showStatus("Logged in.", false);
    document.getElementById("login-password").value = "";
    await refreshAccountUI();
  } catch (error) {
    showStatus(error.message, true);
  }
});

document.getElementById("logout-submit").addEventListener("click", async () => {
  await signOut();
  showStatus("Logged out.", false);
  await refreshAccountUI();
});

document.getElementById("use-saved-trip").addEventListener("click", async () => {
  const trips = JSON.parse(savedTripsSelect.dataset.trips ?? "[]");
  const selected = trips.find((t) => t.id === savedTripsSelect.value);
  if (!selected) {
    showStatus("No saved trips to use.", true);
    return;
  }
  const trip = {
    parkId: selected.park_id,
    startDate: selected.start_date,
    days: selected.days,
    groupSize: selected.group_size,
    activity: selected.activity,
    tripId: selected.id,
  };
  await chrome.storage.local.set({ trip });
  renderTripSummary(trip);
  showStatus("Trip linked.", false);
});

loadState();
