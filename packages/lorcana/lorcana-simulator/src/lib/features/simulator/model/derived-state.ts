import { m } from "$lib/paraglide/messages.js";
import type { CardInstanceId } from "@tcg/lorcana-engine";
import type { CardInput, LorcanaEngineBase, LorcanaProjectedBoardView } from "@tcg/lorcana-engine";

import type {
  ExecutableMoveEntry,
  ExecutableMovePresentationCategoryId,
  LorcanaCardSnapshot,
  LorcanaPlayerSide,
  LorcanaSimulatorMoveId,
  LorcanaSimulatorMoveParams,
  MoveValidationResult,
  PendingResolutionMoveEntry,
} from "@/features/simulator/model/contracts.js";
import {
  getZoneCardIds,
  getZoneCardCount,
  getAvailableInkForSide,
  getOwnerIdForSide as getOwnerIdForSideFromBoard,
} from "@/features/simulator/model/contracts.js";
import { type CardSnapshotMap, getCardsForZone } from "@/features/simulator/model/board-utils.js";
import {
  getMoveCategoryId,
  getMoveCategoryLabel,
} from "@/features/simulator/model/move-presentation.js";

export interface ChallengeState {
  invalidReasons: Record<string, string>;
  validTargetIds: string[];
}

function hasMove(legalMoves: readonly string[], moveId: string): boolean {
  return legalMoves.includes(moveId);
}

function getOwnedZoneCardIds(
  board: LorcanaProjectedBoardView,
  ownerSide: LorcanaPlayerSide | null,
  zone: "hand" | "play",
): string[] {
  return ownerSide ? getZoneCardIds(board, ownerSide, zone) : [];
}

function canValidateChallenge(
  engine: LorcanaEngineBase,
  attackerId: string,
  defenderId: string,
): boolean {
  return validateChallenge(engine, attackerId, defenderId).valid;
}

function validateChallenge(
  engine: LorcanaEngineBase,
  attackerId: string,
  defenderId: string,
): MoveValidationResult {
  return engine.validateMove("challenge", {
    args: { attackerId: attackerId as CardInstanceId, defenderId: defenderId as CardInstanceId },
  });
}

function getChallengeValidationReason(validation: MoveValidationResult): string {
  switch (validation.code) {
    case "ATTACKER_DRYING":
      return "Your challenger is still drying.";
    case "ATTACKER_EXERTED":
      return "Your challenger is exerted.";
    case "ATTACKER_NOT_CHARACTER":
      return "Only characters can challenge.";
    case "ATTACKER_NOT_IN_PLAY":
      return "Your challenger is no longer in play.";
    case "DEFENDER_BODYGUARD_RESTRICTION":
      return "Another Bodyguard must be challenged first.";
    case "DEFENDER_CANT_BE_CHALLENGED":
      return "This character can't be challenged right now.";
    case "DEFENDER_CHARACTER_NOT_EXERTED":
      return "This character must be exerted to be challenged.";
    case "DEFENDER_EVASIVE_RESTRICTION":
      return "This character has Evasive.";
    case "DEFENDER_INVALID_TYPE":
      return "Only opposing characters or locations can be challenged.";
    case "DEFENDER_NOT_IN_PLAY":
      return "This target is no longer in play.";
    case "BAG_PENDING":
    case "EFFECT_PENDING":
      return "Resolve pending effects before challenging.";
    default:
      return validation.reason?.trim() || m["sim.errors.challenge.invalidTarget"]({});
  }
}

function canValidateQuest(engine: LorcanaEngineBase, cardId: string): boolean {
  return engine.validateMove("quest", { args: { cardId: cardId as CardInstanceId } }).valid;
}

export function canValidateInk(engine: LorcanaEngineBase, cardId: string): boolean {
  return engine.validateMove("putCardIntoInkwell", {
    args: { cardId: cardId as CardInstanceId },
  }).valid;
}

function canValidateMoveToLocation(
  engine: LorcanaEngineBase,
  characterId: string,
  locationId: string,
): boolean {
  return engine.validateMove("moveCharacterToLocation", {
    args: {
      characterId: characterId as CardInstanceId,
      locationId: locationId as CardInstanceId,
    },
  }).valid;
}

function canValidateActivateAbility(
  engine: LorcanaEngineBase,
  cardId: string,
  abilityIndex: number,
): boolean {
  return engine.validateMove("activateAbility", {
    args: {
      cardId: cardId as CardInstanceId,
      abilityIndex,
    },
  }).valid;
}

function getCardLabel(cardId: string, cards: CardSnapshotMap): string {
  return cards[cardId]?.label ?? m["sim.card.unknown"]({});
}

function getPlayCostLabel(params: Record<string, unknown>): string | null {
  const cost = params.cost;
  if (cost === "shift") {
    return "Shift";
  }
  if (cost === "sing") {
    return "Sing";
  }
  if (cost === "singTogether") {
    return "Sing Together";
  }
  if (cost === "free") {
    return "Free";
  }
  return null;
}

function getMoveOptionLabel(
  moveId: string,
  params: Record<string, unknown>,
  cards: CardSnapshotMap,
): string {
  if (moveId === "playCard") {
    const cardId = typeof params.cardId === "string" ? params.cardId : null;
    if (!cardId) {
      return getMoveCategoryLabel(moveId);
    }

    const costLabel = getPlayCostLabel(params);
    return costLabel
      ? `${getCardLabel(cardId, cards)} (${costLabel})`
      : getCardLabel(cardId, cards);
  }

  if (moveId === "putCardIntoInkwell" || moveId === "quest") {
    const cardId = typeof params.cardId === "string" ? params.cardId : null;
    return cardId ? getCardLabel(cardId, cards) : getMoveCategoryLabel(moveId);
  }

  if (moveId === "activateAbility") {
    const cardId = typeof params.cardId === "string" ? params.cardId : null;
    const abilityIndex = typeof params.abilityIndex === "number" ? params.abilityIndex : null;
    if (!cardId) {
      return moveId;
    }

    const card = cards[cardId];
    const abilityTitle =
      abilityIndex !== null
        ? (card?.textEntries ?? [])
            .map((entry) => entry.title.trim())
            .filter((title) => title.length > 0)[abilityIndex]
        : null;

    return abilityTitle && abilityTitle.length > 0
      ? `${getCardLabel(cardId, cards)}: ${abilityTitle}`
      : getCardLabel(cardId, cards);
  }

  if (moveId === "moveCharacterToLocation") {
    const characterId = typeof params.characterId === "string" ? params.characterId : null;
    const locationId = typeof params.locationId === "string" ? params.locationId : null;
    if (characterId && locationId) {
      return `${getCardLabel(characterId, cards)} -> ${getCardLabel(locationId, cards)}`;
    }
  }

  if (moveId === "challenge") {
    const attackerId = typeof params.attackerId === "string" ? params.attackerId : null;
    const defenderId = typeof params.defenderId === "string" ? params.defenderId : null;
    if (attackerId && defenderId) {
      return `${getCardLabel(attackerId, cards)} -> ${getCardLabel(defenderId, cards)}`;
    }
  }

  return getMoveCategoryLabel(moveId);
}

export function buildExecutableMoves(
  engine: LorcanaEngineBase,
  legalMoves: readonly string[],
  cards: CardSnapshotMap,
  board: LorcanaProjectedBoardView,
  ownerSide: LorcanaPlayerSide | null,
): ExecutableMoveEntry[] {
  const entries: ExecutableMoveEntry[] = [];
  const debugCategoryCounts: Partial<Record<ExecutableMovePresentationCategoryId, number>> = {};

  function pushEntry(entry: ExecutableMoveEntry): void {
    entries.push(entry);
    const categoryId = entry.presentation.categoryId;
    debugCategoryCounts[categoryId] = (debugCategoryCounts[categoryId] ?? 0) + 1;
  }

  for (const moveId of legalMoves) {
    try {
      if (moveId === "chooseWhoGoesFirst" || moveId === "alterHand") {
        continue;
      }
      if (moveId.startsWith("manual") || moveId === "resolveBag" || moveId === "resolveEffect") {
        continue;
      }

      if (moveId === "playCard" && ownerSide) {
        for (const cardId of getOwnedZoneCardIds(board, ownerSide, "hand")) {
          if (!engine.canPlayCard(cardId as CardInput)) {
            continue;
          }
          const params = { cardId } as LorcanaSimulatorMoveParams["playCard"];
          pushEntry({
            id: `${moveId}:${cardId}`,
            label: getMoveOptionLabel(moveId, params, cards),
            moveId,
            params,
            presentation: {
              kind: "targeted",
              categoryId: getMoveCategoryId(moveId),
              categoryLabel: getMoveCategoryLabel(moveId),
              optionLabel: getMoveOptionLabel(moveId, params, cards),
            },
          });
        }
        continue;
      }

      if (moveId === "putCardIntoInkwell" && ownerSide) {
        for (const cardId of getOwnedZoneCardIds(board, ownerSide, "hand")) {
          if (!canValidateInk(engine, cardId)) {
            continue;
          }
          const params = { cardId } as LorcanaSimulatorMoveParams["putCardIntoInkwell"];
          pushEntry({
            id: `${moveId}:${cardId}`,
            label: getMoveOptionLabel(moveId, params, cards),
            moveId,
            params,
            presentation: {
              kind: "targeted",
              categoryId: getMoveCategoryId(moveId),
              categoryLabel: getMoveCategoryLabel(moveId),
              optionLabel: getMoveOptionLabel(moveId, params, cards),
            },
          });
        }
        continue;
      }

      if (moveId === "quest" && ownerSide) {
        for (const cardId of getOwnedZoneCardIds(board, ownerSide, "play")) {
          if (!canValidateQuest(engine, cardId)) {
            continue;
          }
          const params = { cardId } as LorcanaSimulatorMoveParams["quest"];
          pushEntry({
            id: `${moveId}:${cardId}`,
            label: getMoveOptionLabel(moveId, params, cards),
            moveId,
            params,
            presentation: {
              kind: "targeted",
              categoryId: getMoveCategoryId(moveId),
              categoryLabel: getMoveCategoryLabel(moveId),
              optionLabel: getMoveOptionLabel(moveId, params, cards),
            },
          });
        }
        continue;
      }

      if (moveId === "moveCharacterToLocation" && ownerSide) {
        const playCardIds = getOwnedZoneCardIds(board, ownerSide, "play");
        const characters = playCardIds.filter((cardId) => cards[cardId]?.cardType === "character");
        const locations = playCardIds.filter((cardId) => cards[cardId]?.cardType === "location");
        for (const characterId of characters) {
          for (const locationId of locations) {
            if (!canValidateMoveToLocation(engine, characterId, locationId)) {
              continue;
            }
            const params = {
              characterId,
              locationId,
            } as LorcanaSimulatorMoveParams["moveCharacterToLocation"];
            pushEntry({
              id: `${moveId}:${characterId}:${locationId}`,
              label: getMoveOptionLabel(moveId, params, cards),
              moveId,
              params,
              presentation: {
                kind: "targeted",
                categoryId: getMoveCategoryId(moveId),
                categoryLabel: getMoveCategoryLabel(moveId),
                optionLabel: getMoveOptionLabel(moveId, params, cards),
              },
            });
          }
        }
        continue;
      }

      if (moveId === "challenge" && ownerSide) {
        const attackerIds = getOwnedZoneCardIds(board, ownerSide, "play");
        const opponentSide = ownerSide === "playerOne" ? "playerTwo" : "playerOne";
        const defenderIds = getZoneCardIds(board, opponentSide, "play");

        for (const attackerId of attackerIds) {
          for (const defenderId of defenderIds) {
            let isValidChallenge = false;
            try {
              isValidChallenge = canValidateChallenge(engine, attackerId, defenderId);
            } catch {
              isValidChallenge = false;
            }

            if (!isValidChallenge) {
              continue;
            }

            const params = {
              attackerId,
              defenderId,
            } as LorcanaSimulatorMoveParams["challenge"];

            pushEntry({
              id: `${moveId}:${attackerId}:${defenderId}`,
              label: getMoveOptionLabel(moveId, params, cards),
              moveId,
              params,
              presentation: {
                kind: "targeted",
                categoryId: getMoveCategoryId(moveId),
                categoryLabel: getMoveCategoryLabel(moveId),
                optionLabel: getMoveOptionLabel(moveId, params, cards),
              },
            });
          }
        }
        continue;
      }

      if (moveId === "activateAbility" && ownerSide) {
        for (const cardId of getOwnedZoneCardIds(board, ownerSide, "play")) {
          const card = cards[cardId];
          if (!card) {
            continue;
          }

          const abilityEntryCount = Math.max(card.textEntries?.length ?? 0, 1);

          for (let abilityIndex = 0; abilityIndex < abilityEntryCount; abilityIndex += 1) {
            if (!canValidateActivateAbility(engine, cardId, abilityIndex)) {
              continue;
            }

            const params = {
              cardId,
              abilityIndex,
            } as LorcanaSimulatorMoveParams["activateAbility"];

            pushEntry({
              id: `${moveId}:${cardId}:${abilityIndex}`,
              label: getMoveOptionLabel(moveId, params, cards),
              moveId,
              params,
              presentation: {
                kind: "targeted",
                categoryId: getMoveCategoryId(moveId),
                categoryLabel: getMoveCategoryLabel(moveId),
                optionLabel: getMoveOptionLabel(moveId, params, cards),
              },
            });
          }
        }
        continue;
      }

      const params = {} as LorcanaSimulatorMoveParams[LorcanaSimulatorMoveId];
      const categoryId = getMoveCategoryId(moveId);
      const categoryLabel = getMoveCategoryLabel(moveId);
      pushEntry({
        id: moveId,
        label: categoryLabel,
        moveId: moveId as LorcanaSimulatorMoveId,
        params,
        presentation: {
          kind: "direct",
          categoryId,
          categoryLabel,
        },
      });
    } catch {
      continue;
    }
  }

  console.log("[simulator][buildExecutableMoves]", {
    ownerSide,
    legalMoves,
    entryCount: entries.length,
    debugCategoryCounts,
  });

  return entries.sort((left, right) => left.label.localeCompare(right.label));
}

export function buildChallengeReadyCardIds(
  engine: LorcanaEngineBase,
  legalMoves: readonly string[],
  board: LorcanaProjectedBoardView,
  ownerSide: LorcanaPlayerSide | null,
): string[] {
  if (!ownerSide || !hasMove(legalMoves, "challenge")) {
    return [];
  }

  const challengeCardIds = new Set<string>();
  const attackerIds = getOwnedZoneCardIds(board, ownerSide, "play");
  const opponentSide = ownerSide === "playerOne" ? "playerTwo" : "playerOne";
  const defenderIds = getZoneCardIds(board, opponentSide, "play");

  for (const attackerId of attackerIds) {
    try {
      if (defenderIds.some((defenderId) => canValidateChallenge(engine, attackerId, defenderId))) {
        challengeCardIds.add(attackerId);
      }
    } catch (error) {
      console.error("[simulator][buildChallengeReadyCardIds][error]", {
        ownerSide,
        attackerId,
        defenderIds,
        error,
      });
      throw error;
    }
  }

  const result = [...challengeCardIds].sort();
  console.log("[simulator][buildChallengeReadyCardIds]", {
    ownerSide,
    attackerIds,
    defenderIds,
    result,
  });
  return result;
}

export function buildPlayableHandCardIds(
  engine: LorcanaEngineBase,
  legalMoves: readonly string[],
  board: LorcanaProjectedBoardView,
  ownerSide: LorcanaPlayerSide | null,
): string[] {
  if (
    !ownerSide ||
    (!hasMove(legalMoves, "playCard") && !hasMove(legalMoves, "putCardIntoInkwell"))
  ) {
    return [];
  }

  const playableCardIds = new Set<string>();

  for (const cardId of getOwnedZoneCardIds(board, ownerSide, "hand")) {
    if (
      (hasMove(legalMoves, "playCard") && engine.canPlayCard(cardId as CardInput)) ||
      (hasMove(legalMoves, "putCardIntoInkwell") && canValidateInk(engine, cardId))
    ) {
      playableCardIds.add(cardId);
    }
  }

  const result = [...playableCardIds].sort();
  console.log("[simulator][buildPlayableHandCardIds]", {
    ownerSide,
    handCardIds: getOwnedZoneCardIds(board, ownerSide, "hand"),
    result,
  });
  return result;
}

export function buildPendingResolutionMoves(
  legalMoves: readonly string[],
  board: LorcanaProjectedBoardView,
): PendingResolutionMoveEntry[] {
  const entries: PendingResolutionMoveEntry[] = [];

  if (hasMove(legalMoves, "resolveBag")) {
    entries.push(
      ...board.bagEffects.map((bagEffect) => ({
        id: `resolveBag:${bagEffect.id}`,
        moveId: "resolveBag" as const,
        params: { bagId: bagEffect.id },
      })),
    );
  }

  if (hasMove(legalMoves, "resolveEffect") && board.pendingChoice?.requestID) {
    entries.push({
      id: `resolveEffect:${board.pendingChoice.requestID}`,
      moveId: "resolveEffect",
      params: { effectId: board.pendingChoice.requestID, params: {} },
    });
  }

  return entries.sort((left, right) => left.id.localeCompare(right.id));
}

export function buildChallengeState(
  engine: LorcanaEngineBase,
  legalMoves: readonly string[],
  cards: CardSnapshotMap,
  board: LorcanaProjectedBoardView,
  currentOwnerSide: LorcanaPlayerSide | null,
  currentChallengeSourceCardId: string | null,
): ChallengeState {
  if (!currentOwnerSide || !currentChallengeSourceCardId || !hasMove(legalMoves, "challenge")) {
    return {
      invalidReasons: {},
      validTargetIds: [],
    };
  }

  const opponentSide = currentOwnerSide === "playerOne" ? "playerTwo" : "playerOne";
  const validTargetIds: string[] = [];
  const invalidReasons: Record<string, string> = {};

  const opponentCards = getCardsForZone(cards, board, opponentSide, "play");
  for (const card of opponentCards) {
    let validation: MoveValidationResult;
    try {
      validation = validateChallenge(engine, currentChallengeSourceCardId, card.cardId);
    } catch (error) {
      console.error("[simulator][buildChallengeState][error]", {
        currentOwnerSide,
        currentChallengeSourceCardId,
        defenderId: card.cardId,
        error,
      });
      invalidReasons[card.cardId] = m["sim.errors.challenge.invalidTarget"]({});
      continue;
    }

    if (validation.valid) {
      validTargetIds.push(card.cardId);
      continue;
    }

    invalidReasons[card.cardId] = getChallengeValidationReason(validation);
  }

  const result = {
    invalidReasons,
    validTargetIds: [...validTargetIds].sort(),
  };
  console.log("[simulator][buildChallengeState]", {
    currentOwnerSide,
    currentChallengeSourceCardId,
    opponentCardIds: opponentCards.map((card) => card.cardId),
    result,
  });
  return result;
}

export function areOrderedStringArraysEqual(left: string[], right: string[]): boolean {
  if (left.length !== right.length) {
    return false;
  }

  for (let index = 0; index < left.length; index += 1) {
    if (left[index] !== right[index]) {
      return false;
    }
  }

  return true;
}

export function areStringRecordsEqual(
  left: Record<string, string>,
  right: Record<string, string>,
): boolean {
  const leftKeys = Object.keys(left);
  const rightKeys = Object.keys(right);
  if (leftKeys.length !== rightKeys.length) {
    return false;
  }

  for (const key of leftKeys) {
    if (!(key in right) || left[key] !== right[key]) {
      return false;
    }
  }

  return true;
}

function areUnknownRecordsEqual(
  left: Record<string, unknown> | undefined,
  right: Record<string, unknown> | undefined,
): boolean {
  if (!left || !right) {
    return left === right;
  }

  const leftKeys = Object.keys(left);
  const rightKeys = Object.keys(right);
  if (leftKeys.length !== rightKeys.length) {
    return false;
  }

  for (const key of leftKeys) {
    if (!(key in right) || !Object.is(left[key], right[key])) {
      return false;
    }
  }

  return true;
}

export function areExecutableMovesEqual(
  left: ExecutableMoveEntry[],
  right: ExecutableMoveEntry[],
): boolean {
  if (left.length !== right.length) {
    return false;
  }

  for (let index = 0; index < left.length; index += 1) {
    const leftMove = left[index];
    const rightMove = right[index];

    if (
      leftMove.id !== rightMove.id ||
      leftMove.label !== rightMove.label ||
      leftMove.moveId !== rightMove.moveId ||
      leftMove.presentation.kind !== rightMove.presentation.kind ||
      leftMove.presentation.categoryId !== rightMove.presentation.categoryId ||
      leftMove.presentation.categoryLabel !== rightMove.presentation.categoryLabel ||
      (leftMove.presentation.kind === "targeted" ? leftMove.presentation.optionLabel : null) !==
        (rightMove.presentation.kind === "targeted" ? rightMove.presentation.optionLabel : null) ||
      !areUnknownRecordsEqual(leftMove.params, rightMove.params)
    ) {
      return false;
    }
  }

  return true;
}

export function arePendingResolutionMovesEqual(
  left: PendingResolutionMoveEntry[],
  right: PendingResolutionMoveEntry[],
): boolean {
  if (left.length !== right.length) {
    return false;
  }

  for (let index = 0; index < left.length; index += 1) {
    const leftMove = left[index];
    const rightMove = right[index];
    if (
      leftMove.id !== rightMove.id ||
      leftMove.moveId !== rightMove.moveId ||
      !areUnknownRecordsEqual(leftMove.params, rightMove.params)
    ) {
      return false;
    }
  }

  return true;
}

export function getPlayerSummary(
  side: LorcanaPlayerSide | null,
  snapshot: LorcanaProjectedBoardView | null,
): {
  lore: number;
  deckCount: number;
  handCount: number;
  discardCount: number;
  inkwellCount: number;
  availableInk: number | null;
} | null {
  if (!side || !snapshot) {
    return null;
  }

  const ownerId = getOwnerIdForSideFromBoard(snapshot, side);
  if (!ownerId) {
    return null;
  }

  return {
    lore: snapshot.players[ownerId]?.lore ?? 0,
    deckCount: getZoneCardCount(snapshot, side, "deck"),
    handCount: getZoneCardCount(snapshot, side, "hand"),
    discardCount: getZoneCardCount(snapshot, side, "discard"),
    inkwellCount: getZoneCardCount(snapshot, side, "inkwell"),
    availableInk: getAvailableInkForSide(snapshot, side),
  };
}
