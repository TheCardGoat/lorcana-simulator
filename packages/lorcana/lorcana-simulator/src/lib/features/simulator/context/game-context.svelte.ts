import { getContext, hasContext, onDestroy, onMount, setContext, untrack } from "svelte";
import { getLocale, locales, setLocale } from "$lib/paraglide/runtime.js";
import { m } from "$lib/i18n/messages.js";
import { searchCardsByName } from "@tcg/lorcana-cards/data";
import type {
  AvailableMove,
  CardInstanceId,
  ChallengePreviewResult,
  EnginePacketUpdate,
  ResolutionSelectionContext,
  TargetResolutionSelectionContext,
} from "@tcg/lorcana-engine";
import type {
  CardInput,
  LorcanaCardTarget,
  LorcanaEngineBase,
  LorcanaProjectedBoardView,
} from "@tcg/lorcana-engine";

import {
  type AvailableMovesSelectionEntry,
  type AvailableMovesSelectionState,
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
  type MoveCategorySummary,
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
} from "@/features/simulator/model/pending-effect-payload.js";
import { buildResolutionActionViews } from "@/features/simulator/model/resolution-actions.js";
import {
  areExecutableMovesEqual,
  areMoveCategorySummariesEqual,
  areOrderedStringArraysEqual,
  arePendingResolutionMovesEqual,
  areStringRecordsEqual,
  buildChallengeReadyCardIds,
  buildChallengeState,
  buildExecutableMoves,
  buildMoveCategorySummaries,
  buildPendingResolutionMoves,
  buildPlayableHandCardIds,
  canValidateInk,
  expandCardMoves,
  expandCategoryMoves,
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
  GuidancePosition,
  NamedCardSearchState,
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
  VARIANT_DURATION_MS,
  createCardAnchorId,
  createSeatHandAnchorId,
  createZoneAnchorId,
  deriveQueuedBoardMoveAnimationsFromPacket,
  getAnimationSpeedMultiplier,
  resolveQueuedBoardMoveAnimation,
} from "@/features/simulator/animations/board-move-animations.js";
import {
  createLoreBadgeAnchorId,
  deriveQueuedQuestAnimationsFromPacket,
  resolveQueuedQuestAnimation,
  type QueuedQuestAnimation,
  type ResolvedQuestAnimation,
} from "@/features/simulator/animations/quest-animations.js";
import {
  deriveQueuedChallengeAnimationsFromPacket,
  resolveQueuedChallengeAnimation,
  type QueuedChallengeAnimation,
  type ResolvedChallengeAnimation,
} from "@/features/simulator/animations/challenge-animations.js";
import {
  deriveQueuedOverlayAnnouncementsFromPacket,
  type QueuedOverlayAnnouncement,
  type ResolvedOverlayAnnouncement,
} from "@/features/simulator/animations/overlay-announcement-animations.js";
import {
  deriveQueuedCardEffectAnimationsFromPacket,
  resolveQueuedCardEffectAnimation,
  type QueuedCardEffectAnimation,
  type ResolvedCardEffectAnimation,
} from "@/features/simulator/animations/card-effect-animations.js";
import {
  getMoveCategoryId,
  getMoveCategoryLabel,
} from "@/features/simulator/model/move-presentation.js";
import {
  initSoundService,
  setSoundVolume as setSoundServiceVolume,
  disposeSoundService,
  playSound,
  boardMoveVariantToSoundId,
  cardEffectKindToSoundId,
  overlayKindToSoundId,
} from "@/features/simulator/animations/sound-service.js";

const LORCANA_GAME_CONTEXT_KEY = Symbol.for("lorcana.game");
const LORCANA_SIDEBAR_PRESENTER_CONTEXT_KEY = Symbol.for("lorcana.sidebar-presenter");
const PLAYER_LOCALE_STORAGE_KEY = "lorcana.simulator.playerLocale";
const RAW_LOG_REGISTRY_STORAGE_KEY = "lorcana.simulator.rawLogRegistryJson";
const SKIP_ACTION_CONFIRMATION_STORAGE_KEY = "lorcana.simulator.skipActionConfirmation";
const CARD_PREVIEW_DELAY_STORAGE_KEY = "lorcana.simulator.cardPreviewDelay";
const PRIMARY_CLICK_ACTION_STORAGE_KEY = "lorcana.simulator.primaryClickAction";
const ANIMATION_SPEED_STORAGE_KEY = "lorcana.simulator.animationSpeed";
const SOUND_VOLUME_STORAGE_KEY = "lorcana.simulator.soundVolume";

export type CardPreviewMode = "disabled" | "immediate" | "delayed";
export type PrimaryClickAction = "challenge" | "quest" | "none";
export type AnimationSpeed = "fast" | "normal" | "slow";

export const ANIMATION_SPEED_MS: Record<AnimationSpeed, number> = {
  fast: 500,
  normal: 1000,
  slow: 1500,
};

export const QUEST_ROTATION_DURATION_MS: Record<AnimationSpeed, number> = {
  fast: 250,
  normal: 400,
  slow: 600,
};

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
  statusMessage?: string;
  primaryActionLabel?: string;
  onResolve?: () => void;
  onPrimaryAction?: () => void;
  onAccept?: () => void;
  onReject?: () => void;
  onConfirm?: () => void;
  onCancel?: () => void;
  inlineActions?: GuidanceAction[];
  namedCardSearch?: NamedCardSearchState;
}

export interface LorcanaGameContextValue {
  boardSnapshot: () => LorcanaProjectedBoardView | null;
  cardSnapshotsById: () => CardSnapshotMap;
  getPlayerSummary: (side: LorcanaPlayerSide) => LorcanaPlayerSummary | null;
  executableMoves: () => ExecutableMoveEntry[];
  moveCategorySummaries: () => MoveCategorySummary[];
  moveCategoryCount: () => number;
  expandCardMoves: (cardId: string) => ExecutableMoveEntry[];
  expandCategoryMoves: (categoryId: ExecutableMovePresentationCategoryId) => ExecutableMoveEntry[];
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
  pendingResolutionAutoOpenStateId: () => number | null;
  challengeSourceCardId: () => string | null;
  challengeMode: () => boolean;
  animations: () => ResolvedBoardMoveAnimation[];
  questAnimations: () => ResolvedQuestAnimation[];
  challengeAnimations: () => ResolvedChallengeAnimation[];
  overlayAnnouncements: () => ResolvedOverlayAnnouncement[];
  cardEffectAnimations: () => ResolvedCardEffectAnimation[];
  animationSpeed: () => AnimationSpeed;
  setAnimationSpeed: (speed: AnimationSpeed) => void;
  soundVolume: () => number;
  setSoundVolume: (volume: number) => void;
  previewChallenge: (attackerId: string, defenderId: string) => ChallengePreviewResult | null;
  executeMove: <K extends LorcanaSimulatorMoveId>(
    moveId: K,
    params: LorcanaSimulatorMoveParams[K],
    options?: ExecuteMoveOptions,
  ) => boolean;
  playCard: (cardId: string) => boolean;
  ink: (cardId: string) => boolean;
  canDragCharacterToLocation: (cardId: string) => boolean;
  canMoveCharacterToLocation: (characterId: string, locationId: string) => boolean;
  canDropHandCardIntoZone: (
    cardId: string,
    zoneId: Extract<LorcanaZoneId, "play" | "inkwell">,
  ) => boolean;
  usesTargetedPlayCardDrag: (cardId: string) => boolean;
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
  runQuestAnimation: (cardId: string, side: LorcanaPlayerSide, loreGained: number) => boolean;
  runChallengeAnimation: (
    attackerId: string,
    defenderId: string,
    side: LorcanaPlayerSide,
    preview: {
      attackerDamageDealt: number;
      defenderDamageDealt: number;
      defenderKind: "character" | "location";
      attackerWouldBeBanished: boolean;
      defenderWouldBeBanished: boolean;
    },
  ) => boolean;
}

interface DerivedStateSnapshot {
  challengeReadyCardIds: string[];
  moveCategorySummaries: MoveCategorySummary[];
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
  #pendingResolutionAutoOpenStateId = $state<number | null>(null);
  // Perf: Lazy move expansion architecture.
  // #moveCategorySummaries is cheap to compute (no getMoveOptions() calls) and drives
  // the category list UI. Full ExecutableMoveEntry[] computation (which calls
  // getMoveOptions() for challenge/ability/location) is deferred to user interaction
  // (category click, card hover, DnD). #derivedStateVersion tracks cache invalidation
  // so lazy consumers know when to recompute.
  #moveCategorySummaries = $state<MoveCategorySummary[]>([]);
  #derivedStateVersion = $state(0);
  #currentAvailableMoves: AvailableMove[] = [];
  #currentLegalMoveIds: readonly string[] = [];
  #cachedExecutableMoves: ExecutableMoveEntry[] = [];
  #cachedExecutableMovesVersion: number = -1;
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
  #pendingQueuedQuestAnimations = $state<QueuedQuestAnimation[]>([]);
  #activeQuestAnimations = $state<ResolvedQuestAnimation[]>([]);
  #questAnimationTimeouts: ReturnType<typeof setTimeout>[] = [];
  #pendingQueuedChallengeAnimations = $state<QueuedChallengeAnimation[]>([]);
  #activeChallengeAnimations = $state<ResolvedChallengeAnimation[]>([]);
  #challengeAnimationTimeouts: ReturnType<typeof setTimeout>[] = [];
  #pendingQueuedOverlayAnnouncements = $state<QueuedOverlayAnnouncement[]>([]);
  #activeOverlayAnnouncements = $state<ResolvedOverlayAnnouncement[]>([]);
  #overlayAnnouncementTimeouts: ReturnType<typeof setTimeout>[] = [];
  #pendingQueuedCardEffectAnimations = $state<QueuedCardEffectAnimation[]>([]);
  #activeCardEffectAnimations = $state<ResolvedCardEffectAnimation[]>([]);
  #cardEffectAnimationTimeouts: ReturnType<typeof setTimeout>[] = [];
  #animationSpeed = $state<AnimationSpeed>("normal");
  #soundVolume = $state<number>(50);
  #snapshotRefreshCallCount = 0;
  #previousMulliganContextKey: string | null = null;
  #boardAnimationTimeout: ReturnType<typeof setTimeout> | null = null;

  constructor(
    engine: LorcanaEngineBase,
    readModel?: SimulatorShellReadModel,
    playerSettings: LorcanaPlayerSettingsMap = {},
  ) {
    initSoundService();
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
  // Perf: Lazy computation — buildExecutableMoves() (which calls getMoveOptions())
  // only runs when a consumer actually reads this getter, not on every state change.
  // The version-based cache ensures we recompute at most once per state change.
  // areExecutableMovesEqual preserves reference identity to avoid unnecessary Svelte rerenders.
  readonly executableMoves = (): ExecutableMoveEntry[] => {
    const version = this.#derivedStateVersion;
    if (this.#cachedExecutableMovesVersion === version) {
      return this.#cachedExecutableMoves;
    }
    const engine = this.#engine;
    if (!engine) {
      return this.#cachedExecutableMoves;
    }
    const newMoves = buildExecutableMoves(
      engine,
      this.#cardSnapshotsById,
      this.#currentAvailableMoves,
      this.#currentLegalMoveIds,
    );
    if (!areExecutableMovesEqual(this.#cachedExecutableMoves, newMoves)) {
      this.#cachedExecutableMoves = newMoves;
    }
    this.#cachedExecutableMovesVersion = version;
    return this.#cachedExecutableMoves;
  };
  readonly moveCategorySummaries = (): MoveCategorySummary[] => this.#moveCategorySummaries;
  readonly moveCategoryCount = (): number => this.#moveCategorySummaries.length;
  readonly expandCardMoves = (cardId: string): ExecutableMoveEntry[] => {
    const engine = this.#engine;
    if (!engine) return [];
    return expandCardMoves(
      engine,
      this.#cardSnapshotsById,
      this.#currentAvailableMoves,
      this.#currentLegalMoveIds,
      cardId,
    );
  };
  readonly expandCategoryMoves = (
    categoryId: ExecutableMovePresentationCategoryId,
  ): ExecutableMoveEntry[] => {
    const engine = this.#engine;
    if (!engine) return [];
    return expandCategoryMoves(
      engine,
      this.#cardSnapshotsById,
      this.#currentAvailableMoves,
      this.#currentLegalMoveIds,
      categoryId,
    );
  };
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
  readonly pendingResolutionAutoOpenStateId = (): number | null =>
    this.#pendingResolutionAutoOpenStateId;
  readonly challengeSourceCardId = (): string | null => this.#challengeSourceCardId;
  readonly challengeMode = (): boolean => this.challengeModeValue;
  readonly animations = (): ResolvedBoardMoveAnimation[] => this.#activeBoardAnimations;
  readonly questAnimations = (): ResolvedQuestAnimation[] => this.#activeQuestAnimations;
  readonly challengeAnimations = (): ResolvedChallengeAnimation[] =>
    this.#activeChallengeAnimations;
  readonly overlayAnnouncements = (): ResolvedOverlayAnnouncement[] =>
    this.#activeOverlayAnnouncements;
  readonly cardEffectAnimations = (): ResolvedCardEffectAnimation[] =>
    this.#activeCardEffectAnimations;
  readonly animationSpeed = (): AnimationSpeed => this.#animationSpeed;
  readonly setAnimationSpeed = (speed: AnimationSpeed): void => {
    this.#animationSpeed = speed;
  };
  readonly soundVolume = (): number => this.#soundVolume;
  readonly setSoundVolume = (volume: number): void => {
    if (!Number.isFinite(volume)) return;
    this.#soundVolume = Math.max(0, Math.min(100, Math.round(volume)));
    setSoundServiceVolume(this.#soundVolume);
  };
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
    disposeSoundService();
  }

  #isGameFinished(): boolean {
    return this.#boardSnapshot?.status === "finished";
  }

  readonly executeMove = <K extends LorcanaSimulatorMoveId>(
    moveId: K,
    params: LorcanaSimulatorMoveParams[K],
    options: ExecuteMoveOptions = {},
  ): boolean => {
    const engine = this.#engine;
    if (!engine || this.#isGameFinished()) {
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
    this.#pendingResolutionAutoOpenStateId = moveId === "playCard" ? this.#lastStateID : null;
    return true;
  };

  readonly playCard = (cardId: string): boolean => {
    const engine = this.#engine;
    if (!engine || this.#isGameFinished()) {
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
    this.#pendingResolutionAutoOpenStateId = this.#lastStateID;
    return true;
  };

  readonly ink = (cardId: string): boolean => {
    const engine = this.#engine;
    if (!engine || this.#isGameFinished()) {
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
    this.#pendingResolutionAutoOpenStateId = null;
    return true;
  };

  readonly canDragCharacterToLocation = (cardId: string): boolean => {
    if (this.#isGameFinished()) {
      return false;
    }

    const ownerSide = this.#ownerSide;
    const turnSide = this.#boardSnapshot ? getTurnSide(this.#boardSnapshot) : null;
    const card = this.#cardSnapshotsById[cardId];
    if (
      !ownerSide ||
      turnSide !== ownerSide ||
      !card ||
      card.zoneId !== "play" ||
      card.cardType !== "character" ||
      card.ownerSide !== ownerSide
    ) {
      return false;
    }

    const moveToLocationSummary = this.#moveCategorySummaries.find(
      (s) => s.categoryId === "move-to-location",
    );
    return moveToLocationSummary?.sourceCardIds.includes(cardId) ?? false;
  };

  // Perf: Uses direct engine validation instead of scanning the full executableMoves array.
  // A single validateMove() call is cheaper than triggering lazy buildExecutableMoves().
  readonly canMoveCharacterToLocation = (characterId: string, locationId: string): boolean => {
    const engine = this.#engine;
    if (!engine || this.#isGameFinished()) return false;
    return engine.validateMove("moveCharacterToLocation", {
      args: {
        characterId: characterId as CardInstanceId,
        locationId: locationId as CardInstanceId,
      },
    }).valid;
  };

  readonly canDropHandCardIntoZone = (
    cardId: string,
    zoneId: Extract<LorcanaZoneId, "play" | "inkwell">,
  ): boolean => {
    const engine = this.#engine;
    const ownerSide = this.#ownerSide;
    const card = this.#cardSnapshotsById[cardId];
    if (
      !engine ||
      this.#isGameFinished() ||
      !ownerSide ||
      !card ||
      card.zoneId !== "hand" ||
      card.ownerSide !== ownerSide
    ) {
      return false;
    }

    if (zoneId === "play") {
      return engine.canPlayCard(cardId as CardInput);
    }

    return canValidateInk(engine, cardId);
  };

  readonly usesTargetedPlayCardDrag = (cardId: string): boolean => {
    const engine = this.#engine;
    const ownerSide = this.#ownerSide;
    const card = this.#cardSnapshotsById[cardId];
    if (
      !engine ||
      this.#isGameFinished() ||
      !ownerSide ||
      !card ||
      card.zoneId !== "hand" ||
      card.ownerSide !== ownerSide ||
      card.cardType !== "action"
    ) {
      return false;
    }

    return engine.hasTargetedPlayCardPreview(cardId as CardInput);
  };

  readonly handleBoardAnchorsChange = (nextAnchors: BoardAnchorSnapshot): void => {
    this.#boardAnchors = nextAnchors;

    if (this.#pendingQueuedAnimations.length > 0) {
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
    }

    if (this.#pendingQueuedQuestAnimations.length > 0) {
      console.log("[quest-animations] Resolving pending quest animations", {
        count: this.#pendingQueuedQuestAnimations.length,
        anchorIds: Object.keys(nextAnchors.anchors),
      });

      const resolvedQuest = this.#pendingQueuedQuestAnimations
        .map((animation) => resolveQueuedQuestAnimation(animation, null, nextAnchors))
        .filter((a): a is ResolvedQuestAnimation => a !== null);

      console.log("[quest-animations] Resolved quest animations", {
        resolved: resolvedQuest.length,
        total: this.#pendingQueuedQuestAnimations.length,
        animations: resolvedQuest.map((a) => ({
          id: a.id,
          source: a.sourceRect,
          dest: a.destinationRect,
        })),
      });

      this.#pendingQueuedQuestAnimations = [];
      this.#fireQuestAnimations(resolvedQuest);
    }

    if (this.#pendingQueuedChallengeAnimations.length > 0) {
      const resolvedChallenge = this.#pendingQueuedChallengeAnimations
        .map((animation) =>
          resolveQueuedChallengeAnimation(
            animation,
            this.#pendingAnimationSourceAnchors,
            nextAnchors,
          ),
        )
        .filter((a): a is ResolvedChallengeAnimation => a !== null);

      this.#pendingQueuedChallengeAnimations = [];
      this.#fireChallengeAnimations(resolvedChallenge);
    }

    if (this.#pendingQueuedCardEffectAnimations.length > 0) {
      const resolvedCardEffects = this.#pendingQueuedCardEffectAnimations
        .map((animation) =>
          resolveQueuedCardEffectAnimation(
            animation,
            this.#pendingAnimationSourceAnchors,
            nextAnchors,
          ),
        )
        .filter((a): a is ResolvedCardEffectAnimation => a !== null);

      this.#pendingQueuedCardEffectAnimations = [];
      this.#fireCardEffectAnimations(resolvedCardEffects);
    }
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
    if (this.#challengeSourceCardId === nextChallengeSourceCardId) return;
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

  readonly runQuestAnimation = (
    cardId: string,
    side: LorcanaPlayerSide,
    loreGained: number,
  ): boolean => {
    const sourceAnchorId = createCardAnchorId(side, "play", cardId);
    const destAnchorId = createLoreBadgeAnchorId(side);

    const sourceRect = this.#resolveBoardAnchorLocalRect(sourceAnchorId);
    const destRect = this.#resolveBoardAnchorLocalRect(destAnchorId);

    if (!sourceRect || !destRect) {
      debugLog("debug-animations", "Failed to resolve quest animation anchors", {
        cardId,
        side,
        sourceAnchorId,
        destAnchorId,
        hasSource: sourceRect !== null,
        hasDest: destRect !== null,
        knownAnchors: this.#boardAnchors ? Object.keys(this.#boardAnchors.anchors) : [],
      });
      return false;
    }

    this.#fireQuestAnimations([
      {
        id: `debug-quest:${cardId}:${Date.now()}`,
        cardId,
        loreGained,
        sourceRect,
        destinationRect: destRect,
        durationMs: ANIMATION_SPEED_MS[this.#animationSpeed],
      },
    ]);
    return true;
  };

  readonly runChallengeAnimation = (
    attackerId: string,
    defenderId: string,
    side: LorcanaPlayerSide,
    preview: {
      attackerDamageDealt: number;
      defenderDamageDealt: number;
      defenderKind: "character" | "location";
      attackerWouldBeBanished: boolean;
      defenderWouldBeBanished: boolean;
    },
  ): boolean => {
    const opponentSide: LorcanaPlayerSide = side === "playerOne" ? "playerTwo" : "playerOne";
    const sourceAnchorId = createCardAnchorId(side, "play", attackerId);
    const destAnchorId = createCardAnchorId(opponentSide, "play", defenderId);

    const sourceRect = this.#resolveBoardAnchorLocalRect(sourceAnchorId);
    const destRect = this.#resolveBoardAnchorLocalRect(destAnchorId);

    if (!sourceRect || !destRect) {
      debugLog("debug-animations", "Failed to resolve challenge animation anchors", {
        attackerId,
        defenderId,
        side,
        sourceAnchorId,
        destAnchorId,
        hasSource: sourceRect !== null,
        hasDest: destRect !== null,
        knownAnchors: this.#boardAnchors ? Object.keys(this.#boardAnchors.anchors) : [],
      });
      return false;
    }

    this.#fireChallengeAnimations([
      {
        id: `debug-challenge:${attackerId}:${defenderId}:${Date.now()}`,
        attackerId,
        defenderId,
        sourceRect,
        destinationRect: destRect,
        preview,
        durationMs: ANIMATION_SPEED_MS[this.#animationSpeed],
      },
    ]);
    return true;
  };

  #clearInteractionState(status = m["sim.status.ready"]({})): void {
    this.#selectedCardId = null;
    this.#selectedMulliganCardIds = [];
    this.#challengeSourceCardId = null;
    this.#pendingErrorReason = null;
    this.#pendingMoveError = null;
    this.#pendingResolutionAutoOpenStateId = null;
    this.#statusMessage = status;
    this.#challengeReadyCardIds = [];
    this.#moveCategorySummaries = [];
    this.#currentAvailableMoves = [];
    this.#currentLegalMoveIds = [];
    this.#cachedExecutableMoves = [];
    this.#cachedExecutableMovesVersion = -1;
    this.#derivedStateVersion++;
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
    this.#clearQuestAnimationTimers();
    this.#clearChallengeAnimationTimers();
    this.#clearOverlayAnnouncementTimers();
    this.#clearCardEffectAnimationTimers();
    this.#boardAnchors = null;
    this.#pendingQueuedAnimations = [];
    this.#pendingAnimationSourceAnchors = null;
    this.#queuedBoardAnimations = [];
    this.#activeBoardAnimations = [];
    this.#playedPacketAnimationIds = [];
    this.#pendingQueuedQuestAnimations = [];
    this.#activeQuestAnimations = [];
    this.#pendingQueuedChallengeAnimations = [];
    this.#activeChallengeAnimations = [];
    this.#pendingQueuedOverlayAnnouncements = [];
    this.#activeOverlayAnnouncements = [];
    this.#pendingQueuedCardEffectAnimations = [];
    this.#activeCardEffectAnimations = [];
  }

  #clearQuestAnimationTimers(): void {
    for (const timeout of this.#questAnimationTimeouts) {
      clearTimeout(timeout);
    }
    this.#questAnimationTimeouts = [];
  }

  #clearChallengeAnimationTimers(): void {
    for (const timeout of this.#challengeAnimationTimeouts) {
      clearTimeout(timeout);
    }
    this.#challengeAnimationTimeouts = [];
  }

  #clearOverlayAnnouncementTimers(): void {
    for (const timeout of this.#overlayAnnouncementTimeouts) {
      clearTimeout(timeout);
    }
    this.#overlayAnnouncementTimeouts = [];
  }

  #clearCardEffectAnimationTimers(): void {
    for (const timeout of this.#cardEffectAnimationTimeouts) {
      clearTimeout(timeout);
    }
    this.#cardEffectAnimationTimeouts = [];
  }

  #fireChallengeAnimations(animations: ResolvedChallengeAnimation[]): void {
    if (animations.length === 0) {
      return;
    }

    const STAGGER_MS = 100;

    for (let i = 0; i < animations.length; i++) {
      const animation = animations[i];
      const delay = i * STAGGER_MS;

      if (delay === 0) {
        playSound("challenge");
        this.#activeChallengeAnimations = [...this.#activeChallengeAnimations, animation];
        const clearId = setTimeout(() => {
          this.#activeChallengeAnimations = this.#activeChallengeAnimations.filter(
            (a) => a.id !== animation.id,
          );
        }, animation.durationMs);
        this.#challengeAnimationTimeouts.push(clearId);
      } else {
        const staggerId = setTimeout(() => {
          this.#activeChallengeAnimations = [...this.#activeChallengeAnimations, animation];
          const clearId = setTimeout(() => {
            this.#activeChallengeAnimations = this.#activeChallengeAnimations.filter(
              (a) => a.id !== animation.id,
            );
          }, animation.durationMs);
          this.#challengeAnimationTimeouts.push(clearId);
        }, delay);
        this.#challengeAnimationTimeouts.push(staggerId);
      }
    }
  }

  #fireQuestAnimations(animations: ResolvedQuestAnimation[]): void {
    if (animations.length === 0) {
      return;
    }

    console.log("[quest-animations] Firing quest animations", {
      count: animations.length,
    });

    const STAGGER_MS = 100;

    for (let i = 0; i < animations.length; i++) {
      const animation = animations[i];
      const delay = i * STAGGER_MS;

      if (delay === 0) {
        playSound("quest");
        this.#activeQuestAnimations = [...this.#activeQuestAnimations, animation];
        const clearId = setTimeout(() => {
          this.#activeQuestAnimations = this.#activeQuestAnimations.filter(
            (a) => a.id !== animation.id,
          );
        }, animation.durationMs);
        this.#questAnimationTimeouts.push(clearId);
      } else {
        const staggerId = setTimeout(() => {
          this.#activeQuestAnimations = [...this.#activeQuestAnimations, animation];
          const clearId = setTimeout(() => {
            this.#activeQuestAnimations = this.#activeQuestAnimations.filter(
              (a) => a.id !== animation.id,
            );
          }, animation.durationMs);
          this.#questAnimationTimeouts.push(clearId);
        }, delay);
        this.#questAnimationTimeouts.push(staggerId);
      }
    }
  }

  #fireOverlayAnnouncements(animations: ResolvedOverlayAnnouncement[]): void {
    if (animations.length === 0) {
      return;
    }

    for (const animation of animations) {
      playSound(overlayKindToSoundId(animation.kind));
      this.#activeOverlayAnnouncements = [...this.#activeOverlayAnnouncements, animation];
      const clearId = setTimeout(() => {
        this.#activeOverlayAnnouncements = this.#activeOverlayAnnouncements.filter(
          (a) => a.id !== animation.id,
        );
      }, animation.durationMs);
      this.#overlayAnnouncementTimeouts.push(clearId);
    }
  }

  #fireCardEffectAnimations(animations: ResolvedCardEffectAnimation[]): void {
    if (animations.length === 0) {
      return;
    }

    const STAGGER_MS = 100;

    for (let i = 0; i < animations.length; i++) {
      const animation = animations[i];
      const delay = i * STAGGER_MS;

      if (delay === 0) {
        playSound(cardEffectKindToSoundId(animation.effectKind));
        this.#activeCardEffectAnimations = [...this.#activeCardEffectAnimations, animation];
        const clearId = setTimeout(() => {
          this.#activeCardEffectAnimations = this.#activeCardEffectAnimations.filter(
            (a) => a.id !== animation.id,
          );
        }, animation.durationMs);
        this.#cardEffectAnimationTimeouts.push(clearId);
      } else {
        const staggerId = setTimeout(() => {
          this.#activeCardEffectAnimations = [...this.#activeCardEffectAnimations, animation];
          const clearId = setTimeout(() => {
            this.#activeCardEffectAnimations = this.#activeCardEffectAnimations.filter(
              (a) => a.id !== animation.id,
            );
          }, animation.durationMs);
          this.#cardEffectAnimationTimeouts.push(clearId);
        }, delay);
        this.#cardEffectAnimationTimeouts.push(staggerId);
      }
    }
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

    if (animation.kind === "play.action") {
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

    if (animation.kind === "lorcana.boardMove") {
      const variant = animation.payload.variant ?? "play-character";
      const isAction = variant === "play-action";
      const isInk = variant === "ink-faceDown" || variant === "ink-faceUp";
      const destinationZoneId = isAction ? "discard" : isInk ? "inkwell" : "play";

      let destinationRect: BoardLocalRect;
      if (isAction) {
        destinationRect =
          this.#resolveBoardAnchorLocalRect(createZoneAnchorId(actorSide, "discard")) ?? centerRect;
      } else if (isInk) {
        destinationRect =
          this.#resolveBoardAnchorLocalRect(createZoneAnchorId(actorSide, "inkwell")) ?? centerRect;
      } else {
        destinationRect =
          this.#resolveBoardAnchorLocalRect(
            createCardAnchorId(actorSide, "play", animation.payload.cardId),
          ) ??
          this.#resolveBoardAnchorLocalRect(createZoneAnchorId(actorSide, "play")) ??
          centerRect;
      }

      const speedMultiplier = getAnimationSpeedMultiplier(this.#animationSpeed);
      const durationMs = Math.round(VARIANT_DURATION_MS[variant] * speedMultiplier);

      return {
        card,
        destinationRect,
        destinationZoneId,
        durationMs,
        id: animation.id,
        impactAt: isInk ? "destination" : "via",
        impactRect: isInk ? destinationRect : centerRect,
        renderFace: isInk && variant === "ink-faceDown" ? "faceDown" : "faceUp",
        sourceRect,
        variant,
        viaRect: isInk ? undefined : centerRect,
      };
    }

    return null;
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
    playSound(boardMoveVariantToSoundId(nextAnimation.variant));
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
      moveCategorySummaries: this.#moveCategorySummaries,
      pendingResolutionMoves: this.#pendingResolutionMoves,
      playableHandCardIds: this.#playableHandCardIds,
      validChallengeTargetIds: this.#validChallengeTargetIds,
      invalidChallengeTargetReasons: this.#invalidChallengeTargetReasons,
    }));
  }

  #refreshDerivedState(): void {
    const engine = this.#engine;
    if (!engine || !this.#boardSnapshot) {
      this.#moveCategorySummaries = [];
      this.#currentAvailableMoves = [];
      this.#currentLegalMoveIds = [];
      this.#cachedExecutableMoves = [];
      this.#cachedExecutableMovesVersion = -1;
      this.#derivedStateVersion++;
      this.#challengeReadyCardIds = [];
      this.#pendingResolutionMoves = [];
      this.#playableHandCardIds = [];
      this.#validChallengeTargetIds = [];
      this.#invalidChallengeTargetReasons = {};
      return;
    }

    const legalMoves = engine.enumerateMoves();
    const availableMoves = engine.getAvailableMoves();
    const activeSide = getActiveSide(this.#boardSnapshot);
    let nextMoveCategorySummaries: MoveCategorySummary[] = [];
    let nextChallengeReadyCardIds: string[] = [];
    let nextPlayableHandCardIds: string[] = [];
    let nextPendingResolutionMoves: PendingResolutionMoveEntry[] = [];

    // Perf: buildMoveCategorySummaries() is O(n) over AvailableMove[] with no
    // getMoveOptions() calls — much cheaper than the old buildExecutableMoves() which
    // expanded every attacker×defender, card×ability, and character×location pair.
    // Full expansion is deferred to user interaction via expandCategoryMoves/expandCardMoves.
    try {
      nextMoveCategorySummaries = buildMoveCategorySummaries(engine, availableMoves, legalMoves);
    } catch (error) {
      console.error("[simulator][refreshDerivedState][buildMoveCategorySummaries][error]", error);
      throw error;
    }

    // Store for lazy expansion by expandCategoryMoves/expandCardMoves/executableMoves
    this.#currentAvailableMoves = availableMoves;
    this.#currentLegalMoveIds = legalMoves;

    try {
      nextChallengeReadyCardIds = buildChallengeReadyCardIds(availableMoves);
    } catch (error) {
      console.error("[simulator][refreshDerivedState][buildChallengeReadyCardIds][error]", error);
      throw error;
    }

    try {
      nextPlayableHandCardIds = buildPlayableHandCardIds(availableMoves);
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
      moveCategoryCount: nextMoveCategorySummaries.length,
      moveCategoryIds: nextMoveCategorySummaries.map((s) => s.categoryId),
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

    if (
      !areMoveCategorySummariesEqual(
        currentDerivedState.moveCategorySummaries,
        nextMoveCategorySummaries,
      )
    ) {
      this.#moveCategorySummaries = nextMoveCategorySummaries;
    }
    // Always bump version so lazy executableMoves() cache is invalidated
    this.#derivedStateVersion++;
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
      getAnimationSpeedMultiplier(this.#animationSpeed),
    );
    const nextQueuedQuestAnimations = deriveQueuedQuestAnimationsFromPacket(
      packetUpdate,
      ANIMATION_SPEED_MS[this.#animationSpeed],
    );
    const nextQueuedChallengeAnimations = deriveQueuedChallengeAnimationsFromPacket(
      packetUpdate,
      ANIMATION_SPEED_MS[this.#animationSpeed],
    );
    const nextQueuedOverlayAnnouncements = deriveQueuedOverlayAnnouncementsFromPacket(
      packetUpdate,
      ANIMATION_SPEED_MS[this.#animationSpeed],
    );
    const nextQueuedCardEffectAnimations = deriveQueuedCardEffectAnimationsFromPacket(
      packetUpdate,
      ANIMATION_SPEED_MS[this.#animationSpeed],
    );

    if (nextQueuedQuestAnimations.length > 0) {
      console.log("[quest-animations] Derived quest animations from packet", {
        count: nextQueuedQuestAnimations.length,
        ids: nextQueuedQuestAnimations.map((a) => a.id),
        cards: nextQueuedQuestAnimations.map((a) => ({
          cardId: a.cardId,
          loreGained: a.loreGained,
        })),
      });
    }

    this.#boardSnapshot = nextBoardSnapshot;
    this.#cardSnapshotsById = nextCardSnapshotsById;
    this.#ownerSide = getOwnerSideFromEngine(engine, nextBoardSnapshot);
    this.#lastStateID = currentStateID;
    this.#pendingQueuedAnimations = nextQueuedAnimations;
    this.#pendingQueuedQuestAnimations = nextQueuedQuestAnimations;
    this.#pendingQueuedChallengeAnimations = nextQueuedChallengeAnimations;
    this.#pendingQueuedCardEffectAnimations = nextQueuedCardEffectAnimations;
    this.#pendingAnimationSourceAnchors =
      nextQueuedAnimations.length > 0 ||
      nextQueuedQuestAnimations.length > 0 ||
      nextQueuedChallengeAnimations.length > 0 ||
      nextQueuedCardEffectAnimations.length > 0
        ? previousAnchorSnapshot
        : null;

    // Overlay announcements don't need anchor resolution — fire immediately
    if (nextQueuedOverlayAnnouncements.length > 0) {
      this.#fireOverlayAnnouncements(nextQueuedOverlayAnnouncements);
    }

    const allNewAnimationIds = [
      ...nextQueuedAnimations.map((a) => a.id),
      ...nextQueuedQuestAnimations.map((a) => a.id),
      ...nextQueuedChallengeAnimations.map((a) => a.id),
      ...nextQueuedOverlayAnnouncements.map((a) => a.id),
      ...nextQueuedCardEffectAnimations.map((a) => a.id),
    ];
    if (allNewAnimationIds.length > 0) {
      this.#playedPacketAnimationIds = [...this.#playedPacketAnimationIds, ...allNewAnimationIds];
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
      return "Select the required target or player before resolving this effect.";
    case "choice-selection":
      return "Choose a branch before resolving this effect.";
    case "discard-choice":
      return "Choose the cards to discard before resolving this effect.";
    case "name-card-selection":
      return "Name a card before resolving this effect.";
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
  return {
    en: m["sim.locale.name.en"]({}),
    es: m["sim.locale.name.es"]({}),
    de: m["sim.locale.name.de"]({}),
    it: m["sim.locale.name.it"]({}),
    "pt-br": m["sim.locale.name.pt-br"]({}),
  }[locale];
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
  | "quest"
  | "shift-card"
  | "sing-card";

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

type NamedCardSearchResult = {
  id: string;
  label: string;
  name: string;
};

type ScryResolutionSelection = {
  zone: string;
  cards: string[];
};

type ResolutionSelectionPhase = "selecting" | "executing";

interface ResolutionSelectionSession {
  move: PendingResolutionMoveEntry;
  context: ResolutionSelectionContext;
  phase: ResolutionSelectionPhase;
  inline: boolean;
  selectedTargets: string[];
  selectedChoiceIndex: number | null;
  selectedOptionalValue: boolean | null;
  namedCardQuery: string;
  selectedNamedCard: string | null;
  scryDestinations: ScryResolutionSelection[];
}

interface AutoOpenResolutionCandidate {
  key: string;
  move: PendingResolutionMoveEntry;
  context: ResolutionSelectionContext | null;
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
    categoryId === "shift-card" ||
    categoryId === "sing-card" ||
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

function isTargetResolutionSelectionContext(
  context: ResolutionSelectionContext,
): context is TargetResolutionSelectionContext {
  return context.kind === "target-selection" || context.kind === "discard-choice";
}

function matchesSelectionId(candidateId: string, targetId: string): boolean {
  return candidateId === targetId || String(candidateId) === String(targetId);
}

function includesSelectionId(candidateIds: readonly string[], targetId: string): boolean {
  return candidateIds.some((candidateId) => matchesSelectionId(candidateId, targetId));
}

function getResolutionSessionStatusMessage(session: ResolutionSelectionSession): string {
  if (session.phase === "executing") return "Executing...";
  const ctx = session.context;
  if (isTargetResolutionSelectionContext(ctx)) {
    const count = session.selectedTargets.length;
    return count > 0 ? `Selecting targets (${count} selected)...` : "Selecting targets...";
  }
  if (ctx.kind === "choice-selection") return "Choosing resolution option...";
  if (ctx.kind === "optional-selection") return "Deciding whether to resolve...";
  if (ctx.kind === "name-card-selection") return "Naming a card...";
  if (ctx.kind === "scry-selection") return "Arranging revealed cards...";
  return "Resolving...";
}

function isInlineResolutionSelectionContext(context: ResolutionSelectionContext): boolean {
  return (
    isTargetResolutionSelectionContext(context) &&
    context.playerCandidateIds.length === 0 &&
    context.cardCandidateIds.length > 0 &&
    !context.ordered &&
    context.allowedZones.length > 0 &&
    context.allowedZones.every((zone) => zone === "play")
  );
}

function buildResolutionSelectionSession(
  move: PendingResolutionMoveEntry,
  context: ResolutionSelectionContext,
): ResolutionSelectionSession {
  const scryDestinations =
    context.kind === "scry-selection"
      ? context.destinationRules.map((rule) => {
          const currentDestination = context.currentSelection.destinations?.find(
            (destination) => destination.zone === rule.zone,
          );

          return {
            zone: rule.zone,
            cards: [...(currentDestination?.cards ?? [])],
          };
        })
      : [];

  return {
    move,
    context,
    phase: "selecting",
    inline: isInlineResolutionSelectionContext(context),
    selectedTargets: [...(context.currentSelection.targets ?? [])],
    selectedChoiceIndex:
      typeof context.currentSelection.choiceIndex === "number"
        ? context.currentSelection.choiceIndex
        : null,
    selectedOptionalValue:
      typeof context.currentSelection.resolveOptional === "boolean"
        ? context.currentSelection.resolveOptional
        : null,
    namedCardQuery: context.currentSelection.namedCard ?? "",
    selectedNamedCard: context.currentSelection.namedCard ?? null,
    scryDestinations,
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

function usesTargetSelectionForActionSelectionMoves(
  categoryId: ActionSelectionSessionCategoryId,
  moves: readonly ExecutableMoveEntry[],
): boolean {
  if (categoryId === "challenge" || categoryId === "move-to-location") {
    return moves.length > 0;
  }

  if (categoryId !== "play-card") {
    return false;
  }

  return (
    moves.length > 0 &&
    moves.every((move) => getTargetCardIdForActionSelectionMove(categoryId, move) !== null)
  );
}

function getChooseTargetStatusMessage(
  categoryId: ActionSelectionSessionCategoryId,
  sourceCardLabel: string,
): string {
  if (categoryId === "challenge") {
    return m["sim.guidance.session.chooseChallengeTarget"]({ cardLabel: sourceCardLabel });
  }

  if (categoryId === "move-to-location") {
    return m["sim.guidance.session.chooseMoveTarget"]({ cardLabel: sourceCardLabel });
  }

  if (categoryId === "play-card") {
    return `Choose a target for ${sourceCardLabel}.`;
  }

  return `Choose a target for ${sourceCardLabel}.`;
}

function getChooseSourceStatusMessage(categoryId: ActionSelectionSessionCategoryId): string {
  return categoryId === "ink-card"
    ? m["sim.guidance.session.chooseInkSource"]({})
    : categoryId === "quest"
      ? m["sim.guidance.session.chooseQuestSource"]({})
      : categoryId === "play-card" || categoryId === "shift-card" || categoryId === "sing-card"
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
  return session.categoryId === "play-card" ||
    session.categoryId === "shift-card" ||
    session.categoryId === "sing-card"
    ? m["sim.guidance.session.choosePlayOption"]({ cardLabel: sourceCardLabel })
    : `Choose an ability for ${sourceCardLabel}.`;
}

function capitalize(value: string): string {
  return value.length > 0 ? `${value.charAt(0).toUpperCase()}${value.slice(1)}` : value;
}

function buildAvailableMovesCardDetail(card: LorcanaCardSnapshot): string | undefined {
  const fragments: string[] = [];

  if (card.cardType) {
    fragments.push(capitalize(card.cardType));
  }

  if (card.atLocationLabel) {
    fragments.push(`At ${card.atLocationLabel}`);
  }

  if (card.readyState === "exerted" && card.cardType === "character") {
    fragments.push("Exerted");
  }

  if (card.isDrying) {
    fragments.push("Drying");
  }

  return fragments.length > 0 ? fragments.join(" · ") : undefined;
}

export class LorcanaSidebarPresenter {
  readonly #game: LorcanaGameContextValue;
  #mobileNoticeId = 0;

  selectedLocale = $state<SupportedLocale>(getLocale());
  isPlayerSettingsOpen = $state(false);
  showRawLogRegistryJson = $state(false);
  showRawErrorDialog = $state(false);
  mobileNotice = $state<{ id: number; message: string; tone: "info" } | null>(null);
  hoveredLogCard = $state<LorcanaCardSnapshot | null>(null);
  pendingMulliganDangerConfirm = $state<"keepHand" | "allCards" | null>(null);
  skipActionConfirmation = $state(false);
  cardPreviewMode = $state<CardPreviewMode>("delayed");
  primaryClickAction = $state<PrimaryClickAction>("challenge");
  animationSpeed = $state<AnimationSpeed>("normal");
  soundVolume = $state<number>(50);
  guidancePosition = $state<GuidancePosition>("bottom");
  #mulliganSelectionActive = $state(false);
  #actionSelectionSession = $state<ActionSelectionSession | null>(null);
  #resolutionSelectionSession = $state<ResolutionSelectionSession | null>(null);
  #lastHandledAutoOpenResolutionKey = $state<string | null>(null);

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

    const storedCardPreviewMode = localStorage.getItem(CARD_PREVIEW_DELAY_STORAGE_KEY);
    if (
      storedCardPreviewMode === "disabled" ||
      storedCardPreviewMode === "immediate" ||
      storedCardPreviewMode === "delayed"
    ) {
      this.cardPreviewMode = storedCardPreviewMode;
    }

    const storedPrimaryClickAction = localStorage.getItem(PRIMARY_CLICK_ACTION_STORAGE_KEY);
    if (
      storedPrimaryClickAction === "challenge" ||
      storedPrimaryClickAction === "quest" ||
      storedPrimaryClickAction === "none"
    ) {
      this.primaryClickAction = storedPrimaryClickAction;
    }

    const storedAnimationSpeed = localStorage.getItem(ANIMATION_SPEED_STORAGE_KEY);
    if (
      storedAnimationSpeed === "fast" ||
      storedAnimationSpeed === "normal" ||
      storedAnimationSpeed === "slow"
    ) {
      this.animationSpeed = storedAnimationSpeed;
      this.#game.setAnimationSpeed(storedAnimationSpeed);
    }

    const storedSoundVolume = localStorage.getItem(SOUND_VOLUME_STORAGE_KEY);
    if (storedSoundVolume !== null) {
      const parsed = Number(storedSoundVolume);
      if (!Number.isNaN(parsed)) {
        this.soundVolume = Math.max(0, Math.min(100, Math.round(parsed)));
        this.#game.setSoundVolume(this.soundVolume);
      }
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

  syncAutoOpenPendingResolution(): void {
    const candidate = this.#getAutoOpenResolutionCandidate();
    if (!candidate || candidate.key === this.#lastHandledAutoOpenResolutionKey) {
      return;
    }

    this.#lastHandledAutoOpenResolutionKey = candidate.key;

    if (candidate.context) {
      this.startResolutionSelectionSession(candidate.move, candidate.context);
    } else if (candidate.move.moveId === "resolveEffect") {
      this.handleResolvePendingEffect(candidate.move);
    } else if (candidate.move.moveId === "resolveBag") {
      this.handleResolveBag(candidate.move);
    }
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

  get moveCategorySummaries(): MoveCategorySummary[] {
    return this.#game.moveCategorySummaries();
  }

  get moveCategoryCount(): number {
    return this.#game.moveCategoryCount();
  }

  expandCategoryMoves = (
    categoryId: ExecutableMovePresentationCategoryId,
  ): ExecutableMoveEntry[] => {
    return this.#game.expandCategoryMoves(categoryId);
  };

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

  get resolutionSelectionSession(): ResolutionSelectionSession | null {
    return this.#resolutionSelectionSession;
  }

  get manualCardActionSession(): ActionSelectionSession | null {
    return this.#actionSelectionSession;
  }

  get selectedActionSessionCard(): LorcanaCardSnapshot | null {
    // Use selectedActionSessionCardIds which filters to card candidates only
    // (selectedTargets can contain player IDs which don't exist in cardSnapshotsById)
    const cardIds = this.selectedActionSessionCardIds;
    if (cardIds.length > 0) {
      return this.cardSnapshotsById[cardIds[0]] ?? null;
    }

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

  #buildAutoOpenResolutionKey(
    move: PendingResolutionMoveEntry,
    context: ResolutionSelectionContext | null,
  ): string | null {
    const stateId = this.boardSnapshot?.stateID;
    if (typeof stateId !== "number") {
      return null;
    }

    if (context) {
      return `${stateId}:${move.moveId}:${context.origin}:${context.requestId}`;
    }

    return `${stateId}:${move.moveId}:auto-resolve:${move.id}`;
  }

  #getAutoOpenResolutionCandidate(): AutoOpenResolutionCandidate | null {
    const board = this.boardSnapshot;
    if (!board) {
      return null;
    }

    if (this.#actionSelectionSession || this.#resolutionSelectionSession) {
      return null;
    }

    const autoOpenStateId = this.#game.pendingResolutionAutoOpenStateId();
    const isAutoOpenState = autoOpenStateId === board.stateID;

    const activePendingEffectId = board.pendingChoice?.requestID ?? null;
    const activePendingEffect = activePendingEffectId
      ? (board.pendingEffects.find((effect) => effect.id === activePendingEffectId) ?? null)
      : null;

    // Mandatory active pending effects auto-open/auto-resolve immediately.
    // Scry-selection and non-optional effects skip the "Resolve" button.
    if (activePendingEffect) {
      const pendingKind = activePendingEffect.selectionContext?.kind;
      const isMandatory = pendingKind !== "optional-selection";

      if (isMandatory) {
        const move = this.pendingResolutionMoveByEffectId.get(activePendingEffect.id);
        if (move) {
          const context = activePendingEffect.selectionContext ?? null;
          const key = this.#buildAutoOpenResolutionKey(move, context);
          if (key) {
            return { key, move, context };
          }
        }
      }
    }

    // Mandatory bag effects auto-resolve only when there's exactly one actionable bag move.
    // Multiple actionable triggers must preserve player's choice of resolution order.
    const resolvableBagEffect = board.bagEffects[0] ?? null;
    if (resolvableBagEffect && this.pendingResolutionMoveByBagId.size === 1) {
      const bagKind = resolvableBagEffect.selectionContext?.kind;
      const isMandatory = bagKind !== "optional-selection";
      const move = this.pendingResolutionMoveByBagId.get(resolvableBagEffect.id);

      if (isMandatory && move) {
        const context = resolvableBagEffect.selectionContext ?? null;
        const key = this.#buildAutoOpenResolutionKey(move, context);
        if (key) {
          return { key, move, context };
        }
      }
    }

    if (!isAutoOpenState) {
      return null;
    }

    // Fallback: auto-open effects with selection context when there's exactly one queued
    // (preserves existing behavior for optional effects triggered by playCard/activateAbility)
    const queuedResolutionCount = board.pendingEffects.length + board.bagEffects.length;
    if (queuedResolutionCount !== 1) {
      return null;
    }

    const pendingEffect = board.pendingEffects[0] ?? null;
    if (pendingEffect?.selectionContext) {
      const move = this.pendingResolutionMoveByEffectId.get(pendingEffect.id);
      const key = move
        ? this.#buildAutoOpenResolutionKey(move, pendingEffect.selectionContext)
        : null;
      return move && key
        ? {
            key,
            move,
            context: pendingEffect.selectionContext,
          }
        : null;
    }

    const bagEffect = board.bagEffects[0] ?? null;
    if (bagEffect?.selectionContext) {
      const move = this.pendingResolutionMoveByBagId.get(bagEffect.id);
      const key = move ? this.#buildAutoOpenResolutionKey(move, bagEffect.selectionContext) : null;
      return move && key
        ? {
            key,
            move,
            context: bagEffect.selectionContext,
          }
        : null;
    }

    return null;
  }

  get #activeResolutionPopoverItemId(): string | null {
    const session = this.#resolutionSelectionSession;
    if (!session) return null;
    if (session.move.moveId === "resolveEffect") return `pending:${session.move.params.effectId}`;
    if (session.move.moveId === "resolveBag") return `bag:${session.move.params.bagId}`;
    return null;
  }

  get pendingEffectsPopoverItems(): PendingEffectsPopoverItem[] {
    if (!this.boardSnapshot) {
      return [];
    }

    const activePendingEffectId = this.boardSnapshot.pendingChoice?.requestID ?? null;
    const activeResolutionItemId = this.#activeResolutionPopoverItemId;
    const activeSession = this.#resolutionSelectionSession;
    const bagItems = this.boardSnapshot.bagEffects.map<PendingEffectsPopoverItem>((bagEffect) => {
      const resolveMove = this.pendingResolutionMoveByBagId.get(bagEffect.id);
      const payloadMeta = getBagEffectPayloadMeta(bagEffect.payload);
      const selectionContext = bagEffect.selectionContext ?? null;
      const isOptionalSelection = selectionContext?.kind === "optional-selection";
      const card = bagEffect.sourceId ? (this.cardSnapshotsById[bagEffect.sourceId] ?? null) : null;
      const itemId = `bag:${bagEffect.id}`;
      const isInActiveSession = activeResolutionItemId === itemId && activeSession != null;

      if (isInActiveSession) {
        const canConfirm = this.canConfirmResolutionSelection;
        return {
          id: itemId,
          kind: "bag",
          title: card?.label ?? "Queued bag effect",
          subtitle: "Triggered ability in bag",
          detail: resolveMove
            ? selectionContext
              ? getPendingEffectDetail(selectionContext.kind)
              : "Resolve this queued triggered ability."
            : "Waiting for the current bag resolver before this effect can be chosen.",
          badge: "Bag",
          card,
          canResolve: false,
          statusMessage: getResolutionSessionStatusMessage(activeSession),
          inlineActions:
            activeSession.context.kind === "optional-selection"
              ? [
                  {
                    id: `${itemId}:accept`,
                    label: activeSession.context.acceptLabel,
                    onClick: () => {
                      this.selectResolutionOptional(true);
                    },
                    emphasis: activeSession.selectedOptionalValue === true,
                  },
                  {
                    id: `${itemId}:reject`,
                    label: activeSession.context.rejectLabel,
                    onClick: () => {
                      this.selectResolutionOptional(false);
                    },
                    emphasis: activeSession.selectedOptionalValue === false,
                  },
                ]
              : activeSession.context.kind === "choice-selection"
                ? activeSession.context.options.map((option) => ({
                    id: `${itemId}:choice:${option.index}`,
                    label: option.label,
                    onClick: () => {
                      this.selectResolutionChoice(option.index);
                    },
                    disabled: !option.legal,
                    emphasis: activeSession.selectedChoiceIndex === option.index,
                  }))
                : undefined,
          onConfirm: canConfirm ? this.confirmResolutionSelection : undefined,
          onCancel: this.cancelResolutionSelectionSession,
          namedCardSearch:
            activeSession.context.kind === "name-card-selection"
              ? {
                  query: activeSession.namedCardQuery,
                  results: this.resolutionSelectionNamedCardResults.map((result) => ({
                    id: result.id,
                    label: result.label,
                    name: result.name,
                    selected:
                      activeSession.selectedNamedCard === result.name ||
                      activeSession.namedCardQuery.trim() === result.label,
                  })),
                  oninput: this.updateResolutionNamedCardQuery,
                  onselect: this.chooseResolutionNamedCard,
                }
              : undefined,
        };
      }

      return {
        id: itemId,
        kind: "bag",
        title: card?.label ?? "Queued bag effect",
        subtitle: "Triggered ability in bag",
        detail: resolveMove
          ? selectionContext
            ? getPendingEffectDetail(selectionContext.kind)
            : "Resolve this queued triggered ability."
          : "Waiting for the current bag resolver before this effect can be chosen.",
        badge: "Bag",
        card,
        canResolve: !isOptionalSelection && Boolean(resolveMove),
        canAccept: isOptionalSelection && Boolean(resolveMove),
        canReject: isOptionalSelection && Boolean(resolveMove),
        disabledReason: resolveMove ? undefined : "Not actionable from this view right now.",
        onResolve: resolveMove ? () => this.handleResolveBag(resolveMove) : undefined,
        onAccept: resolveMove ? () => this.handleAcceptBagEffect(resolveMove) : undefined,
        onReject: resolveMove ? () => this.handleRejectBagEffect(resolveMove) : undefined,
      };
    });

    const pendingItems = this.boardSnapshot.pendingEffects.map<PendingEffectsPopoverItem>(
      (pendingEffect) => {
        const payloadMeta = getPendingEffectPayloadMeta(pendingEffect.payload);
        const effectId = pendingEffect.id;
        const resolveMove = this.pendingResolutionMoveByEffectId.get(effectId);
        const selectionContext = pendingEffect.selectionContext ?? null;
        const cardId =
          pendingEffect.sourceId ?? payloadMeta.sourceCardId ?? payloadMeta.sourceId ?? null;
        const card = cardId ? (this.cardSnapshotsById[cardId] ?? null) : null;
        const pendingKind = selectionContext?.kind ?? payloadMeta.kind;
        const isOptionalSelection = pendingKind === "optional-selection";
        const isActive = activePendingEffectId === effectId;

        const isScrySelection = pendingKind === "scry-selection";
        const itemId = `pending:${effectId}`;
        const isInActiveSession = activeResolutionItemId === itemId && activeSession != null;

        if (isInActiveSession) {
          const canConfirm = this.canConfirmResolutionSelection;
          return {
            id: itemId,
            kind: "pending",
            title: card?.label ?? "Pending effect",
            subtitle: getPendingEffectSubtitle(pendingKind),
            detail: getPendingEffectDetail(pendingKind),
            badge: "Pending",
            card,
            isActive,
            canResolve: false,
            statusMessage: getResolutionSessionStatusMessage(activeSession),
            inlineActions:
              activeSession.context.kind === "optional-selection"
                ? [
                    {
                      id: `${itemId}:accept`,
                      label: activeSession.context.acceptLabel,
                      onClick: () => {
                        this.selectResolutionOptional(true);
                      },
                      emphasis: activeSession.selectedOptionalValue === true,
                    },
                    {
                      id: `${itemId}:reject`,
                      label: activeSession.context.rejectLabel,
                      onClick: () => {
                        this.selectResolutionOptional(false);
                      },
                      emphasis: activeSession.selectedOptionalValue === false,
                    },
                  ]
                : activeSession.context.kind === "choice-selection"
                  ? activeSession.context.options.map((option) => ({
                      id: `${itemId}:choice:${option.index}`,
                      label: option.label,
                      onClick: () => {
                        this.selectResolutionChoice(option.index);
                      },
                      disabled: !option.legal,
                      emphasis: activeSession.selectedChoiceIndex === option.index,
                    }))
                  : undefined,
            onConfirm: canConfirm ? this.confirmResolutionSelection : undefined,
            onCancel: this.cancelResolutionSelectionSession,
            namedCardSearch:
              activeSession.context.kind === "name-card-selection"
                ? {
                    query: activeSession.namedCardQuery,
                    results: this.resolutionSelectionNamedCardResults.map((result) => ({
                      id: result.id,
                      label: result.label,
                      name: result.name,
                      selected:
                        activeSession.selectedNamedCard === result.name ||
                        activeSession.namedCardQuery.trim() === result.label,
                    })),
                    oninput: this.updateResolutionNamedCardQuery,
                    onselect: this.chooseResolutionNamedCard,
                  }
                : undefined,
          };
        }

        return {
          id: itemId,
          kind: "pending",
          title: card?.label ?? "Pending effect",
          subtitle: getPendingEffectSubtitle(pendingKind),
          detail: getPendingEffectDetail(pendingKind),
          badge: "Pending",
          card,
          isActive,
          canResolve: isActive && !isScrySelection && !isOptionalSelection && Boolean(resolveMove),
          canAccept: isActive && isOptionalSelection && Boolean(resolveMove),
          canReject: isActive && isOptionalSelection && Boolean(resolveMove),
          primaryActionLabel: isScrySelection ? m["sim.actions.label.arrangeCards"]({}) : undefined,
          onPrimaryAction:
            isActive && isScrySelection && resolveMove
              ? () => this.handleResolvePendingEffect(resolveMove)
              : undefined,
          disabledReason: isActive
            ? resolveMove
              ? undefined
              : "This pending effect is waiting for the responding player."
            : "This pending effect is waiting for its turn in the resolution queue.",
          onResolve:
            isActive && !isScrySelection && !isOptionalSelection && resolveMove
              ? () => this.handleResolvePendingEffect(resolveMove)
              : undefined,
          onAccept:
            isActive && isOptionalSelection && resolveMove
              ? () => this.handleAcceptPendingEffect(resolveMove)
              : undefined,
          onReject:
            isActive && isOptionalSelection && resolveMove
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

  #getResolutionSelectionCardCandidateIds(context: TargetResolutionSelectionContext): string[] {
    if (context.cardCandidateIds.length > 0) {
      return [...context.cardCandidateIds];
    }

    if (
      context.kind !== "discard-choice" ||
      !context.allowedZones.includes("hand") ||
      !this.boardSnapshot
    ) {
      return [];
    }

    const chooserSide = getSideForOwnerId(this.boardSnapshot, context.chooserId);
    if (!chooserSide) {
      return [];
    }

    return Object.values(this.cardSnapshotsById)
      .filter(
        (card) => card.ownerSide === chooserSide && context.allowedZones.includes(card.zoneId),
      )
      .map((card) => card.cardId);
  }

  get resolutionSelectionCandidateCards(): LorcanaCardSnapshot[] {
    const session = this.#resolutionSelectionSession;
    if (!session || !isTargetResolutionSelectionContext(session.context)) {
      return [];
    }

    return this.#getResolutionSelectionCardCandidateIds(session.context)
      .map((cardId) => this.cardSnapshotsById[cardId] ?? null)
      .filter((card): card is LorcanaCardSnapshot => card !== null);
  }

  get resolutionSelectionNamedCardResults(): NamedCardSearchResult[] {
    const session = this.#resolutionSelectionSession;
    if (!session || session.context.kind !== "name-card-selection") {
      return [];
    }

    const query = session.namedCardQuery.trim();
    if (query.length === 0) {
      return [];
    }

    return searchCardsByName(query)
      .slice(0, 24)
      .map((card) => ({
        id: card.id,
        label: card.version ? `${card.name} - ${card.version}` : card.name,
        name: card.name,
      }));
  }

  get selectedActionSessionCardIds(): string[] {
    const resolutionSession = this.#resolutionSelectionSession;
    const resolutionContext = resolutionSession?.context;
    if (
      resolutionSession &&
      resolutionContext &&
      isTargetResolutionSelectionContext(resolutionContext)
    ) {
      return resolutionSession.selectedTargets.filter((targetId) =>
        includesSelectionId(
          this.#getResolutionSelectionCardCandidateIds(resolutionContext),
          targetId,
        ),
      );
    }

    return this.#actionSelectionSession
      ? getUniqueOrderedIds([
          this.#actionSelectionSession.sourceCardId,
          this.#actionSelectionSession.targetCardId,
        ])
      : [];
  }

  get selectableActionSessionCardIds(): string[] {
    const resolutionSession = this.#resolutionSelectionSession;
    if (resolutionSession && isTargetResolutionSelectionContext(resolutionSession.context)) {
      return [...this.#getResolutionSelectionCardCandidateIds(resolutionSession.context)];
    }

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
    const resolutionSession = this.#resolutionSelectionSession;
    if (
      resolutionSession &&
      isTargetResolutionSelectionContext(resolutionSession.context) &&
      this.boardSnapshot
    ) {
      const selectableCardIds = new Set(
        this.#getResolutionSelectionCardCandidateIds(resolutionSession.context).map((cardId) =>
          String(cardId),
        ),
      );
      return Object.values(this.cardSnapshotsById)
        .filter((card) => card.zoneId === "play")
        .map((card) => card.cardId)
        .filter((cardId) => !selectableCardIds.has(String(cardId)));
    }

    const session = this.#actionSelectionSession;
    if (
      !session ||
      (session.categoryId !== "challenge" && session.categoryId !== "play-card") ||
      session.phase !== "choose-target" ||
      !this.boardSnapshot
    ) {
      return [];
    }

    const validTargetIds = new Set(this.selectableActionSessionCardIds);

    if (session.categoryId === "challenge") {
      if (!this.ownerSide) {
        return [];
      }

      const opponentSide = this.ownerSide === "playerOne" ? "playerTwo" : "playerOne";
      return getCardsForZone(this.cardSnapshotsById, this.boardSnapshot, opponentSide, "play")
        .map((card) => card.cardId)
        .filter((cardId) => !validTargetIds.has(cardId));
    }

    return Object.values(this.cardSnapshotsById)
      .filter((card) => card.zoneId === "play")
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

  get availableMovesSelectionState(): AvailableMovesSelectionState | null {
    if (this.#mulliganSelectionActive && this.boardSnapshot && this.ownerSide) {
      const handCards = getCardsForZone(
        this.cardSnapshotsById,
        this.boardSnapshot,
        this.ownerSide,
        "hand",
      );
      const selectedIds = this.selectedMulliganCardIds;
      const entries = handCards.map((card) => ({
        id: `mulligan:card:${card.cardId}`,
        kind: "card" as const,
        cardId: card.cardId,
        label: card.label,
        detail: buildAvailableMovesCardDetail(card),
        selected: selectedIds.includes(card.cardId),
      }));
      const categoryLabel = getMoveCategoryLabel("alterHand");

      return {
        mode: "resolution-target",
        categoryId: "alter-hand",
        categoryLabel,
        title: categoryLabel,
        message: m["sim.guidance.pregame.mulligan"]({}),
        entries,
        selectedTargetLabels: selectedIds
          .map((id) => this.cardSnapshotsById[id]?.label ?? "")
          .filter(Boolean),
        minimumSelections: 0,
        maximumSelections: handCards.length,
        canBack: false,
        canCancel: true,
        canConfirm: true,
      };
    }

    const resolutionSession = this.#resolutionSelectionSession;
    if (resolutionSession && resolutionSession.phase !== "executing") {
      const { context } = resolutionSession;
      const categoryLabel =
        resolutionSession.move.moveId === "resolveBag"
          ? m["sim.actions.label.resolveTriggeredAbility"]({})
          : m["sim.actions.label.resolveEffect"]({});
      const sourceCard = this.cardSnapshotsById[context.sourceCardId] ?? null;
      const sourceLabel = sourceCard?.label ?? "Pending effect";

      if (isTargetResolutionSelectionContext(context)) {
        const cardCandidateIds = this.#getResolutionSelectionCardCandidateIds(context);
        const playerEntries =
          this.boardSnapshot?.playerOrder.flatMap((playerId) => {
            if (!includesSelectionId(context.playerCandidateIds, playerId)) {
              return [];
            }

            const side =
              this.boardSnapshot &&
              getOwnerIdForSideFromBoard(this.boardSnapshot, "playerOne") === playerId
                ? "playerOne"
                : "playerTwo";
            const label =
              side === "playerOne"
                ? m["sim.player.side.playerOne"]({})
                : m["sim.player.side.playerTwo"]({});

            return [
              {
                id: `resolution:player:${playerId}`,
                kind: "player" as const,
                playerId,
                label,
                selected: resolutionSession.selectedTargets.includes(playerId),
              },
            ];
          }) ?? [];
        const cardEntries = cardCandidateIds.flatMap((cardId) => {
          const card = this.cardSnapshotsById[cardId] ?? null;
          return card
            ? [
                {
                  id: `resolution:card:${card.cardId}`,
                  kind: "card" as const,
                  cardId: card.cardId,
                  label: card.label,
                  detail: buildAvailableMovesCardDetail(card),
                  selected: resolutionSession.selectedTargets.includes(card.cardId),
                },
              ]
            : [];
        });
        const selectedTargetLabels = resolutionSession.selectedTargets.flatMap((targetId) => {
          const card = this.cardSnapshotsById[targetId] ?? null;
          if (card) {
            return [card.label];
          }

          if (includesSelectionId(context.playerCandidateIds, targetId)) {
            const side =
              this.boardSnapshot &&
              getOwnerIdForSideFromBoard(this.boardSnapshot, "playerOne") === targetId
                ? "playerOne"
                : "playerTwo";
            return [
              side === "playerOne"
                ? m["sim.player.side.playerOne"]({})
                : m["sim.player.side.playerTwo"]({}),
            ];
          }

          return [];
        });

        return {
          mode: "resolution-target",
          categoryId: "unknown",
          categoryLabel,
          title: sourceLabel,
          message: getPendingEffectDetail(context.kind),
          entries: [...playerEntries, ...cardEntries],
          selectedTargetLabels,
          minimumSelections: context.minSelections,
          maximumSelections: context.maxSelections,
          canBack: false,
          canCancel: true,
          canConfirm: this.canConfirmResolutionSelection,
        };
      }

      if (context.kind === "choice-selection") {
        return {
          mode: "resolution-choice",
          categoryId: "unknown",
          categoryLabel,
          title: sourceLabel,
          message: getPendingEffectDetail(context.kind),
          entries: context.options.map((option) => ({
            id: `resolution:choice:${option.index}`,
            kind: "option" as const,
            moveId: String(option.index),
            label: option.label,
            selected: resolutionSession.selectedChoiceIndex === option.index,
            disabled: !option.legal,
            disabledReason: option.legal ? undefined : "Unavailable",
          })),
          canBack: false,
          canCancel: true,
          canConfirm: this.canConfirmResolutionSelection,
        };
      }

      if (context.kind === "optional-selection") {
        return {
          mode: "resolution-optional",
          categoryId: "unknown",
          categoryLabel,
          title: sourceLabel,
          message: getPendingEffectDetail(context.kind),
          entries: [
            {
              id: "resolution:optional:accept",
              kind: "option",
              moveId: "accept",
              label: context.acceptLabel,
              selected: resolutionSession.selectedOptionalValue === true,
            },
            {
              id: "resolution:optional:reject",
              kind: "option",
              moveId: "reject",
              label: context.rejectLabel,
              selected: resolutionSession.selectedOptionalValue === false,
            },
          ],
          canBack: false,
          canCancel: true,
          canConfirm: this.canConfirmResolutionSelection,
        };
      }

      if (context.kind === "name-card-selection") {
        return {
          mode: "resolution-name-card",
          categoryId: "unknown",
          categoryLabel,
          title: sourceLabel,
          message: getPendingEffectDetail(context.kind),
          query: resolutionSession.namedCardQuery,
          selectedLabel: resolutionSession.selectedNamedCard,
          entries: this.resolutionSelectionNamedCardResults.map((result) => ({
            id: `resolution:named-card:${result.id}`,
            kind: "named-card",
            moveId: result.name,
            label: result.label,
            selected:
              resolutionSession.selectedNamedCard === result.name ||
              resolutionSession.namedCardQuery.trim() === result.label,
          })),
          canBack: false,
          canCancel: true,
          canConfirm: this.canConfirmResolutionSelection,
        };
      }

      if (context.kind === "scry-selection") {
        const entries = context.revealedCardIds.flatMap((cardId) => {
          const card = this.cardSnapshotsById[cardId] ?? null;
          const assignedRule = resolutionSession.scryDestinations.find((destination) =>
            destination.cards.includes(cardId),
          );
          return card
            ? [
                {
                  id: `resolution:scry-card:${card.cardId}`,
                  kind: "scry-card" as const,
                  cardId: card.cardId,
                  label: card.label,
                  detail: assignedRule ? `Assigned to ${assignedRule.zone}` : "Unassigned",
                  selected: assignedRule !== undefined,
                },
              ]
            : [];
        });

        return {
          mode: "resolution-scry",
          categoryId: "unknown",
          categoryLabel,
          title: sourceLabel,
          message: getPendingEffectDetail(context.kind),
          entries,
          destinations: context.destinationRules.map((rule) => {
            const destination = resolutionSession.scryDestinations.find(
              (candidate) => candidate.zone === rule.zone,
            );
            const cards = destination?.cards ?? [];
            const detail = `${cards.length}${rule.max !== null ? `/${rule.max}` : "+"} cards`;

            return {
              id: rule.id,
              zone: rule.zone,
              label: rule.zone,
              detail,
              cards: cards.flatMap((cardId) => {
                const card = this.cardSnapshotsById[cardId] ?? null;
                return card
                  ? [
                      {
                        id: `resolution:scry-destination:${rule.id}:${card.cardId}`,
                        kind: "scry-card" as const,
                        cardId: card.cardId,
                        label: card.label,
                        detail: buildAvailableMovesCardDetail(card),
                        selected: true,
                      },
                    ]
                  : [];
              }),
            };
          }),
          canBack: false,
          canCancel: true,
          canConfirm: this.canConfirmResolutionSelection,
        };
      }
    }

    const session = this.#actionSelectionSession;
    if (!session || session.phase === "idle" || session.phase === "executing") {
      return null;
    }

    const sourceCard = session.sourceCardId
      ? (this.cardSnapshotsById[session.sourceCardId] ?? null)
      : null;
    const targetCard = session.targetCardId
      ? (this.cardSnapshotsById[session.targetCardId] ?? null)
      : null;
    const currentMove = this.currentActionSelectionMove;
    const sourceCardLabel = sourceCard?.label ?? m["sim.card.unknown"]({});
    const confirmMessage = session.confirmationRequired
      ? m["sim.guidance.session.confirmWithHint"]({ label: session.label })
      : m["sim.guidance.session.confirm"]({ label: session.label });

    let entries: AvailableMovesSelectionEntry[] = [];
    let message = getChooseSourceStatusMessage(session.categoryId);

    if (session.phase === "choose-source") {
      entries = this.selectableActionSessionCardIds.flatMap((cardId) => {
        const card = this.cardSnapshotsById[cardId] ?? null;
        return card
          ? [
              {
                id: `available-moves:card:${card.cardId}`,
                kind: "card" as const,
                cardId: card.cardId,
                label: card.label,
                detail: buildAvailableMovesCardDetail(card),
                selected: session.sourceCardId === card.cardId,
              },
            ]
          : [];
      });
    } else if (session.phase === "choose-target") {
      message = getChooseTargetStatusMessage(session.categoryId, sourceCardLabel);
      entries = this.selectableActionSessionCardIds.flatMap((cardId) => {
        const card = this.cardSnapshotsById[cardId] ?? null;
        return card
          ? [
              {
                id: `available-moves:card:${card.cardId}`,
                kind: "card" as const,
                cardId: card.cardId,
                label: card.label,
                detail: buildAvailableMovesCardDetail(card),
                selected: session.targetCardId === card.cardId,
              },
            ]
          : [];
      });
    } else if (session.phase === "choose-option") {
      message = getChooseOptionStatusMessage(session, sourceCardLabel);
      entries = session.sourceCardId
        ? getSourceMovesForActionSelectionSession(session, session.sourceCardId).map((move) => ({
            id: `available-moves:option:${move.id}`,
            kind: "option" as const,
            moveId: move.id,
            label:
              move.presentation.kind === "targeted" ? move.presentation.optionLabel : move.label,
            detail: move.presentation.kind === "targeted" ? move.label : undefined,
            selected: session.selectedMoveId === move.id,
          }))
        : [];
    } else if (session.phase === "confirm") {
      message =
        session.categoryId === "challenge" && sourceCard && targetCard
          ? `${confirmMessage}\n${m["sim.actions.challengeVs"]({
              attacker: sourceCard.label,
              defender: targetCard.label,
            })}`
          : confirmMessage;
    }

    return {
      mode: "action",
      categoryId: session.categoryId,
      categoryLabel: session.label,
      phase: session.phase,
      title:
        session.phase === "choose-option" && sourceCard
          ? sourceCard.label
          : session.phase === "choose-target" && sourceCard
            ? sourceCard.label
            : session.label,
      message,
      entries,
      sourceCardId: session.sourceCardId,
      sourceLabel: sourceCard?.label ?? null,
      targetCardId: session.targetCardId,
      targetLabel: targetCard?.label ?? null,
      selectedMoveId: session.selectedMoveId,
      selectedMoveLabel: currentMove
        ? currentMove.presentation.kind === "targeted"
          ? currentMove.presentation.optionLabel
          : currentMove.label
        : null,
      canBack: session.phase !== "choose-source",
      canCancel: true,
      canConfirm: session.phase === "confirm" && currentMove !== null,
    };
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
    if (
      this.#resolutionSelectionSession &&
      isTargetResolutionSelectionContext(this.#resolutionSelectionSession.context) &&
      this.invalidActionSessionCardIds.includes(cardId)
    ) {
      return "This card is not a valid target for the current effect.";
    }

    if (
      this.#actionSelectionSession?.categoryId === "play-card" &&
      this.#actionSelectionSession.phase === "choose-target" &&
      this.invalidActionSessionCardIds.includes(cardId)
    ) {
      return "This card is not a valid target for this action.";
    }

    return this.#game.invalidChallengeTargetReasons()[cardId] ?? null;
  }

  getCardActionViews = (card: LorcanaCardSnapshot): CardActionView[] =>
    buildCardActionViews({
      card,
      executableMoves: this.#game.expandCardMoves(card.cardId),
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

    return this.handleCardActionClick(action, { skipConfirmation: true });
  };

  handleCardActionClick = (
    action: CardActionView,
    options?: { skipConfirmation?: boolean; preselectedTargetCardId?: string },
  ): boolean => {
    if (!action.enabled || action.moves.length === 0) {
      return false;
    }

    const requireConfirmation = !this.skipActionConfirmation && !options?.skipConfirmation;

    if (action.categoryId === "challenge") {
      const session = buildActionSelectionSession(
        action.categoryId,
        action.moves,
        requireConfirmation,
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
        requireConfirmation,
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
        requireConfirmation,
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

    if (
      action.categoryId === "play-card" &&
      usesTargetSelectionForActionSelectionMoves(action.categoryId, action.moves)
    ) {
      const session = buildActionSelectionSession(
        action.categoryId,
        action.moves,
        requireConfirmation,
      );
      if (!session) {
        return false;
      }

      const preselectedMove = options?.preselectedTargetCardId
        ? (action.moves.find(
            (move) =>
              getTargetCardIdForActionSelectionMove(action.categoryId, move) ===
              options.preselectedTargetCardId,
          ) ?? null)
        : null;
      const nextSession = {
        ...session,
        sourceCardId: action.cardId,
        targetCardId:
          preselectedMove && options?.preselectedTargetCardId
            ? options.preselectedTargetCardId
            : null,
        selectedMoveId: preselectedMove?.id ?? null,
        phase: preselectedMove
          ? session.confirmationRequired
            ? "confirm"
            : "executing"
          : "choose-target",
      } satisfies ActionSelectionSession;

      this.pendingMulliganDangerConfirm = null;
      this.#secondLayerCategoryLabel = null;
      this.#game.setPendingError(null);

      if (preselectedMove) {
        if (session.confirmationRequired) {
          this.#setActionSelectionSession(nextSession);
          this.#game.setStatusMessage(
            m["sim.guidance.session.confirm"]({ label: preselectedMove.label }),
          );
          return true;
        }

        return this.#executeActionSelectionMove(nextSession, preselectedMove);
      }

      this.#setActionSelectionSession(nextSession);
      this.#game.setStatusMessage(
        getChooseTargetStatusMessage(
          action.categoryId,
          this.cardSnapshotsById[action.cardId]?.label ?? m["sim.card.unknown"]({}),
        ),
      );
      return true;
    }

    if (
      (action.categoryId === "play-card" ||
        action.categoryId === "shift-card" ||
        action.categoryId === "sing-card") &&
      action.moves.length > 1
    ) {
      const session = buildActionSelectionSession(
        action.categoryId,
        action.moves,
        requireConfirmation,
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

  openPlayCardSelection = (cardId: string, options?: { targetCardId?: string }): boolean => {
    const card = this.cardSnapshotsById[cardId];
    if (!card) {
      return false;
    }

    const action = this.getCardActionViews(card).find(
      (candidateAction) => candidateAction.categoryId === "play-card",
    );
    if (!action) {
      return false;
    }

    return this.handleCardActionClick(
      action,
      options?.targetCardId ? { preselectedTargetCardId: options.targetCardId } : {},
    );
  };

  #setActionSelectionSession(nextSession: ActionSelectionSession | null): void {
    this.#actionSelectionSession = nextSession;
    if (nextSession) {
      this.#resolutionSelectionSession = null;
    }
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
    const resolutionSession = this.#resolutionSelectionSession;
    if (resolutionSession && isTargetResolutionSelectionContext(resolutionSession.context)) {
      const selectedCount = resolutionSession.selectedTargets.length;
      const minSelections = resolutionSession.context.minSelections;
      const maxSelections = resolutionSession.context.maxSelections;
      const message =
        maxSelections > 1
          ? `Select ${minSelections === maxSelections ? maxSelections : `${minSelections}-${maxSelections}`} valid target${maxSelections === 1 ? "" : "s"} for this effect.`
          : "Select a valid target for this effect.";

      return [
        {
          id: "resolution-selection-inline",
          message,
          actions: [
            {
              id: "resolution-selection-cancel",
              label: m["sim.actions.cancel"]({}),
              onClick: this.cancelResolutionSelectionSession,
            },
            {
              id: "resolution-selection-confirm",
              label: `${m["sim.actions.confirm"]({})}${selectedCount > 0 ? ` (${selectedCount})` : ""}`,
              onClick: this.confirmResolutionSelection,
              disabled: !this.canConfirmResolutionSelection,
              emphasis: true,
            },
          ],
          mode: "default",
          order: 2,
        },
      ];
    }

    if (resolutionSession && resolutionSession.context.kind === "optional-selection") {
      return [
        {
          id: "resolution-optional-inline",
          message: getPendingEffectDetail(resolutionSession.context.kind),
          actions: [
            {
              id: "resolution-optional-accept",
              label: resolutionSession.context.acceptLabel,
              onClick: () => {
                this.selectResolutionOptional(true);
              },
              emphasis: resolutionSession.selectedOptionalValue === true,
            },
            {
              id: "resolution-optional-reject",
              label: resolutionSession.context.rejectLabel,
              onClick: () => {
                this.selectResolutionOptional(false);
              },
              emphasis: resolutionSession.selectedOptionalValue === false,
            },
            {
              id: "resolution-optional-cancel",
              label: m["sim.actions.cancel"]({}),
              onClick: this.cancelResolutionSelectionSession,
            },
            {
              id: "resolution-optional-confirm",
              label: m["sim.actions.confirm"]({}),
              onClick: this.confirmResolutionSelection,
              disabled: !this.canConfirmResolutionSelection,
              emphasis: true,
            },
          ],
          mode: "default",
          order: 2,
        },
      ];
    }

    if (resolutionSession && resolutionSession.context.kind === "choice-selection") {
      return [
        {
          id: "resolution-choice-inline",
          message: getPendingEffectDetail(resolutionSession.context.kind),
          actions: [
            ...resolutionSession.context.options.map(
              (option) =>
                ({
                  id: `resolution-choice-option:${option.index}`,
                  label: option.label,
                  onClick: () => {
                    this.selectResolutionChoice(option.index);
                  },
                  disabled: !option.legal,
                  emphasis: resolutionSession.selectedChoiceIndex === option.index,
                }) satisfies GuidanceAction,
            ),
            {
              id: "resolution-choice-cancel",
              label: m["sim.actions.cancel"]({}),
              onClick: this.cancelResolutionSelectionSession,
            },
            {
              id: "resolution-choice-confirm",
              label: m["sim.actions.confirm"]({}),
              onClick: this.confirmResolutionSelection,
              disabled: !this.canConfirmResolutionSelection,
              emphasis: true,
            },
          ],
          mode: "default",
          order: 2,
        },
      ];
    }

    if (resolutionSession && resolutionSession.context.kind === "name-card-selection") {
      return [
        {
          id: "resolution-name-card-inline",
          message: m["sim.actions.nameCardPrompt"]({}),
          namedCardSearch: {
            query: resolutionSession.namedCardQuery,
            results: this.resolutionSelectionNamedCardResults.map((result) => ({
              id: result.id,
              label: result.label,
              name: result.name,
              selected:
                resolutionSession.selectedNamedCard === result.name ||
                resolutionSession.namedCardQuery.trim() === result.label,
            })),
            oninput: this.updateResolutionNamedCardQuery,
            onselect: this.chooseResolutionNamedCard,
          },
          actions: [
            {
              id: "resolution-name-card-cancel",
              label: m["sim.actions.cancel"]({}),
              onClick: this.cancelResolutionSelectionSession,
            },
            {
              id: "resolution-name-card-confirm",
              label: m["sim.actions.confirm"]({}),
              onClick: this.confirmResolutionSelection,
              disabled: !this.canConfirmResolutionSelection,
              emphasis: true,
            },
          ],
          mode: "default",
          order: 2,
        },
      ];
    }

    const session = this.#actionSelectionSession;
    if (!session) {
      const actionableItems = this.pendingEffectsPopoverItems.filter(
        (item) =>
          (item.canResolve && item.onResolve) ||
          (item.canAccept && item.onAccept) ||
          (item.canReject && item.onReject),
      );
      if (actionableItems.length > 0) {
        return actionableItems.map((item) => ({
          id: `resolve-pending:${item.id}`,
          message: item.title,
          actions: [
            ...(item.canResolve && item.onResolve
              ? [
                  {
                    id: `resolve-pending-action:${item.id}`,
                    label:
                      item.kind === "bag"
                        ? m["sim.actions.label.resolveTriggeredAbility"]({})
                        : m["sim.actions.label.resolveEffect"]({}),
                    onClick: item.onResolve,
                    emphasis: true,
                  } satisfies GuidanceAction,
                ]
              : []),
            ...(item.canAccept && item.onAccept
              ? [
                  {
                    id: `resolve-pending-accept:${item.id}`,
                    label: m["sim.actions.label.acceptEffect"]({}),
                    onClick: item.onAccept,
                    emphasis: true,
                  } satisfies GuidanceAction,
                ]
              : []),
            ...(item.canReject && item.onReject
              ? [
                  {
                    id: `resolve-pending-reject:${item.id}`,
                    label: m["sim.actions.label.declineEffect"]({}),
                    onClick: item.onReject,
                  } satisfies GuidanceAction,
                ]
              : []),
          ],
          mode: "default" as const,
          order: 2,
        }));
      }
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

    if (
      session.phase === "choose-option" &&
      (session.categoryId === "play-card" ||
        session.categoryId === "shift-card" ||
        session.categoryId === "sing-card") &&
      sourceCard
    ) {
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
        : getChooseTargetStatusMessage(
            session.categoryId,
            sourceCard?.label ?? m["sim.card.unknown"]({}),
          );

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

  get canConfirmResolutionSelection(): boolean {
    const session = this.#resolutionSelectionSession;
    if (!session || session.phase === "executing") {
      return false;
    }

    const { context } = session;
    if (context.kind === "choice-selection") {
      return (
        typeof session.selectedChoiceIndex === "number" &&
        context.options.some(
          (option) => option.index === session.selectedChoiceIndex && option.legal,
        )
      );
    }

    if (context.kind === "optional-selection") {
      return typeof session.selectedOptionalValue === "boolean";
    }

    if (context.kind === "name-card-selection") {
      return (
        (session.selectedNamedCard?.trim().length ?? 0) > 0 ||
        (session.namedCardQuery.trim().length > 0 &&
          this.resolutionSelectionNamedCardResults.some(
            (result) =>
              result.label === session.namedCardQuery.trim() ||
              result.name === session.namedCardQuery.trim(),
          ))
      );
    }

    if (isTargetResolutionSelectionContext(context)) {
      // Validate that all selected targets are still valid candidates
      const validSelections = session.selectedTargets.filter(
        (targetId) =>
          includesSelectionId(this.#getResolutionSelectionCardCandidateIds(context), targetId) ||
          includesSelectionId(context.playerCandidateIds, targetId),
      );
      const selectionCount = validSelections.length;
      return (
        selectionCount >= context.minSelections &&
        (context.maxSelections <= 0 || selectionCount <= context.maxSelections)
      );
    }

    if (context.kind === "scry-selection") {
      const assignedIds = new Set(
        session.scryDestinations.flatMap((destination) => destination.cards),
      );
      if (assignedIds.size !== context.revealedCardIds.length) {
        return false;
      }

      return context.destinationRules.every((rule) => {
        const destination = session.scryDestinations.find(
          (candidate) => candidate.zone === rule.zone,
        );
        const count = destination?.cards.length ?? 0;
        if (count < rule.min) {
          return false;
        }

        if (rule.max !== null && count > rule.max) {
          return false;
        }

        return true;
      });
    }

    return false;
  }

  startResolutionSelectionSession = (
    move: PendingResolutionMoveEntry,
    context: ResolutionSelectionContext,
  ): boolean => {
    this.#actionSelectionSession = null;
    this.#resolutionSelectionSession = buildResolutionSelectionSession(move, context);
    this.pendingMulliganDangerConfirm = null;
    this.#secondLayerCategoryLabel = null;
    this.#game.setPendingError(null);
    this.#game.setStatusMessage(
      isTargetResolutionSelectionContext(context)
        ? `Select target${context.maxSelections === 1 ? "" : "s"} for this effect.`
        : context.kind === "choice-selection"
          ? "Choose how this effect resolves."
          : context.kind === "optional-selection"
            ? "Choose whether to resolve this optional effect."
            : context.kind === "name-card-selection"
              ? "Name a card to continue resolving this effect."
              : context.kind === "scry-selection"
                ? "Arrange the revealed cards to finish resolving this effect."
                : "Finish choosing how this effect resolves.",
    );
    return true;
  };

  cancelResolutionSelectionSession = (): void => {
    const session = this.#resolutionSelectionSession;
    if (!session) {
      return;
    }

    const sessionKey = this.#buildAutoOpenResolutionKey(session.move, session.context);
    if (sessionKey) {
      this.#lastHandledAutoOpenResolutionKey = sessionKey;
    }
    this.#resolutionSelectionSession = null;
    this.#game.setPendingError(null);
    this.#game.setStatusMessage(m["sim.status.selectionCleared"]({}));
  };

  toggleResolutionTargetSelection = (targetId: string): boolean => {
    const session = this.#resolutionSelectionSession;
    if (!session || !isTargetResolutionSelectionContext(session.context)) {
      return false;
    }

    const isCandidate =
      includesSelectionId(
        this.#getResolutionSelectionCardCandidateIds(session.context),
        targetId,
      ) || includesSelectionId(session.context.playerCandidateIds, targetId);
    if (!isCandidate) {
      return false;
    }

    const isSelected = session.selectedTargets.includes(targetId);
    const isAtMaxCapacity =
      session.context.maxSelections > 0 &&
      session.selectedTargets.length >= session.context.maxSelections;

    const nextSelectedTargets = isSelected
      ? session.selectedTargets.filter((selectedTargetId) => selectedTargetId !== targetId)
      : session.context.maxSelections === 1
        ? [targetId]
        : isAtMaxCapacity
          ? [...session.selectedTargets.slice(1), targetId]
          : [...session.selectedTargets, targetId];

    this.#resolutionSelectionSession = {
      ...session,
      selectedTargets: nextSelectedTargets,
    };
    this.#game.setPendingError(null);
    return true;
  };

  selectResolutionChoice = (choiceIndex: number): boolean => {
    const session = this.#resolutionSelectionSession;
    if (!session || session.context.kind !== "choice-selection") {
      return false;
    }

    const option = session.context.options.find((candidate) => candidate.index === choiceIndex);
    if (!option || !option.legal) {
      return false;
    }

    this.#resolutionSelectionSession = {
      ...session,
      selectedChoiceIndex: choiceIndex,
    };
    this.#game.setPendingError(null);
    return true;
  };

  updateResolutionNamedCardQuery = (query: string): void => {
    const session = this.#resolutionSelectionSession;
    if (!session || session.context.kind !== "name-card-selection") {
      return;
    }

    this.#resolutionSelectionSession = {
      ...session,
      namedCardQuery: query,
      selectedNamedCard:
        session.selectedNamedCard &&
        (session.selectedNamedCard === query ||
          session.selectedNamedCard.toLowerCase() === query.trim().toLowerCase())
          ? session.selectedNamedCard
          : null,
    };
  };

  chooseResolutionNamedCard = (cardName: string, displayLabel: string): void => {
    const session = this.#resolutionSelectionSession;
    if (!session || session.context.kind !== "name-card-selection") {
      return;
    }

    this.#resolutionSelectionSession = {
      ...session,
      namedCardQuery: displayLabel,
      selectedNamedCard: cardName,
    };
    this.#game.setPendingError(null);
  };

  selectResolutionOptional = (value: boolean): boolean => {
    const session = this.#resolutionSelectionSession;
    if (!session || session.context.kind !== "optional-selection") {
      return false;
    }

    this.#resolutionSelectionSession = {
      ...session,
      selectedOptionalValue: value,
    };
    this.#game.setPendingError(null);
    return true;
  };

  assignResolutionScryCard = (cardId: string, zone: string): boolean => {
    const session = this.#resolutionSelectionSession;
    if (!session || session.context.kind !== "scry-selection") {
      return false;
    }

    const rule = session.context.destinationRules.find((candidate) => candidate.zone === zone);
    if (!rule || !includesSelectionId(session.context.revealedCardIds, cardId)) {
      return false;
    }

    const nextDestinations = session.scryDestinations.map((destination) => ({
      ...destination,
      cards: destination.cards.filter((existingCardId) => existingCardId !== cardId),
    }));
    const targetDestination = nextDestinations.find((destination) => destination.zone === zone);
    if (!targetDestination) {
      return false;
    }

    if (rule.max !== null && targetDestination.cards.length >= rule.max) {
      return false;
    }

    targetDestination.cards = [...targetDestination.cards, cardId];
    this.#resolutionSelectionSession = {
      ...session,
      scryDestinations: nextDestinations,
    };
    this.#game.setPendingError(null);
    return true;
  };

  reorderResolutionScryCard = (zone: string, cardId: string, direction: "up" | "down"): boolean => {
    const session = this.#resolutionSelectionSession;
    if (!session || session.context.kind !== "scry-selection") {
      return false;
    }

    const nextDestinations = session.scryDestinations.map((destination) => ({
      ...destination,
      cards: [...destination.cards],
    }));
    const targetDestination = nextDestinations.find((destination) => destination.zone === zone);
    if (!targetDestination) {
      return false;
    }

    const currentIndex = targetDestination.cards.indexOf(cardId);
    if (currentIndex < 0) {
      return false;
    }

    const nextIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;
    if (nextIndex < 0 || nextIndex >= targetDestination.cards.length) {
      return false;
    }

    const [removed] = targetDestination.cards.splice(currentIndex, 1);
    targetDestination.cards.splice(nextIndex, 0, removed);
    this.#resolutionSelectionSession = {
      ...session,
      scryDestinations: nextDestinations,
    };
    return true;
  };

  confirmResolutionSelection = (): boolean => {
    const session = this.#resolutionSelectionSession;
    if (!session || !this.canConfirmResolutionSelection) {
      return false;
    }

    this.#resolutionSelectionSession = {
      ...session,
      phase: "executing",
    };

    const nestedParams =
      session.context.kind === "choice-selection"
        ? { choiceIndex: session.selectedChoiceIndex ?? undefined }
        : session.context.kind === "optional-selection"
          ? { resolveOptional: session.selectedOptionalValue ?? undefined }
          : session.context.kind === "name-card-selection"
            ? {
                namedCard:
                  session.selectedNamedCard ??
                  this.resolutionSelectionNamedCardResults.find(
                    (result) =>
                      result.label === session.namedCardQuery.trim() ||
                      result.name === session.namedCardQuery.trim(),
                  )?.name ??
                  session.namedCardQuery.trim(),
              }
            : session.context.kind === "scry-selection"
              ? {
                  destinations: session.scryDestinations.map((destination) => ({
                    zone: destination.zone,
                    cards: [...destination.cards],
                  })),
                }
              : { targets: [...session.selectedTargets] };

    const params =
      session.move.moveId === "resolveBag"
        ? (mergeNestedResolveBagParams(
            session.move.params,
            nestedParams,
          ) as LorcanaSimulatorMoveParams["resolveBag"])
        : (mergeNestedResolveEffectParams(
            session.move.params,
            nestedParams,
          ) as LorcanaSimulatorMoveParams["resolveEffect"]);

    const success = this.#game.executeMove(session.move.moveId, params, {
      clearChallengeMode: false,
      clearSelection: false,
      status: "Resolved effect input",
    });

    this.#resolutionSelectionSession = success ? null : { ...session, phase: "selecting" };
    return success;
  };

  handleResolveBag = (move: PendingResolutionMoveEntry): void => {
    if (move.moveId !== "resolveBag") {
      return;
    }

    const bagEffect =
      this.boardSnapshot?.bagEffects.find((effect) => effect.id === move.params.bagId) ?? null;
    if (bagEffect?.selectionContext) {
      this.startResolutionSelectionSession(move, bagEffect.selectionContext);
      return;
    }

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

    const pendingEffect =
      this.boardSnapshot?.pendingEffects.find((effect) => effect.id === move.params.effectId) ??
      null;
    if (pendingEffect?.selectionContext) {
      this.startResolutionSelectionSession(move, pendingEffect.selectionContext);
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

  clearMulliganSelectionIfInvalid = (): void => {
    if (this.#mulliganSelectionActive) {
      const hasMulligan = this.moveCategorySummaries.some((s) => s.categoryId === "alter-hand");
      if (!hasMulligan) {
        this.#mulliganSelectionActive = false;
      }
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
    if (this.#mulliganSelectionActive) {
      this.#mulliganSelectionActive = false;
      this.#game.setSelectedMulliganCardIds([]);
      this.#game.setStatusMessage(m["sim.status.selectionCleared"]({}));
      return;
    }

    if (this.#resolutionSelectionSession) {
      this.cancelResolutionSelectionSession();
      return;
    }

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
    if (
      card &&
      this.#resolutionSelectionSession &&
      isTargetResolutionSelectionContext(this.#resolutionSelectionSession.context)
    ) {
      return this.toggleResolutionTargetSelection(card.cardId);
    }

    const session = this.#actionSelectionSession;
    if (!card || !session) {
      return false;
    }

    if (session.phase === "choose-source") {
      const sourceMoves = getSourceMovesForActionSelectionSession(session, card.cardId);
      if (sourceMoves.length === 0) {
        return false;
      }

      if (usesTargetSelectionForActionSelectionMoves(session.categoryId, sourceMoves)) {
        this.#setActionSelectionSession({
          ...session,
          sourceCardId: card.cardId,
          targetCardId: null,
          selectedMoveId: null,
          phase: "choose-target",
        });
        this.#game.setPendingError(null);
        this.#game.setStatusMessage(getChooseTargetStatusMessage(session.categoryId, card.label));
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

      if (
        (session.categoryId === "play-card" ||
          session.categoryId === "shift-card" ||
          session.categoryId === "sing-card") &&
        sourceMoves.length > 1
      ) {
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
          this.getActionSessionCardReason(card.cardId) ?? "This card is not a valid target.",
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

  handleAvailableMovesSelectionCard = (cardId: string): boolean => {
    if (this.#mulliganSelectionActive) {
      const current = this.selectedMulliganCardIds;
      const next = current.includes(cardId)
        ? current.filter((id) => id !== cardId)
        : [...current, cardId];
      this.#game.setSelectedMulliganCardIds(next);
      return true;
    }
    return this.handleActionSessionCardSelection(this.cardSnapshotsById[cardId] ?? null);
  };

  handleAvailableMovesSelectionPlayer = (playerId: string): boolean => {
    if (!this.#resolutionSelectionSession) {
      return false;
    }

    return this.toggleResolutionTargetSelection(playerId);
  };

  handleAvailableMovesSelectionOption = (moveId: string): boolean =>
    this.#resolutionSelectionSession
      ? this.#resolutionSelectionSession.context.kind === "choice-selection"
        ? this.selectResolutionChoice(Number(moveId))
        : this.#resolutionSelectionSession.context.kind === "optional-selection"
          ? this.selectResolutionOptional(moveId === "accept")
          : false
      : this.selectActionSelectionOption(moveId);

  handleAvailableMovesNamedCardQueryInput = (query: string): void => {
    this.updateResolutionNamedCardQuery(query);
  };

  handleAvailableMovesNamedCardSelection = (cardName: string): boolean => {
    const result = this.resolutionSelectionNamedCardResults.find(
      (candidate) => candidate.name === cardName,
    );
    if (!result) {
      return false;
    }

    this.chooseResolutionNamedCard(result.name, result.label);
    return true;
  };

  handleAvailableMovesScryAssignment = (cardId: string, zone: string): boolean =>
    this.assignResolutionScryCard(cardId, zone);

  handleAvailableMovesScryReorder = (
    zone: string,
    cardId: string,
    direction: "up" | "down",
  ): boolean => this.reorderResolutionScryCard(zone, cardId, direction);

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
    if (this.#resolutionSelectionSession) {
      this.cancelResolutionSelectionSession();
      return;
    }

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
      this.#game.setStatusMessage(getChooseSourceStatusMessage(session.categoryId));
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
      if (
        session.sourceCardId &&
        usesTargetSelectionForActionSelectionMoves(
          session.categoryId,
          getSourceMovesForActionSelectionSession(session, session.sourceCardId),
        )
      ) {
        this.#setActionSelectionSession({
          ...session,
          phase: "choose-target",
          targetCardId: null,
          selectedMoveId: null,
        });
        this.#game.setStatusMessage(
          getChooseTargetStatusMessage(
            session.categoryId,
            this.cardSnapshotsById[session.sourceCardId]?.label ?? m["sim.card.unknown"]({}),
          ),
        );
        return;
      }

      if (
        (session.categoryId === "play-card" ||
          session.categoryId === "shift-card" ||
          session.categoryId === "sing-card") &&
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
    if (this.#mulliganSelectionActive) {
      this.#mulliganSelectionActive = false;
      this.handleConfirmMulligan();
      return true;
    }

    if (this.#resolutionSelectionSession) {
      return this.confirmResolutionSelection();
    }

    const session = this.#actionSelectionSession;
    const move = this.currentActionSelectionMove;
    if (!session || !move) {
      return false;
    }

    return this.#executeActionSelectionMove(session, move);
  };

  confirmManualCardActionSelection = (): boolean => this.confirmActionSelection();

  handleAvailableMoveClick = (move: ExecutableMoveEntry): void => {
    if (move.moveId === "alterHand") {
      this.#mulliganSelectionActive = true;
      this.#setActionSelectionSession(null);
      this.#game.setSelectedMulliganCardIds([]);
      this.#game.setPendingError(null);
      this.#game.setStatusMessage(m["sim.guidance.pregame.mulligan"]({}));
      return;
    }

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

  get hasPendingEffects(): boolean {
    return this.pendingEffectsPopoverItems.length > 0;
  }

  get canAdvancePendingEffects(): boolean {
    return this.pendingEffectsPopoverItems.some((item) =>
      Boolean(item.onPrimaryAction || (item.canResolve && item.onResolve)),
    );
  }

  handleAdvancePendingEffects = (): boolean => {
    const nextActionableItem =
      this.pendingEffectsPopoverItems.find((item) => item.onPrimaryAction) ??
      this.pendingEffectsPopoverItems.find((item) => item.canResolve && item.onResolve) ??
      null;

    if (!nextActionableItem) {
      return false;
    }

    if (nextActionableItem.onPrimaryAction) {
      nextActionableItem.onPrimaryAction();
      return true;
    }

    nextActionableItem.onResolve?.();
    return true;
  };

  get canConcede(): boolean {
    return this.moveCategorySummaries.some((summary) => summary.categoryId === "concede");
  }

  handleMobileConcede = (): boolean => {
    const concedeMove = this.expandCategoryMoves("concede")[0] ?? null;
    if (!concedeMove) {
      this.#game.setStatusMessage(m["sim.status.actionRejected"]({}));
      return false;
    }

    this.#setActionSelectionSession(null);
    this.#game.setPendingError(null);

    return this.#game.executeMove(concedeMove.moveId, concedeMove.params ?? {}, {
      clearChallengeMode: true,
      clearSelection: true,
      status: concedeMove.label,
    });
  };

  handleMobileReportPlayer = (): void => {
    const message = "Player reporting is not available yet.";
    this.mobileNotice = {
      id: ++this.#mobileNoticeId,
      message,
      tone: "info",
    };
    this.#game.setPendingError(null);
    this.#game.setStatusMessage(message);
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

  handleCardPreviewModeChange = (mode: CardPreviewMode): void => {
    this.cardPreviewMode = mode;
    localStorage.setItem(CARD_PREVIEW_DELAY_STORAGE_KEY, mode);
  };

  handlePrimaryClickActionChange = (action: PrimaryClickAction): void => {
    this.primaryClickAction = action;
    localStorage.setItem(PRIMARY_CLICK_ACTION_STORAGE_KEY, action);
  };

  handleAnimationSpeedChange = (speed: AnimationSpeed): void => {
    this.animationSpeed = speed;
    this.#game.setAnimationSpeed(speed);
    localStorage.setItem(ANIMATION_SPEED_STORAGE_KEY, speed);
  };

  handleSoundVolumeChange = (volume: number): void => {
    if (!Number.isFinite(volume)) return;
    this.soundVolume = Math.max(0, Math.min(100, Math.round(volume)));
    this.#game.setSoundVolume(this.soundVolume);
    localStorage.setItem(SOUND_VOLUME_STORAGE_KEY, String(this.soundVolume));
  };

  handleGuidancePositionToggle = (): void => {
    this.guidancePosition = this.guidancePosition === "bottom" ? "top" : "bottom";
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
    presenter.syncAutoOpenPendingResolution();
  });

  $effect(() => {
    presenter.clearMulliganSelectionIfInvalid();
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
