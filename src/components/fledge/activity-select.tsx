import { ACTIVITY_LABELS, type ActivityType } from "@/data/gear";

const ACTIVITY_OPTIONS: ActivityType[] = ["camping", "hiking", "backpacking", "mountaineering"];

const ACTIVITY_DESCRIPTIONS: Record<ActivityType, string> = {
  camping: "Drive up, unpack the car, and set up basecamp for the night.",
  hiking: "No overnight gear — just what you need to get out and back safely in a day.",
  backpacking: "Carry everything you need on your back for a multi-day route.",
  mountaineering: "Technical routes on snow and ice, with real objective hazards.",
};

// See public/activities/CREDITS.md for sourcing/license details.
const ACTIVITIES_WITH_PHOTOS = new Set<ActivityType>([
  "camping",
  "hiking",
  "backpacking",
  "mountaineering",
]);

export function ActivitySelect({ onSelect }: { onSelect: (activity: ActivityType) => void }) {
  return (
    <div className="grid animate-in fade-in slide-in-from-bottom-4 grid-cols-1 gap-4 duration-500 sm:grid-cols-2">
      {ACTIVITY_OPTIONS.map((activity, index) => (
        <button
          key={activity}
          type="button"
          onClick={() => onSelect(activity)}
          className="hover-lift group relative aspect-[4/5] overflow-hidden rounded-2xl text-left shadow-sm transition-shadow duration-200 hover:shadow-lg"
          style={{ animationDelay: `${index * 60}ms` }}
        >
          {ACTIVITIES_WITH_PHOTOS.has(activity) ? (
            <img
              src={`/activities/${activity}.jpg`}
              alt=""
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-primary/70 to-primary" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
            <h3 className="font-display text-xl font-semibold text-white">
              {ACTIVITY_LABELS[activity]}
            </h3>
            <p className="mt-1 text-sm leading-snug text-white/85">
              {ACTIVITY_DESCRIPTIONS[activity]}
            </p>
          </div>
        </button>
      ))}
    </div>
  );
}
