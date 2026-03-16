import type {
  CardInstanceId,
  EngineActiveEffectProjection,
  EnginePendingEffectProjection,
  PlayerId,
} from "#core";

// Not present here means not having that keyword modified, and should use the value present in the CardDefinition
export type ProjectedKeywordValues = Partial<{
  challenger: number;
  resist: number;
}>;

// Not present means everything is default/empty
// prefer naming convention that favors defaulting to undefined, to save network bandwidth
export type ProjectedLorcanaCardDerived = Partial<{
  exerted: boolean;
  drying: boolean;
  damage: number;
  canBePutInInkwell: boolean;
  hasSupport: boolean;
  hasReckless: boolean;
  hasRush: boolean;
  hasEvasive: boolean;
  hasQuestRestriction: boolean;
  classifications: string[];
  fullName: string;
  keywords: string[];
  keywordValues: ProjectedKeywordValues;
  temporaryAbilities: Record<string, number>;
  temporaryAbilityStarts: Record<string, number>;
  temporaryRestrictions: Record<string, number>;
  temporaryRestrictionStarts: Record<string, number>;

  // Not present here means using the value present in the CardDefinition
  strength: number;
  willpower: number;
  lore: number;
  moveCost: number;
  playCost: number;

  // Methods for accessing derived values (for test compatibility)
  getStrength: () => number;
  getWillpower: () => number;
}>;

export type LorcanaBoardZoneId = "deck" | "hand" | "play" | "inkwell" | "discard" | "limbo";

export type LorcanaProjectedCard = {
  id: CardInstanceId | string;
  ownerId: PlayerId;
  controllerId?: PlayerId;
  zone: LorcanaBoardZoneId;
  zoneIndex?: number;
  hidden?: boolean;
  definitionId?: string;
  atLocationId?: CardInstanceId;
  cardsUnder?: CardInstanceId[];
  stackParentId?: CardInstanceId;
} & ProjectedLorcanaCardDerived;

export type LorcanaProjectedCardId = CardInstanceId | string;

export type LorcanaProjectedPlayerBoard = {
  lore: number;
  // TODO: We need a player wide flag that tell whether the player can put a card in inkwell or not
  // canAddCardToInkwell: boolean;
  handCount: number;
  deckCount: number;
  deckTop?: LorcanaProjectedCardId;
  hand: LorcanaProjectedCardId[];
  play: LorcanaProjectedCardId[];
  inkwell: LorcanaProjectedCardId[];
  discard: LorcanaProjectedCardId[];
};

export type LorcanaProjectedTimerPlayer = {
  timeRemaining: number;
  timerTicking: boolean;
  canDeclareVictory: boolean;
  canClaimAfkVictory: boolean;
  canClaimPreGameVictory: boolean;
  lastGameActionAt: number;
};

export type LorcanaProjectedTimerView = {
  serverTimestamp: number;
  players?: Record<string, LorcanaProjectedTimerPlayer>;
};

export type LorcanaProjectedBagEffect = {
  id: string;
  type: string;
  controllerId: PlayerId;
  chooserId: PlayerId;
  sourceId?: string;
  payload: unknown;
};

export type LorcanaProjectedPendingChoice = {
  type: string;
  playerID: PlayerId;
  requestID: string;
};

export type LorcanaProjectedBoardView = {
  gameID: string;
  matchID: string;
  stateID: number;
  playerOrder: PlayerId[];
  turnPlayer: PlayerId | null;
  priorityPlayer: PlayerId | null;
  turnNumber: number;
  phase?: string;
  gameSegment?: string;
  step?: string | null;
  openingTurnPlayer?: PlayerId | null;
  pendingMulligan: PlayerId[];
  choosingFirstPlayer?: PlayerId | null;
  status: "playing" | "finished";
  winner: PlayerId | string | null;
  reason: string | null;
  timerView: LorcanaProjectedTimerView;
  players: Record<string, LorcanaProjectedPlayerBoard>;
  cards: Record<string, LorcanaProjectedCard>;
  activeEffects: EngineActiveEffectProjection[];
  pendingEffects: EnginePendingEffectProjection[];
  pendingChoice?: LorcanaProjectedPendingChoice;
  bagEffects: LorcanaProjectedBagEffect[];
  temporaryPlayerRestrictions?: Record<string, Record<string, number>>;
};
