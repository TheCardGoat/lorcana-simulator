import type { LorcanaProjectedBoardView } from "@tcg/lorcana-engine";
import type {
  LorcanaPlayerSide,
  MoveLogEntrySnapshot,
} from "@/features/simulator/model/contracts.js";

export type PostGameViewerResult = "victory" | "defeat" | "spectator" | "unknown";
export type PostGameSectionId = "overview" | "forensics" | "notes";
export type PostGameActorTone = "self" | "opponent" | "playerOne" | "playerTwo" | "system";

export interface PostGameActionCounters {
  cardsPlayed: number;
  inked: number;
  quests: number;
  challengeInitiations: number;
  movesToLocations: number;
  abilityActivations: number;
  effectResolutions: number;
  passes: number;
  concedes: number;
}

export interface PostGamePlayerBoardSummary {
  side: LorcanaPlayerSide;
  lore: number;
  deckCount: number;
  handCount: number;
  discardCount: number;
  inkwellCount: number;
  availableInk: number | null;
  boardCount: number;
  readyCount: number;
  exertedCount: number;
}

export interface PostGameOutcomeSummary {
  winnerSide: LorcanaPlayerSide | null;
  loserSide: LorcanaPlayerSide | null;
  reason: string | null;
  finalTurnNumber: number;
  viewerSide: LorcanaPlayerSide | null;
  viewerResult: PostGameViewerResult;
}

export interface PostGameSpotlightCard {
  id: string;
  cardId: string;
  label: string;
  ownerSide: LorcanaPlayerSide | null;
  value: number;
  detail: string;
}

export interface PostGameSpotlightAbility {
  id: string;
  label: string;
  cardId: string | null;
  cardLabel: string | null;
  ownerSide: LorcanaPlayerSide | null;
  count: number;
}

export interface PostGameHighlight {
  id: string;
  title: string;
  detail: string;
  emphasis?: boolean;
  turnNumber?: number;
  actorSide?: LorcanaPlayerSide | null;
}

export interface PostGameTypedMessageSummary {
  key: string;
  text: string;
}

export interface PostGameForensicCardReference {
  cardId: string;
  label: string;
  ownerSide: LorcanaPlayerSide | null;
}

export interface PostGameForensicEntry {
  id: string;
  turnNumber: number;
  timestamp: number;
  moveId: MoveLogEntrySnapshot["moveId"];
  actorSide: LorcanaPlayerSide | null;
  actorTone: PostGameActorTone;
  text: string;
  source: "typed" | "fallback";
  typedMessages: PostGameTypedMessageSummary[];
  cardReferences: PostGameForensicCardReference[];
}

export interface PostGameSummary {
  board: LorcanaProjectedBoardView;
  outcome: PostGameOutcomeSummary;
  players: Record<LorcanaPlayerSide, PostGamePlayerBoardSummary>;
  countersBySide: Record<LorcanaPlayerSide, PostGameActionCounters>;
  topLoreContributors: PostGameSpotlightCard[];
  mostPlayedCards: PostGameSpotlightCard[];
  mostInvolvedChallengeCards: PostGameSpotlightCard[];
  mostTriggeredAbilities: PostGameSpotlightAbility[];
  highlights: PostGameHighlight[];
  forensics: PostGameForensicEntry[];
  totalLogEntries: number;
}

export interface PostGameNoteState {
  value: string;
  lastSavedValue: string;
  isLoading: boolean;
  isSaving: boolean;
  loaded: boolean;
  error: string | null;
}
