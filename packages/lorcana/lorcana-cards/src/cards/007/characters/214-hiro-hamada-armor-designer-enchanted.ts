import type { CharacterCard } from "@tcg/lorcana-types";
import { hiroHamadaArmorDesignerEnchantedI18n } from "./214-hiro-hamada-armor-designer-enchanted.i18n";

export const hiroHamadaArmorDesignerEnchanted: CharacterCard = {
  id: "dNZ",
  canonicalId: "ci_TaU",
  reprints: ["set7-096"],
  cardType: "character",
  name: "Hiro Hamada",
  version: "Armor Designer",
  inkType: ["emerald", "sapphire"],
  franchise: "Big Hero 6",
  set: "007",
  cardNumber: 214,
  rarity: "enchanted",
  specialRarity: "enchanted",
  cost: 7,
  strength: 4,
  willpower: 6,
  lore: 3,
  inkable: true,
  externalIds: {
    lorcast: "crd_434537e486234e2095f03c19628e07d4",
    tcgPlayer: 619742,
  },
  text: [
    {
      title: "Shift 5",
    },
    {
      title: "YOU CAN BE WAY MORE",
      description:
        "Your Floodborn characters that have a card under them gain Evasive and Ward. (Only characters with Evasive can challenge them. Opponents can't choose them except to challenge.)",
    },
  ],
  classifications: ["Floodborn", "Hero", "Inventor"],
  abilities: [
    {
      cost: {
        ink: 5,
      },
      id: "zri-1",
      keyword: "Shift",
      text: "Shift 5",
      type: "keyword",
    },
    {
      effect: {
        keyword: "Evasive",
        target: "YOUR_CHARACTERS",
        type: "gain-keyword",
      },
      id: "zri-2",
      text: "YOU CAN BE WAY MORE Your Floodborn characters that have a card under them gain Evasive and Ward.",
      type: "action",
    },
  ],
  i18n: hiroHamadaArmorDesignerEnchantedI18n,
};
