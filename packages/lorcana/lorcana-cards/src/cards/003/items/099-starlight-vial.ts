import type { ItemCard } from "@tcg/lorcana-types";

export const starlightVial: ItemCard = {
  id: "0Az",
  canonicalId: "ci_0Az",
  reprints: ["set3-099"],
  cardType: "item",
  name: "Starlight Vial",
  i18n: {
    en: {
      name: "Starlight Vial",
      text: [
        {
          title: "EFFICIENT ENERGY",
          description: "{E} — You pay 2 {I} less for the next action you play this turn.",
        },
        {
          title: "TRAP 2",
          description: "{I}, Banish this item — Draw 2 cards, then choose and discard a card.",
        },
      ],
    },
    de: {
      name: "Sternenlicht-Phiole",
      text: [
        {
          title: "WIRKSAME ENERGIE",
          description:
            "— Du zahlst 2 weniger für die nächste Aktion, die du in diesem Zug ausspielst. FALLE 2, Verbanne diesen Gegenstand — Ziehe 2 Karten. Wähle danach 1 Karte aus deiner Hand und wirf sie ab.",
        },
      ],
    },
    fr: {
      name: "Fiole de lumière d'étoile",
      text: [
        {
          title: "ÉNERGIE EFFICACE",
          description:
            "— La prochaine carte Action que vous jouez durant ce tour vous coûte 2 de moins. PIÈGE 2, Bannissez cet objet — Piochez 2 cartes puis choisissez et défaussez une carte.",
        },
      ],
    },
    it: {
      name: "Fiala di Luce Stellare",
      text: [
        {
          title: "ENERGIA EFFICIENTE",
          description:
            "— Paga 2 in meno per giocare la tua prossima azione per questo turno. TRAPPOLA 2, esilia questo oggetto — Pesca 2 carte, poi scegli e scarta una carta.",
        },
      ],
    },
  },
  inkType: ["emerald"],
  franchise: "Lorcana",
  set: "003",
  cardNumber: 99,
  rarity: "rare",
  cost: 4,
  inkable: false,
  externalIds: {
    lorcast: "crd_c6b673289f9a4d2680a50dc6be9605dc",
    tcgPlayer: 539086,
  },
  text: [
    {
      title: "EFFICIENT ENERGY",
      description: "{E} — You pay 2 {I} less for the next action you play this turn.",
    },
    {
      title: "TRAP 2",
      description: "{I}, Banish this item — Draw 2 cards, then choose and discard a card.",
    },
  ],
  abilities: [
    {
      id: "0Az-1",
      name: "EFFICIENT ENERGY",
      text: "{E} — You pay 2 {I} less for the next action you play this turn.",
      type: "activated",
      cost: {
        exert: true,
      },
      effect: {
        amount: 2,
        cardType: "action",
        duration: "next-play-this-turn",
        target: "CONTROLLER",
        type: "cost-reduction",
      },
    },
    {
      id: "0Az-2",
      name: "TRAP",
      text: "2 {I}, Banish this item — Draw 2 cards, then choose and discard a card.",
      type: "activated",
      cost: {
        ink: 2,
        banishSelf: true,
      },
      effect: {
        type: "sequence",
        steps: [
          {
            amount: 2,
            target: "CONTROLLER",
            type: "draw",
          },
          {
            amount: 1,
            chosen: true,
            from: "hand",
            target: "CONTROLLER",
            type: "discard",
          },
        ],
      },
    },
  ],
};
