import type { CharacterCard } from "@tcg/lorcana-types";

export const hadesLordOfTheDead: CharacterCard = {
  id: "x5y",
  canonicalId: "ci_x5y",
  reprints: ["set6-036"],
  cardType: "character",
  name: "Hades",
  version: "Lord of the Dead",
  i18n: {
    en: {
      name: "Hades",
      version: "Lord of the Dead",
      text: [
        {
          title: "SOUL COLLECTOR",
          description:
            "Whenever one of your other characters is banished during the opponent's turn, gain 2 lore.",
        },
      ],
    },
    de: {
      name: "Hades",
      version: "Herr der Unterwelt",
      text: [
        {
          title: "SEELENSAMMLER",
          description:
            "Jedes Mal, wenn einer deiner anderen Charaktere im Zug einer gegnerischen Person verbannt wird, sammelst du 2 Legenden.",
        },
      ],
    },
    fr: {
      name: "Hadès",
      version: "Dieu des enfers",
      text: [
        {
          title: "COLLECTEUR D'ÂMES",
          description:
            "Durant le tour de vos adversaires, chaque fois que l'un de vos autres personnages est banni, vous gagnez 2 éclats de Lore.",
        },
      ],
    },
    it: {
      name: "Ade",
      version: "Signore dei Morti",
      text: [
        {
          title: "COLLEZIONISTA DI ANIME",
          description:
            "Durante il turno di un avversario, ogni volta che uno dei tuoi altri personaggi viene esiliato, ottieni 2 leggenda.",
        },
      ],
    },
  },
  inkType: ["amethyst"],
  franchise: "Hercules",
  set: "006",
  cardNumber: 36,
  rarity: "rare",
  cost: 6,
  strength: 3,
  willpower: 4,
  lore: 3,
  inkable: false,
  externalIds: {
    lorcast: "crd_856fe3c718b544ba808b79a6811bca02",
    tcgPlayer: 593009,
  },
  text: [
    {
      title: "SOUL COLLECTOR",
      description:
        "Whenever one of your other characters is banished during the opponent's turn, gain 2 lore.",
    },
  ],
  classifications: ["Storyborn", "Villain", "Deity"],
  abilities: [
    {
      effect: {
        amount: 2,
        type: "gain-lore",
      },
      id: "ox7-1",
      name: "SOUL COLLECTOR",
      text: "SOUL COLLECTOR Whenever one of your other characters is banished during the opponent's turn, gain 2 lore.",
      trigger: {
        event: "banish",
        on: "YOUR_OTHER_CHARACTERS",
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
};
