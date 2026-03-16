import type { CharacterCard } from "@tcg/lorcana-types";

export const gustavTheGiantTerrorOfTheKingdom: CharacterCard = {
  id: "25w",
  canonicalId: "ci_25w",
  reprints: ["set3-173"],
  cardType: "character",
  name: "Gustav the Giant",
  version: "Terror of the Kingdom",
  i18n: {
    en: {
      name: "Gustav the Giant",
      version: "Terror of the Kingdom",
      text: [
        {
          title: "ALL TIED UP",
          description:
            "This character enters play exerted and can't ready at the start of your turn.",
        },
        {
          title: "BREAK FREE",
          description:
            "During your turn, whenever one of your other characters banishes another character in a challenge, you may ready this character.",
        },
      ],
    },
    de: {
      name: "Gustav der Riese",
      version: "Schrecken des Königreichs",
      text: [
        {
          title: "GEFESSELT",
          description:
            "Dieser Charakter kommt erschöpft ins Spiel und wird zu Beginn deines Zuges nicht bereit gemacht.",
        },
        {
          title: "BEFREIEN",
          description:
            "Jedes Mal, wenn einer deiner anderen Charaktere in deinem Zug durch eine Herausforderung einen anderen Charakter verbannt, darfst du diesen Charakter bereit machen.",
        },
      ],
    },
    fr: {
      name: "Gustave le Géant",
      version: "Terreur du royaume",
      text: [
        {
          title: "LIGOTÉ",
          description:
            "Ce personnage entre en jeu épuisé et ne se redresse pas au début de votre tour.",
        },
        {
          title: "LIBÉRÉ",
          description:
            "Chaque fois que l'un de vos autres personnages en bannit un autre via un défi durant votre tour, vous pouvez redresser ce personnage.",
        },
      ],
    },
    it: {
      name: "Gustav il Gigante",
      version: "Terrore del Regno",
      text: [
        {
          title: "LEGATO",
          description:
            "Questo personaggio entra in gioco impegnato e non si può preparare all'inizio del tuo turno.",
        },
        {
          title: "LIBERARSI",
          description:
            "Durante il tuo turno, ogni volta che uno dei tuoi altri personaggi esilia un altro personaggio in una sfida, puoi preparare questo personaggio.",
        },
      ],
    },
  },
  inkType: ["steel"],
  set: "003",
  cardNumber: 173,
  rarity: "rare",
  cost: 3,
  strength: 6,
  willpower: 6,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_2977bf4ea525446f9f26eb7c272ed37b",
    tcgPlayer: 539105,
  },
  text: [
    {
      title: "ALL TIED UP",
      description: "This character enters play exerted and can't ready at the start of your turn.",
    },
    {
      title: "BREAK FREE",
      description:
        "During your turn, whenever one of your other characters banishes another character in a challenge, you may ready this character.",
    },
  ],
  classifications: ["Dreamborn", "Villain"],
  missingTests: true,
  abilities: [
    {
      effect: {
        steps: [
          {
            restriction: "enters-play-exerted",
            target: "SELF",
            type: "restriction",
          },
          {
            restriction: "cant-ready",
            target: "SELF",
            type: "restriction",
          },
        ],
        type: "sequence",
      },
      id: "5zz-1",
      name: "ALL TIED UP",
      text: "ALL TIED UP This character enters play exerted and can't ready at the start of your turn.",
      type: "static",
    },
    {
      effect: {
        chooser: "CONTROLLER",
        effect: {
          target: {
            selector: "self",
            count: 1,
            owner: "any",
            zones: ["play"],
            cardTypes: ["character"],
          },
          type: "ready",
        },
        type: "optional",
      },
      id: "5zz-2",
      name: "BREAK FREE",
      text: "BREAK FREE During your turn, whenever one of your other characters banishes another character in a challenge, you may ready this character.",
      trigger: {
        event: "banish",
        on: "YOUR_OTHER_CHARACTERS",
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
};
