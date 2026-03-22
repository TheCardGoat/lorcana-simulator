import type { CharacterCard } from "@tcg/lorcana-types";
import { megaraPartOfThePlanI18n } from "./054-megara-part-of-the-plan.i18n";

export const megaraPartOfThePlan: CharacterCard = {
  id: "tg3",
  canonicalId: "ci_tg3",
  reprints: ["set8-054"],
  cardType: "character",
  name: "Megara",
  version: "Part of the Plan",
  inkType: ["amethyst"],
  franchise: "Hercules",
  set: "008",
  cardNumber: 54,
  rarity: "common",
  cost: 3,
  strength: 2,
  willpower: 5,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_60f9c25e26a148c6bae493b7c7792a0f",
    tcgPlayer: 631337,
  },
  text: [
    {
      title: "CONTENTIOUS ALLIANCE",
      description:
        "While you have a character named Hades in play, this character gains Challenger +2. (They get +2 {S} while challenging.)",
    },
  ],
  classifications: ["Dreamborn", "Ally"],
  abilities: [
    {
      effect: {
        keyword: "Challenger",
        target: "SELF",
        type: "gain-keyword",
        value: 2,
      },
      id: "d0s-1",
      text: "CONTENTIOUS ALLIANCE While you have a character named Hades in play, this character gains Challenger +2.",
      type: "action",
    },
  ],
  i18n: megaraPartOfThePlanI18n,
};
