import type { CharacterCard } from "@tcg/lorcana-types";
import { lumiereFieryFriendI18n } from "./121-lumiere-fiery-friend.i18n";

export const lumiereFieryFriend: CharacterCard = {
  id: "qzx",
  canonicalId: "ci_fE7",
  reprints: ["set4-113", "set9-121"],
  cardType: "character",
  name: "Lumiere",
  version: "Fiery Friend",
  inkType: ["ruby"],
  franchise: "Beauty and the Beast",
  set: "009",
  cardNumber: 121,
  rarity: "rare",
  cost: 2,
  strength: 2,
  willpower: 2,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_724fef83bb594bbf883b6fc1bcc6d4e2",
    tcgPlayer: 650056,
  },
  text: [
    {
      title: "FERVENT ADDRESS",
      description: "Your other characters get +1 {S}.",
    },
  ],
  classifications: ["Dreamborn", "Ally"],
  abilities: [
    {
      effect: {
        modifier: 1,
        stat: "strength",
        target: "YOUR_CHARACTERS",
        type: "modify-stat",
      },
      id: "xyr-1",
      name: "FERVENT ADDRESS Your other",
      text: "FERVENT ADDRESS Your other characters get +1 {S}.",
      type: "static",
    },
  ],
  i18n: lumiereFieryFriendI18n,
};
