import type { CharacterCard } from "@tcg/lorcana-types";

export const liShangValiantLeader: CharacterCard = {
  id: "qoa",
  canonicalId: "ci_qoa",
  reprints: ["set11-183"],
  cardType: "character",
  name: "Li Shang",
  version: "Valiant Leader",
  i18n: {
    en: {
      name: "Li Shang",
      version: "Valiant Leader",
      text: "Shift 4 {I}",
    },
    de: {
      name: "Li Shang",
      version: "Tapferer Anführer",
      text: "Gestaltwandel 4",
    },
    fr: {
      name: "Li Shang",
      version: "Meneur vaillant",
      text: "Alter 4",
    },
    it: {
      name: "Li Shang",
      version: "Leader Valoroso",
      text: "Trasformazione 4",
    },
  },
  inkType: ["steel"],
  franchise: "Mulan",
  set: "011",
  cardNumber: 183,
  rarity: "uncommon",
  cost: 7,
  strength: 9,
  willpower: 5,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_cf304010edfd42ddb7e2a2ee5702f7ab",
    tcgPlayer: 676240,
  },
  text: "Shift 4 {I}",
  classifications: ["Floodborn", "Hero", "Captain"],
  abilities: [
    {
      id: "25z-1",
      cost: {
        ink: 4,
      },
      keyword: "Shift",
      type: "keyword",
      text: "Shift 4 {I}",
    },
  ],
};
