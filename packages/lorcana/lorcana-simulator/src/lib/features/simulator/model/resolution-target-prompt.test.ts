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
  buildSlottedTargetsFromSelection,
  getResolutionTargetPromptMessage,
  isSupportedResolutionTargetEffectType,
} from "./resolution-target-prompt.js";

function createCard(
  cardId: string,
  label: string,
  cardType: "character" | "location" | "action" | "item",
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

  it("builds a single deal-damage slot for triggered abilities like Watch the Teeth", () => {
    const opponentChar = createCard("opp-char", "Attacker", "character");
    opponentChar.ownerId = "p2";
    opponentChar.ownerSide = "playerTwo";
    const context = createContext({
      cardCandidateIds: [asCardId(opponentChar.cardId)],
      maxSelections: 1,
      targetDsl: [
        { owner: "opponent", selector: "chosen", zones: ["play"], cardTypes: ["character"] },
      ],
    });

    const prompt = buildResolutionTargetPromptState({
      effectType: "deal-damage",
      context,
      entries: [createEntry(opponentChar.cardId, opponentChar.label)],
      selectedTargets: [],
      cardSnapshotsById: {
        [opponentChar.cardId]: opponentChar,
      },
    });

    expect(prompt?.slots.map((slot) => slot.label)).toEqual(["Deal damage to"]);
    expect(prompt?.activeSlotIndex).toBe(0);
    expect(prompt?.candidateEntries.map((entry) => entry.cardId)).toEqual([opponentChar.cardId]);
    expect(getResolutionTargetPromptMessage("deal-damage", 0)).toBe(
      "Choose the character to deal damage to.",
    );
  });

  it("auto-populates and locks the from slot when source is self-resolved (maxSelections=1)", () => {
    // Simulates Madam Mim - Elephant's SNEAKY MOVE: from is { ref: "self" } (auto-resolved),
    // so the engine sets maxSelections=1. The prompt should lock slot 0 with the source card
    // and only let the user pick the destination in slot 1.
    const sourceCard = createCard("mim-card", "Madam Mim - Elephant", "character");
    sourceCard.ownerId = "p2";
    sourceCard.ownerSide = "playerTwo";
    const opponentChar = createCard("opp-char", "Goofy", "character");
    opponentChar.ownerId = "p1";
    opponentChar.ownerSide = "playerOne";

    const context = createContext({
      sourceCardId: asCardId(sourceCard.cardId),
      chooserId: asPlayerId("p2"),
      cardCandidateIds: [asCardId(opponentChar.cardId)],
      maxSelections: 1,
      minSelections: 1,
      targetDsl: [
        { owner: "opponent", selector: "chosen", zones: ["play"], cardTypes: ["character"] },
      ],
    });

    const prompt = buildResolutionTargetPromptState({
      effectType: "move-damage",
      context,
      entries: [
        createEntry(sourceCard.cardId, sourceCard.label),
        createEntry(opponentChar.cardId, opponentChar.label),
      ],
      selectedTargets: [],
      cardSnapshotsById: {
        [sourceCard.cardId]: sourceCard,
        [opponentChar.cardId]: opponentChar,
      },
    });

    // Slot 0 (from) should be locked and auto-filled with the source card
    expect(prompt?.slots[0]).toMatchObject({
      targetId: sourceCard.cardId,
      locked: true,
    });
    // Slot 1 (to) should be the active slot
    expect(prompt?.activeSlotIndex).toBe(1);
    // Only the opponent character should be a candidate for slot 1
    expect(prompt?.candidateEntries.map((entry) => entry.cardId)).toEqual([opponentChar.cardId]);
    expect(getResolutionTargetPromptMessage("move-damage", 1)).toBe(
      "Choose the character to move damage to.",
    );
  });

  it("exposes autoResolvedFromSlots so callers can compute the raw session storage index", () => {
    // Regression: when from=self, prompt.activeSlotIndex is the visual index (1) but
    // session.selectedTargets is stored without the auto-resolved slot. The caller must
    // use (activeSlotIndex - autoResolvedFromSlots) as the raw write index, otherwise
    // the destination target lands at index 1 of selectedTargets and on the next render
    // buildResolutionTargetPromptState prepends sourceCardId again, pushing the target
    // to index 2 where it is ignored by buildSlotStates.
    const sourceCard = createCard("mim-card", "Madam Mim - Elephant", "character");
    const toCard = createCard("chief-tui", "Chief Tui", "character");

    const context = createContext({
      sourceCardId: asCardId(sourceCard.cardId),
      cardCandidateIds: [asCardId(toCard.cardId)],
      maxSelections: 1,
      minSelections: 1,
    });

    const buildPrompt = (selectedTargets: string[]) =>
      buildResolutionTargetPromptState({
        effectType: "move-damage",
        context,
        entries: [createEntry(toCard.cardId, toCard.label)],
        selectedTargets,
        cardSnapshotsById: { [sourceCard.cardId]: sourceCard, [toCard.cardId]: toCard },
      });

    const initial = buildPrompt([]);
    expect(initial?.autoResolvedFromSlots).toBe(1);
    expect(initial?.activeSlotIndex).toBe(1);

    // Simulate what assignResolutionTargetSelection does after the fix:
    // rawSlotIndex = activeSlotIndex - autoResolvedFromSlots = 1 - 1 = 0
    const rawIndex = initial!.activeSlotIndex! - initial!.autoResolvedFromSlots;
    const nextSelectedTargets: string[] = [];
    nextSelectedTargets[rawIndex] = toCard.cardId;

    const after = buildPrompt(nextSelectedTargets);
    expect(after?.slots[1]?.targetId).toBe(toCard.cardId);
    expect(after?.slots[1]?.locked).toBe(false);
    // The active slot is still slot 1 (last editable), so its candidates remain shown for editing
    expect(after?.activeSlotIndex).toBe(1);
  });

  it("filters the destination slot by targetDsl owner=opponent (Cheshire Cat regression)", () => {
    // Regression: Cheshire Cat — move-damage destination must exclude friendly cards
    // when the effect's target DSL says owner: "opponent". Bug fixed in a073dbbc3.
    const source = createCard("source-char", "Source", "character");
    source.ownerId = "p1";
    source.ownerSide = "playerOne";
    const friendlyDest = createCard("friendly-dest", "Friendly", "character");
    friendlyDest.ownerId = "p1";
    friendlyDest.ownerSide = "playerOne";
    const opponentDest = createCard("opponent-dest", "Opponent", "character");
    opponentDest.ownerId = "p2";
    opponentDest.ownerSide = "playerTwo";

    const context = createContext({
      chooserId: asPlayerId("p1"),
      cardCandidateIds: [
        asCardId(source.cardId),
        asCardId(friendlyDest.cardId),
        asCardId(opponentDest.cardId),
      ],
      targetDsl: [
        { selector: "chosen", zones: ["play"], cardTypes: ["character"] },
        { owner: "opponent", selector: "chosen", zones: ["play"], cardTypes: ["character"] },
      ],
    });

    const prompt = buildResolutionTargetPromptState({
      effectType: "move-damage",
      context,
      entries: [
        createEntry(source.cardId, source.label),
        createEntry(friendlyDest.cardId, friendlyDest.label),
        createEntry(opponentDest.cardId, opponentDest.label),
      ],
      selectedTargets: [source.cardId],
      cardSnapshotsById: {
        [source.cardId]: source,
        [friendlyDest.cardId]: friendlyDest,
        [opponentDest.cardId]: opponentDest,
      },
    });

    // Slot 1 (destination) should honor the owner filter — only opponent card.
    expect(prompt?.activeSlotIndex).toBe(1);
    expect(prompt?.candidateEntries.map((entry) => entry.cardId)).toEqual([opponentDest.cardId]);
  });

  it("shifts the targetDsl index by autoResolvedFromSlots when source is self-resolved", () => {
    // When from=self auto-locks slot 0, the caller supplies targetDsl describing
    // only the user-selectable slots. The prompt builder must left-pad the DSL so
    // slot 1's owner filter reads from targetDsl[1] after adjustment.
    const sourceCard = createCard("self-src", "Self", "character");
    sourceCard.ownerId = "p1";
    sourceCard.ownerSide = "playerOne";
    const friendly = createCard("friendly", "Friendly Dest", "character");
    friendly.ownerId = "p1";
    friendly.ownerSide = "playerOne";
    const opponent = createCard("opp", "Opponent Dest", "character");
    opponent.ownerId = "p2";
    opponent.ownerSide = "playerTwo";

    const context = createContext({
      sourceCardId: asCardId(sourceCard.cardId),
      chooserId: asPlayerId("p1"),
      cardCandidateIds: [asCardId(friendly.cardId), asCardId(opponent.cardId)],
      maxSelections: 1,
      minSelections: 1,
      // Caller supplies only the user-selectable slot's DSL (destination only).
      targetDsl: [
        { owner: "opponent", selector: "chosen", zones: ["play"], cardTypes: ["character"] },
      ],
    });

    const prompt = buildResolutionTargetPromptState({
      effectType: "move-damage",
      context,
      entries: [
        createEntry(friendly.cardId, friendly.label),
        createEntry(opponent.cardId, opponent.label),
      ],
      selectedTargets: [],
      cardSnapshotsById: {
        [sourceCard.cardId]: sourceCard,
        [friendly.cardId]: friendly,
        [opponent.cardId]: opponent,
      },
    });

    expect(prompt?.autoResolvedFromSlots).toBe(1);
    expect(prompt?.activeSlotIndex).toBe(1);
    expect(prompt?.candidateEntries.map((entry) => entry.cardId)).toEqual([opponent.cardId]);
  });

  it("filters move-to-location slots by cardType — characters for slot 0, locations for slot 1", () => {
    const character = createCard("char", "Mulan", "character");
    const action = createCard("action", "Strength of a Raging Fire", "action");
    const location = createCard("loc", "Rapunzel's Tower", "location");

    const context = createContext({
      cardCandidateIds: [
        asCardId(character.cardId),
        asCardId(action.cardId),
        asCardId(location.cardId),
      ],
    });

    // Active on slot 0 (character slot).
    const promptSlot0 = buildResolutionTargetPromptState({
      effectType: "move-to-location",
      context,
      entries: [
        createEntry(character.cardId, character.label),
        createEntry(action.cardId, action.label),
        createEntry(location.cardId, location.label),
      ],
      selectedTargets: [],
      cardSnapshotsById: {
        [character.cardId]: character,
        [action.cardId]: action,
        [location.cardId]: location,
      },
    });
    expect(promptSlot0?.activeSlotIndex).toBe(0);
    expect(promptSlot0?.candidateEntries.map((e) => e.cardId)).toEqual([character.cardId]);

    // After picking the character, active moves to slot 1 — only the location survives.
    const promptSlot1 = buildResolutionTargetPromptState({
      effectType: "move-to-location",
      context,
      entries: [
        createEntry(character.cardId, character.label),
        createEntry(action.cardId, action.label),
        createEntry(location.cardId, location.label),
      ],
      selectedTargets: [character.cardId],
      cardSnapshotsById: {
        [character.cardId]: character,
        [action.cardId]: action,
        [location.cardId]: location,
      },
    });
    expect(promptSlot1?.activeSlotIndex).toBe(1);
    expect(promptSlot1?.candidateEntries.map((e) => e.cardId)).toEqual([location.cardId]);
  });

  it("returns null when the context has player-level candidates (player picker path)", () => {
    const character = createCard("char", "Someone", "character");
    const context = createContext({
      playerCandidateIds: [asPlayerId("p2")],
      cardCandidateIds: [asCardId(character.cardId)],
    });

    const prompt = buildResolutionTargetPromptState({
      effectType: "deal-damage",
      context,
      entries: [createEntry(character.cardId, character.label)],
      selectedTargets: [],
      cardSnapshotsById: { [character.cardId]: character },
    });

    expect(prompt).toBeNull();
  });

  it("returns null when effectType is null", () => {
    const character = createCard("char", "Someone", "character");
    const context = createContext({ cardCandidateIds: [asCardId(character.cardId)] });

    const prompt = buildResolutionTargetPromptState({
      effectType: null,
      context,
      entries: [createEntry(character.cardId, character.label)],
      selectedTargets: [],
      cardSnapshotsById: { [character.cardId]: character },
    });

    expect(prompt).toBeNull();
  });

  it("honors preferredActiveSlotIndex when the slot is editable", () => {
    const fromCard = createCard("from-char", "From", "character");
    const toCard = createCard("to-char", "To", "character");
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
      preferredActiveSlotIndex: 1,
    });

    expect(prompt?.activeSlotIndex).toBe(1);
  });

  it("ignores preferredActiveSlotIndex when the slot is locked (falls back to default)", () => {
    const sourceCard = createCard("self-src", "Self", "character");
    const opponent = createCard("opp", "Opponent", "character");
    opponent.ownerId = "p2";
    opponent.ownerSide = "playerTwo";

    // from=self → slot 0 locked. Preferring it should be ignored.
    const context = createContext({
      sourceCardId: asCardId(sourceCard.cardId),
      cardCandidateIds: [asCardId(opponent.cardId)],
      maxSelections: 1,
      minSelections: 1,
    });

    const prompt = buildResolutionTargetPromptState({
      effectType: "move-damage",
      context,
      entries: [createEntry(opponent.cardId, opponent.label)],
      selectedTargets: [],
      cardSnapshotsById: {
        [sourceCard.cardId]: sourceCard,
        [opponent.cardId]: opponent,
      },
      preferredActiveSlotIndex: 0,
    });

    expect(prompt?.slots[0]?.locked).toBe(true);
    // Default picks the only editable slot (index 1).
    expect(prompt?.activeSlotIndex).toBe(1);
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

describe("buildSlottedTargetsFromSelection", () => {
  it("packs move-damage selections into from/to slots", () => {
    expect(buildSlottedTargetsFromSelection("move-damage", ["card-a", "card-b"])).toEqual({
      kind: "move-damage",
      from: [asCardId("card-a")],
      to: [asCardId("card-b")],
    });
  });

  it("packs move-to-location selections into subject/location slots", () => {
    expect(buildSlottedTargetsFromSelection("move-to-location", ["char-1", "loc-1"])).toEqual({
      kind: "move-to-location",
      subject: [asCardId("char-1")],
      location: [asCardId("loc-1")],
    });
  });

  it("emits empty slot arrays when a slot index is missing from the flat selection", () => {
    expect(buildSlottedTargetsFromSelection("move-damage", ["only-source"])).toEqual({
      kind: "move-damage",
      from: [asCardId("only-source")],
      to: [],
    });
  });

  it("throws for kinds that have no UI prompt wired yet", () => {
    expect(() => buildSlottedTargetsFromSelection("shift-and-choose", [])).toThrow(
      /not wired to a UI prompt/,
    );
    expect(() => buildSlottedTargetsFromSelection("banish-and-play", [])).toThrow(
      /not wired to a UI prompt/,
    );
  });
});

describe("isSupportedResolutionTargetEffectType", () => {
  it("returns true for the three UI-wired effect types", () => {
    expect(isSupportedResolutionTargetEffectType("move-damage")).toBe(true);
    expect(isSupportedResolutionTargetEffectType("move-to-location")).toBe(true);
    expect(isSupportedResolutionTargetEffectType("deal-damage")).toBe(true);
  });

  it("returns false for unknown, null, undefined, and empty strings", () => {
    expect(isSupportedResolutionTargetEffectType("shift-and-choose")).toBe(false);
    expect(isSupportedResolutionTargetEffectType("banish-and-play")).toBe(false);
    expect(isSupportedResolutionTargetEffectType("quest")).toBe(false);
    expect(isSupportedResolutionTargetEffectType("")).toBe(false);
    expect(isSupportedResolutionTargetEffectType(null)).toBe(false);
    expect(isSupportedResolutionTargetEffectType(undefined)).toBe(false);
  });
});

describe("getResolutionTargetPromptMessage", () => {
  it("returns copy for every supported (effectType, slotIndex) pair", () => {
    expect(getResolutionTargetPromptMessage("move-damage", 0)).toBe(
      "Choose the character to move damage from.",
    );
    expect(getResolutionTargetPromptMessage("move-damage", 1)).toBe(
      "Choose the character to move damage to.",
    );
    expect(getResolutionTargetPromptMessage("move-to-location", 0)).toBe(
      "Choose the character to move.",
    );
    expect(getResolutionTargetPromptMessage("move-to-location", 1)).toBe(
      "Choose the location to move to.",
    );
    expect(getResolutionTargetPromptMessage("deal-damage", 0)).toBe(
      "Choose the character to deal damage to.",
    );
  });

  it("returns null for unsupported combinations and null effect types", () => {
    expect(getResolutionTargetPromptMessage("move-damage", 2)).toBeNull();
    // deal-damage now supports multi-slot prompts (e.g. Mob Song upTo:3), so
    // any numeric slot index is valid.
    expect(getResolutionTargetPromptMessage("deal-damage", 1)).toBe(
      "Choose the character to deal damage to.",
    );
    expect(getResolutionTargetPromptMessage(null, 0)).toBeNull();
    expect(getResolutionTargetPromptMessage("move-to-location", null)).toBeNull();
  });
});
