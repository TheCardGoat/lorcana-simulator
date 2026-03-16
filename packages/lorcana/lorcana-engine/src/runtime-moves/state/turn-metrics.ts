import type { CardInstanceId, PlayerId } from "#core";
import type { LorcanaCard, LorcanaG } from "../../types";

type TurnMetricContext = {
  G: Pick<LorcanaG, "turnMetadata">;
  cards: {
    getDefinition(cardId: CardInstanceId): LorcanaCard | undefined;
  };
  framework: {
    state: {
      ctx: {
        zones: {
          private: {
            cardIndex: Record<string, { ownerID?: PlayerId; zoneKey?: string } | undefined>;
          };
        };
      };
    };
  };
};

function incrementRecord(record: Record<PlayerId, number>, playerId: PlayerId, amount = 1): void {
  record[playerId] = (record[playerId] ?? 0) + amount;
}

function isCharacterCard(definition: LorcanaCard | undefined): boolean {
  return definition?.cardType === "character";
}

function ensureTurnMetadata(ctx: Pick<TurnMetricContext, "G">): LorcanaG["turnMetadata"] {
  if (ctx.G.turnMetadata) {
    return ctx.G.turnMetadata;
  }

  const initialized: LorcanaG["turnMetadata"] = {
    cardsPlayedThisTurn: [],
    charactersQuesting: [],
    inkedThisTurn: [],
    additionalInkwellActions: 0,
    shiftPlayedThisTurn: [],
    challengesByPlayerThisTurn: {} as Record<PlayerId, number>,
    damagedCharactersByOwnerThisTurn: {} as Record<PlayerId, number>,
    challengedCharactersThisTurn: [],
    banishedCharactersThisTurn: [],
    banishedCharactersInChallengeByOwnerThisTurn: {} as Record<PlayerId, number>,
    discardCardsLeftThisTurn: 0,
    pendingCostReductionsByPlayer: {} as Record<
      PlayerId,
      LorcanaG["turnMetadata"]["pendingCostReductionsByPlayer"][PlayerId]
    >,
  };
  ctx.G.turnMetadata = initialized;
  return initialized;
}

export function recordChallengeByPlayerThisTurn(
  ctx: Pick<TurnMetricContext, "G">,
  playerId: PlayerId,
): void {
  const turnMetadata = ensureTurnMetadata(ctx);
  const record =
    turnMetadata.challengesByPlayerThisTurn ??
    (turnMetadata.challengesByPlayerThisTurn = {} as Record<PlayerId, number>);
  incrementRecord(record, playerId);
}

export function recordDamagedCharacterThisTurn(
  ctx: TurnMetricContext,
  cardId: CardInstanceId,
): void {
  const turnMetadata = ensureTurnMetadata(ctx);
  const definition = ctx.cards.getDefinition(cardId);
  if (!isCharacterCard(definition)) {
    return;
  }

  const ownerId = ctx.framework.state.ctx.zones.private.cardIndex[cardId]?.ownerID;
  if (!ownerId) {
    return;
  }

  const record =
    turnMetadata.damagedCharactersByOwnerThisTurn ??
    (turnMetadata.damagedCharactersByOwnerThisTurn = {} as Record<PlayerId, number>);
  incrementRecord(record, ownerId);
}

export function recordBanishedCharacterThisTurn(
  ctx: TurnMetricContext,
  cardId: CardInstanceId,
): void {
  const turnMetadata = ensureTurnMetadata(ctx);
  const definition = ctx.cards.getDefinition(cardId);
  if (!isCharacterCard(definition)) {
    return;
  }

  const banished =
    turnMetadata.banishedCharactersThisTurn ??
    (turnMetadata.banishedCharactersThisTurn = [] as CardInstanceId[]);
  if (!banished.includes(cardId)) {
    banished.push(cardId);
  }
}

export function recordBanishedCharacterInChallengeThisTurn(
  ctx: TurnMetricContext,
  cardId: CardInstanceId,
): void {
  const turnMetadata = ensureTurnMetadata(ctx);
  const definition = ctx.cards.getDefinition(cardId);
  if (!isCharacterCard(definition)) {
    return;
  }

  const ownerId = ctx.framework.state.ctx.zones.private.cardIndex[cardId]?.ownerID;
  if (!ownerId) {
    return;
  }

  const record =
    turnMetadata.banishedCharactersInChallengeByOwnerThisTurn ??
    (turnMetadata.banishedCharactersInChallengeByOwnerThisTurn = {} as Record<PlayerId, number>);
  incrementRecord(record, ownerId);
}

export function recordChallengedCharacterThisTurn(
  ctx: TurnMetricContext,
  cardId: CardInstanceId,
): void {
  const turnMetadata = ensureTurnMetadata(ctx);
  const definition = ctx.cards.getDefinition(cardId);
  if (!isCharacterCard(definition)) {
    return;
  }

  const challenged =
    turnMetadata.challengedCharactersThisTurn ??
    (turnMetadata.challengedCharactersThisTurn = [] as CardInstanceId[]);
  if (!challenged.includes(cardId)) {
    challenged.push(cardId);
  }
}

export function recordDiscardExitThisTurn(ctx: Pick<TurnMetricContext, "G">, amount = 1): void {
  if (amount <= 0) {
    return;
  }

  const turnMetadata = ensureTurnMetadata(ctx);
  turnMetadata.discardCardsLeftThisTurn = (turnMetadata.discardCardsLeftThisTurn ?? 0) + amount;
}

export function isDiscardZoneKey(zoneKey: string | undefined): boolean {
  return zoneKey === "discard" || (typeof zoneKey === "string" && zoneKey.startsWith("discard:"));
}
