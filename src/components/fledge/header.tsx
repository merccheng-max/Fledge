import { Link } from "@tanstack/react-router";
import { Compass } from "lucide-react";

export function Header() {
  return (
    <header className="border-b border-border/60">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-5">
        <Link to="/" className="flex items-center gap-2">
          <Compass className="h-5 w-5 text-primary" />
          <span className="font-display text-xl font-semibold tracking-tight text-foreground">
            Fledge
          </span>
        </Link>
        <Link
          to="/plan"
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          Plan a trip
        </Link>
      </div>
    </header>
  );
}
