import { useState } from "react";
import { ChevronRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { CATEGORY_LABELS } from "@/data/gear";
import type { Checklist, ChecklistItem } from "@/data/checklist-engine";
import { CATEGORY_ICONS } from "./category-icons";
import { GearDetailSheet } from "./gear-detail-sheet";

export function ChecklistView({ checklist }: { checklist: Checklist }) {
  const [selectedItem, setSelectedItem] = useState<ChecklistItem | null>(null);

  return (
    <div className="space-y-10">
      {checklist.categories.map((group, groupIndex) => {
        const Icon = CATEGORY_ICONS[group.category];
        return (
          <div
            key={group.category}
            className="animate-in fade-in slide-in-from-bottom-3 duration-500"
            style={{
              animationDelay: `${Math.min(groupIndex, 6) * 60}ms`,
              animationFillMode: "backwards",
            }}
          >
            <h2 className="flex items-center gap-2 font-display text-lg font-semibold text-foreground">
              <Icon className="h-4 w-4 text-primary" />
              {CATEGORY_LABELS[group.category]}
            </h2>
            <Card className="mt-3 divide-y divide-border overflow-hidden py-0">
              {group.items.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setSelectedItem(item)}
                  className="group flex w-full cursor-pointer items-center justify-between gap-4 px-4 py-3.5 text-left transition-colors hover:bg-muted/60"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-foreground">{item.name}</span>
                      {item.commonlyMissed && (
                        <Badge
                          variant="secondary"
                          className="shrink-0 bg-accent/15 text-xs text-accent"
                        >
                          Commonly missed
                        </Badge>
                      )}
                    </div>
                    {item.quantity && (
                      <p className="mt-0.5 text-sm text-muted-foreground">{item.quantity.total}</p>
                    )}
                  </div>
                  <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 group-hover:translate-x-0.5" />
                </button>
              ))}
            </Card>
          </div>
        );
      })}

      <GearDetailSheet
        item={selectedItem}
        onOpenChange={(open) => !open && setSelectedItem(null)}
      />
    </div>
  );
}
