import type { ActionCard } from "@tcg/lorcana-types";

export const hasSetMyHeaaaaaaart: ActionCard = {
  id: "1gW",
  canonicalId: "ci_1gW",
  reprints: ["set3-094"],
  cardType: "action",
  name: "Has Set My Heaaaaaaart . . .",
  i18n: {
    en: {
      name: "Has Set My Heaaaaaaart . . .",
      text: [
        {
          title: "(A",
          description:
            "character with cost 2 or more can to play this song for free.) Banish chosen item.",
        },
      ],
    },
    de: {
      name: "Du sollst mein Cooooowboy sein",
      text: "Verbanne einen Gegenstand deiner Wahl.",
    },
    fr: {
      name: "A touché mon cœuuuuur…",
      text: "Choisissez un objet et bannissez-le.",
    },
    it: {
      name: "Lui Resteràààààà…",
      text: "(Un personaggio con costo 2 o superiore può per giocare questa canzone gratis.) Esilia un oggetto a tua scelta.",
    },
  },
  inkType: ["emerald"],
  set: "003",
  cardNumber: 94,
  rarity: "uncommon",
  cost: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_86e375807dee4e26ab3254c11e7eed00",
    tcgPlayer: 539085,
  },
  text: [
    {
      title: "(A",
      description:
        "character with cost 2 or more can to play this song for free.) Banish chosen item.",
    },
  ],
  actionSubtype: "song",
  abilities: [
    {
      effect: {
        target: {
          cardTypes: ["item"],
          count: 1,
          owner: "any",
          selector: "chosen",
          zones: ["play"],
        },
        type: "banish",
      },
      type: "action",
    },
  ],
};
