import type { CharacterCard } from "@tcg/lorcana-types";
import { jafarStrikingIllusionistEnchantedI18n } from "./208-jafar-striking-illusionist-enchanted.i18n";

export const jafarStrikingIllusionistEnchanted: CharacterCard = {
  id: "MT1",
  canonicalId: "ci_7x1",
  reprints: ["set3-042"],
  cardType: "character",
  name: "Jafar",
  version: "Striking Illusionist",
  inkType: ["amethyst"],
  franchise: "Aladdin",
  set: "003",
  cardNumber: 208,
  rarity: "enchanted",
  specialRarity: "enchanted",
  cost: 7,
  strength: 4,
  willpower: 5,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_3ecab24376cb4cd5989309e000f797c1",
    tcgPlayer: 539158,
  },
  text: [
    {
      title: "Shift 5",
    },
    {
      title: "Evasive",
    },
    {
      title: "POWER BEYOND MEASURE",
      description:
        "During your turn, while this character is exerted, whenever you draw a card, gain 1 lore.",
    },
  ],
  classifications: ["Floodborn", "Villain", "Sorcerer"],
  abilities: [
    {
      cost: {
        ink: 5,
      },
      id: "1nu-1",
      keyword: "Shift",
      text: "Shift 5",
      type: "keyword",
    },
    {
      id: "1nu-2",
      keyword: "Evasive",
      text: "Evasive",
      type: "keyword",
    },
    {
      effect: {
        amount: 1,
        type: "gain-lore",
      },
      id: "1nu-3",
      text: "POWER BEYOND MEASURE During your turn, while this character is exerted, whenever you draw a card, gain 1 lore.",
      condition: {
        target: "SELF",
        type: "exerted",
      },
      trigger: {
        event: "draw",
        on: "YOU",
        restrictions: [
          {
            type: "during-turn",
            whose: "your",
          },
        ],
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
  i18n: jafarStrikingIllusionistEnchantedI18n,
};
