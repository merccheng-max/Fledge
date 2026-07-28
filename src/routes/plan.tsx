import { createFileRoute } from "@tanstack/react-router";

import { Header } from "@/components/fledge/header";
import { TripInputForm } from "@/components/fledge/trip-input-form";

export const Route = createFileRoute("/plan")({
  component: PlanPage,
});

function PlanPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="mx-auto max-w-md px-6 py-16">
        <h1 className="font-display text-3xl font-semibold tracking-tight text-foreground">
          Plan your trip
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          A few details and we'll build your gear list.
        </p>
        <div className="mt-10">
          <TripInputForm />
        </div>
      </main>
    </div>
  );
}
