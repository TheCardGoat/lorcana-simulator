import type { CharacterCard } from "@tcg/lorcana-types";

export const almaMadrigalAcceptingGrandmother: CharacterCard = {
  id: "s3D",
  canonicalId: "ci_s3D",
  reprints: ["set8-034"],
  cardType: "character",
  name: "Alma Madrigal",
  version: "Accepting Grandmother",
  i18n: {
    en: {
      name: "Alma Madrigal",
      version: "Accepting Grandmother",
      text: [
        {
          title: "THE MIRACLE IS YOU",
          description:
            "Once during your turn, whenever one or more of your characters sings a song, you may ready those characters.",
        },
      ],
    },
    de: {
      name: "Alma Madrigal",
      version: "Akzeptierende Großmutter",
      text: [
        {
          title: "DAS WUNDER, DAS SEID IHR",
          description:
            "Einmal während deines Zuges, wenn einer oder mehrere deiner Charaktere ein Lied singen, darfst du jene Charaktere bereit machen.",
        },
      ],
    },
    fr: {
      name: "Alma Madrigal",
      version: "Grand-mère en rédemption",
      text: [
        {
          title: "MON MIRACLE, C'EST VOUS",
          description:
            "Une fois durant votre tour, lorsqu'un ou plusieurs de vos personnages chantent une chanson, vous pouvez redresser le ou les personnages qui viennent de chanter.",
        },
      ],
    },
    it: {
      name: "Alma Madrigal",
      version: "Nonna Accogliente",
      text: [
        {
          title: "L'AMORE FRA DI NOI",
          description:
            "Una volta durante il tuo turno, ogni volta che uno o più dei tuoi personaggi canta una canzone, puoi preparare quei personaggi.",
        },
      ],
    },
  },
  inkType: ["amber", "amethyst"],
  franchise: "Encanto",
  set: "008",
  cardNumber: 34,
  rarity: "uncommon",
  cost: 6,
  strength: 5,
  willpower: 5,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_387766e68940442bb6c5b7e29d18626f",
    tcgPlayer: 631374,
  },
  text: [
    {
      title: "THE MIRACLE IS YOU",
      description:
        "Once during your turn, whenever one or more of your characters sings a song, you may ready those characters.",
    },
  ],
  classifications: ["Storyborn", "Mentor", "Madrigal"],
  abilities: [
    {
      effect: {
        chooser: "CONTROLLER",
        effect: {
          target: {
            selector: "chosen",
            count: 1,
            owner: "any",
            zones: ["play"],
            cardTypes: ["character"],
          },
          type: "ready",
        },
        type: "optional",
      },
      id: "1sw-1",
      name: "THE MIRACLE IS YOU Once",
      text: "THE MIRACLE IS YOU Once during your turn, whenever one or more of your characters sings a song, you may ready those characters.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
