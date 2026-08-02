import { supabase } from "@/integrations/supabase/client";
import type { ActivityType } from "@/data/gear";

export interface SavedTrip {
  id: string;
  parkId: string;
  activity: ActivityType;
  startDate: string;
  days: number;
  groupSize: number;
  createdAt: string;
}

function rowToTrip(row: {
  id: string;
  park_id: string;
  activity: string;
  start_date: string;
  days: number;
  group_size: number;
  created_at: string;
}): SavedTrip {
  return {
    id: row.id,
    parkId: row.park_id,
    activity: row.activity as ActivityType,
    startDate: row.start_date,
    days: row.days,
    groupSize: row.group_size,
    createdAt: row.created_at,
  };
}

export async function fetchUserTrips(): Promise<SavedTrip[]> {
  const { data, error } = await supabase
    .from("trips")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data.map(rowToTrip);
}

export async function fetchTripById(tripId: string): Promise<SavedTrip | null> {
  const { data, error } = await supabase.from("trips").select("*").eq("id", tripId).maybeSingle();
  if (error) throw error;
  return data ? rowToTrip(data) : null;
}

export async function createTrip(input: {
  userId: string;
  parkId: string;
  activity: ActivityType;
  startDate: string;
  days: number;
  groupSize: number;
}): Promise<SavedTrip> {
  const { data, error } = await supabase
    .from("trips")
    .insert({
      user_id: input.userId,
      park_id: input.parkId,
      activity: input.activity,
      start_date: input.startDate,
      days: input.days,
      group_size: input.groupSize,
    })
    .select()
    .single();
  if (error) throw error;
  return rowToTrip(data);
}

export async function deleteTrip(tripId: string): Promise<void> {
  const { error } = await supabase.from("trips").delete().eq("id", tripId);
  if (error) throw error;
}

export async function fetchChecklistState(tripId: string): Promise<Record<string, boolean>> {
  const { data, error } = await supabase
    .from("trip_checklist_state")
    .select("item_id, checked")
    .eq("trip_id", tripId);
  if (error) throw error;
  return Object.fromEntries(data.map((row) => [row.item_id, row.checked]));
}

export async function setChecklistItemChecked(
  tripId: string,
  itemId: string,
  checked: boolean,
): Promise<void> {
  const { error } = await supabase
    .from("trip_checklist_state")
    .upsert(
      { trip_id: tripId, item_id: itemId, checked, updated_at: new Date().toISOString() },
      { onConflict: "trip_id,item_id" },
    );
  if (error) throw error;
}
