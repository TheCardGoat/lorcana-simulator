import type { CharacterCard } from "@tcg/lorcana-types";

export const aladdinResearchAssistant: CharacterCard = {
  id: "H1M",
  canonicalId: "ci_H1M",
  reprints: ["set7-197"],
  cardType: "character",
  name: "Aladdin",
  version: "Research Assistant",
  i18n: {
    en: {
      name: "Aladdin",
      version: "Research Assistant",
      text: [
        {
          title: "HELPING HAND",
          description:
            "Whenever this character quests, you may play an Ally character with cost 3 or less for free.",
        },
        {
          title: "PUT IN THE EFFORT",
          description: "While this character is exerted, your Ally characters get +1 {S}.",
        },
      ],
    },
    de: {
      name: "Aladdin",
      version: "Wissenschaftlicher Mitarbeiter",
      text: [
        {
          title: "HELFENDE HAND",
          description:
            "Jedes Mal, wenn dieser Charakter erkundet, darfst du einen Verbündeten, der 3 oder weniger kostet, kostenlos ausspielen.",
        },
        {
          title: "STRENGT SICH AN",
          description: "Solange dieser Charakter erschöpft ist, erhalten deine Verbündeten +1.",
        },
      ],
    },
    fr: {
      name: "Aladdin",
      version: "Assistant de recherche",
      text: [
        {
          title: "MAIN TENDUE",
          description:
            "Chaque fois que ce personnage est envoyé à l'aventure, vous pouvez jouer gratuitement un personnage Allié coûtant 3 ou moins.",
        },
        {
          title: "SE DONNER DU MAL",
          description: "Tant que ce personnage est épuisé, vos personnages Allié gagnent +1.",
        },
      ],
    },
    it: {
      name: "Aladdin",
      version: "Assistente di Ricerca",
      text: [
        {
          title: "DARE UNA MANO",
          description:
            "Ogni volta che questo personaggio va all'avventura, puoi giocare un personaggio Alleato con costo 3 o inferiore, gratis.",
        },
        {
          title: "METTERCI IMPEGNO",
          description:
            "Mentre questo personaggio è impegnato, i tuoi personaggi Alleato ricevono +1.",
        },
      ],
    },
  },
  inkType: ["steel"],
  franchise: "Aladdin",
  set: "007",
  cardNumber: 197,
  rarity: "rare",
  cost: 4,
  strength: 2,
  willpower: 4,
  lore: 2,
  inkable: false,
  externalIds: {
    lorcast: "crd_cf7a354247654f8f914b04e101558f6f",
    tcgPlayer: 619521,
  },
  text: [
    {
      title: "HELPING HAND",
      description:
        "Whenever this character quests, you may play an Ally character with cost 3 or less for free.",
    },
    {
      title: "PUT IN THE EFFORT",
      description: "While this character is exerted, your Ally characters get +1 {S}.",
    },
  ],
  classifications: ["Storyborn", "Hero"],
  abilities: [
    {
      effect: {
        chooser: "CONTROLLER",
        effect: {
          cost: "free",
          costRestriction: {
            comparison: "less-or-equal",
            value: 3,
          },
          from: "hand",
          type: "play-card",
        },
        type: "optional",
      },
      id: "1do-1",
      name: "HELPING HAND",
      text: "HELPING HAND Whenever this character quests, you may play an Ally character with cost 3 or less for free.",
      trigger: {
        event: "quest",
        on: "SELF",
        timing: "whenever",
      },
      type: "triggered",
    },
    {
      effect: {
        modifier: 1,
        stat: "strength",
        target: "SELF",
        type: "modify-stat",
      },
      id: "1do-2",
      text: "PUT IN THE EFFORT While this character is exerted, your Ally characters get +1 {S}.",
      type: "static",
    },
  ],
};
