import type { CharacterCard } from "@tcg/lorcana-types";
import { patchPlayfulPupI18n } from "./025-patch-playful-pup.i18n";

export const patchPlayfulPup: CharacterCard = {
  id: "vSi",
  canonicalId: "ci_vSi",
  reprints: ["set8-025"],
  cardType: "character",
  name: "Patch",
  version: "Playful Pup",
  inkType: ["amber", "sapphire"],
  franchise: "101 Dalmatians",
  set: "008",
  cardNumber: 25,
  rarity: "uncommon",
  cost: 1,
  strength: 0,
  willpower: 2,
  lore: 1,
  inkable: false,
  externalIds: {
    lorcast: "crd_1df8d47cd5c3400293a2fa3d060bd425",
    tcgPlayer: 631368,
  },
  text: [
    {
      title: "Ward",
    },
    {
      title: "PUPPY BARKING",
      description: "While you have another Puppy character in play, this character gets +1 {L}.",
    },
  ],
  classifications: ["Storyborn", "Puppy"],
  abilities: [
    {
      id: "1x2-1",
      keyword: "Ward",
      text: "Ward",
      type: "keyword",
    },
    {
      effect: {
        modifier: 1,
        stat: "lore",
        target: "SELF",
        type: "modify-stat",
      },
      id: "1x2-2",
      text: "PUPPY BARKING While you have another Puppy character in play, this character gets +1 {L}.",
      type: "action",
    },
  ],
  i18n: patchPlayfulPupI18n,
};
