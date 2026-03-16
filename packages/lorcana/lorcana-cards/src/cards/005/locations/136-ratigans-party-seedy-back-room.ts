import type { LocationCard } from "@tcg/lorcana-types";

export const ratigansPartySeedyBackRoom: LocationCard = {
  id: "kAJ",
  canonicalId: "ci_dzD",
  reprints: ["set5-136"],
  cardType: "location",
  name: "Ratigan's Party",
  version: "Seedy Back Room",
  i18n: {
    en: {
      name: "Ratigan's Party",
      version: "Seedy Back Room",
      text: [
        {
          title: "MISFITS' REVELRY",
          description: "While you have a damaged character here, this location gets +2 {L}.",
        },
      ],
    },
    de: {
      name: "Rattenzahns Party",
      version: "Zwielichtiges Hinterzimmer",
      text: [
        {
          title: "FEIER DER MISSETÄTER",
          description:
            "Solange du mindestens einen beschädigten Charakter an diesem Ort hast, erhält dieser Ort +2.",
        },
      ],
    },
    fr: {
      name: "Fête de Ratigan",
      version: "Arrière-salle sordide",
      text: [
        {
          title: "FÊTE DES PARIAS",
          description:
            "Tant que vous avez un personnage ayant au moins un dommage sur lui sur ce lieu, ce lieu gagne +2.",
        },
      ],
    },
    it: {
      name: "Festa di Rattigan",
      version: "Stanzino Squallido",
      text: [
        {
          title: "LA BALDORIA DEI BALORDI",
          description:
            "Mentre hai un personaggio danneggiato in questo luogo, questo luogo riceve +2.",
        },
      ],
    },
  },
  inkType: ["ruby"],
  franchise: "Great Mouse Detective",
  set: "005",
  cardNumber: 136,
  rarity: "uncommon",
  cost: 2,
  willpower: 7,
  moveCost: 1,
  lore: 0,
  inkable: true,
  externalIds: {
    lorcast: "crd_4690391667a14f42a7df8ef76771703d",
    tcgPlayer: 562000,
  },
  text: [
    {
      title: "MISFITS' REVELRY",
      description: "While you have a damaged character here, this location gets +2 {L}.",
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
              type: "damaged",
            },
          ],
        },
        comparison: {
          operator: "gte",
          value: 1,
        },
      },
      effect: {
        modifier: 2,
        stat: "lore",
        target: "SELF",
        type: "modify-stat",
      },
      id: "1nd-1",
      name: "MISFITS' REVELRY",
      text: "MISFITS' REVELRY While you have a damaged character here, this location gets +2 {L}.",
      type: "static",
    },
  ],
};
