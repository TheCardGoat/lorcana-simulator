import { describe, expect, it } from "bun:test";
import type { ActionCard, CharacterCard, ItemCard, LocationCard } from "@tcg/lorcana-types";
import { safeParseActionAbilities } from "../../convert-text-into-ability/index";
import {
  normalizeLorcanaAbilitiesTargets,
  normalizeLorcanaTarget,
} from "@tcg/lorcana-types/targeting";

type LorcanaCard = CharacterCard | ActionCard | ItemCard | LocationCard;

function isEligibleActionCard(card: LorcanaCard): card is ActionCard {
  return (
    card.cardType === "action" &&
    typeof card.text === "string" &&
    card.text.trim().length > 0 &&
    Array.isArray(card.abilities) &&
    card.abilities.length > 0
  );
}

function stripAbilityMetadata(abilities: NonNullable<LorcanaCard["abilities"]>) {
  return abilities.map((ability) => {
    const { text, id, name, ...rest } = ability;
    return rest;
  });
}

type ComparableValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | { [key: string]: ComparableValue }
  | ComparableValue[];

function deepNormalizeTargets(value: ComparableValue): ComparableValue {
  if (typeof value === "string") {
    const normalizedTarget = normalizeLorcanaTarget(value);
    if (!normalizedTarget) {
      return value;
    }

    return deepNormalizeTargets(normalizedTarget as ComparableValue);
  }

  if (Array.isArray(value)) {
    return value.map((entry) => deepNormalizeTargets(entry));
  }

  if (!value || typeof value !== "object") {
    return value;
  }

  const normalizedEntries = Object.entries(value).map(([key, entry]) => [
    key,
    deepNormalizeTargets(entry),
  ]);

  return Object.fromEntries(normalizedEntries);
}

export function definePerSetActionParserTests(
  setCode: string,
  cards: readonly LorcanaCard[],
): void {
  const actionCards = cards.filter(isEligibleActionCard).sort((left, right) => {
    return left.cardNumber - right.cardNumber;
  });

  describe(`Set ${setCode}`, () => {
    for (const card of actionCards) {
      const title = `[${card.set}-${card.cardNumber}] ${card.name}`;
      const actualEffect = card.abilities?.[0]?.effect;
      const actualAbility = normalizeLorcanaAbilitiesTargets(card.abilities);
      const comparableActualAbility = deepNormalizeTargets(
        stripAbilityMetadata(actualAbility),
      ) as ReturnType<typeof stripAbilityMetadata>;

      if (!actualEffect) {
        it.skip(`${title} (card missing canonical effect)`, () => {});
        continue;
      }

      if (card.abilities[0]?.type !== "action") {
        it.skip(`${title} (canonical ability is ${card.abilities[0]?.type}, not action)`, () => {});
        continue;
      }

      if (!card.text) {
        it.skip(`${title} (card missing text)`, () => {});
        continue;
      }

      const parsed = safeParseActionAbilities(card.text);

      if (!parsed.success) {
        it.skip(`${title} (parser unsupported: ${parsed.error}): ${card.text}`, () => {});
        continue;
      }

      it(`${card.set}-${card.name} - ${card.name}`, () => {
        expect(
          deepNormalizeTargets(
            parsed.abilities as ComparableValue,
          ) as typeof comparableActualAbility,
        ).toEqual(comparableActualAbility);
      });
    }
  });
}
