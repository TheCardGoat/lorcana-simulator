import type { ActionCard } from "@tcg/lorcana-types";

export const everAsBefore: ActionCard = {
  id: "DPw",
  canonicalId: "ci_DPw",
  reprints: ["set5-162"],
  cardType: "action",
  name: "Ever as Before",
  i18n: {
    en: {
      name: "Ever as Before",
      text: "Remove up to 2 damage from any number of chosen characters.",
    },
    de: {
      name: "Ewig altbekannt",
      text: "Entferne bis zu 2 Schaden von beliebig vielen Charakteren deiner Wahl.",
    },
    fr: {
      name: "Rien n'est plus pareil",
      text: "Choisissez autant de personnages que vous le souhaitez et retirez-leur jusqu'à 2 dommages chacun.",
    },
    it: {
      name: "Stessa Melodia",
      text: "(Un personaggio con costo 2 o superiore può per cantare questa canzone gratis.) Rimuovi fino a 2 danni da un qualsiasi numero di personaggi a tua scelta.",
    },
  },
  inkType: ["sapphire"],
  franchise: "Beauty and the Beast",
  set: "005",
  cardNumber: 162,
  rarity: "common",
  cost: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_127dc81d93624162b4eee478a2f33f5a",
    tcgPlayer: 561970,
  },
  text: "Remove up to 2 damage from any number of chosen characters.",
  actionSubtype: "song",
  abilities: [
    {
      effect: {
        amount: 2,
        target: {
          cardTypes: ["character"],
          count: "all",
          owner: "any",
          selector: "chosen",
          zones: ["play"],
        },
        type: "remove-damage",
        upTo: true,
      },
      id: "1br-1",
      text: "Remove up to 2 damage from any number of chosen characters.",
      type: "action",
    },
  ],
};
