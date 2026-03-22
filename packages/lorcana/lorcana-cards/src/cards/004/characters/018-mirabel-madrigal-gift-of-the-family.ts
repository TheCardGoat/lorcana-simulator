import type { CharacterCard } from "@tcg/lorcana-types";
import { mirabelMadrigalGiftOfTheFamilyI18n } from "./018-mirabel-madrigal-gift-of-the-family.i18n";

export const mirabelMadrigalGiftOfTheFamily: CharacterCard = {
  id: "iqv",
  canonicalId: "ci_iqv",
  reprints: ["set4-018"],
  cardType: "character",
  name: "Mirabel Madrigal",
  version: "Gift of the Family",
  inkType: ["amber"],
  franchise: "Encanto",
  set: "004",
  cardNumber: 18,
  rarity: "common",
  cost: 5,
  strength: 3,
  willpower: 5,
  lore: 2,
  inkable: false,
  externalIds: {
    lorcast: "crd_0f2a801e619f4b5eba26e139a30e49ef",
    tcgPlayer: 543898,
  },
  text: [
    {
      title: "Support",
    },
    {
      title: "SAVING THE MIRACLE",
      description:
        "Whenever this character quests, your other Madrigal characters get +1 {L} this turn.",
    },
  ],
  classifications: ["Dreamborn", "Hero", "Madrigal"],
  abilities: [
    {
      id: "1a6-1",
      keyword: "Support",
      text: "Support",
      type: "keyword",
    },
    {
      effect: {
        duration: "this-turn",
        modifier: 1,
        stat: "lore",
        target: "CHOSEN_CHARACTER",
        type: "modify-stat",
      },
      id: "1a6-2",
      name: "SAVING THE MIRACLE",
      text: "SAVING THE MIRACLE Whenever this character quests, your other Madrigal characters get +1 {L} this turn.",
      trigger: {
        event: "quest",
        on: "SELF",
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
  i18n: mirabelMadrigalGiftOfTheFamilyI18n,
};
