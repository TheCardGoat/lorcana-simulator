import type { ServerLoadEvent } from "@sveltejs/kit";
import { sanitizeDeckText } from "@/features/simulator-devtools/fixtures/fixture-factory.js";
import { DECK_FIXTURES } from "@/features/simulator-devtools/deck-fixtures/index.js";
import { getSafeAutomatedActionStrategyOption } from "@tcg/lorcana-engine";
import { getApiOrigin } from "$lib/config/public-url-config.js";
import { createAutomatedMatchSeed } from "@/features/simulator-devtools/ai-match/config.js";
import type { HumanVsAiMatchConfig } from "@/features/simulator-devtools/vs-ai/types.js";
import type { PracticeMatchSession } from "@/features/practice-match/types.js";
import { getServerApiOrigin, serverFetch } from "$lib/server/fetch-with-cf.js";

interface QuickMatchConfigResponse {
  object: "quick_match_config";
  gameId: string;
  matchId: string;
  playerId: string;
  botPlayerId: string;
  playerDeckText: string;
  botFixtureId: string | null;
  botStrategyId: string | null;
}

export type QuickMatchPlayByIdData =
  | { status: "ok"; session: PracticeMatchSession; unknownCards: string[] }
  | { status: "error"; message: string };

export async function load(event: ServerLoadEvent): Promise<QuickMatchPlayByIdData> {
  const gameId = event.params.gameId!;
  const cookie = event.request.headers.get("cookie") ?? "";
  const trace = (...args: unknown[]) => {
    if (import.meta.env.DEV) console.log("[quick-match/play]", ...args);
  };

  trace("load() called", { gameId });

  // Step 1: Fetch match config from API
  let configResponse: QuickMatchConfigResponse;
  try {
    const apiOrigin = getServerApiOrigin(getApiOrigin());
    const url = `${apiOrigin}/v1/play/quick-match/${gameId}`;
    trace("fetching config", { url, hasCookie: !!cookie });

    const response = await serverFetch(url, {
      headers: cookie ? { cookie } : {},
    });

    trace("config API response", { status: response.status, ok: response.ok });

    if (!response.ok) {
      const body = await response.text().catch(() => "");
      trace("config API error", { body: body.slice(0, 200) });
      if (response.status === 404) {
        return { status: "error", message: "Match not found or expired." };
      }
      return { status: "error", message: `Failed to load match (${response.status}).` };
    }

    configResponse = (await response.json()) as QuickMatchConfigResponse;
    trace("config received", {
      matchId: configResponse.matchId,
      playerId: configResponse.playerId,
      botFixtureId: configResponse.botFixtureId,
    });
  } catch (error) {
    trace("config fetch failed", { error: String(error) });
    return { status: "error", message: "Unable to reach the game server." };
  }

  // Step 2: Sanitize deck and build config
  // Note: wsTicket is set to a marker value so /match/[gameId] detects this
  // as a quick-match session and fetches a fresh ticket client-side.
  // We don't fetch the ticket here because it's single-use and would expire
  // before the client navigates to /match/[gameId].
  const { sanitizedText, unknownCards } = sanitizeDeckText(configResponse.playerDeckText);
  if (!sanitizedText) {
    trace("sanitize produced empty text");
    return { status: "error", message: "The stored deck could not be resolved." };
  }

  const opponentFixture = configResponse.botFixtureId
    ? DECK_FIXTURES.find((f) => f.id === configResponse.botFixtureId)
    : DECK_FIXTURES[0];

  if (!opponentFixture) {
    trace("fixture not found", { botFixtureId: configResponse.botFixtureId });
    return { status: "error", message: "Bot deck fixture not found." };
  }

  const strategy = getSafeAutomatedActionStrategyOption(configResponse.botStrategyId);

  const deckConfig: HumanVsAiMatchConfig = {
    playerOneDeckText: sanitizedText,
    playerTwoDeckText: opponentFixture.cards,
    playerTwoFixtureId: opponentFixture.id,
    strategyId: strategy.id,
    seed: createAutomatedMatchSeed(),
  };

  const session: PracticeMatchSession = {
    matchId: configResponse.matchId,
    gameId,
    playerId: configResponse.playerId,
    botPlayerId: configResponse.botPlayerId,
    deckConfig,
    wsTicket: "quick-match",
  };

  trace("session built", {
    matchId: session.matchId,
    gameId: session.gameId,
  });

  return { status: "ok", session, unknownCards };
}
