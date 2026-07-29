/**
 * Client-side helper for the trip chat endpoint.
 * Usage: const answer = await askTripQuestion(question, tripContext)
 */
export async function askTripQuestion(
  question: string,
  tripContext: unknown,
): Promise<string> {
  const response = await fetch("/api/trip-chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question, tripContext }),
  });

  const data = (await response.json().catch(() => null)) as
    | { answer?: string; error?: string }
    | null;

  if (!response.ok || !data?.answer) {
    throw new Error(data?.error ?? "Couldn't get an answer right now. Try again.");
  }

  return data.answer;
}
