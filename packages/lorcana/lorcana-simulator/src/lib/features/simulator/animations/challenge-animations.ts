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

export interface ChallengeAnimationPreview {
  attackerDamageDealt: number;
  defenderDamageDealt: number;
  defenderKind: "character" | "location";
  attackerWouldBeBanished: boolean;
  defenderWouldBeBanished: boolean;
}

export interface QueuedChallengeAnimation {
  id: string;
  actorSide: LorcanaPlayerSide;
  attackerId: string;
  defenderId: string;
  source: AnchorReference;
  destination: AnchorReference;
  preview: ChallengeAnimationPreview;
  durationMs: number;
}

export interface ResolvedChallengeAnimation {
  id: string;
  attackerId: string;
  defenderId: string;
  sourceRect: BoardLocalRect;
  destinationRect: BoardLocalRect;
  preview: ChallengeAnimationPreview;
  durationMs: number;
}

type ChallengePacketPayload = {
  actorSide: LorcanaPlayerSide;
  attackerId: string;
  defenderId: string;
  defenderKind: "character" | "location";
  attackerDamageDealt: number;
  defenderDamageDealt: number;
  attackerWouldBeBanished: boolean;
  defenderWouldBeBanished: boolean;
};

function getOpponentSide(side: LorcanaPlayerSide): LorcanaPlayerSide {
  return side === "playerOne" ? "playerTwo" : "playerOne";
}

export function deriveQueuedChallengeAnimationsFromPacket(
  packet: EnginePacketUpdate | null,
  durationMs: number,
): QueuedChallengeAnimation[] {
  if (!packet || packet.animations.length === 0) {
    return [];
  }

  const queued: QueuedChallengeAnimation[] = [];

  for (const animation of packet.animations) {
    if (animation.kind !== "lorcana.challenge") {
      continue;
    }

    const payload = animation.payload as Partial<ChallengePacketPayload>;
    if (
      !payload ||
      typeof payload.attackerId !== "string" ||
      typeof payload.defenderId !== "string" ||
      (payload.actorSide !== "playerOne" && payload.actorSide !== "playerTwo") ||
      (payload.defenderKind !== "character" && payload.defenderKind !== "location")
    ) {
      continue;
    }

    const opponentSide = getOpponentSide(payload.actorSide);

    queued.push({
      id: animation.id,
      actorSide: payload.actorSide,
      attackerId: payload.attackerId,
      defenderId: payload.defenderId,
      source: {
        primaryId: createCardAnchorId(payload.actorSide, "play", payload.attackerId),
      },
      destination: {
        primaryId: createCardAnchorId(opponentSide, "play", payload.defenderId),
      },
      preview: {
        attackerDamageDealt: payload.attackerDamageDealt ?? 0,
        defenderDamageDealt: payload.defenderDamageDealt ?? 0,
        defenderKind: payload.defenderKind,
        attackerWouldBeBanished: payload.attackerWouldBeBanished ?? false,
        defenderWouldBeBanished: payload.defenderWouldBeBanished ?? false,
      },
      durationMs,
    });
  }

  return queued;
}

export function resolveQueuedChallengeAnimation(
  animation: QueuedChallengeAnimation,
  previousAnchors: BoardAnchorSnapshot | null,
  nextAnchors: BoardAnchorSnapshot | null,
): ResolvedChallengeAnimation | null {
  if (!nextAnchors) {
    return null;
  }

  const sourceRect =
    resolveAnchorRect(previousAnchors, animation.source) ??
    resolveAnchorRect(nextAnchors, animation.source);
  const destinationRect =
    resolveAnchorRect(previousAnchors, animation.destination) ??
    resolveAnchorRect(nextAnchors, animation.destination);

  if (!sourceRect || !destinationRect) {
    return null;
  }

  const boardRect = nextAnchors.boardRect;

  return {
    id: animation.id,
    attackerId: animation.attackerId,
    defenderId: animation.defenderId,
    sourceRect: toLocalRect(sourceRect, boardRect),
    destinationRect: toLocalRect(destinationRect, boardRect),
    preview: animation.preview,
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
