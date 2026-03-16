import type { CardInstanceId, MoveExecutionContext, PlayerId } from "#core";
import type { LorcanaCard, LorcanaCardMeta, LorcanaG } from "../../types";

type ZoneRefLike = { zone: string; playerId?: PlayerId | string };

type ShiftStackRuntimeContext = Pick<
  MoveExecutionContext<LorcanaG, LorcanaCard>,
  "cards" | "framework"
>;

function getCardsUnder(meta: LorcanaCardMeta | undefined): CardInstanceId[] {
  return Array.isArray(meta?.cardsUnder) ? [...meta.cardsUnder] : [];
}

function cloneRecord<T>(value: T | undefined): T | undefined {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return undefined;
  }

  return { ...value };
}

export function getStackedCardIds(
  ctx: Pick<ShiftStackRuntimeContext, "cards">,
  cardId: CardInstanceId,
): CardInstanceId[] {
  const cardMeta = ctx.cards.getMeta(String(cardId)) as LorcanaCardMeta | undefined;
  return [cardId, ...getCardsUnder(cardMeta)];
}

export function attachShiftStack(
  ctx: ShiftStackRuntimeContext,
  newTopId: CardInstanceId,
  oldTopId: CardInstanceId,
  ownerId: PlayerId,
  inheritedMeta?: Partial<LorcanaCardMeta>,
): void {
  const oldTopMeta = ctx.cards.getMeta(String(oldTopId)) as LorcanaCardMeta | undefined;
  const inherited = inheritedMeta ?? oldTopMeta;
  const cardsUnder = [oldTopId, ...getCardsUnder(oldTopMeta)];

  // Shift targets leave play while remaining associated under the new top card.
  ctx.framework.zones.moveCard(oldTopId, { zone: "limbo", playerId: ownerId });

  ctx.cards.setMeta(String(newTopId), {
    state: inherited?.state,
    damage: inherited?.damage,
    isDrying: inherited?.isDrying,
    atLocationId: inherited?.atLocationId,
    temporaryKeywords: cloneRecord(inherited?.temporaryKeywords),
    temporaryKeywordStarts: cloneRecord(inherited?.temporaryKeywordStarts),
    temporaryKeywordValues: cloneRecord(inherited?.temporaryKeywordValues),
    temporaryAbilities: cloneRecord(inherited?.temporaryAbilities),
    temporaryAbilityStarts: cloneRecord(inherited?.temporaryAbilityStarts),
    temporaryAbilityPayloads: cloneRecord(inherited?.temporaryAbilityPayloads),
    temporaryRestrictions: cloneRecord(inherited?.temporaryRestrictions),
    temporaryRestrictionStarts: cloneRecord(inherited?.temporaryRestrictionStarts),
    temporaryRestrictionPayloads: cloneRecord(inherited?.temporaryRestrictionPayloads),
    replacementAbilities: Array.isArray(inherited?.replacementAbilities)
      ? [...inherited.replacementAbilities]
      : undefined,
    cardsUnder,
    stackParentId: undefined,
  });

  for (const underCardId of cardsUnder) {
    ctx.cards.setMeta(String(underCardId), {
      stackParentId: newTopId,
      cardsUnder: undefined,
      state: undefined,
      damage: undefined,
      isDrying: undefined,
      atLocationId: undefined,
      playedViaShift: undefined,
      playedCostType: undefined,
    });
  }
}

export function moveCardOutOfPlayWithStack(
  ctx: ShiftStackRuntimeContext,
  cardId: CardInstanceId,
  destinationZoneRef: ZoneRefLike,
  options?: { index?: number },
): CardInstanceId[] {
  const movedCardIds = getStackedCardIds(ctx, cardId);
  const startIndex = options?.index;

  for (let index = 0; index < movedCardIds.length; index++) {
    const moveOptions = startIndex === undefined ? undefined : { index: startIndex + index };
    ctx.framework.zones.moveCard(String(movedCardIds[index]), destinationZoneRef, moveOptions);
  }

  for (const movedCardId of movedCardIds) {
    ctx.cards.clearMeta(String(movedCardId));
  }

  return movedCardIds;
}
