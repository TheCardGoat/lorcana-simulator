import { getContext, hasContext, onDestroy, onMount, setContext, untrack } from "svelte";
import { getLocale, locales, setLocale } from "$lib/paraglide/runtime.js";
import { m } from "$lib/i18n/messages.js";
import { getApiOrigin } from "$lib/config/public-url-config.js";
import { searchCardsByName } from "@tcg/lorcana-cards/data";
import type {
  AvailableMove,
  CardInstanceId,
  ChallengePreviewResult,
  EnginePacketUpdate,
  LorcanaCardDefinition,
  ResolutionSelectionContext,
  ResolutionSelectionDestinationRule,
  ResolutionSelectionRevealedCard,
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
  mergeSupplementalScryCardSnapshots,
} from "@/features/simulator/model/board-utils.js";
import {
  getBagEffectPayloadMeta,
  getPendingEffectPayloadMeta,
  getResolutionEffectInstanceReferences,
  type EffectInstanceReferenceMeta,
} from "@/features/simulator/model/pending-effect-payload.js";
import {
  buildResolutionTargetPromptState,
  getResolutionTargetPromptMessage,
  isSupportedResolutionTargetEffectType,
  type SupportedResolutionTargetEffectType,
} from "@/features/simulator/model/resolution-target-prompt.js";
import {
  buildResolutionCopyBundle,
  getResolutionInteractionStatusMessage,
} from "@/features/simulator/model/resolution-copy.js";
import {
  canAssignCardToScryDestination,
  getScryDestinationConstraintSummary,
  getScryZoneLabel,
  isScryDestinationManuallyOrdered,
} from "@/features/simulator/model/scry-destinations.js";
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
  expandCardActionCategoryMoves,
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
  type LorcanaPlayerVisualSettings,
  type LorcanaResolvedPlayerVisualSettings,
} from "@/features/simulator/model/player-visual-settings.js";
import { LorcanaBoardPresenter } from "@/features/simulator/presenters/board-presenter.svelte.js";
import type {
  ActivePlayerGuidanceController,
  ActivePlayerGuidanceItem,
  GuidanceAction,
  GuidanceInlineReference,
  GuidancePosition,
  NamedCardSearchState,
} from "@/features/simulator/model/active-player-guidance.js";
import { buildResolutionAmountSelectionState } from "@/features/simulator/model/resolution-amount-selection.js";
import type {
  BoardAnchorSnapshot,
  BoardAnchorRect,
  BoardLocalRect,
  ResolvedBoardMoveAnimation,
  SimulatorDebugAnimationPlayer,
  SimulatorDebugAnimationRequest,
} from "@/features/simulator/animations/board-move-animations.js";
import {
  BOARD_CENTER_ANCHOR_ID,
  VARIANT_DURATION_MS,
  createCardAnchorId,
  createInkwellEntryAnchorId,
  createSeatHandAnchorId,
  createZoneAnchorId,
  deriveQueuedBoardMoveAnimationsFromPacket,
  getAnimationSpeedMultiplier,
} from "@/features/simulator/animations/board-move-animations.js";
import {
  createLoreBadgeAnchorId,
  deriveQueuedQuestAnimationsFromPacket,
  type ResolvedQuestAnimation,
} from "@/features/simulator/animations/quest-animations.js";
import {
  deriveQueuedChallengeAnimationsFromPacket,
  type ResolvedChallengeAnimation,
} from "@/features/simulator/animations/challenge-animations.js";
import {
  deriveQueuedOverlayAnnouncementsFromPacket,
  type ResolvedOverlayAnnouncement,
} from "@/features/simulator/animations/overlay-announcement-animations.js";
import {
  deriveQueuedCardEffectAnimationsFromPacket,
  type ResolvedCardEffectAnimation,
} from "@/features/simulator/animations/card-effect-animations.js";
import {
  deriveQueuedPlayerEffectAnimationsFromPacket,
  type QueuedPlayerEffectAnimation,
} from "@/features/simulator/animations/player-effect-animations.js";
import {
  AnimationOrchestrator,
  type BoardAnimationPlaceholder,
} from "@/features/simulator/animations/animation-orchestrator.svelte.js";
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
const HOTKEYS_ENABLED_STORAGE_KEY = "lorcana.simulator.hotkeysEnabled";
const CARD_PREVIEW_DELAY_STORAGE_KEY = "lorcana.simulator.cardPreviewDelay";
const PRIMARY_CLICK_ACTION_STORAGE_KEY = "lorcana.simulator.primaryClickAction";
const ANIMATION_SPEED_STORAGE_KEY = "lorcana.simulator.animationSpeed";
const SOUND_VOLUME_STORAGE_KEY = "lorcana.simulator.soundVolume";
const ACCESSIBLE_MOBILE_CONTROLS_STORAGE_KEY = "lorcana.simulator.accessibleMobileControls";

export type CardPreviewMode = "disabled" | "immediate" | "delayed";
export type PrimaryClickAction = "challenge" | "quest" | "none";
export type AnimationSpeed = "fast" | "normal" | "slow";
export type HotkeyMode = "off" | "confirm-only" | "on";

export const ANIMATION_SPEED_MS: Record<AnimationSpeed, number> = {
  fast: 500,
  normal: 1000,
  slow: 1500,
};

// Challenge animations include a result panel that requires more time to read.
// These durations are longer than the base ANIMATION_SPEED_MS values.
export const CHALLENGE_ANIMATION_DURATION_MS: Record<AnimationSpeed, number> = {
  fast: 1800,
  normal: 2500,
  slow: 3200,
};

export const QUEST_ROTATION_DURATION_MS: Record<AnimationSpeed, number> = {
  fast: 250,
  normal: 400,
  slow: 600,
};

const SECOND_LAYER_GUIDANCE_ID = "available-moves-second-layer";

type BoardAnimationBatch = ResolvedBoardMoveAnimation[];

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
  secondaryTitle?: string;
  summaryTitle?: string;
  subtitle: string;
  detail: string;
  badge: string;
  card: LorcanaCardSnapshot | null;
  instanceReferences?: PendingEffectCardReferenceView[];
  isActive?: boolean;
  isLocalPlayer?: boolean;
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

export interface PendingEffectCardReferenceView {
  id: string;
  label: string;
  cardId: string;
  card: LorcanaCardSnapshot | null;
}

export interface LorcanaGameContextValue {
  boardSnapshot: () => LorcanaProjectedBoardView | null;
  cardSnapshotsById: () => CardSnapshotMap;
  resolveCardSnapshot: (cardId: string) => LorcanaCardSnapshot | null;
  getPlayerSummary: (side: LorcanaPlayerSide) => LorcanaPlayerSummary | null;
  executableMoves: () => ExecutableMoveEntry[];
  moveCategorySummaries: () => MoveCategorySummary[];
  moveCategoryCount: () => number;
  expandCardMoves: (cardId: string) => ExecutableMoveEntry[];
  expandCardActionCategoryMoves: (
    cardId: string,
    categoryId: ExecutableMovePresentationCategoryId,
  ) => ExecutableMoveEntry[];
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
  activePlayerEffectTargets: () => ReadonlySet<LorcanaPlayerSide>;
  boardAnimationPlaceholders: () => BoardAnimationPlaceholder[];
  inFlightCardIds: () => ReadonlySet<string>;
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
  canMoveCharacterToLocation: (characterId: string, locationId: string) => boolean;
  canDropHandCardIntoZone: (
    cardId: string,
    zoneId: Extract<LorcanaZoneId, "play" | "inkwell">,
  ) => boolean;
  shouldOpenPlayCardSelectionOnDrop: (cardId: string) => boolean;
  handleBoardAnchorsChange: (anchors: BoardAnchorSnapshot) => void;
  onBoardAnimationFinished: (animationId: string) => void;
  onQuestAnimationFinished: (animationId: string) => void;
  onChallengeAnimationFinished: (animationId: string) => void;
  onCardEffectAnimationFinished: (animationId: string) => void;
  onOverlayAnnouncementFinished: (animationId: string) => void;
  getOwnerIdForSide: (side: LorcanaPlayerSide) => string | null;
  getPlayerVisualSettings: (side: LorcanaPlayerSide) => LorcanaResolvedPlayerVisualSettings;
  getPlayerVisualSettingsByOwnerId: (
    ownerId: string | null | undefined,
  ) => LorcanaResolvedPlayerVisualSettings;
  getOwnPlayerVisualSettings: () => LorcanaPlayerVisualSettings | undefined;
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
  debugPerformance?: boolean;
}

type SimulatorShellReadModel = Pick<LorcanaSimulatorReadModel, "getMoveLog"> &
  Partial<Pick<LorcanaSimulatorReadModel, "subscribeStateUpdates">>;

const LORCANA_PREGAME_SEGMENT_ID = "startingAGame";
// Safety buffer for the fallback timeout. Primary completion is now detected
// via WAAPI (.finished promise) in the animation layer. This timeout only fires
// if the WAAPI callback doesn't (e.g., prefers-reduced-motion disables the
// CSS animation, or the element is removed before the animation starts).
const BOARD_ANIMATION_SAFETY_BUFFER_MS = 500;
const DEBUG_ACTION_PREVIEW_DURATION_MS = 2000;
const DEBUG_REACTIVITY_LOGS = false;
const DEBUG_PERFORMANCE_LOGS = false;

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

function now(): number {
  return globalThis.performance?.now() ?? Date.now();
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

function getPendingEffectReferenceLabel(kind: EffectInstanceReferenceMeta["kind"]): string {
  switch (kind) {
    case "trigger-subject":
      return "That card";
    case "chosen-or-source":
      return "Chosen card";
    case "revealed-first":
    case "revealed-all":
      return "Revealed card";
    case "selected-first":
    case "selected-all":
    case "previous-target":
      return "Selected card";
    case "trigger-source":
      return "Trigger source";
    case "attacker":
      return "Attacker";
    case "defender":
      return "Defender";
    case "singers":
      return "Singer";
    case "self":
    case "source":
    default:
      return "Source card";
  }
}

function buildPendingEffectCardReferenceViews(
  references: EffectInstanceReferenceMeta[],
  cardSnapshotsById: CardSnapshotMap,
): PendingEffectCardReferenceView[] {
  const views: PendingEffectCardReferenceView[] = [];
  const seen = new Set<string>();

  for (const reference of references) {
    for (const cardId of reference.cardIds) {
      const key = `${reference.kind}:${cardId}`;
      if (seen.has(key)) {
        continue;
      }
      seen.add(key);

      const card = cardSnapshotsById[cardId] ?? null;
      if (!card) {
        continue;
      }

      views.push({
        id: key,
        label: getPendingEffectReferenceLabel(reference.kind),
        cardId,
        card,
      });
    }
  }

  return views;
}

function buildPendingEffectSummaryTitle(params: {
  title: string;
  secondaryTitle?: string;
  sourceCardId: string | null;
  instanceReferences: PendingEffectCardReferenceView[];
}): string {
  const primaryReference =
    params.instanceReferences.find((reference) => reference.cardId !== params.sourceCardId) ??
    params.instanceReferences[0];
  const secondaryTitle = params.secondaryTitle?.trim();
  const summaryPrefix = secondaryTitle
    ? `Resolving ${params.title}: ${secondaryTitle}`
    : `Resolving ${params.title}`;
  const targetReference =
    primaryReference && primaryReference.cardId !== params.sourceCardId ? primaryReference : null;
  const targetLabel = targetReference?.card?.label ?? targetReference?.cardId;

  return targetLabel ? `${summaryPrefix} targeting ${targetLabel}.` : `${summaryPrefix}.`;
}

function getPendingEffectSecondaryTitle(params: {
  sourceCard: LorcanaCardSnapshot | null;
  abilityIndex?: number | null;
  availableAbilityMoves: ExecutableMoveEntry[];
}): string | undefined {
  const { sourceCard, abilityIndex, availableAbilityMoves } = params;
  if (!sourceCard || sourceCard.cardType === "action") {
    return undefined;
  }

  if (typeof abilityIndex === "number") {
    const titledEntry = sourceCard.textEntries?.[abilityIndex]?.title?.trim();
    if (titledEntry) {
      return titledEntry;
    }
  }

  const titledEntries =
    sourceCard.textEntries
      ?.map((entry) => entry.title.trim())
      .filter((title) => title.length > 0) ?? [];

  if (titledEntries.length === 1) {
    return titledEntries[0];
  }

  const availableAbilityTitles = availableAbilityMoves
    .map((move) => {
      const abilityIndex = getMoveAbilityIndex(move);
      if (typeof abilityIndex !== "number") {
        return "";
      }

      return sourceCard.textEntries?.[abilityIndex]?.title?.trim() ?? "";
    })
    .filter((title) => title.length > 0);

  return availableAbilityTitles.length === 1 ? availableAbilityTitles[0] : undefined;
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
      leftEntry.playerId !== rightEntry.playerId ||
      stableSerialize(leftEntry.params) !== stableSerialize(rightEntry.params) ||
      stableSerialize(leftEntry.typedLogEntry) !== stableSerialize(rightEntry.typedLogEntry)
    ) {
      return false;
    }
  }

  return true;
}

export class LorcanaGameContext implements LorcanaGameContextValue {
  #orchestrator = new AnimationOrchestrator({
    queueBoardAnimations: (animations) => this.#queueResolvedBoardAnimations(animations),
    fireQuestAnimations: (animations) => this.#fireQuestAnimations(animations),
    fireChallengeAnimations: (animations) => this.#fireChallengeAnimations(animations),
    fireCardEffectAnimations: (animations) => this.#fireCardEffectAnimations(animations),
    fireOverlayAnnouncements: (animations) => this.#fireOverlayAnnouncements(animations),
    firePlayerEffectAnimations: (animations) => this.#firePlayerEffectAnimations(animations),
  });
  #engine: LorcanaEngineBase | null = null;
  #readModel: SimulatorShellReadModel | undefined = undefined;
  #playerSettings: LorcanaPlayerSettingsMap = {};
  #unsubscribeReadModelStateUpdates: (() => void) | null = null;
  #lastStateID = $state(0);
  #lastVisibleRevision = $state<number | null>(null);
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
  #cachedExpandedCategoryMovesStateId: number = -1;
  #cachedExpandedCategoryMoves = new Map<
    ExecutableMovePresentationCategoryId,
    ExecutableMoveEntry[]
  >();
  #cachedExpandedCardMovesStateId: number = -1;
  #cachedExpandedCardMoves = new Map<string, ExecutableMoveEntry[]>();
  #cachedExpandedCardActionCategoryMovesStateId: number = -1;
  #cachedExpandedCardActionCategoryMoves = new Map<string, ExecutableMoveEntry[]>();
  #moveLogEntries = $state<MoveLogEntrySnapshot[]>([]);
  #challengeReadyCardIds = $state<string[]>([]);
  #playableHandCardIds = $state<string[]>([]);
  #validChallengeTargetIds = $state<string[]>([]);
  #invalidChallengeTargetReasons = $state<Record<string, string>>({});
  #pendingResolutionMoves = $state<PendingResolutionMoveEntry[]>([]);
  #boardAnchors = $state<BoardAnchorSnapshot | null>(null);
  #queuedBoardAnimations = $state<BoardAnimationBatch[]>([]);
  #activeBoardAnimations = $state<ResolvedBoardMoveAnimation[]>([]);
  #playedPacketAnimationIds = $state<string[]>([]);
  #activeQuestAnimations = $state<ResolvedQuestAnimation[]>([]);
  #questAnimationTimeouts: ReturnType<typeof setTimeout>[] = [];
  #activeChallengeAnimations = $state<ResolvedChallengeAnimation[]>([]);
  #challengeAnimationTimeouts: ReturnType<typeof setTimeout>[] = [];
  #activeOverlayAnnouncements = $state<ResolvedOverlayAnnouncement[]>([]);
  #overlayAnnouncementTimeouts: ReturnType<typeof setTimeout>[] = [];
  #activeCardEffectAnimations = $state<ResolvedCardEffectAnimation[]>([]);
  #cardEffectAnimationTimeouts: ReturnType<typeof setTimeout>[] = [];
  #activePlayerEffectTargets = $state<Set<LorcanaPlayerSide>>(new Set());
  #playerEffectAnimationTimeouts: ReturnType<typeof setTimeout>[] = [];
  #animationSpeed = $state<AnimationSpeed>("normal");
  #soundVolume = $state<number>(50);
  #snapshotRefreshCallCount = 0;
  #previousMulliganContextKey: string | null = null;
  #boardAnimationTimeout: ReturnType<typeof setTimeout> | null = null;
  #debugPerformance = DEBUG_PERFORMANCE_LOGS;
  #cachedCardSnapshotStateID = -1;
  #cachedCardSnapshotMap: CardSnapshotMap = {};
  #cachedDerivedStateStateID = -1;
  #cachedChallengeStateStateID = -1;
  #cachedChallengeStates = new Map<
    string,
    { invalidReasons: Record<string, string>; validTargetIds: string[] }
  >();

  constructor(
    engine: LorcanaEngineBase,
    readModel?: SimulatorShellReadModel,
    playerSettings: LorcanaPlayerSettingsMap = {},
    debugPerformance = DEBUG_PERFORMANCE_LOGS,
  ) {
    initSoundService();
    this.#debugPerformance = debugPerformance;
    (globalThis as Record<string, unknown>).__TCG_DEBUG_PERFORMANCE__ = debugPerformance;
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
  readonly resolveCardSnapshot = (cardId: string): LorcanaCardSnapshot | null => {
    const snapshot = this.#cardSnapshotsById[cardId] ?? null;
    if (snapshot) {
      return snapshot;
    }

    const engine = this.#engine;
    if (!engine) {
      return null;
    }

    const definitionId = engine.staticResources.instances.get(cardId)?.definitionId ?? cardId;
    const definition = engine.staticResources.cards.get(definitionId) as
      | LorcanaCardDefinition
      | undefined;
    if (!definition) {
      return null;
    }

    const label = definition.version
      ? `${definition.name} - ${definition.version}`
      : definition.name;

    return {
      cardId,
      definitionId,
      label,
      ownerId: "",
      ownerSide: this.#ownerSide ?? "playerOne",
      zoneId: "deck",
      isMasked: false,
      facePresentation: "faceUp",
      inkType: definition.inkType,
      inkable: definition.inkable,
      cardType: definition.cardType,
      actionSubtype:
        definition.cardType === "action" ? (definition.actionSubtype ?? undefined) : undefined,
      cost: definition.cost,
      playCost: definition.cost,
      loreValue:
        definition.cardType === "character" || definition.cardType === "location"
          ? (definition as { lore?: number }).lore
          : undefined,
      strength: definition.cardType === "character" ? definition.strength : undefined,
      willpower:
        definition.cardType === "character" || definition.cardType === "location"
          ? definition.willpower
          : undefined,
      cardNumber: definition.cardNumber,
      set: definition.set,
      rarity:
        definition.rarity === "common" ||
        definition.rarity === "uncommon" ||
        definition.rarity === "rare" ||
        definition.rarity === "super_rare" ||
        definition.rarity === "legendary" ||
        definition.rarity === "enchanted" ||
        definition.rarity === "iconic" ||
        definition.rarity === "promo"
          ? definition.rarity
          : undefined,
    };
  };
  readonly getPlayerSummary = (side: LorcanaPlayerSide): LorcanaPlayerSummary | null =>
    getDerivedPlayerSummary(side, this.#boardSnapshot, this.#cardSnapshotsById);
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
    const stateId = this.#boardSnapshot?.stateID ?? -1;
    if (this.#cachedExpandedCardMovesStateId !== stateId) {
      this.#cachedExpandedCardMovesStateId = stateId;
      this.#cachedExpandedCardMoves.clear();
    }

    const cachedMoves = this.#cachedExpandedCardMoves.get(cardId);
    if (cachedMoves) {
      return cachedMoves;
    }

    const moves = expandCardMoves(
      engine,
      this.#cardSnapshotsById,
      this.#currentAvailableMoves,
      this.#currentLegalMoveIds,
      cardId,
    );
    this.#cachedExpandedCardMoves.set(cardId, moves);
    return moves;
  };
  readonly expandCardActionCategoryMoves = (
    cardId: string,
    categoryId: ExecutableMovePresentationCategoryId,
  ): ExecutableMoveEntry[] => {
    const engine = this.#engine;
    if (!engine) return [];
    const stateId = this.#boardSnapshot?.stateID ?? -1;
    if (this.#cachedExpandedCardActionCategoryMovesStateId !== stateId) {
      this.#cachedExpandedCardActionCategoryMovesStateId = stateId;
      this.#cachedExpandedCardActionCategoryMoves.clear();
    }

    const cacheKey = `${cardId}:${categoryId}`;
    const cachedMoves = this.#cachedExpandedCardActionCategoryMoves.get(cacheKey);
    if (cachedMoves) {
      return cachedMoves;
    }

    const moves = expandCardActionCategoryMoves(
      engine,
      this.#cardSnapshotsById,
      this.#currentAvailableMoves,
      this.#currentLegalMoveIds,
      cardId,
      categoryId,
    );
    this.#cachedExpandedCardActionCategoryMoves.set(cacheKey, moves);
    return moves;
  };
  readonly expandCategoryMoves = (
    categoryId: ExecutableMovePresentationCategoryId,
  ): ExecutableMoveEntry[] => {
    const engine = this.#engine;
    if (!engine) return [];
    const stateId = this.#boardSnapshot?.stateID ?? -1;
    if (this.#cachedExpandedCategoryMovesStateId !== stateId) {
      this.#cachedExpandedCategoryMovesStateId = stateId;
      this.#cachedExpandedCategoryMoves.clear();
    }

    const cachedMoves = this.#cachedExpandedCategoryMoves.get(categoryId);
    if (cachedMoves) {
      return cachedMoves;
    }

    const moves = expandCategoryMoves(
      engine,
      this.#cardSnapshotsById,
      this.#currentAvailableMoves,
      this.#currentLegalMoveIds,
      categoryId,
    );
    this.#cachedExpandedCategoryMoves.set(categoryId, moves);
    return moves;
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
  readonly activePlayerEffectTargets = (): ReadonlySet<LorcanaPlayerSide> =>
    this.#activePlayerEffectTargets;
  readonly boardAnimationPlaceholders = (): BoardAnimationPlaceholder[] =>
    this.#orchestrator.placeholders;
  readonly inFlightCardIds = (): ReadonlySet<string> => this.#orchestrator.inFlightCardIds;
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
      this.#lastVisibleRevision = null;
      this.#refreshSnapshot("engine-change");
      return;
    }

    if (!this.#boardSnapshot) {
      this.#refreshSnapshot("initial-snapshot");
    }
  }

  destroy(): void {
    this.#unsubscribeFromReadModelStateUpdates();
    this.#orchestrator.cancel();
    this.#clearBoardAnimationTimer();
    this.#clearQuestAnimationTimers();
    this.#clearChallengeAnimationTimers();
    this.#clearOverlayAnnouncementTimers();
    this.#clearCardEffectAnimationTimers();
    this.#clearPlayerEffectAnimationTimers();
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
    this.#pendingResolutionAutoOpenStateId =
      moveId === "playCard" || moveId === "resolveBag" || moveId === "resolveEffect"
        ? this.#lastStateID
        : null;
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

  readonly shouldOpenPlayCardSelectionOnDrop = (cardId: string): boolean => {
    const card = this.#cardSnapshotsById[cardId];
    if (!card || card.zoneId !== "hand") {
      return false;
    }

    return this.expandCardActionCategoryMoves(card.cardId, "play-card").length > 1;
  };

  readonly handleBoardAnchorsChange = (nextAnchors: BoardAnchorSnapshot): void => {
    this.#boardAnchors = nextAnchors;
    this.#orchestrator.resolveAnchors(nextAnchors);
  };

  // ── WAAPI completion callbacks ────────────────────────────────────────
  // Called by animation layer components when a CSS animation's .finished
  // promise resolves. The safety timeout in the fire methods acts as a
  // fallback if the callback never fires (e.g., prefers-reduced-motion).

  readonly onBoardAnimationFinished = (animationId: string): void => {
    if (this.#activeBoardAnimations.length === 0) {
      return;
    }

    const completedAnimation = this.#activeBoardAnimations.find(
      (animation) => animation.id === animationId,
    );
    if (!completedAnimation) {
      return;
    }

    const remainingActiveAnimations = this.#activeBoardAnimations.filter(
      (animation) => animation.id !== animationId,
    );
    this.#orchestrator.notifyBoardAnimationCompleted(
      completedAnimation.card.cardId,
      remainingActiveAnimations.map((animation) => animation.card.cardId),
      this.#queuedBoardAnimations.flatMap((batch) =>
        batch.map((animation) => animation.card.cardId),
      ),
    );

    this.#activeBoardAnimations = remainingActiveAnimations;

    if (this.#activeBoardAnimations.length === 0) {
      this.#clearBoardAnimationTimer();
      this.#playNextBoardAnimation();
    }
  };

  readonly onQuestAnimationFinished = (animationId: string): void => {
    this.#activeQuestAnimations = this.#activeQuestAnimations.filter((a) => a.id !== animationId);
  };

  readonly onChallengeAnimationFinished = (animationId: string): void => {
    this.#activeChallengeAnimations = this.#activeChallengeAnimations.filter(
      (a) => a.id !== animationId,
    );
  };

  readonly onCardEffectAnimationFinished = (animationId: string): void => {
    this.#activeCardEffectAnimations = this.#activeCardEffectAnimations.filter(
      (a) => a.id !== animationId,
    );
  };

  readonly onOverlayAnnouncementFinished = (animationId: string): void => {
    this.#activeOverlayAnnouncements = this.#activeOverlayAnnouncements.filter(
      (a) => a.id !== animationId,
    );
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

  readonly getOwnPlayerVisualSettings = (): LorcanaPlayerVisualSettings | undefined => {
    const side = this.ownerSide();
    if (!side) return undefined;
    const ownerId = this.getOwnerIdForSide(side);
    if (!ownerId) return undefined;
    return this.#playerSettings[ownerId];
  };

  readonly setSelectedCardId = (nextSelectedCardId: string | null): void => {
    this.#selectedCardId = nextSelectedCardId;
  };

  readonly setSelectedMulliganCardIds = (nextSelectedMulliganCardIds: string[]): void => {
    this.#selectedMulliganCardIds = nextSelectedMulliganCardIds;
  };

  readonly setChallengeSourceCardId = (nextChallengeSourceCardId: string | null): void => {
    if (this.#challengeSourceCardId === nextChallengeSourceCardId) return;
    this.#challengeSourceCardId = nextChallengeSourceCardId;
    this.#refreshChallengeState();
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
        actorSide: side,
        attackerId,
        defenderId,
        sourceRect,
        destinationRect: destRect,
        preview,
        durationMs: CHALLENGE_ANIMATION_DURATION_MS[this.#animationSpeed],
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
    this.#cachedCardSnapshotStateID = -1;
    this.#cachedCardSnapshotMap = {};
    this.#cachedDerivedStateStateID = -1;
    this.#cachedChallengeStateStateID = -1;
    this.#cachedChallengeStates.clear();
  }

  #measure<T>(label: string, fn: () => T): T {
    if (!this.#debugPerformance) {
      return fn();
    }

    const start = now();
    try {
      return fn();
    } finally {
      const durationMs = Number((now() - start).toFixed(2));
      console.info(`[simulator][perf] ${label}`, { durationMs });
    }
  }

  #buildCardSnapshots(board: LorcanaProjectedBoardView): CardSnapshotMap {
    if (this.#cachedCardSnapshotStateID === board.stateID) {
      return this.#cachedCardSnapshotMap;
    }

    const snapshots = this.#measure("buildCardSnapshotMap", () => {
      const projectedSnapshots = buildCardSnapshotMap(board, this.#engine!.staticResources);
      return mergeSupplementalScryCardSnapshots({
        board,
        snapshots: projectedSnapshots,
        staticResources: this.#engine!.staticResources,
        authoritativeState: this.#engine!.getState(),
      });
    });
    this.#cachedCardSnapshotStateID = board.stateID;
    this.#cachedCardSnapshotMap = snapshots;
    return snapshots;
  }

  #refreshChallengeState(): void {
    const engine = this.#engine;
    const board = this.#boardSnapshot;
    if (!engine || !board) {
      this.#validChallengeTargetIds = [];
      this.#invalidChallengeTargetReasons = {};
      this.#cachedChallengeStateStateID = -1;
      this.#cachedChallengeStates.clear();
      return;
    }

    const normalizedChallengeSourceCardId =
      this.#challengeSourceCardId &&
      this.#challengeReadyCardIds.includes(this.#challengeSourceCardId)
        ? this.#challengeSourceCardId
        : null;
    if (this.#challengeSourceCardId !== normalizedChallengeSourceCardId) {
      this.#challengeSourceCardId = normalizedChallengeSourceCardId;
    }

    if (!this.#ownerSide || !normalizedChallengeSourceCardId) {
      this.#validChallengeTargetIds = [];
      this.#invalidChallengeTargetReasons = {};
      if (this.#cachedChallengeStateStateID !== board.stateID) {
        this.#cachedChallengeStateStateID = board.stateID;
        this.#cachedChallengeStates.clear();
      }
      return;
    }

    if (this.#cachedChallengeStateStateID !== board.stateID) {
      this.#cachedChallengeStateStateID = board.stateID;
      this.#cachedChallengeStates.clear();
    }
    let nextChallengeState = this.#cachedChallengeStates.get(normalizedChallengeSourceCardId);
    if (!nextChallengeState) {
      nextChallengeState = this.#measure("buildChallengeState", () =>
        buildChallengeState(
          engine,
          this.#cardSnapshotsById,
          board,
          this.#ownerSide,
          normalizedChallengeSourceCardId,
        ),
      );
      this.#cachedChallengeStates.set(normalizedChallengeSourceCardId, nextChallengeState);
    }

    if (
      !areOrderedStringArraysEqual(this.#validChallengeTargetIds, nextChallengeState.validTargetIds)
    ) {
      this.#validChallengeTargetIds = nextChallengeState.validTargetIds;
    }
    if (
      !areStringRecordsEqual(this.#invalidChallengeTargetReasons, nextChallengeState.invalidReasons)
    ) {
      this.#invalidChallengeTargetReasons = nextChallengeState.invalidReasons;
    }
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

    this.#unsubscribeReadModelStateUpdates = this.#readModel.subscribeStateUpdates((revision) => {
      this.#refreshSnapshot("read-model-state-update", revision);
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
    this.#orchestrator.cancel();
    this.#clearBoardAnimationTimer();
    this.#clearQuestAnimationTimers();
    this.#clearChallengeAnimationTimers();
    this.#clearOverlayAnnouncementTimers();
    this.#clearCardEffectAnimationTimers();
    this.#clearPlayerEffectAnimationTimers();
    this.#boardAnchors = null;
    this.#queuedBoardAnimations = [];
    this.#activeBoardAnimations = [];
    this.#playedPacketAnimationIds = [];
    this.#activeQuestAnimations = [];
    this.#activeChallengeAnimations = [];
    this.#activeOverlayAnnouncements = [];
    this.#activeCardEffectAnimations = [];
    this.#activePlayerEffectTargets = new Set();
  }

  #clearPlayerEffectAnimationTimers(): void {
    for (const timeout of this.#playerEffectAnimationTimeouts) {
      clearTimeout(timeout);
    }
    this.#playerEffectAnimationTimeouts = [];
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
        playSound("challenge-hit");
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

    debugLog("quest-animations", "Firing quest animations", {
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

  #firePlayerEffectAnimations(animations: QueuedPlayerEffectAnimation[]): void {
    if (animations.length === 0) {
      return;
    }

    const DURATION_MS = ANIMATION_SPEED_MS[this.#animationSpeed];

    for (const animation of animations) {
      const nextTargets = new Set<LorcanaPlayerSide>(this.#activePlayerEffectTargets);
      for (const side of animation.targetSides) {
        nextTargets.add(side);
      }
      this.#activePlayerEffectTargets = nextTargets;

      const clearId = setTimeout(() => {
        const remaining = new Set<LorcanaPlayerSide>(this.#activePlayerEffectTargets);
        for (const side of animation.targetSides) {
          remaining.delete(side);
        }
        this.#activePlayerEffectTargets = remaining;
      }, DURATION_MS);
      this.#playerEffectAnimationTimeouts.push(clearId);
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
        actorSide,
        card,
        destinationRect: centerRect,
        destinationZoneId: "discard",
        durationMs: DEBUG_ACTION_PREVIEW_DURATION_MS,
        groupId: animation.id,
        id: animation.id,
        impactAt: "via",
        impactRect: centerRect,
        phase: "cause",
        playback: "serial",
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
          this.#resolveBoardAnchorLocalRect(createInkwellEntryAnchorId(actorSide)) ??
          this.#resolveBoardAnchorLocalRect(createZoneAnchorId(actorSide, "inkwell")) ??
          centerRect;
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
        actorSide,
        card,
        destinationRect,
        destinationZoneId,
        durationMs,
        groupId: animation.id,
        id: animation.id,
        impactAt: isInk ? "destination" : "via",
        impactRect: isInk ? destinationRect : centerRect,
        phase: "cause",
        playback: "serial",
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
      console.info("[simulator][animations][board][queue]", {
        status: "empty",
      });
      return;
    }

    const seenIds = new Set([
      ...this.#activeBoardAnimations.map((animation) => animation.id),
      ...this.#queuedBoardAnimations.flatMap((batch) => batch.map((animation) => animation.id)),
    ]);
    const uniqueAnimations = animations.filter((animation) => !seenIds.has(animation.id));
    if (uniqueAnimations.length === 0) {
      debugLog("animations", "Resolved animations were already queued or active", {
        animationIds: animations.map((animation) => animation.id),
      });
      console.info("[simulator][animations][board][queue]", {
        status: "deduped",
        animationIds: animations.map((animation) => animation.id),
      });
      return;
    }

    console.info("[simulator][animations][board][queue]", {
      status: "queued",
      animations: uniqueAnimations.map((animation) => ({
        id: animation.id,
        cardId: animation.card.cardId,
        groupId: animation.groupId,
        playback: animation.playback,
        phase: animation.phase,
        variant: animation.variant,
        durationMs: animation.durationMs,
      })),
    });
    this.#queuedBoardAnimations = [
      ...this.#queuedBoardAnimations,
      ...this.#createBoardAnimationBatches(uniqueAnimations),
    ];
    this.#playNextBoardAnimation();
  }

  #playNextBoardAnimation(): void {
    if (this.#activeBoardAnimations.length > 0 || this.#queuedBoardAnimations.length === 0) {
      return;
    }

    const [nextBatch, ...remainingBatches] = this.#queuedBoardAnimations;
    this.#queuedBoardAnimations = remainingBatches;
    this.#activeBoardAnimations = nextBatch;
    console.info("[simulator][animations][board][play]", {
      batchSize: nextBatch.length,
      animations: nextBatch.map((animation) => ({
        id: animation.id,
        cardId: animation.card.cardId,
        groupId: animation.groupId,
        playback: animation.playback,
        phase: animation.phase,
        variant: animation.variant,
        durationMs: animation.durationMs,
        sourceRect: animation.sourceRect,
        destinationRect: animation.destinationRect,
      })),
    });
    for (const animation of nextBatch) {
      playSound(boardMoveVariantToSoundId(animation.variant));
    }
    this.#clearBoardAnimationTimer();

    // Safety timeout: fallback if the WAAPI completion callback from the
    // animation layer doesn't fire (e.g., prefers-reduced-motion, element
    // removed before animation starts). The primary path is
    // onBoardAnimationFinished() called by the animation layer.
    this.#boardAnimationTimeout = setTimeout(
      () => {
        this.#boardAnimationTimeout = null;
        const completedBatch = this.#activeBoardAnimations;
        const remainingQueuedCardIds = this.#queuedBoardAnimations.flatMap((batch) =>
          batch.map((animation) => animation.card.cardId),
        );
        this.#activeBoardAnimations = [];
        for (const animation of completedBatch) {
          this.#orchestrator.notifyBoardAnimationCompleted(
            animation.card.cardId,
            [],
            remainingQueuedCardIds,
          );
        }
        this.#playNextBoardAnimation();
      },
      Math.max(...nextBatch.map((animation) => animation.durationMs)) +
        BOARD_ANIMATION_SAFETY_BUFFER_MS,
    );
  }

  #createBoardAnimationBatches(animations: ResolvedBoardMoveAnimation[]): BoardAnimationBatch[] {
    const batches: BoardAnimationBatch[] = [];

    for (const animation of animations) {
      const previousBatch = batches.at(-1);
      const shouldAppendToPreviousBatch =
        previousBatch &&
        previousBatch.length > 0 &&
        animation.playback === "parallel" &&
        previousBatch[0].playback === "parallel" &&
        previousBatch[0].groupId === animation.groupId;

      if (shouldAppendToPreviousBatch) {
        previousBatch.push(animation);
        continue;
      }

      batches.push([animation]);
    }

    return batches;
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
      this.#cachedExpandedCategoryMovesStateId = -1;
      this.#cachedExpandedCategoryMoves.clear();
      this.#cachedExpandedCardMovesStateId = -1;
      this.#cachedExpandedCardMoves.clear();
      this.#cachedExpandedCardActionCategoryMovesStateId = -1;
      this.#cachedExpandedCardActionCategoryMoves.clear();
      this.#derivedStateVersion++;
      this.#challengeReadyCardIds = [];
      this.#pendingResolutionMoves = [];
      this.#playableHandCardIds = [];
      this.#validChallengeTargetIds = [];
      this.#invalidChallengeTargetReasons = {};
      this.#cachedDerivedStateStateID = -1;
      this.#cachedChallengeStateStateID = -1;
      this.#cachedChallengeStates.clear();
      return;
    }

    // Use a composite cache key: the board's projected stateID combined with
    // the engine's confirmed stateID. During optimistic updates the board stateID
    // advances (from the local sandbox) while the engine stateID stays at the
    // previous confirmed value. When the server confirms, the engine stateID
    // catches up. Using both ensures derived state (legal moves, pending effects)
    // is recalculated whenever the engine runtime changes — even when the board
    // stateID happens to match across optimistic and confirmed phases.
    const boardStateID = this.#boardSnapshot.stateID;
    const stateID = boardStateID * 100_000 + engine.getStateID();
    const activeSide = getActiveSide(this.#boardSnapshot);
    let nextMoveCategorySummaries: MoveCategorySummary[] = [];
    let nextChallengeReadyCardIds: string[] = [];
    let nextPlayableHandCardIds: string[] = [];
    let nextPendingResolutionMoves: PendingResolutionMoveEntry[] = [];
    let legalMoves = this.#currentLegalMoveIds;
    let availableMoves = this.#currentAvailableMoves;

    if (this.#cachedDerivedStateStateID !== stateID) {
      availableMoves = this.#measure("getAvailableMoves", () => engine.getAvailableMoves());
      legalMoves = this.#measure("enumerateMoves", () => engine.getCachedLegalMoveIds());

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
      } catch (error) {
        console.error(
          "[simulator][refreshDerivedState][buildPendingResolutionMoves][error]",
          error,
        );
        throw error;
      }

      this.#currentAvailableMoves = availableMoves;
      this.#currentLegalMoveIds = legalMoves;
      this.#cachedDerivedStateStateID = stateID;
      this.#derivedStateVersion++;
    } else {
      nextMoveCategorySummaries = this.#moveCategorySummaries;
      nextChallengeReadyCardIds = this.#challengeReadyCardIds;
      nextPlayableHandCardIds = this.#playableHandCardIds;
      nextPendingResolutionMoves = this.#pendingResolutionMoves;
    }
    const mulliganContextKey =
      this.pregamePhaseValue === "mulligan" && this.#ownerSide
        ? `${this.#boardSnapshot.stateID}:${this.#ownerSide}:${getZoneCardIds(this.#boardSnapshot, this.#ownerSide, "hand").join(",")}`
        : null;

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
    this.#refreshChallengeState();
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

    const nextCardSnapshotsById = this.#buildCardSnapshots(boardSnapshot);
    const nextMoveLogEntries =
      this.#readModel?.getMoveLog() ?? (hasMoveLog(engine) ? engine.getMoveLog() : []);

    this.#cardSnapshotsById = nextCardSnapshotsById;
    this.#ownerSide = getOwnerSideFromEngine(engine, boardSnapshot);

    if (!areMoveLogEntriesEqual(this.#moveLogEntries, nextMoveLogEntries)) {
      this.#moveLogEntries = nextMoveLogEntries;
    }

    this.#measure("refreshDerivedState", () => this.#refreshDerivedState());
  }

  #refreshSnapshot(source = "unspecified", visibleRevision?: number): void {
    const engine = this.#engine;
    if (!engine) {
      return;
    }

    this.#snapshotRefreshCallCount += 1;

    const currentStateID = engine.getStateID();
    const visibleRevisionChanged =
      typeof visibleRevision === "number" && visibleRevision !== this.#lastVisibleRevision;
    const stateChanged = !this.#boardSnapshot || currentStateID !== this.#lastStateID;
    const shouldRefresh = stateChanged || visibleRevisionChanged;

    debugLog("snapshot", "Refresh requested", {
      call: this.#snapshotRefreshCallCount,
      currentStateID,
      lastStateID: this.#lastStateID,
      visibleRevision,
      lastVisibleRevision: this.#lastVisibleRevision,
      source,
      shouldRefresh,
    });

    if (!shouldRefresh) {
      return;
    }

    const nextBoardSnapshot = this.#measure("engine.getBoard", () => engine.getBoard());
    const previousSnapshot = this.#boardSnapshot;
    const previousAnchorSnapshot = this.#boardAnchors;
    const nextCardSnapshotsById = this.#measure("getBoard.buildCardSnapshotMap", () =>
      this.#buildCardSnapshots(nextBoardSnapshot),
    );
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
      CHALLENGE_ANIMATION_DURATION_MS[this.#animationSpeed],
    );
    const nextQueuedOverlayAnnouncements = deriveQueuedOverlayAnnouncementsFromPacket(
      packetUpdate,
      ANIMATION_SPEED_MS[this.#animationSpeed],
    );
    const nextQueuedCardEffectAnimations = deriveQueuedCardEffectAnimationsFromPacket(
      packetUpdate,
      ANIMATION_SPEED_MS[this.#animationSpeed],
    );
    const nextQueuedPlayerEffectAnimations = deriveQueuedPlayerEffectAnimationsFromPacket(
      packetUpdate,
      ANIMATION_SPEED_MS[this.#animationSpeed],
    );

    if (nextQueuedQuestAnimations.length > 0) {
      debugLog("quest-animations", "Derived quest animations from packet", {
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
    this.#lastVisibleRevision =
      typeof visibleRevision === "number" ? visibleRevision : this.#lastVisibleRevision;

    const hasAnyAnimations =
      nextQueuedAnimations.length > 0 ||
      nextQueuedQuestAnimations.length > 0 ||
      nextQueuedChallengeAnimations.length > 0 ||
      nextQueuedCardEffectAnimations.length > 0 ||
      nextQueuedOverlayAnnouncements.length > 0 ||
      nextQueuedPlayerEffectAnimations.length > 0;

    // Prefer ingesting based on unseen packet animations rather than only on local
    // engine state bumps. In browser-harness / async transport flows the read-model
    // can surface a fresh packet on a refresh where currentStateID is unchanged from
    // this client's perspective, which would otherwise drop valid animations.
    if (hasAnyAnimations) {
      this.#orchestrator.ingest({
        boardMoves: nextQueuedAnimations,
        quests: nextQueuedQuestAnimations,
        challenges: nextQueuedChallengeAnimations,
        cardEffects: nextQueuedCardEffectAnimations,
        overlays: nextQueuedOverlayAnnouncements,
        playerEffects: nextQueuedPlayerEffectAnimations,
        sourceAnchors: previousAnchorSnapshot,
      });
    }

    const allNewAnimationIds = [
      ...nextQueuedAnimations.map((a) => a.id),
      ...nextQueuedQuestAnimations.map((a) => a.id),
      ...nextQueuedChallengeAnimations.map((a) => a.id),
      ...nextQueuedOverlayAnnouncements.map((a) => a.id),
      ...nextQueuedCardEffectAnimations.map((a) => a.id),
      ...nextQueuedPlayerEffectAnimations.map((a) => a.id),
    ];
    if (allNewAnimationIds.length > 0) {
      this.#playedPacketAnimationIds = [...this.#playedPacketAnimationIds, ...allNewAnimationIds];
    }

    if (!areMoveLogEntriesEqual(this.#moveLogEntries, nextMoveLogEntries)) {
      this.#moveLogEntries = nextMoveLogEntries;
    }

    this.#measure("refreshDerivedState", () => this.#refreshDerivedState());
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
    existing.inlineReference?.label === next.inlineReference?.label &&
    existing.inlineReference?.card?.cardId === next.inlineReference?.card?.cardId &&
    existing.inlineReference?.prefix === next.inlineReference?.prefix &&
    existing.inlineReference?.suffix === next.inlineReference?.suffix &&
    existing.mode === next.mode &&
    guidanceActionsEqual(existing.actions, next.actions)
  );
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
  selectedCardIds: string[];
  selectedMoveId: string | null;
  confirmationRequired: boolean;
}

type NamedCardSearchResult = {
  id: string;
  label: string;
  name: string;
};

type ScryResolutionSelection = {
  id: string;
  zone: string;
  cards: string[];
};

type ScryCardView = Pick<
  LorcanaCardSnapshot,
  "cardId" | "label" | "cardType" | "actionSubtype" | "cost" | "classifications"
>;

type ResolutionSelectionPhase = "selecting" | "executing";

interface ResolutionSelectionSession {
  move: PendingResolutionMoveEntry;
  context: ResolutionSelectionContext;
  promptMessage: string;
  promptInlineReference: GuidanceInlineReference | null;
  sessionStatusMessage: string;
  phase: ResolutionSelectionPhase;
  inline: boolean;
  activeTargetSlotIndex: number | null;
  selectedTargets: string[];
  selectedAmount: number | null;
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

type ResolutionPromptReferenceKind = "action-card" | "activated-ability";

interface ResolutionPromptContent {
  message: string;
  inlineReference: GuidanceInlineReference | null;
}

interface ResolutionSourceHint {
  kind: ResolutionPromptReferenceKind;
  sourceCardId: string;
  abilityIndex?: number;
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

type SingTogetherSelectionCandidate = {
  cardId: string;
  value: number;
};

type SingTogetherSelectionMetadata = {
  requiredValue: number;
  candidateCards: SingTogetherSelectionCandidate[];
};

function getSingTogetherSelectionMetadata(
  move: ExecutableMoveEntry | null | undefined,
): SingTogetherSelectionMetadata | null {
  if (!move || move.moveId !== "playCard" || move.presentation.kind !== "targeted") {
    return null;
  }

  const cost = (move.params as { cost?: unknown }).cost;
  if (cost !== "singTogether" || move.presentation.selectionMode !== "singTogether") {
    return null;
  }

  const candidateCards = Array.isArray(move.presentation.candidateCards)
    ? move.presentation.candidateCards.filter(
        (candidate): candidate is SingTogetherSelectionCandidate =>
          typeof candidate?.cardId === "string" && typeof candidate?.value === "number",
      )
    : [];
  const requiredValue =
    typeof move.presentation.requiredValue === "number" ? move.presentation.requiredValue : null;

  if (candidateCards.length === 0 || requiredValue == null) {
    return null;
  }

  return {
    requiredValue,
    candidateCards,
  };
}

function isSingTogetherSelectionMove(move: ExecutableMoveEntry | null | undefined): boolean {
  return getSingTogetherSelectionMetadata(move) !== null;
}

function getSingTogetherSelectionMove(session: ActionSelectionSession): ExecutableMoveEntry | null {
  const selectedMove =
    session.selectedMoveId != null
      ? (session.candidateMoves.find((move) => move.id === session.selectedMoveId) ?? null)
      : null;
  if (isSingTogetherSelectionMove(selectedMove)) {
    return selectedMove;
  }

  if (!session.sourceCardId) {
    return null;
  }

  const singTogetherMoves = getSourceMovesForActionSelectionSession(
    session,
    session.sourceCardId,
  ).filter((move) => isSingTogetherSelectionMove(move));
  return singTogetherMoves.length === 1 ? (singTogetherMoves[0] ?? null) : null;
}

function isSingTogetherSelectionSession(session: ActionSelectionSession): boolean {
  return session.categoryId === "sing-card" && getSingTogetherSelectionMove(session) !== null;
}

function getSingTogetherSelectionTotal(
  session: ActionSelectionSession,
  move: ExecutableMoveEntry | null | undefined = getSingTogetherSelectionMove(session),
): number {
  const metadata = getSingTogetherSelectionMetadata(move);
  if (!metadata) {
    return 0;
  }

  const selectedCardIds = new Set(session.selectedCardIds);
  return metadata.candidateCards.reduce(
    (total, candidate) => total + (selectedCardIds.has(candidate.cardId) ? candidate.value : 0),
    0,
  );
}

function canConfirmSingTogetherSelection(session: ActionSelectionSession): boolean {
  const move = getSingTogetherSelectionMove(session);
  const metadata = getSingTogetherSelectionMetadata(move);
  if (!metadata) {
    return false;
  }

  return getSingTogetherSelectionTotal(session, move) >= metadata.requiredValue;
}

function isDiscardCostSelectionMove(move: ExecutableMoveEntry | null | undefined): boolean {
  return (
    move?.moveId === "activateAbility" &&
    move.presentation.kind === "targeted" &&
    move.presentation.selectionMode === "discard-cost" &&
    typeof move.presentation.discardCostCount === "number" &&
    move.presentation.discardCostCount > 0
  );
}

function getDiscardCostCount(move: ExecutableMoveEntry | null | undefined): number {
  if (!isDiscardCostSelectionMove(move)) {
    return 0;
  }
  return (move?.presentation as { discardCostCount?: number }).discardCostCount ?? 0;
}

function canConfirmDiscardCostSelection(
  session: ActionSelectionSession,
  move: ExecutableMoveEntry | null | undefined,
): boolean {
  const requiredCount = getDiscardCostCount(move);
  return requiredCount > 0 && session.selectedCardIds.length === requiredCount;
}

function getDiscardCostSelectionMove(session: ActionSelectionSession): ExecutableMoveEntry | null {
  const selectedMove =
    session.selectedMoveId != null
      ? (session.candidateMoves.find((move) => move.id === session.selectedMoveId) ?? null)
      : null;
  if (isDiscardCostSelectionMove(selectedMove)) {
    return selectedMove;
  }

  if (!session.sourceCardId) {
    return null;
  }

  const discardCostMoves = getSourceMovesForActionSelectionSession(
    session,
    session.sourceCardId,
  ).filter((move) => isDiscardCostSelectionMove(move));
  return discardCostMoves.length === 1 ? (discardCostMoves[0] ?? null) : null;
}

function isDiscardCostSelectionSession(session: ActionSelectionSession): boolean {
  return session.categoryId === "activate-ability" && getDiscardCostSelectionMove(session) !== null;
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
    selectedCardIds: [],
    selectedMoveId: null,
    confirmationRequired,
  };
}

function isTargetResolutionSelectionContext(
  context: ResolutionSelectionContext,
): context is TargetResolutionSelectionContext {
  return context.kind === "target-selection" || context.kind === "discard-choice";
}

function isOptionalContinuationResolutionContext(context: ResolutionSelectionContext): boolean {
  return (
    context.kind !== "optional-selection" &&
    (context.currentSelection.resolveOptional === true ||
      (isTargetResolutionSelectionContext(context) && context.originatesFromOptional === true))
  );
}

function shouldAutoSubmitResolutionTargetSelection(
  session: ResolutionSelectionSession,
  skipActionConfirmation: boolean,
): boolean {
  if (!skipActionConfirmation || !isTargetResolutionSelectionContext(session.context)) {
    return false;
  }

  return (
    session.context.minSelections === 1 &&
    session.context.maxSelections === 1 &&
    !session.context.ordered
  );
}

function matchesSelectionId(candidateId: string, targetId: string): boolean {
  return candidateId === targetId || String(candidateId) === String(targetId);
}

function includesSelectionId(candidateIds: readonly string[], targetId: string): boolean {
  return candidateIds.some((candidateId) => matchesSelectionId(candidateId, targetId));
}

function asRecord(value: unknown): Record<string, unknown> | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return null;
  }

  return value as Record<string, unknown>;
}

function canDeclineResolutionSelectionSession(session: ResolutionSelectionSession | null): boolean {
  if (!session || session.phase === "executing") {
    return false;
  }

  if (session.context.kind === "optional-selection") {
    return true;
  }

  return (
    isTargetResolutionSelectionContext(session.context) &&
    session.context.canDeclineSelection === true
  );
}

function getResolutionDeclineLabel(session: ResolutionSelectionSession): string {
  return session.context.kind === "optional-selection"
    ? session.context.rejectLabel
    : isOptionalContinuationResolutionContext(session.context)
      ? m["sim.actions.label.skipOptionalEffect"]({})
      : m["sim.actions.label.declineEffect"]({});
}

function getScryCardView(
  cardSnapshotsById: CardSnapshotMap,
  context: Extract<ResolutionSelectionContext, { kind: "scry-selection" }>,
  cardId: string,
): ScryCardView | ResolutionSelectionRevealedCard | null {
  const snapshot = cardSnapshotsById[cardId] ?? null;
  if (snapshot) {
    return {
      cardId: snapshot.cardId,
      label: snapshot.label,
      cardType: snapshot.cardType,
      actionSubtype: snapshot.actionSubtype,
      cost: snapshot.cost,
      classifications: snapshot.classifications,
    };
  }

  return (
    context.revealedCards.find((candidate) => matchesSelectionId(candidate.cardId, cardId)) ?? null
  );
}

function buildScryPreviewDestinations(
  cardSnapshotsById: CardSnapshotMap,
  context: Extract<ResolutionSelectionContext, { kind: "scry-selection" }>,
  manualDestinations: ScryResolutionSelection[],
): ScryResolutionSelection[] {
  const previews = context.destinationRules.map((rule) => {
    const manualSelection = manualDestinations.find((destination) => destination.id === rule.id);
    return {
      id: rule.id,
      zone: rule.zone,
      cards: [...(manualSelection?.cards ?? [])],
    };
  });
  const assignedIds = new Set(previews.flatMap((destination) => destination.cards));

  for (const rule of context.destinationRules) {
    if (!rule.remainder) {
      continue;
    }

    const previewDestination = previews.find((destination) => destination.id === rule.id);
    if (!previewDestination) {
      continue;
    }

    const remainingSlots =
      rule.max === null
        ? Number.POSITIVE_INFINITY
        : Math.max(0, rule.max - previewDestination.cards.length);
    if (remainingSlots === 0) {
      continue;
    }

    for (const cardId of context.revealedCardIds) {
      if (assignedIds.has(cardId)) {
        continue;
      }

      const card = getScryCardView(cardSnapshotsById, context, cardId);
      if (!card || !canAssignCardToScryDestination(card, rule)) {
        continue;
      }

      previewDestination.cards.push(cardId);
      assignedIds.add(cardId);

      if (previewDestination.cards.length >= remainingSlots && Number.isFinite(remainingSlots)) {
        break;
      }
    }
  }

  return previews;
}

function getScryUnassignedCardIds(
  previewDestinations: ScryResolutionSelection[],
  context: Extract<ResolutionSelectionContext, { kind: "scry-selection" }>,
): string[] {
  const assignedIds = new Set(previewDestinations.flatMap((destination) => destination.cards));
  return context.revealedCardIds.filter((cardId) => !assignedIds.has(cardId));
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
  promptMessage: string,
  promptInlineReference: GuidanceInlineReference | null,
  sessionStatusMessage: string,
): ResolutionSelectionSession {
  const scryDestinations =
    context.kind === "scry-selection"
      ? context.destinationRules.map((rule, index) => {
          const currentDestinations = context.currentSelection.destinations ?? [];
          const currentDestination = currentDestinations[index];

          return {
            id: rule.id,
            zone: rule.zone,
            cards: [...(currentDestination?.cards ?? [])],
          };
        })
      : [];

  return {
    move,
    context,
    promptMessage,
    promptInlineReference,
    sessionStatusMessage,
    phase: "selecting",
    inline: isInlineResolutionSelectionContext(context),
    activeTargetSlotIndex: null,
    selectedTargets: [...(context.currentSelection.targets ?? [])],
    selectedAmount:
      typeof context.currentSelection.amount === "number" ? context.currentSelection.amount : null,
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

function isCardTargetDsl(target: unknown): target is LorcanaCardTarget {
  if (!target || typeof target !== "object" || Array.isArray(target)) {
    return false;
  }

  const selector = (target as { selector?: unknown }).selector;
  return (
    selector !== "you" &&
    selector !== "opponent" &&
    selector !== "each-opponent" &&
    selector !== "each-player" &&
    selector !== "chosen"
  );
}

function getTargetOwnerForViewer(params: {
  candidateCards: readonly LorcanaCardSnapshot[];
  viewerSide: LorcanaPlayerSide | null;
}): LorcanaCardTarget["owner"] | undefined {
  const { candidateCards, viewerSide } = params;
  if (candidateCards.length === 0) {
    return undefined;
  }

  const ownerSides = new Set(candidateCards.map((card) => card.ownerSide));
  if (ownerSides.size !== 1) {
    return undefined;
  }

  const [ownerSide] = [...ownerSides];
  if (!ownerSide || !viewerSide) {
    return "any";
  }

  return ownerSide === viewerSide ? "you" : "opponent";
}

function buildResolutionSelectionTargetQuery(params: {
  context: TargetResolutionSelectionContext;
  cardSnapshotsById: CardSnapshotMap;
  viewerSide: LorcanaPlayerSide | null;
}): LorcanaCardTarget | null {
  const { context, cardSnapshotsById, viewerSide } = params;
  const candidateCards = context.cardCandidateIds
    .map((cardId) => cardSnapshotsById[cardId] ?? null)
    .filter((card): card is LorcanaCardSnapshot => card !== null);
  const fallbackOwner = getTargetOwnerForViewer({ candidateCards, viewerSide });
  const cardTargetDsl = context.targetDsl.find(isCardTargetDsl) ?? null;

  if (cardTargetDsl) {
    return {
      ...cardTargetDsl,
      owner: cardTargetDsl.owner ?? fallbackOwner ?? "any",
      zones:
        Array.isArray(cardTargetDsl.zones) && cardTargetDsl.zones.length > 0
          ? [...cardTargetDsl.zones]
          : context.allowedZones.length > 0
            ? [...context.allowedZones]
            : undefined,
    };
  }

  if (context.cardCandidateIds.length === 0) {
    return null;
  }

  const cardTypes = new Set(candidateCards.map((card) => card.cardType).filter(Boolean));

  return {
    selector: "all",
    owner: fallbackOwner ?? "any",
    zones: context.allowedZones.length > 0 ? [...context.allowedZones] : undefined,
    cardType:
      cardTypes.size === 1 ? ([...cardTypes][0] as LorcanaCardTarget["cardType"]) : undefined,
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

  if (categoryId !== "play-card" && categoryId !== "shift-card" && categoryId !== "sing-card") {
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

  if (categoryId === "sing-card") {
    return m["sim.guidance.session.chooseSinger"]({ cardLabel: sourceCardLabel });
  }

  if (categoryId === "play-card") {
    return `Choose a target for ${sourceCardLabel}.`;
  }

  return `Choose a target for ${sourceCardLabel}.`;
}

function getChooseSingTogetherStatusMessage(
  sourceCardLabel: string,
  selectedTotal: number,
  requiredValue: number,
): string {
  return `Choose any number of ready characters to sing ${sourceCardLabel}. Selected ${selectedTotal}/${requiredValue}.`;
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
  if (
    session.categoryId === "play-card" &&
    session.candidateMoves.some(
      (move) =>
        move.moveId === "playCard" &&
        typeof (move.params as { resolveOptional?: unknown }).resolveOptional === "boolean",
    )
  ) {
    return `Choose how ${sourceCardLabel} enters play. Bodyguard may enter exerted.`;
  }

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

async function saveVisualSettings(settings: {
  cardBack?: string;
  playmat?: string;
}): Promise<void> {
  try {
    await fetch(`${getApiOrigin()}/v1/users/me/visual-settings`, {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(settings),
    });
  } catch {
    // Silently fail - visual settings are non-critical
  }
}

export class LorcanaSidebarPresenter {
  readonly #game: LorcanaGameContextValue;
  #mobileNoticeId = 0;

  selectedLocale = $state<SupportedLocale>(getLocale());
  isPlayerSettingsOpen = $state(false);
  showRawLogRegistryJson = $state(false);
  showRawErrorDialog = $state(false);
  mobileNotice = $state<{ id: number; message: string; tone: "info" } | null>(null);
  pendingMulliganDangerConfirm = $state<"keepHand" | "allCards" | null>(null);
  skipActionConfirmation = $state(false);
  hotkeyMode = $state<HotkeyMode>("confirm-only");
  cardPreviewMode = $state<CardPreviewMode>("delayed");
  primaryClickAction = $state<PrimaryClickAction>("challenge");
  animationSpeed = $state<AnimationSpeed>("normal");
  soundVolume = $state<number>(50);
  accessibleMobileControls = $state(false);
  guidancePosition = $state<GuidancePosition>("bottom");
  #mulliganSelectionActive = $state(false);
  #actionSelectionSession = $state<ActionSelectionSession | null>(null);
  #resolutionSelectionSession = $state<ResolutionSelectionSession | null>(null);
  #pendingResolutionSourceHint = $state<ResolutionSourceHint | null>(null);
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
        inlineReference?: GuidanceInlineReference;
        actions?: GuidanceAction[];
        mode?: ActivePlayerGuidanceItem["mode"];
      }) => {
        const existing = this.#overlayGuidanceById[item.id];
        const nextItem = {
          id: item.id,
          message: item.message,
          inlineReference: item.inlineReference,
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

    const storedHotkeysEnabled = localStorage.getItem(HOTKEYS_ENABLED_STORAGE_KEY);
    if (
      storedHotkeysEnabled === "off" ||
      storedHotkeysEnabled === "confirm-only" ||
      storedHotkeysEnabled === "on"
    ) {
      this.hotkeyMode = storedHotkeysEnabled;
    } else if (storedHotkeysEnabled === "true") {
      this.hotkeyMode = "on";
    } else if (storedHotkeysEnabled === "false") {
      this.hotkeyMode = "off";
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

    const storedAccessibleMobileControls = localStorage.getItem(
      ACCESSIBLE_MOBILE_CONTROLS_STORAGE_KEY,
    );
    if (storedAccessibleMobileControls === "true") {
      this.accessibleMobileControls = true;
    } else if (storedAccessibleMobileControls === "false") {
      this.accessibleMobileControls = false;
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

    if (this.#startResolutionSelectionSessionForMove(candidate.move, candidate.context)) {
      return;
    }

    if (candidate.move.moveId === "resolveEffect") {
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

  resolveCardSnapshot(cardId: string): LorcanaCardSnapshot | null {
    return this.#game.resolveCardSnapshot(cardId);
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

  expandCardActionCategoryMoves = (
    cardId: string,
    categoryId: ExecutableMovePresentationCategoryId,
  ): ExecutableMoveEntry[] => {
    return this.#game.expandCardActionCategoryMoves(cardId, categoryId);
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

  #capturePendingResolutionSourceHint(move: ExecutableMoveEntry): void {
    const sourceCardId = getCardActionSourceCardId(move);
    if (!sourceCardId) {
      this.#pendingResolutionSourceHint = null;
      return;
    }

    if (move.moveId === "activateAbility") {
      const abilityIndex = getMoveAbilityIndex(move);
      this.#pendingResolutionSourceHint = {
        kind: "activated-ability",
        sourceCardId,
        ...(typeof abilityIndex === "number" ? { abilityIndex } : {}),
      };
      return;
    }

    const sourceCard = this.cardSnapshotsById[sourceCardId] ?? null;
    if (move.moveId === "playCard" && sourceCard?.cardType === "action") {
      this.#pendingResolutionSourceHint = {
        kind: "action-card",
        sourceCardId,
      };
      return;
    }

    this.#pendingResolutionSourceHint = null;
  }

  #getResolutionMoveAbilityIndex(move: PendingResolutionMoveEntry): number | null {
    if (move.moveId === "resolveEffect") {
      const pendingEffect =
        this.boardSnapshot?.pendingEffects.find((effect) => effect.id === move.params.effectId) ??
        null;
      return getPendingEffectPayloadMeta(pendingEffect?.payload).abilityIndex ?? null;
    }

    if (move.moveId === "resolveBag") {
      const bagEffect =
        this.boardSnapshot?.bagEffects.find((effect) => effect.id === move.params.bagId) ?? null;
      return getBagEffectPayloadMeta(bagEffect?.payload).abilityIndex ?? null;
    }

    return null;
  }

  #getSelectionContextForPendingResolutionMove(
    move: PendingResolutionMoveEntry,
  ): ResolutionSelectionContext | null {
    if (move.moveId === "resolveEffect") {
      return (
        this.boardSnapshot?.pendingEffects.find((effect) => effect.id === move.params.effectId)
          ?.selectionContext ?? null
      );
    }

    if (move.moveId === "resolveBag") {
      return (
        this.boardSnapshot?.bagEffects.find((effect) => effect.id === move.params.bagId)
          ?.selectionContext ?? null
      );
    }

    return null;
  }

  #startResolutionSelectionSessionForMove(
    move: PendingResolutionMoveEntry,
    fallbackContext?: ResolutionSelectionContext | null,
  ): boolean {
    const selectionContext =
      fallbackContext ?? this.#getSelectionContextForPendingResolutionMove(move);
    return selectionContext ? this.startResolutionSelectionSession(move, selectionContext) : false;
  }

  #buildResolutionPromptContent(
    move: PendingResolutionMoveEntry,
    context: ResolutionSelectionContext,
  ): ResolutionPromptContent {
    const sourceCard = this.cardSnapshotsById[context.sourceCardId] ?? null;
    const targetSelectionContext = isTargetResolutionSelectionContext(context)
      ? context
      : undefined;
    const persistedAbilityIndex = this.#getResolutionMoveAbilityIndex(move);

    if (move.moveId !== "resolveEffect") {
      this.#pendingResolutionSourceHint = null;
      const copy = buildResolutionCopyBundle({
        kind: context.kind,
        sourceCard,
        abilityIndex: persistedAbilityIndex,
        targetSelectionContext,
      });
      return {
        message: copy.promptMessage,
        inlineReference: copy.promptInlineReference,
      };
    }

    const pendingEffect =
      this.boardSnapshot?.pendingEffects.find((effect) => effect.id === move.params.effectId) ??
      null;
    const pendingPayload = asRecord(pendingEffect?.payload);
    const cardPlayed = asRecord(pendingPayload?.cardPlayed);
    const sourceHint = this.#pendingResolutionSourceHint;
    this.#pendingResolutionSourceHint = null;

    let explicitReferenceLabel: string | null = null;
    let effectTitle: string | null = null;
    let abilityIndex: number | null = persistedAbilityIndex;

    if (cardPlayed?.cardType === "action") {
      explicitReferenceLabel = sourceCard?.label ?? null;
      abilityIndex = null;
    } else if (
      abilityIndex == null &&
      sourceHint?.kind === "activated-ability" &&
      sourceHint.sourceCardId === context.sourceCardId
    ) {
      abilityIndex = sourceHint.abilityIndex ?? null;
      effectTitle = sourceCard?.textEntries?.[sourceHint.abilityIndex ?? 0]?.title?.trim() ?? "";
    } else if (abilityIndex == null && sourceCard) {
      const availableAbilityMoves = this.#game
        .expandCardActionCategoryMoves(sourceCard.cardId, "activate-ability")
        .filter((candidateMove) => candidateMove.moveId === "activateAbility");
      if (availableAbilityMoves.length === 1) {
        const derivedAbilityIndex = getMoveAbilityIndex(availableAbilityMoves[0]!);
        abilityIndex = typeof derivedAbilityIndex === "number" ? derivedAbilityIndex : null;
        effectTitle =
          typeof derivedAbilityIndex === "number"
            ? (sourceCard.textEntries?.[derivedAbilityIndex]?.title?.trim() ?? "")
            : "";
      } else if (sourceCard.textEntries?.length === 1) {
        effectTitle = sourceCard.textEntries[0]?.title?.trim() ?? "";
      }
    }

    const copy = buildResolutionCopyBundle({
      kind: context.kind,
      sourceCard,
      explicitReferenceLabel,
      effectTitle,
      abilityIndex,
      targetSelectionContext,
    });
    return {
      message: copy.promptMessage,
      inlineReference: copy.promptInlineReference,
    };
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
    const localOwnerSide = this.#game.ownerSide();
    const localPlayerId = localOwnerSide ? this.#game.getOwnerIdForSide(localOwnerSide) : null;
    const bagItems = this.boardSnapshot.bagEffects.map<PendingEffectsPopoverItem>((bagEffect) => {
      const resolveMove = this.pendingResolutionMoveByBagId.get(bagEffect.id);
      const payloadMeta = getBagEffectPayloadMeta(bagEffect.payload);
      const selectionContext = bagEffect.selectionContext ?? null;
      const selectionCopy = selectionContext
        ? buildResolutionCopyBundle({
            kind: selectionContext.kind,
            sourceCard: bagEffect.sourceId
              ? (this.cardSnapshotsById[bagEffect.sourceId] ?? null)
              : null,
            abilityIndex: payloadMeta.abilityIndex ?? null,
          })
        : null;
      const isOptionalSelection = selectionContext?.kind === "optional-selection";
      const isLocallyActionable = localPlayerId != null && bagEffect.chooserId === localPlayerId;
      const card = bagEffect.sourceId ? (this.cardSnapshotsById[bagEffect.sourceId] ?? null) : null;
      const availableAbilityMoves = card
        ? this.#game
            .expandCardActionCategoryMoves(card.cardId, "activate-ability")
            .filter((candidateMove) => candidateMove.moveId === "activateAbility")
        : [];
      const instanceReferences = buildPendingEffectCardReferenceViews(
        getResolutionEffectInstanceReferences(bagEffect.payload),
        this.cardSnapshotsById,
      );
      const secondaryTitle = getPendingEffectSecondaryTitle({
        sourceCard: card,
        abilityIndex: payloadMeta.abilityIndex ?? null,
        availableAbilityMoves,
      });
      const summaryTitle = buildPendingEffectSummaryTitle({
        title: card?.label ?? "Queued bag effect",
        secondaryTitle,
        sourceCardId: bagEffect.sourceId ?? null,
        instanceReferences,
      });
      const itemId = `bag:${bagEffect.id}`;
      const isInActiveSession = activeResolutionItemId === itemId && activeSession != null;

      if (isInActiveSession) {
        const canConfirm = this.canConfirmResolutionSelection;
        const canDecline = canDeclineResolutionSelectionSession(activeSession);
        return {
          id: itemId,
          kind: "bag",
          title: card?.label ?? "Queued bag effect",
          secondaryTitle,
          summaryTitle,
          subtitle: "Triggered ability in bag",
          detail: resolveMove
            ? (selectionCopy?.detailMessage ?? "Resolve this queued triggered ability.")
            : "Waiting for the current bag resolver before this effect can be chosen.",
          badge: "Bag",
          card,
          instanceReferences,
          canResolve: false,
          statusMessage: getResolutionInteractionStatusMessage({
            kind: activeSession.context.kind,
            phase: activeSession.phase,
            selectedTargetCount: activeSession.selectedTargets.length,
          }),
          inlineActions:
            activeSession.context.kind === "optional-selection"
              ? [
                  {
                    id: `${itemId}:accept`,
                    label: activeSession.context.acceptLabel,
                    onClick: () => {
                      this.submitResolutionOptional(true);
                    },
                    emphasis: activeSession.selectedOptionalValue === true,
                  },
                  {
                    id: `${itemId}:reject`,
                    label: getResolutionDeclineLabel(activeSession),
                    onClick: () => {
                      this.submitResolutionOptional(false);
                    },
                    emphasis: activeSession.selectedOptionalValue === false,
                  },
                ]
              : activeSession.context.kind === "choice-selection"
                ? [
                    ...activeSession.context.options.map((option) => ({
                      id: `${itemId}:choice:${option.index}`,
                      label: option.label,
                      onClick: () => {
                        this.selectResolutionChoice(option.index);
                      },
                      disabled: !option.legal,
                      emphasis: activeSession.selectedChoiceIndex === option.index,
                    })),
                    ...(canDecline
                      ? [
                          {
                            id: `${itemId}:reject`,
                            label: getResolutionDeclineLabel(activeSession),
                            onClick: this.rejectActiveResolutionSelection,
                          },
                        ]
                      : []),
                  ]
                : canDecline
                  ? [
                      {
                        id: `${itemId}:reject`,
                        label: getResolutionDeclineLabel(activeSession),
                        onClick: this.rejectActiveResolutionSelection,
                      },
                    ]
                  : undefined,
          onConfirm:
            canConfirm && activeSession.context.kind !== "optional-selection"
              ? this.confirmResolutionSelection
              : undefined,
          onCancel:
            activeSession.context.kind === "optional-selection"
              ? undefined
              : this.cancelResolutionSelectionSession,
          isLocalPlayer: localPlayerId != null ? bagEffect.chooserId === localPlayerId : undefined,
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
        secondaryTitle,
        summaryTitle,
        subtitle: "Triggered ability in bag",
        detail: resolveMove
          ? (selectionCopy?.detailMessage ?? "Resolve this queued triggered ability.")
          : "Waiting for the current bag resolver before this effect can be chosen.",
        badge: "Bag",
        card,
        instanceReferences,
        canResolve: isLocallyActionable && !isOptionalSelection && Boolean(resolveMove),
        canAccept: isLocallyActionable && isOptionalSelection && Boolean(resolveMove),
        canReject: isLocallyActionable && isOptionalSelection && Boolean(resolveMove),
        isLocalPlayer: localPlayerId != null ? bagEffect.chooserId === localPlayerId : undefined,
        disabledReason: resolveMove ? undefined : "Not actionable from this view right now.",
        onResolve:
          isLocallyActionable && resolveMove ? () => this.handleResolveBag(resolveMove) : undefined,
        onAccept:
          isLocallyActionable && resolveMove
            ? () => this.handleAcceptBagEffect(resolveMove)
            : undefined,
        onReject:
          isLocallyActionable && resolveMove
            ? () => this.handleRejectBagEffect(resolveMove)
            : undefined,
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
        const chooserId = selectionContext?.chooserId ?? payloadMeta.chooserId ?? null;
        const isLocallyActionable = localPlayerId != null && chooserId === localPlayerId;
        const card = cardId ? (this.cardSnapshotsById[cardId] ?? null) : null;
        const availableAbilityMoves = card
          ? this.#game
              .expandCardActionCategoryMoves(card.cardId, "activate-ability")
              .filter((candidateMove) => candidateMove.moveId === "activateAbility")
          : [];
        const instanceReferences = buildPendingEffectCardReferenceViews(
          getResolutionEffectInstanceReferences(pendingEffect.payload),
          this.cardSnapshotsById,
        );
        const secondaryTitle = getPendingEffectSecondaryTitle({
          sourceCard: card,
          abilityIndex: payloadMeta.abilityIndex ?? null,
          availableAbilityMoves,
        });
        const summaryTitle = buildPendingEffectSummaryTitle({
          title: card?.label ?? "Pending effect",
          secondaryTitle,
          sourceCardId: cardId,
          instanceReferences,
        });
        const pendingKind = selectionContext?.kind ?? payloadMeta.kind;
        const selectionCopy =
          selectionContext && card
            ? buildResolutionCopyBundle({
                kind: selectionContext.kind,
                sourceCard: card,
                abilityIndex: payloadMeta.abilityIndex ?? null,
                targetSelectionContext: isTargetResolutionSelectionContext(selectionContext)
                  ? selectionContext
                  : undefined,
              })
            : selectionContext
              ? buildResolutionCopyBundle({
                  kind: selectionContext.kind,
                  sourceCard: null,
                  abilityIndex: payloadMeta.abilityIndex ?? null,
                  targetSelectionContext: isTargetResolutionSelectionContext(selectionContext)
                    ? selectionContext
                    : undefined,
                })
              : null;
        const isOptionalSelection = pendingKind === "optional-selection";
        const isActive = activePendingEffectId === effectId;

        const isScrySelection = pendingKind === "scry-selection";
        const itemId = `pending:${effectId}`;
        const isInActiveSession = activeResolutionItemId === itemId && activeSession != null;

        if (isInActiveSession) {
          const canConfirm = this.canConfirmResolutionSelection;
          const canDecline = canDeclineResolutionSelectionSession(activeSession);
          return {
            id: itemId,
            kind: "pending",
            title: card?.label ?? "Pending effect",
            secondaryTitle,
            summaryTitle,
            subtitle: selectionCopy?.subtitle ?? "Pending resolution",
            detail:
              selectionCopy?.detailMessage ??
              "This effect is queued and waiting for additional input.",
            badge: "Pending",
            card,
            instanceReferences,
            isActive,
            canResolve: false,
            statusMessage: getResolutionInteractionStatusMessage({
              kind: activeSession.context.kind,
              phase: activeSession.phase,
              selectedTargetCount: activeSession.selectedTargets.length,
            }),
            inlineActions:
              activeSession.context.kind === "optional-selection"
                ? [
                    {
                      id: `${itemId}:accept`,
                      label: activeSession.context.acceptLabel,
                      onClick: () => {
                        this.submitResolutionOptional(true);
                      },
                      emphasis: activeSession.selectedOptionalValue === true,
                    },
                    {
                      id: `${itemId}:reject`,
                      label: getResolutionDeclineLabel(activeSession),
                      onClick: () => {
                        this.submitResolutionOptional(false);
                      },
                      emphasis: activeSession.selectedOptionalValue === false,
                    },
                  ]
                : activeSession.context.kind === "choice-selection"
                  ? [
                      ...activeSession.context.options.map((option) => ({
                        id: `${itemId}:choice:${option.index}`,
                        label: option.label,
                        onClick: () => {
                          this.selectResolutionChoice(option.index);
                        },
                        disabled: !option.legal,
                        emphasis: activeSession.selectedChoiceIndex === option.index,
                      })),
                      ...(canDecline
                        ? [
                            {
                              id: `${itemId}:reject`,
                              label: getResolutionDeclineLabel(activeSession),
                              onClick: this.rejectActiveResolutionSelection,
                            },
                          ]
                        : []),
                    ]
                  : canDecline
                    ? [
                        {
                          id: `${itemId}:reject`,
                          label: getResolutionDeclineLabel(activeSession),
                          onClick: this.rejectActiveResolutionSelection,
                        },
                      ]
                    : undefined,
            onConfirm:
              canConfirm && activeSession.context.kind !== "optional-selection"
                ? this.confirmResolutionSelection
                : undefined,
            onCancel:
              activeSession.context.kind === "optional-selection"
                ? undefined
                : this.cancelResolutionSelectionSession,
            isLocalPlayer:
              localPlayerId != null && chooserId != null ? chooserId === localPlayerId : undefined,
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
          secondaryTitle,
          summaryTitle,
          subtitle: selectionCopy?.subtitle ?? "Pending resolution",
          detail:
            selectionCopy?.detailMessage ??
            "This effect is queued and waiting for additional input.",
          badge: "Pending",
          card,
          instanceReferences,
          isActive,
          canResolve:
            isLocallyActionable &&
            isActive &&
            !isScrySelection &&
            !isOptionalSelection &&
            Boolean(resolveMove),
          canAccept: isLocallyActionable && isActive && isOptionalSelection && Boolean(resolveMove),
          canReject: isLocallyActionable && isActive && isOptionalSelection && Boolean(resolveMove),
          primaryActionLabel: isScrySelection ? m["sim.actions.label.arrangeCards"]({}) : undefined,
          onPrimaryAction:
            isLocallyActionable && isActive && isScrySelection && resolveMove
              ? () => this.handleResolvePendingEffect(resolveMove)
              : undefined,
          disabledReason: isActive
            ? resolveMove
              ? undefined
              : "This pending effect is waiting for the responding player."
            : "This pending effect is waiting for its turn in the resolution queue.",
          onResolve:
            isLocallyActionable &&
            isActive &&
            !isScrySelection &&
            !isOptionalSelection &&
            resolveMove
              ? () => this.handleResolvePendingEffect(resolveMove)
              : undefined,
          onAccept:
            isLocallyActionable && isActive && isOptionalSelection && resolveMove
              ? () => this.handleAcceptPendingEffect(resolveMove)
              : undefined,
          onReject:
            isLocallyActionable && isActive && isOptionalSelection && resolveMove
              ? () => this.handleRejectPendingEffect(resolveMove)
              : undefined,
          isLocalPlayer:
            localPlayerId != null && chooserId != null ? chooserId === localPlayerId : undefined,
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

  #getResolutionSelectionEffectType(
    session: ResolutionSelectionSession,
  ): SupportedResolutionTargetEffectType | null {
    if (!this.boardSnapshot || !isTargetResolutionSelectionContext(session.context)) {
      return null;
    }

    if (session.move.moveId === "resolveEffect") {
      const effectId = session.move.params.effectId;
      const pendingEffect = this.boardSnapshot.pendingEffects.find(
        (effect) => effect.id === effectId,
      );
      const effectType = pendingEffect
        ? getPendingEffectPayloadMeta(pendingEffect.payload).effectType
        : null;
      return isSupportedResolutionTargetEffectType(effectType) ? effectType : null;
    }

    if (session.move.moveId === "resolveBag") {
      const bagId = session.move.params.bagId;
      const bagEffect = this.boardSnapshot.bagEffects.find((effect) => effect.id === bagId);
      const effectType = bagEffect ? getBagEffectPayloadMeta(bagEffect.payload).effectType : null;
      return isSupportedResolutionTargetEffectType(effectType) ? effectType : null;
    }

    return null;
  }

  #getResolutionSelectionPayload(session: ResolutionSelectionSession): unknown | null {
    if (!this.boardSnapshot) {
      return null;
    }

    if (session.move.moveId === "resolveEffect") {
      const effectId = session.move.params.effectId;
      return (
        this.boardSnapshot.pendingEffects.find((effect) => effect.id === effectId)?.payload ?? null
      );
    }

    if (session.move.moveId === "resolveBag") {
      const bagId = session.move.params.bagId;
      return this.boardSnapshot.bagEffects.find((effect) => effect.id === bagId)?.payload ?? null;
    }

    return null;
  }

  #getResolutionAmountSelectionState(session: ResolutionSelectionSession) {
    if (!isTargetResolutionSelectionContext(session.context)) {
      return null;
    }

    const payload = this.#getResolutionSelectionPayload(session);
    if (!payload) {
      return null;
    }

    return buildResolutionAmountSelectionState({
      payload,
      selectedTargets: session.selectedTargets,
      currentAmount: session.selectedAmount,
      cardSnapshotsById: this.cardSnapshotsById,
    });
  }

  #normalizeResolutionSelectionSession(
    session: ResolutionSelectionSession,
  ): ResolutionSelectionSession {
    const amountSelection = this.#getResolutionAmountSelectionState(session);
    return {
      ...session,
      selectedAmount: amountSelection?.value ?? null,
    };
  }

  #getResolutionTargetPromptState(session: ResolutionSelectionSession) {
    if (!isTargetResolutionSelectionContext(session.context)) {
      return null;
    }

    const effectType = this.#getResolutionSelectionEffectType(session);
    const allEntries = this.#getResolutionSelectionCardCandidateIds(session.context).flatMap(
      (cardId) => {
        const card = this.cardSnapshotsById[cardId] ?? null;
        return card
          ? [
              {
                id: `resolution:card:${card.cardId}`,
                kind: "card" as const,
                cardId: card.cardId,
                label: card.label,
                detail: buildAvailableMovesCardDetail(card),
                selected: session.selectedTargets.includes(card.cardId),
              },
            ]
          : [];
      },
    );

    return buildResolutionTargetPromptState({
      effectType,
      context: session.context,
      entries: allEntries,
      selectedTargets: session.selectedTargets,
      cardSnapshotsById: this.cardSnapshotsById,
      preferredActiveSlotIndex: session.activeTargetSlotIndex,
    });
  }

  get resolutionSelectionCandidateCards(): LorcanaCardSnapshot[] {
    const session = this.#resolutionSelectionSession;
    if (!session || !isTargetResolutionSelectionContext(session.context)) {
      return [];
    }

    const prompt = this.#getResolutionTargetPromptState(session);
    const candidateIds =
      prompt?.candidateEntries.flatMap((entry) =>
        entry.kind === "card" && entry.cardId ? [entry.cardId] : [],
      ) ?? this.#getResolutionSelectionCardCandidateIds(session.context);

    return candidateIds
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
      const prompt = this.#getResolutionTargetPromptState(resolutionSession);
      if (prompt) {
        return getUniqueOrderedIds(prompt.slots.map((slot) => slot.targetCardId));
      }

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
          ...this.#actionSelectionSession.selectedCardIds,
        ])
      : [];
  }

  get selectableActionSessionCardIds(): string[] {
    const resolutionSession = this.#resolutionSelectionSession;
    if (resolutionSession && isTargetResolutionSelectionContext(resolutionSession.context)) {
      const prompt = this.#getResolutionTargetPromptState(resolutionSession);
      if (prompt) {
        return prompt.candidateEntries.flatMap((entry) =>
          entry.kind === "card" && entry.cardId ? [entry.cardId] : [],
        );
      }

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
      if (isDiscardCostSelectionSession(session)) {
        const localSide = this.ownerSide;
        return Object.values(this.#game.cardSnapshotsById())
          .filter((c) => c.zoneId === "hand" && c.ownerSide === localSide)
          .map((c) => c.cardId);
      }

      if (isSingTogetherSelectionSession(session)) {
        const metadata = getSingTogetherSelectionMetadata(getSingTogetherSelectionMove(session));
        return metadata ? metadata.candidateCards.map((candidate) => candidate.cardId) : [];
      }

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
      (session.categoryId !== "challenge" &&
        session.categoryId !== "play-card" &&
        session.categoryId !== "sing-card") ||
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
        sessionKey: "mulligan-selection",
        sourceCardId: null,
        categoryId: "alter-hand",
        categoryLabel,
        title: categoryLabel,
        message: m["sim.guidance.pregame.mulligan"]({}),
        entries,
        effectType: null,
        target: {
          selector: "all",
          owner: "you",
          zones: ["hand"],
        },
        allowedZones: ["hand"],
        candidateCardIds: handCards.map((card) => card.cardId),
        candidatePlayerIds: [],
        viewerSide: this.ownerSide,
        candidateEntries: entries,
        activeSlotIndex: null,
        slots: [],
        amountSelection: null,
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
      const canDecline = canDeclineResolutionSelectionSession(resolutionSession);
      const declineLabel = canDecline ? getResolutionDeclineLabel(resolutionSession) : undefined;
      const categoryLabel =
        resolutionSession.move.moveId === "resolveBag"
          ? m["sim.actions.label.resolveTriggeredAbility"]({})
          : m["sim.actions.label.resolveEffect"]({});
      const sourceCard = this.cardSnapshotsById[context.sourceCardId] ?? null;
      const abilityIndex = this.#getResolutionMoveAbilityIndex(resolutionSession.move);
      const resolutionCopy = buildResolutionCopyBundle({
        kind: context.kind,
        sourceCard,
        abilityIndex,
        targetSelectionContext: isTargetResolutionSelectionContext(context) ? context : undefined,
      });
      const sourceLabel = sourceCard?.label ?? "Pending effect";
      const selectionTitle = isOptionalContinuationResolutionContext(context)
        ? (resolutionCopy.optionalContinuationLabel ?? sourceLabel)
        : sourceLabel;

      if (isTargetResolutionSelectionContext(context)) {
        const effectType = this.#getResolutionSelectionEffectType(resolutionSession);
        const prompt = this.#getResolutionTargetPromptState(resolutionSession);
        const cardCandidateIds = this.#getResolutionSelectionCardCandidateIds(context);
        const selectionTarget = buildResolutionSelectionTargetQuery({
          context,
          cardSnapshotsById: this.cardSnapshotsById,
          viewerSide: this.ownerSide,
        });
        const sessionKey =
          this.#buildAutoOpenResolutionKey(resolutionSession.move, context) ??
          `${resolutionSession.move.id}:${context.requestId}`;
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
          sessionKey,
          sourceCardId: context.sourceCardId,
          categoryId: "unknown",
          categoryLabel,
          title: selectionTitle,
          message:
            getResolutionTargetPromptMessage(effectType, prompt?.activeSlotIndex ?? null) ??
            resolutionSession.promptMessage,
          entries: prompt?.candidateEntries ?? [...playerEntries, ...cardEntries],
          effectType,
          target: selectionTarget,
          allowedZones: [...context.allowedZones],
          candidateCardIds: [...cardCandidateIds],
          candidatePlayerIds: [...context.playerCandidateIds],
          viewerSide: this.ownerSide,
          candidateEntries: prompt?.candidateEntries ?? [...playerEntries, ...cardEntries],
          activeSlotIndex: prompt?.activeSlotIndex ?? null,
          slots: prompt?.slots ?? [],
          amountSelection: this.#getResolutionAmountSelectionState(resolutionSession),
          selectedTargetLabels,
          minimumSelections: context.minSelections,
          maximumSelections: context.maxSelections,
          canBack: false,
          canCancel: true,
          canDecline,
          declineLabel,
          canConfirm: this.canConfirmResolutionSelection,
        };
      }

      if (context.kind === "choice-selection") {
        return {
          mode: "resolution-choice",
          categoryId: "unknown",
          categoryLabel,
          title: selectionTitle,
          message: resolutionSession.promptMessage,
          entries: context.options.map((option) => ({
            id: `resolution:choice:${option.index}`,
            kind: "option" as const,
            moveId: String(option.index),
            label: sourceCard?.choiceOptionTexts?.[option.index] ?? option.label,
            selected: resolutionSession.selectedChoiceIndex === option.index,
            disabled: !option.legal,
            disabledReason: option.legal ? undefined : "Unavailable",
          })),
          canBack: false,
          canCancel: true,
          canDecline,
          declineLabel,
          canConfirm: this.canConfirmResolutionSelection,
        };
      }

      if (context.kind === "optional-selection") {
        return {
          mode: "resolution-optional",
          categoryId: "unknown",
          categoryLabel,
          title: sourceLabel,
          message: resolutionSession.promptMessage,
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
          canCancel: false,
          canDecline,
          declineLabel,
          canConfirm: false,
        };
      }

      if (context.kind === "name-card-selection") {
        return {
          mode: "resolution-name-card",
          categoryId: "unknown",
          categoryLabel,
          title: selectionTitle,
          message: resolutionSession.promptMessage,
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
          canDecline,
          declineLabel,
          canConfirm: this.canConfirmResolutionSelection,
        };
      }

      if (context.kind === "scry-selection") {
        const previewDestinations = buildScryPreviewDestinations(
          this.cardSnapshotsById,
          context,
          resolutionSession.scryDestinations,
        );
        const unassignedCardIds = getScryUnassignedCardIds(previewDestinations, context);
        const entries = context.revealedCardIds.flatMap((cardId) => {
          const card = getScryCardView(this.cardSnapshotsById, context, cardId);
          const assignedRule = previewDestinations.find((destination) =>
            destination.cards.includes(cardId),
          );
          const availableDestinationIds = context.destinationRules
            .filter((rule) => canAssignCardToScryDestination(card ?? {}, rule))
            .map((rule) => rule.id);
          return card
            ? [
                {
                  id: `resolution:scry-card:${card.cardId}`,
                  kind: "scry-card" as const,
                  cardId: card.cardId,
                  label: card.label,
                  availableDestinationIds,
                  detail: assignedRule
                    ? `Goes to ${getScryZoneLabel(assignedRule.zone)}`
                    : "Needs a destination",
                  selected: assignedRule !== undefined,
                },
              ]
            : [];
        });

        return {
          mode: "resolution-scry",
          categoryId: "unknown",
          categoryLabel,
          sourceCardId: sourceCard?.cardId ?? null,
          title: selectionTitle,
          message:
            unassignedCardIds.length > 0
              ? `${resolutionSession.promptMessage} ${unassignedCardIds.length} card${unassignedCardIds.length === 1 ? "" : "s"} still need a destination.`
              : resolutionSession.promptMessage,
          entries,
          remainingManualAssignments: unassignedCardIds.length,
          destinations: context.destinationRules.map((rule) => {
            const destination = previewDestinations.find((candidate) => candidate.id === rule.id);
            const cards = destination?.cards ?? [];
            const detail = getScryDestinationConstraintSummary(rule);

            return {
              id: rule.id,
              zone: rule.zone,
              label: rule.label ?? getScryZoneLabel(rule.zone),
              detail,
              orderingEnabled: isScryDestinationManuallyOrdered(rule),
              rule,
              cards: cards.flatMap((cardId) => {
                const card = getScryCardView(this.cardSnapshotsById, context, cardId);
                const manualDestination = resolutionSession.scryDestinations.find(
                  (candidate) => candidate.id === rule.id,
                );
                const isAutoAssigned = !manualDestination?.cards.includes(cardId);
                return card
                  ? [
                      {
                        id: `resolution:scry-destination:${rule.id}:${card.cardId}`,
                        kind: "scry-card" as const,
                        cardId: card.cardId,
                        label: card.label,
                        detail: isAutoAssigned
                          ? "Automatic remainder"
                          : this.cardSnapshotsById[card.cardId]
                            ? buildAvailableMovesCardDetail(this.cardSnapshotsById[card.cardId]!)
                            : undefined,
                        selected: true,
                      },
                    ]
                  : [];
              }),
            };
          }),
          canBack: false,
          canCancel: true,
          canDecline,
          declineLabel,
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
    const singTogetherMove = getSingTogetherSelectionMove(session);
    const singTogetherMetadata = getSingTogetherSelectionMetadata(singTogetherMove);
    const singTogetherTotal =
      singTogetherMetadata && singTogetherMove
        ? getSingTogetherSelectionTotal(session, singTogetherMove)
        : 0;

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
      message =
        singTogetherMetadata && singTogetherMove
          ? getChooseSingTogetherStatusMessage(
              sourceCardLabel,
              singTogetherTotal,
              singTogetherMetadata.requiredValue,
            )
          : getChooseTargetStatusMessage(session.categoryId, sourceCardLabel);
      entries = this.selectableActionSessionCardIds.flatMap((cardId) => {
        const card = this.cardSnapshotsById[cardId] ?? null;
        const singerValue =
          singTogetherMetadata?.candidateCards.find((candidate) => candidate.cardId === cardId)
            ?.value ?? null;
        return card
          ? [
              {
                id: `available-moves:card:${card.cardId}`,
                kind: "card" as const,
                cardId: card.cardId,
                label: card.label,
                detail:
                  singerValue != null
                    ? `Counts as ${singerValue} to sing`
                    : buildAvailableMovesCardDetail(card),
                selected:
                  singTogetherMetadata != null
                    ? session.selectedCardIds.includes(card.cardId)
                    : session.targetCardId === card.cardId,
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
      targetLabel:
        singTogetherMetadata != null
          ? session.selectedCardIds
              .map((cardId) => this.cardSnapshotsById[cardId]?.label ?? null)
              .filter((label): label is string => Boolean(label))
              .join(", ")
          : (targetCard?.label ?? null),
      selectedMoveId: session.selectedMoveId,
      selectedMoveLabel: currentMove
        ? currentMove.presentation.kind === "targeted"
          ? currentMove.presentation.optionLabel
          : currentMove.label
        : null,
      canBack: session.phase !== "choose-source",
      canCancel: true,
      canConfirm:
        (session.phase === "confirm" && currentMove !== null) ||
        (session.phase === "choose-target" && canConfirmSingTogetherSelection(session)) ||
        (session.phase === "choose-target" && canConfirmDiscardCostSelection(session, currentMove)),
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
      (this.#actionSelectionSession?.categoryId === "play-card" ||
        this.#actionSelectionSession?.categoryId === "sing-card") &&
      this.#actionSelectionSession.phase === "choose-target" &&
      this.invalidActionSessionCardIds.includes(cardId)
    ) {
      return this.#actionSelectionSession.categoryId === "sing-card"
        ? "This character can't sing this song right now."
        : "This card is not a valid target for this action.";
    }

    return this.#game.invalidChallengeTargetReasons()[cardId] ?? null;
  }

  getCardActionViews = (card: LorcanaCardSnapshot): CardActionView[] =>
    buildCardActionViews({
      card,
      executableMoves: this.#game
        .expandCardMoves(card.cardId)
        .filter(
          (move) =>
            move.presentation.categoryId !== "challenge" &&
            move.presentation.categoryId !== "move-to-location",
        ),
      ownerSide: this.ownerSide,
      challengeReadyCardIds: this.#game.challengeReadyCardIds(),
      movableToLocationCardIds:
        this.moveCategorySummaries
          .find((summary) => summary.categoryId === "move-to-location")
          ?.sourceCardIds.slice() ?? [],
    });

  getSingleClickItemAbilityAction = (card: LorcanaCardSnapshot): CardActionView | null => {
    if (
      card.zoneId !== "play" ||
      card.cardType !== "item" ||
      !this.ownerSide ||
      card.ownerSide !== this.ownerSide
    ) {
      return null;
    }

    const action = this.getCardActionViews(card).find(
      (candidateAction) =>
        candidateAction.categoryId === "activate-ability" && candidateAction.enabled,
    );
    if (!action || action.moves.length !== 1) {
      return null;
    }

    return {
      ...action,
      moves: [action.moves[0]!],
    };
  };

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

    return this.handleCardActionClick(
      {
        ...action,
        moves: [matchingMove],
      },
      { skipConfirmation: true },
    );
  };

  handleCardActionClick = (
    action: CardActionView,
    options?: { skipConfirmation?: boolean; preselectedTargetCardId?: string },
  ): boolean => {
    if (!action.enabled) {
      return false;
    }

    const requireConfirmation = !this.skipActionConfirmation && !options?.skipConfirmation;
    // For multi-step session flows (choose-target → confirm), the hover-card skipConfirmation
    // override should not suppress the user's global confirmation preference — the confirmation
    // step is a deliberate second decision, not a redundant prompt for an already-decided action.
    const requireSessionConfirmation = !this.skipActionConfirmation;
    const actionMoves =
      action.interaction === "expand-on-click"
        ? this.#game.expandCardActionCategoryMoves(action.cardId, action.categoryId)
        : action.moves;

    if (actionMoves.length === 0) {
      return false;
    }

    if (action.categoryId === "challenge") {
      const session = buildActionSelectionSession(
        action.categoryId,
        actionMoves,
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

    if (action.categoryId === "move-to-location") {
      const session = buildActionSelectionSession(
        action.categoryId,
        actionMoves,
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
        actionMoves,
        requireConfirmation,
      );
      if (!session) {
        return false;
      }

      const sourceMoves = getSourceMovesForActionSelectionSession(session, action.cardId);
      const singleMove = sourceMoves.length === 1 ? sourceMoves[0] : null;
      this.pendingMulliganDangerConfirm = null;
      this.#secondLayerCategoryLabel = null;
      this.#game.setPendingError(null);

      if (singleMove && isDiscardCostSelectionMove(singleMove)) {
        this.#setActionSelectionSession({
          ...session,
          sourceCardId: action.cardId,
          selectedMoveId: singleMove.id,
          selectedCardIds: [],
          phase: "choose-target",
        });
        const discardCount = getDiscardCostCount(singleMove);
        this.#game.setStatusMessage(
          discardCount === 1
            ? "Choose a card from your hand to discard."
            : `Choose ${discardCount} cards from your hand to discard.`,
        );
        return true;
      }

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
      (action.categoryId === "play-card" ||
        action.categoryId === "shift-card" ||
        action.categoryId === "sing-card") &&
      usesTargetSelectionForActionSelectionMoves(action.categoryId, actionMoves)
    ) {
      const session = buildActionSelectionSession(
        action.categoryId,
        actionMoves,
        requireSessionConfirmation,
      );
      if (!session) {
        return false;
      }

      const preselectedTargetMoves = options?.preselectedTargetCardId
        ? actionMoves.filter(
            (move) =>
              getTargetCardIdForActionSelectionMove(action.categoryId, move) ===
              options.preselectedTargetCardId,
          )
        : [];
      const preselectedMove =
        preselectedTargetMoves.length === 1 ? (preselectedTargetMoves[0] ?? null) : null;
      const nextSession = {
        ...session,
        sourceCardId: action.cardId,
        targetCardId:
          preselectedTargetMoves.length > 0 && options?.preselectedTargetCardId
            ? options.preselectedTargetCardId
            : null,
        selectedMoveId: preselectedMove?.id ?? null,
        phase:
          preselectedTargetMoves.length > 1
            ? "choose-option"
            : preselectedMove
              ? session.confirmationRequired
                ? "confirm"
                : "executing"
              : "choose-target",
      } satisfies ActionSelectionSession;

      this.pendingMulliganDangerConfirm = null;
      this.#secondLayerCategoryLabel = null;
      this.#game.setPendingError(null);

      if (preselectedTargetMoves.length > 1) {
        this.#setActionSelectionSession(nextSession);
        this.#game.setStatusMessage(
          getChooseOptionStatusMessage(
            session,
            this.cardSnapshotsById[action.cardId]?.label ?? m["sim.card.unknown"]({}),
          ),
        );
        return true;
      }

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
      actionMoves.length > 1
    ) {
      const session = buildActionSelectionSession(
        action.categoryId,
        actionMoves,
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
        getChooseOptionStatusMessage(
          session,
          this.cardSnapshotsById[action.cardId]?.label ?? m["sim.card.unknown"]({}),
        ),
      );
      return true;
    }

    if (action.categoryId === "sing-card" && isSingTogetherSelectionMove(actionMoves[0])) {
      const session = buildActionSelectionSession(
        action.categoryId,
        actionMoves,
        requireSessionConfirmation,
      );
      const singTogetherMove = actionMoves[0];
      const singTogetherMetadata = getSingTogetherSelectionMetadata(singTogetherMove);
      if (!session || !singTogetherMove || !singTogetherMetadata) {
        return false;
      }

      this.#setActionSelectionSession({
        ...session,
        sourceCardId: action.cardId,
        phase: "choose-target",
        selectedMoveId: singTogetherMove.id,
      });
      this.pendingMulliganDangerConfirm = null;
      this.#secondLayerCategoryLabel = null;
      this.#game.setPendingError(null);
      this.#game.setStatusMessage(
        getChooseSingTogetherStatusMessage(
          this.cardSnapshotsById[action.cardId]?.label ?? m["sim.card.unknown"]({}),
          0,
          singTogetherMetadata.requiredValue,
        ),
      );
      return true;
    }

    this.handleAvailableMoveClick(actionMoves[0]);
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

    const moveParams = (() => {
      if (isSingTogetherSelectionMove(move) && session.selectedCardIds.length > 0) {
        const playCardParams = move.params as LorcanaSimulatorMoveParams["playCard"];
        return {
          ...playCardParams,
          singers: [...session.selectedCardIds],
        } satisfies LorcanaSimulatorMoveParams["playCard"];
      }

      if (isDiscardCostSelectionMove(move) && session.selectedCardIds.length > 0) {
        const activateParams = move.params as LorcanaSimulatorMoveParams["activateAbility"];
        return {
          ...activateParams,
          costs: {
            ...(activateParams.costs ?? {}),
            discardCards: [...session.selectedCardIds],
          },
        } satisfies LorcanaSimulatorMoveParams["activateAbility"];
      }

      return move.params;
    })();

    this.#capturePendingResolutionSourceHint(move);
    const success = this.#game.executeMove(move.moveId, moveParams, {
      clearChallengeMode: true,
      clearSelection: true,
      status: move.label,
    });

    if (success) {
      this.#setActionSelectionSession(null);
      return true;
    }

    this.#pendingResolutionSourceHint = null;
    this.#setActionSelectionSession(session);
    return false;
  }

  get actionSelectionGuidance(): ActivePlayerGuidanceItem[] {
    const resolutionSession = this.#resolutionSelectionSession;
    if (resolutionSession && isTargetResolutionSelectionContext(resolutionSession.context)) {
      const canDecline = canDeclineResolutionSelectionSession(resolutionSession);
      const selectedCount = resolutionSession.selectedTargets.length;

      return [
        {
          id: "resolution-selection-inline",
          message: resolutionSession.promptMessage,
          inlineReference: resolutionSession.promptInlineReference ?? undefined,
          actions: [
            ...(canDecline
              ? [
                  {
                    id: "resolution-selection-decline",
                    label: getResolutionDeclineLabel(resolutionSession),
                    onClick: this.rejectActiveResolutionSelection,
                  } satisfies GuidanceAction,
                ]
              : []),
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
          message: resolutionSession.promptMessage,
          inlineReference: resolutionSession.promptInlineReference ?? undefined,
          actions: [
            {
              id: "resolution-optional-accept",
              label: resolutionSession.context.acceptLabel,
              onClick: () => {
                this.submitResolutionOptional(true);
              },
              emphasis: resolutionSession.selectedOptionalValue === true,
            },
            {
              id: "resolution-optional-reject",
              label: getResolutionDeclineLabel(resolutionSession),
              onClick: () => {
                this.submitResolutionOptional(false);
              },
              emphasis: resolutionSession.selectedOptionalValue === false,
            },
          ],
          mode: "default",
          order: 2,
        },
      ];
    }

    if (resolutionSession && resolutionSession.context.kind === "choice-selection") {
      const canDecline = canDeclineResolutionSelectionSession(resolutionSession);
      return [
        {
          id: "resolution-choice-inline",
          message: resolutionSession.promptMessage,
          inlineReference: resolutionSession.promptInlineReference ?? undefined,
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
            ...(canDecline
              ? [
                  {
                    id: "resolution-choice-decline",
                    label: getResolutionDeclineLabel(resolutionSession),
                    onClick: this.rejectActiveResolutionSelection,
                  } satisfies GuidanceAction,
                ]
              : []),
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
      const canDecline = canDeclineResolutionSelectionSession(resolutionSession);
      return [
        {
          id: "resolution-name-card-inline",
          message: resolutionSession.promptMessage,
          inlineReference: resolutionSession.promptInlineReference ?? undefined,
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
            ...(canDecline
              ? [
                  {
                    id: "resolution-name-card-decline",
                    label: getResolutionDeclineLabel(resolutionSession),
                    onClick: this.rejectActiveResolutionSelection,
                  } satisfies GuidanceAction,
                ]
              : []),
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
          item.isLocalPlayer !== false &&
          Boolean(
            (item.canResolve && item.onResolve) ||
            (item.canAccept && item.onAccept) ||
            (item.canReject && item.onReject),
          ),
      );
      if (actionableItems.length > 0) {
        return actionableItems.map((item) => ({
          id: `resolve-pending:${item.id}`,
          message: item.summaryTitle ?? item.title,
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
          message: getChooseOptionStatusMessage(session, sourceCard.label),
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
        : isSingTogetherSelectionSession(session)
          ? getChooseSingTogetherStatusMessage(
              sourceCard?.label ?? m["sim.card.unknown"]({}),
              getSingTogetherSelectionTotal(session),
              getSingTogetherSelectionMetadata(getSingTogetherSelectionMove(session))
                ?.requiredValue ?? 0,
            )
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
          ...(session.phase === "choose-target" && isSingTogetherSelectionSession(session)
            ? [
                {
                  id: "action-selection-confirm",
                  label: m["sim.actions.confirmMoveLabel"]({ label: session.label }),
                  onClick: this.confirmActionSelection,
                  disabled: !canConfirmSingTogetherSelection(session),
                  emphasis: true,
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
      const prompt = this.#getResolutionTargetPromptState(session);
      if (prompt) {
        const selectionCount = prompt.slots.filter((slot) => slot.targetId).length;
        return (
          selectionCount >= context.minSelections &&
          (context.maxSelections <= 0 || selectionCount <= context.maxSelections)
        );
      }

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
      const previewDestinations = buildScryPreviewDestinations(
        this.cardSnapshotsById,
        context,
        session.scryDestinations,
      );
      const assignedIds = new Set(previewDestinations.flatMap((destination) => destination.cards));
      if (assignedIds.size !== context.revealedCardIds.length) {
        return false;
      }

      return context.destinationRules.every((rule) => {
        const destination = previewDestinations.find((candidate) => candidate.id === rule.id);
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
    const promptContent = this.#buildResolutionPromptContent(move, context);
    const abilityIndex = this.#getResolutionMoveAbilityIndex(move);
    const sessionStatusMessage = buildResolutionCopyBundle({
      kind: context.kind,
      sourceCard: this.cardSnapshotsById[context.sourceCardId] ?? null,
      explicitReferenceLabel: promptContent.inlineReference?.label ?? null,
      abilityIndex,
      targetSelectionContext: isTargetResolutionSelectionContext(context) ? context : undefined,
    }).sessionStatusMessage;
    this.#actionSelectionSession = null;
    this.#resolutionSelectionSession = this.#normalizeResolutionSelectionSession(
      buildResolutionSelectionSession(
        move,
        context,
        promptContent.message,
        promptContent.inlineReference,
        sessionStatusMessage,
      ),
    );
    this.pendingMulliganDangerConfirm = null;
    this.#secondLayerCategoryLabel = null;
    this.#game.setPendingError(null);
    this.#game.setStatusMessage(sessionStatusMessage);
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

    this.#resolutionSelectionSession = this.#normalizeResolutionSelectionSession({
      ...session,
      selectedTargets: nextSelectedTargets,
    });
    this.#game.setPendingError(null);
    if (
      shouldAutoSubmitResolutionTargetSelection(
        this.#resolutionSelectionSession,
        this.skipActionConfirmation,
      ) &&
      this.canConfirmResolutionSelection
    ) {
      return this.confirmResolutionSelection();
    }

    return true;
  };

  assignResolutionTargetSelection = (targetId: string): boolean => {
    const session = this.#resolutionSelectionSession;
    if (!session || !isTargetResolutionSelectionContext(session.context)) {
      return false;
    }

    const prompt = this.#getResolutionTargetPromptState(session);
    if (!prompt || prompt.activeSlotIndex === null) {
      return this.toggleResolutionTargetSelection(targetId);
    }

    const candidateIds = prompt.candidateEntries.flatMap((entry) =>
      entry.kind === "card" && entry.cardId ? [entry.cardId] : [],
    );
    if (!includesSelectionId(candidateIds, targetId)) {
      return false;
    }

    const nextSelectedTargets = [...session.selectedTargets];
    nextSelectedTargets[prompt.activeSlotIndex] = targetId;
    const nextSession = {
      ...session,
      activeTargetSlotIndex: null,
      selectedTargets: nextSelectedTargets,
    };
    const nextPrompt = this.#getResolutionTargetPromptState(nextSession);

    this.#resolutionSelectionSession = this.#normalizeResolutionSelectionSession({
      ...nextSession,
      activeTargetSlotIndex: nextPrompt?.activeSlotIndex ?? null,
    });
    this.#game.setPendingError(null);
    if (
      shouldAutoSubmitResolutionTargetSelection(
        this.#resolutionSelectionSession,
        this.skipActionConfirmation,
      ) &&
      this.canConfirmResolutionSelection
    ) {
      return this.confirmResolutionSelection();
    }

    return true;
  };

  selectResolutionTargetSlot = (slotIndex: number): boolean => {
    const session = this.#resolutionSelectionSession;
    if (!session || !isTargetResolutionSelectionContext(session.context)) {
      return false;
    }

    const prompt = this.#getResolutionTargetPromptState(session);
    const slot = prompt?.slots[slotIndex];
    if (!prompt || !slot || slot.locked) {
      return false;
    }

    this.#resolutionSelectionSession = {
      ...session,
      activeTargetSlotIndex: slotIndex,
    };
    this.#game.setPendingError(null);
    return true;
  };

  updateResolutionSelectedAmount = (value: number): boolean => {
    const session = this.#resolutionSelectionSession;
    if (!session) {
      return false;
    }

    const amountSelection = this.#getResolutionAmountSelectionState(session);
    if (!amountSelection) {
      return false;
    }

    this.#resolutionSelectionSession = {
      ...session,
      selectedAmount: Math.max(
        amountSelection.min,
        Math.min(amountSelection.max, Math.floor(value)),
      ),
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

  submitResolutionOptional = (value: boolean): boolean => {
    if (!this.selectResolutionOptional(value)) {
      return false;
    }

    return this.confirmResolutionSelection();
  };

  rejectActiveResolutionSelection = (): boolean => {
    const session = this.#resolutionSelectionSession;
    if (!canDeclineResolutionSelectionSession(session)) {
      return false;
    }
    const activeSession = session;
    if (!activeSession) {
      return false;
    }

    if (activeSession.move.moveId === "resolveEffect") {
      const success = this.handleRejectPendingEffect(activeSession.move);
      if (success) {
        this.#resolutionSelectionSession = null;
      }
      return success;
    }

    if (activeSession.move.moveId === "resolveBag") {
      const success = this.handleRejectBagEffect(activeSession.move);
      if (success) {
        this.#resolutionSelectionSession = null;
      }
      return success;
    }

    return false;
  };

  assignResolutionScryCard = (cardId: string, destinationId: string): boolean => {
    const session = this.#resolutionSelectionSession;
    if (!session || session.context.kind !== "scry-selection") {
      return false;
    }

    const rule = session.context.destinationRules.find(
      (candidate) => candidate.id === destinationId,
    );
    const card = getScryCardView(this.cardSnapshotsById, session.context, cardId);
    if (
      !rule ||
      !card ||
      !includesSelectionId(session.context.revealedCardIds, cardId) ||
      !canAssignCardToScryDestination(card, rule)
    ) {
      return false;
    }

    const nextDestinations = session.scryDestinations.map((destination) => ({
      ...destination,
      cards: destination.cards.filter((existingCardId) => existingCardId !== cardId),
    }));
    const targetDestination = nextDestinations.find(
      (destination) => destination.id === destinationId,
    );
    if (!targetDestination) {
      return false;
    }

    const previewDestinations = buildScryPreviewDestinations(
      this.cardSnapshotsById,
      session.context,
      nextDestinations,
    );
    const previewTarget = previewDestinations.find(
      (destination) => destination.id === destinationId,
    );
    if (rule.max !== null && (previewTarget?.cards.length ?? 0) >= rule.max) {
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

  reorderResolutionScryCard = (
    destinationId: string,
    cardId: string,
    direction: "up" | "down",
  ): boolean => {
    const session = this.#resolutionSelectionSession;
    if (!session || session.context.kind !== "scry-selection") {
      return false;
    }

    const rule = session.context.destinationRules.find(
      (candidate) => candidate.id === destinationId,
    );
    if (!rule || !isScryDestinationManuallyOrdered(rule)) {
      return false;
    }

    const nextDestinations = buildScryPreviewDestinations(
      this.cardSnapshotsById,
      session.context,
      session.scryDestinations,
    ).map((destination) => ({
      ...destination,
      cards: [...destination.cards],
    }));
    const targetDestination = nextDestinations.find(
      (destination) => destination.id === destinationId,
    );
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

    const amountSelection = this.#getResolutionAmountSelectionState(session);

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
                  destinations: buildScryPreviewDestinations(
                    this.cardSnapshotsById,
                    session.context,
                    session.scryDestinations,
                  ).map((destination) => ({
                    zone: destination.zone,
                    cards: [...destination.cards],
                  })),
                }
              : {
                  ...(isTargetResolutionSelectionContext(session.context) &&
                  session.context.originatesFromOptional === true
                    ? { resolveOptional: true }
                    : {}),
                  targets: [...session.selectedTargets],
                  ...(amountSelection ? { amount: amountSelection.value } : {}),
                };

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

    if (this.#startResolutionSelectionSessionForMove(move)) {
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

    if (this.#startResolutionSelectionSessionForMove(move)) {
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

  handleRejectBagEffect = (move: PendingResolutionMoveEntry): boolean => {
    if (move.moveId !== "resolveBag") {
      return false;
    }

    return this.#game.executeMove(
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

  handleRejectPendingEffect = (move: PendingResolutionMoveEntry): boolean => {
    if (move.moveId !== "resolveEffect") {
      return false;
    }
    return this.#game.executeMove(
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
      return this.assignResolutionTargetSelection(card.cardId);
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
          selectedCardIds: [],
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
          selectedCardIds: [],
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
          selectedCardIds: [],
          selectedMoveId: null,
          phase: "choose-option",
        });
        this.#game.setPendingError(null);
        this.#game.setStatusMessage(getChooseOptionStatusMessage(session, card.label));
        return true;
      }

      const move = sourceMoves[0];
      const singTogetherMetadata = getSingTogetherSelectionMetadata(move);
      if (singTogetherMetadata) {
        this.#setActionSelectionSession({
          ...session,
          sourceCardId: card.cardId,
          targetCardId: null,
          selectedCardIds: [],
          selectedMoveId: move.id,
          phase: "choose-target",
        });
        this.#game.setPendingError(null);
        this.#game.setStatusMessage(
          getChooseSingTogetherStatusMessage(card.label, 0, singTogetherMetadata.requiredValue),
        );
        return true;
      }

      const nextSession = {
        ...session,
        sourceCardId: card.cardId,
        targetCardId: null,
        selectedCardIds: [],
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
      if (isDiscardCostSelectionSession(session)) {
        const discardCostMove = getDiscardCostSelectionMove(session);
        const discardCount = getDiscardCostCount(discardCostMove);

        if (!discardCostMove || discardCount <= 0) {
          this.#game.setPendingError("Invalid discard cost selection state.");
          return false;
        }

        // Only allow cards from the active player's hand
        const localSide = this.ownerSide;
        const cardSnapshot = this.#game.cardSnapshotsById()[card.cardId];
        if (!cardSnapshot || cardSnapshot.zoneId !== "hand" || cardSnapshot.ownerSide !== localSide) {
          this.#game.setPendingError("You can only discard cards from your hand.");
          return false;
        }

        const nextSelectedCardIds = session.selectedCardIds.includes(card.cardId)
          ? session.selectedCardIds.filter((selectedCardId) => selectedCardId !== card.cardId)
          : session.selectedCardIds.length < discardCount
            ? [...session.selectedCardIds, card.cardId]
            : session.selectedCardIds;

        const nextSession = {
          ...session,
          targetCardId: null,
          selectedCardIds: nextSelectedCardIds,
        } satisfies ActionSelectionSession;

        this.#setActionSelectionSession(nextSession);
        this.#game.setPendingError(null);
        const selectedCount = nextSelectedCardIds.length;
        this.#game.setStatusMessage(
          discardCount === 1
            ? selectedCount === 1
              ? "Card selected. Confirm to activate the ability."
              : "Choose a card from your hand to discard."
            : `${selectedCount}/${discardCount} cards selected for discard.`,
        );
        return true;
      }

      if (isSingTogetherSelectionSession(session)) {
        const singTogetherMove = getSingTogetherSelectionMove(session);
        const singTogetherMetadata = getSingTogetherSelectionMetadata(singTogetherMove);
        if (
          !singTogetherMetadata ||
          !singTogetherMetadata.candidateCards.some((candidate) => candidate.cardId === card.cardId)
        ) {
          this.#game.setPendingError(
            this.getActionSessionCardReason(card.cardId) ??
              "This character can't sing this song right now.",
          );
          return false;
        }

        const nextSelectedCardIds = session.selectedCardIds.includes(card.cardId)
          ? session.selectedCardIds.filter((selectedCardId) => selectedCardId !== card.cardId)
          : [...session.selectedCardIds, card.cardId];
        const nextSession = {
          ...session,
          targetCardId: null,
          selectedCardIds: nextSelectedCardIds,
        } satisfies ActionSelectionSession;

        this.#setActionSelectionSession(nextSession);
        this.#game.setPendingError(null);
        this.#game.setStatusMessage(
          getChooseSingTogetherStatusMessage(
            this.cardSnapshotsById[session.sourceCardId]?.label ?? m["sim.card.unknown"]({}),
            getSingTogetherSelectionTotal(nextSession, singTogetherMove),
            singTogetherMetadata.requiredValue,
          ),
        );
        return true;
      }

      const targetMoves = session.candidateMoves.filter(
        (candidateMove) =>
          getSourceCardIdForActionSelectionMove(session.categoryId, candidateMove) ===
            session.sourceCardId &&
          getTargetCardIdForActionSelectionMove(session.categoryId, candidateMove) === card.cardId,
      );
      const move = targetMoves[0];

      if (!move) {
        this.#game.setPendingError(
          this.getActionSessionCardReason(card.cardId) ?? "This card is not a valid target.",
        );
        return false;
      }

      if (targetMoves.length > 1) {
        const nextSession = {
          ...session,
          targetCardId: card.cardId,
          selectedCardIds: [],
          selectedMoveId: null,
          phase: "choose-option",
        } satisfies ActionSelectionSession;

        this.#setActionSelectionSession(nextSession);
        this.#game.setPendingError(null);
        this.#game.setStatusMessage(
          getChooseOptionStatusMessage(
            session,
            this.cardSnapshotsById[session.sourceCardId]?.label ?? m["sim.card.unknown"]({}),
          ),
        );
        return true;
      }

      const nextSession = {
        ...session,
        targetCardId: card.cardId,
        selectedCardIds: [],
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

    if (
      this.#resolutionSelectionSession &&
      isTargetResolutionSelectionContext(this.#resolutionSelectionSession.context)
    ) {
      return this.assignResolutionTargetSelection(cardId);
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
          ? this.submitResolutionOptional(moveId === "accept")
          : moveId === "reject" &&
              canDeclineResolutionSelectionSession(this.#resolutionSelectionSession)
            ? this.rejectActiveResolutionSelection()
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

  handleAvailableMovesScryAssignment = (cardId: string, destinationId: string): boolean =>
    this.assignResolutionScryCard(cardId, destinationId);

  handleAvailableMovesScryReorder = (
    destinationId: string,
    cardId: string,
    direction: "up" | "down",
  ): boolean => this.reorderResolutionScryCard(destinationId, cardId, direction);

  selectActionSelectionOption = (moveId: string): boolean => {
    const session = this.#actionSelectionSession;
    if (!session || session.phase !== "choose-option") {
      return false;
    }

    const move = session.candidateMoves.find((candidateMove) => candidateMove.id === moveId);
    if (!move) {
      return false;
    }

    if (isDiscardCostSelectionMove(move)) {
      this.#setActionSelectionSession({
        ...session,
        selectedCardIds: [],
        selectedMoveId: move.id,
        targetCardId: null,
        phase: "choose-target",
      });
      this.#game.setPendingError(null);
      const discardCount = getDiscardCostCount(move);
      this.#game.setStatusMessage(
        discardCount === 1
          ? "Choose a card from your hand to discard."
          : `Choose ${discardCount} cards from your hand to discard.`,
      );
      return true;
    }

    const singTogetherMetadata = getSingTogetherSelectionMetadata(move);
    if (singTogetherMetadata) {
      this.#setActionSelectionSession({
        ...session,
        selectedCardIds: [],
        selectedMoveId: move.id,
        targetCardId: null,
        phase: "choose-target",
      });
      this.#game.setPendingError(null);
      this.#game.setStatusMessage(
        getChooseSingTogetherStatusMessage(
          this.cardSnapshotsById[session.sourceCardId ?? ""]?.label ?? m["sim.card.unknown"]({}),
          0,
          singTogetherMetadata.requiredValue,
        ),
      );
      return true;
    }

    const nextSession = {
      ...session,
      label: session.categoryId === "activate-ability" ? move.label : session.label,
      selectedCardIds: [],
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
      if (isSingTogetherSelectionSession(session)) {
        if (
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
            targetCardId: null,
            selectedCardIds: [],
            selectedMoveId: null,
          });
          this.#game.setStatusMessage(
            getChooseOptionStatusMessage(
              session,
              this.cardSnapshotsById[session.sourceCardId]?.label ?? m["sim.card.unknown"]({}),
            ),
          );
          return;
        }

        this.#setActionSelectionSession({
          ...session,
          phase: "choose-source",
          sourceCardId: null,
          targetCardId: null,
          selectedCardIds: [],
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
        selectedCardIds: [],
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
          selectedCardIds: [],
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
        selectedCardIds: [],
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
          selectedCardIds: [],
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
          selectedCardIds: [],
          selectedMoveId: null,
        });
        this.#game.setStatusMessage(
          getChooseOptionStatusMessage(
            session,
            this.cardSnapshotsById[session.sourceCardId]?.label ?? m["sim.card.unknown"]({}),
          ),
        );
        return;
      }

      if (session.categoryId === "activate-ability") {
        const sourceCardLabel =
          this.cardSnapshotsById[session.sourceCardId ?? ""]?.label ?? m["sim.card.unknown"]({});
        this.#setActionSelectionSession({
          ...session,
          phase: "choose-option",
          selectedCardIds: [],
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
        selectedCardIds: [],
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

    if (session.phase === "choose-target" && isDiscardCostSelectionSession(session)) {
      return canConfirmDiscardCostSelection(session, move)
        ? this.#executeActionSelectionMove(session, move)
        : false;
    }

    if (session.phase === "choose-target" && isSingTogetherSelectionSession(session)) {
      return canConfirmSingTogetherSelection(session)
        ? this.#executeActionSelectionMove(session, move)
        : false;
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
    this.#capturePendingResolutionSourceHint(move);
    const success = this.#game.executeMove(move.moveId, move.params ?? {}, {
      clearChallengeMode: true,
      clearSelection: true,
      status: move.label,
    });
    if (!success) {
      this.#pendingResolutionSourceHint = null;
    }
  };

  handleOpenPlayerSettings = (): void => {
    this.isPlayerSettingsOpen = true;
    this.#game.setPendingError(null);
  };

  get hasPendingEffects(): boolean {
    return this.pendingEffectsPopoverItems.length > 0;
  }

  get canAdvancePendingEffects(): boolean {
    return this.pendingEffectsPopoverItems.some(
      (item) =>
        item.isLocalPlayer !== false &&
        Boolean(item.onPrimaryAction || (item.canResolve && item.onResolve)),
    );
  }

  handleAdvancePendingEffects = (): boolean => {
    const nextActionableItem =
      this.pendingEffectsPopoverItems.find(
        (item) => item.isLocalPlayer !== false && item.onPrimaryAction,
      ) ??
      this.pendingEffectsPopoverItems.find(
        (item) => item.isLocalPlayer !== false && item.canResolve && item.onResolve,
      ) ??
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

  handleHotkeyModeChange = (mode: HotkeyMode): void => {
    this.hotkeyMode = mode;
    localStorage.setItem(HOTKEYS_ENABLED_STORAGE_KEY, mode);
    this.#game.setStatusMessage(
      mode === "on"
        ? m["sim.settings.hotkeysModeOn"]({})
        : mode === "confirm-only"
          ? m["sim.settings.hotkeysModeConfirmOnly"]({})
          : m["sim.settings.hotkeysModeOff"]({}),
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

  handleAccessibleMobileControlsToggle = (enabled: boolean): void => {
    this.accessibleMobileControls = enabled;
    localStorage.setItem(ACCESSIBLE_MOBILE_CONTROLS_STORAGE_KEY, enabled ? "true" : "false");
  };

  handleGuidancePositionToggle = (): void => {
    this.guidancePosition = this.guidancePosition === "bottom" ? "top" : "bottom";
  };

  get selectedCardBack(): string {
    return this.#game.getOwnPlayerVisualSettings()?.cardBack ?? "default";
  }

  get selectedPlaymat(): string {
    return this.#game.getOwnPlayerVisualSettings()?.playmat ?? "default";
  }

  handleCardBackChange = (id: string): void => {
    void saveVisualSettings({ cardBack: id });
  };

  handlePlaymatChange = (id: string): void => {
    void saveVisualSettings({ playmat: id });
  };
}

export function setLorcanaGameContext(value: SetLorcanaGameContextOptions): LorcanaGameContext {
  const context = new LorcanaGameContext(
    value.engine,
    value.readModel,
    value.playerSettings,
    value.debugPerformance,
  );
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

export function maybeUseLorcanaSidebarPresenter(): LorcanaSidebarPresenter | null {
  if (hasContext(LORCANA_SIDEBAR_PRESENTER_CONTEXT_KEY)) {
    return getContext<LorcanaSidebarPresenter>(LORCANA_SIDEBAR_PRESENTER_CONTEXT_KEY);
  }

  if (!hasContext(LORCANA_GAME_CONTEXT_KEY)) {
    return null;
  }

  return useLorcanaSidebarPresenter();
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
