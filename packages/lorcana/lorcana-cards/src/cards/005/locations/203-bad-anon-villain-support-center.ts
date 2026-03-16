import type { LocationCard } from "@tcg/lorcana-types";

export const badanonVillainSupportCenter: LocationCard = {
  id: "rvD",
  canonicalId: "ci_Uqb",
  reprints: ["set5-203"],
  cardType: "location",
  name: "Bad-Anon",
  version: "Villain Support Center",
  i18n: {
    en: {
      name: "Bad-Anon",
      version: "Villain Support Center",
      text: [
        {
          title: "THERE'S NO ONE I'D RATHER BE THAN ME",
          description:
            'Villain characters gain "{E}, 3 {I} — Play a character with the same name as this character for free" while here.',
        },
      ],
    },
    de: {
      name: "Anonyme Bösewichte",
      version: "Zentrum für Schurkenunterstützung",
      text: [
        {
          title: "ICH",
          description:
            'MÖCHTE KEIN ANDERER SEIN ALS ICH Deine Schurken an diesem Ort erhalten: ", 3 — Spiele einen Charakter, mit demselben Namen wie dieser Charakter, kostenlos aus."',
        },
      ],
    },
    fr: {
      name: "Méchants anonymes",
      version: "Centre de soutien des méchants",
      text: [
        {
          title: "JE NE VOUDRAIS",
          description:
            'ÊTRE PERSONNE D\'AUTRE QUE MOI Les personnages Méchant sur ce lieu gagnent ", 3 — Jouez gratuitement un personnage avec le même nom que celui-ci."',
        },
      ],
    },
    it: {
      name: "Cattivi Anonimi",
      version: "Centro Assistenza Cattivi",
      text: [
        {
          title: "NON VORREI ESSERE NESSUN ALTRO A PARTE ME I",
          description:
            'personaggi Cattivo ottengono ", 3 — Gioca un personaggio con lo stesso nome di questo personaggio, gratis" mentre si trovano in questo luogo.',
        },
      ],
    },
  },
  inkType: ["steel"],
  franchise: "Wreck It Ralph",
  set: "005",
  cardNumber: 203,
  rarity: "rare",
  cost: 3,
  willpower: 7,
  moveCost: 2,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_c88d044f605440a29cbf41b7cdc7d340",
    tcgPlayer: 561978,
  },
  text: [
    {
      title: "THERE'S NO ONE I'D RATHER BE THAN ME",
      description:
        'Villain characters gain "{E}, 3 {I} — Play a character with the same name as this character for free" while here.',
    },
  ],
  abilities: [
    {
      effect: {
        type: "grant-abilities-while-here",
        target: {
          selector: "all",
          count: "all",
          owner: "any",
          zones: ["play"],
          cardTypes: ["character"],
          filter: [
            {
              type: "same-location-as-source",
            },
            {
              type: "has-classification",
              classification: "Villain",
            },
          ],
        },
        abilities: [
          {
            id: "1kj-1a",
            name: "THERE'S NO ONE I'D RATHER BE THAN ME",
            text: "{E}, 3 {I} — Play a character with the same name as this character for free.",
            type: "activated",
            cost: {
              exert: true,
              ink: 3,
            },
            effect: {
              cardType: "character",
              cost: "free",
              from: "hand",
              filter: {
                cardType: "character",
                sameNameAsSource: true,
              },
              type: "play-card",
            },
          },
        ],
      },
      id: "1kj-1",
      name: "THERE'S NO ONE I'D RATHER BE THAN ME",
      text: "THERE'S NO ONE I'D RATHER BE THAN ME Villain characters gain “{E}, 3 {I} — Play a character with the same name as this character for free” while here.",
      type: "static",
    },
  ],
};
