// Talks to Supabase directly (Auth + PostgREST), the same public project the
// web app uses. SUPABASE_URL/ANON_KEY are the publishable, RLS-scoped
// values already committed in the web app's .env — safe to embed here too.
// All row access is enforced server-side by the trips/trip_checklist_state
// RLS policies (see the migration run when this feature was added), so a
// stolen anon key + no user session can't read or write anyone's data.

export const SUPABASE_URL = "https://txggxwxkhxwvxartmzwo.supabase.co";
export const SUPABASE_ANON_KEY = "sb_publishable_GES3ZWmdF8-xyWayQdbJ-A_PQFwV7yv";

async function authFetch(path, body) {
  const response = await fetch(`${SUPABASE_URL}/auth/v1${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", apikey: SUPABASE_ANON_KEY },
    body: JSON.stringify(body),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error_description || data.msg || "Authentication failed.");
  }
  return data;
}

export async function signIn(email, password) {
  const data = await authFetch("/token?grant_type=password", { email, password });
  const session = {
    accessToken: data.access_token,
    refreshToken: data.refresh_token,
    expiresAt: Date.now() + data.expires_in * 1000,
    userId: data.user.id,
    email: data.user.email,
  };
  await chrome.storage.local.set({ session });
  return session;
}

export async function signOut() {
  await chrome.storage.local.remove(["session", "trip"]);
}

export async function getSession() {
  const { session } = await chrome.storage.local.get(["session"]);
  if (!session) return null;

  if (Date.now() < session.expiresAt - 30_000) return session;

  // Access token expired or close to it — refresh.
  try {
    const data = await authFetch("/token?grant_type=refresh_token", {
      refresh_token: session.refreshToken,
    });
    const refreshed = {
      accessToken: data.access_token,
      refreshToken: data.refresh_token,
      expiresAt: Date.now() + data.expires_in * 1000,
      userId: data.user.id,
      email: data.user.email,
    };
    await chrome.storage.local.set({ session: refreshed });
    return refreshed;
  } catch {
    await chrome.storage.local.remove(["session"]);
    return null;
  }
}

async function restFetch(path, session, init = {}) {
  const response = await fetch(`${SUPABASE_URL}/rest/v1${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${session.accessToken}`,
      ...init.headers,
    },
  });
  if (!response.ok) {
    const text = await response.text().catch(() => "");
    throw new Error(`Request failed (${response.status}): ${text}`);
  }
  return response.status === 204 ? null : response.json();
}

export async function listTrips(session) {
  return restFetch("/trips?select=*&order=created_at.desc", session);
}

export async function setChecklistItemChecked(session, tripId, itemId, checked) {
  return restFetch("/trip_checklist_state", session, {
    method: "POST",
    headers: { Prefer: "resolution=merge-duplicates,return=minimal" },
    body: JSON.stringify([
      { trip_id: tripId, item_id: itemId, checked, updated_at: new Date().toISOString() },
    ]),
  });
}
