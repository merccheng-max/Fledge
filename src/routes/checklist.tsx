import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { z } from "zod";
import { AlertTriangle } from "lucide-react";

import { Header } from "@/components/fledge/header";
import { ChecklistView } from "@/components/fledge/checklist-view";
import { WeatherForecastCard } from "@/components/fledge/weather-forecast-card";
import { CrowdLevelCard } from "@/components/fledge/crowd-level-card";
import { TripChat } from "@/components/fledge/trip-chat";
import { Button } from "@/components/ui/button";
import { generateChecklist } from "@/data/checklist-engine";
import { getParkById, monthToSeason } from "@/data/parks";

const checklistSearchSchema = z.object({
  park: z.string(),
  startDate: z.string(),
  days: z.number().int().min(1).max(60),
  group: z.number().int().min(1).max(100),
});

export const Route = createFileRoute("/checklist")({
  validateSearch: checklistSearchSchema,
  component: ChecklistPage,
});

function ChecklistPage() {
  const search = Route.useSearch();
  const navigate = useNavigate();
  const park = getParkById(search.park);

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
  });
  const seasonalNote = park.seasonalNotes[season];
  const crowd = park.crowdByMonth[month];

  const formattedDate = arrivalDate.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="min-h-screen">
      <Header />
      <main className="mx-auto max-w-2xl px-6 py-16">
        <div className="animate-in fade-in slide-in-from-bottom-4 relative overflow-hidden rounded-2xl shadow-md duration-500">
          <img
            src={`/parks/${park.id}.jpg`}
            alt={park.name}
            className="h-56 w-full object-cover sm:h-72"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
            <p className="text-sm font-medium text-accent">Your trip</p>
            <h1 className="mt-1 font-display text-3xl font-semibold tracking-tight text-white">
              {park.name}
            </h1>
            <p className="mt-1.5 text-sm text-white/85">
              {formattedDate} · {search.days} day{search.days === 1 ? "" : "s"} · {search.group}{" "}
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

        <div className="mt-10">
          <ChecklistView checklist={checklist} parkName={park.name} />
        </div>

        <div className="mt-10">
          <TripChat
            tripContext={{
              park: park.name,
              state: park.state,
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
