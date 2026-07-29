import { createFileRoute } from "@tanstack/react-router";
import { askTripChat, parseTripChatRequest } from "@/lib/trip-chat.server";

export const Route = createFileRoute("/api/trip-chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let payload: unknown;
        try {
          payload = await request.json();
        } catch {
          return Response.json({ error: "Invalid JSON body." }, { status: 400 });
        }

        const parsed = parseTripChatRequest(payload);
        if (!parsed) {
          return Response.json(
            { error: "Body must be { question: string, tripContext: object }." },
            { status: 400 },
          );
        }

        try {
          const answer = await askTripChat(parsed);
          return Response.json({ answer });
        } catch (error) {
          console.error("trip-chat failed:", error);
          const message = error instanceof Error ? error.message : "Something went wrong.";
          return Response.json({ error: message }, { status: 502 });
        }
      },
    },
  },
});
