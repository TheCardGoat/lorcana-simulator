import { describe, expect, it } from "bun:test";
import type {
  CardInstanceId,
  PlayerId,
  TargetResolutionSelectionContext,
} from "@tcg/lorcana-engine";

import type {
  AvailableMovesSelectionEntry,
  LorcanaCardSnapshot,
} from "@/features/simulator/model/contracts.js";
import {
  buildResolutionTargetPromptState,
  getResolutionTargetPromptMessage,
} from "./resolution-target-prompt.js";

function createCard(
  cardId: string,
  label: string,
  cardType: "character" | "location",
): LorcanaCardSnapshot {
  return {
    cardId,
    definitionId: `${cardId}-def`,
    isMasked: false,
    label,
    ownerId: "p1",
    ownerSide: "playerOne",
    zoneId: "play",
    cardType,
    facePresentation: "faceUp",
  };
}

function asCardId(value: string): CardInstanceId {
  return value as CardInstanceId;
}

function asPlayerId(value: string): PlayerId {
  return value as PlayerId;
}

function createContext(
  overrides: Partial<TargetResolutionSelectionContext>,
): TargetResolutionSelectionContext {
  return {
    origin: "pending-effect",
    requestId: "pending-1",
    kind: "target-selection",
    sourceCardId: asCardId("source-card"),
    chooserId: asPlayerId("p1"),
    currentSelection: {},
    submitField: "targets",
    targetDsl: [],
    cardCandidateIds: [],
    playerCandidateIds: [],
    allowedZones: ["play"],
    minSelections: 1,
    maxSelections: 2,
    ordered: false,
    autoRejected: false,
    ...overrides,
  };
}

function createEntry(cardId: string, label: string): AvailableMovesSelectionEntry {
  return {
    id: `resolution:card:${cardId}`,
    kind: "card",
    cardId,
    label,
    selected: false,
  };
}

describe("resolution target prompt helpers", () => {
  it("builds ordered move-damage slots from and to", () => {
    const fromCard = createCard("from-char", "Maui", "character");
    const toCard = createCard("to-char", "Stitch", "character");
    const context = createContext({
      cardCandidateIds: [asCardId(fromCard.cardId), asCardId(toCard.cardId)],
    });

    const prompt = buildResolutionTargetPromptState({
      effectType: "move-damage",
      context,
      entries: [
        createEntry(fromCard.cardId, fromCard.label),
        createEntry(toCard.cardId, toCard.label),
      ],
      selectedTargets: [],
      cardSnapshotsById: {
        [fromCard.cardId]: fromCard,
        [toCard.cardId]: toCard,
      },
    });

    expect(prompt?.slots.map((slot) => slot.label)).toEqual(["Move damage from", "Move damage to"]);
    expect(prompt?.activeSlotIndex).toBe(0);
    expect(prompt?.candidateEntries.map((entry) => entry.cardId)).toEqual([
      fromCard.cardId,
      toCard.cardId,
    ]);
    expect(getResolutionTargetPromptMessage("move-damage", 0)).toBe(
      "Choose the character to move damage from.",
    );
  });

  it("advances move-damage to the destination slot and excludes the chosen source", () => {
    const fromCard = createCard("from-char", "Maui", "character");
    const toCard = createCard("to-char", "Stitch", "character");
    const context = createContext({
      cardCandidateIds: [asCardId(fromCard.cardId), asCardId(toCard.cardId)],
    });

    const prompt = buildResolutionTargetPromptState({
      effectType: "move-damage",
      context,
      entries: [
        createEntry(fromCard.cardId, fromCard.label),
        createEntry(toCard.cardId, toCard.label),
      ],
      selectedTargets: [fromCard.cardId],
      cardSnapshotsById: {
        [fromCard.cardId]: fromCard,
        [toCard.cardId]: toCard,
      },
    });

    expect(prompt?.activeSlotIndex).toBe(1);
    expect(prompt?.candidateEntries.map((entry) => entry.cardId)).toEqual([toCard.cardId]);
  });

  it("builds move-to-location slots and locks preselected character targets", () => {
    const character = createCard("moana", "Moana", "character");
    const location = createCard("rapunzels-tower", "Rapunzel's Tower", "location");
    const context = createContext({
      cardCandidateIds: [asCardId(location.cardId)],
      currentSelection: { targets: [asCardId(character.cardId)] },
    });

    const prompt = buildResolutionTargetPromptState({
      effectType: "move-to-location",
      context,
      entries: [createEntry(location.cardId, location.label)],
      selectedTargets: [character.cardId],
      cardSnapshotsById: {
        [character.cardId]: character,
        [location.cardId]: location,
      },
    });

    expect(prompt?.slots.map((slot) => slot.label)).toEqual([
      "Character to move",
      "Move to location",
    ]);
    expect(prompt?.slots[0]).toMatchObject({
      targetId: character.cardId,
      targetLabel: character.label,
      locked: true,
    });
    expect(prompt?.activeSlotIndex).toBe(1);
    expect(prompt?.candidateEntries.map((entry) => entry.cardId)).toEqual([location.cardId]);
    expect(getResolutionTargetPromptMessage("move-to-location", 1)).toBe(
      "Choose the location to move to.",
    );
  });

  it("preserves locked preselected cards even when they are no longer in the candidate list", () => {
    const character = createCard("locked-char", "Locked Character", "character");
    const location = createCard("target-location", "Target Location", "location");
    const context = createContext({
      cardCandidateIds: [asCardId(location.cardId)],
      currentSelection: { targets: [asCardId(character.cardId)] },
    });

    const prompt = buildResolutionTargetPromptState({
      effectType: "move-to-location",
      context,
      entries: [createEntry(location.cardId, location.label)],
      selectedTargets: [character.cardId],
      cardSnapshotsById: {
        [character.cardId]: character,
        [location.cardId]: location,
      },
    });

    expect(prompt?.slots[0]?.targetCardId).toBe(character.cardId);
    expect(prompt?.slots[0]?.locked).toBe(true);
  });
});
