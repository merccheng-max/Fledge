import { AlertCircle } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import type { ChecklistItem } from "@/data/checklist-engine";

export function GearDetailSheet({
  item,
  onOpenChange,
}: {
  item: ChecklistItem | null;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Sheet open={item !== null} onOpenChange={onOpenChange}>
      <SheetContent>
        {item && (
          <>
            <SheetHeader>
              <div className="flex items-center gap-2">
                <SheetTitle className="font-display text-xl">{item.name}</SheetTitle>
                {item.commonlyMissed && (
                  <Badge variant="secondary" className="bg-accent/15 text-accent">
                    Commonly missed
                  </Badge>
                )}
              </div>
              {item.quantity && (
                <SheetDescription className="font-medium text-foreground">
                  {item.quantity.total}
                </SheetDescription>
              )}
            </SheetHeader>

            <div className="mt-6 space-y-6">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                  What it is
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground">{item.what}</p>
              </div>

              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                  Why you need it
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground">{item.why}</p>
              </div>

              {item.quantity && (
                <div className="rounded-lg bg-muted p-4">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">{item.quantity.formula}</p>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
