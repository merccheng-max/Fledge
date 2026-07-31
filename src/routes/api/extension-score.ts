import { createFileRoute } from "@tanstack/react-router";
import { scoreFit } from "@/lib/fit-scoring";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

function isValidBody(body: unknown): body is {
  parkId: string;
  startDate: string;
  days: number;
  groupSize: number;
  itemId: string;
  specs: Record<string, string>;
} {
  if (!body || typeof body !== "object") return false;
  const b = body as Record<string, unknown>;
  return (
    typeof b.parkId === "string" &&
    typeof b.startDate === "string" &&
    typeof b.days === "number" &&
    typeof b.groupSize === "number" &&
    typeof b.itemId === "string" &&
    typeof b.specs === "object" &&
    b.specs !== null
  );
}

export const Route = createFileRoute("/api/extension-score")({
  server: {
    handlers: {
      OPTIONS: async () => new Response(null, { status: 204, headers: CORS_HEADERS }),
      POST: async ({ request }) => {
        let payload: unknown;
        try {
          payload = await request.json();
        } catch {
          return Response.json(
            { error: "Invalid JSON body." },
            { status: 400, headers: CORS_HEADERS },
          );
        }

        if (!isValidBody(payload)) {
          return Response.json(
            {
              error:
                "Body must be { parkId, startDate, days, groupSize, itemId, specs } with specs as a string map.",
            },
            { status: 400, headers: CORS_HEADERS },
          );
        }

        try {
          const result = scoreFit(payload);
          return Response.json(result, { headers: CORS_HEADERS });
        } catch (error) {
          console.error("extension-score failed:", error);
          return Response.json(
            { error: "Something went wrong scoring this item." },
            { status: 500, headers: CORS_HEADERS },
          );
        }
      },
    },
  },
});
