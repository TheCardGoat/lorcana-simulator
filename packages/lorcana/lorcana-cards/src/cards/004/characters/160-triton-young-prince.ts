import type { CharacterCard } from "@tcg/lorcana-types";

export const tritonYoungPrince: CharacterCard = {
  id: "A80",
  canonicalId: "ci_A80",
  reprints: ["set4-160"],
  cardType: "character",
  name: "Triton",
  version: "Young Prince",
  i18n: {
    en: {
      name: "Triton",
      version: "Young Prince",
      text: [
        {
          title: "SUPERIOR SWIMMER",
          description:
            "During your turn, this character gains Evasive. (They can challenge characters with Evasive.)",
        },
        {
          title: "KEEPER OF ATLANTICA",
          description:
            "Whenever one of your locations is banished, you may put that card into your inkwell facedown and exerted.",
        },
      ],
    },
    de: {
      name: "Triton",
      version: "Junger Prinz",
      text: [
        {
          title: "HERVORRAGENDER SCHWIMMER",
          description:
            "In deinem Zug erhält dieser Charakter Wendig. (Er kann Charaktere mit Wendig herausfordern.)",
        },
        {
          title: "WÄCHTER VON ATLANTICA",
          description:
            "Jedes Mal, wenn einer deiner Orte verbannt wird, darfst du jenen verdeckt und erschöpft in deinen Tintenvorrat legen.",
        },
      ],
    },
    fr: {
      name: "Triton",
      version: "Jeune Prince",
      text: [
        {
          title: "NAGEUR EXCEPTIONNEL",
          description:
            "Durant votre tour, ce personnage gagne Insaisissable. (Il peut défier les personnages avec Insaisissable.)",
        },
        {
          title: "GARDIEN D'ATLANTICA",
          description:
            "Chaque fois que l'un de vos lieux est banni, vous pouvez le placer dans votre réserve d'encre, face cachée et épuisé.",
        },
      ],
    },
    it: {
      name: "Tritone",
      version: "Giovane Principe",
      text: [
        {
          title: "NUOTATORE PROVETTO",
          description:
            "Durante il tuo turno, questo personaggio ottiene Sfuggente. (Può sfidare altri personaggi con Sfuggente.)",
        },
        {
          title: "CUSTODE DI ATLANTICA",
          description:
            "Ogni volta che uno dei tuoi luoghi viene esiliato, puoi aggiungere quella carta al tuo calamaio, a faccia in giù e impegnata.",
        },
      ],
    },
  },
  inkType: ["sapphire"],
  franchise: "Little Mermaid",
  set: "004",
  cardNumber: 160,
  rarity: "uncommon",
  cost: 4,
  strength: 3,
  willpower: 4,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_ba5d06b298f545f8a2df2df6accd3294",
    tcgPlayer: 550612,
  },
  text: [
    {
      title: "SUPERIOR SWIMMER",
      description:
        "During your turn, this character gains Evasive. (They can challenge characters with Evasive.)",
    },
    {
      title: "KEEPER OF ATLANTICA",
      description:
        "Whenever one of your locations is banished, you may put that card into your inkwell facedown and exerted.",
    },
  ],
  classifications: ["Dreamborn", "Prince"],
  abilities: [
    {
      condition: {
        type: "turn",
        whose: "your",
      },
      effect: {
        keyword: "Evasive",
        target: "SELF",
        type: "gain-keyword",
      },
      id: "si2-1",
      text: "SUPERIOR SWIMMER During your turn, this character gains Evasive.",
      type: "static",
    },
    {
      effect: {
        chooser: "CONTROLLER",
        effect: {
          exerted: true,
          facedown: true,
          source: {
            ref: "trigger-source",
          },
          target: "CONTROLLER",
          type: "put-into-inkwell",
        },
        type: "optional",
      },
      id: "si2-2",
      name: "KEEPER OF ATLANTICA",
      text: "KEEPER OF ATLANTICA Whenever one of your locations is banished, you may put that card into your inkwell facedown and exerted.",
      trigger: {
        event: "banish",
        on: "YOUR_LOCATIONS",
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
};
