import type { CharacterCard } from "@tcg/lorcana-types";

export const grammaTalaConnectedToNature: CharacterCard = {
  id: "iSA",
  canonicalId: "ci_iSA",
  reprints: ["set11-148"],
  cardType: "character",
  name: "Gramma Tala",
  version: "Connected to Nature",
  i18n: {
    en: {
      name: "Gramma Tala",
      version: "Connected to Nature",
      text: [
        {
          title: "ANCESTORS' GIFT",
          description: "For each card in your inkwell, you pay 1 {I} less to play this character.",
        },
      ],
    },
    de: {
      name: "Gramma Tala",
      version: "Naturverbunden",
      text: [
        {
          title: "DAS GESCHENK DER AHNEN",
          description:
            "Für jede Karte in deinem Tintenvorrat zahlst du 1 weniger, um diesen Charakter auszuspielen.",
        },
      ],
    },
    fr: {
      name: "Grand-mère Tala",
      version: "En communion avec la nature",
      text: [
        {
          title: "DON DES ANCIENS",
          description:
            "Jouer ce personnage vous coûte 1 de moins pour chaque carte dans votre réserve d'encre.",
        },
      ],
    },
    it: {
      name: "Nonna Tala",
      version: "Connessa con la Natura",
      text: [
        {
          title: "DONO DEGLI ANTENATI",
          description:
            "Per ogni carta nel tuo calamaio, paga 1 in meno per giocare questo personaggio.",
        },
      ],
    },
  },
  inkType: ["sapphire"],
  franchise: "Moana",
  set: "011",
  cardNumber: 148,
  rarity: "rare",
  cost: 12,
  strength: 6,
  willpower: 6,
  lore: 2,
  inkable: false,
  externalIds: {
    lorcast: "crd_600ad28b57694ad2b078261118277ad2",
    tcgPlayer: 673343,
  },
  text: [
    {
      title: "ANCESTORS' GIFT",
      description: "For each card in your inkwell, you pay 1 {I} less to play this character.",
    },
  ],
  classifications: ["Storyborn", "Mentor"],
  abilities: [
    {
      id: "9jo-1",
      effect: {
        from: "hand",
        type: "play-card",
      },
      type: "action",
      text: "ANCESTORS’ GIFT For each card in your inkwell, you pay 1 {I} less to play this character.",
    },
  ],
};
