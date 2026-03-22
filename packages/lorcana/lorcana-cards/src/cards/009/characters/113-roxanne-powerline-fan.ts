import type { CharacterCard } from "@tcg/lorcana-types";
import { roxannePowerlineFanI18n } from "./113-roxanne-powerline-fan.i18n";

export const roxannePowerlineFan: CharacterCard = {
  id: "rlI",
  canonicalId: "ci_rlI",
  reprints: ["set9-113"],
  cardType: "character",
  name: "Roxanne",
  version: "Powerline Fan",
  inkType: ["ruby"],
  franchise: "Goofy Movie",
  set: "009",
  cardNumber: 113,
  rarity: "uncommon",
  cost: 2,
  strength: 2,
  willpower: 3,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_1d1f302d846749939eb57dbe5013d807",
    tcgPlayer: 650049,
  },
  text: [
    {
      title: "CONCERT LOVER",
      description:
        "While you have a character with Singer in play, this character gets +1 {S} and +1 {L}.",
    },
  ],
  classifications: ["Storyborn", "Ally"],
  abilities: [
    {
      effect: {
        modifier: 1,
        stat: "strength",
        target: "SELF",
        type: "modify-stat",
      },
      id: "1w5-1",
      text: "CONCERT LOVER While you have a character with Singer in play, this character gets +1 {S} and +1 {L}.",
      type: "action",
    },
  ],
  i18n: roxannePowerlineFanI18n,
};
