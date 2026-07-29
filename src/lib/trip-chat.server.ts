const SYSTEM_PROMPT = `You are a helpful assistant for Fledge, a beginner camping trip planner. Only answer questions grounded in the trip context provided below — the user's specific trip, their gear checklist, and the reasoning behind it. If asked something unrelated to this trip or camping/general camping safety, politely redirect them to ask about their trip. Keep answers concise, plain-English, and confident — no corporate or overly formal tone.`;

export interface TripChatRequest {
  question: string;
  tripContext: unknown;
}

export function parseTripChatRequest(body: unknown): TripChatRequest | null {
  if (typeof body !== "object" || body === null) return null;
  const { question, tripContext } = body as Record<string, unknown>;
  if (typeof question !== "string" || question.trim().length === 0) return null;
  if (typeof tripContext !== "object" || tripContext === null) return null;
  return { question: question.trim(), tripContext };
}

export async function askTripChat({ question, tripContext }: TripChatRequest): Promise<string> {
  const apiKey = process.env.LOVABLE_API_KEY;
  if (!apiKey) throw new Error("AI is not configured for this project.");

  const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "openai/gpt-5.6-sol",
      reasoning_effort: "none",
      messages: [
        {
          role: "system",
          content: `${SYSTEM_PROMPT}\n\nTRIP CONTEXT (JSON):\n${JSON.stringify(tripContext, null, 2)}`,
        },
        { role: "user", content: question },
      ],
    }),
  });

  if (!response.ok) {
    const detail = await response.text();
    if (response.status === 429)
      throw new Error("Too many requests right now — try again in a moment.");
    if (response.status === 402) throw new Error("AI credits are exhausted for this workspace.");
    throw new Error(`AI request failed (${response.status}): ${detail.slice(0, 300)}`);
  }

  const data = (await response.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
  };
  const answer = data.choices?.[0]?.message?.content?.trim();
  if (!answer) throw new Error("The AI returned an empty response.");
  return answer;
}
