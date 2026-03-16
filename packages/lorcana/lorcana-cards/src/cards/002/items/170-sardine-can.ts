import type { ItemCard } from "@tcg/lorcana-types";

export const sardineCan: ItemCard = {
  id: "QGa",
  canonicalId: "ci_QGa",
  reprints: ["set2-170"],
  cardType: "item",
  name: "Sardine Can",
  i18n: {
    en: {
      name: "Sardine Can",
      text: [
        {
          title: "FLIGHT CABIN",
          description: "Your exerted characters gain Ward.",
        },
      ],
    },
    de: {
      name: "Sardinenbüchse",
      text: [
        {
          title: "FLUGKABINE",
          description:
            "Deine erschöpften Charaktere erhalten Behütet. (Gegnerische Karten können die Charaktere nicht auswählen, außer um sie herauszufordern.)",
        },
      ],
    },
    fr: {
      name: "Boîte de sardines",
      text: [
        {
          title: "CABINE DE VOL",
          description:
            "Vos personnages épuisés gagnent Hors d'atteinte. (Ils ne peuvent pas être choisis par vos adversaires, hormis pour un défi.)",
        },
      ],
    },
    it: {
      name: "Sardine Can",
      text: [
        {
          title: "FLIGHT CABIN",
          description:
            "Your exerted characters gain Ward. (Opponents can't choose them except to challenge.)",
        },
      ],
    },
  },
  inkType: ["sapphire"],
  franchise: "Rescuers",
  set: "002",
  cardNumber: 170,
  rarity: "uncommon",
  cost: 4,
  inkable: true,
  externalIds: {
    lorcast: "crd_ac6b41f1d4314cd48a6c0e40b01203fd",
    tcgPlayer: 527771,
  },
  text: [
    {
      title: "FLIGHT CABIN",
      description: "Your exerted characters gain Ward.",
    },
  ],
  abilities: [
    {
      effect: {
        keyword: "Ward",
        target: "YOUR_CHARACTERS",
        type: "gain-keyword",
      },
      id: "2oi-1",
      name: "FLIGHT CABIN Your exerted",
      text: "FLIGHT CABIN Your exerted characters gain Ward.",
      type: "static",
    },
  ],
};
