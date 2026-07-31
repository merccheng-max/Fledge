import { useMemo, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { ArrowRight, CalendarDays, MapPin, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ACTIVITY_LABELS, type ActivityType } from "@/data/gear";
import { PARKS } from "@/data/parks";

function toIso(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function TripInputForm({
  activity,
  onChangeActivity,
}: {
  activity: ActivityType;
  onChangeActivity: () => void;
}) {
  const navigate = useNavigate();
  const [parkId, setParkId] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [datePopoverOpen, setDatePopoverOpen] = useState(false);
  const [days, setDays] = useState<string>("3");
  const [groupSize, setGroupSize] = useState<string>("2");

  const availableParks = useMemo(
    () => PARKS.filter((park) => park.supportedActivities.includes(activity)),
    [activity],
  );

  const isValid = parkId !== "" && !!selectedDate && Number(days) > 0 && Number(groupSize) > 0;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValid || !selectedDate) return;

    navigate({
      to: "/checklist",
      search: {
        park: parkId,
        startDate: toIso(selectedDate),
        days: Number(days),
        group: Number(groupSize),
        activity,
      },
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="animate-in fade-in slide-in-from-bottom-4 space-y-6 duration-500"
    >
      <div className="flex items-center justify-between rounded-lg bg-muted px-4 py-3">
        <span className="text-sm font-medium text-foreground">{ACTIVITY_LABELS[activity]}</span>
        <button
          type="button"
          onClick={onChangeActivity}
          className="text-xs font-medium text-primary hover:underline"
        >
          Change
        </button>
      </div>

      <div className="space-y-2">
        <Label htmlFor="park" className="flex items-center gap-1.5">
          <MapPin className="h-3.5 w-3.5 text-primary" />
          Where's your trip?
        </Label>
        <Select value={parkId} onValueChange={setParkId}>
          <SelectTrigger id="park" className="transition-shadow hover:shadow-sm">
            <SelectValue placeholder="Choose a park" />
          </SelectTrigger>
          <SelectContent>
            {availableParks.map((park) => (
              <SelectItem key={park.id} value={park.id}>
                {park.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {availableParks.length === 0 && (
          <p className="text-xs text-muted-foreground">
            No parks in our list currently support this activity.
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label className="flex items-center gap-1.5">
          <CalendarDays className="h-3.5 w-3.5 text-primary" />
          When do you arrive?
        </Label>
        <Popover open={datePopoverOpen} onOpenChange={setDatePopoverOpen}>
          <PopoverTrigger asChild>
            <Button
              type="button"
              variant="outline"
              className="w-full justify-start font-normal transition-shadow hover:shadow-sm"
            >
              {selectedDate
                ? selectedDate.toLocaleDateString("en-US", {
                    weekday: "short",
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })
                : "Choose a date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(date) => {
                setSelectedDate(date);
                setDatePopoverOpen(false);
              }}
              disabled={{ before: new Date() }}
              autoFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="days">How many days?</Label>
          <Input
            id="days"
            type="number"
            min={1}
            max={14}
            value={days}
            onChange={(e) => setDays(e.target.value)}
            className="transition-shadow hover:shadow-sm"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="group" className="flex items-center gap-1.5">
            <Users className="h-3.5 w-3.5 text-primary" />
            Group size
          </Label>
          <Input
            id="group"
            type="number"
            min={1}
            max={20}
            value={groupSize}
            onChange={(e) => setGroupSize(e.target.value)}
            className="transition-shadow hover:shadow-sm"
          />
        </div>
      </div>

      <Button type="submit" size="lg" className="group w-full" disabled={!isValid}>
        Build my trip
        <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
      </Button>
    </form>
  );
}
