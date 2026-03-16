import type { CharacterCard } from "@tcg/lorcana-types";

export const peteSpacePirate: CharacterCard = {
  id: "Ewo",
  canonicalId: "ci_Ewo",
  reprints: ["set7-114"],
  cardType: "character",
  name: "Pete",
  version: "Space Pirate",
  i18n: {
    en: {
      name: "Pete",
      version: "Space Pirate",
      text: [
        {
          title: "Shift 4",
        },
        {
          title: "FRIGHTFUL SCHEME",
          description:
            "While this character is exerted, opposing characters can't exert to sing songs and your Pirate characters gain Resist +1.",
        },
      ],
    },
    de: {
      name: "Kater Karlo",
      version: "Weltraum-Pirat",
      text: "Gestaltwandel 4 SCHRECKLICHER PLAN Solange dieser Charakter erschöpft ist, können gegnerische Charaktere nicht erschöpft werden, um Lieder zu singen, und deine Piraten erhalten Robust +1. (Reduziere jeglichen Schaden, der ihnen zugefügt wird, um 1.)",
    },
    fr: {
      name: "Pat",
      version: "Pirate de l'espace",
      text: "Alter 4 PLAN EFFROYABLE Tant que ce personnage est épuisé, les personnages adverses ne peuvent pas être épuisés pour chanter des chansons, et vos personnages Pirate gagnent Résistance +1.",
    },
    it: {
      name: "Gambadilegno",
      version: "Pirata Spaziale",
      text: "Trasformazione 4 COMPLOTTO SPAVENTOSO Mentre questo personaggio è impegnato, i personaggi avversari non si possono impegnare per cantare canzoni e i tuoi personaggi Pirata ottengono Resistere +1.",
    },
  },
  inkType: ["emerald", "steel"],
  set: "007",
  cardNumber: 114,
  rarity: "common",
  cost: 6,
  strength: 5,
  willpower: 5,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_874601077b644699b9e61662ec1c68a8",
    tcgPlayer: 619468,
  },
  text: [
    {
      title: "Shift 4",
    },
    {
      title: "FRIGHTFUL SCHEME",
      description:
        "While this character is exerted, opposing characters can't exert to sing songs and your Pirate characters gain Resist +1.",
    },
  ],
  classifications: ["Floodborn", "Villain", "Pirate"],
  abilities: [
    {
      cost: {
        ink: 4,
      },
      id: "hmq-1",
      keyword: "Shift",
      text: "Shift 4",
      type: "keyword",
    },
    {
      effect: {
        keyword: "Resist",
        target: "SELF",
        type: "gain-keyword",
        value: 1,
      },
      id: "hmq-2",
      text: "FRIGHTFUL SCHEME While this character is exerted, opposing characters can't exert to sing songs and your Pirate characters gain Resist +1.",
      type: "static",
    },
  ],
};
