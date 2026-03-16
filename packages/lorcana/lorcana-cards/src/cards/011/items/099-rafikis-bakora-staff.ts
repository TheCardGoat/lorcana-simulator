import type { ItemCard } from "@tcg/lorcana-types";

export const rafikisBakoraStaff: ItemCard = {
  id: "GU7",
  canonicalId: "ci_GU7",
  reprints: ["set11-099"],
  cardType: "item",
  name: "Rafiki's Bakora Staff",
  i18n: {
    en: {
      name: "Rafiki's Bakora Staff",
      text: [
        {
          title: "READ THE OMENS",
          description: "{E}, 1 {I} — Draw a card, then choose and discard a card.",
        },
        {
          title: "BONK! 1",
          description: "{I}, Banish this item — Deal 1 damage to chosen character.",
        },
      ],
    },
    de: {
      name: "Rafikis Bakora-Stab",
      text: [
        {
          title: "LIES DIE OMEN, 1",
          description:
            "— Ziehe 1 Karte. Wähle danach 1 Karte aus deiner Hand und wirf sie ab. BONK! 1, Verbanne diesen Gegenstand — Füge einem Charakter deiner Wahl 1 Schaden zu.",
        },
      ],
    },
    fr: {
      name: "Bâton bakora de Rafiki",
      text: [
        {
          title: "LIRE LES",
          description:
            "PRÉSAGES, 1 — Piochez une carte puis défaussez une carte. PAF! 1, Bannissez cet objet — Choisissez un personnage et infligez-lui 1 dommage.",
        },
      ],
    },
    it: {
      name: "Bastone Bakora di Rafiki",
      text: [
        {
          title: "LEGGERE I SEGNI, 1",
          description:
            "— Pesca una carta, poi scegli e scarta una carta. BONK! 1, esilia questo oggetto — Infliggi 1 danno a un personaggio a tua scelta.",
        },
      ],
    },
  },
  inkType: ["emerald"],
  franchise: "Lion King",
  set: "011",
  cardNumber: 99,
  rarity: "uncommon",
  cost: 2,
  inkable: false,
  externalIds: {
    lorcast: "crd_b33671b3938940708ac2a4f7d00d942b",
    tcgPlayer: 675392,
  },
  text: [
    {
      title: "READ THE OMENS",
      description: "{E}, 1 {I} — Draw a card, then choose and discard a card.",
    },
    {
      title: "BONK! 1",
      description: "{I}, Banish this item — Deal 1 damage to chosen character.",
    },
  ],
  abilities: [
    {
      id: "fvr-1",
      name: "READ THE OMENS",
      type: "activated",
      cost: {
        exert: true,
        ink: 1,
      },
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
      text: "READ THE OMENS {E}, 1 {I} — Draw a card, then choose and discard a card.",
    },
    {
      id: "fvr-2",
      name: "BONK! 1",
      type: "activated",
      cost: {
        ink: 1,
        banishSelf: true,
      },
      effect: {
        amount: 1,
        target: {
          cardTypes: ["character"],
          count: 1,
          owner: "any",
          selector: "chosen",
          zones: ["play"],
        },
        type: "deal-damage",
      },
      text: "BONK! 1 {I}, Banish this item — Deal 1 damage to chosen character.",
    },
  ],
};
