import type { CharacterCard } from "@tcg/lorcana-types";

export const cobraBubblesFormerCia: CharacterCard = {
  id: "xkL",
  canonicalId: "ci_xkL",
  reprints: ["set6-188"],
  cardType: "character",
  name: "Cobra Bubbles",
  version: "Former CIA",
  i18n: {
    en: {
      name: "Cobra Bubbles",
      version: "Former CIA",
      text: [
        {
          title: "Bodyguard",
        },
        {
          title: "THINK ABOUT WHAT'S BEST 2",
          description: "{I} — Draw a card, then choose and discard a card.",
        },
      ],
    },
    de: {
      name: "Cobra Bobo",
      version: "Ehemaliger Mitarbeiter der CIA",
      text: "Beschützen (Du darfst diesen Charakter erschöpft ausspielen. Gegnerische Charaktere müssen beim Herausfordern deiner Charaktere zuerst deine Charaktere mit Beschützen wählen, wenn möglich.) ÜBERLEGE, WAS DAS BESTE IST 2 — Ziehe 1 Karte. Wähle danach 1 Karte aus deiner Hand und wirf sie ab.",
    },
    fr: {
      name: "Cobra Bubbles",
      version: "Ancien agent de la CIA",
      text: [
        {
          title: "Rempart",
          description:
            "(Ce personnage peut entrer en jeu épuisé. Lorsqu'un adversaire défie l'un de vos personnages, il doit, si possible, choisir l'un de vos personnages avec Rempart.) ENVISAGER CE QU'IL Y A DE MIEUX 2 — Piochez une carte puis défaussez-en une.",
        },
      ],
    },
    it: {
      name: "Cobra Bubbles",
      version: "Ex Agente CIA",
      text: "Guardiano CONSIDERARE QUELLO CHE È MEGLIO 2 — Pesca una carta, poi scegli e scarta una carta.",
    },
  },
  inkType: ["steel"],
  franchise: "Lilo and Stitch",
  set: "006",
  cardNumber: 188,
  rarity: "rare",
  cost: 5,
  strength: 3,
  willpower: 4,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_0e199ab83f22428784550f317e16fefd",
    tcgPlayer: 592010,
  },
  text: [
    {
      title: "Bodyguard",
    },
    {
      title: "THINK ABOUT WHAT'S BEST 2",
      description: "{I} — Draw a card, then choose and discard a card.",
    },
  ],
  classifications: ["Dreamborn", "Ally"],
  abilities: [
    {
      id: "1r8-1",
      keyword: "Bodyguard",
      text: "Bodyguard",
      type: "keyword",
    },
    {
      effect: {
        steps: [
          {
            amount: 1,
            target: "CONTROLLER",
            type: "draw",
          },
          {
            amount: 1,
            chosen: true,
            target: "CONTROLLER",
            type: "discard",
          },
        ],
        type: "sequence",
      },
      id: "1r8-2",
      text: "THINK ABOUT WHAT'S BEST 2 {I} – Draw a card, then choose and discard a card.",
      type: "action",
    },
  ],
};
