/**
 * Replay Orchestrator
 *
 * Reconstructs match states from a persisted replay for step-through viewing.
 * Supports server-authority games (patches available) and provides move log
 * for all game types.
 */

import { getLorcanaCardCatalogSync } from "@tcg/lorcana-cards/cards/sync";
import {
  createLorcanaClient,
  createPlayerId,
  type AcceptedMoveRecord,
  type CardsMaps,
  type EngineLogRecord,
  type LorcanaClient,
  type LorcanaMatchState,
} from "@tcg/lorcana-engine";
import type { LorcanaPlayerSide, MoveLogEntrySnapshot } from "../simulator/model/contracts.js";
import {
  createSpectatorHistoryEntries,
  extractMatchState,
} from "../spectator/spectator-match-orchestrator.svelte.js";
import type { PersistedReplayData } from "./fetch-replay.js";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface ReplayMove {
  stateVersion: number;
  acceptedMove: AcceptedMoveRecord;
  patches: unknown[];
  state?: unknown;
  engineLogs: EngineLogRecord[];
}

// ---------------------------------------------------------------------------
// Read Model
// ---------------------------------------------------------------------------

class ReplayReadModel {
  #listeners = new Set<(stateID: number) => void>();
  #stateId = 0;
  #moveLog: MoveLogEntrySnapshot[] = [];

  getMoveLog(limit = 50): MoveLogEntrySnapshot[] {
    return limit > 0 ? this.#moveLog.slice(-limit) : [...this.#moveLog];
  }

  subscribeStateUpdates(handler: (stateID: number) => void): () => void {
    this.#listeners.add(handler);
    return () => {
      this.#listeners.delete(handler);
    };
  }

  setMoveLog(entries: MoveLogEntrySnapshot[]): void {
    this.#moveLog = entries;
  }

  notify(): void {
    this.#stateId += 1;
    for (const listener of this.#listeners) {
      listener(this.#stateId);
    }
  }
}

// ---------------------------------------------------------------------------
// State parsing
// ---------------------------------------------------------------------------

export function parseReplayInitialState(
  initialState: string,
): { state: LorcanaMatchState; cardsMaps: CardsMaps } | null {
  try {
    const parsed = JSON.parse(initialState) as Record<string, unknown>;

    // Server-authority EngineSnapshot format: { state: LorcanaMatchState, cardsMaps, historyLength }
    // Must be checked first — the state field has a ctx which also matches extractMatchState,
    // but we need the cardsMaps at the top level for proper card name resolution.
    if (
      parsed.state &&
      typeof parsed.state === "object" &&
      parsed.cardsMaps &&
      typeof parsed.cardsMaps === "object"
    ) {
      return {
        state: parsed.state as LorcanaMatchState,
        cardsMaps: parsed.cardsMaps as CardsMaps,
      };
    }

    // Client-authority format: { state: { engineSnapshot: { state, cardsMaps } } }
    if (parsed.state && typeof parsed.state === "object") {
      const extracted = extractMatchState(parsed.state);
      if (extracted) return extracted;
    }

    // Direct LorcanaMatchState (no wrapping) — fallback
    if ("ctx" in parsed) {
      return {
        state: parsed as unknown as LorcanaMatchState,
        cardsMaps: {} as CardsMaps,
      };
    }

    return null;
  } catch {
    return null;
  }
}

// ---------------------------------------------------------------------------
// Orchestrator
// ---------------------------------------------------------------------------

export class ReplayOrchestrator {
  readonly readModel = new ReplayReadModel();
  readonly #engine: LorcanaClient;
  readonly #cardsMaps: CardsMaps;
  readonly #playerIds: [string, string];
  /** Pre-computed states indexed by step (step 0 = initial state). */
  readonly #states: LorcanaMatchState[];
  /** Turn number per step (step 0 = 0 / pre-game). */
  readonly #turnNumbers: number[];

  #currentStep = $state(0);
  #isPlaying = $state(false);
  #speedMs = $state(800);
  #timer: ReturnType<typeof setTimeout> | null = null;

  constructor(replayData: PersistedReplayData) {
    const parsed = parseReplayInitialState(replayData.initialState);

    if (!parsed) {
      throw new Error("Failed to parse replay initial state");
    }

    const { state, cardsMaps } = parsed;
    this.#cardsMaps = cardsMaps;
    this.#playerIds = replayData.playerIds;

    // Prefer cardsMaps.owners for player list (server-authority);
    // fall back to playerIds for client-authority games.
    const playerIdList =
      Object.keys(cardsMaps.owners ?? {}).length > 0
        ? Object.keys(cardsMaps.owners)
        : [...replayData.playerIds];

    const players = playerIdList.map((id) => ({ id }));

    this.#engine = createLorcanaClient({
      seed: state.ctx.random.seed,
      cardsMaps,
      cardCatalog: getLorcanaCardCatalogSync(),
      players,
      playerId: "replay-viewer",
      role: "spectator",
      matchID: state.ctx.matchID,
      gameID: state.ctx.gameID ?? replayData.gameId,
      goingFirst: createPlayerId(String(players[0]?.id ?? replayData.playerIds[0])),
    });

    // Pre-compute states from replay snapshots when available.
    const moves = replayData.moves as unknown as ReplayMove[];
    this.#states = [state];
    this.#turnNumbers = [0]; // step 0 is pre-game

    for (const move of moves) {
      if (move.state) {
        const extracted = extractMatchState(move.state);
        if (extracted) {
          this.#states.push(extracted.state);
          this.#turnNumbers.push(move.acceptedMove?.turnNumber ?? 0);
        }
      }
    }

    // Build move log using spectator history helper
    const acceptedMoves = moves.map((m) => m.acceptedMove).filter(Boolean) as Array<{
      actorId: string;
      moveId: string;
      stateVersion: number;
      timestamp: number;
      turnNumber: number;
      input?: unknown;
    }>;

    const engineLogs = moves.flatMap((m) => m.engineLogs ?? []) as Array<{
      stateVersion: number;
      log: unknown;
    }>;

    const entries = createSpectatorHistoryEntries({
      acceptedMoves,
      engineLogs,
      engine: this.#engine,
      cardsMaps: this.#cardsMaps,
      resolveActorSide: (actorId) => this.#resolveActorSide(actorId),
    });

    this.readModel.setMoveLog(entries);

    // Load initial state into engine
    this.#engine.loadState(state);
  }

  get currentEngine(): LorcanaClient {
    return this.#engine;
  }

  get currentStep(): number {
    return this.#currentStep;
  }

  get totalSteps(): number {
    return this.#states.length;
  }

  get currentTurn(): number {
    return this.#turnNumbers[this.#currentStep] ?? 0;
  }

  get totalTurns(): number {
    return Math.max(0, ...this.#turnNumbers);
  }

  get isPlaying(): boolean {
    return this.#isPlaying;
  }

  get speedMs(): number {
    return this.#speedMs;
  }

  /** True when replay snapshots are available and step-through is possible. */
  get hasPatchData(): boolean {
    return this.#states.length > 1;
  }

  goToStep(step: number): void {
    const clamped = Math.max(0, Math.min(step, this.#states.length - 1));
    if (clamped === this.#currentStep) return;
    this.#currentStep = clamped;
    const nextState = this.#states[clamped];
    if (nextState) {
      this.#engine.loadState(nextState);
      this.readModel.notify();
    }
  }

  nextStep(): void {
    this.goToStep(this.#currentStep + 1);
  }

  prevStep(): void {
    this.goToStep(this.#currentStep - 1);
  }

  nextTurn(): void {
    const currentTurn = this.currentTurn;
    for (let i = this.#currentStep + 1; i < this.#turnNumbers.length; i++) {
      if ((this.#turnNumbers[i] ?? 0) > currentTurn) {
        this.goToStep(i);
        return;
      }
    }
    this.goToStep(this.#states.length - 1);
  }

  prevTurn(): void {
    const currentTurn = this.currentTurn;
    const firstOfCurrentTurn = this.#turnNumbers.indexOf(currentTurn);

    if (firstOfCurrentTurn !== -1 && this.#currentStep > firstOfCurrentTurn) {
      this.goToStep(firstOfCurrentTurn);
      return;
    }

    if (this.#currentStep === 0) return;
    const prevTurnNum = this.#turnNumbers[this.#currentStep - 1] ?? 0;
    const firstOfPrevTurn = this.#turnNumbers.indexOf(prevTurnNum);
    this.goToStep(firstOfPrevTurn === -1 ? 0 : firstOfPrevTurn);
  }

  play(): void {
    if (this.#isPlaying) return;
    if (this.#currentStep >= this.#states.length - 1) {
      this.goToStep(0);
    }
    this.#isPlaying = true;
    this.#scheduleNext();
  }

  pause(): void {
    this.#isPlaying = false;
    this.#clearTimer();
  }

  togglePlay(): void {
    if (this.#isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  setSpeed(ms: number): void {
    this.#speedMs = ms;
  }

  dispose(): void {
    this.pause();
  }

  #scheduleNext(): void {
    this.#timer = setTimeout(
      () => {
        this.#timer = null;
        if (!this.#isPlaying) return;
        if (this.#currentStep >= this.#states.length - 1) {
          this.#isPlaying = false;
          return;
        }
        this.nextStep();
        this.#scheduleNext();
      },
      this.#speedMs,
    );
  }

  #clearTimer(): void {
    if (this.#timer !== null) {
      clearTimeout(this.#timer);
      this.#timer = null;
    }
  }

  #resolveActorSide(actorId: string): LorcanaPlayerSide | undefined {
    const [p1, p2] = this.#playerIds;
    if (actorId === p1) return "playerOne";
    if (actorId === p2) return "playerTwo";
    return undefined;
  }
}
