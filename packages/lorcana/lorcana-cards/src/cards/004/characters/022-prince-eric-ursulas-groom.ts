import type { CharacterCard } from "@tcg/lorcana-types";
import { princeEricUrsulasGroomI18n } from "./022-prince-eric-ursulas-groom.i18n";

export const princeEricUrsulasGroom: CharacterCard = {
  id: "sTh",
  canonicalId: "ci_sTh",
  reprints: ["set4-022"],
  cardType: "character",
  name: "Prince Eric",
  version: "Ursula's Groom",
  inkType: ["amber"],
  franchise: "Little Mermaid",
  set: "004",
  cardNumber: 22,
  rarity: "uncommon",
  cost: 6,
  strength: 5,
  willpower: 5,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_58e889f440504f44b3283ed76f3f54a4",
    tcgPlayer: 550561,
  },
  text: [
    {
      title: "Shift 4",
    },
    {
      title: "UNDER VANESSA'S SPELL",
      description:
        "While you have a character named Ursula in play, this character gains Bodyguard and gets +2 {W}. (An opposing character who challenges one of your characters must choose one with Bodyguard if able.)",
    },
  ],
  classifications: ["Floodborn", "Hero", "Prince"],
  abilities: [
    {
      cost: {
        ink: 4,
      },
      id: "1rd-1",
      keyword: "Shift",
      text: "Shift 4",
      type: "keyword",
    },
    {
      effect: {
        steps: [
          {
            keyword: "Bodyguard",
            target: "SELF",
            type: "gain-keyword",
          },
          {
            modifier: 2,
            stat: "willpower",
            target: "CHOSEN_CHARACTER",
            type: "modify-stat",
          },
        ],
        type: "sequence",
      },
      id: "1rd-2",
      text: "UNDER VANESSA'S SPELL While you have a character named Ursula in play, this character gains Bodyguard and gets +2 {W}.",
      type: "action",
    },
  ],
  i18n: princeEricUrsulasGroomI18n,
};
