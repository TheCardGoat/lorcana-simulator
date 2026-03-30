import { resolveLorcanaDeckListText } from "@tcg/lorcana-cards";
import { getGameServerOrigin } from "$lib/config/public-url-config.js";
import type { PracticeMatchCreationResponse } from "./types.js";

export interface HistoricDeckEntry {
  cardPublicId: string;
  quantity: number;
}

interface CreatePracticeMatchParams {
  gameType: "lorcana";
  playerDeck: HistoricDeckEntry[];
  botDeck: HistoricDeckEntry[];
}

export async function createPracticeMatch(
  params: CreatePracticeMatchParams,
): Promise<PracticeMatchCreationResponse> {
  const res = await fetch(`${getGameServerOrigin()}/v1/play/practice/`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params),
  });

  if (!res.ok) {
    const body = await res.json().catch(() => null);
    const message = (body as { message?: string } | null)?.message ?? `HTTP ${res.status}`;
    throw new Error(`Failed to create practice match: ${message}`);
  }

  return (await res.json()) as PracticeMatchCreationResponse;
}

/**
 * Convert deck text (newline-separated lines like "4 Card Name - Title")
 * to the HistoricDeck format the API expects.
 *
 * Uses the Lorcana deck list resolver to map display names → card IDs.
 */
export async function deckTextToHistoricDeck(deckText: string): Promise<HistoricDeckEntry[]> {
  const result = await resolveLorcanaDeckListText(deckText);

  if (result.diagnostics.unresolvedNames.length > 0) {
    throw new Error(`Unknown cards: ${result.diagnostics.unresolvedNames.join(", ")}`);
  }

  return result.resolvedCards.map((entry) => ({
    cardPublicId: entry.cardId,
    quantity: entry.quantity,
  }));
}
