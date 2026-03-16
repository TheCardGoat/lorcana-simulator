import type { CountEffect, InkType } from "@tcg/lorcana-types";
import type { CardInstanceId } from "#core";
import type { CardPlayedPayload } from "../../../types";
import type { ActionResolutionInput, PlayCardExecutionContext } from "./types";

type InkedCardLike = {
  inkType?: InkType[];
};

export function isCountEffect(effect: unknown): effect is CountEffect {
  return (
    typeof effect === "object" &&
    effect !== null &&
    "type" in effect &&
    (effect as { type?: unknown }).type === "count"
  );
}

export function resolveCountEffect(
  ctx: PlayCardExecutionContext,
  _cardPlayed: CardPlayedPayload,
  effect: CountEffect,
  resolutionInput: ActionResolutionInput,
): void {
  if (!resolutionInput.eventSnapshot) {
    resolutionInput.eventSnapshot = {};
  }

  if (effect.what !== "distinct-revealed-ink-types") {
    resolutionInput.eventSnapshot.triggerAmount = 0;
    return;
  }

  const revealedCardIds =
    (resolutionInput.eventSnapshot.revealedCardIds as CardInstanceId[] | undefined) ?? [];
  const distinctInkTypes = new Set<InkType>();

  for (const cardId of revealedCardIds) {
    const definition = ctx.cards.getDefinition(cardId) as InkedCardLike | undefined;
    for (const inkType of definition?.inkType ?? []) {
      distinctInkTypes.add(inkType);
    }
  }

  resolutionInput.eventSnapshot.triggerAmount = distinctInkTypes.size;
}
