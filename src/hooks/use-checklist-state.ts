import { useEffect, useState } from "react";
import { fetchChecklistState, setChecklistItemChecked } from "@/lib/trips";

/**
 * Tracks which checklist items are checked off for a saved trip, persisted to
 * trip_checklist_state. Returns a no-op-safe shape when tripId is undefined
 * (unsaved/anonymous trip) so callers don't need to branch on it everywhere.
 */
export function useChecklistState(tripId: string | undefined) {
  const [checkedMap, setCheckedMap] = useState<Record<string, boolean>>({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!tripId) {
      setCheckedMap({});
      setLoaded(true);
      return;
    }
    setLoaded(false);
    fetchChecklistState(tripId)
      .then(setCheckedMap)
      .catch(() => setCheckedMap({}))
      .finally(() => setLoaded(true));
  }, [tripId]);

  function toggle(itemId: string) {
    if (!tripId) return;
    const next = !checkedMap[itemId];
    setCheckedMap((prev) => ({ ...prev, [itemId]: next }));
    setChecklistItemChecked(tripId, itemId, next).catch(() => {
      // Revert on failure so the UI doesn't lie about persisted state.
      setCheckedMap((prev) => ({ ...prev, [itemId]: !next }));
    });
  }

  return { checkedMap, toggle, loaded, interactive: !!tripId };
}
