import type { EnginePacketUpdate } from "@tcg/lorcana-engine";
import type {
  LorcanaProjectedBoardView,
  LorcanaProjectedCard,
  LorcanaProjectedPlayerBoard,
  LorcanaRuntimeMoveParams,
} from "@tcg/lorcana-engine";
import type { TestInitialState } from "@tcg/lorcana-engine/testing";

export const LORCANA_PLAYER_SIDES = ["playerOne", "playerTwo"] as const;
export type LorcanaPlayerSide = (typeof LORCANA_PLAYER_SIDES)[number];

export const LORCANA_TABLE_SEATS = ["top", "bottom"] as const;
export type LorcanaTableSeat = (typeof LORCANA_TABLE_SEATS)[number];

export const LORCANA_SIMULATOR_VIEWS = [
  "playerOne",
  "playerTwo",
  "spectator",
  "authoritative",
] as const;
export type LorcanaSimulatorView = (typeof LORCANA_SIMULATOR_VIEWS)[number];

export const LORCANA_SIMULATOR_LOCALES = ["en", "es", "de", "it", "pt-br"] as const;
export type LorcanaSimulatorLocale = (typeof LORCANA_SIMULATOR_LOCALES)[number];

export const LORCANA_ZONE_IDS = ["deck", "hand", "play", "inkwell", "discard", "limbo"] as const;
export type LorcanaZoneId = (typeof LORCANA_ZONE_IDS)[number];

export type CardReadyState = "ready" | "exerted" | "unknown";
export type CardFacePresentation = "faceUp" | "faceDown";

/**
 * Lorcana Simulator Fixture
 *
 * Defines a test game state using real card definitions from @tcg/lorcana-cards.
 * The TestInitialState uses real CharacterCard, ActionCard, ItemCard, and LocationCard
 * objects with full abilities, stats, and effects.
 */
export interface LorcanaSimulatorFixture {
  id: string;
  name: string;
  description: string;
  playerOne: TestInitialState;
  playerTwo: TestInitialState;
  seed?: string;
  skipPreGame?: boolean;
}

export interface LorcanaCardTextEntrySnapshot {
  title: string;
  description?: string;
}

export interface LorcanaCardSnapshot {
  cardId: string;
  definitionId: string;
  isMasked: boolean;
  label: string;
  ownerId: string;
  ownerSide: LorcanaPlayerSide;
  zoneId: LorcanaZoneId;

  // Optional gameplay + display metadata
  cardType?: "character" | "action" | "item" | "location";
  cost?: number;
  inkType?: string[];
  inkable?: boolean;
  text?: string;
  textEntries?: LorcanaCardTextEntrySnapshot[];
  strength?: number;
  baseStrength?: number;
  willpower?: number;
  baseWillpower?: number;
  loreValue?: number;
  baseLoreValue?: number;
  moveCost?: number;
  classifications?: string[];
  keywords?: string[];
  keywordValues?: {
    challenger?: number;
    resist?: number;
  };
  damage?: number;
  readyState?: CardReadyState;
  isDrying?: boolean;
  hasQuestRestriction?: boolean;
  temporaryRestrictions?: Record<string, number>;
  atLocationId?: string;
  atLocationLabel?: string;
  cardsUnderCount?: number;
  facePresentation: CardFacePresentation;

  // Image metadata
  set?: string;
  cardNumber?: number;

  // Rarity
  rarity?:
    | "common"
    | "uncommon"
    | "rare"
    | "super_rare"
    | "legendary"
    | "enchanted"
    | "iconic"
    | "promo";
}

export type ActionCandidateId =
  | "play-card"
  | "ink-card"
  | "quest"
  | "challenge"
  | "pass-turn"
  | "concede";

export interface ActionCandidate {
  id: ActionCandidateId;
  label: string;
  enabled: boolean;
  reason?: string;
  moveId?: LorcanaSimulatorMoveId;
  params?: Record<string, unknown>;
}

export interface ExecutableMoveEntry {
  id: string;
  label: string;
  moveId: LorcanaSimulatorMoveId;
  params: LorcanaSimulatorMoveParams[LorcanaSimulatorMoveId];
  presentation: ExecutableMovePresentation;
}

export interface ResolutionActionView {
  id: string;
  label: string;
  detail?: string;
  emphasis?: boolean;
  onClick: () => void;
}

export type ExecutableMovePresentationCategoryId =
  | "activate-ability"
  | "choose-first-player"
  | "challenge"
  | "concede"
  | "ink-card"
  | "keep-hand"
  | "move-to-location"
  | "pass-turn"
  | "play-card"
  | "quest"
  | "unknown";

export type ExecutableMovePresentation =
  | {
      kind: "direct";
      categoryId: ExecutableMovePresentationCategoryId;
      categoryLabel: string;
    }
  | {
      kind: "targeted";
      categoryId: ExecutableMovePresentationCategoryId;
      categoryLabel: string;
      optionLabel: string;
    };

export type CardActionCategoryId =
  | "activate-ability"
  | "challenge"
  | "ink-card"
  | "move-to-location"
  | "play-card"
  | "quest";

export interface CardActionView {
  id: string;
  cardId: string;
  categoryId: CardActionCategoryId;
  label: string;
  detail?: string;
  enabled: boolean;
  reason?: string;
  moves: ExecutableMoveEntry[];
}

export type SimulatorSerializedValue =
  | string
  | number
  | boolean
  | null
  | SimulatorSerializedValue[]
  | { [key: string]: SimulatorSerializedValue };

export type SimulatorSerializedObject = { [key: string]: SimulatorSerializedValue };

export interface MoveLogDefaultMessageSnapshot {
  key: string;
  values: SimulatorSerializedObject;
}

export interface MoveLogRelatedEntrySnapshot {
  sourceEventSeqs: number[];
  defaultMessage?: MoveLogDefaultMessageSnapshot;
}

export interface MoveLogEntrySnapshot {
  id: string;
  timestamp: number;
  turnNumber: number;
  moveId: LorcanaSimulatorMoveId;
  actorSide?: LorcanaPlayerSide;
  title: string;
  detail?: string;
  rawLogRegistry?: {
    move: {
      moveId: LorcanaSimulatorMoveId;
      params?: SimulatorSerializedObject;
      playerId: string;
      timestamp: number;
    };
    matchingMoveLogEntry?: MoveLogRelatedEntrySnapshot;
    relatedLogEntries: MoveLogRelatedEntrySnapshot[];
    cardReferences?: LorcanaCardSnapshot[];
  };
}

export interface MoveValidationResult {
  valid: boolean;
  reason?: string;
  code?: string;
}

export interface MoveExecutionResult {
  success: boolean;
  reason?: string;
  code?: string;
}

export interface SimulatorMoveError {
  code?: string;
  message: string;
  moveId: LorcanaSimulatorMoveId;
  params?: Record<string, unknown>;
  rawReason?: string;
}

export interface LorcanaPlayerSummary {
  lore: number;
  deckCount: number;
  handCount: number;
  discardCount: number;
  inkwellCount: number;
  availableInk: number | null;
}

export type PendingResolutionMoveEntry =
  | {
      id: string;
      moveId: "resolveBag";
      params: LorcanaSimulatorMoveParams["resolveBag"];
    }
  | {
      id: string;
      moveId: "resolveEffect";
      params: LorcanaSimulatorMoveParams["resolveEffect"];
    };

type ExactMoveParamMap<T extends Record<LorcanaSimulatorMoveId, unknown>> = T;

export const LORCANA_SIMULATOR_MOVE_ID_REGISTRY = {
  activateAbility: true,
  challenge: true,
  chooseWhoGoesFirst: true,
  concede: true,
  moveCharacterToLocation: true,
  alterHand: true,
  passTurn: true,
  playCard: true,
  putCardIntoInkwell: true,
  quest: true,
  questWithAll: true,
  sing: true,
  singTogether: true,
  resolveBag: true,
  resolveEffect: true,
  manualMoveCard: true,
  manualExertCard: true,
  manualReadyCard: true,
  manualDryCard: true,
  manualSetDamage: true,
  manualSetLore: true,
  manualShuffleDeck: true,
  manualPassTurn: true,
} as const satisfies Record<keyof LorcanaRuntimeMoveParams, true>;

export type LorcanaSimulatorMoveId = keyof typeof LORCANA_SIMULATOR_MOVE_ID_REGISTRY;

export function isLorcanaSimulatorMoveId(value: string): value is LorcanaSimulatorMoveId {
  return value in LORCANA_SIMULATOR_MOVE_ID_REGISTRY;
}

export function assertLorcanaSimulatorMoveId(value: string): LorcanaSimulatorMoveId {
  if (isLorcanaSimulatorMoveId(value)) {
    return value;
  }

  throw new Error(`Unknown Lorcana simulator move id: ${value}`);
}

export type LorcanaSimulatorMoveParams = ExactMoveParamMap<{
  activateAbility: {
    cardId: string;
    ability?: string;
    abilityIndex?: number;
    targets?: string[];
    choiceIndex?: number;
    costs?: {
      exertCharacters?: string[];
      discardCards?: string[];
    };
  };
  challenge: { attackerId: string; defenderId: string };
  chooseWhoGoesFirst: { playerId: string; side?: LorcanaPlayerSide };
  concede: Record<string, never>;
  moveCharacterToLocation: { characterId: string; locationId: string };
  alterHand: { playerId: string; cardsToMulligan: string[] };
  passTurn: Record<string, never>;
  playCard: {
    cardId: string;
    cost?: LorcanaRuntimeMoveParams["playCard"]["cost"];
    shiftTarget?: string;
    singer?: string;
    singers?: string[];
    targets?: string[];
    playerTargets?: string | string[];
    amount?: number;
    namedCard?: string;
    resolveOptional?: boolean;
    choiceIndex?: number;
    preventAutoResolveTriggeredEffects?: boolean;
    destinations?: Array<{ zone: string; cards: string[] }>;
  };
  putCardIntoInkwell: { cardId: string };
  quest: { cardId: string };
  questWithAll: Record<string, never>;
  sing: { singerId: string; songId: string };
  singTogether: { singerIds: string[]; songId: string };
  resolveBag: { bagId: string; params?: Record<string, unknown> };
  resolveEffect: { effectId: string; params?: Record<string, unknown> };
  manualMoveCard: {
    cardId: string;
    targetZoneId: string;
    position?: "top" | "bottom" | number;
  };
  manualExertCard: { cardId: string };
  manualReadyCard: { cardId: string };
  manualDryCard: { cardId: string };
  manualSetDamage: { cardId: string; damage: number };
  manualSetLore: { playerId: string; amount: number };
  manualShuffleDeck: { playerId: string };
  manualPassTurn: Record<string, never>;
}>;

export interface LorcanaSimulatorReadModel {
  setLocale(locale: LorcanaSimulatorLocale): void;
  getStateID(): number;

  getLastPacketUpdate(view?: LorcanaSimulatorView): EnginePacketUpdate | null;

  getBoard(view: LorcanaSimulatorView): LorcanaProjectedBoardView;
  getLegalActions(view: LorcanaSimulatorView): readonly unknown[];
  getCard(view: LorcanaSimulatorView, cardId: string): LorcanaCardSnapshot | null;
  getOwnerSide(view: LorcanaSimulatorView): LorcanaPlayerSide | null;
  getSerializedState?(indent?: number): string;
  getMoveLog(limit?: number, view?: LorcanaSimulatorView): MoveLogEntrySnapshot[];

  subscribeStateUpdates(handler: (stateID: number) => void): () => void;
  dispose?(): void;
}

export interface LorcanaSimulatorPlayerActions {
  validateMove<K extends LorcanaSimulatorMoveId>(
    view: LorcanaSimulatorView,
    moveId: K,
    params: LorcanaSimulatorMoveParams[K],
  ): MoveValidationResult;
  executeMove<K extends LorcanaSimulatorMoveId>(
    view: LorcanaSimulatorView,
    moveId: K,
    params: LorcanaSimulatorMoveParams[K],
  ): MoveExecutionResult;
}

export const LORCANA_SIMULATOR_JUDGE_MOVE_IDS = [
  "manualMoveCard",
  "manualExertCard",
  "manualReadyCard",
  "manualDryCard",
  "manualSetDamage",
  "manualSetLore",
  "manualShuffleDeck",
  "manualPassTurn",
] as const;
export type LorcanaSimulatorJudgeMoveId = (typeof LORCANA_SIMULATOR_JUDGE_MOVE_IDS)[number];

export interface LorcanaSimulatorJudgeActions {
  validateMove<K extends LorcanaSimulatorJudgeMoveId>(
    moveId: K,
    params: Record<string, unknown>,
  ): MoveValidationResult;
  executeMove<K extends LorcanaSimulatorJudgeMoveId>(
    moveId: K,
    params: Record<string, unknown>,
  ): MoveExecutionResult;
}

export interface LorcanaSimulatorSession {
  readModel: LorcanaSimulatorReadModel;
  playerActions: LorcanaSimulatorPlayerActions;
  judgeActions: LorcanaSimulatorJudgeActions;
  dispose?(): void;
}

export type LorcanaDisplayPlayerBoard = {
  availableInk: number | null;
  ownerId: string;
  side: LorcanaPlayerSide;
  projected: LorcanaProjectedPlayerBoard | null;
};

export function getSideForOwnerId(
  board: LorcanaProjectedBoardView,
  ownerId?: string | null,
): LorcanaPlayerSide | null {
  if (!ownerId) {
    return null;
  }

  const [playerOneId, playerTwoId] = board.playerOrder.map(String);
  if (String(ownerId) === playerOneId) {
    return "playerOne";
  }
  if (String(ownerId) === playerTwoId) {
    return "playerTwo";
  }

  return null;
}

export function getOwnerIdForSide(
  board: LorcanaProjectedBoardView,
  side: LorcanaPlayerSide,
): string | null {
  const index = side === "playerOne" ? 0 : 1;
  const ownerId = board.playerOrder[index];
  return ownerId ? String(ownerId) : null;
}

function getProjectedPlayerBoardForSide(
  board: LorcanaProjectedBoardView,
  side: LorcanaPlayerSide,
): { ownerId: string; projected: LorcanaProjectedPlayerBoard | null } {
  const ownerId = getOwnerIdForSide(board, side) ?? "";
  const projected = ownerId ? (board.players[ownerId] ?? null) : null;

  return {
    ownerId,
    projected,
  };
}

export function getPlayerBoardForSide(
  board: LorcanaProjectedBoardView,
  side: LorcanaPlayerSide,
): LorcanaDisplayPlayerBoard {
  const { ownerId, projected } = getProjectedPlayerBoardForSide(board, side);

  return {
    availableInk: getAvailableInkForSide(board, side),
    ownerId,
    projected,
    side,
  };
}

export function getActiveSide(board: LorcanaProjectedBoardView): LorcanaPlayerSide | null {
  return getSideForOwnerId(board, board.priorityPlayer ? String(board.priorityPlayer) : null);
}

export function getTurnSide(board: LorcanaProjectedBoardView): LorcanaPlayerSide | null {
  return getSideForOwnerId(board, board.turnPlayer ? String(board.turnPlayer) : null);
}

export function getZoneCardIds(
  board: LorcanaProjectedBoardView,
  side: LorcanaPlayerSide,
  zoneId: LorcanaZoneId,
): string[] {
  const { projected: playerBoard } = getProjectedPlayerBoardForSide(board, side);
  if (!playerBoard) {
    return [];
  }

  switch (zoneId) {
    case "hand":
      return playerBoard.hand.map(String);
    case "play":
      return playerBoard.play.map(String);
    case "inkwell":
      return playerBoard.inkwell.map(String);
    case "discard":
      return playerBoard.discard.map(String);
    case "deck":
    case "limbo":
    default:
      return [];
  }
}

export function getZoneCardCount(
  board: LorcanaProjectedBoardView,
  side: LorcanaPlayerSide,
  zoneId: LorcanaZoneId,
): number {
  const { projected: playerBoard } = getProjectedPlayerBoardForSide(board, side);
  if (!playerBoard) {
    return 0;
  }

  switch (zoneId) {
    case "deck":
      return playerBoard.deckCount;
    case "hand":
      return playerBoard.handCount;
    case "play":
      return playerBoard.play.length;
    case "inkwell":
      return playerBoard.inkwell.length;
    case "discard":
      return playerBoard.discard.length;
    case "limbo":
    default:
      return 0;
  }
}

export function getAvailableInkForSide(
  board: LorcanaProjectedBoardView,
  side: LorcanaPlayerSide,
): number | null {
  const inkwellCardIds = getZoneCardIds(board, side, "inkwell");
  if (inkwellCardIds.length === 0) {
    return 0;
  }

  let availableInk = 0;

  for (const cardId of inkwellCardIds) {
    const projectedCard = board.cards[cardId];
    if (!projectedCard || projectedCard.hidden) {
      return null;
    }

    if (!projectedCard.exerted) {
      availableInk += 1;
    }
  }

  return availableInk;
}

export function isZoneMasked(
  board: LorcanaProjectedBoardView,
  side: LorcanaPlayerSide,
  zoneId: LorcanaZoneId,
): boolean {
  if (zoneId === "deck") {
    return getZoneCardCount(board, side, zoneId) > 0;
  }

  if (zoneId === "hand") {
    const visibleCards = getZoneCardIds(board, side, zoneId)
      .map((cardId) => board.cards[cardId])
      .filter((card): card is LorcanaProjectedCard => Boolean(card));
    return (
      getZoneCardCount(board, side, zoneId) > visibleCards.length ||
      visibleCards.some((card) => card.hidden === true)
    );
  }

  return false;
}
