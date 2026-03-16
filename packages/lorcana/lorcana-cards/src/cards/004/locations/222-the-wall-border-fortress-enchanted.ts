import type { LocationCard } from "@tcg/lorcana-types";

export const theWallBorderFortressEnchanted: LocationCard = {
  id: "YlC",
  canonicalId: "ci_oUR",
  reprints: ["set4-203"],
  cardType: "location",
  name: "The Wall",
  version: "Border Fortress",
  i18n: {
    en: {
      name: "The Wall",
      version: "Border Fortress",
      text: [
        {
          title: "PROTECT THE REALM",
          description:
            "While you have an exerted character here, your other locations can't be challenged.",
        },
      ],
    },
    de: {
      name: "Die Mauer",
      version: "Grenzfestung",
      text: [
        {
          title: "DAS REICH SCHÜTZEN",
          description:
            "Solange du mindestens einen erschöpften Charakter an diesem Ort hast, können deine anderen Orte nicht herausgefordert werden.",
        },
      ],
    },
    fr: {
      name: "La Muraille",
      version: "Fortification frontalière",
      text: [
        {
          title: "PROTÉGER LE ROYAUME",
          description:
            "Tant que vous avez un personnage épuisé sur ce lieu, vos autres lieux ne peuvent pas être défiés.",
        },
      ],
    },
    it: {
      name: "La Muraglia",
      version: "Fortezza di Confine",
      text: [
        {
          title: "PROTEGGERE IL REGNO",
          description:
            "Mentre hai un personaggio impegnato in questo luogo, i tuoi altri luoghi non possono essere sfidati.",
        },
      ],
    },
  },
  inkType: ["steel"],
  franchise: "Mulan",
  set: "004",
  cardNumber: 222,
  rarity: "enchanted",
  specialRarity: "enchanted",
  cost: 4,
  willpower: 8,
  moveCost: 2,
  lore: 0,
  inkable: true,
  externalIds: {
    lorcast: "crd_ae2a969b746542268ff0bcfc735ea367",
    tcgPlayer: 550536,
  },
  text: [
    {
      title: "PROTECT THE REALM",
      description:
        "While you have an exerted character here, your other locations can't be challenged.",
    },
  ],
  abilities: [
    {
      condition: {
        type: "target-query",
        query: {
          selector: "all",
          owner: "you",
          zones: ["play"],
          cardType: "character",
          filters: [
            {
              type: "same-location-as-source",
            },
            {
              type: "exerted",
            },
          ],
        },
        comparison: {
          operator: "gte",
          value: 1,
        },
      },
      effect: {
        restriction: "cant-be-challenged",
        target: {
          selector: "all",
          count: "all",
          owner: "you",
          cardTypes: ["location"],
          zones: ["play"],
          excludeSelf: true,
        },
        type: "restriction",
      },
      id: "1rp-1",
      name: "PROTECT THE REALM",
      text: "PROTECT THE REALM While you have an exerted character here, your other locations can't be challenged.",
      type: "static",
    },
  ],
};
