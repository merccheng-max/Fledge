import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { z } from "zod";
import { AlertTriangle, BookmarkPlus, ExternalLink, Loader2 } from "lucide-react";

import { Header } from "@/components/fledge/header";
import { ChecklistView } from "@/components/fledge/checklist-view";
import { WeatherForecastCard } from "@/components/fledge/weather-forecast-card";
import { CrowdLevelCard } from "@/components/fledge/crowd-level-card";
import { TripChat } from "@/components/fledge/trip-chat";
import { Button } from "@/components/ui/button";
import { generateChecklist } from "@/data/checklist-engine";
import { ACTIVITY_LABELS, type ActivityType } from "@/data/gear";
import { getParkById, monthToSeason } from "@/data/parks";
import { useAuth } from "@/lib/auth";
import { createTrip } from "@/lib/trips";
import { useChecklistState } from "@/hooks/use-checklist-state";

// Parks we have real, rights-cleared hero photography for (see public/parks/CREDITS.md).
// Everything else falls back to a plain gradient panel rather than a broken image.
const PARKS_WITH_PHOTOS = new Set([
  "yosemite",
  "sequoia-kings-canyon",
  "joshua-tree",
  "death-valley",
  "zion",
  "grand-canyon",
  "yellowstone",
  "rocky-mountain",
  "grand-teton",
  "great-smoky-mountains",
  "glacier",
]);

const checklistSearchSchema = z.object({
  park: z.string(),
  startDate: z.string(),
  days: z.number().int().min(1).max(60),
  group: z.number().int().min(1).max(100),
  activity: z.enum(["camping", "hiking", "backpacking", "mountaineering"]).default("camping"),
  /** Present once a trip has been saved — enables persisted checklist check-offs. */
  tripId: z.string().optional(),
});

export const Route = createFileRoute("/checklist")({
  validateSearch: checklistSearchSchema,
  component: ChecklistPage,
});

function ChecklistPage() {
  const search = Route.useSearch();
  const navigate = useNavigate();
  const park = getParkById(search.park);
  const { session } = useAuth();
  const { checkedMap, toggle, interactive } = useChecklistState(search.tripId);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  if (!park) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="mx-auto max-w-md px-6 py-16 text-center">
          <h1 className="font-display text-2xl font-semibold text-foreground">
            We couldn't find that trip
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Let's start over and build a new one.
          </p>
          <Button className="mt-6" onClick={() => navigate({ to: "/plan" })}>
            Plan a trip
          </Button>
        </main>
      </div>
    );
  }

  const arrivalDate = new Date(`${search.startDate}T00:00:00`);
  const month = arrivalDate.getMonth() + 1;
  const season = monthToSeason(month);

  const checklist = generateChecklist({
    parkId: search.park,
    startDate: search.startDate,
    days: search.days,
    groupSize: search.group,
    activity: search.activity,
  });
  const seasonalNote = park.seasonalNotes[season];
  const crowd = park.crowdByMonth[month];

  const formattedDate = arrivalDate.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  async function handleSaveTrip() {
    if (!session) return;
    setSaving(true);
    setSaveError(null);
    try {
      const trip = await createTrip({
        userId: session.user.id,
        parkId: search.park,
        activity: search.activity,
        startDate: search.startDate,
        days: search.days,
        groupSize: search.group,
      });
      navigate({
        to: "/checklist",
        search: { ...search, tripId: trip.id },
        replace: true,
      });
    } catch (e) {
      setSaveError(e instanceof Error ? e.message : "Couldn't save this trip.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="mx-auto max-w-2xl px-6 py-16">
        <div className="animate-in fade-in slide-in-from-bottom-4 relative overflow-hidden rounded-2xl shadow-md duration-500">
          {PARKS_WITH_PHOTOS.has(park.id) ? (
            <>
              <img
                src={`/parks/${park.id}.jpg`}
                alt={park.name}
                className="h-56 w-full object-cover sm:h-72"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
            </>
          ) : (
            <div className="h-56 w-full bg-gradient-to-br from-primary/80 to-primary sm:h-72" />
          )}
          <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
            <p className="text-sm font-medium text-accent">Your trip</p>
            <h1 className="mt-1 font-display text-3xl font-semibold tracking-tight text-white">
              {park.name}
            </h1>
            <p className="mt-1.5 text-sm text-white/85">
              {ACTIVITY_LABELS[search.activity]} · {formattedDate} · {search.days} day
              {search.days === 1 ? "" : "s"} · {search.group}{" "}
              {search.group === 1 ? "person" : "people"}
            </p>
          </div>
        </div>

        <div
          className="mt-6 grid animate-in fade-in slide-in-from-bottom-4 gap-3 duration-500 delay-100 sm:grid-cols-2"
          style={{ animationFillMode: "backwards" }}
        >
          <WeatherForecastCard
            lat={park.coordinates.lat}
            lon={park.coordinates.lon}
            startDate={search.startDate}
            days={search.days}
            fallbackNote={seasonalNote ?? "No seasonal notes available for this time of year."}
          />
          {crowd && <CrowdLevelCard level={crowd.level} note={crowd.note} />}
        </div>

        {park.generalNote && (
          <div className="mt-3">
            <NoteCard text={park.generalNote} />
          </div>
        )}

        {search.activity !== "camping" && (
          <div className="mt-3">
            <TrailLinksCard parkName={park.name} activity={search.activity} />
          </div>
        )}

        {session && !search.tripId && (
          <div className="mt-3 flex items-center justify-between gap-3 rounded-lg border border-border bg-card/85 p-3.5">
            <p className="text-sm text-muted-foreground">
              Save this trip to check off gear here and in the Chrome extension as you shop.
            </p>
            <div className="flex shrink-0 flex-col items-end gap-1">
              <Button size="sm" onClick={handleSaveTrip} disabled={saving}>
                {saving ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <BookmarkPlus className="h-4 w-4" />
                )}
                Save trip
              </Button>
              {saveError && <p className="text-xs text-destructive">{saveError}</p>}
            </div>
          </div>
        )}

        {!session && (
          <div className="mt-3 rounded-lg border border-dashed border-border p-3.5 text-sm text-muted-foreground">
            <Link to="/login" className="font-medium text-primary hover:underline">
              Log in
            </Link>{" "}
            to save this trip and check off gear as you shop.
          </div>
        )}

        <div className="mt-10">
          <ChecklistView
            checklist={checklist}
            parkName={park.name}
            checkedMap={checkedMap}
            onToggle={toggle}
            interactive={interactive}
          />
        </div>

        <div className="mt-10">
          <TripChat
            tripContext={{
              park: park.name,
              state: park.state,
              activity: ACTIVITY_LABELS[search.activity],
              startDate: search.startDate,
              days: search.days,
              groupSize: search.group,
              season,
              seasonalNote: seasonalNote ?? null,
              parkGeneralNote: park.generalNote,
              crowdLevel: crowd ?? null,
              checklist: checklist.categories.flatMap((group) =>
                group.items.map((item) => ({
                  category: group.category,
                  name: item.name,
                  what: item.what,
                  why: item.why,
                  commonlyMissed: item.commonlyMissed ?? false,
                  quantity: item.quantity ?? null,
                })),
              ),
            }}
          />
        </div>

        <div className="mt-12 border-t border-border pt-6">
          <Link to="/plan" className="text-sm font-medium text-primary hover:underline">
            Start a new trip
          </Link>
        </div>
      </main>
    </div>
  );
}

function NoteCard({ text }: { text: string }) {
  return (
    <div className="hover-lift flex items-start gap-2.5 rounded-lg border border-accent/30 bg-accent/10 p-3.5">
      <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
      <p className="text-sm leading-relaxed text-foreground">{text}</p>
    </div>
  );
}

// Fledge doesn't have trail-by-trail route data, so this points to a durable search
// rather than a guessed specific trail-database URL (which risks a confidently wrong link).
function TrailLinksCard({ parkName, activity }: { parkName: string; activity: ActivityType }) {
  const query =
    activity === "mountaineering"
      ? `${parkName} mountaineering routes conditions`
      : `${parkName} ${activity} trails`;
  const label =
    activity === "mountaineering" ? "Research routes & conditions" : "Find trails at this park";

  return (
    <div className="hover-lift flex items-center justify-between gap-3 rounded-lg border border-border bg-card/85 p-3.5">
      <p className="text-sm text-muted-foreground">
        Fledge doesn't have trail-by-trail route data yet — start here for current conditions.
      </p>
      <a
        href={`https://www.google.com/search?q=${encodeURIComponent(query)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-primary hover:underline"
      >
        {label}
        <ExternalLink className="h-3.5 w-3.5" />
      </a>
    </div>
  );
}
