import { getAllCardsById } from "@tcg/lorcana-cards";
import { getFullName } from "@tcg/lorcana-types";
import { getApiOrigin } from "$lib/config/public-url-config.js";
import type { HistoricDeckEntry } from "@/features/practice-match/practice-match-api.js";

export interface MatchmakingLinkedAccount {
  providerId: string;
  accountId: string;
}

export interface MatchmakingAccountContext {
  userId: string;
  name: string;
  email: string;
  image: string | null;
  username: string | null;
  displayUsername: string | null;
  linkedAccounts: MatchmakingLinkedAccount[];
}

export interface ProfileDeckSummary {
  deckId: string;
  deckName: string;
  activeDeckVersionId: string;
  activeDeckListId: string;
  cardCount: number;
  colorMask: number;
  updatedAt: string;
}

export interface ProfileMatchmakingContext {
  gameProfileId: string;
  displayName: string | null;
  selectedDeckId: string | null;
  decks: ProfileDeckSummary[];
}

export interface MatchmakingContext {
  account: MatchmakingAccountContext;
  activeGameProfileId: string | null;
  profiles: ProfileMatchmakingContext[];
}

interface DeckListDetailResponse {
  data: {
    cards: Array<{
      publicId: string;
      quantity: number;
    }>;
  };
}

export interface DeckListSnapshot {
  historicDeck: HistoricDeckEntry[];
  deckText: string;
}

function extractErrorMessage(body: unknown, fallback: string): string {
  if (typeof body === "object" && body !== null) {
    const record = body as Record<string, unknown>;
    if (typeof record.message === "string") {
      return record.message;
    }
    if (typeof record.error === "string") {
      return record.error;
    }
  }

  return fallback;
}

async function readJsonOrNull(response: Response): Promise<unknown> {
  return response.json().catch(() => null);
}

export async function fetchMatchmakingContext(): Promise<MatchmakingContext> {
  const response = await fetch(`${getApiOrigin()}/v1/users/me/games/lorcana/matchmaking-context`, {
    credentials: "include",
  });

  if (!response.ok) {
    const body = await readJsonOrNull(response);
    throw new Error(
      extractErrorMessage(body, `Failed to load matchmaking context: ${response.status}`),
    );
  }

  return (await response.json()) as MatchmakingContext;
}

export async function updateActiveMatchmakingProfile(activeGameProfileId: string): Promise<void> {
  const response = await fetch(
    `${getApiOrigin()}/v1/users/me/games/lorcana/matchmaking-preferences`,
    {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ activeGameProfileId }),
    },
  );

  if (!response.ok) {
    const body = await readJsonOrNull(response);
    throw new Error(
      extractErrorMessage(body, `Failed to save matchmaking preferences: ${response.status}`),
    );
  }
}

export async function updateProfileSelectedDeck(
  gameProfileId: string,
  selectedDeckId: string,
): Promise<void> {
  const response = await fetch(
    `${getApiOrigin()}/v1/users/me/games/lorcana/profiles/${gameProfileId}`,
    {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ selectedDeckId }),
    },
  );

  if (!response.ok) {
    const body = await readJsonOrNull(response);
    throw new Error(extractErrorMessage(body, `Failed to save selected deck: ${response.status}`));
  }
}

export async function onboardPlayer(): Promise<MatchmakingContext> {
  const response = await fetch(`${getApiOrigin()}/v1/users/me/games/lorcana/onboard`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ termsAccepted: true }),
  });

  if (!response.ok) {
    const body = await readJsonOrNull(response);
    throw new Error(extractErrorMessage(body, `Failed to create your profile: ${response.status}`));
  }

  return (await response.json()) as MatchmakingContext;
}

export async function fetchDeckListSnapshotByDeckListId(
  deckListId: string,
): Promise<DeckListSnapshot> {
  const response = await fetch(`${getApiOrigin()}/v1/deck-lists/${deckListId}`, {
    credentials: "include",
  });

  if (!response.ok) {
    const body = await readJsonOrNull(response);
    throw new Error(extractErrorMessage(body, `Failed to load deck list: ${response.status}`));
  }

  const payload = (await response.json()) as DeckListDetailResponse;
  const historicDeck = payload.data.cards.map((card) => ({
    cardPublicId: card.publicId,
    quantity: card.quantity,
  }));
  const cardsById = await getAllCardsById();
  const deckText = payload.data.cards
    .map((card) => {
      const cardDefinition = cardsById[card.publicId];
      const displayName = cardDefinition ? getFullName(cardDefinition) : card.publicId;
      return `${card.quantity} ${displayName}`;
    })
    .join("\n");

  return {
    historicDeck,
    deckText,
  };
}

export async function fetchHistoricDeckByDeckListId(
  deckListId: string,
): Promise<HistoricDeckEntry[]> {
  const snapshot = await fetchDeckListSnapshotByDeckListId(deckListId);
  return snapshot.historicDeck;
}
