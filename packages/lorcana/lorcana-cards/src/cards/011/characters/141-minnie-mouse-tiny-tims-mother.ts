import type { CharacterCard } from "@tcg/lorcana-types";
import { minnieMouseTinyTimsMotherI18n } from "./141-minnie-mouse-tiny-tims-mother.i18n";

export const minnieMouseTinyTimsMother: CharacterCard = {
  id: "4Kj",
  canonicalId: "ci_4Kj",
  reprints: ["set11-141"],
  cardType: "character",
  name: "Minnie Mouse",
  version: "Tiny Tim's Mother",
  inkType: ["sapphire"],
  franchise: "Mickey's Christmas Carol",
  set: "011",
  cardNumber: 141,
  rarity: "common",
  cost: 3,
  strength: 2,
  willpower: 4,
  lore: 2,
  inkable: false,
  externalIds: {
    lorcast: "crd_33f12c74df68498cb444d6a493be67ef",
    tcgPlayer: 676221,
  },
  text: "Support",
  classifications: ["Storyborn", "Ally"],
  abilities: [
    {
      id: "8ol-1",
      keyword: "Support",
      type: "keyword",
      text: "Support",
    },
    {
      id: "8ol-2",
      type: "triggered",
      text: "Support (Whenever this character quests, you may add their {S} to another chosen character's {S} this turn.)",
      trigger: {
        event: "quest",
        on: "SELF",
        timing: "whenever",
      },
      effect: {
        type: "optional",
        chooser: "CONTROLLER",
        effect: {
          type: "support",
          target: "ANOTHER_CHOSEN_CHARACTER_OF_YOURS",
        },
      },
    },
  ],
  i18n: minnieMouseTinyTimsMotherI18n,
};
