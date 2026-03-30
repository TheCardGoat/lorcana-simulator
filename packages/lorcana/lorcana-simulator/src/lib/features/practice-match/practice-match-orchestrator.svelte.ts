import {
  createAcceptedMoveRecord,
  createEngineLogRecord,
  getLorcanaServerAuthoritativeSnapshot,
  type CardsMaps,
  type EngineMoveHistoryEntry,
  type LorcanaServer,
} from "@tcg/lorcana-engine";
import { HumanVsAiOrchestrator } from "../simulator-devtools/vs-ai/human-vs-ai-orchestrator.svelte.js";
import {
  AutomatedMatchPlaybackReadModel,
  createPersistedMoveLogEntries,
} from "../simulator-devtools/ai-match/playback-controller.js";
import type { GatewayClientStore } from "../gateway/gateway-client.svelte.js";
import type { HumanVsAiMatchConfig } from "../simulator-devtools/vs-ai/types.js";
import type { PracticeMatchRecentHistory, PracticeMatchSnapshot } from "./types.js";

interface PracticeMatchOrchestratorOptions {
  gameId: string;
  playerId: string;
  botPlayerId: string;
  deckConfig: HumanVsAiMatchConfig;
  gateway: GatewayClientStore;
  /** If provided, restore from this snapshot instead of starting fresh. */
  restoredSnapshot?: PracticeMatchSnapshot;
  restoredVersion?: number;
  restoredRecentHistory?: PracticeMatchRecentHistory;
}

export class PracticeMatchOrchestrator {
  readonly orchestrator: HumanVsAiOrchestrator;
  readonly #gateway: GatewayClientStore;
  readonly #gameId: string;
  readonly #playerId: string;
  readonly #botPlayerId: string;
  readonly #cardsMaps: CardsMaps;
  #version: number;
  #pushTimer: ReturnType<typeof setTimeout> | null = null;
  #unsubscribe: (() => void) | null = null;
  #persistedLogCount = 0;
  #persistedMoveCount = 0;
  #hasHydratedRecentHistory = false;

  constructor(options: PracticeMatchOrchestratorOptions) {
    this.#gateway = options.gateway;
    this.#gameId = options.gameId;
    this.#botPlayerId = options.botPlayerId;
    this.#playerId = options.playerId;

    // Create orchestrator (builds the engine from deck config)
    this.orchestrator = new HumanVsAiOrchestrator(options.deckConfig);

    if (options.restoredSnapshot) {
      // Restore from snapshot
      this.#cardsMaps = options.restoredSnapshot.engineSnapshot.cardsMaps;
      this.#version = options.restoredVersion ?? 0;
      this.#restoreState(options.restoredSnapshot);
      this.#hydrateRecentHistory(options.restoredRecentHistory);
      this.#persistedMoveCount = this.#getAcceptedMoveHistory().length;
      this.#persistedLogCount = this.#getMoveLogHistory().length;
    } else {
      // Fresh match — extract cardsMaps from the orchestrator's engine
      this.#cardsMaps = this.orchestrator.cardsMaps;
      this.#version = 0;
      // Push initial state
      this.#schedulePush("init");
    }

    // Subscribe to state updates to push after each move
    this.#unsubscribe = this.orchestrator.subscribe(() => {
      this.#schedulePush("move");
    });
  }

  get currentEngine(): LorcanaServer {
    return this.orchestrator.currentEngine;
  }

  get readModel() {
    return this.orchestrator.readModel;
  }

  dispose(): void {
    this.#unsubscribe?.();
    this.#clearPushTimer();
    this.orchestrator.dispose();
  }

  hydrateRecentHistory(history: PracticeMatchRecentHistory): void {
    this.#hydrateRecentHistory(history);
  }

  #restoreState(snapshot: PracticeMatchSnapshot): void {
    this.orchestrator.restoreAuthoritativeSnapshot(snapshot.engineSnapshot);
  }

  #schedulePush(moveType: string): void {
    this.#clearPushTimer();
    this.#pushTimer = setTimeout(() => {
      this.#pushTimer = null;
      this.#pushState(moveType);
    }, 100);
  }

  #clearPushTimer(): void {
    if (this.#pushTimer !== null) {
      clearTimeout(this.#pushTimer);
      this.#pushTimer = null;
    }
  }

  #pushState(moveType: string): void {
    const server = this.orchestrator.server as unknown as LorcanaServer;
    const engineSnapshot = getLorcanaServerAuthoritativeSnapshot(server, this.#cardsMaps);
    const nextMoveEntries = this.#getAcceptedMoveHistory().slice(this.#persistedMoveCount);
    const nextVersionStart = this.#version;
    const acceptedMoveRecords = nextMoveEntries.map((entry, index) =>
      createAcceptedMoveRecord({
        actorId: this.#resolveActorId(entry.playerId),
        gameId: this.#gameId,
        moveEntry: entry,
        sourceAuthority: "client",
        stateVersion: nextVersionStart + index + 1,
      }),
    );
    const latestStateVersion = acceptedMoveRecords.at(-1)?.stateVersion ?? this.#version;
    const engineLogRecords = this.#getMoveLogHistory()
      .slice(this.#persistedLogCount)
      .map((entry) =>
        createEngineLogRecord({
          gameId: this.#gameId,
          log: entry,
          sourceAuthority: "client",
          stateVersion: latestStateVersion,
        }),
      );
    const snapshot: PracticeMatchSnapshot = {
      engineSnapshot,
    };
    const actorId = acceptedMoveRecords.at(-1)?.actorId ?? this.#playerId;
    this.#version = latestStateVersion;
    this.#persistedMoveCount += nextMoveEntries.length;
    this.#persistedLogCount += engineLogRecords.length;

    if (import.meta.env.DEV) {
      console.log(
        `[practice-match] push_state v${this.#version} moveType=${moveType} actorId=${actorId}`,
      );
    }

    this.#gateway.send({
      type: "push_state",
      gameId: this.#gameId,
      state: snapshot,
      version: this.#version,
      moveType,
      actorId,
      ...(acceptedMoveRecords.length === 1
        ? { acceptedMove: acceptedMoveRecords[0] }
        : acceptedMoveRecords.length > 1
          ? { acceptedMoves: acceptedMoveRecords }
          : {}),
      ...(engineLogRecords.length > 0 ? { engineLogs: engineLogRecords } : {}),
    });
  }

  #getAcceptedMoveHistory(): EngineMoveHistoryEntry[] {
    return this.orchestrator.server.getMoveHistory();
  }

  #getMoveLogHistory(): import("@tcg/lorcana-engine").MoveLog[] {
    return this.orchestrator.server.getMoveLogHistory();
  }

  #resolveActorId(playerId?: string): string {
    if (playerId === "player_one") {
      return this.#playerId;
    }

    if (playerId === "player_two") {
      return this.#botPlayerId;
    }

    return playerId ?? this.#playerId;
  }

  #resolveActorSide(actorId: string) {
    if (actorId === this.#playerId) {
      return "playerOne" as const;
    }

    if (actorId === this.#botPlayerId) {
      return "playerTwo" as const;
    }

    return undefined;
  }

  #hydrateRecentHistory(history?: PracticeMatchRecentHistory): void {
    if (!history || this.#hasHydratedRecentHistory) {
      return;
    }

    const readModel = this.orchestrator.readModel;
    if (!(readModel instanceof AutomatedMatchPlaybackReadModel)) {
      return;
    }

    const syntheticEntries = createPersistedMoveLogEntries({
      acceptedMoves: history.acceptedMoves,
      engineLogs: history.engineLogs,
      resolveActorSide: (actorId) => this.#resolveActorSide(actorId),
    });
    readModel.pushSyntheticMoveEntries(syntheticEntries);
    this.#hasHydratedRecentHistory = true;
  }
}
