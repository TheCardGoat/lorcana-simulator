import type {
  LorcanaProjectedBagEffect,
  LorcanaProjectedBoardView,
  LorcanaProjectedPendingEffect,
  ResolutionSelectionContext,
  ResolutionSelectionKind,
  SlottedTargetKind,
  TargetResolutionSelectionContext,
} from "@tcg/lorcana-engine";
import type { LorcanaMultiplayerTestEngine } from "@tcg/lorcana-engine/testing";

import type {
  AvailableMovesSelectionEntry,
  LorcanaCardSnapshot,
  ResolutionTargetSelectionSlotState,
} from "@/features/simulator/model/contracts.js";
import { buildCardSnapshotMap } from "@/features/simulator/model/board-utils.js";
import {
  getBagEffectPayloadMeta,
  getPendingEffectPayloadMeta,
} from "@/features/simulator/model/pending-effect-payload.js";
import {
  buildResolutionTargetPromptState,
  getResolutionTargetPromptMessage,
  isSupportedResolutionTargetEffectType,
  type SupportedResolutionTargetEffectType,
} from "@/features/simulator/model/resolution-target-prompt.js";

export type PromptSnapshot = {
  /** Selection kind published by the engine on `board.pendingChoice`. */
  kind: ResolutionSelectionKind;
  /** Engine request id — same value the engine will expect back in `resolveEffect`. */
  requestId: string;
  /** Player id whose UI must display and resolve this prompt (the `chooserId`). */
  chooserId: string;
  /** Source card that spawned this resolution (trigger source or action card). */
  sourceCardId: string;
  /** `"target-selection"` / `"discard-choice"` contexts expose these; other kinds report 0. */
  minSelections: number;
  maxSelections: number;
  /** Raw candidate ids published by the engine. */
  cardCandidateIds: readonly string[];
  playerCandidateIds: readonly string[];
  /** When the engine asks for a slotted payload, this is the discriminator the UI must satisfy. */
  expectedSlottedKind: SlottedTargetKind | null;
  /** Effect family inferred from the pending-effect / bag payload metadata. `null` if unsupported. */
  effectType: SupportedResolutionTargetEffectType | null;
  /** Full UI prompt state as the game-context would render it. `null` when not a target prompt. */
  prompt: ResolutionTargetPromptState | null;
  /** Localized prompt copy for the active slot (if any). */
  message: string | null;
};

export type ResolutionTargetPromptState = {
  effectType: SupportedResolutionTargetEffectType;
  candidateEntries: AvailableMovesSelectionEntry[];
  activeSlotIndex: number | null;
  slots: ResolutionTargetSelectionSlotState[];
  autoResolvedFromSlots: number;
};

type AnyProjectedEffect = LorcanaProjectedPendingEffect | LorcanaProjectedBagEffect;

type SnapshotInputs = {
  board: LorcanaProjectedBoardView;
  staticResources: { cards: Map<string, unknown>; instances: Map<string, unknown> };
  selectedTargets: readonly string[];
};

function locateEffectByRequestId(
  board: LorcanaProjectedBoardView,
  requestId: string,
): { effect: AnyProjectedEffect; origin: "pending-effect" | "bag" } | null {
  const pendingEffect = board.pendingEffects.find((effect) => effect.id === requestId);
  if (pendingEffect) {
    return { effect: pendingEffect, origin: "pending-effect" };
  }

  const bagEffect = board.bagEffects.find((effect) => effect.id === requestId);
  if (bagEffect) {
    return { effect: bagEffect, origin: "bag" };
  }

  return null;
}

function readSelectionContext(
  effect: AnyProjectedEffect | null,
): ResolutionSelectionContext | null {
  return effect?.selectionContext ?? null;
}

function isTargetContext(
  context: ResolutionSelectionContext,
): context is TargetResolutionSelectionContext {
  return context.kind === "target-selection" || context.kind === "discard-choice";
}

function inferEffectType(
  effect: AnyProjectedEffect,
  origin: "pending-effect" | "bag",
): SupportedResolutionTargetEffectType | null {
  const rawEffectType =
    origin === "pending-effect"
      ? getPendingEffectPayloadMeta(effect.payload).effectType
      : getBagEffectPayloadMeta(effect.payload).effectType;

  return isSupportedResolutionTargetEffectType(rawEffectType) ? rawEffectType : null;
}

function buildEntriesFromCandidates(
  cardCandidateIds: readonly string[],
  cardSnapshotsById: Record<string, LorcanaCardSnapshot>,
): AvailableMovesSelectionEntry[] {
  return cardCandidateIds.flatMap((cardId) => {
    const card = cardSnapshotsById[cardId] ?? null;
    if (!card) {
      return [];
    }
    return [
      {
        id: `resolution:card:${cardId}`,
        kind: "card" as const,
        cardId: cardId as string,
        label: card.label,
        selected: false,
      },
    ];
  });
}

function findActivePromptEffect(board: LorcanaProjectedBoardView): {
  effect: AnyProjectedEffect;
  origin: "pending-effect" | "bag";
  requestId: string;
} | null {
  // Prefer an explicit pendingChoice (set for play-card / ability-activation paths).
  if (board.pendingChoice?.requestID) {
    const located = locateEffectByRequestId(board, board.pendingChoice.requestID);
    if (located?.effect.selectionContext) {
      return { ...located, requestId: board.pendingChoice.requestID };
    }
  }

  // Fall back to the first bag effect that exposes a selection context — this is
  // how trigger-created resolutions (e.g. move-damage from a Boost ability) surface
  // before the user has picked them out of the bag.
  const bagEffect = board.bagEffects.find((effect) => Boolean(effect.selectionContext));
  if (bagEffect) {
    return { effect: bagEffect, origin: "bag", requestId: bagEffect.id };
  }

  return null;
}

function buildSnapshotFromInputs(inputs: SnapshotInputs): PromptSnapshot | null {
  const { board, staticResources } = inputs;
  const active = findActivePromptEffect(board);
  if (!active) {
    return null;
  }

  const { effect, origin, requestId } = active;
  const selectionContext = readSelectionContext(effect);
  if (!selectionContext) {
    return null;
  }

  const located = { effect, origin } as const;

  if (!isTargetContext(selectionContext)) {
    return {
      kind: selectionContext.kind,
      requestId,
      chooserId: selectionContext.chooserId as unknown as string,
      sourceCardId: selectionContext.sourceCardId as unknown as string,
      minSelections: 0,
      maxSelections: 0,
      cardCandidateIds: [],
      playerCandidateIds: [],
      expectedSlottedKind: null,
      effectType: null,
      prompt: null,
      message: null,
    };
  }

  const effectType = located ? inferEffectType(located.effect, located.origin) : null;
  // biome-ignore lint/suspicious/noExplicitAny: buildCardSnapshotMap expects MatchStaticResources; we pass through.
  const cardSnapshotsById = buildCardSnapshotMap(board, staticResources as any);
  const entries = buildEntriesFromCandidates(selectionContext.cardCandidateIds, cardSnapshotsById);

  const prompt = buildResolutionTargetPromptState({
    effectType,
    context: selectionContext,
    entries,
    selectedTargets: inputs.selectedTargets,
    cardSnapshotsById,
  }) as ResolutionTargetPromptState | null;

  return {
    kind: selectionContext.kind,
    requestId,
    chooserId: selectionContext.chooserId as unknown as string,
    sourceCardId: selectionContext.sourceCardId as unknown as string,
    minSelections: selectionContext.minSelections,
    maxSelections: selectionContext.maxSelections,
    cardCandidateIds: selectionContext.cardCandidateIds as readonly string[],
    playerCandidateIds: selectionContext.playerCandidateIds as readonly string[],
    expectedSlottedKind: selectionContext.expectedSlottedKind ?? null,
    effectType,
    prompt,
    message: effectType
      ? getResolutionTargetPromptMessage(effectType, prompt?.activeSlotIndex ?? null)
      : null,
  };
}

/**
 * Build a plain, assertable snapshot of the UI prompt state the simulator would render
 * for the engine's current `board.pendingChoice`. Returns `null` when no selection is
 * pending.
 *
 * Intended for fast unit/integration tests that want to verify "engine published a
 * target prompt that the UI will render correctly" without a browser. The snapshot
 * uses the same builders the game-context calls at runtime ([buildResolutionTargetPromptState],
 * payload-meta inference, card-snapshot derivation).
 *
 * Usage:
 * ```ts
 * const engine = LorcanaMultiplayerTestEngine.createWithFixture(...);
 * engine.asPlayerOne().playCard(someCard);
 * const snapshot = snapshotPendingPrompt(engine);
 * expect(snapshot?.expectedSlottedKind).toBe("move-damage");
 * ```
 *
 * Pass `playerId` to read the view for a specific player (default: player one).
 * Pass `selectedTargets` to simulate the UI mid-selection — useful for asserting
 * how the destination slot's candidate list changes after the user picks a source.
 */
export function snapshotPendingPrompt(
  engine: LorcanaMultiplayerTestEngine,
  opts: { playerId?: string; selectedTargets?: readonly string[] } = {},
): PromptSnapshot | null {
  const client = opts.playerId
    ? engine.asLorcanaPlayer(opts.playerId)
    : engine.asLorcanaPlayerOne();
  return buildSnapshotFromInputs({
    board: client.getBoard(),
    staticResources: client.staticResources as unknown as SnapshotInputs["staticResources"],
    selectedTargets: opts.selectedTargets ?? [],
  });
}
