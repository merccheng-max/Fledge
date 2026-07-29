import { useState } from "react";
import { Loader2, MessageCircle, Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { askTripQuestion } from "@/lib/trip-chat";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export function TripChat({ tripContext }: { tripContext: unknown }) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const question = input.trim();
    if (!question || isLoading) return;

    setMessages((prev) => [...prev, { role: "user", content: question }]);
    setInput("");
    setError(null);
    setIsLoading(true);

    try {
      const answer = await askTripQuestion(question, tripContext);
      setMessages((prev) => [...prev, { role: "assistant", content: answer }]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="hover-lift bg-card/85 p-4 backdrop-blur-sm">
      <div className="flex items-center gap-2">
        <MessageCircle className="h-4 w-4 text-primary" />
        <h3 className="font-display text-base font-semibold text-foreground">
          Ask about your trip
        </h3>
      </div>
      <p className="mt-1 text-sm text-muted-foreground">
        Questions about your gear list, why something's on it, or how the numbers were worked out.
      </p>

      {messages.length > 0 && (
        <div className="mt-4 space-y-3">
          {messages.map((message, i) => (
            <div
              key={i}
              className={cn(
                "animate-in fade-in slide-in-from-bottom-2 max-w-[85%] rounded-lg px-3.5 py-2.5 text-sm leading-relaxed duration-300",
                message.role === "user"
                  ? "ml-auto bg-primary text-primary-foreground"
                  : "bg-muted text-foreground",
              )}
            >
              {message.content}
            </div>
          ))}
          {isLoading && (
            <div className="flex items-center gap-2 rounded-lg bg-muted px-3.5 py-2.5 text-sm text-muted-foreground">
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
              Thinking...
            </div>
          )}
        </div>
      )}

      {error && <p className="mt-3 text-sm text-destructive">{error}</p>}

      <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="e.g. Why do I need a groundsheet?"
          disabled={isLoading}
        />
        <Button
          type="submit"
          size="icon"
          disabled={isLoading || !input.trim()}
          className="transition-transform active:scale-95"
        >
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </Card>
  );
}
