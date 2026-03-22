import type { CharacterCard } from "@tcg/lorcana-types";
import { nanaCanineCaregiverI18n } from "./053-nana-canine-caregiver.i18n";

export const nanaCanineCaregiver: CharacterCard = {
  id: "wwt",
  canonicalId: "ci_wwt",
  reprints: ["set10-053"],
  cardType: "character",
  name: "Nana",
  version: "Canine Caregiver",
  inkType: ["amethyst"],
  franchise: "Peter Pan",
  set: "010",
  cardNumber: 53,
  rarity: "uncommon",
  cost: 3,
  strength: 3,
  willpower: 3,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_217c6bfcdfaa48be949cb14f7ef7a862",
    tcgPlayer: 660025,
  },
  text: [
    {
      title: "HELPFUL INSTINCTS",
      description:
        "When you play this character, you may choose and discard a card to return chosen character with cost 2 or less to their player's hand.",
    },
  ],
  classifications: ["Storyborn", "Ally"],
  abilities: [
    {
      effect: {
        chooser: "CONTROLLER",
        effect: {
          target: {
            selector: "chosen",
            count: 1,
            owner: "any",
            zones: ["play"],
            cardTypes: ["character"],
          },
          type: "return-to-hand",
        },
        type: "optional",
      },
      id: "1lc-1",
      name: "HELPFUL INSTINCTS",
      text: "HELPFUL INSTINCTS When you play this character, you may choose and discard a card to return chosen character with cost 2 or less to their player's hand.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
  i18n: nanaCanineCaregiverI18n,
};
