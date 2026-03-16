import type { ActionCard } from "@tcg/lorcana-types";

export const whenWillMyLifeBegin: ActionCard = {
  id: "6iQ",
  canonicalId: "ci_6iQ",
  reprints: ["set5-197"],
  cardType: "action",
  name: "When Will My Life Begin?",
  i18n: {
    en: {
      name: "When Will My Life Begin?",
      text: "Chosen character can't challenge during their next turn. Draw a card.",
    },
    de: {
      name: "Wann fängt mein Leben an?",
      text: "Wähle einen Charakter. Er kann in seinem nächsten Zug nicht herausfordern. Ziehe 1 Karte.",
    },
    fr: {
      name: "Où est la vraie vie ?",
      text: "Choisissez un personnage qui ne pourra pas défier lors de son prochain tour. Piochez une carte.",
    },
    it: {
      name: "Aspetto Quel che Succederà",
      text: "(Un personaggio con costo 3 o superiore può per cantare questa canzone gratis.) Un personaggio a tua scelta non può sfidare durante il suo prossimo turno. Pesca una carta.",
    },
  },
  inkType: ["steel"],
  franchise: "Tangled",
  set: "005",
  cardNumber: 197,
  rarity: "common",
  cost: 3,
  inkable: true,
  externalIds: {
    lorcast: "crd_f4219fc0ab3a47ed9fc0b3f5f705f597",
    tcgPlayer: 559754,
  },
  text: "Chosen character can't challenge during their next turn. Draw a card.",
  actionSubtype: "song",
  abilities: [
    {
      effect: {
        steps: [
          {
            duration: "their-next-turn",
            restriction: "cant-challenge",
            target: {
              selector: "chosen",
              count: 1,
              owner: "any",
              zones: ["play"],
              cardTypes: ["character"],
            },
            type: "restriction",
          },
          {
            amount: 1,
            target: "CONTROLLER",
            type: "draw",
          },
        ],
        type: "sequence",
      },
      id: "1ay-1",
      text: "Chosen character can't challenge during their next turn. Draw a card.",
      type: "action",
    },
  ],
};
