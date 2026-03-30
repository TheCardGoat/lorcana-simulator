import { getAllCardsById } from "@tcg/lorcana-cards";
import { aladdinHeroicOutlaw } from "@tcg/lorcana-cards/cards/001";
import { getFullName } from "@tcg/lorcana-types";
import { beforeEach, describe, expect, it, mock } from "bun:test";

const cardsById = await getAllCardsById();
const historicDeckCardEntry = Object.entries(cardsById).find(
  ([, card]) => card.id === aladdinHeroicOutlaw.id,
);

if (!historicDeckCardEntry) {
  throw new Error(`Could not find test card "${aladdinHeroicOutlaw.id}" in Lorcana catalog.`);
}

const [historicDeckCardPublicId] = historicDeckCardEntry;

mock.module("$lib/config/public-url-config.js", () => ({
  getApiOrigin: () => "https://api.example.test",
}));

const {
  fetchDeckListSnapshotByDeckListId,
  fetchMatchmakingContext,
  updateActiveMatchmakingProfile,
  updateProfileSelectedDeck,
} = await import("./player-context-api.js");

describe("player-context-api", () => {
  beforeEach(() => {
    globalThis.fetch = mock() as unknown as typeof fetch;
  });

  it("loads matchmaking context from the auth API", async () => {
    const fetchMock = mock(
      async () =>
        new Response(
          JSON.stringify({
            account: {
              userId: "user_1",
              name: "Edu",
              email: "edu@example.com",
              image: null,
              username: "edu",
              displayUsername: "This is Edu",
              linkedAccounts: [],
            },
            activeGameProfileId: "gp_1",
            profiles: [],
          }),
        ),
    );
    globalThis.fetch = fetchMock as unknown as typeof fetch;

    const result = await fetchMatchmakingContext();

    expect(fetchMock).toHaveBeenCalledWith(
      "https://api.example.test/v1/users/me/games/lorcana/matchmaking-context",
      { credentials: "include" },
    );
    expect(result.activeGameProfileId).toBe("gp_1");
  });

  it("updates active profile and selected deck through dedicated endpoints", async () => {
    const fetchMock = mock(async () => new Response(JSON.stringify({ success: true })));
    globalThis.fetch = fetchMock as unknown as typeof fetch;

    await updateActiveMatchmakingProfile("gp_2");
    await updateProfileSelectedDeck("gp_2", "deck_2");

    expect(fetchMock).toHaveBeenNthCalledWith(
      1,
      "https://api.example.test/v1/users/me/games/lorcana/matchmaking-preferences",
      expect.objectContaining({
        method: "PUT",
      }),
    );
    expect(fetchMock).toHaveBeenNthCalledWith(
      2,
      "https://api.example.test/v1/users/me/games/lorcana/profiles/gp_2",
      expect.objectContaining({
        method: "PUT",
      }),
    );
  });

  it("turns a deck list payload into a historic deck and deck text snapshot", async () => {
    const fetchMock = mock(
      async () =>
        new Response(
          JSON.stringify({
            data: {
              cards: [{ publicId: historicDeckCardPublicId, quantity: 4 }],
            },
          }),
        ),
    );
    globalThis.fetch = fetchMock as unknown as typeof fetch;

    const snapshot = await fetchDeckListSnapshotByDeckListId("dl_1");

    expect(snapshot.historicDeck).toEqual([
      { cardPublicId: historicDeckCardPublicId, quantity: 4 },
    ]);
    expect(snapshot.deckText).toBe(`4 ${getFullName(aladdinHeroicOutlaw)}`);
  });
});
