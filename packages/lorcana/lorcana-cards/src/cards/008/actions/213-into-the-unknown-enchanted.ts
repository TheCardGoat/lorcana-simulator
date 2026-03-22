import type { ActionCard } from "@tcg/lorcana-types";
import { intoTheUnknownEnchantedI18n } from "./213-into-the-unknown-enchanted.i18n";

export const intoTheUnknownEnchanted: ActionCard = {
  id: "b9N",
  canonicalId: "ci_TcE",
  reprints: ["set8-081"],
  cardType: "action",
  name: "Into the Unknown",
  inkType: ["amethyst", "sapphire"],
  franchise: "Frozen",
  set: "008",
  cardNumber: 213,
  rarity: "enchanted",
  specialRarity: "enchanted",
  cost: 3,
  inkable: true,
  externalIds: {
    lorcast: "crd_1f6ec070467643d195c82c92cf93c955",
    tcgPlayer: 632720,
  },
  text: "Put chosen exerted character into their player's inkwell facedown and exerted.",
  actionSubtype: "song",
  abilities: [
    {
      id: "8Sv-1",
      text: "Put chosen exerted character into their player's inkwell facedown and exerted.",
      effect: {
        exerted: true,
        facedown: true,
        source: "chosen-character",
        target: "CHOSEN_CHARACTER",
        filter: [
          {
            type: "exerted",
          },
        ],
        type: "put-into-inkwell",
      },
      type: "action",
    },
  ],
  i18n: intoTheUnknownEnchantedI18n,
};
