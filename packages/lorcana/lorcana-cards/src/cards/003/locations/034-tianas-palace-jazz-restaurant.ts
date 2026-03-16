import type { LocationCard } from "@tcg/lorcana-types";

export const tianasPalaceJazzRestaurant: LocationCard = {
  id: "MoB",
  canonicalId: "ci_MoB",
  reprints: ["set3-034"],
  cardType: "location",
  name: "Tiana's Palace",
  version: "Jazz Restaurant",
  i18n: {
    en: {
      name: "Tiana's Palace",
      version: "Jazz Restaurant",
      text: [
        {
          title: "NIGHT OUT",
          description: "Characters can't be challenged while here.",
        },
      ],
    },
    de: {
      name: "Tianas Palast",
      version: "Jazz Restaurant",
      text: [
        {
          title: "AUSGEHEN",
          description: "Charaktere an diesem Ort können nicht herausgefordert werden.",
        },
      ],
    },
    fr: {
      name: "Chez Tiana",
      version: "Restaurant de jazz",
      text: [
        {
          title: "SOIR DE SORTIE",
          description: "Les personnages sur ce lieu ne peuvent pas être défiés.",
        },
      ],
    },
    it: {
      name: "La Reggia di Tiana",
      version: "Ristorante Jazz",
      text: [
        {
          title: "UNA SERATA FUORI I",
          description: "personaggi non possono essere sfidati mentre si trovano in questo luogo.",
        },
      ],
    },
  },
  inkType: ["amber"],
  franchise: "Princess and the Frog",
  set: "003",
  cardNumber: 34,
  rarity: "uncommon",
  cost: 3,
  willpower: 8,
  moveCost: 2,
  lore: 1,
  inkable: false,
  externalIds: {
    lorcast: "crd_ed1ca708595f44a49f40680e20635ff5",
    tcgPlayer: 537408,
  },
  text: [
    {
      title: "NIGHT OUT",
      description: "Characters can't be challenged while here.",
    },
  ],
  abilities: [
    {
      effect: {
        restriction: "cant-be-challenged",
        target: "CHARACTERS_HERE",
        type: "restriction",
      },
      id: "1hy-1",
      text: "NIGHT OUT Characters can't be challenged while here.",
      type: "static",
    },
  ],
};
