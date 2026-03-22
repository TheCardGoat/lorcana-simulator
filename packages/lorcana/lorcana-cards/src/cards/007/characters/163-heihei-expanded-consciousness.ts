import type { CharacterCard } from "@tcg/lorcana-types";
import { heiheiExpandedConsciousnessI18n } from "./163-heihei-expanded-consciousness.i18n";

export const heiheiExpandedConsciousness: CharacterCard = {
  id: "MiH",
  canonicalId: "ci_MiH",
  reprints: ["set7-163"],
  cardType: "character",
  name: "Heihei",
  version: "Expanded Consciousness",
  inkType: ["sapphire", "steel"],
  franchise: "Moana",
  set: "007",
  cardNumber: 163,
  rarity: "uncommon",
  cost: 5,
  strength: 1,
  willpower: 5,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_f424db642c4340f7a412e29c1bcde568",
    tcgPlayer: 619500,
  },
  text: [
    {
      title: "Shift 3",
    },
    {
      title: "Resist +1",
    },
    {
      title: "CLEAR YOUR MIND",
      description:
        "When you play this character, put all cards from your hand into your inkwell facedown and exerted.",
    },
  ],
  classifications: ["Floodborn", "Ally"],
  abilities: [
    {
      cost: {
        ink: 3,
      },
      id: "quw-1",
      keyword: "Shift",
      text: "Shift 3",
      type: "keyword",
    },
    {
      id: "quw-2",
      keyword: "Resist",
      text: "Resist +1",
      type: "keyword",
      value: 1,
    },
    {
      effect: {
        exerted: true,
        facedown: true,
        source: "hand",
        target: "CONTROLLER",
        type: "put-into-inkwell",
      },
      id: "quw-3",
      name: "CLEAR YOUR MIND",
      text: "CLEAR YOUR MIND When you play this character, put all cards from your hand into your inkwell facedown and exerted.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
  i18n: heiheiExpandedConsciousnessI18n,
};
