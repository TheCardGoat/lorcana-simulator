import type { CharacterCard } from "@tcg/lorcana-types";

export const minnieMouseAmethystChampion: CharacterCard = {
  id: "8af",
  canonicalId: "ci_8af",
  reprints: ["set10-035"],
  cardType: "character",
  name: "Minnie Mouse",
  version: "Amethyst Champion",
  i18n: {
    en: {
      name: "Minnie Mouse",
      version: "Amethyst Champion",
      text: [
        {
          title: "MYSTICAL BALANCE",
          description:
            "Whenever one of your other Amethyst characters is banished in a challenge, you may draw a card.",
        },
      ],
    },
    de: {
      name: "Minnie Maus",
      version: "Amethyst-Champion",
      text: [
        {
          title: "MYSTISCHES GLEICHGEWICHT",
          description:
            "Jedes Mal, wenn einer deiner anderen Amethyst-Charaktere durch eine Herausforderung verbannt wird, darfst du 1 Karte ziehen.",
        },
      ],
    },
    fr: {
      name: "Minnie",
      version: "Championne Améthyste",
      text: [
        {
          title: "ÉQUILIBRE MYSTIQUE",
          description:
            "Chaque fois que l'un de vos autres personnages Améthyste est banni via un défi, vous pouvez piocher une carte.",
        },
      ],
    },
    it: {
      name: "Minni",
      version: "Campionessa d'Ametista",
      text: [
        {
          title: "EQUILIBRIO MISTICO",
          description:
            "Ogni volta che uno dei tuoi altri personaggi Ametista viene esiliato in una sfida, puoi pescare una carta.",
        },
      ],
    },
  },
  inkType: ["amethyst"],
  set: "010",
  cardNumber: 35,
  rarity: "rare",
  cost: 4,
  strength: 2,
  willpower: 3,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_7667c79b34784802930a659a5c904ccf",
    tcgPlayer: 659760,
  },
  text: [
    {
      title: "MYSTICAL BALANCE",
      description:
        "Whenever one of your other Amethyst characters is banished in a challenge, you may draw a card.",
    },
  ],
  classifications: ["Dreamborn", "Hero"],
  abilities: [
    {
      id: "1kv-1",
      effect: {
        chooser: "CONTROLLER",
        effect: {
          amount: 1,
          target: "CONTROLLER",
          type: "draw",
        },
        type: "optional",
      },
      name: "MYSTICAL BALANCE",
      trigger: {
        event: "banish",
        timing: "whenever",
        on: "YOUR_OTHER_CHARACTERS",
      },
      type: "triggered",
      text: "MYSTICAL BALANCE Whenever one of your other Amethyst characters is banished in a challenge, you may draw a card.",
    },
  ],
};
