import { describe, expect, it } from "bun:test";
import {
  createCardId,
  createInitialTCGCtx,
  createPlayerId,
  type CardInstanceId,
  type MatchState,
  type RuntimeCardWithDefinition,
} from "#core";
import type { LorcanaCard } from "@tcg/lorcana-types";
import { createCardI18n } from "../card-i18n";
import { createMockCharacter } from "../testing";
import { createInitialLorcanaG, type LorcanaCardMeta, type LorcanaG } from "../types";
import { projectLorcanaCardDerived, type ProjectedLorcanaCardDerived } from "./card-derived";
import {
  createRuntimeCardDerivedMethods,
  type LorcanaRuntimeCardDerivedMethods,
} from "../runtime-moves/state/runtime-card-derived-methods";

const PLAYER_ONE = createPlayerId("p1");
const PLAYER_TWO = createPlayerId("p2");
const CARD_ONE = createCardId("c1");
const CARD_TWO = createCardId("c2");
const CARD_THREE = createCardId("c3");
const CARD_FOUR = createCardId("c4");
const CARD_FIVE = createCardId("c5");

/**
 * Mapping from ProjectedLorcanaCardDerived keys to LorcanaRuntimeCardDerivedMethods method names.
 *
 * This mapping defines the expected relationship between projection properties and runtime methods.
 * If you add a new property to ProjectedLorcanaCardDerived, you MUST add the corresponding method
 * to LorcanaRuntimeCardDerivedMethods and update this mapping.
 */
const PROJECTION_TO_METHOD_MAP: Record<keyof ProjectedLorcanaCardDerived, string | null> = {
  // Boolean flags - use has* prefix
  exerted: null, // No corresponding method - used directly from meta
  drying: null, // No corresponding method - used directly from meta
  damage: null, // No corresponding method - used directly from meta
  hasSupport: "hasSupport",
  hasEvasive: null,
  hasReckless: "hasReckless",
  hasRush: "hasRush",
  hasQuestRestriction: "hasQuestRestriction",
  canBePutInInkwell: "canBePutInInkwell",

  // Numeric values - use get* prefix
  strength: null, // Property only - has getStrength method for test compatibility
  willpower: null, // Property only - has getWillpower method for test compatibility
  lore: null, // No corresponding method yet
  moveCost: null, // No corresponding method yet
  playCost: null, // No corresponding method yet

  // Complex values
  fullName: "getFullName",
  keywords: "getKeywords",
  keywordValues: null, // No corresponding method - handled differently
  classifications: null, // No corresponding method - used directly from definition
  temporaryAbilities: null,
  temporaryAbilityStarts: null,
  temporaryRestrictions: null,
  temporaryRestrictionStarts: null,

  // Method accessors (for test compatibility)
  getStrength: null, // Method accessor, not a property
  getWillpower: null, // Method accessor, not a property
};

function buildState(): MatchState<LorcanaG> {
  const ctx = createInitialTCGCtx({
    matchID: "parity-test",
    gameID: "lorcana",
    rulesetHash: "ruleset-parity-test",
  });
  ctx.priority.holder = PLAYER_ONE;
  ctx.status.turn = 1;
  const handZone = `hand:${PLAYER_ONE}`;
  if (!ctx.zones.private.zoneCards[handZone]) {
    ctx.zones.private.zoneCards[handZone] = [];
  }
  ctx.zones.private.zoneCards[handZone] = [CARD_ONE];
  ctx.zones.private.cardIndex[CARD_ONE] = {
    zoneKey: handZone,
    index: 0,
    ownerID: PLAYER_ONE,
    controllerID: PLAYER_ONE,
  };
  return {
    G: createInitialLorcanaG(PLAYER_ONE, PLAYER_TWO),
    ctx,
  };
}

function buildRuntimeCard(
  card: LorcanaCard,
  overrides?: Partial<RuntimeCardWithDefinition<LorcanaCard, LorcanaCardMeta>>,
): RuntimeCardWithDefinition<LorcanaCard, LorcanaCardMeta> {
  return {
    instanceId: CARD_ONE,
    definitionId: card.id,
    definition: card,
    ownerID: PLAYER_ONE,
    controllerID: PLAYER_ONE,
    zoneID: `hand:${PLAYER_ONE}`,
    zoneIndex: 0,
    meta: {},
    ...overrides,
  } satisfies RuntimeCardWithDefinition<LorcanaCard, LorcanaCardMeta>;
}

describe("card-derived parity", () => {
  describe("projection-to-method mapping", () => {
    it("documents all ProjectedLorcanaCardDerived properties", () => {
      const projectionKeys = Object.keys(
        PROJECTION_TO_METHOD_MAP,
      ) as (keyof ProjectedLorcanaCardDerived)[];
      const actualKeys: (keyof ProjectedLorcanaCardDerived)[] = [
        "exerted",
        "drying",
        "damage",
        "canBePutInInkwell",
        "hasSupport",
        "hasEvasive",
        "hasReckless",
        "hasRush",
        "hasQuestRestriction",
        "classifications",
        "fullName",
        "keywords",
        "keywordValues",
        "temporaryAbilities",
        "temporaryAbilityStarts",
        "temporaryRestrictions",
        "temporaryRestrictionStarts",
        "strength",
        "willpower",
        "lore",
        "moveCost",
        "playCost",
        "getStrength",
        "getWillpower",
      ];

      // Check that all actual keys are in the mapping
      for (const key of actualKeys) {
        expect(projectionKeys.includes(key)).toBe(true);
      }

      // Check that mapping doesn't have extra keys
      for (const key of projectionKeys) {
        expect(actualKeys.includes(key)).toBe(true);
      }
    });

    it("has corresponding methods for all mapped properties", () => {
      const dummyMethods: LorcanaRuntimeCardDerivedMethods = {
        canBePutInInkwell: () => false,
        getStrength: () => 0,
        getLore: () => 0,
        getWillpower: () => 0,
        hasSupport: () => false,
        hasReckless: () => false,
        hasRush: () => false,
        hasQuestRestriction: () => false,
        getFullName: () => "",
        getKeywords: () => [],
      };

      const availableMethods = Object.keys(dummyMethods);

      for (const [_projectionKey, methodName] of Object.entries(PROJECTION_TO_METHOD_MAP)) {
        if (methodName === null) {
          // Skip properties that don't have corresponding methods
          continue;
        }

        expect(availableMethods.includes(methodName)).toBe(true);
      }
    });
  });

  describe("value parity", () => {
    it("produces identical values for all mapped properties", () => {
      const card: LorcanaCard = {
        ...createMockCharacter({
          id: "parity-character",
          name: "Parity Character",
          cost: 3,
          strength: 4,
          willpower: 5,
        }),
        version: "Test Version",
        lore: 2,
        abilities: [
          {
            id: "parity-rush",
            type: "keyword",
            keyword: "Rush",
            text: "Rush",
          },
          {
            id: "parity-support",
            type: "keyword",
            keyword: "Support",
            text: "Support",
          },
        ],
      };

      const state = buildState();
      const runtimeCard = buildRuntimeCard(card);

      // Get derived values from projection
      const projected = projectLorcanaCardDerived({
        definition: card,
        meta: runtimeCard.meta,
        state,
        cardInstanceId: CARD_ONE,
        ownerID: PLAYER_ONE,
        controllerID: PLAYER_ONE,
        zoneID: runtimeCard.zoneID,
        actorPlayerId: PLAYER_ONE,
      });

      // Get derived values from runtime methods
      const methods = createRuntimeCardDerivedMethods({
        card: runtimeCard,
        state,
        actorPlayerId: PLAYER_ONE,
      });

      // Verify parity for all mapped properties
      expect(methods.canBePutInInkwell()).toBe(projected.canBePutInInkwell ?? false);
      expect(methods.getStrength()).toBe(projected.strength ?? 0);
      expect(methods.getWillpower()).toBe(projected.willpower ?? 0);
      expect(methods.hasSupport()).toBe(projected.hasSupport ?? false);
      expect(methods.hasReckless()).toBe(projected.hasReckless ?? false);
      expect(methods.hasRush()).toBe(projected.hasRush ?? false);
      expect(methods.hasQuestRestriction()).toBe(projected.hasQuestRestriction ?? false);
      expect(methods.getFullName()).toBe(projected.fullName ?? "");
      expect(methods.getKeywords()).toEqual(projected.keywords ?? []);
    });

    it("produces identical values with temporary effects", () => {
      const card = createMockCharacter({
        id: "temp-effects-character",
        name: "Temp Effects Character",
        cost: 2,
        strength: 3,
        willpower: 4,
      });

      const state = buildState();
      const runtimeCard = buildRuntimeCard(card, {
        meta: {
          temporaryKeywords: {
            Rush: 1,
            Reckless: 1,
          },
          temporaryRestrictions: {
            "cant-quest": 1,
          },
        },
      });

      const projected = projectLorcanaCardDerived({
        definition: card,
        meta: runtimeCard.meta,
        state,
        cardInstanceId: CARD_ONE,
        ownerID: PLAYER_ONE,
        controllerID: PLAYER_ONE,
        zoneID: runtimeCard.zoneID,
        actorPlayerId: PLAYER_ONE,
      });

      const methods = createRuntimeCardDerivedMethods({
        card: runtimeCard,
        state,
        actorPlayerId: PLAYER_ONE,
      });

      expect(methods.hasRush()).toBe(projected.hasRush ?? false);
      expect(methods.hasReckless()).toBe(projected.hasReckless ?? false);
      expect(methods.hasQuestRestriction()).toBe(projected.hasQuestRestriction ?? false);
    });

    it("produces identical values with continuous effect modifiers", () => {
      const card = createMockCharacter({
        id: "modifier-character",
        name: "Modifier Character",
        cost: 2,
        strength: 3,
        willpower: 4,
      });

      const state = buildState();
      const playZone = `play:${PLAYER_ONE}`;
      state.ctx.zones.private.zoneCards[`hand:${PLAYER_ONE}`] = [];
      state.ctx.zones.private.zoneCards[playZone] = [CARD_ONE];
      state.ctx.zones.private.cardIndex[CARD_ONE] = {
        zoneKey: playZone,
        index: 0,
        ownerID: PLAYER_ONE,
        controllerID: PLAYER_ONE,
      };

      // Add continuous effects
      state.G.continuousEffects.instances.push(
        {
          id: "ce_strength",
          kind: "stat-modifier",
          sourceId: createCardId("source1"),
          targetId: CARD_ONE,
          stat: "strength",
          modifier: 2,
          duration: "this-turn",
          createdAtTurn: 1,
          expiresAtTurn: 1,
        },
        {
          id: "ce_willpower",
          kind: "stat-modifier",
          sourceId: createCardId("source2"),
          targetId: CARD_ONE,
          stat: "willpower",
          modifier: -1,
          duration: "this-turn",
          createdAtTurn: 1,
          expiresAtTurn: 1,
        },
      );

      const runtimeCard = buildRuntimeCard(card, { zoneID: playZone });

      const projected = projectLorcanaCardDerived({
        definition: card,
        meta: runtimeCard.meta,
        state,
        cardInstanceId: CARD_ONE,
        ownerID: PLAYER_ONE,
        controllerID: PLAYER_ONE,
        zoneID: playZone,
        actorPlayerId: PLAYER_ONE,
      });

      const methods = createRuntimeCardDerivedMethods({
        card: runtimeCard,
        state,
        actorPlayerId: PLAYER_ONE,
      });

      expect(methods.getStrength()).toBe(projected.strength ?? 0);
      expect(methods.getWillpower()).toBe(projected.willpower ?? 0);

      // Verify specific values
      expect(methods.getStrength()).toBe(5); // 3 + 2
      expect(methods.getWillpower()).toBe(3); // 4 - 1
    });

    it("projects classification-scoped pending cost reductions only for matching hand cards", () => {
      const puppy = createMockCharacter({
        id: "puppy-character",
        name: "Tail Wagger",
        cost: 4,
        classifications: ["Storyborn", "Puppy"],
      });
      const nonPuppy = createMockCharacter({
        id: "non-puppy-character",
        name: "Voice of Reason",
        cost: 4,
        classifications: ["Storyborn", "Ally"],
      });

      const state = buildState();
      state.G.turnMetadata.pendingCostReductionsByPlayer = {
        [PLAYER_ONE]: [
          {
            amount: 2,
            cardType: "character",
            classification: "Puppy",
            consumeOnUse: true,
            expiresAtTurn: 1,
          },
        ],
      };

      const puppyProjection = projectLorcanaCardDerived({
        definition: puppy,
        state,
        cardInstanceId: CARD_ONE,
        ownerID: PLAYER_ONE,
        controllerID: PLAYER_ONE,
        zoneID: `hand:${PLAYER_ONE}`,
        actorPlayerId: PLAYER_ONE,
      });
      const nonPuppyProjection = projectLorcanaCardDerived({
        definition: nonPuppy,
        state,
        cardInstanceId: CARD_ONE,
        ownerID: PLAYER_ONE,
        controllerID: PLAYER_ONE,
        zoneID: `hand:${PLAYER_ONE}`,
        actorPlayerId: PLAYER_ONE,
      });

      expect(puppyProjection.playCost).toBe(2);
      expect(nonPuppyProjection.playCost).toBe(4);
    });

    it("distinguishes hand-active self reductions from in-play static reductions", () => {
      const selfReducer = createMockCharacter({
        id: "self-reducer",
        name: "Self Reducer",
        cost: 2,
        classifications: ["Storyborn", "Ally"],
        abilities: [
          {
            type: "static",
            sourceZones: ["hand"],
            condition: {
              type: "has-named-character",
              controller: "you",
              name: "Gaston",
            },
            effect: {
              type: "cost-reduction",
              amount: 1,
              cardType: "character",
            },
          },
        ],
      });
      const gadgetLike = createMockCharacter({
        id: "gadget-like",
        name: "Gadget Like",
        cost: 6,
        classifications: ["Floodborn", "Inventor"],
        abilities: [
          {
            type: "static",
            condition: {
              type: "has-item-count",
              controller: "you",
              comparison: "greater-or-equal",
              count: 3,
            },
            effect: {
              type: "cost-reduction",
              amount: 1,
              cardType: "character",
              classification: "Inventor",
            },
          },
        ],
      });
      const inventor = createMockCharacter({
        id: "inventor-friend",
        name: "Inventor Friend",
        cost: 4,
        classifications: ["Storyborn", "Inventor"],
      });
      const gaston = createMockCharacter({
        id: "gaston",
        name: "Gaston",
        cost: 3,
      });
      const item: LorcanaCard = {
        id: "test-item",
        canonicalId: "ci_test-item",
        cardType: "item",
        name: "Test Item",
        cost: 1,
        inkType: ["amber"],
        inkable: true,
        set: "TST",
        rarity: "common",
        abilities: [],
        i18n: createCardI18n("Test Item"),
        cardNumber: 1,
      };
      const CARD_SIX = createCardId("c6");
      const CARD_SEVEN = createCardId("c7");

      const state = buildState();
      state.ctx.zones.private.zoneCards[`hand:${PLAYER_ONE}`] = [CARD_ONE, CARD_TWO, CARD_THREE];
      state.ctx.zones.private.cardIndex[CARD_ONE] = {
        zoneKey: `hand:${PLAYER_ONE}`,
        index: 0,
        ownerID: PLAYER_ONE,
        controllerID: PLAYER_ONE,
      };
      state.ctx.zones.private.cardIndex[CARD_TWO] = {
        zoneKey: `hand:${PLAYER_ONE}`,
        index: 1,
        ownerID: PLAYER_ONE,
        controllerID: PLAYER_ONE,
      };
      state.ctx.zones.private.cardIndex[CARD_THREE] = {
        zoneKey: `hand:${PLAYER_ONE}`,
        index: 2,
        ownerID: PLAYER_ONE,
        controllerID: PLAYER_ONE,
      };
      state.ctx.zones.private.zoneCards.play = [CARD_FOUR, CARD_FIVE, CARD_SIX, CARD_SEVEN];
      state.ctx.zones.private.cardIndex[CARD_FOUR] = {
        zoneKey: "play",
        index: 0,
        ownerID: PLAYER_ONE,
        controllerID: PLAYER_ONE,
      };
      state.ctx.zones.private.cardIndex[CARD_FIVE] = {
        zoneKey: "play",
        index: 1,
        ownerID: PLAYER_ONE,
        controllerID: PLAYER_ONE,
      };
      state.ctx.zones.private.cardIndex[CARD_SIX] = {
        zoneKey: "play",
        index: 2,
        ownerID: PLAYER_ONE,
        controllerID: PLAYER_ONE,
      };
      state.ctx.zones.private.cardIndex[CARD_SEVEN] = {
        zoneKey: "play",
        index: 3,
        ownerID: PLAYER_ONE,
        controllerID: PLAYER_ONE,
      };

      const definitions = new Map<string, LorcanaCard>([
        [CARD_ONE, selfReducer],
        [CARD_TWO, gadgetLike],
        [CARD_THREE, inventor],
        [CARD_FOUR, gaston],
        [CARD_FIVE, item],
        [CARD_SIX, item],
        [CARD_SEVEN, item],
      ]);
      const getDefinitionByInstanceId = (instanceId: string) =>
        definitions.get(instanceId as typeof CARD_ONE);

      const selfProjection = projectLorcanaCardDerived({
        definition: selfReducer,
        state,
        cardInstanceId: CARD_ONE,
        ownerID: PLAYER_ONE,
        controllerID: PLAYER_ONE,
        zoneID: `hand:${PLAYER_ONE}`,
        actorPlayerId: PLAYER_ONE,
        getDefinitionByInstanceId,
      });
      const gadgetProjection = projectLorcanaCardDerived({
        definition: gadgetLike,
        state,
        cardInstanceId: CARD_TWO,
        ownerID: PLAYER_ONE,
        controllerID: PLAYER_ONE,
        zoneID: `hand:${PLAYER_ONE}`,
        actorPlayerId: PLAYER_ONE,
        getDefinitionByInstanceId,
      });
      const inventorBefore = projectLorcanaCardDerived({
        definition: inventor,
        state,
        cardInstanceId: CARD_THREE,
        ownerID: PLAYER_ONE,
        controllerID: PLAYER_ONE,
        zoneID: `hand:${PLAYER_ONE}`,
        actorPlayerId: PLAYER_ONE,
        getDefinitionByInstanceId,
      });

      expect(selfProjection.playCost).toBe(1);
      expect(gadgetProjection.playCost).toBe(6);
      expect(inventorBefore.playCost).toBe(4);

      state.ctx.zones.private.zoneCards[`hand:${PLAYER_ONE}`] = [CARD_ONE, CARD_THREE];
      state.ctx.zones.private.zoneCards.play = [
        CARD_TWO,
        CARD_FOUR,
        CARD_FIVE,
        CARD_SIX,
        CARD_SEVEN,
      ];
      state.ctx.zones.private.cardIndex[CARD_TWO] = {
        zoneKey: "play",
        index: 0,
        ownerID: PLAYER_ONE,
        controllerID: PLAYER_ONE,
      };

      const inventorAfter = projectLorcanaCardDerived({
        definition: inventor,
        state,
        cardInstanceId: CARD_THREE,
        ownerID: PLAYER_ONE,
        controllerID: PLAYER_ONE,
        zoneID: `hand:${PLAYER_ONE}`,
        actorPlayerId: PLAYER_ONE,
        getDefinitionByInstanceId,
      });

      expect(inventorAfter.playCost).toBe(3);
    });

    it("projects variable hand-active self reductions from cards in play", () => {
      const sorcererDiscountAction: LorcanaCard = {
        id: "sorcerer-discount-action",
        canonicalId: "ci_sorcerer-discount-action",
        cardType: "action",
        name: "Sorcerer Discount Action",
        cost: 5,
        inkType: ["amethyst"],
        inkable: true,
        set: "TST",
        rarity: "common",
        text: "For each Sorcerer character you have in play, you pay 1 ink less to play this action.",
        i18n: createCardI18n("Sorcerer Discount Action", {
          en: {
            name: "Sorcerer Discount Action",
            text: "For each Sorcerer character you have in play, you pay 1 ink less to play this action.",
          },
        }),
        cardNumber: 2,
        abilities: [
          {
            type: "static",
            sourceZones: ["hand"],
            text: "For each Sorcerer character you have in play, you pay 1 ink less to play this action.",
            effect: {
              type: "cost-reduction",
              amount: {
                type: "classification-character-count",
                classification: "Sorcerer",
                controller: "you",
              },
            },
          },
        ],
      };
      const sorcererOne = createMockCharacter({
        id: "sorcerer-one",
        name: "Sorcerer One",
        cost: 2,
        classifications: ["Storyborn", "Sorcerer"],
      });
      const sorcererTwo = createMockCharacter({
        id: "sorcerer-two",
        name: "Sorcerer Two",
        cost: 3,
        classifications: ["Dreamborn", "Sorcerer"],
      });

      const state = buildState();
      state.ctx.zones.private.zoneCards[`hand:${PLAYER_ONE}`] = [CARD_ONE];
      state.ctx.zones.private.cardIndex[CARD_ONE] = {
        zoneKey: `hand:${PLAYER_ONE}`,
        index: 0,
        ownerID: PLAYER_ONE,
        controllerID: PLAYER_ONE,
      };
      state.ctx.zones.private.zoneCards.play = [CARD_TWO, CARD_THREE];
      state.ctx.zones.private.cardIndex[CARD_TWO] = {
        zoneKey: "play",
        index: 0,
        ownerID: PLAYER_ONE,
        controllerID: PLAYER_ONE,
      };
      state.ctx.zones.private.cardIndex[CARD_THREE] = {
        zoneKey: "play",
        index: 1,
        ownerID: PLAYER_ONE,
        controllerID: PLAYER_ONE,
      };

      const definitions = new Map<string, LorcanaCard>([
        [CARD_ONE, sorcererDiscountAction],
        [CARD_TWO, sorcererOne],
        [CARD_THREE, sorcererTwo],
      ]);
      const getDefinitionByInstanceId = (instanceId: string) =>
        definitions.get(instanceId as typeof CARD_ONE);

      const projection = projectLorcanaCardDerived({
        definition: sorcererDiscountAction,
        state,
        cardInstanceId: CARD_ONE,
        ownerID: PLAYER_ONE,
        controllerID: PLAYER_ONE,
        zoneID: `hand:${PLAYER_ONE}`,
        actorPlayerId: PLAYER_ONE,
        getDefinitionByInstanceId,
      });

      expect(projection.playCost).toBe(3);
    });

    it("preserves raw negative strength and lore in projected derived values", () => {
      const weakeningCharacter = createMockCharacter({
        id: "weakening-character",
        name: "Weakening Character",
        cost: 2,
        strength: 1,
        willpower: 3,
        lore: 1,
      });
      const state = buildState();

      state.ctx.zones.private.zoneCards[`hand:${PLAYER_ONE}`] = [];
      state.ctx.zones.private.zoneCards[`play:${PLAYER_ONE}`] = [CARD_ONE];
      state.ctx.zones.private.cardIndex[CARD_ONE] = {
        zoneKey: `play:${PLAYER_ONE}`,
        index: 0,
        ownerID: PLAYER_ONE,
        controllerID: PLAYER_ONE,
      };
      state.G.continuousEffects = {
        nextSeq: 3,
        instances: [
          {
            id: "negative-strength",
            kind: "stat-modifier",
            sourceId: CARD_ONE,
            targetId: CARD_ONE,
            stat: "strength",
            modifier: -3,
            duration: "this-turn",
            createdAtTurn: 1,
            expiresAtTurn: 1,
          },
          {
            id: "negative-lore",
            kind: "stat-modifier",
            sourceId: CARD_ONE,
            targetId: CARD_ONE,
            stat: "lore",
            modifier: -2,
            duration: "this-turn",
            createdAtTurn: 1,
            expiresAtTurn: 1,
          },
        ],
      };

      const projected = projectLorcanaCardDerived({
        definition: weakeningCharacter,
        state,
        cardInstanceId: CARD_ONE,
        ownerID: PLAYER_ONE,
        controllerID: PLAYER_ONE,
        zoneID: `play:${PLAYER_ONE}`,
        actorPlayerId: PLAYER_ONE,
      });

      expect(projected.strength).toBe(-2);
      expect(projected.lore).toBe(-1);
    });

    it("includes static in-play auras and applies printed-value stat floors after all modifiers", () => {
      const auraSource = createMockCharacter({
        id: "aura-source",
        name: "Aura Source",
        cost: 2,
        strength: 2,
        willpower: 2,
        abilities: [
          {
            id: "aura-source-1",
            type: "static",
            text: "Your characters get +1 strength.",
            effect: {
              type: "modify-stat",
              stat: "strength",
              modifier: 1,
              target: "YOUR_CHARACTERS",
            },
          },
        ],
      });
      const floorSource = createMockCharacter({
        id: "floor-source",
        name: "Floor Source",
        cost: 3,
        strength: 3,
        willpower: 3,
        abilities: [
          {
            id: "floor-source-1",
            type: "static",
            text: "Your characters' strength can't be reduced below their printed value.",
            effect: {
              type: "stat-floor",
              stat: "strength",
              minimum: "printed",
              target: "YOUR_CHARACTERS",
            },
          },
        ],
      });
      const target = createMockCharacter({
        id: "floor-target",
        name: "Floor Target",
        cost: 2,
        strength: 4,
        willpower: 4,
      });
      const state = buildState();

      state.ctx.zones.private.zoneCards[`hand:${PLAYER_ONE}`] = [];
      state.ctx.zones.private.zoneCards[`play:${PLAYER_ONE}`] = [CARD_ONE, CARD_TWO, CARD_THREE];
      state.ctx.zones.private.cardIndex[CARD_ONE] = {
        zoneKey: `play:${PLAYER_ONE}`,
        index: 0,
        ownerID: PLAYER_ONE,
        controllerID: PLAYER_ONE,
      };
      state.ctx.zones.private.cardIndex[CARD_TWO] = {
        zoneKey: `play:${PLAYER_ONE}`,
        index: 1,
        ownerID: PLAYER_ONE,
        controllerID: PLAYER_ONE,
      };
      state.ctx.zones.private.cardIndex[CARD_THREE] = {
        zoneKey: `play:${PLAYER_ONE}`,
        index: 2,
        ownerID: PLAYER_ONE,
        controllerID: PLAYER_ONE,
      };
      state.G.continuousEffects = {
        nextSeq: 3,
        instances: [
          {
            id: "strong-debuff",
            kind: "stat-modifier",
            sourceId: CARD_THREE,
            targetId: CARD_THREE,
            stat: "strength",
            modifier: -7,
            duration: "this-turn",
            createdAtTurn: 1,
            expiresAtTurn: 1,
          },
          {
            id: "partial-buff",
            kind: "stat-modifier",
            sourceId: CARD_ONE,
            targetId: CARD_THREE,
            stat: "strength",
            modifier: 2,
            duration: "this-turn",
            createdAtTurn: 1,
            expiresAtTurn: 1,
          },
        ],
      };

      const definitions: Record<CardInstanceId, LorcanaCard> = {
        [CARD_ONE]: auraSource,
        [CARD_TWO]: floorSource,
        [CARD_THREE]: target,
      };

      const projected = projectLorcanaCardDerived({
        definition: target,
        state,
        cardInstanceId: CARD_THREE,
        ownerID: PLAYER_ONE,
        controllerID: PLAYER_ONE,
        zoneID: `play:${PLAYER_ONE}`,
        actorPlayerId: PLAYER_ONE,
        getDefinitionByInstanceId: (cardId) => definitions[cardId],
      });

      expect(projected.strength).toBe(4);
    });
  });

  describe("detecting divergence", () => {
    /**
     * This test serves as documentation and a guard against accidental divergence.
     *
     * If this test fails, it means either:
     * 1. A new property was added to ProjectedLorcanaCardDerived without a corresponding method
     * 2. A new method was added to LorcanaRuntimeCardDerivedMethods without updating the mapping
     *
     * To fix:
     * - If the property should have a method, add it to LorcanaRuntimeCardDerivedMethods and update PROJECTION_TO_METHOD_MAP
     * - If the property is intentionally only in the projection, add it to PROJECTION_TO_METHOD_MAP with a null value
     */
    it("warns when projection properties lack corresponding methods", () => {
      const propertiesWithoutMethods: string[] = [];

      for (const [key, methodName] of Object.entries(PROJECTION_TO_METHOD_MAP)) {
        if (methodName === null) {
          propertiesWithoutMethods.push(key);
        }
      }

      // These properties are intentionally only in the projection (no runtime method)
      const expectedPropertiesWithoutMethods = [
        "exerted",
        "drying",
        "damage",
        "strength",
        "willpower",
        "lore",
        "moveCost",
        "playCost",
        "hasEvasive",
        "classifications",
        "temporaryAbilities",
        "temporaryAbilityStarts",
        "temporaryRestrictions",
        "temporaryRestrictionStarts",
        "keywordValues",
        "getStrength",
        "getWillpower",
      ];

      expect(propertiesWithoutMethods.sort()).toEqual(expectedPropertiesWithoutMethods.sort());
    });
  });
});
