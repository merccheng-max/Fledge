import { Link } from "@tanstack/react-router";
import { Compass } from "lucide-react";

import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-5">
        <Link to="/" className="group flex items-center gap-2">
          <Compass className="h-5 w-5 text-primary transition-transform duration-300 group-hover:rotate-45" />
          <span className="font-display text-xl font-semibold tracking-tight text-foreground">
            Fledge
          </span>
        </Link>
        <Button asChild size="sm" variant="secondary">
          <Link to="/plan">Plan a trip</Link>
        </Button>
      </div>
    </header>
  );
}
