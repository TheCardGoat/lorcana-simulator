import type { EnginePacketUpdate } from "@tcg/lorcana-engine";
import type { LorcanaPlayerSide } from "@/features/simulator/model/contracts.js";
import {
  createCardAnchorId,
  type BoardAnchorRect,
  type BoardAnchorSnapshot,
  type BoardLocalRect,
} from "@/features/simulator/animations/board-move-animations.js";

export function createLoreBadgeAnchorId(side: LorcanaPlayerSide): string {
  return `lore-badge:${side}`;
}

type AnchorReference = {
  primaryId: string;
  fallbackId?: string;
};

export interface QueuedQuestAnimation {
  id: string;
  actorSide: LorcanaPlayerSide;
  cardId: string;
  loreGained: number;
  source: AnchorReference;
  destination: AnchorReference;
  durationMs: number;
}

export interface ResolvedQuestAnimation {
  id: string;
  cardId: string;
  loreGained: number;
  sourceRect: BoardLocalRect;
  destinationRect: BoardLocalRect;
  durationMs: number;
}

type QuestPacketPayload = {
  actorPlayerId: string;
  actorSide: LorcanaPlayerSide;
  cardId: string;
  loreGained: number;
};

export function deriveQueuedQuestAnimationsFromPacket(
  packet: EnginePacketUpdate | null,
  durationMs: number,
): QueuedQuestAnimation[] {
  if (!packet || packet.animations.length === 0) {
    return [];
  }

  const queued: QueuedQuestAnimation[] = [];

  for (const animation of packet.animations) {
    if (animation.kind !== "lorcana.quest") {
      continue;
    }

    const payload = animation.payload as Partial<QuestPacketPayload>;
    if (
      !payload ||
      typeof payload.cardId !== "string" ||
      typeof payload.loreGained !== "number" ||
      (payload.actorSide !== "playerOne" && payload.actorSide !== "playerTwo")
    ) {
      continue;
    }

    queued.push({
      id: animation.id,
      actorSide: payload.actorSide,
      cardId: payload.cardId,
      loreGained: payload.loreGained,
      source: {
        primaryId: createCardAnchorId(payload.actorSide, "play", payload.cardId),
      },
      destination: {
        primaryId: createLoreBadgeAnchorId(payload.actorSide),
      },
      durationMs,
    });
  }

  return queued;
}

export function resolveQueuedQuestAnimation(
  animation: QueuedQuestAnimation,
  previousAnchors: BoardAnchorSnapshot | null,
  nextAnchors: BoardAnchorSnapshot | null,
): ResolvedQuestAnimation | null {
  if (!nextAnchors) {
    return null;
  }

  const sourceRect =
    resolveAnchorRect(previousAnchors, animation.source) ??
    resolveAnchorRect(nextAnchors, animation.source);
  const destinationRect = resolveAnchorRect(nextAnchors, animation.destination);

  if (!sourceRect || !destinationRect) {
    return null;
  }

  const boardRect = nextAnchors.boardRect;

  return {
    id: animation.id,
    cardId: animation.cardId,
    loreGained: animation.loreGained,
    sourceRect: toLocalRect(sourceRect, boardRect),
    destinationRect: toLocalRect(destinationRect, boardRect),
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
