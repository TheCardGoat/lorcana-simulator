import type { CharacterCard } from "@tcg/lorcana-types";
import { heiheiBoatSnackI18n } from "./007-heihei-boat-snack.i18n";
import { support } from "../../../helpers/abilities/support";

export const heiheiBoatSnack: CharacterCard = {
  id: "7AO",
  canonicalId: "ci_7AO",
  reprints: ["set1-007"],
  cardType: "character",
  name: "HeiHei",
  version: "Boat Snack",
  inkType: ["amber"],
  franchise: "Moana",
  set: "001",
  cardNumber: 7,
  rarity: "common",
  cost: 1,
  strength: 1,
  willpower: 2,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_7b875417a470447eb4d998d9b634580b",
    tcgPlayer: 493479,
  },
  text: "Support",
  classifications: ["Storyborn", "Ally"],
  abilities: [
    support,
    {
      id: "uio-2",
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
  i18n: heiheiBoatSnackI18n,
};
