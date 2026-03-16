import type { CharacterCard } from "@tcg/lorcana-types";

export const donaldDuckPieSlingerEnchanted: CharacterCard = {
  id: "LmE",
  canonicalId: "ci_gl4",
  reprints: ["set5-107"],
  cardType: "character",
  name: "Donald Duck",
  version: "Pie Slinger",
  i18n: {
    en: {
      name: "Donald Duck",
      version: "Pie Slinger",
      text: [
        {
          title: "Shift 4",
        },
        {
          title: "HUMBLE PIE",
          description:
            "When you play this character, if you used Shift to play him, each opponent loses 2 lore.",
        },
        {
          title: "RAGING DUCK",
          description: "While an opponent has 10 or more lore, this character gets +6 {S}.",
        },
      ],
    },
    de: {
      name: "Donald Duck",
      version: "Kuchenschleuderer",
      text: "Gestaltwandel 4 PUSTEKUCHEN Wenn du diesen Charakter ausspielst, falls du Gestaltwandel benutzt hast, um diesen Charakter auszuspielen, verlieren alle gegnerischen Mitspielenden je 2 Legenden. WÜTENDE ENTE Solange mindestens eine gegnerische Person 10 oder mehr Legenden hat, erhält dieser Charakter +6.",
    },
    fr: {
      name: "Donald",
      version: "Lanceur de tartes",
      text: "Alter 4 UNE SIMPLE TARTE Si vous jouez ce personnage en utilisant sa capacité Alter, chaque adversaire perd 2 éclats de Lore. CANARD ENRAGÉ Tant qu'un adversaire a 10 éclats de Lore ou plus, ce personnage gagne +6.",
    },
    it: {
      name: "Paperino",
      version: "Lanciatore di Torte",
      text: "Trasformazione 4 TORTA DI UMILTÀ Quando giochi questo personaggio, se hai usato Trasformazione per giocarlo, ogni avversario perde 2 leggenda. PAPERO IRACONDO Mentre un avversario ha 10 o più leggenda, questo personaggio riceve +6.",
    },
  },
  inkType: ["ruby"],
  set: "005",
  cardNumber: 214,
  rarity: "enchanted",
  specialRarity: "enchanted",
  cost: 5,
  strength: 3,
  willpower: 6,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_306fb0ac65b44f289a2cbacac51ba9fe",
    tcgPlayer: 559716,
  },
  text: [
    {
      title: "Shift 4",
    },
    {
      title: "HUMBLE PIE",
      description:
        "When you play this character, if you used Shift to play him, each opponent loses 2 lore.",
    },
    {
      title: "RAGING DUCK",
      description: "While an opponent has 10 or more lore, this character gets +6 {S}.",
    },
  ],
  classifications: ["Floodborn", "Hero", "Knight"],
  abilities: [
    {
      id: "14s-1",
      text: "HUMBLE PIE When you play this character, if you used Shift to play him, each opponent loses {d} lore.",
      name: "HUMBLE PIE",
      type: "triggered",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      effect: {
        amount: 0,
        target: "EACH_OPPONENT",
        type: "lose-lore",
      },
      condition: {
        type: "used-shift",
      },
    },
    {
      id: "14s-2",
      text: "RAGING DUCK While an opponent has {d} or more lore, this character gets +{d} {S}.",
      name: "RAGING DUCK",
      type: "static",
      effect: {
        modifier: 0,
        stat: "strength",
        target: "SELF",
        type: "modify-stat",
      },
      condition: {
        comparison: "greater-or-equal",
        left: {
          controller: "opponent",
          type: "lore",
        },
        right: {
          type: "constant",
          value: 0,
        },
        type: "comparison",
      },
    },
  ],
};
