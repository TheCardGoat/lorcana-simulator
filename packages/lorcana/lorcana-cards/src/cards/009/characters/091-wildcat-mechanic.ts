import type { CharacterCard } from "@tcg/lorcana-types";
import { wildcatMechanicI18n } from "./091-wildcat-mechanic.i18n";
import { evasive } from "../../../helpers/abilities/evasive";

export const wildcatMechanic: CharacterCard = {
  id: "Xbs",
  canonicalId: "ci_8Mj",
  reprints: ["set3-092", "set9-091"],
  cardType: "character",
  name: "Wildcat",
  version: "Mechanic",
  inkType: ["emerald"],
  franchise: "Talespin",
  set: "009",
  cardNumber: 91,
  rarity: "uncommon",
  cost: 3,
  strength: 2,
  willpower: 3,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_c7a6168b43fd4c71a441f6f2e236117b",
    tcgPlayer: 650030,
  },
  text: [
    {
      title: "Evasive",
    },
    {
      title: "DISASSEMBLE",
      description: "{E} — Banish chosen item.",
    },
  ],
  classifications: ["Storyborn", "Ally"],
  abilities: [
    evasive,
    {
      id: "Xbs-2",
      name: "DISASSEMBLE",
      type: "activated",
      cost: {
        exert: true,
      },
      effect: {
        type: "banish",
        target: {
          selector: "chosen",
          count: 1,
          owner: "any",
          zones: ["play"],
          cardTypes: ["item"],
        },
      },
      text: "DISASSEMBLE {E} — Banish chosen item.",
    },
  ],
  i18n: wildcatMechanicI18n,
};
