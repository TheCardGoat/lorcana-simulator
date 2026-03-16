import type { CharacterCard } from "@tcg/lorcana-types";

export const mickeyMouseGiantMouse: CharacterCard = {
  id: "eAJ",
  canonicalId: "ci_eAJ",
  reprints: ["set8-199"],
  cardType: "character",
  name: "Mickey Mouse",
  version: "Giant Mouse",
  i18n: {
    en: {
      name: "Mickey Mouse",
      version: "Giant Mouse",
      text: [
        {
          title: "Bodyguard",
        },
        {
          title: "THE BIGGEST STAR EVER",
          description: "When this character is banished, deal 5 damage to each opposing character.",
        },
      ],
    },
    de: {
      name: "Micky Maus",
      version: "Riesige Maus",
      text: "Beschützen (Du darfst diesen Charakter erschöpft ausspielen. Gegnerische Charaktere müssen beim Herausfordern deiner Charaktere zuerst deine Charaktere mit Beschützen wählen, wenn möglich.) DER GRÖSSTE STAR VON ALLEN Wenn dieser Charakter verbannt wird, füge jedem gegnerischen Charakter 5 Schaden zu.",
    },
    fr: {
      name: "Mickey Mouse",
      version: "Souris géante",
      text: [
        {
          title: "Rempart",
          description:
            "(Ce personnage peut entrer en jeu épuisé. Lorsqu'il défie l'un de vos personnages, un personnage adverse doit, s'il le peut, choisir l'un de vos personnages avec Rempart.) LA PLUS GRANDE STAR DE TOUS LES TEMPS Lorsque ce personnage est banni, infligez 5 dommages à chaque personnage adverse.",
        },
      ],
    },
    it: {
      name: "Topolino",
      version: "Topo Gigante",
      text: "Guardiano LA PIÙ GRANDE STAR DI SEMPRE Quando questo personaggio viene esiliato, infliggi 5 danni a ogni personaggio avversario.",
    },
  },
  inkType: ["steel"],
  set: "008",
  cardNumber: 199,
  rarity: "legendary",
  cost: 10,
  strength: 10,
  willpower: 10,
  lore: 5,
  inkable: false,
  externalIds: {
    lorcast: "crd_475efa3afb754da4bba8e1d7104ebdf1",
    tcgPlayer: 631331,
  },
  text: [
    {
      title: "Bodyguard",
    },
    {
      title: "THE BIGGEST STAR EVER",
      description: "When this character is banished, deal 5 damage to each opposing character.",
    },
  ],
  classifications: ["Dreamborn", "Hero"],
  abilities: [
    {
      id: "17p-1",
      keyword: "Bodyguard",
      text: "Bodyguard",
      type: "keyword",
    },
    {
      effect: {
        amount: 5,
        target: {
          cardTypes: ["character"],
          count: "all",
          owner: "opponent",
          selector: "all",
          zones: ["play"],
        },
        type: "deal-damage",
      },
      id: "17p-2",
      name: "THE BIGGEST STAR EVER",
      text: "THE BIGGEST STAR EVER When this character is banished, deal 5 damage to each opposing character.",
      trigger: {
        event: "banish",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
