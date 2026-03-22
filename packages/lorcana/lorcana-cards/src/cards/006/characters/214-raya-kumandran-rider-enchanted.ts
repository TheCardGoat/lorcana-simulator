import type { CharacterCard } from "@tcg/lorcana-types";
import { rayaKumandranRiderEnchantedI18n } from "./214-raya-kumandran-rider-enchanted.i18n";

export const rayaKumandranRiderEnchanted: CharacterCard = {
  id: "pyb",
  canonicalId: "ci_aR1",
  reprints: ["set6-107"],
  cardType: "character",
  name: "Raya",
  version: "Kumandran Rider",
  inkType: ["ruby"],
  franchise: "Raya and the Last Dragon",
  set: "006",
  cardNumber: 214,
  rarity: "enchanted",
  specialRarity: "enchanted",
  cost: 4,
  strength: 3,
  willpower: 3,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_b1ea1c67fc224e968a4906149590585c",
    tcgPlayer: 592036,
  },
  text: [
    {
      title: "COME ON, LET'S DO THIS",
      description:
        "Once during your turn, whenever a card is put into your inkwell, you may ready another chosen character of yours. They can't quest for the rest of this turn.",
    },
  ],
  classifications: ["Storyborn", "Hero", "Princess"],
  abilities: [
    {
      effect: {
        chooser: "CONTROLLER",
        effect: {
          duration: "this-turn",
          restriction: "cant-quest",
          target: "SELF",
          type: "restriction",
        },
        type: "optional",
      },
      id: "1dx-1",
      text: "COME ON, LET'S DO THIS Once during your turn, whenever a card is put into your inkwell, you may ready another chosen character of yours. They can't quest for the rest of this turn.",
      type: "action",
    },
  ],
  i18n: rayaKumandranRiderEnchantedI18n,
};
