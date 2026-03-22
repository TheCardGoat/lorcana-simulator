import type { CharacterCard } from "@tcg/lorcana-types";
import { balooCarefreeBearEnchantedI18n } from "./230-baloo-carefree-bear-enchanted.i18n";

export const balooCarefreeBearEnchanted: CharacterCard = {
  id: "19k",
  canonicalId: "ci_3I5",
  reprints: ["set10-085"],
  cardType: "character",
  name: "Baloo",
  version: "Carefree Bear",
  inkType: ["emerald"],
  franchise: "Jungle Book",
  set: "010",
  cardNumber: 230,
  rarity: "enchanted",
  specialRarity: "enchanted",
  cost: 5,
  strength: 4,
  willpower: 5,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_9a1c82a2d3dd4ef898fb86f089242018",
    tcgPlayer: 659443,
  },
  text: [
    {
      title: "Shift 3 {I}",
    },
    {
      title:
        "ROLL WITH IT When you play this character, choose one:\n- Each player draws a card.\n- Each player chooses and discards a card.",
    },
  ],
  classifications: ["Floodborn", "Ally"],
  abilities: [
    {
      id: "19k-1",
      keyword: "Shift",
      cost: {
        ink: 3,
      },
      text: "Shift 3 {I}",
      type: "keyword",
    },
    {
      id: "19k-2",
      name: "ROLL WITH IT",
      text: "ROLL WITH IT When you play this character, choose one: Each player draws a card. Each player chooses and discards a card.",
      type: "triggered",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      effect: {
        type: "choice",
        optionLabels: ["Each player draws a card.", "Each player chooses and discards a card."],
        options: [
          {
            type: "draw",
            amount: 1,
            target: "EACH_PLAYER",
          },
          {
            type: "discard",
            amount: 1,
            from: "hand",
            chosen: true,
            target: "EACH_PLAYER",
          },
        ],
      },
    },
  ],
  i18n: balooCarefreeBearEnchantedI18n,
};
