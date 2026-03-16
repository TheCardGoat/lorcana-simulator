import type { CharacterCard } from "@tcg/lorcana-types";

export const fredMascotByDay: CharacterCard = {
  id: "z1w",
  canonicalId: "ci_z1w",
  reprints: ["set6-075"],
  cardType: "character",
  name: "Fred",
  version: "Mascot by Day",
  i18n: {
    en: {
      name: "Fred",
      version: "Mascot by Day",
      text: [
        {
          title: "HOW COOL IS THAT",
          description: "Whenever this character is challenged, gain 2 lore.",
        },
      ],
    },
    de: {
      name: "Fred",
      version: "Maskottchen am Tag",
      text: [
        {
          title: "WIE COOL IST DAS DENN?",
          description:
            "Jedes Mal, wenn dieser Charakter herausgefordert wird, sammelst du 2 Legenden.",
        },
      ],
    },
    fr: {
      name: "Fred",
      version: "Mascotte la journée",
      text: [
        {
          title: "C'EST PAS GÉNIAL?",
          description: "Chaque fois que ce personnage est défié, gagnez 2 éclats de Lore.",
        },
      ],
    },
    it: {
      name: "Fred",
      version: "Mascotte di Giorno",
      text: [
        {
          title: "NON È FICO?",
          description: "Ogni volta che questo personaggio viene sfidato, ottieni 2 leggenda.",
        },
      ],
    },
  },
  inkType: ["emerald"],
  franchise: "Big Hero 6",
  set: "006",
  cardNumber: 75,
  rarity: "common",
  cost: 1,
  strength: 1,
  willpower: 1,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_9cbf437511cf41c7b61f04f01a22c39e",
    tcgPlayer: 578186,
  },
  text: [
    {
      title: "HOW COOL IS THAT",
      description: "Whenever this character is challenged, gain 2 lore.",
    },
  ],
  classifications: ["Storyborn", "Hero"],
  abilities: [
    {
      effect: {
        amount: 2,
        type: "gain-lore",
      },
      id: "1h1-1",
      name: "HOW COOL IS THAT",
      text: "HOW COOL IS THAT Whenever this character is challenged, gain 2 lore.",
      trigger: {
        event: "challenged",
        on: "SELF",
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
};
