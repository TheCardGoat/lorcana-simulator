import type { ItemCard } from "@tcg/lorcana-types";

export const jeweledCollar: ItemCard = {
  id: "nJm",
  canonicalId: "ci_nJm",
  reprints: ["set8-120"],
  cardType: "item",
  name: "Jeweled Collar",
  i18n: {
    en: {
      name: "Jeweled Collar",
      text: [
        {
          title: "WELCOME EXTRAVAGANCE",
          description:
            "Whenever one of your characters is challenged, you may put the top card of your deck into your inkwell facedown and exerted.",
        },
      ],
    },
    de: {
      name: "Juwelenhalsband",
      text: [
        {
          title: "WILLKOMMEN EXTRAVAGANZ",
          description:
            "Jedes Mal, wenn einer deiner Charaktere herausgefordert wird, darfst du die oberste Karte deines Decks verdeckt und erschöpft in deinen Tintenvorrat legen.",
        },
      ],
    },
    fr: {
      name: "Collier incrusté",
      text: [
        {
          title: "EXTRAVAGANT ET DE BON GOÛT",
          description:
            "Chaque fois que l'un de vos personnages est défié, vous pouvez placer la carte du dessus de votre pioche dans votre réserve d'encre, face cachée et épuisée.",
        },
      ],
    },
    it: {
      name: "Collare Ingioiellato",
      text: [
        {
          title: "BENVENUTA STRAVAGANZA",
          description:
            "Ogni volta che uno dei tuoi personaggi viene sfidato, puoi aggiungere la prima carta del tuo mazzo al tuo calamaio, a faccia in giù e impegnata.",
        },
      ],
    },
  },
  inkType: ["emerald", "sapphire"],
  franchise: "Aristocats",
  set: "008",
  cardNumber: 120,
  rarity: "uncommon",
  cost: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_ee5ef7def0ca4c6a9ed3fac74fb1d1b4",
    tcgPlayer: 631764,
  },
  text: [
    {
      title: "WELCOME EXTRAVAGANCE",
      description:
        "Whenever one of your characters is challenged, you may put the top card of your deck into your inkwell facedown and exerted.",
    },
  ],
  abilities: [
    {
      effect: {
        chooser: "CONTROLLER",
        effect: {
          exerted: true,
          facedown: true,
          source: "top-of-deck",
          target: "CONTROLLER",
          type: "put-into-inkwell",
        },
        type: "optional",
      },
      id: "19v-1",
      name: "WELCOME EXTRAVAGANCE",
      text: "WELCOME EXTRAVAGANCE Whenever one of your characters is challenged, you may put the top card of your deck into your inkwell facedown and exerted.",
      trigger: {
        event: "challenged",
        on: {
          controller: "you",
          cardType: "character",
        },
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
};
