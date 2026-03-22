import type { CharacterCard } from "@tcg/lorcana-types";
import { ratiganPartyCrasherI18n } from "./123-ratigan-party-crasher.i18n";

export const ratiganPartyCrasher: CharacterCard = {
  id: "7v2",
  canonicalId: "ci_7v2",
  reprints: ["set5-123"],
  cardType: "character",
  name: "Ratigan",
  version: "Party Crasher",
  inkType: ["ruby"],
  franchise: "Great Mouse Detective",
  set: "005",
  cardNumber: 123,
  rarity: "rare",
  cost: 7,
  strength: 5,
  willpower: 5,
  lore: 3,
  inkable: false,
  externalIds: {
    lorcast: "crd_e49684f046464f2fac248bd11ba54f5d",
    tcgPlayer: 557537,
  },
  text: [
    {
      title: "Shift 4",
    },
    {
      title: "Evasive",
    },
    {
      title: "DELIGHTFULLY WICKED",
      description: "Your damaged characters get +2 {S}.",
    },
  ],
  classifications: ["Floodborn", "Villain"],
  abilities: [
    {
      cost: {
        ink: 4,
      },
      id: "1b4-1",
      keyword: "Shift",
      text: "Shift 4",
      type: "keyword",
    },
    {
      id: "1b4-2",
      keyword: "Evasive",
      text: "Evasive",
      type: "keyword",
    },
    {
      effect: {
        modifier: 2,
        stat: "strength",
        target: "YOUR_CHARACTERS",
        type: "modify-stat",
      },
      id: "1b4-3",
      name: "DELIGHTFULLY WICKED Your damaged",
      text: "DELIGHTFULLY WICKED Your damaged characters get +2 {S}.",
      type: "static",
    },
  ],
  i18n: ratiganPartyCrasherI18n,
};
