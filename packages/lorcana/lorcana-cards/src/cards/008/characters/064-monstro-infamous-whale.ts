import type { CharacterCard } from "@tcg/lorcana-types";

export const monstroInfamousWhale: CharacterCard = {
  id: "kcf",
  canonicalId: "ci_kcf",
  reprints: ["set8-064"],
  cardType: "character",
  name: "Monstro",
  version: "Infamous Whale",
  i18n: {
    en: {
      name: "Monstro",
      version: "Infamous Whale",
      text: [
        {
          title: "Rush",
        },
        {
          title: "FULL BREACH",
          description:
            "Choose and discard a card — Ready this character. He can't quest for the rest of this turn.",
        },
      ],
    },
    de: {
      name: "Monstro",
      version: "Berüchtigter Wal",
      text: "Rasant VOLLER DURCHBRUCH Wähle eine Karte aus deiner Hand und wirf sie ab — Mache diesen Charakter bereit. Er kann in diesem Zug nicht mehr erkunden.",
    },
    fr: {
      name: "Monstro",
      version: "Baleine tristement célèbre",
      text: "Charge PERCÉE COMPLÈTE Défaussez une carte — Redressez ce personnage. Il ne peut pas être envoyé à l'aventure pour le reste de ce tour.",
    },
    it: {
      name: "Balena",
      version: "Famigerato Cetaceo",
      text: [
        {
          title: "Lesto",
          description:
            "(Questo personaggio può sfidare nel turno in cui è stato giocato.) INCURSIONE Scegli e scarta una carta — Prepara questo personaggio. Non può andare all'avventura per il resto di questo turno.",
        },
      ],
    },
  },
  inkType: ["amethyst"],
  franchise: "Pinocchio",
  set: "008",
  cardNumber: 64,
  rarity: "rare",
  cost: 8,
  strength: 6,
  willpower: 8,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_bb513d50f4fb44aab988cf4dca6c9fe5",
    tcgPlayer: 631393,
  },
  text: [
    {
      title: "Rush",
    },
    {
      title: "FULL BREACH",
      description:
        "Choose and discard a card — Ready this character. He can't quest for the rest of this turn.",
    },
  ],
  classifications: ["Storyborn"],
  abilities: [
    {
      id: "7w3-1",
      keyword: "Rush",
      text: "Rush",
      type: "keyword",
    },
    {
      effect: {
        steps: [
          {
            amount: 1,
            chosen: true,
            target: "CONTROLLER",
            type: "discard",
          },
          {
            duration: "this-turn",
            restriction: "cant-quest",
            target: "SELF",
            type: "restriction",
          },
        ],
        type: "sequence",
      },
      id: "7w3-2",
      text: "FULL BREACH Choose and discard a card – Ready this character. He can't quest for the rest of this turn.",
      type: "action",
    },
  ],
};
