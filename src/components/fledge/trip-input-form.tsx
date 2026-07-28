import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";

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

const SEASONS = [
  { id: "spring", label: "Spring" },
  { id: "summer", label: "Summer" },
  { id: "fall", label: "Fall" },
  { id: "winter", label: "Winter" },
] as const;

export function TripInputForm() {
  const navigate = useNavigate();
  const [parkId, setParkId] = useState<string>("");
  const [days, setDays] = useState<string>("3");
  const [groupSize, setGroupSize] = useState<string>("2");
  const [season, setSeason] = useState<string>("");

  const isValid = parkId !== "" && season !== "" && Number(days) > 0 && Number(groupSize) > 0;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValid) return;

    navigate({
      to: "/checklist",
      search: {
        park: parkId,
        days: Number(days),
        group: Number(groupSize),
        season,
      },
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="park">Where are you camping?</Label>
        <Select value={parkId} onValueChange={setParkId}>
          <SelectTrigger id="park">
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
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="group">Group size</Label>
          <Input
            id="group"
            type="number"
            min={1}
            max={20}
            value={groupSize}
            onChange={(e) => setGroupSize(e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="season">What season?</Label>
        <Select value={season} onValueChange={setSeason}>
          <SelectTrigger id="season">
            <SelectValue placeholder="Choose a season" />
          </SelectTrigger>
          <SelectContent>
            {SEASONS.map((s) => (
              <SelectItem key={s.id} value={s.id}>
                {s.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Button type="submit" size="lg" className="w-full" disabled={!isValid}>
        Build my trip
      </Button>
    </form>
  );
}
