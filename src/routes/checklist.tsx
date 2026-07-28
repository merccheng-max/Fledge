import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { z } from "zod";
import { AlertTriangle } from "lucide-react";

import { Header } from "@/components/fledge/header";
import { ChecklistView } from "@/components/fledge/checklist-view";
import { Button } from "@/components/ui/button";
import { generateChecklist } from "@/data/checklist-engine";
import { getParkById, type Season } from "@/data/parks";

const checklistSearchSchema = z.object({
  park: z.string(),
  days: z.number().int().min(1).max(60),
  group: z.number().int().min(1).max(100),
  season: z.enum(["spring", "summer", "fall", "winter"]),
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
      <div className="min-h-screen bg-background">
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

  const checklist = generateChecklist({
    parkId: search.park,
    days: search.days,
    groupSize: search.group,
    season: search.season as Season,
  });
  const seasonalNote = park.seasonalNotes[search.season as Season];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="mx-auto max-w-2xl px-6 py-16">
        <p className="text-sm font-medium text-primary">Your trip</p>
        <h1 className="mt-1 font-display text-3xl font-semibold tracking-tight text-foreground">
          {park.name}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {search.days} day{search.days === 1 ? "" : "s"} · {search.group}{" "}
          {search.group === 1 ? "person" : "people"} ·{" "}
          {search.season.charAt(0).toUpperCase() + search.season.slice(1)}
        </p>

        {(seasonalNote || park.generalNote) && (
          <div className="mt-6 space-y-3">
            {seasonalNote && <NoteCard text={seasonalNote} />}
            <NoteCard text={park.generalNote} />
          </div>
        )}

        <div className="mt-10">
          <ChecklistView checklist={checklist} />
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
    <div className="flex items-start gap-2.5 rounded-lg border border-accent/30 bg-accent/10 p-3.5">
      <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
      <p className="text-sm leading-relaxed text-foreground">{text}</p>
    </div>
  );
}
