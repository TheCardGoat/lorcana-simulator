import { getContext, hasContext, onDestroy, onMount, setContext, untrack } from "svelte";
import { getLocale, locales, setLocale } from "$lib/paraglide/runtime";
import { m } from "$lib/paraglide/messages.js";
import type {
  CardInstanceId,
  ChallengePreviewResult,
  EnginePacketUpdate,
} from "@tcg/lorcana-engine";
import type {
  CardInput,
  LorcanaCardTarget,
  LorcanaEngineBase,
  LorcanaProjectedBoardView,
} from "@tcg/lorcana-engine";

import {
  type CardActionView,
  type ExecutableMovePresentationCategoryId,
  getActiveSide,
  getAvailableInkForSide,
  getOwnerIdForSide as getOwnerIdForSideFromBoard,
  getSideForOwnerId,
  getTurnSide,
  getZoneCardIds,
  getZoneCardCount,
  isZoneMasked as isBoardZoneMasked,
  type ExecutableMoveEntry,
  type LorcanaCardSnapshot,
  type LorcanaPlayerSide,
  type LorcanaPlayerSummary,
  type ResolutionActionView,
  type LorcanaSimulatorLocale,
  type LorcanaSimulatorReadModel,
  type LorcanaSimulatorMoveId,
  type LorcanaSimulatorMoveParams,
  type LorcanaTableSeat,
  type LorcanaZoneId,
  type MoveLogEntrySnapshot,
  type PendingResolutionMoveEntry,
  type SimulatorMoveError,
} from "@/features/simulator/model/contracts.js";
import {
  buildCardActionViews,
  getCardActionSourceCardId,
  getCardActionTargetCardId,
} from "@/features/simulator/model/card-action-presenter.js";
import {
  type CardSnapshotMap,
  buildCardSnapshotMap,
  getCardsForZone,
} from "@/features/simulator/model/board-utils.js";
import {
  getBagEffectPayloadMeta,
  getPendingEffectPayloadMeta,
  parseScryPendingEffect,
  type ScryPendingEffectView,
} from "@/features/simulator/model/pending-effect-payload.js";
import { buildResolutionActionViews } from "@/features/simulator/model/resolution-actions.js";
import {
  areExecutableMovesEqual,
  areOrderedStringArraysEqual,
  arePendingResolutionMovesEqual,
  areStringRecordsEqual,
  buildChallengeReadyCardIds,
  buildChallengeState,
  buildExecutableMoves,
  buildPendingResolutionMoves,
  buildPlayableHandCardIds,
  canValidateInk,
  getPlayerSummary as getDerivedPlayerSummary,
} from "@/features/simulator/model/derived-state.js";
import {
  buildPendingMoveError,
  dispatchSimulatorMove,
} from "@/features/simulator/model/move-dispatch.js";
import {
  getLorcanaPlayerVisualSettings,
  type LorcanaPlayerSettingsMap,
  type LorcanaResolvedPlayerVisualSettings,
} from "@/features/simulator/model/player-visual-settings.js";
import { LorcanaBoardPresenter } from "@/features/simulator/presenters/board-presenter.svelte.js";
import type {
  ActivePlayerGuidanceController,
  ActivePlayerGuidanceItem,
  GuidanceAction,
} from "@/features/simulator/model/active-player-guidance.js";
import type {
  BoardAnchorSnapshot,
  BoardAnchorRect,
  BoardLocalRect,
  QueuedBoardMoveAnimation,
  ResolvedBoardMoveAnimation,
  SimulatorDebugAnimationPlayer,
  SimulatorDebugAnimationRequest,
} from "@/features/simulator/animations/board-move-animations.js";
import {
  BOARD_CENTER_ANCHOR_ID,
  createSeatHandAnchorId,
  deriveQueuedBoardMoveAnimationsFromPacket,
  resolveQueuedBoardMoveAnimation,
} from "@/features/simulator/animations/board-move-animations.js";
import {
  getMoveCategoryId,
  getMoveCategoryLabel,
} from "@/features/simulator/model/move-presentation.js";

const LORCANA_GAME_CONTEXT_KEY = Symbol.for("lorcana.game");
const LORCANA_SIDEBAR_PRESENTER_CONTEXT_KEY = Symbol.for("lorcana.sidebar-presenter");
const PLAYER_LOCALE_STORAGE_KEY = "lorcana.simulator.playerLocale";
const RAW_LOG_REGISTRY_STORAGE_KEY = "lorcana.simulator.rawLogRegistryJson";
const SKIP_ACTION_CONFIRMATION_STORAGE_KEY = "lorcana.simulator.skipActionConfirmation";
const SECOND_LAYER_GUIDANCE_ID = "available-moves-second-layer";

export type PregamePhase = "chooseFirstPlayer" | "mulligan";
type SupportedLocale = (typeof locales)[number];

export interface ExecuteMoveOptions {
  clearChallengeMode?: boolean;
  clearSelection?: boolean;
  status?: string;
}

export interface PendingEffectsPopoverItem {
  id: string;
  kind: "bag" | "pending";
  title: string;
  subtitle: string;
  detail: string;
  badge: string;
  card: LorcanaCardSnapshot | null;
  isActive?: boolean;
  canResolve?: boolean;
  canAccept?: boolean;
  canReject?: boolean;
  disabledReason?: string;
  primaryActionLabel?: string;
  onResolve?: () => void;
  onPrimaryAction?: () => void;
  onAccept?: () => void;
  onReject?: () => void;
}

export interface LorcanaGameContextValue {
  boardSnapshot: () => LorcanaProjectedBoardView | null;
  cardSnapshotsById: () => CardSnapshotMap;
  getPlayerSummary: (side: LorcanaPlayerSide) => LorcanaPlayerSummary | null;
  executableMoves: () => ExecutableMoveEntry[];
  challengeReadyCardIds: () => string[];
  moveLogEntries: () => MoveLogEntrySnapshot[];
  pendingResolutionMoves: () => PendingResolutionMoveEntry[];
  playableHandCardIds: () => string[];
  validChallengeTargetIds: () => string[];
  invalidChallengeTargetReasons: () => Record<string, string>;
  ownerSide: () => LorcanaPlayerSide | null;
  pregameActiveSide: () => LorcanaPlayerSide | null;
  pregamePhase: () => PregamePhase | null;
  canActInPregame: () => boolean;
  statusMessage: () => string;
  selectedCardId: () => string | null;
  selectedMulliganCardIds: () => string[];
  pendingErrorReason: () => string | null;
  pendingMoveError: () => SimulatorMoveError | null;
  challengeSourceCardId: () => string | null;
  challengeMode: () => boolean;
  animations: () => ResolvedBoardMoveAnimation[];
  previewChallenge: (attackerId: string, defenderId: string) => ChallengePreviewResult | null;
  executeMove: <K extends LorcanaSimulatorMoveId>(
    moveId: K,
    params: LorcanaSimulatorMoveParams[K],
    options?: ExecuteMoveOptions,
  ) => boolean;
  playCard: (cardId: string) => boolean;
  ink: (cardId: string) => boolean;
  canDropHandCardIntoZone: (
    cardId: string,
    zoneId: Extract<LorcanaZoneId, "play" | "inkwell">,
  ) => boolean;
  handleBoardAnchorsChange: (anchors: BoardAnchorSnapshot) => void;
  getOwnerIdForSide: (side: LorcanaPlayerSide) => string | null;
  getPlayerVisualSettings: (side: LorcanaPlayerSide) => LorcanaResolvedPlayerVisualSettings;
  getPlayerVisualSettingsByOwnerId: (
    ownerId: string | null | undefined,
  ) => LorcanaResolvedPlayerVisualSettings;
  setSelectedCardId: (nextSelectedCardId: string | null) => void;
  setSelectedMulliganCardIds: (nextSelectedMulliganCardIds: string[]) => void;
  setChallengeSourceCardId: (nextChallengeSourceCardId: string | null) => void;
  setPendingError: (nextPendingErrorReason: string | null) => void;
  setStatusMessage: (nextStatusMessage: string) => void;
  handleLocaleChanged: () => void;
  runAnimation: (animation: SimulatorDebugAnimationRequest) => boolean;
}

interface DerivedStateSnapshot {
  challengeReadyCardIds: string[];
  executableMoves: ExecutableMoveEntry[];
  invalidChallengeTargetReasons: Record<string, string>;
  pendingResolutionMoves: PendingResolutionMoveEntry[];
  playableHandCardIds: string[];
  validChallengeTargetIds: string[];
}

export interface SetLorcanaGameContextOptions {
  engine: LorcanaEngineBase;
  readModel?: SimulatorShellReadModel;
  playerSettings?: LorcanaPlayerSettingsMap;
}

type SimulatorShellReadModel = Pick<LorcanaSimulatorReadModel, "getMoveLog"> &
  Partial<Pick<LorcanaSimulatorReadModel, "subscribeStateUpdates">>;

const LORCANA_PREGAME_SEGMENT_ID = "startingAGame";
const BOARD_ANIMATION_END_BUFFER_MS = 96;
const DEBUG_ACTION_PREVIEW_DURATION_MS = 2000;
const DEBUG_REACTIVITY_LOGS = true;

function normalizePregamePhase(phase?: string): PregamePhase | null {
  if (phase === "chooseFirstPlayer" || phase === "chooseFirtPlayer") {
    return "chooseFirstPlayer";
  }
  if (phase === "mulligan") {
    return "mulligan";
  }
  return null;
}

function debugLog(scope: string, message: string, payload?: Record<string, unknown>): void {
  if (!DEBUG_REACTIVITY_LOGS) {
    return;
  }

  if (payload) {
    console.log(`[LorcanaGameContext:${scope}] ${message}`, payload);
    return;
  }

  console.log(`[LorcanaGameContext:${scope}] ${message}`);
}

function stableSerialize(value: unknown): string {
  if (value === undefined) return "undefined";
  if (value === null || typeof value !== "object") return JSON.stringify(value);
  if (Array.isArray(value)) return `[${value.map((entry) => stableSerialize(entry)).join(",")}]`;

  const entries = Object.entries(value as Record<string, unknown>).sort(([left], [right]) =>
    left.localeCompare(right),
  );
  return `{${entries.map(([key, entry]) => `${JSON.stringify(key)}:${stableSerialize(entry)}`).join(",")}}`;
}

function getOwnerSideFromEngine(
  engine: LorcanaEngineBase,
  board: LorcanaProjectedBoardView,
): LorcanaPlayerSide | null {
  const clientPlayerId = engine.getClientPlayerId();
  return clientPlayerId ? getSideForOwnerId(board, clientPlayerId) : null;
}

function hasPacketUpdate(nextEngine: LorcanaEngineBase): nextEngine is LorcanaEngineBase & {
  getLastPacketUpdate: () => EnginePacketUpdate | null;
} {
  return (
    typeof (nextEngine as { getLastPacketUpdate?: unknown }).getLastPacketUpdate === "function"
  );
}

function hasMoveLog(
  nextEngine: LorcanaEngineBase,
): nextEngine is LorcanaEngineBase & { getMoveLog: (limit?: number) => MoveLogEntrySnapshot[] } {
  return typeof (nextEngine as { getMoveLog?: unknown }).getMoveLog === "function";
}

function hasReadModelStateSubscription(
  readModel: SimulatorShellReadModel | undefined,
): readModel is SimulatorShellReadModel & Pick<LorcanaSimulatorReadModel, "subscribeStateUpdates"> {
  return typeof readModel?.subscribeStateUpdates === "function";
}

function areMoveLogEntriesEqual(
  left: MoveLogEntrySnapshot[],
  right: MoveLogEntrySnapshot[],
): boolean {
  if (left.length !== right.length) {
    return false;
  }

  for (let index = 0; index < left.length; index += 1) {
    const leftEntry = left[index];
    const rightEntry = right[index];
    if (
      leftEntry.id !== rightEntry.id ||
      leftEntry.timestamp !== rightEntry.timestamp ||
      leftEntry.turnNumber !== rightEntry.turnNumber ||
      leftEntry.moveId !== rightEntry.moveId ||
      leftEntry.actorSide !== rightEntry.actorSide ||
      leftEntry.title !== rightEntry.title ||
      leftEntry.detail !== rightEntry.detail ||
      stableSerialize(leftEntry.rawLogRegistry) !== stableSerialize(rightEntry.rawLogRegistry)
    ) {
      return false;
    }
  }

  return true;
}

export class LorcanaGameContext implements LorcanaGameContextValue {
  #engine: LorcanaEngineBase | null = null;
  #readModel: SimulatorShellReadModel | undefined = undefined;
  #playerSettings: LorcanaPlayerSettingsMap = {};
  #unsubscribeReadModelStateUpdates: (() => void) | null = null;
  #lastStateID = $state(0);
  #boardSnapshot = $state<LorcanaProjectedBoardView | null>(null);
  #cardSnapshotsById = $state<CardSnapshotMap>({});
  #selectedCardId = $state<string | null>(null);
  #selectedMulliganCardIds = $state<string[]>([]);
  #challengeSourceCardId = $state<string | null>(null);
  #pendingErrorReason = $state<string | null>(null);
  #pendingMoveError = $state<SimulatorMoveError | null>(null);
  #statusMessage = $state<string>(m["sim.status.ready"]({}));
  #ownerSide = $state<LorcanaPlayerSide | null>(null);
  #executableMoves = $state<ExecutableMoveEntry[]>([]);
  #moveLogEntries = $state<MoveLogEntrySnapshot[]>([]);
  #challengeReadyCardIds = $state<string[]>([]);
  #playableHandCardIds = $state<string[]>([]);
  #validChallengeTargetIds = $state<string[]>([]);
  #invalidChallengeTargetReasons = $state<Record<string, string>>({});
  #pendingResolutionMoves = $state<PendingResolutionMoveEntry[]>([]);
  #boardAnchors = $state<BoardAnchorSnapshot | null>(null);
  #pendingQueuedAnimations = $state<QueuedBoardMoveAnimation[]>([]);
  #pendingAnimationSourceAnchors = $state<BoardAnchorSnapshot | null>(null);
  #queuedBoardAnimations = $state<ResolvedBoardMoveAnimation[]>([]);
  #activeBoardAnimations = $state<ResolvedBoardMoveAnimation[]>([]);
  #playedPacketAnimationIds = $state<string[]>([]);
  #snapshotRefreshCallCount = 0;
  #previousMulliganContextKey: string | null = null;
  #boardAnimationTimeout: ReturnType<typeof setTimeout> | null = null;

  constructor(
    engine: LorcanaEngineBase,
    readModel?: SimulatorShellReadModel,
    playerSettings: LorcanaPlayerSettingsMap = {},
  ) {
    this.syncEngine(engine, readModel, playerSettings);
  }

  get boardSnapshotValue(): LorcanaProjectedBoardView | null {
    return this.#boardSnapshot;
  }

  get pregamePhaseValue(): PregamePhase | null {
    return this.#boardSnapshot?.gameSegment === LORCANA_PREGAME_SEGMENT_ID
      ? normalizePregamePhase(this.#boardSnapshot.phase)
      : null;
  }

  get pregameActiveSideValue(): LorcanaPlayerSide | null {
    return this.#boardSnapshot ? getActiveSide(this.#boardSnapshot) : null;
  }

  get challengeModeValue(): boolean {
    return Boolean(this.#challengeSourceCardId);
  }

  get canActInPregameValue(): boolean {
    return Boolean(
      this.pregamePhaseValue && this.#ownerSide && this.pregameActiveSideValue === this.#ownerSide,
    );
  }

  readonly boardSnapshot = (): LorcanaProjectedBoardView | null => this.#boardSnapshot;
  readonly cardSnapshotsById = (): CardSnapshotMap => this.#cardSnapshotsById;
  readonly getPlayerSummary = (side: LorcanaPlayerSide): LorcanaPlayerSummary | null =>
    getDerivedPlayerSummary(side, this.#boardSnapshot);
  readonly executableMoves = (): ExecutableMoveEntry[] => this.#executableMoves;
  readonly moveLogEntries = (): MoveLogEntrySnapshot[] => this.#moveLogEntries;
  readonly challengeReadyCardIds = (): string[] => this.#challengeReadyCardIds;
  readonly pendingResolutionMoves = (): PendingResolutionMoveEntry[] =>
    this.#pendingResolutionMoves;
  readonly playableHandCardIds = (): string[] => this.#playableHandCardIds;
  readonly validChallengeTargetIds = (): string[] => this.#validChallengeTargetIds;
  readonly invalidChallengeTargetReasons = (): Record<string, string> =>
    this.#invalidChallengeTargetReasons;
  readonly ownerSide = (): LorcanaPlayerSide | null => this.#ownerSide;
  readonly pregameActiveSide = (): LorcanaPlayerSide | null => this.pregameActiveSideValue;
  readonly pregamePhase = (): PregamePhase | null => this.pregamePhaseValue;
  readonly canActInPregame = (): boolean => this.canActInPregameValue;
  readonly statusMessage = (): string => this.#statusMessage;
  readonly selectedCardId = (): string | null => this.#selectedCardId;
  readonly selectedMulliganCardIds = (): string[] => this.#selectedMulliganCardIds;
  readonly pendingErrorReason = (): string | null => this.#pendingErrorReason;
  readonly pendingMoveError = (): SimulatorMoveError | null => this.#pendingMoveError;
  readonly challengeSourceCardId = (): string | null => this.#challengeSourceCardId;
  readonly challengeMode = (): boolean => this.challengeModeValue;
  readonly animations = (): ResolvedBoardMoveAnimation[] => this.#activeBoardAnimations;
  readonly previewChallenge = (
    attackerId: string,
    defenderId: string,
  ): ChallengePreviewResult | null =>
    this.#engine?.previewChallenge(attackerId as CardInstanceId, defenderId as CardInstanceId) ??
    null;

  syncEngine(
    nextEngine: LorcanaEngineBase,
    nextReadModel: SimulatorShellReadModel | undefined = this.#readModel,
    nextPlayerSettings: LorcanaPlayerSettingsMap = this.#playerSettings,
  ): void {
    if (
      this.#engine !== nextEngine ||
      this.#readModel !== nextReadModel ||
      this.#playerSettings !== nextPlayerSettings
    ) {
      this.#engine = nextEngine;
      this.#readModel = nextReadModel;
      this.#playerSettings = nextPlayerSettings;
      this.#subscribeToReadModelStateUpdates();
      this.#clearInteractionState();
      this.#resetBoardAnimations();
      this.#lastStateID = 0;
      this.#refreshSnapshot("engine-change");
      return;
    }

    if (!this.#boardSnapshot) {
      this.#refreshSnapshot("initial-snapshot");
    }
  }

  destroy(): void {
    this.#unsubscribeFromReadModelStateUpdates();
    this.#clearBoardAnimationTimer();
  }

  readonly executeMove = <K extends LorcanaSimulatorMoveId>(
    moveId: K,
    params: LorcanaSimulatorMoveParams[K],
    options: ExecuteMoveOptions = {},
  ): boolean => {
    const engine = this.#engine;
    if (!engine) {
      return false;
    }

    const playerId = engine.getClientPlayerId();
    if (!playerId) {
      const nextPendingMoveError = buildPendingMoveError(
        moveId,
        params,
        "View not found",
        "VIEW_NOT_FOUND",
      );
      this.#pendingMoveError = nextPendingMoveError;
      this.#pendingErrorReason = nextPendingMoveError.message;
      this.#statusMessage = m["sim.status.actionRejected"]({});
      return false;
    }

    const result = dispatchSimulatorMove(engine, playerId, moveId, params);

    if (!result.success) {
      const nextPendingMoveError = buildPendingMoveError(
        moveId,
        params,
        result.error,
        result.errorCode,
      );
      this.#pendingMoveError = nextPendingMoveError;
      this.#pendingErrorReason = nextPendingMoveError.message;
      this.#statusMessage = m["sim.status.actionRejected"]({});
      return false;
    }

    if (options.clearSelection) {
      this.#selectedCardId = null;
    }
    if (options.clearChallengeMode ?? true) {
      this.#challengeSourceCardId = null;
    }

    this.#pendingErrorReason = null;
    this.#pendingMoveError = null;
    this.#statusMessage = options.status ?? m["sim.status.actionExecuted"]({});
    this.#refreshSnapshot(`execute:${moveId}`);
    return true;
  };

  readonly playCard = (cardId: string): boolean => {
    const engine = this.#engine;
    if (!engine) {
      return false;
    }

    const playerId = engine.getClientPlayerId();
    if (!playerId) {
      const nextPendingMoveError = buildPendingMoveError(
        "playCard",
        { cardId },
        "View not found",
        "VIEW_NOT_FOUND",
      );
      this.#pendingMoveError = nextPendingMoveError;
      this.#pendingErrorReason = nextPendingMoveError.message;
      this.#statusMessage = m["sim.status.actionRejected"]({});
      return false;
    }

    const cardInput = cardId as CardInput;
    const result = engine.playCard(playerId, cardInput);
    if (!result.success) {
      const nextPendingMoveError = buildPendingMoveError(
        "playCard",
        { cardId },
        result.error,
        result.errorCode,
      );
      this.#pendingMoveError = nextPendingMoveError;
      this.#pendingErrorReason = nextPendingMoveError.message;
      this.#statusMessage = m["sim.status.actionRejected"]({});
      return false;
    }

    this.#selectedCardId = null;
    this.#challengeSourceCardId = null;
    this.#pendingErrorReason = null;
    this.#pendingMoveError = null;
    this.#statusMessage = m["sim.actions.label.playCard"]({});
    this.#refreshSnapshot("execute:playCard");
    return true;
  };

  readonly ink = (cardId: string): boolean => {
    const engine = this.#engine;
    if (!engine) {
      return false;
    }

    const playerId = engine.getClientPlayerId();
    if (!playerId) {
      const nextPendingMoveError = buildPendingMoveError(
        "putCardIntoInkwell",
        { cardId },
        "View not found",
        "VIEW_NOT_FOUND",
      );
      this.#pendingMoveError = nextPendingMoveError;
      this.#pendingErrorReason = nextPendingMoveError.message;
      this.#statusMessage = m["sim.status.actionRejected"]({});
      return false;
    }

    const cardInput = cardId as CardInput;
    const result = engine.ink(playerId, cardInput);
    if (!result.success) {
      const nextPendingMoveError = buildPendingMoveError(
        "putCardIntoInkwell",
        { cardId },
        result.error,
        result.errorCode,
      );
      this.#pendingMoveError = nextPendingMoveError;
      this.#pendingErrorReason = nextPendingMoveError.message;
      this.#statusMessage = m["sim.status.actionRejected"]({});
      return false;
    }

    this.#selectedCardId = null;
    this.#challengeSourceCardId = null;
    this.#pendingErrorReason = null;
    this.#pendingMoveError = null;
    this.#statusMessage = m["sim.actions.label.inkCard"]({});
    this.#refreshSnapshot("execute:putCardIntoInkwell");
    return true;
  };

  readonly canDropHandCardIntoZone = (
    cardId: string,
    zoneId: Extract<LorcanaZoneId, "play" | "inkwell">,
  ): boolean => {
    const engine = this.#engine;
    const ownerSide = this.#ownerSide;
    const card = this.#cardSnapshotsById[cardId];
    if (!engine || !ownerSide || !card || card.zoneId !== "hand" || card.ownerSide !== ownerSide) {
      return false;
    }

    if (zoneId === "play") {
      return engine.canPlayCard(cardId as CardInput);
    }

    return canValidateInk(engine, cardId);
  };

  readonly handleBoardAnchorsChange = (nextAnchors: BoardAnchorSnapshot): void => {
    this.#boardAnchors = nextAnchors;

    if (this.#pendingQueuedAnimations.length === 0) {
      return;
    }

    const resolvedAnimations = this.#pendingQueuedAnimations
      .map((animation) =>
        resolveQueuedBoardMoveAnimation(
          animation,
          this.#pendingAnimationSourceAnchors,
          nextAnchors,
        ),
      )
      .filter((animation): animation is ResolvedBoardMoveAnimation => animation !== null);

    this.#pendingQueuedAnimations = [];
    this.#pendingAnimationSourceAnchors = null;
    this.#queueResolvedBoardAnimations(resolvedAnimations);
  };

  readonly getOwnerIdForSide = (side: LorcanaPlayerSide): string | null => {
    if (!this.#boardSnapshot) {
      return null;
    }
    return getOwnerIdForSideFromBoard(this.#boardSnapshot, side);
  };
  readonly getPlayerVisualSettingsByOwnerId = (
    ownerId: string | null | undefined,
  ): LorcanaResolvedPlayerVisualSettings =>
    getLorcanaPlayerVisualSettings(this.#playerSettings, ownerId);
  readonly getPlayerVisualSettings = (
    side: LorcanaPlayerSide,
  ): LorcanaResolvedPlayerVisualSettings =>
    this.getPlayerVisualSettingsByOwnerId(this.getOwnerIdForSide(side));

  readonly setSelectedCardId = (nextSelectedCardId: string | null): void => {
    this.#selectedCardId = nextSelectedCardId;
  };

  readonly setSelectedMulliganCardIds = (nextSelectedMulliganCardIds: string[]): void => {
    this.#selectedMulliganCardIds = nextSelectedMulliganCardIds;
  };

  readonly setChallengeSourceCardId = (nextChallengeSourceCardId: string | null): void => {
    this.#challengeSourceCardId = nextChallengeSourceCardId;
    this.#refreshDerivedState();
  };

  readonly setPendingError = (nextPendingErrorReason: string | null): void => {
    this.#pendingErrorReason = nextPendingErrorReason;
    this.#pendingMoveError = null;
  };

  readonly setStatusMessage = (nextStatusMessage: string): void => {
    this.#statusMessage = nextStatusMessage;
  };

  readonly handleLocaleChanged = (): void => {
    this.#rebuildPresentationState("locale-change");
  };

  readonly runAnimation = (animation: SimulatorDebugAnimationRequest): boolean => {
    const resolved = this.#resolveDebugAnimation(animation);
    if (!resolved) {
      debugLog("debug-animations", "Failed to resolve debug animation", {
        animation,
        hasBoardAnchors: this.#boardAnchors !== null,
        knownCardIds: Object.keys(this.#cardSnapshotsById),
      });
      return false;
    }

    this.#queueResolvedBoardAnimations([resolved]);
    return true;
  };

  #clearInteractionState(status = m["sim.status.ready"]({})): void {
    this.#selectedCardId = null;
    this.#selectedMulliganCardIds = [];
    this.#challengeSourceCardId = null;
    this.#pendingErrorReason = null;
    this.#pendingMoveError = null;
    this.#statusMessage = status;
    this.#challengeReadyCardIds = [];
    this.#executableMoves = [];
    this.#moveLogEntries = [];
    this.#playableHandCardIds = [];
    this.#pendingResolutionMoves = [];
    this.#validChallengeTargetIds = [];
    this.#invalidChallengeTargetReasons = {};
    this.#previousMulliganContextKey = null;
  }

  #clearBoardAnimationTimer(): void {
    if (this.#boardAnimationTimeout !== null) {
      clearTimeout(this.#boardAnimationTimeout);
      this.#boardAnimationTimeout = null;
    }
  }

  #subscribeToReadModelStateUpdates(): void {
    this.#unsubscribeFromReadModelStateUpdates();

    if (!hasReadModelStateSubscription(this.#readModel)) {
      return;
    }

    this.#unsubscribeReadModelStateUpdates = this.#readModel.subscribeStateUpdates(() => {
      this.#refreshSnapshot("read-model-state-update");
    });
  }

  #unsubscribeFromReadModelStateUpdates(): void {
    if (!this.#unsubscribeReadModelStateUpdates) {
      return;
    }

    try {
      this.#unsubscribeReadModelStateUpdates();
    } catch {
      // Ignore cleanup failures so teardown cannot strand later cleanup work.
    } finally {
      this.#unsubscribeReadModelStateUpdates = null;
    }
  }

  #resetBoardAnimations(): void {
    this.#clearBoardAnimationTimer();
    this.#boardAnchors = null;
    this.#pendingQueuedAnimations = [];
    this.#pendingAnimationSourceAnchors = null;
    this.#queuedBoardAnimations = [];
    this.#activeBoardAnimations = [];
    this.#playedPacketAnimationIds = [];
  }

  #getFilteredPacketUpdate(engine: LorcanaEngineBase): EnginePacketUpdate | null {
    if (!hasPacketUpdate(engine)) {
      return null;
    }

    const packetUpdate = engine.getLastPacketUpdate();
    if (!packetUpdate) {
      return null;
    }

    return {
      ...packetUpdate,
      animations: packetUpdate.animations.filter(
        (animation) => !this.#playedPacketAnimationIds.includes(animation.id),
      ),
    };
  }

  #resolveDebugAnimationSide(player: SimulatorDebugAnimationPlayer): LorcanaPlayerSide | null {
    if (player === "player_one") {
      return "playerOne";
    }
    if (player === "player_two") {
      return "playerTwo";
    }
    return null;
  }

  #toBoardLocalRect(anchorRect: BoardAnchorRect, boardRect: BoardAnchorRect): BoardLocalRect {
    return {
      x: anchorRect.left - boardRect.left,
      y: anchorRect.top - boardRect.top,
      width: anchorRect.width,
      height: anchorRect.height,
      centerX: anchorRect.centerX - boardRect.left,
      centerY: anchorRect.centerY - boardRect.top,
    };
  }

  #resolveBoardAnchorLocalRect(anchorId: string): BoardLocalRect | null {
    if (!this.#boardAnchors) {
      return null;
    }

    const anchorRect = this.#boardAnchors.anchors[anchorId];
    if (!anchorRect) {
      return null;
    }

    return this.#toBoardLocalRect(anchorRect, this.#boardAnchors.boardRect);
  }

  #resolveDebugAnimation(
    animation: SimulatorDebugAnimationRequest,
  ): ResolvedBoardMoveAnimation | null {
    if (animation.kind !== "play.action") {
      return null;
    }

    const actorSide = this.#resolveDebugAnimationSide(animation.payload.player);
    if (!actorSide) {
      return null;
    }

    const card = this.#cardSnapshotsById[animation.payload.cardId];
    if (!card) {
      return null;
    }

    const sourceRect = this.#resolveBoardAnchorLocalRect(createSeatHandAnchorId(actorSide));
    const centerRect = this.#resolveBoardAnchorLocalRect(BOARD_CENTER_ANCHOR_ID);

    if (!sourceRect || !centerRect) {
      return null;
    }

    return {
      card,
      destinationRect: centerRect,
      destinationZoneId: "discard",
      durationMs: DEBUG_ACTION_PREVIEW_DURATION_MS,
      id: animation.id,
      impactAt: "via",
      impactRect: centerRect,
      renderFace: "faceUp",
      sourceRect,
      variant: "play-action-preview",
      viaRect: centerRect,
    };
  }

  #queueResolvedBoardAnimations(animations: ResolvedBoardMoveAnimation[]): void {
    if (animations.length === 0) {
      debugLog("animations", "No resolved animations to queue");
      return;
    }

    const seenIds = new Set([
      ...this.#activeBoardAnimations.map((animation) => animation.id),
      ...this.#queuedBoardAnimations.map((animation) => animation.id),
    ]);
    const uniqueAnimations = animations.filter((animation) => !seenIds.has(animation.id));
    if (uniqueAnimations.length === 0) {
      debugLog("animations", "Resolved animations were already queued or active", {
        animationIds: animations.map((animation) => animation.id),
      });
      return;
    }

    this.#queuedBoardAnimations = [...this.#queuedBoardAnimations, ...uniqueAnimations];
    this.#playNextBoardAnimation();
  }

  #playNextBoardAnimation(): void {
    if (this.#activeBoardAnimations.length > 0 || this.#queuedBoardAnimations.length === 0) {
      return;
    }

    const [nextAnimation, ...remainingAnimations] = this.#queuedBoardAnimations;
    this.#queuedBoardAnimations = remainingAnimations;
    this.#activeBoardAnimations = [nextAnimation];
    this.#clearBoardAnimationTimer();
    this.#boardAnimationTimeout = setTimeout(() => {
      this.#activeBoardAnimations = [];
      this.#boardAnimationTimeout = null;
      this.#playNextBoardAnimation();
    }, nextAnimation.durationMs + BOARD_ANIMATION_END_BUFFER_MS);
  }

  #getCurrentDerivedStateSnapshot(): DerivedStateSnapshot {
    return untrack(() => ({
      challengeReadyCardIds: this.#challengeReadyCardIds,
      executableMoves: this.#executableMoves,
      pendingResolutionMoves: this.#pendingResolutionMoves,
      playableHandCardIds: this.#playableHandCardIds,
      validChallengeTargetIds: this.#validChallengeTargetIds,
      invalidChallengeTargetReasons: this.#invalidChallengeTargetReasons,
    }));
  }

  #refreshDerivedState(): void {
    const engine = this.#engine;
    if (!engine || !this.#boardSnapshot) {
      this.#executableMoves = [];
      this.#challengeReadyCardIds = [];
      this.#pendingResolutionMoves = [];
      this.#playableHandCardIds = [];
      this.#validChallengeTargetIds = [];
      this.#invalidChallengeTargetReasons = {};
      return;
    }

    const legalMoves = engine.enumerateMoves();
    const activeSide = getActiveSide(this.#boardSnapshot);
    let nextExecutableMoves: ExecutableMoveEntry[] = [];
    let nextChallengeReadyCardIds: string[] = [];
    let nextPlayableHandCardIds: string[] = [];
    let nextPendingResolutionMoves: PendingResolutionMoveEntry[] = [];

    try {
      nextExecutableMoves = buildExecutableMoves(
        engine,
        legalMoves,
        this.#cardSnapshotsById,
        this.#boardSnapshot,
        this.#ownerSide,
      );
    } catch (error) {
      console.error("[simulator][refreshDerivedState][buildExecutableMoves][error]", error);
      throw error;
    }

    try {
      nextChallengeReadyCardIds = buildChallengeReadyCardIds(
        engine,
        legalMoves,
        this.#boardSnapshot,
        this.#ownerSide,
      );
    } catch (error) {
      console.error("[simulator][refreshDerivedState][buildChallengeReadyCardIds][error]", error);
      throw error;
    }

    try {
      nextPlayableHandCardIds = buildPlayableHandCardIds(
        engine,
        legalMoves,
        this.#boardSnapshot,
        this.#ownerSide,
      );
    } catch (error) {
      console.error("[simulator][refreshDerivedState][buildPlayableHandCardIds][error]", error);
      throw error;
    }

    try {
      nextPendingResolutionMoves = buildPendingResolutionMoves(legalMoves, this.#boardSnapshot);
      console.log("[simulator][buildPendingResolutionMoves]", {
        count: nextPendingResolutionMoves.length,
        moves: nextPendingResolutionMoves,
      });
    } catch (error) {
      console.error("[simulator][refreshDerivedState][buildPendingResolutionMoves][error]", error);
      throw error;
    }
    console.log("[simulator][refreshDerivedState]", {
      stateID: this.#boardSnapshot.stateID,
      ownerSide: this.#ownerSide,
      activeSide,
      legalMoves,
      executableMoveCount: nextExecutableMoves.length,
      executableMoveIds: nextExecutableMoves.map((move) => ({
        id: move.id,
        moveId: move.moveId,
        categoryId: move.presentation.categoryId,
      })),
      challengeReadyCardIds: nextChallengeReadyCardIds,
      playableHandCardIds: nextPlayableHandCardIds,
      pendingResolutionMoveCount: nextPendingResolutionMoves.length,
    });

    const normalizedChallengeSourceCardId =
      this.#challengeSourceCardId && nextChallengeReadyCardIds.includes(this.#challengeSourceCardId)
        ? this.#challengeSourceCardId
        : null;
    let nextChallengeState: { invalidReasons: Record<string, string>; validTargetIds: string[] };
    try {
      nextChallengeState = buildChallengeState(
        engine,
        legalMoves,
        this.#cardSnapshotsById,
        this.#boardSnapshot,
        this.#ownerSide,
        normalizedChallengeSourceCardId,
      );
    } catch (error) {
      console.error("[simulator][refreshDerivedState][buildChallengeState][error]", error);
      throw error;
    }
    const mulliganContextKey =
      this.pregamePhaseValue === "mulligan" && this.#ownerSide
        ? `${this.#boardSnapshot.stateID}:${this.#ownerSide}:${getZoneCardIds(this.#boardSnapshot, this.#ownerSide, "hand").join(",")}`
        : null;

    if (this.#challengeSourceCardId !== normalizedChallengeSourceCardId) {
      this.#challengeSourceCardId = normalizedChallengeSourceCardId;
    }

    if (this.#previousMulliganContextKey !== mulliganContextKey) {
      this.#previousMulliganContextKey = mulliganContextKey;
      if (this.#selectedMulliganCardIds.length > 0) {
        this.#selectedMulliganCardIds = [];
      }
    }

    const currentDerivedState = this.#getCurrentDerivedStateSnapshot();

    if (!areExecutableMovesEqual(currentDerivedState.executableMoves, nextExecutableMoves)) {
      this.#executableMoves = nextExecutableMoves;
    }
    if (
      !areOrderedStringArraysEqual(
        currentDerivedState.challengeReadyCardIds,
        nextChallengeReadyCardIds,
      )
    ) {
      this.#challengeReadyCardIds = nextChallengeReadyCardIds;
    }
    if (
      !areOrderedStringArraysEqual(currentDerivedState.playableHandCardIds, nextPlayableHandCardIds)
    ) {
      this.#playableHandCardIds = nextPlayableHandCardIds;
    }
    if (
      !arePendingResolutionMovesEqual(
        currentDerivedState.pendingResolutionMoves,
        nextPendingResolutionMoves,
      )
    ) {
      this.#pendingResolutionMoves = nextPendingResolutionMoves;
    }
    if (
      !areOrderedStringArraysEqual(
        currentDerivedState.validChallengeTargetIds,
        nextChallengeState.validTargetIds,
      )
    ) {
      this.#validChallengeTargetIds = nextChallengeState.validTargetIds;
    }
    if (
      !areStringRecordsEqual(
        currentDerivedState.invalidChallengeTargetReasons,
        nextChallengeState.invalidReasons,
      )
    ) {
      this.#invalidChallengeTargetReasons = nextChallengeState.invalidReasons;
    }
  }

  #rebuildPresentationState(source = "unspecified"): void {
    const engine = this.#engine;
    const boardSnapshot = this.#boardSnapshot;
    if (!engine || !boardSnapshot) {
      return;
    }

    debugLog("snapshot", "Rebuild presentation requested", {
      currentStateID: boardSnapshot.stateID,
      lastStateID: this.#lastStateID,
      source,
    });

    const nextCardSnapshotsById = buildCardSnapshotMap(boardSnapshot, engine.staticResources);
    const nextMoveLogEntries =
      this.#readModel?.getMoveLog() ?? (hasMoveLog(engine) ? engine.getMoveLog() : []);

    this.#cardSnapshotsById = nextCardSnapshotsById;
    this.#ownerSide = getOwnerSideFromEngine(engine, boardSnapshot);

    if (!areMoveLogEntriesEqual(this.#moveLogEntries, nextMoveLogEntries)) {
      this.#moveLogEntries = nextMoveLogEntries;
    }

    this.#refreshDerivedState();
  }

  #refreshSnapshot(source = "unspecified"): void {
    const engine = this.#engine;
    if (!engine) {
      return;
    }

    this.#snapshotRefreshCallCount += 1;

    const nextBoardSnapshot = engine.getBoard();
    const currentStateID = nextBoardSnapshot.stateID;
    const shouldRefresh = !this.#boardSnapshot || currentStateID !== this.#lastStateID;

    debugLog("snapshot", "Refresh requested", {
      call: this.#snapshotRefreshCallCount,
      currentStateID,
      lastStateID: this.#lastStateID,
      source,
      shouldRefresh,
    });

    if (!shouldRefresh) {
      return;
    }

    const previousSnapshot = this.#boardSnapshot;
    const previousAnchorSnapshot = this.#boardAnchors;
    const nextCardSnapshotsById = buildCardSnapshotMap(nextBoardSnapshot, engine.staticResources);
    const nextMoveLogEntries =
      this.#readModel?.getMoveLog() ?? (hasMoveLog(engine) ? engine.getMoveLog() : []);
    const packetUpdate = this.#getFilteredPacketUpdate(engine);
    const nextQueuedAnimations = deriveQueuedBoardMoveAnimationsFromPacket(
      previousSnapshot,
      nextBoardSnapshot,
      packetUpdate,
      (cardId) => nextCardSnapshotsById[cardId] ?? null,
    );

    this.#boardSnapshot = nextBoardSnapshot;
    this.#cardSnapshotsById = nextCardSnapshotsById;
    this.#ownerSide = getOwnerSideFromEngine(engine, nextBoardSnapshot);
    this.#lastStateID = currentStateID;
    this.#pendingQueuedAnimations = nextQueuedAnimations;
    this.#pendingAnimationSourceAnchors =
      nextQueuedAnimations.length > 0 ? previousAnchorSnapshot : null;

    if (nextQueuedAnimations.length > 0) {
      this.#playedPacketAnimationIds = [
        ...this.#playedPacketAnimationIds,
        ...nextQueuedAnimations.map((animation) => animation.id),
      ];
    }

    if (!areMoveLogEntriesEqual(this.#moveLogEntries, nextMoveLogEntries)) {
      this.#moveLogEntries = nextMoveLogEntries;
    }

    this.#refreshDerivedState();
  }
}

function guidanceActionsEqual(left: GuidanceAction[], right: GuidanceAction[]): boolean {
  return (
    left.length === right.length &&
    left.every((action, index) => {
      const other = right[index];
      return (
        action.id === other?.id &&
        action.label === other?.label &&
        action.disabled === other?.disabled &&
        action.emphasis === other?.emphasis &&
        action.onClick === other?.onClick
      );
    })
  );
}

function overlayGuidanceEqual(
  existing: ActivePlayerGuidanceItem | undefined,
  next: Omit<ActivePlayerGuidanceItem, "order">,
): boolean {
  return !!(
    existing &&
    existing.id === next.id &&
    existing.message === next.message &&
    existing.mode === next.mode &&
    guidanceActionsEqual(existing.actions, next.actions)
  );
}

function getPendingEffectSubtitle(kind?: string): string {
  switch (kind) {
    case "optional-selection":
      return "Optional effect";
    case "target-selection":
      return "Target selection required";
    case "choice-selection":
      return "Choice required";
    case "discard-choice":
      return "Discard choice required";
    case "name-card-selection":
      return "Card name required";
    case "scry-selection":
      return "Scry ordering required";
    default:
      return "Pending resolution";
  }
}

function getPendingEffectDetail(kind?: string): string {
  switch (kind) {
    case "optional-selection":
      return "This effect can be accepted or declined directly from the simulator.";
    case "target-selection":
      return "This effect still needs target-selection UI before it can resolve here.";
    case "choice-selection":
      return "This effect needs a branch-selection UI before it can resolve here.";
    case "discard-choice":
      return "This effect needs discard targets before it can resolve here.";
    case "name-card-selection":
      return "This effect needs a named card before it can resolve here.";
    case "scry-selection":
      return "Arrange the revealed cards to finish resolving this scry effect.";
    default:
      return "This effect is queued and waiting for additional input.";
  }
}

function mergeNestedResolveEffectParams(
  baseParams: Record<string, unknown>,
  nextNestedParams: Record<string, unknown>,
): Record<string, unknown> {
  const nestedParams =
    baseParams.params && typeof baseParams.params === "object" && !Array.isArray(baseParams.params)
      ? (baseParams.params as Record<string, unknown>)
      : null;
  return {
    ...baseParams,
    params: {
      ...nestedParams,
      ...nextNestedParams,
    },
  };
}

function mergeNestedResolveBagParams(
  baseParams: Record<string, unknown>,
  nextNestedParams: Record<string, unknown>,
): Record<string, unknown> {
  const nestedParams =
    baseParams.params && typeof baseParams.params === "object" && !Array.isArray(baseParams.params)
      ? (baseParams.params as Record<string, unknown>)
      : null;
  return {
    ...baseParams,
    params: {
      ...nestedParams,
      ...nextNestedParams,
    },
  };
}

function getLocaleLabel(locale: SupportedLocale): string {
  switch (locale) {
    case "en":
      return m["sim.locale.name.en"]({});
    case "es":
      return m["sim.locale.name.es"]({});
    case "de":
      return m["sim.locale.name.de"]({});
    case "it":
      return m["sim.locale.name.it"]({});
    case "pt-br":
      return m["sim.locale.name.pt-br"]({});
  }
}

function getPlayerLabel(side: LorcanaPlayerSide): string {
  return side === "playerOne"
    ? m["sim.player.side.playerOne"]({})
    : m["sim.player.side.playerTwo"]({});
}

export type ActionSelectionSessionCategoryId =
  | "activate-ability"
  | "challenge"
  | "ink-card"
  | "move-to-location"
  | "play-card"
  | "quest";

export type ActionSelectionPhase =
  | "idle"
  | "choose-source"
  | "choose-option"
  | "choose-target"
  | "confirm"
  | "executing";

export interface ActionSelectionSession {
  categoryId: ActionSelectionSessionCategoryId;
  label: string;
  phase: ActionSelectionPhase;
  candidateMoves: ExecutableMoveEntry[];
  sourceCardId: string | null;
  targetCardId: string | null;
  selectedMoveId: string | null;
  confirmationRequired: boolean;
}

function isActionSelectionCategoryId(
  categoryId: ExecutableMovePresentationCategoryId,
): categoryId is ActionSelectionSessionCategoryId {
  return (
    categoryId === "activate-ability" ||
    categoryId === "challenge" ||
    categoryId === "ink-card" ||
    categoryId === "move-to-location" ||
    categoryId === "play-card" ||
    categoryId === "quest"
  );
}

function getSourceCardIdForActionSelectionMove(
  categoryId: ActionSelectionSessionCategoryId,
  move: ExecutableMoveEntry,
): string | null {
  if (categoryId === "activate-ability") {
    return getCardActionSourceCardId(move);
  }

  return getCardActionSourceCardId(move);
}

function getTargetCardIdForActionSelectionMove(
  categoryId: ActionSelectionSessionCategoryId,
  move: ExecutableMoveEntry,
): string | null {
  return getCardActionTargetCardId(move);
}

function getUniqueOrderedIds(values: Array<string | null | undefined>): string[] {
  const seen = new Set<string>();
  const orderedIds: string[] = [];

  for (const value of values) {
    if (!value || seen.has(value)) {
      continue;
    }

    seen.add(value);
    orderedIds.push(value);
  }

  return orderedIds;
}

function getMoveAbilityIndex(move: ExecutableMoveEntry): number | null {
  if (!isActivateAbilityMove(move)) {
    return null;
  }

  return typeof move.params.abilityIndex === "number" ? move.params.abilityIndex : 0;
}

function isActivateAbilityMove(move: ExecutableMoveEntry): move is ExecutableMoveEntry & {
  moveId: "activateAbility";
  params: LorcanaSimulatorMoveParams["activateAbility"];
} {
  return move.moveId === "activateAbility";
}

function buildActionSelectionSession(
  categoryId: ActionSelectionSessionCategoryId,
  moves: readonly ExecutableMoveEntry[],
  confirmationRequired: boolean,
): ActionSelectionSession | null {
  if (moves.length === 0) {
    return null;
  }

  return {
    categoryId,
    label: moves[0]?.presentation.categoryLabel ?? getMoveCategoryLabel(moves[0]?.moveId ?? ""),
    phase: "choose-source",
    candidateMoves: [...moves],
    sourceCardId: null,
    targetCardId: null,
    selectedMoveId: null,
    confirmationRequired,
  };
}

function getSourceMovesForActionSelectionSession(
  session: ActionSelectionSession,
  sourceCardId: string,
): ExecutableMoveEntry[] {
  return session.candidateMoves.filter(
    (move) => getSourceCardIdForActionSelectionMove(session.categoryId, move) === sourceCardId,
  );
}

function getChooseSourceStatusMessage(categoryId: ActionSelectionSessionCategoryId): string {
  return categoryId === "ink-card"
    ? m["sim.guidance.session.chooseInkSource"]({})
    : categoryId === "quest"
      ? m["sim.guidance.session.chooseQuestSource"]({})
      : categoryId === "play-card"
        ? m["sim.guidance.session.choosePlaySource"]({})
        : categoryId === "challenge"
          ? m["sim.guidance.session.chooseChallengeSource"]({})
          : categoryId === "move-to-location"
            ? m["sim.guidance.session.chooseMoveSource"]({})
            : m["sim.guidance.session.activateAbilityPending"]({});
}

function getChooseOptionStatusMessage(
  session: ActionSelectionSession,
  sourceCardLabel: string,
): string {
  return session.categoryId === "play-card"
    ? m["sim.guidance.session.choosePlayOption"]({ cardLabel: sourceCardLabel })
    : `Choose an ability for ${sourceCardLabel}.`;
}

export class LorcanaSidebarPresenter {
  readonly #game: LorcanaGameContextValue;

  selectedLocale = $state<SupportedLocale>(getLocale());
  isPlayerSettingsOpen = $state(false);
  showRawLogRegistryJson = $state(false);
  showRawErrorDialog = $state(false);
  hoveredLogCard = $state<LorcanaCardSnapshot | null>(null);
  activeScryResolution = $state<ScryPendingEffectView | null>(null);
  isScryResolutionOpen = $state(false);
  pendingMulliganDangerConfirm = $state<"keepHand" | "allCards" | null>(null);
  skipActionConfirmation = $state(false);
  #actionSelectionSession = $state<ActionSelectionSession | null>(null);

  #secondLayerCategoryLabel = $state<string | null>(null);
  #guidanceOrder = $state(0);
  #overlayGuidanceById = $state<Record<string, ActivePlayerGuidanceItem>>({});

  readonly activePlayerGuidanceController: ActivePlayerGuidanceController;

  constructor(game: LorcanaGameContextValue) {
    this.#game = game;

    this.activePlayerGuidanceController = {
      upsert: (item: {
        id: string;
        message: string;
        actions?: GuidanceAction[];
        mode?: ActivePlayerGuidanceItem["mode"];
      }) => {
        const existing = this.#overlayGuidanceById[item.id];
        const nextItem = {
          id: item.id,
          message: item.message,
          actions: item.actions ?? [],
          mode: item.mode ?? "default",
        } satisfies Omit<ActivePlayerGuidanceItem, "order">;

        if (overlayGuidanceEqual(existing, nextItem)) {
          return;
        }

        const nextOrder = existing ? existing.order : ++this.#guidanceOrder;
        this.#overlayGuidanceById = {
          ...this.#overlayGuidanceById,
          [item.id]: {
            ...nextItem,
            order: nextOrder,
          },
        };
      },
      remove: (id: string) => {
        if (!(id in this.#overlayGuidanceById)) {
          return;
        }

        const { [id]: _removed, ...remaining } = this.#overlayGuidanceById;
        this.#overlayGuidanceById = remaining;
      },
      setSecondLayerCategory: (categoryLabel: string | null) => {
        this.#secondLayerCategoryLabel = categoryLabel;
      },
    };
  }

  initializeLocale(): void {
    const storedRawRegistryFlag = localStorage.getItem(RAW_LOG_REGISTRY_STORAGE_KEY);
    if (storedRawRegistryFlag === "true") {
      this.showRawLogRegistryJson = true;
    } else if (storedRawRegistryFlag === "false") {
      this.showRawLogRegistryJson = false;
    }

    const storedSkipActionConfirmation = localStorage.getItem(SKIP_ACTION_CONFIRMATION_STORAGE_KEY);
    if (storedSkipActionConfirmation === "true") {
      this.skipActionConfirmation = true;
    } else if (storedSkipActionConfirmation === "false") {
      this.skipActionConfirmation = false;
    }

    const storedLocale = localStorage.getItem(PLAYER_LOCALE_STORAGE_KEY);
    if (storedLocale && locales.includes(storedLocale as SupportedLocale)) {
      const nextLocale = storedLocale as SupportedLocale;
      this.selectedLocale = nextLocale;
      if (nextLocale !== getLocale()) {
        setLocale(nextLocale, { reload: false });
        this.#game.handleLocaleChanged();
      }
      return;
    }

    localStorage.setItem(PLAYER_LOCALE_STORAGE_KEY, this.selectedLocale);
  }

  syncScryResolution(): void {
    if (!this.isScryResolutionOpen || !this.activeScryResolution) {
      return;
    }

    const nextActiveEffect =
      this.scryPendingEffectsById.get(this.activeScryResolution.effectId) ?? null;
    if (
      !nextActiveEffect ||
      this.boardSnapshot?.pendingChoice?.requestID !== this.activeScryResolution.effectId
    ) {
      this.activeScryResolution = nextActiveEffect;
      this.isScryResolutionOpen = false;
      return;
    }

    this.activeScryResolution = nextActiveEffect;
  }

  get boardSnapshot(): LorcanaProjectedBoardView | null {
    return this.#game.boardSnapshot();
  }

  get cardSnapshotsById(): CardSnapshotMap {
    return this.#game.cardSnapshotsById();
  }

  get executableMoves(): ExecutableMoveEntry[] {
    return this.#game.executableMoves();
  }

  get resolutionActions(): ResolutionActionView[] {
    return buildResolutionActionViews({
      items: this.pendingEffectsPopoverItems,
      labels: {
        acceptEffect: m["sim.actions.label.acceptEffect"]({}),
        arrangeCards: m["sim.actions.label.arrangeCards"]({}),
        declineEffect: m["sim.actions.label.declineEffect"]({}),
        resolveEffect: m["sim.actions.label.resolveEffect"]({}),
        resolveTriggeredAbility: m["sim.actions.label.resolveTriggeredAbility"]({}),
      },
    });
  }

  get moveLogEntries(): MoveLogEntrySnapshot[] {
    return this.#game.moveLogEntries();
  }

  get ownerSide(): LorcanaPlayerSide | null {
    return this.#game.ownerSide();
  }

  get pregameActiveSide(): LorcanaPlayerSide | null {
    return this.#game.pregameActiveSide();
  }

  get pregamePhase(): PregamePhase | null {
    return this.#game.pregamePhase();
  }

  get canActInPregame(): boolean {
    return this.#game.canActInPregame();
  }

  get statusMessage(): string {
    return this.#game.statusMessage();
  }

  get selectedMulliganCardIds(): string[] {
    return this.#game.selectedMulliganCardIds();
  }

  get pendingErrorReason(): string | null {
    return this.#game.pendingErrorReason();
  }

  get pendingMoveError(): SimulatorMoveError | null {
    return this.#game.pendingMoveError();
  }

  get pendingResolutionMoves(): PendingResolutionMoveEntry[] {
    return this.#game.pendingResolutionMoves();
  }

  get actionSelectionSession(): ActionSelectionSession | null {
    return this.#actionSelectionSession;
  }

  get manualCardActionSession(): ActionSelectionSession | null {
    return this.#actionSelectionSession;
  }

  get selectedActionSessionCard(): LorcanaCardSnapshot | null {
    const selectedCardId =
      this.#actionSelectionSession?.targetCardId ?? this.#actionSelectionSession?.sourceCardId;
    return selectedCardId ? (this.cardSnapshotsById[selectedCardId] ?? null) : null;
  }

  get bottomSide(): LorcanaPlayerSide {
    return this.ownerSide ?? "playerOne";
  }

  get topSide(): LorcanaPlayerSide {
    return this.bottomSide === "playerOne" ? "playerTwo" : "playerOne";
  }

  get hasOwnedView(): boolean {
    return this.ownerSide !== null;
  }

  get activeSide(): LorcanaPlayerSide | null {
    return this.boardSnapshot ? getActiveSide(this.boardSnapshot) : null;
  }

  get headerPlayerData(): LorcanaPlayerSummary | null {
    return this.#game.getPlayerSummary(this.topSide);
  }

  get footerPlayerData(): LorcanaPlayerSummary | null {
    return this.#game.getPlayerSummary(this.bottomSide);
  }

  get pendingResolutionMoveByBagId(): Map<string, PendingResolutionMoveEntry> {
    const entries = this.pendingResolutionMoves
      .filter((move) => move.moveId === "resolveBag")
      .flatMap((move) => {
        const bagId = typeof move.params.bagId === "string" ? move.params.bagId : null;
        return bagId ? [[bagId, move] as const] : [];
      });
    return new Map(entries);
  }

  get pendingResolutionMoveByEffectId(): Map<string, PendingResolutionMoveEntry> {
    const entries = this.pendingResolutionMoves
      .filter((move) => move.moveId === "resolveEffect")
      .flatMap((move) => {
        const effectId = typeof move.params.effectId === "string" ? move.params.effectId : null;
        return effectId ? [[effectId, move] as const] : [];
      });
    return new Map(entries);
  }

  get scryPendingEffectsById(): Map<string, ScryPendingEffectView> {
    if (!this.boardSnapshot) {
      return new Map();
    }

    return new Map(
      this.boardSnapshot.pendingEffects
        .map((pendingEffect) => parseScryPendingEffect(pendingEffect, this.cardSnapshotsById))
        .filter((entry): entry is ScryPendingEffectView => entry !== null)
        .map((entry) => [entry.effectId, entry] as const),
    );
  }

  get pendingEffectsPopoverItems(): PendingEffectsPopoverItem[] {
    if (!this.boardSnapshot) {
      return [];
    }

    const activePendingEffectId = this.boardSnapshot.pendingChoice?.requestID ?? null;
    const bagItems = this.boardSnapshot.bagEffects.map<PendingEffectsPopoverItem>((bagEffect) => {
      const resolveMove = this.pendingResolutionMoveByBagId.get(bagEffect.id);
      const payloadMeta = getBagEffectPayloadMeta(bagEffect.payload);
      const isOptionalSelection = payloadMeta.effectType === "optional";
      const card = bagEffect.sourceId ? (this.cardSnapshotsById[bagEffect.sourceId] ?? null) : null;

      return {
        id: `bag:${bagEffect.id}`,
        kind: "bag",
        title: card?.label ?? "Queued bag effect",
        subtitle: "Triggered ability in bag",
        detail: resolveMove
          ? isOptionalSelection
            ? "Accept or reject this optional triggered ability directly from the bag."
            : "Resolve this queued triggered ability."
          : "Waiting for the current bag resolver before this effect can be chosen.",
        badge: "Bag",
        card,
        canResolve: Boolean(resolveMove) && !isOptionalSelection,
        canAccept: isOptionalSelection && Boolean(resolveMove),
        canReject: isOptionalSelection && Boolean(resolveMove),
        disabledReason: resolveMove ? undefined : "Not actionable from this view right now.",
        onResolve:
          resolveMove && !isOptionalSelection
            ? () => this.handleResolveBag(resolveMove)
            : undefined,
        onAccept:
          isOptionalSelection && resolveMove
            ? () => this.handleAcceptBagEffect(resolveMove)
            : undefined,
        onReject:
          isOptionalSelection && resolveMove
            ? () => this.handleRejectBagEffect(resolveMove)
            : undefined,
      };
    });

    const pendingItems = this.boardSnapshot.pendingEffects.map<PendingEffectsPopoverItem>(
      (pendingEffect) => {
        const payloadMeta = getPendingEffectPayloadMeta(pendingEffect.payload);
        const effectId = pendingEffect.id;
        const resolveMove = this.pendingResolutionMoveByEffectId.get(effectId);
        const scryEffect = this.scryPendingEffectsById.get(effectId) ?? null;
        const cardId =
          pendingEffect.sourceId ?? payloadMeta.sourceCardId ?? payloadMeta.sourceId ?? null;
        const card = cardId ? (this.cardSnapshotsById[cardId] ?? null) : null;
        const isOptionalSelection = payloadMeta.kind === "optional-selection";
        const isScrySelection = payloadMeta.kind === "scry-selection";
        const isActive = activePendingEffectId === effectId;

        return {
          id: `pending:${effectId}`,
          kind: "pending",
          title: card?.label ?? "Pending effect",
          subtitle: getPendingEffectSubtitle(payloadMeta.kind),
          detail: getPendingEffectDetail(payloadMeta.kind),
          badge: "Pending",
          card,
          isActive,
          primaryActionLabel:
            isScrySelection && isActive && resolveMove && scryEffect ? "Arrange cards" : undefined,
          canResolve:
            isActive &&
            !isOptionalSelection &&
            !isScrySelection &&
            payloadMeta.kind !== "target-selection" &&
            payloadMeta.kind !== "choice-selection" &&
            payloadMeta.kind !== "discard-choice" &&
            payloadMeta.kind !== "name-card-selection" &&
            Boolean(resolveMove),
          canAccept: isOptionalSelection && Boolean(resolveMove),
          canReject: isOptionalSelection && Boolean(resolveMove),
          disabledReason:
            isScrySelection && !isActive
              ? "This scry effect is waiting for its turn in the resolution queue."
              : isOptionalSelection || isActive
                ? resolveMove
                  ? undefined
                  : "This pending effect is waiting for the responding player."
                : "This pending effect needs a richer target/choice UI before it can resolve here.",
          onResolve:
            isActive &&
            !isOptionalSelection &&
            !isScrySelection &&
            payloadMeta.kind !== "target-selection" &&
            payloadMeta.kind !== "choice-selection" &&
            payloadMeta.kind !== "discard-choice" &&
            payloadMeta.kind !== "name-card-selection" &&
            resolveMove
              ? () => this.handleResolvePendingEffect(resolveMove)
              : undefined,
          onPrimaryAction:
            isScrySelection && isActive && resolveMove && scryEffect
              ? () => this.openScryResolution(scryEffect)
              : undefined,
          onAccept:
            isOptionalSelection && resolveMove
              ? () => this.handleAcceptPendingEffect(resolveMove)
              : undefined,
          onReject:
            isOptionalSelection && resolveMove
              ? () => this.handleRejectPendingEffect(resolveMove)
              : undefined,
        };
      },
    );

    return [...pendingItems, ...bagItems];
  }

  get baselineGuidance(): ActivePlayerGuidanceItem[] {
    if (!this.boardSnapshot || !this.ownerSide) {
      return [];
    }

    if (!this.pregamePhase) {
      return [];
    }

    if (!this.canActInPregame) {
      return [
        {
          id: "pregame-waiting-turn",
          message: m["sim.actions.empty.waitingTurn"]({}),
          actions: [],
          mode: "pregame",
          order: -1,
        },
      ];
    }

    if (this.pregamePhase === "chooseFirstPlayer") {
      return [
        {
          id: "pregame-choose-first-player",
          message: m["sim.guidance.pregame.chooseFirst"]({}),
          actions: [
            {
              id: "choose-first-player-one",
              label: m["sim.pregame.chooseFirst.button.playerOne"]({}),
              onClick: () => {
                this.executeChooseFirstPlayer("playerOne");
              },
            },
            {
              id: "choose-first-player-two",
              label: m["sim.pregame.chooseFirst.button.playerTwo"]({}),
              onClick: () => {
                this.executeChooseFirstPlayer("playerTwo");
              },
            },
          ],
          mode: "pregame",
          order: -1,
        },
      ];
    }

    return [
      {
        id: "pregame-mulligan",
        message: m["sim.guidance.pregame.mulligan"]({}),
        actions: [
          {
            id: "mulligan-keep-hand",
            label:
              this.pendingMulliganDangerConfirm === "keepHand"
                ? m["sim.guidance.action.areYouSure"]({})
                : m["sim.pregame.mulligan.button.keepHand"]({}),
            onClick: this.handleKeepHand,
          },
          {
            id: "mulligan-all-cards",
            label:
              this.pendingMulliganDangerConfirm === "allCards"
                ? m["sim.guidance.action.areYouSure"]({})
                : m["sim.pregame.mulligan.button.allCards"]({}),
            onClick: this.handleMulliganAllCards,
          },
          {
            id: "mulligan-confirm",
            label: m["sim.pregame.mulligan.button.confirmCount"]({
              count: this.selectedMulliganCardIds.length,
            }),
            onClick: this.handleConfirmMulligan,
            disabled: this.selectedMulliganCardIds.length === 0,
            emphasis: true,
          },
        ],
        mode: "pregame",
        order: -1,
      },
    ];
  }

  get selectedActionSessionCardIds(): string[] {
    return this.#actionSelectionSession
      ? getUniqueOrderedIds([
          this.#actionSelectionSession.sourceCardId,
          this.#actionSelectionSession.targetCardId,
        ])
      : [];
  }

  get selectableActionSessionCardIds(): string[] {
    const session = this.#actionSelectionSession;
    if (!session) {
      return [];
    }

    if (session.phase === "choose-source") {
      return getUniqueOrderedIds(
        session.candidateMoves.map((move) =>
          getSourceCardIdForActionSelectionMove(session.categoryId, move),
        ),
      );
    }

    if (session.phase === "choose-target" && session.sourceCardId) {
      return getUniqueOrderedIds(
        session.candidateMoves
          .filter(
            (move) =>
              getSourceCardIdForActionSelectionMove(session.categoryId, move) ===
              session.sourceCardId,
          )
          .map((move) => getTargetCardIdForActionSelectionMove(session.categoryId, move)),
      );
    }

    return [];
  }

  get invalidActionSessionCardIds(): string[] {
    const session = this.#actionSelectionSession;
    if (
      !session ||
      session.categoryId !== "challenge" ||
      session.phase !== "choose-target" ||
      !this.boardSnapshot ||
      !this.ownerSide
    ) {
      return [];
    }

    const opponentSide = this.ownerSide === "playerOne" ? "playerTwo" : "playerOne";
    const validTargetIds = new Set(this.selectableActionSessionCardIds);

    return getCardsForZone(this.cardSnapshotsById, this.boardSnapshot, opponentSide, "play")
      .map((card) => card.cardId)
      .filter((cardId) => !validTargetIds.has(cardId));
  }

  get currentActionSelectionMove(): ExecutableMoveEntry | null {
    const selectedMoveId = this.#actionSelectionSession?.selectedMoveId;
    if (!selectedMoveId) {
      return null;
    }

    return (
      this.#actionSelectionSession?.candidateMoves.find((move) => move.id === selectedMoveId) ??
      null
    );
  }

  getActionSessionCardState(cardId: string): {
    isSelected: boolean;
    isSelectable: boolean;
    isInvalidTarget: boolean;
    isConfirmPending: boolean;
  } {
    const session = this.#actionSelectionSession;
    const isSelected = this.selectedActionSessionCardIds.includes(cardId);
    const isSelectable = this.selectableActionSessionCardIds.includes(cardId);
    const isInvalidTarget = this.invalidActionSessionCardIds.includes(cardId);
    const isConfirmPending = session !== null && session.phase === "confirm" && isSelected;

    return {
      isSelected,
      isSelectable,
      isInvalidTarget,
      isConfirmPending,
    };
  }

  getChallengePreviewCardState(cardId: string): {
    wouldBeBanished: boolean;
  } {
    const session = this.#actionSelectionSession;
    if (
      !session ||
      session.categoryId !== "challenge" ||
      !session.sourceCardId ||
      !session.targetCardId
    ) {
      return { wouldBeBanished: false };
    }

    const preview = this.#game.previewChallenge(session.sourceCardId, session.targetCardId);
    if (!preview) {
      return { wouldBeBanished: false };
    }

    return {
      wouldBeBanished:
        (preview.attackerId === cardId && preview.attackerWouldBeBanished) ||
        (preview.defenderId === cardId && preview.defenderWouldBeBanished),
    };
  }

  getActionSessionCardReason(cardId: string): string | null {
    return this.#game.invalidChallengeTargetReasons()[cardId] ?? null;
  }

  getCardActionViews = (card: LorcanaCardSnapshot): CardActionView[] =>
    buildCardActionViews({
      card,
      executableMoves: this.executableMoves,
      ownerSide: this.ownerSide,
      challengeReadyCardIds: this.#game.challengeReadyCardIds(),
    });

  handleCardAbilityByIndex = (cardId: string, abilityIndex: number): boolean => {
    const card = this.cardSnapshotsById[cardId];
    if (!card) {
      return false;
    }

    const action = this.getCardActionViews(card).find(
      (candidateAction) => candidateAction.categoryId === "activate-ability",
    );
    if (!action) {
      return false;
    }

    const matchingMove = action.moves.find((move) => getMoveAbilityIndex(move) === abilityIndex);
    if (!matchingMove) {
      return false;
    }

    return this.handleCardActionClick(action);
  };

  handleCardActionClick = (action: CardActionView): boolean => {
    if (!action.enabled || action.moves.length === 0) {
      return false;
    }

    if (action.categoryId === "challenge") {
      const session = buildActionSelectionSession(
        action.categoryId,
        action.moves,
        !this.skipActionConfirmation,
      );
      if (!session) {
        return false;
      }

      this.#setActionSelectionSession({
        ...session,
        sourceCardId: action.cardId,
        phase: "choose-target",
      });
      this.pendingMulliganDangerConfirm = null;
      this.#secondLayerCategoryLabel = null;
      this.#game.setPendingError(null);
      this.#game.setStatusMessage(
        m["sim.guidance.session.chooseChallengeTarget"]({
          cardLabel: this.cardSnapshotsById[action.cardId]?.label ?? m["sim.card.unknown"]({}),
        }),
      );
      return true;
    }

    if (action.categoryId === "move-to-location" && action.moves.length > 1) {
      const session = buildActionSelectionSession(
        action.categoryId,
        action.moves,
        !this.skipActionConfirmation,
      );
      if (!session) {
        return false;
      }

      this.#setActionSelectionSession({
        ...session,
        sourceCardId: action.cardId,
        phase: "choose-target",
      });
      this.pendingMulliganDangerConfirm = null;
      this.#secondLayerCategoryLabel = null;
      this.#game.setPendingError(null);
      this.#game.setStatusMessage(
        m["sim.guidance.session.chooseMoveTarget"]({
          cardLabel: this.cardSnapshotsById[action.cardId]?.label ?? m["sim.card.unknown"]({}),
        }),
      );
      return true;
    }

    if (action.categoryId === "activate-ability") {
      const session = buildActionSelectionSession(
        action.categoryId,
        action.moves,
        !this.skipActionConfirmation,
      );
      if (!session) {
        return false;
      }

      const sourceMoves = getSourceMovesForActionSelectionSession(session, action.cardId);
      const singleMove = sourceMoves.length === 1 ? sourceMoves[0] : null;
      this.#setActionSelectionSession({
        ...session,
        sourceCardId: action.cardId,
        selectedMoveId: singleMove?.id ?? null,
        phase: singleMove
          ? session.confirmationRequired
            ? "confirm"
            : "executing"
          : "choose-option",
      });
      this.pendingMulliganDangerConfirm = null;
      this.#secondLayerCategoryLabel = null;
      this.#game.setPendingError(null);

      if (singleMove) {
        if (session.confirmationRequired) {
          this.#game.setStatusMessage(
            m["sim.guidance.session.confirm"]({ label: singleMove.label }),
          );
          return true;
        }

        return this.#executeActionSelectionMove(
          {
            ...session,
            sourceCardId: action.cardId,
            selectedMoveId: singleMove.id,
            phase: "executing",
          },
          singleMove,
        );
      }

      this.#game.setStatusMessage(
        getChooseOptionStatusMessage(
          session,
          this.cardSnapshotsById[action.cardId]?.label ?? m["sim.card.unknown"]({}),
        ),
      );
      return true;
    }

    if (action.categoryId === "play-card" && action.moves.length > 1) {
      const session = buildActionSelectionSession(
        action.categoryId,
        action.moves,
        !this.skipActionConfirmation,
      );
      if (!session) {
        return false;
      }

      this.#setActionSelectionSession({
        ...session,
        sourceCardId: action.cardId,
        phase: "choose-option",
      });
      this.pendingMulliganDangerConfirm = null;
      this.#secondLayerCategoryLabel = null;
      this.#game.setPendingError(null);
      this.#game.setStatusMessage(
        m["sim.guidance.session.choosePlayOption"]({
          cardLabel: this.cardSnapshotsById[action.cardId]?.label ?? m["sim.card.unknown"]({}),
        }),
      );
      return true;
    }

    this.handleAvailableMoveClick(action.moves[0]);
    return true;
  };

  #setActionSelectionSession(nextSession: ActionSelectionSession | null): void {
    this.#actionSelectionSession = nextSession;
    this.#game.setSelectedCardId(nextSession?.targetCardId ?? nextSession?.sourceCardId ?? null);
    this.#game.setChallengeSourceCardId(null);
  }

  #clearActionSelectionSession(statusMessage?: string): void {
    this.#setActionSelectionSession(null);
    this.#game.setPendingError(null);
    if (statusMessage) {
      this.#game.setStatusMessage(statusMessage);
    }
  }

  #executeActionSelectionMove(session: ActionSelectionSession, move: ExecutableMoveEntry): boolean {
    this.#setActionSelectionSession({
      ...session,
      phase: "executing",
      selectedMoveId: move.id,
    });

    const success = this.#game.executeMove(move.moveId, move.params ?? {}, {
      clearChallengeMode: true,
      clearSelection: true,
      status: move.label,
    });

    if (success) {
      this.#setActionSelectionSession(null);
      return true;
    }

    this.#setActionSelectionSession(session);
    return false;
  }

  get actionSelectionGuidance(): ActivePlayerGuidanceItem[] {
    const session = this.#actionSelectionSession;
    if (!session) {
      return [];
    }

    const sourceCard = session.sourceCardId
      ? (this.cardSnapshotsById[session.sourceCardId] ?? null)
      : null;
    const confirmMessage = session.confirmationRequired
      ? m["sim.guidance.session.confirmWithHint"]({ label: session.label })
      : m["sim.guidance.session.confirm"]({ label: session.label });
    const targetCard = session.targetCardId
      ? (this.cardSnapshotsById[session.targetCardId] ?? null)
      : null;

    if (
      session.phase === "choose-option" &&
      session.categoryId === "activate-ability" &&
      sourceCard
    ) {
      const candidateActions = getSourceMovesForActionSelectionSession(
        session,
        sourceCard.cardId,
      ).map(
        (move) =>
          ({
            id: `action-selection-option:${move.id}`,
            label:
              move.presentation.kind === "targeted" ? move.presentation.optionLabel : move.label,
            onClick: () => {
              this.selectActionSelectionOption(move.id);
            },
          }) satisfies GuidanceAction,
      );

      return [
        {
          id: "action-selection-ability",
          message: getChooseOptionStatusMessage(session, sourceCard.label),
          actions: [
            {
              id: "action-selection-ability-back",
              label: m["sim.actions.back"]({}),
              onClick: this.backActionSelectionSession,
            },
            ...candidateActions,
            {
              id: "action-selection-ability-cancel",
              label: m["sim.actions.cancel"]({}),
              onClick: this.cancelActionSelectionSession,
            },
          ],
          mode: "default",
          order: 2,
        },
      ];
    }

    if (session.phase === "choose-option" && session.categoryId === "play-card" && sourceCard) {
      const candidateActions = session.candidateMoves
        .filter(
          (move) =>
            getSourceCardIdForActionSelectionMove(session.categoryId, move) === sourceCard.cardId,
        )
        .map(
          (move) =>
            ({
              id: `action-selection-option:${move.id}`,
              label:
                move.presentation.kind === "targeted" ? move.presentation.optionLabel : move.label,
              onClick: () => {
                this.selectActionSelectionOption(move.id);
              },
            }) satisfies GuidanceAction,
        );

      return [
        {
          id: "action-selection-option",
          message: m["sim.guidance.session.choosePlayOption"]({
            cardLabel: sourceCard.label,
          }),
          actions: [
            {
              id: "action-selection-option-back",
              label: m["sim.actions.back"]({}),
              onClick: this.backActionSelectionSession,
            },
            ...candidateActions,
            {
              id: "action-selection-option-cancel",
              label: m["sim.actions.cancel"]({}),
              onClick: this.cancelActionSelectionSession,
            },
          ],
          mode: "default",
          order: 2,
        },
      ];
    }

    if (session.phase === "confirm") {
      const challengeConfirmMessage =
        session.categoryId === "challenge" && sourceCard && targetCard
          ? `${confirmMessage}\n${m["sim.actions.challengeVs"]({
              attacker: sourceCard.label,
              defender: targetCard.label,
            })}`
          : confirmMessage;

      return [
        {
          id: "action-selection-confirm",
          message: challengeConfirmMessage,
          actions: [
            {
              id: "action-selection-confirm-back",
              label: m["sim.actions.back"]({}),
              onClick: this.backActionSelectionSession,
            },
            {
              id: "action-selection-confirm-cancel",
              label: m["sim.actions.cancel"]({}),
              onClick: this.cancelActionSelectionSession,
            },
            {
              id: "action-selection-confirm-submit",
              label: m["sim.actions.confirmMoveLabel"]({ label: session.label }),
              onClick: this.confirmActionSelection,
              emphasis: true,
            },
          ],
          mode: session.categoryId === "challenge" ? "challenge" : "default",
          order: 2,
        },
      ];
    }

    const message =
      session.phase === "choose-source"
        ? getChooseSourceStatusMessage(session.categoryId)
        : session.categoryId === "challenge"
          ? m["sim.guidance.session.chooseChallengeTarget"]({
              cardLabel: sourceCard?.label ?? m["sim.card.unknown"]({}),
            })
          : m["sim.guidance.session.chooseMoveTarget"]({
              cardLabel: sourceCard?.label ?? m["sim.card.unknown"]({}),
            });

    return [
      {
        id: "action-selection",
        message,
        actions: [
          ...(session.phase === "choose-target"
            ? [
                {
                  id: "action-selection-back",
                  label: m["sim.actions.back"]({}),
                  onClick: this.backActionSelectionSession,
                } satisfies GuidanceAction,
              ]
            : []),
          {
            id: "action-selection-cancel",
            label: m["sim.actions.cancel"]({}),
            onClick: this.cancelActionSelectionSession,
          },
        ],
        mode: session.categoryId === "challenge" ? "challenge" : "default",
        order: 2,
      },
    ];
  }

  get activePlayerGuidance(): ActivePlayerGuidanceItem[] {
    const secondLayerGuidance =
      this.#secondLayerCategoryLabel &&
      this.ownerSide &&
      (!this.activeSide || this.activeSide === this.ownerSide)
        ? [
            {
              id: SECOND_LAYER_GUIDANCE_ID,
              message: m["sim.guidance.secondLayer.chooseCategoryAction"]({
                category: this.#secondLayerCategoryLabel,
              }),
              actions: [],
              mode: "default" as const,
              order: 0,
            },
          ]
        : [];

    return [
      ...this.baselineGuidance,
      ...this.actionSelectionGuidance,
      ...secondLayerGuidance,
      ...Object.values(this.#overlayGuidanceById),
    ].sort((left, right) => right.order - left.order);
  }

  handleResolveBag = (move: PendingResolutionMoveEntry): void => {
    this.#game.executeMove(move.moveId, move.params, {
      clearChallengeMode: false,
      clearSelection: false,
      status: "Resolved bag effect",
    });
  };

  handleResolvePendingEffect = (move: PendingResolutionMoveEntry): void => {
    if (move.moveId !== "resolveEffect") {
      return;
    }

    this.#game.executeMove(move.moveId, move.params, {
      clearChallengeMode: false,
      clearSelection: false,
      status: "Resolved pending effect",
    });
  };

  handleAcceptPendingEffect = (move: PendingResolutionMoveEntry): void => {
    if (move.moveId !== "resolveEffect") {
      return;
    }
    this.#game.executeMove(
      move.moveId,
      mergeNestedResolveEffectParams(move.params, {
        resolveOptional: true,
      }) as LorcanaSimulatorMoveParams["resolveEffect"],
      {
        clearChallengeMode: false,
        clearSelection: false,
        status: "Accepted pending effect",
      },
    );
  };

  handleAcceptBagEffect = (move: PendingResolutionMoveEntry): void => {
    if (move.moveId !== "resolveBag") {
      return;
    }

    this.#game.executeMove(
      move.moveId,
      mergeNestedResolveBagParams(move.params, {
        resolveOptional: true,
      }) as LorcanaSimulatorMoveParams["resolveBag"],
      {
        clearChallengeMode: false,
        clearSelection: false,
        status: "Accepted bag effect",
      },
    );
  };

  handleRejectBagEffect = (move: PendingResolutionMoveEntry): void => {
    if (move.moveId !== "resolveBag") {
      return;
    }

    this.#game.executeMove(
      move.moveId,
      mergeNestedResolveBagParams(move.params, {
        resolveOptional: false,
      }) as LorcanaSimulatorMoveParams["resolveBag"],
      {
        clearChallengeMode: false,
        clearSelection: false,
        status: "Rejected bag effect",
      },
    );
  };

  handleRejectPendingEffect = (move: PendingResolutionMoveEntry): void => {
    if (move.moveId !== "resolveEffect") {
      return;
    }
    this.#game.executeMove(
      move.moveId,
      mergeNestedResolveEffectParams(move.params, {
        resolveOptional: false,
      }) as LorcanaSimulatorMoveParams["resolveEffect"],
      {
        clearChallengeMode: false,
        clearSelection: false,
        status: "Rejected pending effect",
      },
    );
  };

  openScryResolution = (effect: ScryPendingEffectView): void => {
    this.activeScryResolution = effect;
    this.isScryResolutionOpen = true;
  };

  closeScryResolution = (): void => {
    this.isScryResolutionOpen = false;
  };

  handleConfirmScryResolution = (destinations: Array<{ zone: string; cards: string[] }>): void => {
    if (!this.activeScryResolution) {
      return;
    }

    const move = this.pendingResolutionMoveByEffectId.get(this.activeScryResolution.effectId);
    if (!move) {
      return;
    }
    if (move.moveId !== "resolveEffect") {
      return;
    }

    this.#game.executeMove(
      move.moveId,
      mergeNestedResolveEffectParams(move.params, {
        destinations,
      }) as LorcanaSimulatorMoveParams["resolveEffect"],
      {
        clearChallengeMode: false,
        clearSelection: false,
        status: "Resolved scry effect",
      },
    );
    this.isScryResolutionOpen = false;
  };

  armMulliganDangerConfirm(action: "keepHand" | "allCards"): boolean {
    if (this.pendingMulliganDangerConfirm !== action) {
      this.pendingMulliganDangerConfirm = action;
      return false;
    }

    this.pendingMulliganDangerConfirm = null;
    return true;
  }

  executeChooseFirstPlayer = (side: LorcanaPlayerSide): boolean => {
    if (this.pregamePhase !== "chooseFirstPlayer") {
      return false;
    }

    if (!this.canActInPregame) {
      this.#game.setPendingError(m["sim.errors.pregame.notYourTurnChooseFirst"]({}));
      this.#game.setStatusMessage(m["sim.status.actionRejected"]({}));
      return false;
    }

    const targetPlayerId = this.#game.getOwnerIdForSide(side);
    if (!targetPlayerId) {
      this.#game.setPendingError(m["sim.errors.pregame.unresolvedFirstPlayer"]({}));
      this.#game.setStatusMessage(m["sim.status.actionRejected"]({}));
      return false;
    }

    return this.#game.executeMove(
      "chooseWhoGoesFirst",
      { playerId: targetPlayerId, side },
      {
        clearSelection: true,
        status: m["sim.status.firstPlayerWillStart"]({ playerLabel: getPlayerLabel(side) }),
      },
    );
  };

  handleConfirmMulligan = (): void => {
    if (this.pregamePhase !== "mulligan") {
      return;
    }

    if (!this.canActInPregame) {
      this.#game.setPendingError(m["sim.errors.pregame.notYourTurnMulligan"]({}));
      this.#game.setStatusMessage(m["sim.status.actionRejected"]({}));
      return;
    }

    const playerId = this.ownerSide ? this.#game.getOwnerIdForSide(this.ownerSide) : null;
    if (!playerId) {
      this.#game.setPendingError(m["sim.errors.pregame.notYourTurnMulligan"]({}));
      this.#game.setStatusMessage(m["sim.status.actionRejected"]({}));
      return;
    }

    const cardsToMulligan = [...this.selectedMulliganCardIds];
    const success = this.#game.executeMove(
      "alterHand",
      { playerId, cardsToMulligan },
      {
        clearSelection: true,
        status: m["sim.status.mulliganSubmitted"]({ count: cardsToMulligan.length }),
      },
    );

    if (success) {
      this.pendingMulliganDangerConfirm = null;
      this.#game.setSelectedMulliganCardIds([]);
    }
  };

  handleKeepHand = (): void => {
    if (this.pregamePhase !== "mulligan") {
      return;
    }
    if (!this.canActInPregame) {
      this.#game.setPendingError(m["sim.errors.pregame.notYourTurnMulligan"]({}));
      this.#game.setStatusMessage(m["sim.status.actionRejected"]({}));
      return;
    }
    if (!this.armMulliganDangerConfirm("keepHand")) {
      return;
    }

    const playerId = this.ownerSide ? this.#game.getOwnerIdForSide(this.ownerSide) : null;
    if (!playerId) {
      this.#game.setPendingError(m["sim.errors.pregame.notYourTurnMulligan"]({}));
      this.#game.setStatusMessage(m["sim.status.actionRejected"]({}));
      return;
    }

    const success = this.#game.executeMove(
      "alterHand",
      { playerId, cardsToMulligan: [] },
      {
        clearSelection: true,
        status: m["sim.status.keepHand"]({}),
      },
    );

    if (success) {
      this.pendingMulliganDangerConfirm = null;
      this.#game.setSelectedMulliganCardIds([]);
    }
  };

  handleMulliganAllCards = (): void => {
    if (this.pregamePhase !== "mulligan") {
      return;
    }
    if (!this.canActInPregame) {
      this.#game.setPendingError(m["sim.errors.pregame.notYourTurnMulligan"]({}));
      this.#game.setStatusMessage(m["sim.status.actionRejected"]({}));
      return;
    }
    if (!this.boardSnapshot || !this.ownerSide) {
      return;
    }
    if (!this.armMulliganDangerConfirm("allCards")) {
      return;
    }

    const cardsToMulligan = getCardsForZone(
      this.cardSnapshotsById,
      this.boardSnapshot,
      this.ownerSide,
      "hand",
    ).map((card) => card.cardId);
    const playerId = this.#game.getOwnerIdForSide(this.ownerSide);
    if (!playerId) {
      this.#game.setPendingError(m["sim.errors.pregame.notYourTurnMulligan"]({}));
      this.#game.setStatusMessage(m["sim.status.actionRejected"]({}));
      return;
    }
    const success = this.#game.executeMove(
      "alterHand",
      { playerId, cardsToMulligan },
      {
        clearSelection: true,
        status: m["sim.status.mulliganSubmitted"]({ count: cardsToMulligan.length }),
      },
    );

    if (success) {
      this.pendingMulliganDangerConfirm = null;
      this.#game.setSelectedMulliganCardIds([]);
    }
  };

  startActionSelectionSession = (
    categoryId: ExecutableMovePresentationCategoryId,
    moves: readonly ExecutableMoveEntry[],
  ): boolean => {
    if (!isActionSelectionCategoryId(categoryId)) {
      return false;
    }

    const session = buildActionSelectionSession(categoryId, moves, !this.skipActionConfirmation);
    if (!session) {
      return false;
    }

    this.#setActionSelectionSession(session);
    this.pendingMulliganDangerConfirm = null;
    this.#secondLayerCategoryLabel = null;
    this.#game.setPendingError(null);
    this.#game.setStatusMessage(getChooseSourceStatusMessage(categoryId));
    return true;
  };

  startManualCardActionSelection = (
    categoryId: ExecutableMovePresentationCategoryId,
    moves: readonly ExecutableMoveEntry[],
  ): boolean => this.startActionSelectionSession(categoryId, moves);

  cancelActionSelectionSession = (): void => {
    if (!this.#actionSelectionSession) {
      return;
    }

    this.#clearActionSelectionSession(m["sim.status.selectionCleared"]({}));
  };

  cancelManualCardActionSelection = (): void => {
    this.cancelActionSelectionSession();
  };

  isCardSelectableForActionSession = (card: LorcanaCardSnapshot | null | undefined): boolean => {
    if (!card) {
      return false;
    }

    return this.selectableActionSessionCardIds.includes(card.cardId);
  };

  isCardSelectableForManualAction = (card: LorcanaCardSnapshot | null | undefined): boolean =>
    this.isCardSelectableForActionSession(card);

  handleActionSessionCardSelection = (card: LorcanaCardSnapshot | null | undefined): boolean => {
    const session = this.#actionSelectionSession;
    if (!card || !session) {
      return false;
    }

    if (session.phase === "choose-source") {
      const sourceMoves = getSourceMovesForActionSelectionSession(session, card.cardId);
      if (sourceMoves.length === 0) {
        return false;
      }

      if (session.categoryId === "challenge" || session.categoryId === "move-to-location") {
        this.#setActionSelectionSession({
          ...session,
          sourceCardId: card.cardId,
          targetCardId: null,
          selectedMoveId: null,
          phase: "choose-target",
        });
        this.#game.setPendingError(null);
        this.#game.setStatusMessage(
          session.categoryId === "challenge"
            ? m["sim.guidance.session.chooseChallengeTarget"]({ cardLabel: card.label })
            : m["sim.guidance.session.chooseMoveTarget"]({ cardLabel: card.label }),
        );
        return true;
      }

      if (session.categoryId === "activate-ability") {
        const move = sourceMoves[0];
        const nextSession = {
          ...session,
          label: move?.label ?? session.label,
          sourceCardId: card.cardId,
          targetCardId: null,
          selectedMoveId: sourceMoves.length === 1 ? (move?.id ?? null) : null,
          phase:
            sourceMoves.length === 1
              ? session.confirmationRequired
                ? "confirm"
                : "executing"
              : "choose-option",
        } satisfies ActionSelectionSession;

        this.#game.setPendingError(null);
        if (sourceMoves.length > 1) {
          this.#setActionSelectionSession(nextSession);
          this.#game.setStatusMessage(getChooseOptionStatusMessage(session, card.label));
          return true;
        }

        if (!move) {
          return false;
        }

        if (session.confirmationRequired) {
          this.#setActionSelectionSession(nextSession);
          this.#game.setStatusMessage(m["sim.guidance.session.confirm"]({ label: move.label }));
          return true;
        }

        return this.#executeActionSelectionMove(nextSession, move);
      }

      if (session.categoryId === "play-card" && sourceMoves.length > 1) {
        this.#setActionSelectionSession({
          ...session,
          sourceCardId: card.cardId,
          targetCardId: null,
          selectedMoveId: null,
          phase: "choose-option",
        });
        this.#game.setPendingError(null);
        this.#game.setStatusMessage(
          m["sim.guidance.session.choosePlayOption"]({ cardLabel: card.label }),
        );
        return true;
      }

      const move = sourceMoves[0];
      const nextSession = {
        ...session,
        sourceCardId: card.cardId,
        targetCardId: null,
        selectedMoveId: move.id,
        phase: session.confirmationRequired ? "confirm" : "executing",
      } satisfies ActionSelectionSession;

      this.#game.setPendingError(null);
      if (session.confirmationRequired) {
        this.#setActionSelectionSession(nextSession);
        this.#game.setStatusMessage(m["sim.guidance.session.confirm"]({ label: move.label }));
        return true;
      }

      return this.#executeActionSelectionMove(nextSession, move);
    }

    if (session.phase === "choose-target" && session.sourceCardId) {
      const move = session.candidateMoves.find(
        (candidateMove) =>
          getSourceCardIdForActionSelectionMove(session.categoryId, candidateMove) ===
            session.sourceCardId &&
          getTargetCardIdForActionSelectionMove(session.categoryId, candidateMove) === card.cardId,
      );

      if (!move) {
        this.#game.setPendingError(
          this.getActionSessionCardReason(card.cardId) ??
            m["sim.errors.challenge.invalidTarget"]({}),
        );
        return false;
      }

      const nextSession = {
        ...session,
        targetCardId: card.cardId,
        selectedMoveId: move.id,
        phase: session.confirmationRequired ? "confirm" : "executing",
      } satisfies ActionSelectionSession;

      this.#game.setPendingError(null);
      if (session.confirmationRequired) {
        this.#setActionSelectionSession(nextSession);
        this.#game.setStatusMessage(m["sim.guidance.session.confirm"]({ label: move.label }));
        return true;
      }

      return this.#executeActionSelectionMove(nextSession, move);
    }

    return false;
  };

  handleManualCardActionSelection = (card: LorcanaCardSnapshot | null | undefined): boolean =>
    this.handleActionSessionCardSelection(card);

  selectActionSelectionOption = (moveId: string): boolean => {
    const session = this.#actionSelectionSession;
    if (!session || session.phase !== "choose-option") {
      return false;
    }

    const move = session.candidateMoves.find((candidateMove) => candidateMove.id === moveId);
    if (!move) {
      return false;
    }

    const nextSession = {
      ...session,
      label: session.categoryId === "activate-ability" ? move.label : session.label,
      selectedMoveId: move.id,
      phase: session.confirmationRequired ? "confirm" : "executing",
    } satisfies ActionSelectionSession;

    this.#game.setPendingError(null);
    if (session.confirmationRequired) {
      this.#setActionSelectionSession(nextSession);
      this.#game.setStatusMessage(m["sim.guidance.session.confirm"]({ label: move.label }));
      return true;
    }

    return this.#executeActionSelectionMove(nextSession, move);
  };

  backActionSelectionSession = (): void => {
    const session = this.#actionSelectionSession;
    if (!session) {
      return;
    }

    if (session.phase === "choose-target") {
      this.#setActionSelectionSession({
        ...session,
        phase: "choose-source",
        sourceCardId: null,
        targetCardId: null,
        selectedMoveId: null,
      });
      this.#game.setStatusMessage(
        session.categoryId === "challenge"
          ? m["sim.guidance.session.chooseChallengeSource"]({})
          : m["sim.guidance.session.chooseMoveSource"]({}),
      );
      return;
    }

    if (session.phase === "choose-option") {
      if (session.categoryId === "activate-ability") {
        this.#setActionSelectionSession({
          ...session,
          phase: "choose-source",
          sourceCardId: null,
          selectedMoveId: null,
        });
        this.#game.setStatusMessage(getChooseSourceStatusMessage(session.categoryId));
        return;
      }

      this.#setActionSelectionSession({
        ...session,
        phase: "choose-source",
        sourceCardId: null,
        targetCardId: null,
        selectedMoveId: null,
      });
      this.#game.setStatusMessage(m["sim.guidance.session.choosePlaySource"]({}));
      return;
    }

    if (session.phase === "confirm") {
      if (session.categoryId === "challenge" || session.categoryId === "move-to-location") {
        this.#setActionSelectionSession({
          ...session,
          phase: "choose-target",
          targetCardId: null,
          selectedMoveId: null,
        });
        this.#game.setStatusMessage(
          session.categoryId === "challenge"
            ? m["sim.guidance.session.chooseChallengeTarget"]({
                cardLabel:
                  this.cardSnapshotsById[session.sourceCardId ?? ""]?.label ??
                  m["sim.card.unknown"]({}),
              })
            : m["sim.guidance.session.chooseMoveTarget"]({
                cardLabel:
                  this.cardSnapshotsById[session.sourceCardId ?? ""]?.label ??
                  m["sim.card.unknown"]({}),
              }),
        );
        return;
      }

      if (
        session.categoryId === "play-card" &&
        session.sourceCardId &&
        session.candidateMoves.filter(
          (move) =>
            getSourceCardIdForActionSelectionMove(session.categoryId, move) ===
            session.sourceCardId,
        ).length > 1
      ) {
        this.#setActionSelectionSession({
          ...session,
          phase: "choose-option",
          selectedMoveId: null,
        });
        this.#game.setStatusMessage(
          m["sim.guidance.session.choosePlayOption"]({
            cardLabel:
              this.cardSnapshotsById[session.sourceCardId]?.label ?? m["sim.card.unknown"]({}),
          }),
        );
        return;
      }

      if (session.categoryId === "activate-ability") {
        const sourceCardLabel =
          this.cardSnapshotsById[session.sourceCardId ?? ""]?.label ?? m["sim.card.unknown"]({});
        this.#setActionSelectionSession({
          ...session,
          phase: "choose-option",
          selectedMoveId: null,
        });
        this.#game.setStatusMessage(getChooseOptionStatusMessage(session, sourceCardLabel));
        return;
      }

      this.#setActionSelectionSession({
        ...session,
        phase: "choose-source",
        sourceCardId: null,
        targetCardId: null,
        selectedMoveId: null,
      });
      this.#game.setStatusMessage(getChooseSourceStatusMessage(session.categoryId));
    }
  };

  confirmActionSelection = (): boolean => {
    const session = this.#actionSelectionSession;
    const move = this.currentActionSelectionMove;
    if (!session || !move) {
      return false;
    }

    return this.#executeActionSelectionMove(session, move);
  };

  confirmManualCardActionSelection = (): boolean => this.confirmActionSelection();

  handleAvailableMoveClick = (move: ExecutableMoveEntry): void => {
    this.#setActionSelectionSession(null);
    this.#game.executeMove(move.moveId, move.params ?? {}, {
      clearChallengeMode: true,
      clearSelection: true,
      status: move.label,
    });
  };

  handleOpenPlayerSettings = (): void => {
    this.isPlayerSettingsOpen = true;
    this.#game.setPendingError(null);
  };

  formatRawMoveError(error: SimulatorMoveError): string {
    return JSON.stringify(
      {
        code: error.code ?? null,
        moveId: error.moveId,
        params: error.params ?? {},
        reason: error.rawReason ?? null,
      },
      null,
      2,
    );
  }

  handleLocaleSelection = (nextLocale: SupportedLocale): void => {
    if (!locales.includes(nextLocale)) {
      return;
    }
    if (nextLocale === this.selectedLocale) {
      return;
    }

    this.selectedLocale = nextLocale;
    setLocale(nextLocale, { reload: false });
    localStorage.setItem(PLAYER_LOCALE_STORAGE_KEY, nextLocale);
    this.#game.setStatusMessage(
      m["sim.status.languageChanged"]({ localeLabel: getLocaleLabel(nextLocale) }),
    );
    this.#game.handleLocaleChanged();
  };

  handleRawLogRegistryToggle = (enabled: boolean): void => {
    this.showRawLogRegistryJson = enabled;
    localStorage.setItem(RAW_LOG_REGISTRY_STORAGE_KEY, enabled ? "true" : "false");
  };

  handleSkipActionConfirmationToggle = (enabled: boolean): void => {
    this.skipActionConfirmation = enabled;
    localStorage.setItem(SKIP_ACTION_CONFIRMATION_STORAGE_KEY, enabled ? "true" : "false");
    this.#game.setStatusMessage(
      enabled
        ? m["sim.settings.skipActionConfirmationEnabled"]({})
        : m["sim.settings.skipActionConfirmationDisabled"]({}),
    );
  };

  handleLogCardHover = (card: LorcanaCardSnapshot): void => {
    this.hoveredLogCard = card;
  };

  handleLogCardLeave = (): void => {
    this.hoveredLogCard = null;
  };
}

export function setLorcanaGameContext(value: SetLorcanaGameContextOptions): LorcanaGameContext {
  const context = new LorcanaGameContext(value.engine, value.readModel, value.playerSettings);
  onDestroy(() => {
    context.destroy();
  });
  setContext(LORCANA_GAME_CONTEXT_KEY, context);
  return context;
}

export function useLorcanaGameContext(): LorcanaGameContextValue {
  if (!hasContext(LORCANA_GAME_CONTEXT_KEY)) {
    throw new Error("Lorcana game context not found");
  }

  return getContext<LorcanaGameContextValue>(LORCANA_GAME_CONTEXT_KEY);
}

export function useLorcanaSidebarPresenter(): LorcanaSidebarPresenter {
  if (hasContext(LORCANA_SIDEBAR_PRESENTER_CONTEXT_KEY)) {
    return getContext<LorcanaSidebarPresenter>(LORCANA_SIDEBAR_PRESENTER_CONTEXT_KEY);
  }

  const presenter = new LorcanaSidebarPresenter(useLorcanaGameContext());
  setContext(LORCANA_SIDEBAR_PRESENTER_CONTEXT_KEY, presenter);

  onMount(() => {
    presenter.initializeLocale();
  });

  $effect(() => {
    presenter.syncScryResolution();
  });

  return presenter;
}

export function useLorcanaBoardPresenter(): LorcanaBoardPresenter {
  return new LorcanaBoardPresenter(useLorcanaGameContext());
}

export function maybeUseLorcanaBoardPresenter(): LorcanaBoardPresenter | null {
  if (!hasContext(LORCANA_GAME_CONTEXT_KEY)) {
    return null;
  }

  return new LorcanaBoardPresenter(useLorcanaGameContext());
}
