import type { CharacterCard } from "@tcg/lorcana-types";
import { baymaxPersonalHealthcareCompanionEnchantedI18n } from "./218-baymax-personal-healthcare-companion-enchanted.i18n";

export const baymaxPersonalHealthcareCompanionEnchanted: CharacterCard = {
  id: "nr4",
  canonicalId: "ci_StD",
  reprints: ["set6-156"],
  cardType: "character",
  name: "Baymax",
  version: "Personal Healthcare Companion",
  inkType: ["sapphire"],
  franchise: "Big Hero 6",
  set: "006",
  cardNumber: 218,
  rarity: "enchanted",
  specialRarity: "enchanted",
  cost: 3,
  strength: 0,
  willpower: 4,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_7a1524eb2f994287ab6de2e677431724",
    tcgPlayer: 591999,
  },
  text: [
    {
      title: "FULLY CHARGED",
      description:
        "If you have an Inventor character in play, you pay 1 {I} less to play this character.",
    },
    {
      title: "YOU SAID",
      description: "'OW' 2 {I} — Remove up to 1 damage from another chosen character.",
    },
  ],
  classifications: ["Storyborn", "Hero", "Robot"],
  abilities: [
    {
      id: "1p5-1",
      type: "static",
      name: "FULLY CHARGED",
      condition: {
        type: "has-character-with-classification",
        controller: "you",
        classification: "Inventor",
      },
      effect: {
        type: "cost-reduction",
        amount: 1,
        cardType: "character",
      },
      sourceZones: ["hand"],
      text: "FULLY CHARGED If you have an Inventor character in play, you pay 1 {I} less to play this character.",
    },
    {
      id: "1p5-2",
      type: "activated",
      name: "YOU SAID 'OW'",
      cost: {
        ink: 2,
      },
      effect: {
        type: "remove-damage",
        amount: 1,
        target: "ANOTHER_CHOSEN_CHARACTER",
        upTo: true,
      },
      text: "YOU SAID 'OW' 2 {I} - Remove up to 1 damage from another chosen character.",
    },
  ],
  i18n: baymaxPersonalHealthcareCompanionEnchantedI18n,
};
