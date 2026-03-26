import type { CharacterCard } from "@tcg/lorcana-types";
import { pinocchioStringsAttachedEpicI18n } from "./224-pinocchio-strings-attached-epic.i18n";
import { evasive } from "../../../helpers/abilities/evasive";

export const pinocchioStringsAttachedEpic: CharacterCard = {
  id: "QOp",
  canonicalId: "ci_828",
  reprints: ["set8-061"],
  cardType: "character",
  name: "Pinocchio",
  version: "Strings Attached",
  inkType: ["amethyst"],
  franchise: "Pinocchio",
  set: "008",
  cardNumber: 224,
  rarity: "legendary",
  specialRarity: "epic",
  cost: 4,
  strength: 0,
  willpower: 4,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_a0a931cb7b6248b3a56080e7f39b7e2b",
    tcgPlayer: 631340,
  },
  text: "Evasive GOT TO KEEP REAL QUIET Once during your turn, whenever you ready this character, you may draw a card.",
  classifications: ["Storyborn", "Hero"],
  abilities: [
    evasive,
    {
      id: "1m2-2",
      effect: {
        chooser: "CONTROLLER",
        effect: {
          amount: 1,
          target: "CONTROLLER",
          type: "draw",
        },
        type: "optional",
      },
      name: "GOT TO KEEP REAL QUIET Once",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
      text: "GOT TO KEEP REAL QUIET Once during your turn, whenever you ready this character, you may draw a card.",
    },
  ],
  i18n: pinocchioStringsAttachedEpicI18n,
};
