import { AlertCircle, ExternalLink } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import type { ChecklistItem } from "@/data/checklist-engine";
import { CATEGORY_ICONS } from "./category-icons";
import { HotspotDiagram } from "./hotspot-diagram";
import { GEAR_DIAGRAMS } from "./gear-diagrams/registry";

function getExternalLink(
  item: ChecklistItem,
  parkName: string,
): { label: string; url: string } | null {
  switch (item.externalLinkType) {
    case "shop":
      return {
        label: "Shop this on REI",
        url: `https://www.rei.com/search?q=${encodeURIComponent(item.name)}`,
      };
    case "official-reservation":
      return {
        label: "Reserve on Recreation.gov",
        url: `https://www.recreation.gov/search?q=${encodeURIComponent(parkName)}&inventory_type=camping`,
      };
    case "official-pass":
      return {
        label: "Learn about park passes (NPS.gov)",
        url: "https://www.nps.gov/planyourvisit/passes.htm",
      };
    default:
      return null;
  }
}

export function GearDetailSheet({
  item,
  parkName,
  onOpenChange,
}: {
  item: ChecklistItem | null;
  parkName: string;
  onOpenChange: (open: boolean) => void;
}) {
  const Icon = item ? CATEGORY_ICONS[item.category] : null;
  const diagram = item ? GEAR_DIAGRAMS[item.id] : undefined;
  const externalLink = item ? getExternalLink(item, parkName) : null;

  return (
    <Sheet open={item !== null} onOpenChange={onOpenChange}>
      <SheetContent className="overflow-y-auto">
        {item && (
          <>
            <SheetHeader>
              <div className="flex items-center gap-2">
                {Icon && (
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Icon className="h-4 w-4" />
                  </span>
                )}
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
              {diagram && (
                <HotspotDiagram
                  Diagram={diagram.Diagram}
                  hotspots={diagram.hotspots}
                  aspectRatio={diagram.aspectRatio}
                />
              )}

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

              {externalLink && (
                <a
                  href={externalLink.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover-lift inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
                >
                  {externalLink.label}
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              )}
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
