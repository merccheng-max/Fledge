import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";

import { Header } from "@/components/fledge/header";
import { ActivitySelect } from "@/components/fledge/activity-select";
import { TripInputForm } from "@/components/fledge/trip-input-form";
import type { ActivityType } from "@/data/gear";

export const Route = createFileRoute("/plan")({
  component: PlanPage,
});

function PlanPage() {
  const [activity, setActivity] = useState<ActivityType | null>(null);

  return (
    <div className="min-h-screen">
      <Header />
      <main className={`mx-auto px-6 py-16 ${activity ? "max-w-md" : "max-w-3xl"}`}>
        {activity === null ? (
          <>
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h1 className="font-display text-3xl font-semibold tracking-tight text-foreground">
                What kind of trip is this?
              </h1>
              <p className="mt-2 text-sm text-muted-foreground">
                Each one pulls a different gear list, tuned to what that trip actually needs.
              </p>
            </div>
            <div className="mt-10">
              <ActivitySelect onSelect={setActivity} />
            </div>
          </>
        ) : (
          <>
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h1 className="font-display text-3xl font-semibold tracking-tight text-foreground">
                Plan your trip
              </h1>
              <p className="mt-2 text-sm text-muted-foreground">
                A few details and we'll build your gear list.
              </p>
            </div>
            <div className="mt-10">
              <TripInputForm activity={activity} onChangeActivity={() => setActivity(null)} />
            </div>
          </>
        )}
      </main>
    </div>
  );
}
