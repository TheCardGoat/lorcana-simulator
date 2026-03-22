import type { CharacterCard } from "@tcg/lorcana-types";
import { genieOnTheJobEnchantedI18n } from "./209-genie-on-the-job-enchanted.i18n";

export const genieOnTheJobEnchanted: CharacterCard = {
  id: "Qdl",
  canonicalId: "ci_1oW",
  reprints: ["set1-075"],
  cardType: "character",
  name: "Genie",
  version: "On the Job",
  inkType: ["emerald"],
  franchise: "Aladdin",
  set: "001",
  cardNumber: 209,
  rarity: "enchanted",
  specialRarity: "enchanted",
  cost: 6,
  strength: 3,
  willpower: 4,
  lore: 2,
  inkable: false,
  externalIds: {
    lorcast: "crd_ae7e91462bfc4861bbf97e99ed53a1c1",
    tcgPlayer: 510155,
  },
  text: [
    {
      title: "Evasive",
    },
    {
      title: "DISAPPEAR",
      description:
        "When you play this character, you may return chosen character to their player's hand.",
    },
  ],
  classifications: ["Storyborn", "Ally"],
  abilities: [
    {
      id: "n53-1",
      keyword: "Evasive",
      text: "Evasive",
      type: "keyword",
    },
    {
      effect: {
        chooser: "CONTROLLER",
        effect: {
          target: "CHOSEN_CHARACTER",
          type: "return-to-hand",
        },
        type: "optional",
      },
      id: "n53-2",
      name: "DISAPPEAR",
      text: "DISAPPEAR When you play this character, you may return chosen character to their player's hand.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
  i18n: genieOnTheJobEnchantedI18n,
};
