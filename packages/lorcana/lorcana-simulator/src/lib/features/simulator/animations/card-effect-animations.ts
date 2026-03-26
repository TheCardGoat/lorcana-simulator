import type { EnginePacketUpdate } from "@tcg/lorcana-engine";
import type { LorcanaPlayerSide } from "@/features/simulator/model/contracts.js";
import {
  createCardAnchorId,
  type BoardAnchorSnapshot,
} from "@/features/simulator/animations/board-move-animations.js";
import {
  type AnchorReference,
  resolveAnchorRect,
  toLocalRect,
} from "@/features/simulator/animations/animation-shared.js";
import type { BoardLocalRect } from "@/features/simulator/animations/board-move-animations.js";

export type CardEffectKind = "activate-ability" | "sing" | "resolve-effect";

export interface QueuedCardEffectAnimation {
  id: string;
  actorSide: LorcanaPlayerSide;
  cardId: string;
  effectKind: CardEffectKind;
  source: AnchorReference;
  durationMs: number;
}

export interface ResolvedCardEffectAnimation {
  id: string;
  cardId: string;
  effectKind: CardEffectKind;
  sourceRect: BoardLocalRect;
  durationMs: number;
}

type CardEffectPacketPayload = {
  actorSide: LorcanaPlayerSide;
  cardId: string;
  effectKind: CardEffectKind;
};

export function deriveQueuedCardEffectAnimationsFromPacket(
  packet: EnginePacketUpdate | null,
  durationMs: number,
): QueuedCardEffectAnimation[] {
  if (!packet || packet.animations.length === 0) {
    return [];
  }

  const queued: QueuedCardEffectAnimation[] = [];

  for (const animation of packet.animations) {
    if (animation.kind !== "lorcana.cardEffect") {
      continue;
    }

    const payload = animation.payload as Partial<CardEffectPacketPayload>;
    if (
      !payload ||
      typeof payload.cardId !== "string" ||
      (payload.actorSide !== "playerOne" && payload.actorSide !== "playerTwo") ||
      (payload.effectKind !== "activate-ability" &&
        payload.effectKind !== "sing" &&
        payload.effectKind !== "resolve-effect")
    ) {
      continue;
    }

    queued.push({
      id: animation.id,
      actorSide: payload.actorSide,
      cardId: payload.cardId,
      effectKind: payload.effectKind,
      source: {
        primaryId: createCardAnchorId(payload.actorSide, "play", payload.cardId),
      },
      durationMs,
    });
  }

  return queued;
}

export function resolveQueuedCardEffectAnimation(
  animation: QueuedCardEffectAnimation,
  previousAnchors: BoardAnchorSnapshot | null,
  nextAnchors: BoardAnchorSnapshot | null,
): ResolvedCardEffectAnimation | null {
  if (!nextAnchors) {
    return null;
  }

  const sourceRect =
    resolveAnchorRect(previousAnchors, animation.source) ??
    resolveAnchorRect(nextAnchors, animation.source);

  if (!sourceRect) {
    return null;
  }

  const boardRect = nextAnchors.boardRect;

  return {
    id: animation.id,
    cardId: animation.cardId,
    effectKind: animation.effectKind,
    sourceRect: toLocalRect(sourceRect, boardRect),
    durationMs: animation.durationMs,
  };
}
