import type { CharacterCard } from "@tcg/lorcana-types";

export const auroraWakingBeautyEnchanted: CharacterCard = {
  id: "ALL",
  canonicalId: "ci_ove",
  reprints: ["set7-014"],
  cardType: "character",
  name: "Aurora",
  version: "Waking Beauty",
  i18n: {
    en: {
      name: "Aurora",
      version: "Waking Beauty",
      text: [
        {
          title: "Singer 5",
        },
        {
          title: "SWEET DREAMS",
          description:
            "Whenever you remove 1 or more damage from a character, ready this character. She can't quest or challenge for the rest of this turn.",
        },
      ],
    },
    de: {
      name: "Aurora",
      version: "Erwachte Schönheit",
      text: [
        {
          title: "Singen 5",
          description:
            "(Die Kosten dieses Charakters gelten als 5 für das Singen von Liedern.) SÜSSE TRÄUME Jedes Mal, wenn du 1 oder mehr Schaden von einem Charakter entfernst, mache diesen Charakter bereit. Er kann in diesem Zug nicht mehr erkunden oder herausfordern.",
        },
      ],
    },
    fr: {
      name: "Aurore",
      version: "La belle s'éveillant",
      text: "Mélomane 5 (Ce personnage est considéré comme ayant un coût de 5 pour chanter des chansons.) BEAUX RÊVES Chaque fois que vous retirez au moins 1 dommage d'un personnage, redressez ce personnage-ci. Il ne peut ni partir à l'aventure ni défier pour le reste de ce tour.",
    },
    it: {
      name: "Aurora",
      version: "Bellezza Risvegliata",
      text: "Melodioso 5 SOGNI D'ORO Ogni volta che rimuovi 1 o più danni da un personaggio, prepara questo personaggio. Non può andare all'avventura o sfidare per il resto di questo turno.",
    },
  },
  inkType: ["amber"],
  franchise: "Sleeping Beauty",
  set: "007",
  cardNumber: 205,
  rarity: "enchanted",
  specialRarity: "enchanted",
  cost: 3,
  strength: 1,
  willpower: 4,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_54102dba80604a609eed679b7f33fad3",
    tcgPlayer: 619733,
  },
  text: [
    {
      title: "Singer 5",
    },
    {
      title: "SWEET DREAMS",
      description:
        "Whenever you remove 1 or more damage from a character, ready this character. She can't quest or challenge for the rest of this turn.",
    },
  ],
  classifications: ["Storyborn", "Hero", "Princess"],
  abilities: [
    {
      id: "cy2-1",
      keyword: "Singer",
      text: "Singer 5",
      type: "keyword",
      value: 5,
    },
    {
      effect: {
        steps: [
          {
            target: {
              selector: "self",
              count: 1,
              owner: "any",
              zones: ["play"],
              cardTypes: ["character"],
            },
            type: "ready",
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
      id: "cy2-2",
      name: "SWEET DREAMS",
      text: "SWEET DREAMS Whenever you remove 1 or more damage from a character, ready this character. She can't quest or challenge for the rest of this turn.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
