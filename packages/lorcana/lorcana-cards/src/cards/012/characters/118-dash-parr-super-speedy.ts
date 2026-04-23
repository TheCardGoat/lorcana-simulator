import type { CharacterCard } from "@tcg/lorcana-types";
import { rush } from "../../../helpers/abilities/rush";
import { dashParrSuperSpeedyI18n } from "./118-dash-parr-super-speedy.i18n";

export const dashParrSuperSpeedy: CharacterCard = {
  id: "eme",
  canonicalId: "ci_eme",
  reprints: ["set12-118"],
  cardType: "character",
  name: "Dash Parr",
  version: "Super Speedy",
  inkType: ["ruby"],
  franchise: "Incredibles",
  set: "012",
  cardNumber: 118,
  rarity: "uncommon",
  cost: 5,
  strength: 6,
  willpower: 5,
  lore: 1,
  inkable: false,
  externalIds: {
    lorcast: "crd_160175c3b760464390790a1a4b6f206f",
  },
  text: [
    {
      title: "Rush",
    },
  ],
  classifications: ["Storyborn", "Super", "Hero"],
  abilities: [rush],
  i18n: dashParrSuperSpeedyI18n,
};
