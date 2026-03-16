import type { CharacterCard } from "@tcg/lorcana-types";

export const gantuGalacticFederationCaptain: CharacterCard = {
  id: "A1d",
  canonicalId: "ci_A1d",
  reprints: ["set1-178"],
  cardType: "character",
  name: "Gantu",
  version: "Galactic Federation Captain",
  i18n: {
    en: {
      name: "Gantu",
      version: "Galactic Federation Captain",
      text: [
        {
          title: "UNDER ARREST",
          description: "Characters with cost 2 or less can't challenge your characters.",
        },
      ],
    },
    de: {
      name: "Gantu",
      version: "Kapitän der Galaktischen Föderation",
      text: [
        {
          title: "NEHMT IHN FEST!",
          description:
            "Charaktere, die 2 oder weniger kosten, können deine Charaktere nicht herausfordern.",
        },
      ],
    },
    fr: {
      name: "GANTU",
      version: "Capitaine de la Fédération Galactique",
      text: [
        {
          title: "EN ÉTAT D'ARRESTATION",
          description: "Les personnages coûtant 2 ou moins ne peuvent pas défier vos personnages.",
        },
      ],
    },
    it: {
      name: "Gantu",
      version: "Galactic Federation Captain",
      text: [
        {
          title: "UNDER ARREST",
          description: "Characters with cost 2 or less can't challenge your characters.",
        },
      ],
    },
  },
  inkType: ["steel"],
  franchise: "Lilo and Stitch",
  set: "001",
  cardNumber: 178,
  rarity: "legendary",
  cost: 8,
  strength: 6,
  willpower: 6,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_c165a1025f82402fa3834ed4c9da14ba",
    tcgPlayer: 488097,
  },
  text: [
    {
      title: "UNDER ARREST",
      description: "Characters with cost 2 or less can't challenge your characters.",
    },
  ],
  classifications: ["Storyborn", "Alien", "Captain"],
  abilities: [
    {
      effect: {
        restriction: "cant-challenge",
        target: "SELF",
        type: "restriction",
      },
      id: "c3k-1",
      name: "UNDER ARREST",
      text: "UNDER ARREST Characters with cost 2 or less can't challenge your characters.",
      type: "static",
    },
  ],
};
