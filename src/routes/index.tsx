import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Compass, ListChecks, MapPin, MessageCircle } from "lucide-react";

import { Header } from "@/components/fledge/header";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen">
      <Header />

      <main className="mx-auto max-w-4xl px-6 py-20">
        <div className="max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h1 className="font-display text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-5xl">
            Show up ready, even if it's your first time.
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            Tell Fledge where you're camping, how many days, and who's coming. You'll get a gear
            list that shows its math, not just a generic checklist, plus a plain-English explanation
            for everything on it.
          </p>
          <div className="mt-8">
            <Button asChild size="lg" className="group">
              <Link to="/plan">
                Plan your trip
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>

        <div className="mt-20 grid gap-6 sm:grid-cols-3">
          <Feature
            icon={<MapPin className="h-5 w-5" />}
            title="Built for real parks"
            body="Yosemite, Sequoia & Kings Canyon, Joshua Tree, Death Valley, and Zion — each with its own seasonal quirks baked in."
            delay="delay-100"
          />
          <Feature
            icon={<ListChecks className="h-5 w-5" />}
            title="Gear lists that show their work"
            body="Water, food, and ice quantities come with the actual math, sized to your group and trip length."
            delay="delay-200"
          />
          <Feature
            icon={<MessageCircle className="h-5 w-5" />}
            title="Ask it anything about your plan"
            body="Once your checklist is built, ask follow-up questions about any of it — grounded in your actual trip."
            delay="delay-300"
          />
        </div>
      </main>

      <footer className="mx-auto max-w-4xl px-6 py-10 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <Compass className="h-4 w-4" />
          <span>Fledge — a trip planner for first-time campers.</span>
        </div>
      </footer>
    </div>
  );
}

function Feature({
  icon,
  title,
  body,
  delay,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
  delay: string;
}) {
  return (
    <div
      className={`hover-lift group animate-in fade-in slide-in-from-bottom-4 rounded-xl border border-transparent p-4 duration-700 ${delay} hover:border-border`}
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors duration-200 group-hover:bg-primary group-hover:text-primary-foreground">
        {icon}
      </div>
      <h3 className="mt-4 font-display text-base font-semibold text-foreground">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
    </div>
  );
}
