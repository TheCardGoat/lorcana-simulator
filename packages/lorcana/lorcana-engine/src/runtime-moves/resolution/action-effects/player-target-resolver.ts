import type { PlayerId } from "#core";
import type { PlayerTarget, LorcanaPlayerTarget } from "@tcg/lorcana-types";
import type { CardPlayedPayload } from "../../../types";
import type { PlayCardExecutionContext } from "./types";
import type { TargetSelectionInput } from "../../../targeting/runtime";
import {
  resolveSelectedPlayerIds,
  resolveTargetPlayerIds as resolveUnifiedPlayerTargets,
} from "../../../targeting/runtime";

export function resolveTargetPlayerIds(
  ctx: PlayCardExecutionContext,
  cardPlayed: CardPlayedPayload,
  target: PlayerTarget | LorcanaPlayerTarget | "SELF" | unknown,
  selectedTargets?: TargetSelectionInput,
): PlayerId[] {
  return resolveUnifiedPlayerTargets(
    ctx as Parameters<typeof resolveUnifiedPlayerTargets>[0],
    target ?? "CONTROLLER",
    {
      controllerId: cardPlayed.playerId,
      sourceCardId: cardPlayed.cardId,
      selectedPlayerIds: resolveSelectedPlayerIds(ctx.framework.state.playerIds, selectedTargets),
    },
  );
}
