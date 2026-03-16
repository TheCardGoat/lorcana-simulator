import type { LocationCard } from "@tcg/lorcana-types";

export const prideLandsJungleOasis: LocationCard = {
  id: "sC1",
  canonicalId: "ci_sC1",
  reprints: ["set5-034"],
  cardType: "location",
  name: "Pride Lands",
  version: "Jungle Oasis",
  i18n: {
    en: {
      name: "Pride Lands",
      version: "Jungle Oasis",
      text: [
        {
          title: "OUR HUMBLE HOME",
          description:
            "While you have 3 or more characters here, you may banish this location to play a character from your discard for free.",
        },
      ],
    },
    de: {
      name: "Das Geweihte Land",
      version: "Dschungeloase",
      text: [
        {
          title: "UNSER BESCHEIDENES ZUHAUSE",
          description:
            "Solange du mindestens 3 Charaktere an diesem Ort hast, darfst du diesen Ort verbannen, um einen Charakter von deinem Ablagestapel kostenlos auszuspielen.",
        },
      ],
    },
    fr: {
      name: "La Terre des Lions",
      version: "Oasis de la jungle",
      text: [
        {
          title: "NOTRE HUMBLE CHEZ-NOUS",
          description:
            "Tant qu'il y a 3 personnages ou plus sur ce lieu, vous pouvez bannir ce lieu pour jouer gratuitement un personnage de votre défausse.",
        },
      ],
    },
    it: {
      name: "Terre del Branco",
      version: "Oasi nella Giungla",
      text: [
        {
          title: "LA NOSTRA UMILE CASA",
          description:
            "Mentre hai 3 o più personaggi in questo luogo, puoi esiliare questo luogo per giocare un personaggio dai tuoi scarti gratis.",
        },
      ],
    },
  },
  inkType: ["amber"],
  franchise: "Lion King",
  set: "005",
  cardNumber: 34,
  rarity: "rare",
  cost: 3,
  willpower: 8,
  moveCost: 2,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_210e4fd42fff4273b7ed916683431def",
    tcgPlayer: 561189,
  },
  text: [
    {
      title: "OUR HUMBLE HOME",
      description:
        "While you have 3 or more characters here, you may banish this location to play a character from your discard for free.",
    },
  ],
  abilities: [
    {
      cost: {},
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
          ],
        },
        comparison: {
          operator: "gte",
          value: 3,
        },
      },
      effect: {
        chooser: "CONTROLLER",
        effect: {
          steps: [
            {
              target: {
                selector: "self",
                count: 1,
                owner: "any",
                zones: ["play"],
                cardTypes: ["location"],
              },
              type: "banish",
            },
            {
              condition: {
                type: "if-you-do",
              },
              then: {
                cost: "free",
                filter: {
                  cardType: "character",
                },
                from: "discard",
                type: "play-card",
              },
              type: "conditional",
            },
          ],
          type: "sequence",
        },
        type: "optional",
      },
      id: "5wg-1",
      text: "OUR HUMBLE HOME While you have 3 or more characters here, you may banish this location to play a character from your discard for free.",
      type: "activated",
    },
  ],
};
