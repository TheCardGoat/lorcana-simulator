import { describe, expect, it } from "bun:test";
import { render } from "svelte/server";
import type { CardInstanceId, PlayerId } from "@tcg/lorcana-engine";
import type { PlayerInteractionView } from "@tcg/lorcana-interaction";
import type { LorcanaCardSnapshot } from "@/features/simulator/model/contracts.js";
import ChoiceResolutionOverlay from "./ChoiceResolutionOverlay.svelte";

const PLAYER_ONE = "player_one" as PlayerId;
const EDUCATION_OR_ELIMINATION_INSTANCE = "education-or-elimination-1" as CardInstanceId;

const view: PlayerInteractionView = {
  viewerId: PLAYER_ONE,
  surface: "choice-modal",
  viewerRole: "chooser",
  activePrompt: {
    requestId: "choice-1",
    kind: "choice-selection",
    controllerId: PLAYER_ONE,
    sourceCardId: EDUCATION_OR_ELIMINATION_INSTANCE,
    chooserId: PLAYER_ONE,
    expectedSlottedKind: null,
    activeSlotIndex: null,
    slots: null,
    autoResolvedSlotCount: 0,
    minSelections: 1,
    maxSelections: 1,
    declaredMaxSelections: null,
    autoRejected: false,
    scryDestinations: null,
    scryRevealed: null,
  },
  interactions: [
    {
      kind: "select-choice",
      index: 0,
      label:
        "Draw a card. Chosen character of yours gets +1 {L} and gains Evasive until the start of your next turn.",
      legal: true,
      payload: { choiceIndex: 0 },
    },
    {
      kind: "select-choice",
      index: 1,
      label: "Banish chosen damaged character.",
      legal: true,
      payload: { choiceIndex: 1 },
    },
  ],
  submission: {
    requestId: "choice-1",
    canSubmit: false,
    canCancel: false,
    autoRejected: false,
    submitPayload: null,
    cancelPayload: null,
  },
  copy: {
    titleKey: "prompt.choice.choose-one",
    titleParams: {},
    badges: [],
  },
  promptQueue: [
    {
      requestId: "choice-1",
      kind: "choice-selection",
      chooserId: PLAYER_ONE,
      sourceCardId: EDUCATION_OR_ELIMINATION_INSTANCE,
    },
  ],
  activeQueueIndex: 0,
  rawContext: {
    origin: "pending-effect",
    requestId: "choice-1",
    kind: "choice-selection",
    sourceCardId: EDUCATION_OR_ELIMINATION_INSTANCE,
    chooserId: PLAYER_ONE,
    currentSelection: {},
    submitField: "choiceIndex",
    options: [
      {
        index: 0,
        label:
          "Draw a card. Chosen character of yours gets +1 {L} and gains Evasive until the start of your next turn.",
        legal: true,
      },
      {
        index: 1,
        label: "Banish chosen damaged character.",
        legal: true,
      },
    ],
  },
};

const targetCard: LorcanaCardSnapshot = {
  cardId: EDUCATION_OR_ELIMINATION_INSTANCE,
  definitionId: "y2L",
  isMasked: false,
  label: "Education or Elimination",
  ownerId: "player_one",
  ownerSide: "playerOne",
  zoneId: "limbo",
  cardType: "action",
  actionSubtype: "song",
  cost: 4,
  inkType: ["emerald"],
  inkable: true,
  text: "Choose one:\n* Draw a card. Chosen character of yours gets +1 {L} and gains Evasive until the start of your next turn.\n* Banish chosen damaged character.",
  facePresentation: "faceUp",
};

describe("ChoiceResolutionOverlay", () => {
  it("renders the source card identity, printed text, and choice labels", () => {
    const { body } = render(ChoiceResolutionOverlay, {
      props: {
        view,
        targetCard,
        selectedChoiceIndex: null,
      },
    });

    expect(body).toContain("Education or Elimination");
    expect(body).toContain("Choose one:");
    expect(body).toContain("Draw a card.");
    expect(body).toContain("Banish chosen damaged character.");
  });
});
