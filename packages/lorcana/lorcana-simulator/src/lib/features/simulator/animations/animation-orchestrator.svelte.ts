import type {
  BoardAnchorSnapshot,
  BoardLocalRect,
  ResolvedBoardMoveAnimation,
} from "@/features/simulator/animations/board-move-animations.js";
import {
  resolveQueuedBoardMoveAnimation,
  type QueuedBoardMoveAnimation,
} from "@/features/simulator/animations/board-move-animations.js";
import {
  resolveQueuedQuestAnimation,
  type QueuedQuestAnimation,
  type ResolvedQuestAnimation,
} from "@/features/simulator/animations/quest-animations.js";
import {
  resolveQueuedChallengeAnimation,
  type QueuedChallengeAnimation,
  type ResolvedChallengeAnimation,
} from "@/features/simulator/animations/challenge-animations.js";
import {
  resolveQueuedCardEffectAnimation,
  type QueuedCardEffectAnimation,
  type ResolvedCardEffectAnimation,
} from "@/features/simulator/animations/card-effect-animations.js";
import type { ResolvedOverlayAnnouncement } from "@/features/simulator/animations/overlay-announcement-animations.js";
import type { QueuedPlayerEffectAnimation } from "@/features/simulator/animations/player-effect-animations.js";
import type {
  CardFacePresentation,
  LorcanaCardSnapshot,
} from "@/features/simulator/model/contracts.js";

const CAUSE_PHASE_BUFFER_MS = 150;

export interface BoardAnimationPlaceholder {
  id: string;
  card: LorcanaCardSnapshot;
  rect: BoardLocalRect;
  renderFace: CardFacePresentation;
}

export interface AnimationOrchestratorCallbacks {
  queueBoardAnimations: (animations: ResolvedBoardMoveAnimation[]) => void;
  fireQuestAnimations: (animations: ResolvedQuestAnimation[]) => void;
  fireChallengeAnimations: (animations: ResolvedChallengeAnimation[]) => void;
  fireCardEffectAnimations: (animations: ResolvedCardEffectAnimation[]) => void;
  fireOverlayAnnouncements: (animations: ResolvedOverlayAnnouncement[]) => void;
  firePlayerEffectAnimations: (animations: QueuedPlayerEffectAnimation[]) => void;
}

export interface QueuedAnimationBatch {
  boardMoves: QueuedBoardMoveAnimation[];
  quests: QueuedQuestAnimation[];
  challenges: QueuedChallengeAnimation[];
  cardEffects: QueuedCardEffectAnimation[];
  overlays: ResolvedOverlayAnnouncement[];
  playerEffects: QueuedPlayerEffectAnimation[];
  sourceAnchors: BoardAnchorSnapshot | null;
}

/**
 * Orchestrates animation playback across types with phase-based sequencing.
 *
 * When a packet contains both "cause" animations (challenge, quest, card-effect)
 * and "consequence" board moves (banish, move-to-location), the cause animations
 * play first (phase 0). Board moves are deferred until the cause phase completes
 * (phase 1). During the cause phase, cards that will be animated in phase 1 are
 * rendered as static placeholders at their source positions so they remain visible.
 *
 * When a packet contains only board moves (play-character, ink), they fire
 * immediately with no phasing delay.
 */
export class AnimationOrchestrator {
  #callbacks: AnimationOrchestratorCallbacks;
  #pendingBatch: QueuedAnimationBatch | null = null;
  #causePhaseTimeout: ReturnType<typeof setTimeout> | null = null;
  #placeholders = $state<BoardAnimationPlaceholder[]>([]);
  #inFlightCardIds = $state<ReadonlySet<string>>(new Set());

  constructor(callbacks: AnimationOrchestratorCallbacks) {
    this.#callbacks = callbacks;
  }

  get placeholders(): BoardAnimationPlaceholder[] {
    return this.#placeholders;
  }

  get inFlightCardIds(): ReadonlySet<string> {
    return this.#inFlightCardIds;
  }

  /**
   * Ingest a new batch of queued animations derived from a packet.
   * Overlays and player effects fire immediately (no anchor resolution needed).
   * Anchor-dependent animations are stored until resolveAnchors() is called.
   */
  ingest(batch: QueuedAnimationBatch): void {
    this.cancel();
    this.#pendingBatch = batch;

    // Animations that don't need anchor resolution fire immediately
    if (batch.overlays.length > 0) {
      this.#callbacks.fireOverlayAnnouncements(batch.overlays);
    }
    if (batch.playerEffects.length > 0) {
      this.#callbacks.firePlayerEffectAnimations(batch.playerEffects);
    }

    // Pre-populate in-flight set with card IDs from board moves that will be
    // animated — even before anchor resolution — so zone components can hide
    // these cards from their destination zones immediately.
    if (batch.boardMoves.length > 0) {
      this.#updateInFlightFromBoardMoves(batch.boardMoves);
    }
  }

  /**
   * Called when board anchor measurements are available (after DOM settles).
   * Resolves all pending anchor-dependent animations and orchestrates playback.
   */
  resolveAnchors(nextAnchors: BoardAnchorSnapshot): void {
    const batch = this.#pendingBatch;
    if (!batch) {
      return;
    }
    this.#pendingBatch = null;

    const sourceAnchors = batch.sourceAnchors;

    // Resolve all anchor-dependent animation types
    const resolvedBoardMoves = batch.boardMoves
      .map((a) => resolveQueuedBoardMoveAnimation(a, sourceAnchors, nextAnchors))
      .filter((a): a is ResolvedBoardMoveAnimation => a !== null);

    const resolvedQuests = batch.quests
      .map((a) => resolveQueuedQuestAnimation(a, null, nextAnchors))
      .filter((a): a is ResolvedQuestAnimation => a !== null);

    const resolvedChallenges = batch.challenges
      .map((a) => resolveQueuedChallengeAnimation(a, sourceAnchors, nextAnchors))
      .filter((a): a is ResolvedChallengeAnimation => a !== null);

    const resolvedCardEffects = batch.cardEffects
      .map((a) => resolveQueuedCardEffectAnimation(a, sourceAnchors, nextAnchors))
      .filter((a): a is ResolvedCardEffectAnimation => a !== null);

    const hasCauseAnimations =
      resolvedQuests.length > 0 || resolvedChallenges.length > 0 || resolvedCardEffects.length > 0;

    if (hasCauseAnimations && resolvedBoardMoves.length > 0) {
      this.#playPhased(resolvedBoardMoves, resolvedQuests, resolvedChallenges, resolvedCardEffects);
    } else {
      this.#playSinglePhase(
        resolvedBoardMoves,
        resolvedQuests,
        resolvedChallenges,
        resolvedCardEffects,
      );
    }
  }

  /**
   * Cancel all pending and in-progress orchestrated animations.
   * Called when a new packet arrives or during cleanup/reset.
   */
  cancel(): void {
    if (this.#causePhaseTimeout !== null) {
      clearTimeout(this.#causePhaseTimeout);
      this.#causePhaseTimeout = null;
    }
    this.#pendingBatch = null;
    this.#placeholders = [];
    this.#inFlightCardIds = new Set();
  }

  /**
   * Single-phase playback: fire everything immediately (no cause/consequence split).
   * Used when a packet has only board moves or only cause animations.
   */
  #playSinglePhase(
    boardMoves: ResolvedBoardMoveAnimation[],
    quests: ResolvedQuestAnimation[],
    challenges: ResolvedChallengeAnimation[],
    cardEffects: ResolvedCardEffectAnimation[],
  ): void {
    if (boardMoves.length > 0) {
      this.#updateInFlightFromResolvedBoardMoves(boardMoves);
      this.#callbacks.queueBoardAnimations(boardMoves);
    }
    if (quests.length > 0) this.#callbacks.fireQuestAnimations(quests);
    if (challenges.length > 0) this.#callbacks.fireChallengeAnimations(challenges);
    if (cardEffects.length > 0) this.#callbacks.fireCardEffectAnimations(cardEffects);
  }

  /**
   * Phased playback:
   *  - Phase 0: Fire cause animations (challenge, quest, card-effect).
   *    Board-move cards are rendered as static placeholders at their source positions.
   *  - Phase 1: After cause phase completes, remove placeholders and fire board moves.
   */
  #playPhased(
    boardMoves: ResolvedBoardMoveAnimation[],
    quests: ResolvedQuestAnimation[],
    challenges: ResolvedChallengeAnimation[],
    cardEffects: ResolvedCardEffectAnimation[],
  ): void {
    // Create placeholders so cards remain visible during cause phase.
    // Each placeholder renders the card at its source position (where it was
    // before state update) so challenge arrows, damage badges, etc. have a
    // visible card to point at.
    this.#placeholders = boardMoves.map((anim) => ({
      id: `placeholder:${anim.id}`,
      card: anim.card,
      rect: anim.sourceRect,
      renderFace: anim.renderFace,
    }));

    // In-flight set includes all cards from board moves (both placeholder and future animation)
    this.#updateInFlightFromResolvedBoardMoves(boardMoves);

    // Phase 0: fire cause animations
    if (quests.length > 0) this.#callbacks.fireQuestAnimations(quests);
    if (challenges.length > 0) this.#callbacks.fireChallengeAnimations(challenges);
    if (cardEffects.length > 0) this.#callbacks.fireCardEffectAnimations(cardEffects);

    // Calculate the longest cause animation duration to know when phase 0 ends
    const maxCauseDuration = Math.max(
      ...quests.map((a) => a.durationMs),
      ...challenges.map((a) => a.durationMs),
      ...cardEffects.map((a) => a.durationMs),
    );

    // Phase 1: fire board moves after cause phase completes
    this.#causePhaseTimeout = setTimeout(() => {
      this.#causePhaseTimeout = null;
      this.#placeholders = [];
      this.#callbacks.queueBoardAnimations(boardMoves);
    }, maxCauseDuration + CAUSE_PHASE_BUFFER_MS);
  }

  #updateInFlightFromBoardMoves(animations: QueuedBoardMoveAnimation[]): void {
    const ids = new Set(this.#inFlightCardIds);
    for (const anim of animations) {
      ids.add(anim.card.cardId);
    }
    this.#inFlightCardIds = ids;
  }

  #updateInFlightFromResolvedBoardMoves(animations: ResolvedBoardMoveAnimation[]): void {
    const ids = new Set(this.#inFlightCardIds);
    for (const anim of animations) {
      ids.add(anim.card.cardId);
    }
    this.#inFlightCardIds = ids;
  }

  /**
   * Notify the orchestrator that a board animation completed.
   * Removes the card from the in-flight set if no other active animations reference it.
   */
  notifyBoardAnimationCompleted(
    completedCardId: string,
    remainingActiveCardIds: string[],
    remainingQueuedCardIds: string[],
  ): void {
    const stillActive = new Set([...remainingActiveCardIds, ...remainingQueuedCardIds]);
    if (!stillActive.has(completedCardId)) {
      const ids = new Set(this.#inFlightCardIds);
      ids.delete(completedCardId);
      this.#inFlightCardIds = ids;
    }
  }

  /**
   * Clear all in-flight card IDs. Called during full animation reset.
   */
  clearInFlight(): void {
    if (this.#inFlightCardIds.size > 0) {
      this.#inFlightCardIds = new Set();
    }
  }
}
