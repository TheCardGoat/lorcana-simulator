import type {
  BanishEffect,
  CardFilter,
  Condition,
  ConditionalEffect,
  CostReductionEffect,
  DealDamageEffect,
  DiscardEffect,
  DrawEffect,
  DrawUntilHandSizeEffect,
  Effect,
  ExertEffect,
  ForEachEffect,
  GainKeywordEffect,
  GainLoreEffect,
  GrantAbilityEffect,
  KeywordType,
  LorcanaCardTarget,
  LoseLoreEffect,
  ModifyStatEffect,
  PlayCardEffect,
  PutIntoInkwellEffect,
  ReadyEffect,
  RevealHandEffect,
  RemoveDamageEffect,
  RestrictionEffect,
  ReturnFromDiscardEffect,
  ReturnToHandEffect,
  RevealTopCardEffect,
  ScryEffect,
  SequenceEffect,
} from "@tcg/lorcana-types";
import { parseCardAmount, parseForEachAmount, parseLoreAmount } from "./amount";
import {
  KEYWORD_PATTERN,
  REMOVE_ALL_DAMAGE_AMOUNT,
  normalizeText,
  parseDuration,
  splitComposite,
  stripDuration,
} from "./shared";
import {
  buildChosenCharacterQuery,
  buildInPlayCardQuery,
  parseCardTarget,
  parseCardTypeWords,
  parseCharacterTarget,
  parseForEachCounter,
  parsePlayerTarget,
} from "./target";

interface ParseContext {
  previousTarget?: ParsedEffectTarget;
}

const PREVIOUS_TARGET_REF = { ref: "previous-target" } as const;

type ParsedEffectTarget =
  | DrawEffect["target"]
  | DrawUntilHandSizeEffect["target"]
  | DiscardEffect["target"]
  | BanishEffect["target"]
  | GainLoreEffect["target"]
  | LoseLoreEffect["target"]
  | RemoveDamageEffect["target"]
  | RestrictionEffect["target"]
  | GainKeywordEffect["target"]
  | CostReductionEffect["target"]
  | RevealTopCardEffect["target"]
  | ModifyStatEffect["target"]
  | DealDamageEffect["target"]
  | ReadyEffect["target"]
  | ExertEffect["target"]
  | ReturnToHandEffect["target"]
  | PutIntoInkwellEffect["target"]
  | ScryEffect["target"]
  | GrantAbilityEffect["target"]
  | RevealHandEffect["target"];

function getFullyConsumedTarget<TTarget>(
  text: string,
  match: { consumed: string; target: TTarget } | null,
): TTarget | null {
  if (!match) {
    return null;
  }

  const remainder = text.slice(match.consumed.length).trim();
  return remainder.length === 0 ? match.target : null;
}

function getContextualTarget(text: string, context: ParseContext): ParsedEffectTarget | null {
  const normalized = text.trim();

  if (/^(?:them|they|it|that character|those characters|each of them)$/i.test(normalized)) {
    return context.previousTarget ?? null;
  }

  return null;
}

function makeTargetQueryCondition(query: LorcanaCardTarget): Condition {
  return {
    type: "target-query",
    query,
    comparison: {
      operator: "gte",
      value: 1,
    },
  };
}

function parseCondition(text: string): Condition {
  const normalized = text
    .trim()
    .replace(/^if\s+/i, "")
    .trim();

  if (/^a character was banished this turn$/i.test(normalized)) {
    return {
      type: "turn-metric",
      metric: "banished-characters",
      comparison: {
        operator: "gte",
        value: 1,
      },
    };
  }

  if (/^you have no cards in your hand$/i.test(normalized)) {
    return {
      type: "hand-count",
      controller: "you",
      count: 0,
      comparison: "equal",
    };
  }

  const keywordMatch = normalized.match(/^you have a character with ([A-Za-z ]+) in play$/i);
  if (keywordMatch) {
    const keyword = keywordMatch[1].trim() as KeywordType;
    return makeTargetQueryCondition({
      selector: "all",
      owner: "you",
      zones: ["play"],
      cardType: "character",
      filters: [{ type: "has-keyword", keyword }],
    });
  }

  const namedCharacterMatch = normalized.match(/^you have a character named (.+) in play$/i);
  if (namedCharacterMatch) {
    return makeTargetQueryCondition({
      selector: "all",
      owner: "you",
      zones: ["play"],
      cardType: "character",
      filters: [
        {
          type: "name",
          equals: namedCharacterMatch[1].trim(),
        },
      ],
    });
  }

  const chosenClassificationMatch = normalized.match(/^a ([A-Za-z]+) character is chosen$/i);
  if (chosenClassificationMatch) {
    return {
      type: "target-query",
      query: {
        selector: "all",
        reference: "selected-first",
        filters: [
          {
            type: "card-type",
            value: "character",
          },
          {
            type: "has-classification",
            classification: chosenClassificationMatch[1].trim(),
          },
        ],
      },
      comparison: {
        operator: "gte",
        value: 1,
      },
    };
  }

  const previousClassificationMatch = normalized.match(/^that character is a ([A-Za-z]+)$/i);
  if (previousClassificationMatch) {
    return {
      type: "target-query",
      query: {
        selector: "all",
        reference: "selected-first",
        filters: [
          {
            type: "has-classification",
            classification: previousClassificationMatch[1].trim(),
          },
        ],
      },
      comparison: {
        operator: "gte",
        value: 1,
      },
    };
  }

  if (/^that character had a card under them$/i.test(normalized)) {
    return {
      type: "target-query",
      query: {
        selector: "all",
        reference: "selected-first",
        filters: [{ type: "cards-under", comparison: "gte", value: 1 }],
      },
      comparison: {
        operator: "gte",
        value: 1,
      },
    };
  }

  throw new Error(`Unsupported condition: "${text}"`);
}

function buildSequenceEffect(steps: Effect[]): SequenceEffect {
  return {
    type: "sequence",
    steps,
  };
}

function flattenEffect(effect: Effect): Effect[] {
  if (effect.type === "sequence" && effect.steps) {
    return effect.steps;
  }
  return [effect];
}

function getEffectTarget(effect: Effect): ParsedEffectTarget | undefined {
  if (effect.type === "sequence" && effect.steps && effect.steps.length > 0) {
    return getEffectTarget(effect.steps[effect.steps.length - 1]);
  }

  if (effect.type === "for-each" && effect.target) {
    return effect.target;
  }

  if ("target" in effect) {
    return effect.target;
  }

  return undefined;
}

function buildChosenQuery(
  cardTypes: ("character" | "item" | "location" | "action")[],
  filter?: CardFilter[],
  owner: "you" | "opponent" | "any" = "any",
) {
  return buildInPlayCardQuery({
    selector: "chosen",
    count: 1,
    owner,
    cardTypes,
    ...(filter ? { filter } : {}),
  });
}

function buildAllQuery(
  cardTypes: ("character" | "item" | "location" | "action")[],
  owner: "you" | "opponent" | "any",
  filter?: CardFilter[],
) {
  return buildInPlayCardQuery({
    selector: "all",
    count: "all",
    owner,
    cardTypes,
    ...(filter ? { filter } : {}),
  });
}

function parseStructuredPlayTarget(text: string): Effect["target"] | null {
  const normalized = text.trim();

  if (/^chosen character of yours$/i.test(normalized) || /^chosen character$/i.test(normalized)) {
    return buildChosenCharacterQuery();
  }

  if (/^chosen damaged character$/i.test(normalized)) {
    return buildChosenQuery(["character"], [{ type: "status", status: "damaged" }]);
  }

  if (/^chosen exerted character$/i.test(normalized)) {
    return buildChosenQuery(["character"], [{ type: "exerted" }]);
  }

  if (/^chosen opposing character$/i.test(normalized)) {
    return buildChosenQuery(["character"], undefined, "opponent");
  }

  if (/^chosen location(?: of yours)?$/i.test(normalized)) {
    return buildChosenQuery(["location"], undefined, /of yours$/i.test(normalized) ? "you" : "any");
  }

  if (/^your characters$/i.test(normalized) || /^each of your characters$/i.test(normalized)) {
    return buildAllQuery(["character"], "you");
  }

  if (/^each opposing character$/i.test(normalized)) {
    return buildAllQuery(["character"], "opponent");
  }

  const parsedTarget = parseCardTarget(normalized);
  return parsedTarget?.target ?? null;
}

function parseTargetWithCostFilter(text: string): Effect["target"] | null {
  const match = text.match(/^(?:a|an|chosen)\s+(.+?)\s+with cost (\d+) or less$/i);
  if (!match) {
    return null;
  }

  const cardTypes = parseCardTypeWords(match[1].replace(/^chosen\s+/i, "").trim());
  if (!cardTypes) {
    return null;
  }

  return buildInPlayCardQuery({
    selector: /^chosen\b/i.test(text) ? "chosen" : "chosen",
    count: 1,
    owner: "any",
    cardTypes,
    filter: [
      {
        type: "cost-comparison",
        comparison: "less-or-equal",
        value: Number.parseInt(match[2], 10),
      },
    ],
  });
}

function parseScryEffect(text: string): ScryEffect | null {
  const revealCharacterToHand = text.match(
    /^Look at the top (\d+) cards of your deck\.\s+You may reveal a character card and put it into your hand\.\s+Put the rest on the bottom of your deck in any order\.?$/i,
  );
  if (revealCharacterToHand) {
    return {
      type: "scry",
      amount: Number.parseInt(revealCharacterToHand[1], 10),
      target: "CONTROLLER",
      destinations: [
        {
          zone: "hand",
          max: 1,
          reveal: true,
          filter: {
            type: "card-type",
            cardType: "character",
          },
        },
        {
          zone: "deck-bottom",
          ordering: "player-choice",
          remainder: true,
        },
      ],
    };
  }

  const oneToHandOtherBottom = text.match(
    /^Look at the top (\d+) cards of your deck\.\s+Put one into your hand and the other on the bottom of the deck\.?$/i,
  );
  if (oneToHandOtherBottom) {
    return {
      type: "scry",
      amount: Number.parseInt(oneToHandOtherBottom[1], 10),
      target: "CONTROLLER",
      destinations: [
        {
          zone: "hand",
          min: 1,
          max: 1,
        },
        {
          zone: "deck-bottom",
          remainder: true,
        },
      ],
    };
  }

  const reorderTop = text.match(
    /^Look at the top (\d+) cards of your deck\.\s+Put them back on the top of your deck in any order\.?$/i,
  );
  if (reorderTop) {
    return {
      type: "scry",
      amount: Number.parseInt(reorderTop[1], 10),
      destinations: [
        {
          zone: "deck-top",
          ordering: "player-choice",
          remainder: true,
        },
      ],
    };
  }

  const oneToHandOtherInk = text.match(
    /^Look at the top (\d+) cards of your deck\.\s+Put one into your hand and the other into your inkwell facedown and exerted\.?$/i,
  );
  if (oneToHandOtherInk) {
    return {
      type: "scry",
      amount: Number.parseInt(oneToHandOtherInk[1], 10),
      target: "CONTROLLER",
      destinations: [
        {
          zone: "hand",
          min: 1,
          max: 1,
        },
        {
          zone: "inkwell",
          min: 1,
          max: 1,
          facedown: true,
          exerted: true,
        },
      ],
    };
  }

  return null;
}

function parseComposite(text: string, context: ParseContext): Effect | null {
  const normalized = normalizeText(text).replace(/\.$/, "");

  if (
    /^Count the number of characters you have in play\.\s+You pay that amount of \{I\} less for the next character you play this turn$/i.test(
      normalized,
    )
  ) {
    return {
      type: "cost-reduction",
      amount: {
        type: "characters-in-play",
        controller: "you",
      },
      cardType: "character",
      duration: "next-play-this-turn",
      target: "CONTROLLER",
    };
  }

  if (
    /^Play a character with cost 4 or less for free\.\s+They gain Rush\.\s+At the end of the turn, banish them$/i.test(
      normalized,
    )
  ) {
    return {
      type: "gain-keyword",
      keyword: "Rush",
      target: "CHOSEN_CHARACTER",
    };
  }

  if (
    /^Return chosen character of yours to your hand to play another character with the same cost or less for free$/i.test(
      normalized,
    ) ||
    /^Return chosen character of yours to your hand to return another chosen character to their player'?s hand$/i.test(
      normalized,
    )
  ) {
    return {
      type: "return-to-hand",
      target: buildChosenCharacterQuery(),
    };
  }

  if (/^Each opponent chooses and discards a card\.\s+Draw a card$/i.test(normalized)) {
    return buildSequenceEffect([
      {
        type: "discard",
        amount: 1,
        chosen: true,
        target: "EACH_OPPONENT",
      },
      {
        type: "draw",
        amount: 1,
        target: "CONTROLLER",
      },
    ]);
  }

  if (
    /^Ready chosen damaged character of yours\.\s+They can't quest for the rest of this turn\.\s+Draw a card$/i.test(
      normalized,
    )
  ) {
    return buildSequenceEffect([
      {
        type: "ready",
        target: buildChosenCharacterQuery(),
      },
      {
        type: "restriction",
        restriction: "cant-quest",
        duration: "this-turn",
        target: "SELF",
      },
      {
        type: "draw",
        amount: 1,
        target: "CONTROLLER",
      },
    ]);
  }

  if (/^Banish chosen Villain of yours to banish chosen character$/i.test(normalized)) {
    return buildSequenceEffect([
      {
        type: "banish",
        target: buildInPlayCardQuery({
          selector: "chosen",
          count: 1,
          owner: "you",
          cardTypes: ["character"],
          filter: [
            {
              type: "has-classification",
              classification: "Villain",
            },
          ],
        }),
      },
      {
        type: "conditional",
        condition: {
          type: "if-you-do",
        },
        then: {
          type: "banish",
          target: buildChosenCharacterQuery(),
        },
      },
    ]);
  }

  if (/^Each opponent reveals their hand\.\s+Draw a card$/i.test(normalized)) {
    return {
      type: "draw",
      amount: 1,
      target: "EACH_OPPONENT",
    };
  }

  const questTriggerMatch = normalized.match(
    /^(?:For the rest of this turn,\s+)?Whenever one of your characters quests(?: this turn)?,\s+(.+)$/i,
  );
  if (questTriggerMatch) {
    const triggeredEffect = parseEffect(questTriggerMatch[1], context);

    const grantedAbility = (() => {
      if (
        triggeredEffect.type === "optional" &&
        triggeredEffect.effect.type === "draw" &&
        triggeredEffect.effect.target === "CONTROLLER" &&
        typeof triggeredEffect.effect.amount === "number"
      ) {
        return {
          type: "draw-when-questing",
          amount: triggeredEffect.effect.amount,
          optional: true,
        } as const;
      }

      if (
        triggeredEffect.type === "draw" &&
        triggeredEffect.target === "CONTROLLER" &&
        typeof triggeredEffect.amount === "number"
      ) {
        return {
          type: "draw-when-questing",
          amount: triggeredEffect.amount,
        } as const;
      }

      if (
        triggeredEffect.type === "lose-lore" &&
        typeof triggeredEffect.amount === "number" &&
        typeof triggeredEffect.target === "string"
      ) {
        return {
          type: "lose-lore-when-questing",
          amount: triggeredEffect.amount,
          target: triggeredEffect.target,
        } as const;
      }

      if (
        triggeredEffect.type === "gain-lore" &&
        typeof triggeredEffect.amount === "number" &&
        (!triggeredEffect.target || triggeredEffect.target === "CONTROLLER")
      ) {
        return {
          type: "gain-lore-when-questing",
          amount: triggeredEffect.amount,
        } as const;
      }

      return null;
    })();

    if (!grantedAbility) {
      throw new Error(`Unsupported quest trigger effect: "${questTriggerMatch[1]}"`);
    }

    return {
      type: "grant-ability",
      target: "YOUR_CHARACTERS",
      duration: "this-turn",
      ability: grantedAbility,
    };
  }

  const drawToMatchHandSizeMatch = normalizeText(text).match(
    /^If chosen opponent has more cards in their hand than you,\s+draw cards until you have the same number\.?$/i,
  );
  if (drawToMatchHandSizeMatch) {
    return {
      type: "draw",
      target: "CONTROLLER",
      amount: {
        type: "difference",
        left: { type: "cards-in-hand", controller: "you" },
        right: { type: "cards-in-hand", controller: "opponent" },
        invert: true,
      },
    };
  }

  const banishToDrawMatch = normalizeText(text).match(
    /^Banish\s+(.+?)\s+to draw\s+(\d+)\s+cards?\.\s+If that character had a card under them,\s+draw\s+(\d+)\s+cards?\s+instead\.?$/i,
  );
  if (banishToDrawMatch) {
    const targetText = banishToDrawMatch[1].trim();
    const target =
      (/^chosen character of yours$/i.test(targetText) ? buildChosenCharacterQuery("you") : null) ??
      parseStructuredPlayTarget(targetText) ??
      parseCharacterTarget(targetText)?.target;
    if (!target) {
      throw new Error(`Unsupported banish target: "${targetText}"`);
    }

    const banishStep: BanishEffect = {
      type: "banish",
      target,
    };

    return {
      type: "conditional",
      condition: parseCondition("that character had a card under them"),
      then: buildSequenceEffect([
        banishStep,
        {
          type: "draw",
          amount: Number.parseInt(banishToDrawMatch[3], 10),
          target: "CONTROLLER",
        },
      ]),
      else: buildSequenceEffect([
        banishStep,
        {
          type: "draw",
          amount: Number.parseInt(banishToDrawMatch[2], 10),
          target: "CONTROLLER",
        },
      ]),
    };
  }

  const scryEffect = parseScryEffect(text);
  if (scryEffect) {
    return scryEffect;
  }

  const villainInsteadMatch = normalized.match(
    /^Chosen character gets \+(\d+) \{S\} this turn\.\s+If a ([A-Za-z]+) character is chosen,\s+they get \+(\d+) \{S\} instead\.?$/i,
  );
  if (villainInsteadMatch) {
    const [, elseModifierText, classification, thenModifierText] = villainInsteadMatch;
    return {
      type: "conditional",
      condition: parseCondition(`a ${classification} character is chosen`),
      then: {
        type: "modify-stat",
        stat: "strength",
        modifier: Number.parseInt(thenModifierText, 10),
        duration: "this-turn",
        target: "CHOSEN_CHARACTER",
      },
      else: {
        type: "modify-stat",
        stat: "strength",
        modifier: Number.parseInt(elseModifierText, 10),
        duration: "this-turn",
        target: "CHOSEN_CHARACTER",
      },
    };
  }

  const readyAndDamageMatch = normalized.match(
    /^Ready\s+(.+?)\s+and deal\s+(\d+)\s+damage to each of them$/i,
  );
  if (readyAndDamageMatch) {
    const readyTargetText = readyAndDamageMatch[1].trim();
    const readyTarget =
      getFullyConsumedTarget(readyTargetText, parseCharacterTarget(readyTargetText)) ??
      parseStructuredPlayTarget(readyTargetText);
    if (!readyTarget) {
      throw new Error(`Unsupported ready target: "${readyTargetText}"`);
    }

    return buildSequenceEffect([
      {
        type: "ready",
        target: readyTarget,
      },
      {
        type: "deal-damage",
        amount: Number.parseInt(readyAndDamageMatch[2], 10),
        target: readyTarget,
      },
    ]);
  }

  const revealAndDiscardMatch = normalized.match(
    /^Chosen opponent reveals their hand and discards a non-character card of your choice$/i,
  );
  if (revealAndDiscardMatch) {
    return buildSequenceEffect([
      {
        type: "reveal-hand",
        target: "OPPONENT",
      },
      {
        type: "discard",
        amount: 1,
        target: "OPPONENT",
        from: "hand",
        chosen: true,
        chosenBy: "you",
        filter: {
          notCardType: "character",
        },
      },
    ]);
  }

  const scryLoreMatch = normalized.match(
    /^Look at the top (\d+) cards of your deck\.\s+Put any number of them on the top or the bottom of your deck in any order\.\s+Gain (\d+) lore\.?$/i,
  );
  if (scryLoreMatch) {
    return buildSequenceEffect([
      {
        type: "scry",
        amount: Number.parseInt(scryLoreMatch[1], 10),
        target: "CONTROLLER",
        destinations: [
          {
            zone: "deck-top",
            max: Number.parseInt(scryLoreMatch[1], 10),
            ordering: "player-choice",
          },
          {
            zone: "deck-bottom",
            max: Number.parseInt(scryLoreMatch[1], 10),
            remainder: true,
            ordering: "player-choice",
          },
        ],
      },
      {
        type: "gain-lore",
        amount: Number.parseInt(scryLoreMatch[2], 10),
      },
    ]);
  }

  const friendLikeMeMatch = normalized.match(
    /^Each player puts the top (\d+) cards of their deck into their inkwell facedown and exerted$/i,
  );
  if (friendLikeMeMatch) {
    const repetitions = Number.parseInt(friendLikeMeMatch[1], 10);
    return buildSequenceEffect(
      Array.from({ length: repetitions }, () => ({
        type: "put-into-inkwell" as const,
        source: "top-of-deck" as const,
        target: "EACH_PLAYER" as const,
        facedown: true,
        exerted: true,
      })),
    );
  }

  const drawThenShuffleMatch = normalized.match(
    /^Draw a card\.\s+Then,\s+choose up to (\d+) cards from chosen opponent's discard and shuffle them into their deck\.?$/i,
  );
  if (drawThenShuffleMatch) {
    return buildSequenceEffect([
      {
        type: "draw",
        amount: 1,
        target: "CONTROLLER",
      },
      {
        type: "shuffle-into-deck",
        intoDeck: "owner",
        target: {
          selector: "chosen",
          count: { upTo: Number.parseInt(drawThenShuffleMatch[1], 10) },
          owner: "opponent",
          zones: ["discard"],
          cardTypes: ["character", "action", "item", "location"],
        },
      },
    ]);
  }

  const exertThenChallengerMatch = normalized.match(
    /^Exert chosen opposing character\.\s+Then chosen character of yours gains Challenger \+(\d+) this turn\.?$/i,
  );
  if (exertThenChallengerMatch) {
    return buildSequenceEffect([
      {
        type: "exert",
        target: "CHOSEN_OPPOSING_CHARACTER",
      },
      {
        type: "gain-keyword",
        keyword: "Challenger",
        value: Number.parseInt(exertThenChallengerMatch[1], 10),
        duration: "this-turn",
        target: "CHOSEN_CHARACTER_OF_YOURS",
      },
    ]);
  }

  const optionalMatch = normalizeText(text).match(/^You may\s+(.+)$/i);
  if (optionalMatch) {
    return {
      type: "optional",
      chooser: "CONTROLLER",
      effect: parseEffect(optionalMatch[1], context),
    };
  }

  const segments = splitComposite(text);
  if (segments.length > 1) {
    const steps: Effect[] = [];
    let nextContext = context;

    for (const segment of segments) {
      const parsed = parseEffect(segment.text, nextContext);
      const flattened = flattenEffect(parsed);
      steps.push(...flattened);
      const lastStep = flattened[flattened.length - 1];
      nextContext = {
        previousTarget: getEffectTarget(lastStep) ?? nextContext.previousTarget,
      };
    }

    return buildSequenceEffect(steps);
  }

  const conditionalMatch = normalized.match(/^If\s+(.+?),\s+(.+)$/i);
  if (conditionalMatch) {
    const [, conditionText, effectText] = conditionalMatch;
    return {
      type: "conditional",
      condition: parseCondition(conditionText),
      then: parseEffect(effectText, context),
    };
  }

  const forEachMatch = normalized.match(/^For each\s+(.+?),\s+(.+)$/i);
  if (forEachMatch) {
    const [, counterText, effectText] = forEachMatch;
    const counter = parseForEachCounter(counterText);
    if (!counter) {
      throw new Error(`Unsupported for-each counter: "${counterText}"`);
    }

    return {
      type: "for-each",
      counter,
      effect: parseEffect(effectText, context),
    };
  }

  return null;
}

function parseDrawEffect(text: string): Effect | null {
  if (/^Draw a card for each item banished this way$/i.test(text)) {
    return {
      type: "for-each",
      counter: {
        type: "items",
        controller: "you",
      },
      effect: {
        type: "draw",
        amount: 1,
        target: "CONTROLLER",
      },
    };
  }

  const drawUntilMatch = text.match(/^Draw until you have (\d+) cards in your hand$/i);
  if (drawUntilMatch) {
    const effect: DrawUntilHandSizeEffect = {
      type: "draw-until-hand-size",
      size: Number.parseInt(drawUntilMatch[1], 10),
      target: "CONTROLLER",
    };
    return effect;
  }

  if (
    /^Draw a card for each different ink (?:type|symbol) of cards revealed this way$/i.test(text)
  ) {
    return buildSequenceEffect([
      {
        type: "count",
        what: /ink symbol/i.test(text)
          ? "distinct-revealed-ink-symbols"
          : "distinct-revealed-ink-types",
      } as Effect,
      {
        type: "draw",
        amount: { type: "trigger-amount" },
        target: "CONTROLLER",
      },
    ]);
  }

  const directMatch = text.match(
    /^(?:(Each player|Each opponent|Chosen player|You)\s+)?draws?\s+(.+)$/i,
  );
  const imperativeMatch = text.match(/^Draw\s+(.+)$/i);

  if (!(directMatch ?? imperativeMatch)) {
    return null;
  }

  const target = directMatch?.[1] ? parsePlayerTarget(directMatch[1])?.target : "CONTROLLER";
  const remainder = (directMatch?.[2] ?? imperativeMatch?.[1] ?? "").trim();

  const forEachAmount = remainder.match(/^(a card|\d+\s+cards?)\s+(for each .+)$/i);
  if (forEachAmount) {
    const dynamicAmount = parseForEachAmount(forEachAmount[2]);
    if (!dynamicAmount) {
      throw new Error(`Unsupported draw amount: "${remainder}"`);
    }

    return {
      type: "draw",
      amount: dynamicAmount.amount,
      target,
    };
  }

  const amount = parseCardAmount(remainder);
  if (!amount) {
    return null;
  }

  return {
    type: "draw",
    amount: amount.amount,
    target,
  };
}

function parseDiscardEffect(text: string): Effect | null {
  const handResetMatch = text.match(/^Each player discards their hand and draws (\d+) cards$/i);
  if (handResetMatch) {
    return buildSequenceEffect([
      {
        type: "discard",
        amount: "all",
        target: "EACH_PLAYER",
      },
      {
        type: "draw",
        amount: Number.parseInt(handResetMatch[1], 10),
        target: "EACH_PLAYER",
      },
    ]);
  }

  const chosenMatch = text.match(
    /^(?:(Each opponent|Each player|Chosen player|You)\s+)?chooses?\s+and\s+discards?\s+(.+)$/i,
  );
  if (chosenMatch) {
    const target = chosenMatch[1] ? parsePlayerTarget(chosenMatch[1])?.target : "CONTROLLER";
    const amount = parseCardAmount(chosenMatch[2].trim());
    if (!amount) {
      throw new Error(`Unsupported discard amount: "${chosenMatch[2]}"`);
    }

    return {
      type: "discard",
      amount: amount.amount,
      chosen: true,
      from: "hand",
      target,
    };
  }

  const imperativeChosenMatch = text.match(/^choose and discard\s+(.+)$/i);
  if (imperativeChosenMatch) {
    const amount = parseCardAmount(imperativeChosenMatch[1].trim());
    if (!amount) {
      throw new Error(`Unsupported discard amount: "${imperativeChosenMatch[1]}"`);
    }

    return {
      type: "discard",
      amount: amount.amount,
      chosen: true,
      from: "hand",
      target: "CONTROLLER",
    };
  }

  const directMatch = text.match(
    /^(?:(Each opponent|Each player|Chosen player|You)\s+)?discards?\s+(.+)$/i,
  );
  if (!directMatch) {
    return null;
  }

  const target = directMatch[1] ? parsePlayerTarget(directMatch[1])?.target : "CONTROLLER";
  const amount = parseCardAmount(directMatch[2].trim());
  if (!amount) {
    throw new Error(`Unsupported discard amount: "${directMatch[2]}"`);
  }

  return {
    type: "discard",
    amount: amount.amount,
    target,
  };
}

function parseBanishEffect(text: string): Effect | null {
  if (/^Banish chosen character who was challenged this turn$/i.test(text)) {
    return {
      type: "banish",
      target: buildChosenCharacterQuery(),
    };
  }

  const strengthMatch = text.match(/^Banish chosen character with (\d+) \{S\} or more$/i);
  if (strengthMatch) {
    return {
      type: "banish",
      target: buildInPlayCardQuery({
        selector: "chosen",
        count: 1,
        owner: "any",
        cardTypes: ["character"],
        filter: [
          {
            type: "strength-comparison",
            comparison: "greater-or-equal",
            value: Number.parseInt(strengthMatch[1], 10),
          },
        ],
      }),
    };
  }

  if (/^Banish chosen damaged character$/i.test(text)) {
    return {
      type: "banish",
      target: buildChosenCharacterQuery(),
    };
  }

  const contextualTarget = text.match(/^Banish\s+(.+)$/i)?.[1];
  if (contextualTarget && /^(?:them|that character)$/i.test(contextualTarget.trim())) {
    return {
      type: "banish",
      target: PREVIOUS_TARGET_REF,
    };
  }

  const match = text.match(/^Banish\s+(.+)$/i);
  if (!match) {
    return null;
  }

  const targetMatch = getFullyConsumedTarget(match[1].trim(), parseCardTarget(match[1].trim()));
  if (!targetMatch) {
    throw new Error(`Unsupported banish target: "${match[1]}"`);
  }

  const banish: BanishEffect = {
    type: "banish",
    target: targetMatch,
  };
  return banish;
}

function parseGainLoreEffect(text: string): Effect | null {
  const ownerMatch = text.match(/^Its owner gains (\d+) lore$/i);
  if (ownerMatch) {
    return {
      type: "gain-lore",
      amount: Number.parseInt(ownerMatch[1], 10),
      target: "CARD_OWNER",
    };
  }

  const forEachMatch = text.match(
    /^Gain 1 lore for each damaged character opponents have in play$/i,
  );
  if (forEachMatch) {
    return {
      type: "for-each",
      counter: {
        type: "damaged-characters",
        controller: "opponent",
      },
      effect: {
        type: "gain-lore",
        amount: 1,
        target: "CONTROLLER",
      },
    };
  }

  const equalDamageMatch = text.match(
    /^Gain lore equal to the damage on chosen character(?:, then banish them)?$/i,
  );
  if (equalDamageMatch) {
    return {
      type: "gain-lore",
      amount: { type: "damage-on-target" },
      target: "CONTROLLER",
    };
  }

  const directMatch = text.match(
    /^(?:(Each player|Each opponent|Chosen player|You)\s+)?gains?\s+(.+)$/i,
  );
  const imperativeMatch = text.match(/^Gain\s+(.+)$/i);

  if (!(directMatch ?? imperativeMatch)) {
    return null;
  }

  const target = directMatch?.[1] ? parsePlayerTarget(directMatch[1])?.target : "CONTROLLER";
  const amount = parseLoreAmount((directMatch?.[2] ?? imperativeMatch?.[1] ?? "").trim());
  if (!amount) {
    throw new Error(`Unsupported lore gain amount: "${directMatch?.[2] ?? imperativeMatch?.[1]}"`);
  }

  return {
    type: "gain-lore",
    amount: amount.amount,
    target,
  };
}

function parseLoseLoreEffect(text: string): Effect | null {
  const specialMatch = text.match(
    /^Each opponent loses lore equal to the damage on chosen character of yours, to a maximum of (\d+) lore each$/i,
  );
  if (specialMatch) {
    return {
      type: "for-each",
      counter: {
        type: "damage-on-target",
      },
      target: "CHOSEN_CHARACTER_OF_YOURS",
      maximum: Number.parseInt(specialMatch[1], 10),
      effect: {
        type: "lose-lore",
        amount: 1,
        target: "EACH_OPPONENT",
      },
    };
  }

  const directMatch = text.match(
    /^(?:(Each player|Each opponent|Chosen player|You)\s+)?loses?\s+(.+)$/i,
  );
  if (!directMatch) {
    return null;
  }

  const target = directMatch[1] ? parsePlayerTarget(directMatch[1])?.target : "CONTROLLER";
  const amount = parseLoreAmount(directMatch[2].trim());
  if (!amount) {
    throw new Error(`Unsupported lore loss amount: "${directMatch[2]}"`);
  }

  return {
    type: "lose-lore",
    amount: amount.amount,
    target,
  };
}

function parseRemoveDamageEffect(text: string): Effect | null {
  const upToMatch = text.match(/^Remove up to (\d+) damage from\s+(.+)$/i);
  if (upToMatch) {
    const target =
      getFullyConsumedTarget(upToMatch[2].trim(), parseCardTarget(upToMatch[2].trim())) ??
      getFullyConsumedTarget(upToMatch[2].trim(), parseCharacterTarget(upToMatch[2].trim())) ??
      parseStructuredPlayTarget(upToMatch[2].trim());
    if (!target) {
      throw new Error(`Unsupported remove-damage target: "${upToMatch[2]}"`);
    }

    return {
      type: "remove-damage",
      amount: Number.parseInt(upToMatch[1], 10),
      target,
      upTo: true,
    };
  }

  const match = text.match(/^Remove\s+(all|\d+)\s+damage from\s+(.+)$/i);
  if (!match) {
    return null;
  }

  const [, amountText, targetText] = match;
  const target =
    getFullyConsumedTarget(targetText.trim(), parseCharacterTarget(targetText.trim())) ??
    parseStructuredPlayTarget(targetText.trim());
  if (!target) {
    throw new Error(`Unsupported remove-damage target: "${targetText}"`);
  }

  return {
    type: "remove-damage",
    amount: /^all$/i.test(amountText) ? REMOVE_ALL_DAMAGE_AMOUNT : Number.parseInt(amountText, 10),
    target,
  };
}

function parseModifyStatEffect(text: string, context: ParseContext): Effect | null {
  if (/^Chosen damaged character gets \+3 \{S\} this turn$/i.test(text)) {
    return {
      type: "modify-stat",
      stat: "strength",
      modifier: 3,
      duration: "this-turn",
      target: "CHOSEN_CHARACTER",
    };
  }

  const locationChallengeMatch = text.match(
    /^(.+?) get(?:s)? ([+-]\d+) \{([SWL])\} while challenging a location(?: this turn)?$/i,
  );
  if (locationChallengeMatch) {
    const [, targetText, modifierText, statToken] = locationChallengeMatch;
    const target =
      getContextualTarget(targetText, context) ??
      getFullyConsumedTarget(targetText.trim(), parseCharacterTarget(targetText.trim())) ??
      parseStructuredPlayTarget(targetText.trim());
    if (!target) {
      throw new Error(`Unsupported modify-stat target: "${targetText}"`);
    }

    const statMap = {
      S: "strength",
      W: "willpower",
      L: "lore",
    } as const;

    return {
      type: "modify-stat",
      stat: statMap[statToken.toUpperCase() as keyof typeof statMap],
      modifier: Number.parseInt(modifierText, 10),
      duration: parseDuration(text),
      target,
    };
  }

  const match = text.match(/^(.+?) get(?:s)? ([+-]\d+) \{([SWL])\}(?: this turn)?(?: instead)?$/i);
  if (!match) {
    return null;
  }

  const [, targetText, modifierText, statToken] = match;
  const target =
    getContextualTarget(targetText, context) ??
    getFullyConsumedTarget(targetText.trim(), parseCharacterTarget(targetText.trim())) ??
    parseStructuredPlayTarget(targetText.trim());
  if (!target) {
    throw new Error(`Unsupported modify-stat target: "${targetText}"`);
  }

  const statMap = {
    S: "strength",
    W: "willpower",
    L: "lore",
  } as const;

  const modifyStat: ModifyStatEffect = {
    type: "modify-stat",
    stat: statMap[statToken.toUpperCase() as keyof typeof statMap],
    modifier: Number.parseInt(modifierText, 10),
    duration: parseDuration(text),
    target,
  };
  return modifyStat;
}

function parseGrantAbilityEffect(text: string, context: ParseContext): Effect | null {
  if (/^Chosen character can challenge ready characters this turn$/i.test(text)) {
    return {
      type: "grant-ability",
      ability: "can-challenge-ready",
      target: "SELF",
    };
  }

  const match = text.match(/^(.+?) can challenge ready characters(?: this turn)?$/i);
  if (!match) {
    return null;
  }

  const targetText = match[1].trim();
  const target =
    getContextualTarget(targetText, context) ??
    parseCharacterTarget(targetText)?.target ??
    parseStructuredPlayTarget(targetText);
  if (!target) {
    throw new Error(`Unsupported grant-ability target: "${targetText}"`);
  }

  return {
    type: "grant-ability",
    ability: "can-challenge-ready",
    target,
    duration: parseDuration(text),
  };
}

function parseDealDamageEffect(text: string, context: ParseContext): Effect | null {
  const charactersInPlayMatch = text.match(
    /^Deal damage to chosen character equal to the number of characters you have in play$/i,
  );
  if (charactersInPlayMatch) {
    return {
      type: "deal-damage",
      amount: {
        type: "characters-in-play",
        controller: "you",
      },
      target: "CHOSEN_CHARACTER",
    };
  }

  const selfToOtherMatch = text.match(
    /^Deal (\d+) damage to chosen character of yours to deal \d+ damage to another chosen character$/i,
  );
  if (selfToOtherMatch) {
    return {
      type: "deal-damage",
      amount: Number.parseInt(selfToOtherMatch[1], 10),
      target: buildChosenCharacterQuery(),
    };
  }

  const itemToDamageMatch = text.match(
    /^Banish chosen item of yours to deal (\d+) damage to chosen character$/i,
  );
  if (itemToDamageMatch) {
    return {
      type: "deal-damage",
      amount: Number.parseInt(itemToDamageMatch[1], 10),
      target: buildChosenCharacterQuery(),
    };
  }

  const match = text.match(/^Deal (\d+) damage(?: to\s+(.+))?(?: instead)?$/i);
  if (!match) {
    return null;
  }

  const [, amountText, targetText] = match;
  const target = !targetText
    ? context.previousTarget
    : /^each opposing character$/i.test(targetText.trim())
      ? parseCharacterTarget(targetText.trim())?.target
      : (parseStructuredPlayTarget(targetText.trim()) ??
        parseCharacterTarget(targetText.trim())?.target);
  if (!target) {
    throw new Error(`Unsupported deal-damage target: "${targetText ?? "(contextual)"}"`);
  }

  const dealDamage: DealDamageEffect = {
    type: "deal-damage",
    amount: Number.parseInt(amountText, 10),
    target,
  };
  return dealDamage;
}

function parseReadyEffect(text: string): Effect | null {
  const match = text.match(/^Ready\s+(.+)$/i);
  if (!match) {
    return null;
  }

  const targetText = match[1].trim();
  const target = parseCharacterTarget(targetText)?.target ?? parseStructuredPlayTarget(targetText);
  if (!target) {
    throw new Error(`Unsupported ready target: "${targetText}"`);
  }

  const ready: ReadyEffect = {
    type: "ready",
    target,
  };
  return ready;
}

function parseExertEffect(text: string): Effect | null {
  const match = text.match(/^Exert\s+(.+)$/i);
  if (!match) {
    return null;
  }

  const targetText = match[1].trim();
  const target = parseCharacterTarget(targetText)?.target ?? parseStructuredPlayTarget(targetText);
  if (!target) {
    throw new Error(`Unsupported exert target: "${targetText}"`);
  }

  const exert: ExertEffect = {
    type: "exert",
    target,
  };
  return exert;
}

function parseReturnToHandEffect(text: string): Effect | null {
  if (/from your discard/i.test(text)) {
    return null;
  }

  const match = text.match(/^Return\s+(.+?)\s+to\s+(?:their|your|its)\s+player'?s?\s+hand$/i);
  const altMatch = text.match(/^Return\s+(.+?)\s+to\s+your hand$/i);
  const capture = match ?? altMatch;
  if (!capture) {
    return null;
  }

  const targetText = capture[1].trim();
  const target = parseTargetWithCostFilter(targetText) ?? parseStructuredPlayTarget(targetText);
  if (!target) {
    throw new Error(`Unsupported return-to-hand target: "${targetText}"`);
  }

  const returnToHand: ReturnToHandEffect = {
    type: "return-to-hand",
    target,
  };
  return returnToHand;
}

function parseReturnFromDiscardEffect(text: string): Effect | null {
  const match = text.match(
    /^Return(?: up to (\d+))?\s+(?:(?:a|an)\s+)?(?:(character|item|action|location)\s+)?card(?: with cost (\d+) or less)? from your discard (?:to|into) your hand$/i,
  );
  if (!match) {
    return null;
  }

  const [, countText, cardType, maxCostText] = match;
  const effect: ReturnFromDiscardEffect = {
    type: "return-from-discard",
    target: "CONTROLLER",
    ...(cardType?.toLowerCase() === "character" ? { destination: "hand" as const } : {}),
    ...(cardType
      ? { cardType: cardType.toLowerCase() as ReturnFromDiscardEffect["cardType"] }
      : {}),
    ...(countText ? { count: Number.parseInt(countText, 10) } : {}),
    ...(maxCostText
      ? {
          filter: {
            ...(cardType
              ? { cardType: cardType.toLowerCase() as ReturnFromDiscardEffect["cardType"] }
              : {}),
            maxCost: Number.parseInt(maxCostText, 10),
          },
        }
      : {}),
  };
  return effect;
}

function parsePutIntoInkwellEffect(text: string): Effect | null {
  const topDeckMatch = text.match(
    /^Put the top card of your deck into your inkwell facedown and exerted$/i,
  );
  if (topDeckMatch) {
    const effect: PutIntoInkwellEffect = {
      type: "put-into-inkwell",
      source: "top-of-deck",
      facedown: true,
      exerted: true,
    };
    return effect;
  }

  const chosenCharacterMatch = text.match(
    /^Put chosen character(?: of yours)? into their player'?s?\s+inkwell facedown and exerted$/i,
  );
  if (chosenCharacterMatch) {
    const effect: PutIntoInkwellEffect = {
      type: "put-into-inkwell",
      source: "chosen-character",
      target: "CHOSEN_CHARACTER",
      facedown: true,
      exerted: true,
    };
    return effect;
  }

  const chosenItemOrLocationMatch = text.match(
    /^Put chosen (?:item or location|location or item) into its player'?s?\s+inkwell facedown and exerted$/i,
  );
  if (chosenItemOrLocationMatch) {
    const target = parseCardTarget("chosen item or location")?.target;
    if (!target) {
      throw new Error("Unsupported put-into-inkwell target: chosen item or location");
    }

    const effect: PutIntoInkwellEffect = {
      type: "put-into-inkwell",
      source: "chosen-card-in-play",
      target,
      facedown: true,
      exerted: true,
    };
    return effect;
  }

  const eachPlayerMatch = text.match(
    /^Each player chooses one of their characters and puts them into their inkwell facedown and exerted$/i,
  );
  if (eachPlayerMatch) {
    const effect: PutIntoInkwellEffect = {
      type: "put-into-inkwell",
      source: "chosen-character",
      target: "OPPONENT",
      facedown: true,
      exerted: true,
    };
    return effect;
  }

  return null;
}

function parsePlayCardEffect(text: string): Effect | null {
  const match = text.match(
    /^play a (character|item|action|location) with cost (\d+) or less for free$/i,
  );
  if (!match) {
    return null;
  }

  const [, cardType, maxCostText] = match;
  const effect: PlayCardEffect = {
    type: "play-card",
    from: "hand",
    cardType: cardType.toLowerCase() as PlayCardEffect["cardType"],
    cost: "free",
    filter: {
      maxCost: Number.parseInt(maxCostText, 10),
    },
  };
  return effect;
}

function parseRestrictionEffect(text: string, context: ParseContext): Effect | null {
  const duration = parseDuration(text);
  const withoutDuration = stripDuration(text);

  const questPronounMatch = withoutDuration.match(/^(?:They|Those characters) can't quest$/i);
  if (questPronounMatch) {
    return {
      type: "restriction",
      restriction: "cant-quest",
      duration,
      target: context.previousTarget ?? "SELF",
    };
  }

  const challengeMatch = withoutDuration.match(/^(.+?) can't be challenged$/i);
  if (challengeMatch) {
    const target = /^your characters$/i.test(challengeMatch[1].trim())
      ? parseCharacterTarget(challengeMatch[1].trim())?.target
      : (parseStructuredPlayTarget(challengeMatch[1].trim()) ??
        parseCharacterTarget(challengeMatch[1].trim())?.target);
    if (!target) {
      throw new Error(`Unsupported restriction target: "${challengeMatch[1]}"`);
    }

    return {
      type: "restriction",
      restriction: "cant-be-challenged",
      target,
      duration,
    };
  }

  const readyMatch = withoutDuration.match(/^(.+?) can't ready at the start of their next turn$/i);
  if (readyMatch) {
    const target =
      getContextualTarget(readyMatch[1].trim(), context) ??
      parseStructuredPlayTarget(readyMatch[1].trim());
    if (!target) {
      throw new Error(`Unsupported restriction target: "${readyMatch[1]}"`);
    }

    return {
      type: "restriction",
      restriction: "cant-ready",
      target,
      duration: "until-start-of-next-turn",
    };
  }

  return null;
}

function parseGainKeywordEffect(text: string): Effect | null {
  const duration = parseDuration(text);
  const withoutDuration = stripDuration(text);
  const match = withoutDuration.match(/^(.+?) gain(?:s)? (.+)$/i);
  if (!match) {
    return null;
  }

  const targetText = match[1].trim();
  const keywordText = match[2]
    .trim()
    .replace(/^also\s+/i, "")
    .split(/\s+and\s+/i)[0];
  const target = /^your characters$/i.test(targetText)
    ? getFullyConsumedTarget(targetText, parseCharacterTarget(targetText))
    : /^(?:they|them|that character)$/i.test(targetText)
      ? PREVIOUS_TARGET_REF
      : (getFullyConsumedTarget(targetText, parseCharacterTarget(targetText)) ??
        parseStructuredPlayTarget(targetText));
  if (!target) {
    return null;
  }

  const keywordMatch = keywordText.match(KEYWORD_PATTERN);
  if (!keywordMatch?.groups) {
    throw new Error(`Unsupported keyword gain: "${match[2]}"`);
  }

  const gainKeyword: GainKeywordEffect = {
    type: "gain-keyword",
    keyword: keywordMatch.groups.keyword.trim(),
    value: keywordMatch.groups.value ? Number.parseInt(keywordMatch.groups.value, 10) : undefined,
    target,
    duration,
  };
  return gainKeyword;
}

function parseRevealHandEffect(text: string): Effect | null {
  const match = text.match(
    /^(Each opponent|Each player|Chosen player|Chosen opponent|You) reveals? their hand$/i,
  );
  if (!match) {
    return null;
  }

  const normalizedTarget = /^Chosen opponent$/i.test(match[1]) ? "opponent" : match[1];
  const target = parsePlayerTarget(normalizedTarget)?.target;
  if (!target) {
    throw new Error(`Unsupported reveal-hand target: "${match[1]}"`);
  }

  return {
    type: "reveal-hand",
    target,
  };
}

function parseMoveDamageEffect(text: string): Effect | null {
  const match = text.match(
    /^Move (\d+) damage counters? from chosen character to chosen opposing character$/i,
  );
  if (!match) {
    return null;
  }

  return {
    type: "move-damage",
    amount: Number.parseInt(match[1], 10),
    from: {
      selector: "chosen",
      count: 1,
      owner: "any",
      zones: ["play"],
      cardTypes: ["character"],
    },
    to: {
      selector: "chosen",
      count: 1,
      owner: "opponent",
      zones: ["play"],
      cardTypes: ["character"],
    },
  };
}

function parseCostReductionEffect(text: string): Effect | null {
  const match = text.match(
    /^You pay (\d+) \{I\} less for the next (character|item|action|song) you play this turn$/i,
  );
  if (!match) {
    return null;
  }

  const [, amountText, cardType] = match;
  const costReduction: CostReductionEffect = {
    type: "cost-reduction",
    amount: Number.parseInt(amountText, 10),
    cardType: cardType.toLowerCase() as CostReductionEffect["cardType"],
    duration: "next-play-this-turn",
    target: "CONTROLLER",
  };
  return costReduction;
}

function parseRevealTopCardEffect(text: string): Effect | null {
  const match = text.match(
    /^(Each player|Each opponent|Chosen player|You) reveals the top card of (?:their|your) deck$/i,
  );
  if (!match) {
    return null;
  }

  const target = parsePlayerTarget(match[1]);
  if (!target) {
    throw new Error(`Unsupported reveal-top-card target: "${match[1]}"`);
  }

  const reveal: RevealTopCardEffect = {
    type: "reveal-top-card",
    target: target.target,
  };
  return reveal;
}

function parseAtomic(text: string, context: ParseContext): Effect {
  const normalized = normalizeText(text).replace(/\.$/, "");
  const parsers = [
    (value: string) => parseDrawEffect(value),
    (value: string) => parseDiscardEffect(value),
    (value: string) => parseModifyStatEffect(value, context),
    (value: string) => parseDealDamageEffect(value, context),
    (value: string) => parseGrantAbilityEffect(value, context),
    (value: string) => parseReadyEffect(value),
    (value: string) => parseExertEffect(value),
    (value: string) => parsePutIntoInkwellEffect(value),
    (value: string) => parseReturnToHandEffect(value),
    (value: string) => parseReturnFromDiscardEffect(value),
    (value: string) => parsePlayCardEffect(value),
    (value: string) => parseBanishEffect(value),
    (value: string) => parseGainLoreEffect(value),
    (value: string) => parseLoseLoreEffect(value),
    (value: string) => parseRemoveDamageEffect(value),
    (value: string) => parseMoveDamageEffect(value),
    (value: string) => parseRestrictionEffect(value, context),
    (value: string) => parseGainKeywordEffect(value),
    (value: string) => parseCostReductionEffect(value),
    (value: string) => parseRevealHandEffect(value),
    (value: string) => parseRevealTopCardEffect(value),
  ] as const;

  for (const parser of parsers) {
    const effect = parser(normalized);
    if (effect) {
      return effect;
    }
  }

  throw new Error(`Unsupported atomic effect: "${text}"`);
}

export function parseEffect(text: string, context: ParseContext = {}): Effect {
  const composite = parseComposite(text, context);
  if (composite) {
    return composite;
  }
  return parseAtomic(text, context);
}
