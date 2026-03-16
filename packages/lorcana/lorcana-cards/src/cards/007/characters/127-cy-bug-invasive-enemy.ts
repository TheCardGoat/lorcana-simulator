import type { CharacterCard } from "@tcg/lorcana-types";

export const cybugInvasiveEnemy: CharacterCard = {
  id: "084",
  canonicalId: "ci_084",
  reprints: ["set7-127"],
  cardType: "character",
  name: "Cy-Bug",
  version: "Invasive Enemy",
  i18n: {
    en: {
      name: "Cy-Bug",
      version: "Invasive Enemy",
      text: [
        {
          title: "HIVE MIND",
          description: "This character gets +1 {S} for each other character you have in play.",
        },
      ],
    },
    de: {
      name: "Cy-Bug",
      version: "Invasiver Feind",
      text: [
        {
          title: "SCHWARMINTELLIGENZ",
          description: "Dieser Charakter erhält +1 für jeden deiner anderen Charaktere im Spiel.",
        },
      ],
    },
    fr: {
      name: "Cybug",
      version: "Ennemi invasif",
      text: [
        {
          title: "ESPRIT DE RUCHE",
          description: "Ce personnage gagne +1 pour chaque autre personnage que vous avez en jeu.",
        },
      ],
    },
    it: {
      name: "Scarafoide",
      version: "Nemico Infestante",
      text: [
        {
          title: "MENTE ALVEARE",
          description: "Questo personaggio riceve +1 per ogni altro personaggio che hai in gioco.",
        },
      ],
    },
  },
  inkType: ["ruby"],
  franchise: "Wreck It Ralph",
  set: "007",
  cardNumber: 127,
  rarity: "common",
  cost: 2,
  strength: 1,
  willpower: 2,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_b9cf5f433cd840c295d3b74c39583ee1",
    tcgPlayer: 619475,
  },
  text: [
    {
      title: "HIVE MIND",
      description: "This character gets +1 {S} for each other character you have in play.",
    },
  ],
  classifications: ["Storyborn"],
  abilities: [
    {
      effect: {
        modifier: 1,
        stat: "strength",
        target: "SELF",
        type: "modify-stat",
      },
      id: "1ls-1",
      text: "HIVE MIND This character gets +1 {S} for each other character you have in play.",
      type: "static",
    },
  ],
};
