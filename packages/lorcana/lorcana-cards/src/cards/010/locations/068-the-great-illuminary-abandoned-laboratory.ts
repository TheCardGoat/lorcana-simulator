import type { LocationCard } from "@tcg/lorcana-types";

export const theGreatIlluminaryAbandonedLaboratory: LocationCard = {
  id: "CGw",
  canonicalId: "ci_CGw",
  reprints: ["set10-068"],
  cardType: "location",
  name: "The Great Illuminary",
  version: "Abandoned Laboratory",
  i18n: {
    en: {
      name: "The Great Illuminary",
      version: "Abandoned Laboratory",
      text: [
        {
          title: "STARTLING DISCOVERY",
          description: 'Characters gain " {E} — Draw a card" while here.',
        },
      ],
    },
    de: {
      name: "Das Große Illuminarium",
      version: "Verlassenes Labor",
      text: [
        {
          title: "ERSTAUNLICHE ENTDECKUNG",
          description: 'Deine Charaktere an diesem Ort erhalten " — Ziehe 1 Karte".',
        },
      ],
    },
    fr: {
      name: "Le grand Illuminarium",
      version: "Laboratoire abandonné",
      text: [
        {
          title: "TROUBLANTE",
          description: 'DÉCOUVERTE Les personnages sur ce lieu gagnent " — Piochez une carte."',
        },
      ],
    },
    it: {
      name: "Il Grande Illuminarium",
      version: "Laboratorio Abbandonato",
      text: [
        {
          title: "SCOPERTA SCONCERTANTE I",
          description:
            'personaggi ottengono " — Pesca una carta" mentre si trovano in questo luogo.',
        },
      ],
    },
  },
  inkType: ["amethyst"],
  franchise: "Lorcana",
  set: "010",
  cardNumber: 68,
  rarity: "uncommon",
  cost: 2,
  willpower: 3,
  moveCost: 1,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_f0a21489090449a4af62aa6f09ad9552",
    tcgPlayer: 658467,
  },
  text: [
    {
      title: "STARTLING DISCOVERY",
      description: 'Characters gain " {E} — Draw a card" while here.',
    },
  ],
  abilities: [
    {
      id: "9qd-1",
      name: "STARTLING DISCOVERY",
      text: 'STARTLING DISCOVERY Characters gain "{E} — Draw a card" while here.',
      type: "static",
      effect: {
        type: "grant-abilities-while-here",
        target: "CHARACTERS_HERE",
        abilities: [
          {
            id: "9qd-1a",
            name: "STARTLING DISCOVERY",
            text: "{E} — Draw a card.",
            type: "activated",
            cost: {
              exert: true,
            },
            effect: {
              amount: 1,
              target: "CONTROLLER",
              type: "draw",
            },
          },
        ],
      },
    },
  ],
};
