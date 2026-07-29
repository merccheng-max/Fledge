import { Users } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { CROWD_LABELS, type CrowdLevel } from "@/data/parks";

const LEVEL_STYLES: Record<CrowdLevel, string> = {
  quiet: "bg-primary/15 text-primary",
  moderate: "bg-secondary text-secondary-foreground",
  busy: "bg-accent/15 text-accent",
  "very-busy": "bg-accent/25 text-accent",
};

export function CrowdLevelCard({ level, note }: { level: CrowdLevel; note: string }) {
  return (
    <Card className="hover-lift p-4">
      <div className="flex items-center gap-2">
        <Users className="h-4 w-4 text-primary" />
        <h3 className="font-display text-base font-semibold text-foreground">
          How crowded it typically is
        </h3>
      </div>
      <div className="mt-3 flex items-center gap-2">
        <Badge variant="secondary" className={LEVEL_STYLES[level]}>
          {CROWD_LABELS[level]}
        </Badge>
      </div>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{note}</p>
      <p className="mt-2 text-xs text-muted-foreground/70">
        Based on typical historical visitation patterns for this month, not live data.
      </p>
    </Card>
  );
}
