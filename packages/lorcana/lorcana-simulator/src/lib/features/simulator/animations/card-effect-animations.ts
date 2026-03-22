import type { EnginePacketUpdate } from "@tcg/lorcana-engine";
import type { LorcanaPlayerSide } from "@/features/simulator/model/contracts.js";
import {
  createCardAnchorId,
  type BoardAnchorRect,
  type BoardAnchorSnapshot,
  type BoardLocalRect,
} from "@/features/simulator/animations/board-move-animations.js";

type AnchorReference = {
  primaryId: string;
  fallbackId?: string;
};

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

function resolveAnchorRect(
  snapshot: BoardAnchorSnapshot | null,
  reference: AnchorReference,
): BoardAnchorRect | null {
  if (!snapshot) {
    return null;
  }

  const primary = snapshot.anchors[reference.primaryId];
  if (primary) {
    return primary;
  }

  if (reference.fallbackId) {
    return snapshot.anchors[reference.fallbackId] ?? null;
  }

  return null;
}

function toLocalRect(rect: BoardAnchorRect, boardRect: BoardAnchorRect): BoardLocalRect {
  return {
    x: rect.left - boardRect.left,
    y: rect.top - boardRect.top,
    width: rect.width,
    height: rect.height,
    centerX: rect.centerX - boardRect.left,
    centerY: rect.centerY - boardRect.top,
  };
}
