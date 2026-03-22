import type { CharacterCard } from "@tcg/lorcana-types";
import { shenziHyenaPackLeaderI18n } from "./087-shenzi-hyena-pack-leader.i18n";

export const shenziHyenaPackLeader: CharacterCard = {
  id: "JHY",
  canonicalId: "ci_VGS",
  reprints: ["set3-085", "set9-087"],
  cardType: "character",
  name: "Shenzi",
  version: "Hyena Pack Leader",
  inkType: ["emerald"],
  franchise: "Lion King",
  set: "009",
  cardNumber: 87,
  rarity: "common",
  cost: 4,
  strength: 0,
  willpower: 6,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_b082a2cb0d9f4c24a54a8ebb85f6b0a6",
    tcgPlayer: 650027,
  },
  text: [
    {
      title: "I'LL HANDLE THIS",
      description: "While this character is at a location, she gets +3 {S}.",
    },
    {
      title: "WHAT'S THE HURRY?",
      description:
        "While this character is at a location, whenever she challenges another character, you may draw a card.",
    },
  ],
  classifications: ["Storyborn", "Ally", "Hyena"],
  abilities: [
    {
      effect: {
        modifier: 3,
        stat: "strength",
        target: "SELF",
        type: "modify-stat",
      },
      id: "qk2-1",
      text: "I'LL HANDLE THIS While this character is at a location, she gets +3 {S}.",
      type: "static",
    },
    {
      effect: {
        chooser: "CONTROLLER",
        effect: {
          amount: 1,
          target: "CONTROLLER",
          type: "draw",
        },
        type: "optional",
      },
      id: "qk2-2",
      text: "WHAT'S THE HURRY? While this character is at a location, whenever she challenges another character, you may draw a card.",
      type: "static",
    },
  ],
  i18n: shenziHyenaPackLeaderI18n,
};
