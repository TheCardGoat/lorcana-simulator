import type { EnginePacketUpdate } from "@tcg/lorcana-engine";
import type { LorcanaPlayerSide } from "@/features/simulator/model/contracts.js";

export interface ResolvedActionAnimationTarget {
  cardId: string;
  wasBanished: boolean;
}

export interface ResolvedActionAnimation {
  id: string;
  actorSide: LorcanaPlayerSide;
  actionCardId: string;
  targets: ResolvedActionAnimationTarget[];
  durationMs: number;
}

type ActionPacketPayload = {
  actorSide: LorcanaPlayerSide;
  actionCardId: string;
  targets: readonly Partial<ResolvedActionAnimationTarget>[];
};

export function deriveResolvedActionAnimationsFromPacket(
  packet: EnginePacketUpdate | null,
  durationMs: number,
): ResolvedActionAnimation[] {
  if (!packet || packet.animations.length === 0) {
    return [];
  }

  const resolved: ResolvedActionAnimation[] = [];

  for (const animation of packet.animations) {
    if (animation.kind !== "lorcana.action") {
      continue;
    }

    const payload = animation.payload as Partial<ActionPacketPayload>;
    if (
      !payload ||
      typeof payload.actionCardId !== "string" ||
      (payload.actorSide !== "playerOne" && payload.actorSide !== "playerTwo") ||
      !Array.isArray(payload.targets)
    ) {
      continue;
    }

    const targets = payload.targets
      .filter(
        (target): target is Partial<ResolvedActionAnimationTarget> & { cardId: string } =>
          typeof target.cardId === "string",
      )
      .map((target) => ({
        cardId: target.cardId,
        wasBanished: target.wasBanished === true,
      }));

    if (targets.length === 0) {
      continue;
    }

    resolved.push({
      id: animation.id,
      actorSide: payload.actorSide,
      actionCardId: payload.actionCardId,
      targets,
      durationMs,
    });
  }

  return resolved;
}
