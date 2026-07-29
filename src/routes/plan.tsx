import { createFileRoute } from "@tanstack/react-router";

import { Header } from "@/components/fledge/header";
import { TripInputForm } from "@/components/fledge/trip-input-form";
import { DecorativeMountains } from "@/components/fledge/decorative-mountains";

export const Route = createFileRoute("/plan")({
  component: PlanPage,
});

function PlanPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="relative mx-auto max-w-4xl overflow-hidden px-6 py-16">
        <DecorativeMountains className="pointer-events-none absolute -right-32 top-0 -z-10 hidden h-[440px] w-[440px] text-primary md:block" />
        <div className="max-w-md">
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h1 className="font-display text-3xl font-semibold tracking-tight text-foreground">
              Plan your trip
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              A few details and we'll build your gear list.
            </p>
          </div>
          <div className="mt-10">
            <TripInputForm />
          </div>
        </div>
      </main>
    </div>
  );
}
