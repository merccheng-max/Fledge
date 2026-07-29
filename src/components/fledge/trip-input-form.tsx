import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { ArrowRight, CalendarDays, MapPin, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PARKS } from "@/data/parks";

function todayIso(): string {
  return new Date().toISOString().slice(0, 10);
}

export function TripInputForm() {
  const navigate = useNavigate();
  const [parkId, setParkId] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [days, setDays] = useState<string>("3");
  const [groupSize, setGroupSize] = useState<string>("2");

  const isValid = parkId !== "" && startDate !== "" && Number(days) > 0 && Number(groupSize) > 0;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValid) return;

    navigate({
      to: "/checklist",
      search: {
        park: parkId,
        startDate,
        days: Number(days),
        group: Number(groupSize),
      },
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="animate-in fade-in slide-in-from-bottom-4 space-y-6 duration-500"
    >
      <div className="space-y-2">
        <Label htmlFor="park" className="flex items-center gap-1.5">
          <MapPin className="h-3.5 w-3.5 text-primary" />
          Where are you camping?
        </Label>
        <Select value={parkId} onValueChange={setParkId}>
          <SelectTrigger id="park" className="transition-shadow hover:shadow-sm">
            <SelectValue placeholder="Choose a park" />
          </SelectTrigger>
          <SelectContent>
            {PARKS.map((park) => (
              <SelectItem key={park.id} value={park.id}>
                {park.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="startDate" className="flex items-center gap-1.5">
          <CalendarDays className="h-3.5 w-3.5 text-primary" />
          When do you arrive?
        </Label>
        <Input
          id="startDate"
          type="date"
          min={todayIso()}
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="transition-shadow hover:shadow-sm"
        />
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
