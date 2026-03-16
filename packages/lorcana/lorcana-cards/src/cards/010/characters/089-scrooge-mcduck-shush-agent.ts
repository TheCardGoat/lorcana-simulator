import type { CharacterCard } from "@tcg/lorcana-types";

export const scroogeMcduckShushAgent: CharacterCard = {
  id: "uUH",
  canonicalId: "ci_uUH",
  reprints: ["set10-089"],
  cardType: "character",
  name: "Scrooge McDuck",
  version: "S.H.U.S.H. Agent",
  i18n: {
    en: {
      name: "Scrooge McDuck",
      version: "S.H.U.S.H. Agent",
      text: [
        {
          title: "BACKUP PLAN",
          description: "When you play this character, draw a card, then choose and discard a card.",
        },
        {
          title: "ON THE MOVE",
          description:
            "When this character is challenged, return this card to your hand. (No damage is dealt in that challenge.)",
        },
      ],
    },
    de: {
      name: "Dagobert Duck",
      version: "S.H.U.S.H.-Agent",
      text: [
        {
          title: "NOTFALLPLAN",
          description:
            "Wenn du diesen Charakter ausspielst, ziehe 1 Karte. Wähle danach 1 Karte aus deiner Hand und wirf sie ab.",
        },
        {
          title: "IN BEWEGUNG",
          description:
            "Wenn dieser Charakter herausgefordert wird, nimm ihn zurück auf deine Hand. (Bevor der Schaden durch die Herausforderung berechnet wird.)",
        },
      ],
    },
    fr: {
      name: "Balthazar Picsou",
      version: "Agent du C.H.U.T.",
      text: [
        {
          title: "PLAN DE SECOURS",
          description: "Lorsque vous jouez ce personnage, piochez une carte puis défaussez-en une.",
        },
        {
          title: "EN MOUVEMENT",
          description:
            "Chaque fois que ce personnage est défié, renvoyez cette carte dans votre main. (Aucun dommage n'est infligé lors de ce défi.)",
        },
      ],
    },
    it: {
      name: "Paperon de' Paperoni",
      version: "Agente S.H.U.S.H.",
      text: [
        {
          title: "PIANO DI RISERVA",
          description:
            "Quando giochi questo personaggio, pesca una carta, poi scegli e scarta una carta.",
        },
        {
          title: "IN MOVIMENTO",
          description:
            "Quando questo personaggio viene sfidato, riprendi in mano questa carta. (Nessun danno viene inflitto in quella sfida.)",
        },
      ],
    },
  },
  inkType: ["emerald"],
  franchise: "Ducktales",
  set: "010",
  cardNumber: 89,
  rarity: "common",
  cost: 2,
  strength: 0,
  willpower: 2,
  lore: 2,
  inkable: false,
  externalIds: {
    lorcast: "crd_4572c32844ee48398f43a1c7aa86826d",
    tcgPlayer: 659464,
  },
  text: [
    {
      title: "BACKUP PLAN",
      description: "When you play this character, draw a card, then choose and discard a card.",
    },
    {
      title: "ON THE MOVE",
      description:
        "When this character is challenged, return this card to your hand. (No damage is dealt in that challenge.)",
    },
  ],
  classifications: ["Storyborn", "Hero"],
  abilities: [
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
      id: "1l2-1",
      name: "BACKUP PLAN",
      text: "BACKUP PLAN When you play this character, draw a card, then choose and discard a card.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
    {
      effect: {
        target: "SELF",
        type: "return-to-hand",
      },
      id: "1l2-2",
      name: "ON THE MOVE",
      text: "ON THE MOVE When this character is challenged, return this card to your hand.",
      trigger: {
        event: "challenged",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
