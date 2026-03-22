import type { CharacterCard } from "@tcg/lorcana-types";
import { archimedesElectrifiedOwlEnchantedI18n } from "./208-archimedes-electrified-owl-enchanted.i18n";

export const archimedesElectrifiedOwlEnchanted: CharacterCard = {
  id: "rAP",
  canonicalId: "ci_CCb",
  reprints: ["set5-047"],
  cardType: "character",
  name: "Archimedes",
  version: "Electrified Owl",
  inkType: ["amethyst"],
  franchise: "Sword in the Stone",
  set: "005",
  cardNumber: 208,
  rarity: "enchanted",
  specialRarity: "enchanted",
  cost: 5,
  strength: 1,
  willpower: 4,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_cb38cec5fa8e49139bb0377111d6d048",
    tcgPlayer: 561977,
  },
  text: [
    {
      title: "Shift 3",
    },
    {
      title: "Evasive",
    },
    {
      title: "Challenger +3",
    },
  ],
  classifications: ["Floodborn", "Ally"],
  abilities: [
    {
      id: "oah-1",
      cost: {
        ink: 3,
      },
      keyword: "Shift",
      type: "keyword",
      text: "Shift 3",
    },
    {
      id: "oah-2",
      keyword: "Evasive",
      type: "keyword",
      text: "Evasive",
    },
    {
      id: "oah-3",
      keyword: "Challenger",
      type: "keyword",
      value: 3,
      text: "Challenger +3",
    },
  ],
  i18n: archimedesElectrifiedOwlEnchantedI18n,
};
