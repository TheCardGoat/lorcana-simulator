import type { CardInstanceId, PlayerId } from "#core";
import type {
  AmountExpr,
  CardFilter,
  LorcanaTargetDSL,
  ScryCardOrdering,
} from "@tcg/lorcana-types";

export type ResolutionSelectionZone = "deck" | "hand" | "play" | "discard" | "inkwell" | "limbo";

export type ResolutionSelectionOrigin = "pending-effect" | "bag";

export type ResolutionSelectionKind =
  | "discard-choice"
  | "choice-selection"
  | "name-card-selection"
  | "optional-selection"
  | "scry-selection"
  | "target-selection";

export type ResolutionSelectionSubmitField =
  | "targets"
  | "choiceIndex"
  | "resolveOptional"
  | "namedCard"
  | "destinations";

export type ResolutionSelectionDestination = {
  zone: string;
  cards: CardInstanceId[];
};

export type ResolutionSelectionRevealedCard = {
  cardId: CardInstanceId;
  label: string;
  cardType?: "character" | "action" | "item" | "location";
  actionSubtype?: string;
  cost?: number;
  classifications?: string[];
};

export type ResolutionSelectionCurrentSelection = Partial<{
  targets: Array<CardInstanceId | PlayerId>;
  amount: number;
  choiceIndex: number;
  resolveOptional: boolean;
  namedCard: string;
  destinations: ResolutionSelectionDestination[];
}>;

type ResolutionSelectionContextBase = {
  origin: ResolutionSelectionOrigin;
  requestId: string;
  kind: ResolutionSelectionKind;
  sourceCardId: CardInstanceId;
  chooserId: PlayerId;
  currentSelection: ResolutionSelectionCurrentSelection;
  submitField: ResolutionSelectionSubmitField;
};

export type ResolutionSelectionOption = {
  index: number;
  label: string;
  legal: boolean;
};

export type ResolutionSelectionDestinationRule = {
  id: string;
  zone: string;
  min: number;
  max: number | null;
  remainder: boolean;
  label?: string;
  filters?: readonly CardFilter[];
  playFilters?: readonly CardFilter[];
  ordering?: ScryCardOrdering;
  reveal?: boolean;
  exclusiveGroup?: string;
  cost?: "free" | "reduced";
  reducedBy?: AmountExpr;
  entersExerted?: boolean;
  grantsRush?: boolean;
  banishAtEndOfTurn?: boolean;
  exerted?: boolean;
  facedown?: boolean;
};

export type TargetResolutionSelectionContext = ResolutionSelectionContextBase & {
  kind: "target-selection" | "discard-choice";
  submitField: "targets";
  originatesFromOptional?: boolean;
  canDeclineSelection?: boolean;
  targetDsl: LorcanaTargetDSL[];
  cardCandidateIds: CardInstanceId[];
  playerCandidateIds: PlayerId[];
  allowedZones: ResolutionSelectionZone[];
  minSelections: number;
  maxSelections: number;
  ordered: boolean;
  autoRejected: boolean;
};

export type ChoiceResolutionSelectionContext = ResolutionSelectionContextBase & {
  kind: "choice-selection";
  submitField: "choiceIndex";
  options: ResolutionSelectionOption[];
};

export type OptionalResolutionSelectionContext = ResolutionSelectionContextBase & {
  kind: "optional-selection";
  submitField: "resolveOptional";
  acceptLabel: string;
  rejectLabel: string;
};

export type NameCardResolutionSelectionContext = ResolutionSelectionContextBase & {
  kind: "name-card-selection";
  submitField: "namedCard";
  searchMode: "lorcana-catalog";
};

export type ScryResolutionSelectionContext = ResolutionSelectionContextBase & {
  kind: "scry-selection";
  submitField: "destinations";
  amount: number;
  revealedCardIds: CardInstanceId[];
  revealedCards: ResolutionSelectionRevealedCard[];
  destinationRules: ResolutionSelectionDestinationRule[];
};

export type ResolutionSelectionContext =
  | ChoiceResolutionSelectionContext
  | NameCardResolutionSelectionContext
  | OptionalResolutionSelectionContext
  | ScryResolutionSelectionContext
  | TargetResolutionSelectionContext;
