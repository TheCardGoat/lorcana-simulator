import type { ItemCard } from "@tcg/lorcana-types";

export const ingeniousDevice: ItemCard = {
  id: "iZ1",
  canonicalId: "ci_iZ1",
  reprints: ["set10-201"],
  cardType: "item",
  name: "Ingenious Device",
  i18n: {
    en: {
      name: "Ingenious Device",
      text: [
        {
          title: "SURPRISE PACKAGE",
          description:
            "{E}, 2 {I}, Banish this item — Draw a card, then choose and discard a card.",
        },
        {
          title: "TIME GROWS SHORT",
          description:
            "During your turn, when this item is banished, deal 3 damage to chosen character or location.",
        },
      ],
    },
    de: {
      name: "Kunstvoller Apparat",
      text: [
        {
          title: "ÜBERRASCHUNG,",
          description:
            "2, Verbanne diesen Gegenstand — Ziehe 1 Karte. Wähle danach 1 Karte aus deiner Hand und wirf sie ab. DIE ZEIT WIRD KNAPP Wenn dieser Gegenstand in deinem Zug verbannt wird, füge einem Charakter oder Ort deiner Wahl 3 Schaden zu.",
        },
      ],
    },
    fr: {
      name: "Mécanisme très ingénieux",
      text: [
        {
          title: "UN GENRE DE PAQUET SURPRISE, 2,",
          description:
            "Bannissez cet objet — Piochez une carte puis défaussez-en une. COMME LE TEMPS PASSE Durant votre tour, lorsque cet objet est banni, choisissez un personnage ou un lieu et infligez-lui 3 dommages.",
        },
      ],
    },
    it: {
      name: "Ingegnoso Ordigno",
      text: [
        {
          title: "SOUVENIR, 2,",
          description:
            "esilia questo oggetto — Pesca una carta, poi scegli e scarta una carta. IL TEMPO VOLA Durante il tuo turno, quando questo oggetto viene esiliato, infliggi 3 danni a un personaggio o a un luogo a tua scelta.",
        },
      ],
    },
  },
  inkType: ["steel"],
  franchise: "Peter Pan",
  set: "010",
  cardNumber: 201,
  rarity: "rare",
  cost: 3,
  inkable: false,
  externalIds: {
    lorcast: "crd_415b89e575ba4ce289709dfd16d4ff14",
    tcgPlayer: 659410,
  },
  text: [
    {
      title: "SURPRISE PACKAGE",
      description: "{E}, 2 {I}, Banish this item — Draw a card, then choose and discard a card.",
    },
    {
      title: "TIME GROWS SHORT",
      description:
        "During your turn, when this item is banished, deal 3 damage to chosen character or location.",
    },
  ],
  abilities: [
    {
      id: "12e-1",
      text: "SURPRISE PACKAGE {E}, 2 {I}, Banish this item — Draw a card, then choose and discard a card.",
      name: "SURPRISE PACKAGE",
      type: "activated",
      cost: {
        banishSelf: true,
        exert: true,
        ink: 2,
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
            from: "hand",
            target: "CONTROLLER",
            type: "discard",
          },
        ],
        type: "sequence",
      },
    },
    {
      id: "12e-2",
      text: "TIME GROWS SHORT During your turn, when this item is banished, deal 3 damage to chosen character or location.",
      name: "TIME GROWS SHORT",
      effect: {
        type: "deal-damage",
        amount: 3,
        target: {
          cardTypes: ["character", "location"],
          count: 1,
          selector: "chosen",
          zones: ["play"],
        },
      },
      trigger: {
        event: "banish",
        on: "SELF",
        restrictions: [
          {
            type: "during-turn",
            whose: "your",
          },
        ],
        timing: "when",
      },
      sourceZones: ["play", "discard"],
      type: "triggered",
    },
  ],
};
