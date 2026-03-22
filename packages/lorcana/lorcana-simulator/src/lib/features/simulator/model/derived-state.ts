import { m } from "$lib/i18n/messages.js";
import type { AvailableMove, CardInstanceId } from "@tcg/lorcana-engine";
import type { LorcanaEngineBase, LorcanaProjectedBoardView } from "@tcg/lorcana-engine";

import type {
  ExecutableMoveEntry,
  ExecutableMovePresentationCategoryId,
  LorcanaCardTextEntrySnapshot,
  LorcanaPlayerSide,
  LorcanaSimulatorMoveParams,
  MoveCategorySummary,
  MoveValidationResult,
  PendingResolutionMoveEntry,
} from "@/features/simulator/model/contracts.js";
import {
  getZoneCardCount,
  getAvailableInkForSide,
  getOwnerIdForSide as getOwnerIdForSideFromBoard,
} from "@/features/simulator/model/contracts.js";
import { type CardSnapshotMap, getCardsForZone } from "@/features/simulator/model/board-utils.js";
import { getMoveCategoryLabel } from "@/features/simulator/model/move-presentation.js";

export interface ChallengeState {
  invalidReasons: Record<string, string>;
  validTargetIds: string[];
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

export function canValidateInk(engine: LorcanaEngineBase, cardId: string): boolean {
  return engine.validateMove("putCardIntoInkwell", {
    args: { cardId: cardId as CardInstanceId },
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

const KEYWORD_PATTERN =
  /^(Rush|Ward|Evasive|Bodyguard|Support|Reckless|Vanish|Alert|Challenger \+\d+|Resist \+\d+|Singer \d+|Sing Together \d+|Boost \d+|(?:Puppy |Universal )?Shift \d+)$/i;

function getNonKeywordTextEntryTitles(
  entries: LorcanaCardTextEntrySnapshot[] | undefined,
): string[] {
  return (entries ?? [])
    .map((entry) => entry.title.trim())
    .filter((title) => title.length > 0 && !KEYWORD_PATTERN.test(title));
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

    const targetCardId =
      Array.isArray(params.targets) && typeof params.targets[0] === "string"
        ? params.targets[0]
        : null;
    const costLabel = getPlayCostLabel(params);
    const playLabel = costLabel
      ? `${getCardLabel(cardId, cards)} (${costLabel})`
      : getCardLabel(cardId, cards);

    return targetCardId ? `${playLabel} -> ${getCardLabel(targetCardId, cards)}` : playLabel;
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
      abilityIndex !== null ? getNonKeywordTextEntryTitles(card?.textEntries)[abilityIndex] : null;

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

/**
 * Builds the flat list of executable moves by delegating to the engine's
 * getAvailableMoves() and getMoveOptions() APIs instead of enumerating
 * card combinations and calling validateMove() locally.
 */
export function buildExecutableMoves(
  engine: LorcanaEngineBase,
  cards: CardSnapshotMap,
  availableMoves: AvailableMove[],
  legalMoveIds: readonly string[],
): ExecutableMoveEntry[] {
  const entries: ExecutableMoveEntry[] = [];

  for (const move of availableMoves) {
    switch (move.moveId) {
      case "playCard": {
        for (const cardId of move.selectableCardIds) {
          const id = String(cardId);
          const targetOptions = engine.getMoveOptions("playCard", cardId);

          if (targetOptions.length > 0) {
            for (const option of targetOptions) {
              if (option.kind !== "card") {
                continue;
              }

              const targetId = String(option.cardId);
              const params = {
                cardId: id,
                targets: [targetId],
              } as LorcanaSimulatorMoveParams["playCard"];
              const label = getMoveOptionLabel("playCard", params, cards);
              entries.push({
                id: `playCard:${id}:${targetId}`,
                label,
                moveId: "playCard",
                params,
                presentation: {
                  kind: "targeted",
                  categoryId: "play-card",
                  categoryLabel: getMoveCategoryLabel("playCard"),
                  optionLabel: label,
                },
              });
            }
            continue;
          }

          const params = { cardId: id } as LorcanaSimulatorMoveParams["playCard"];
          const label = getMoveOptionLabel("playCard", params, cards);
          entries.push({
            id: `playCard:${id}`,
            label,
            moveId: "playCard",
            params,
            presentation: {
              kind: "targeted",
              categoryId: "play-card",
              categoryLabel: getMoveCategoryLabel("playCard"),
              optionLabel: label,
            },
          });
        }
        break;
      }
      case "shiftCard": {
        for (const cardId of move.selectableCardIds) {
          const id = String(cardId);
          const params = { cardId: id } as LorcanaSimulatorMoveParams["playCard"];
          const label = getMoveOptionLabel("playCard", params, cards);
          entries.push({
            id: `shiftCard:${id}`,
            label,
            moveId: "playCard",
            params,
            presentation: {
              kind: "targeted",
              categoryId: "shift-card",
              categoryLabel: getMoveCategoryLabel("shiftCard"),
              optionLabel: label,
            },
          });
        }
        break;
      }
      case "singCard": {
        for (const cardId of move.selectableCardIds) {
          const id = String(cardId);
          const params = { cardId: id } as LorcanaSimulatorMoveParams["playCard"];
          const label = getMoveOptionLabel("playCard", params, cards);
          entries.push({
            id: `singCard:${id}`,
            label,
            moveId: "playCard",
            params,
            presentation: {
              kind: "targeted",
              categoryId: "sing-card",
              categoryLabel: getMoveCategoryLabel("singCard"),
              optionLabel: label,
            },
          });
        }
        break;
      }

      case "putCardIntoInkwell": {
        for (const cardId of move.selectableCardIds) {
          const id = String(cardId);
          const params = { cardId: id } as LorcanaSimulatorMoveParams["putCardIntoInkwell"];
          const label = getMoveOptionLabel("putCardIntoInkwell", params, cards);
          entries.push({
            id: `putCardIntoInkwell:${id}`,
            label,
            moveId: "putCardIntoInkwell",
            params,
            presentation: {
              kind: "targeted",
              categoryId: "ink-card",
              categoryLabel: getMoveCategoryLabel("putCardIntoInkwell"),
              optionLabel: label,
            },
          });
        }
        break;
      }

      case "quest": {
        for (const cardId of move.selectableCardIds) {
          const id = String(cardId);
          const params = { cardId: id } as LorcanaSimulatorMoveParams["quest"];
          const label = getMoveOptionLabel("quest", params, cards);
          entries.push({
            id: `quest:${id}`,
            label,
            moveId: "quest",
            params,
            presentation: {
              kind: "targeted",
              categoryId: "quest",
              categoryLabel: getMoveCategoryLabel("quest"),
              optionLabel: label,
            },
          });
        }
        break;
      }

      case "challenge": {
        // Expand each attacker with their valid defenders via getMoveOptions
        for (const attackerId of move.selectableCardIds) {
          const defenderOptions = engine.getMoveOptions("challenge", attackerId);
          for (const option of defenderOptions) {
            if (option.kind !== "card") continue;
            const aId = String(attackerId);
            const dId = String(option.cardId);
            const params = {
              attackerId: aId,
              defenderId: dId,
            } as LorcanaSimulatorMoveParams["challenge"];
            const label = getMoveOptionLabel("challenge", params, cards);
            entries.push({
              id: `challenge:${aId}:${dId}`,
              label,
              moveId: "challenge",
              params,
              presentation: {
                kind: "targeted",
                categoryId: "challenge",
                categoryLabel: getMoveCategoryLabel("challenge"),
                optionLabel: label,
              },
            });
          }
        }
        break;
      }

      case "moveCharacterToLocation": {
        for (const characterId of move.selectableCardIds) {
          const locationOptions = engine.getMoveOptions("moveCharacterToLocation", characterId);
          for (const option of locationOptions) {
            if (option.kind !== "card") continue;
            const cId = String(characterId);
            const lId = String(option.cardId);
            const params = {
              characterId: cId,
              locationId: lId,
            } as LorcanaSimulatorMoveParams["moveCharacterToLocation"];
            const label = getMoveOptionLabel("moveCharacterToLocation", params, cards);
            entries.push({
              id: `moveCharacterToLocation:${cId}:${lId}`,
              label,
              moveId: "moveCharacterToLocation",
              params,
              presentation: {
                kind: "targeted",
                categoryId: "move-to-location",
                categoryLabel: getMoveCategoryLabel("moveCharacterToLocation"),
                optionLabel: label,
              },
            });
          }
        }
        break;
      }

      case "activateAbility": {
        for (const cardId of move.selectableCardIds) {
          const abilityOptions = engine.getMoveOptions("activateAbility", cardId);
          for (const option of abilityOptions) {
            if (option.kind !== "ability") continue;
            const id = String(cardId);
            const params = {
              cardId: id,
              abilityIndex: option.abilityIndex,
            } as LorcanaSimulatorMoveParams["activateAbility"];
            const label = getMoveOptionLabel("activateAbility", params, cards);
            entries.push({
              id: `activateAbility:${id}:${option.abilityIndex}`,
              label,
              moveId: "activateAbility",
              params,
              presentation: {
                kind: "targeted",
                categoryId: "activate-ability",
                categoryLabel: getMoveCategoryLabel("activateAbility"),
                optionLabel: label,
              },
            });
          }
        }
        break;
      }

      case "chooseWhoGoesFirst": {
        const board = engine.getBoard();
        const sides = ["playerOne", "playerTwo"] as const;
        board.playerOrder.forEach((playerId, index) => {
          const id = String(playerId);
          const side = sides[index];
          const params = { playerId: id, side } as LorcanaSimulatorMoveParams["chooseWhoGoesFirst"];
          const label = side === "playerOne" ? "Player 1 goes first" : "Player 2 goes first";
          entries.push({
            id: `chooseWhoGoesFirst:${id}`,
            label,
            moveId: "chooseWhoGoesFirst",
            params,
            presentation: {
              kind: "targeted",
              categoryId: "choose-first-player",
              categoryLabel: getMoveCategoryLabel("chooseWhoGoesFirst"),
              optionLabel: label,
            },
          });
        });
        break;
      }

      case "concede": {
        entries.push({
          id: "concede",
          label: getMoveCategoryLabel("concede"),
          moveId: "concede",
          params: {} as LorcanaSimulatorMoveParams["concede"],
          presentation: {
            kind: "direct",
            categoryId: "concede",
            categoryLabel: getMoveCategoryLabel("concede"),
          },
        });
        break;
      }

      case "passTurn": {
        entries.push({
          id: "passTurn",
          label: getMoveCategoryLabel("passTurn"),
          moveId: "passTurn",
          params: {} as LorcanaSimulatorMoveParams["passTurn"],
          presentation: {
            kind: "direct",
            categoryId: "pass-turn",
            categoryLabel: getMoveCategoryLabel("passTurn"),
          },
        });
        break;
      }

      case "questWithAll": {
        const questMove = availableMoves.find((m) => m.moveId === "quest");
        const questCardIds = questMove?.selectableCardIds ?? [];
        if (questCardIds.length > 1) {
          let totalLore = 0;
          for (const cardId of questCardIds) {
            totalLore += cards[String(cardId)]?.loreValue ?? 0;
          }
          const label = m["sim.actions.label.questWithAll"]({ lore: totalLore });
          entries.push({
            id: "questWithAll",
            label,
            moveId: "questWithAll",
            params: {} as LorcanaSimulatorMoveParams["questWithAll"],
            presentation: {
              kind: "direct",
              categoryId: "quest-all",
              categoryLabel: label,
            },
          });
        }
        break;
      }
    }
  }

  // Handle moves not exposed via getAvailableMoves() but present in enumerateMoves()

  if (legalMoveIds.includes("alterHand") && !entries.some((e) => e.moveId === "alterHand")) {
    const playerId = engine.getClientPlayerId() ?? "";
    const label = getMoveCategoryLabel("alterHand");
    entries.push({
      id: "alterHand",
      label,
      moveId: "alterHand",
      params: { playerId, cardsToMulligan: [] } as LorcanaSimulatorMoveParams["alterHand"],
      presentation: {
        kind: "direct",
        categoryId: "alter-hand",
        categoryLabel: label,
      },
    });
  }

  if (legalMoveIds.includes("concede") && !entries.some((e) => e.moveId === "concede")) {
    entries.push({
      id: "concede",
      label: getMoveCategoryLabel("concede"),
      moveId: "concede",
      params: {} as LorcanaSimulatorMoveParams["concede"],
      presentation: {
        kind: "direct",
        categoryId: "concede",
        categoryLabel: getMoveCategoryLabel("concede"),
      },
    });
  }

  if (engine.canUndo?.() && !entries.some((e) => e.moveId === "undo")) {
    entries.push({
      id: "undo",
      label: getMoveCategoryLabel("undo"),
      moveId: "undo",
      params: {} as LorcanaSimulatorMoveParams["undo"],
      presentation: {
        kind: "direct",
        categoryId: "undo",
        categoryLabel: getMoveCategoryLabel("undo"),
      },
    });
  }

  return entries.sort((left, right) => left.label.localeCompare(right.label));
}

/**
 * Builds lightweight category summaries from available moves without calling
 * getMoveOptions(). This is cheap enough to run on every state change.
 */
export function buildMoveCategorySummaries(
  engine: LorcanaEngineBase,
  availableMoves: AvailableMove[],
  legalMoveIds: readonly string[],
): MoveCategorySummary[] {
  const summaries: MoveCategorySummary[] = [];

  for (const move of availableMoves) {
    switch (move.moveId) {
      case "playCard": {
        summaries.push({
          categoryId: "play-card",
          categoryLabel: getMoveCategoryLabel("playCard"),
          sourceCardIds: move.selectableCardIds.map(String),
          count: move.selectableCardIds.length,
          isDirect: false,
        });
        break;
      }
      case "shiftCard": {
        summaries.push({
          categoryId: "shift-card",
          categoryLabel: getMoveCategoryLabel("shiftCard"),
          sourceCardIds: move.selectableCardIds.map(String),
          count: move.selectableCardIds.length,
          isDirect: false,
        });
        break;
      }
      case "singCard": {
        summaries.push({
          categoryId: "sing-card",
          categoryLabel: getMoveCategoryLabel("singCard"),
          sourceCardIds: move.selectableCardIds.map(String),
          count: move.selectableCardIds.length,
          isDirect: false,
        });
        break;
      }
      case "putCardIntoInkwell": {
        summaries.push({
          categoryId: "ink-card",
          categoryLabel: getMoveCategoryLabel("putCardIntoInkwell"),
          sourceCardIds: move.selectableCardIds.map(String),
          count: move.selectableCardIds.length,
          isDirect: false,
        });
        break;
      }
      case "quest": {
        summaries.push({
          categoryId: "quest",
          categoryLabel: getMoveCategoryLabel("quest"),
          sourceCardIds: move.selectableCardIds.map(String),
          count: move.selectableCardIds.length,
          isDirect: false,
        });
        break;
      }
      case "challenge": {
        summaries.push({
          categoryId: "challenge",
          categoryLabel: getMoveCategoryLabel("challenge"),
          sourceCardIds: move.selectableCardIds.map(String),
          count: move.selectableCardIds.length,
          isDirect: false,
        });
        break;
      }
      case "activateAbility": {
        summaries.push({
          categoryId: "activate-ability",
          categoryLabel: getMoveCategoryLabel("activateAbility"),
          sourceCardIds: move.selectableCardIds.map(String),
          count: move.selectableCardIds.length,
          isDirect: false,
        });
        break;
      }
      case "moveCharacterToLocation": {
        summaries.push({
          categoryId: "move-to-location",
          categoryLabel: getMoveCategoryLabel("moveCharacterToLocation"),
          sourceCardIds: move.selectableCardIds.map(String),
          count: move.selectableCardIds.length,
          isDirect: false,
        });
        break;
      }
      case "passTurn": {
        summaries.push({
          categoryId: "pass-turn",
          categoryLabel: getMoveCategoryLabel("passTurn"),
          sourceCardIds: [],
          count: 1,
          isDirect: true,
        });
        break;
      }
      case "concede": {
        summaries.push({
          categoryId: "concede",
          categoryLabel: getMoveCategoryLabel("concede"),
          sourceCardIds: [],
          count: 1,
          isDirect: true,
        });
        break;
      }
      case "questWithAll": {
        const questMove = availableMoves.find((m) => m.moveId === "quest");
        if (questMove && questMove.selectableCardIds.length > 1) {
          summaries.push({
            categoryId: "quest-all",
            categoryLabel: getMoveCategoryLabel("questWithAll"),
            sourceCardIds: [],
            count: 1,
            isDirect: true,
          });
        }
        break;
      }
      case "chooseWhoGoesFirst": {
        summaries.push({
          categoryId: "choose-first-player",
          categoryLabel: getMoveCategoryLabel("chooseWhoGoesFirst"),
          sourceCardIds: [],
          count: 2,
          isDirect: false,
        });
        break;
      }
    }
  }

  // Handle moves not exposed via getAvailableMoves() but present in enumerateMoves()
  if (legalMoveIds.includes("alterHand") && !summaries.some((s) => s.categoryId === "alter-hand")) {
    summaries.push({
      categoryId: "alter-hand",
      categoryLabel: getMoveCategoryLabel("alterHand"),
      sourceCardIds: [],
      count: 1,
      isDirect: true,
    });
  }

  if (legalMoveIds.includes("concede") && !summaries.some((s) => s.categoryId === "concede")) {
    summaries.push({
      categoryId: "concede",
      categoryLabel: getMoveCategoryLabel("concede"),
      sourceCardIds: [],
      count: 1,
      isDirect: true,
    });
  }

  if (engine.canUndo?.() && !summaries.some((s) => s.categoryId === "undo")) {
    summaries.push({
      categoryId: "undo",
      categoryLabel: getMoveCategoryLabel("undo"),
      sourceCardIds: [],
      count: 1,
      isDirect: true,
    });
  }

  return summaries;
}

/**
 * Expands a single move category into full ExecutableMoveEntry[].
 * Called lazily on user interaction (category click in AvailableMovesPanel),
 * NOT on every state change. This defers getMoveOptions() calls until needed.
 * Note: currently computes all categories and filters — a future optimization
 * could expand only the requested category's AvailableMove entries.
 */
export function expandCategoryMoves(
  engine: LorcanaEngineBase,
  cards: CardSnapshotMap,
  availableMoves: AvailableMove[],
  legalMoveIds: readonly string[],
  categoryId: ExecutableMovePresentationCategoryId,
): ExecutableMoveEntry[] {
  const allMoves = buildExecutableMoves(engine, cards, availableMoves, legalMoveIds);
  return allMoves.filter((move) => move.presentation.categoryId === categoryId);
}

/**
 * Expands moves for a specific source card.
 * Called lazily on card hover (getCardActionViews) and DnD checks.
 */
export function expandCardMoves(
  engine: LorcanaEngineBase,
  cards: CardSnapshotMap,
  availableMoves: AvailableMove[],
  legalMoveIds: readonly string[],
  cardId: string,
): ExecutableMoveEntry[] {
  const allMoves = buildExecutableMoves(engine, cards, availableMoves, legalMoveIds);
  return allMoves.filter((move) => getSourceCardId(move) === cardId);
}

function getSourceCardId(move: ExecutableMoveEntry): string | null {
  const params = move.params as Record<string, unknown>;
  if (typeof params.cardId === "string") return params.cardId;
  if (typeof params.attackerId === "string") return params.attackerId;
  if (typeof params.characterId === "string") return params.characterId;
  return null;
}

export function areMoveCategorySummariesEqual(
  left: MoveCategorySummary[],
  right: MoveCategorySummary[],
): boolean {
  if (left.length !== right.length) return false;
  for (let i = 0; i < left.length; i++) {
    const l = left[i];
    const r = right[i];
    if (
      l.categoryId !== r.categoryId ||
      l.categoryLabel !== r.categoryLabel ||
      l.count !== r.count ||
      l.isDirect !== r.isDirect ||
      l.sourceCardIds.length !== r.sourceCardIds.length
    ) {
      return false;
    }
    for (let j = 0; j < l.sourceCardIds.length; j++) {
      if (l.sourceCardIds[j] !== r.sourceCardIds[j]) return false;
    }
  }
  return true;
}

/**
 * Returns card IDs that can initiate a challenge.
 * Delegates to engine.getAvailableMoves() instead of iterating card pairs.
 */
export function buildChallengeReadyCardIds(availableMoves: AvailableMove[]): string[] {
  const challengeMove = availableMoves.find((move) => move.moveId === "challenge");
  if (!challengeMove) {
    return [];
  }
  return challengeMove.selectableCardIds.map(String).sort();
}

/**
 * Returns hand card IDs that can be played or inked.
 * Delegates to engine.getAvailableMoves() instead of iterating hand cards.
 */
export function buildPlayableHandCardIds(availableMoves: AvailableMove[]): string[] {
  const playableCardIds = new Set<string>();

  for (const move of availableMoves) {
    if (
      move.moveId === "playCard" ||
      move.moveId === "singCard" ||
      move.moveId === "shiftCard" ||
      move.moveId === "putCardIntoInkwell"
    ) {
      for (const cardId of move.selectableCardIds) {
        playableCardIds.add(String(cardId));
      }
    }
  }

  return [...playableCardIds].sort();
}

function hasMove(legalMoves: readonly string[], moveId: string): boolean {
  return legalMoves.includes(moveId);
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

/**
 * Builds challenge state for a specific attacker.
 * Uses engine.getMoveOptions() for valid targets, and engine.validateMove()
 * only for the invalid targets to get user-facing reason strings.
 */
export function buildChallengeState(
  engine: LorcanaEngineBase,
  cards: CardSnapshotMap,
  board: LorcanaProjectedBoardView,
  currentOwnerSide: LorcanaPlayerSide | null,
  currentChallengeSourceCardId: string | null,
): ChallengeState {
  if (!currentOwnerSide || !currentChallengeSourceCardId) {
    return {
      invalidReasons: {},
      validTargetIds: [],
    };
  }

  // Get valid targets from the engine's 2-layer API
  const validOptions = engine.getMoveOptions(
    "challenge",
    currentChallengeSourceCardId as CardInstanceId,
  );
  const validTargetIdSet = new Set(
    validOptions
      .filter((opt): opt is { kind: "card"; cardId: CardInstanceId } => opt.kind === "card")
      .map((opt) => String(opt.cardId)),
  );
  const validTargetIds = [...validTargetIdSet].sort();

  // For invalid targets, get the reason via engine validation
  const opponentSide = currentOwnerSide === "playerOne" ? "playerTwo" : "playerOne";
  const invalidReasons: Record<string, string> = {};
  const opponentCards = getCardsForZone(cards, board, opponentSide, "play");

  for (const card of opponentCards) {
    if (validTargetIdSet.has(card.cardId)) continue;

    const validation = engine.validateMove("challenge", {
      args: {
        attackerId: currentChallengeSourceCardId as CardInstanceId,
        defenderId: card.cardId as CardInstanceId,
      },
    });
    invalidReasons[card.cardId] = getChallengeValidationReason(validation);
  }

  return { invalidReasons, validTargetIds };
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
