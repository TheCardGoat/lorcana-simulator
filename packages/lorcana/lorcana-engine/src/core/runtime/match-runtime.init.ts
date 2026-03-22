/**
 * MatchRuntime Initialization
 *
 * Factory functions for creating initial match state.
 */

import { produce } from "immer";
import type { MatchState } from "./types";
import { createInitialTCGCtx, type InitialStatusConfig } from "./types";
import type {
  MatchRuntimeConfig,
  Player,
  ZoneDefinitions,
  RuntimeFlowDefinition,
} from "./match-runtime.types";
import type { MatchStaticResources } from "./static-resources";

type PlayerId = string;

import { createRandomAPIForDraft } from "./match-runtime.random-apis";
import { generateMatchID, computeRulesetHash, generateGameID } from "./match-runtime.utils";
import type { LorcanaG } from "../../types/runtime-state";

// =============================================================================
// State Initialization
// =============================================================================

export interface MatchInitContext {
  matchID?: string;
  gameID?: string;
  config: MatchRuntimeConfig;
  players: Player[];
  seed?: string;
  staticResources: MatchStaticResources;
  choosingFirstPlayer?: PlayerId;
}

export function initializeMatchState(ctx: MatchInitContext): {
  state: MatchState;
  board: unknown;
  staticResources: MatchStaticResources;
} {
  const { players, seed, matchID, gameID, staticResources, choosingFirstPlayer } = ctx;

  // Extract the initial flow state from config
  const statusConfig = extractInitialFlowState(ctx.config.flow);

  // Initialize framework context
  const tcgCtx = createInitialTCGCtx({
    matchID: matchID || generateMatchID(),
    gameID: gameID || generateGameID(),
    rulesetHash: computeRulesetHash(ctx.config),
    timeConfig: ctx.config.timeControl,
    seed,
    statusConfig,
    choosingFirstPlayer,
    players,
  });

  // Initialize zone definitions if provided
  // TODO: Not sure why we need this for
  if (ctx.config.zones) {
    initializeZones(
      tcgCtx.zones.zoneDefs,
      tcgCtx.zones.public.zoneSummaries,
      tcgCtx.zones.private.zoneCards,
      ctx.config.zones,
    );
  }

  // Set initial players in time control
  if (tcgCtx.time.mode !== "none") {
    initializeTimeControlPlayers(tcgCtx.time, players, tcgCtx.time.config);
  }

  // Initialize game-specific state via setup
  const gameState = ctx.config.setup({ players, seed, staticResources });

  let state: MatchState = { G: gameState, ctx: tcgCtx };

  if (ctx.config.boardSetup) {
    state = produce(state, (draft) => {
      ctx.config.boardSetup!(draft, {
        players,
        staticResources,
        random: createRandomAPIForDraft(draft),
      });
    });
  }

  // TODO: Properly initialize the board view
  let board: unknown = {};

  return {
    state,
    board,
    staticResources,
  };
}

// =============================================================================
// Zone Initialization
// =============================================================================

function initializeZones(
  zoneDefs: Record<string, unknown>,
  zoneSummaries: Record<string, unknown>,
  zoneCards: Record<string, unknown>,
  definitions: ZoneDefinitions,
): void {
  for (const [zoneId, zoneDef] of Object.entries(definitions)) {
    zoneDefs[zoneId] = zoneDef;
    zoneSummaries[zoneId] = { revision: 0, count: 0 };
    zoneCards[zoneId] = [];
  }
}

// =============================================================================
// Time Control Initialization
// =============================================================================

function initializeTimeControlPlayers(
  timeContext: { mode: string; players: Record<string, unknown>; config: unknown },
  players: Player[],
  config: unknown,
): void {
  if (timeContext.mode === "chess") {
    const chessConfig = config as { initialReserveMs: number };
    for (const player of players) {
      timeContext.players[player.id] = {
        reserveMsRemaining: chessConfig.initialReserveMs,
        totalConsumedMs: 0,
        movesMade: 0,
        lastUpdatedAtMs: Date.now(),
      };
    }
  } else if (timeContext.mode === "priority") {
    const priorityConfig = config as { reserveMs: number };
    for (const player of players) {
      timeContext.players[player.id] = {
        reserveMsRemaining: priorityConfig.reserveMs,
        totalConsumedMs: 0,
        totalWindowOverageMs: 0,
        movesMade: 0,
        moveBonusMsGranted: 0,
        windowTimeouts: 0,
        lastUpdatedAtMs: Date.now(),
      };
    }
  }
}

// =============================================================================
// Flow State Extraction
// =============================================================================

/**
 * Extracts the initial game segment and phase from the flow definition.
 */
function extractInitialFlowState(flow: RuntimeFlowDefinition): InitialStatusConfig {
  // Get the initial game segment
  const segmentId = flow.initialGameSegment ?? Object.keys(flow.gameSegments)[0];
  const segment = segmentId ? flow.gameSegments[segmentId] : undefined;

  // Get the initial phase from the segment's turn configuration
  const initialPhase = segment?.turn?.initialPhase;

  return {
    initialGameSegment: segmentId,
    initialPhase,
  };
}
