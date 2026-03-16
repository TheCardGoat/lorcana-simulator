import type { ActionCard } from "@tcg/lorcana-types";

export const mosquitoBite: ActionCard = {
  id: "wew",
  canonicalId: "ci_wew",
  reprints: ["set6-096"],
  cardType: "action",
  name: "Mosquito Bite",
  i18n: {
    en: {
      name: "Mosquito Bite",
      text: "Put 1 damage counter on chosen character.",
    },
    de: {
      name: "Mückenstich",
      text: "Lege 1 Schadensmarker auf einen Charakter deiner Wahl.",
    },
    fr: {
      name: "Piqûre de moustique",
      text: "Choisissez un personnage et placez 1 dommage sur lui.",
    },
    it: {
      name: "Puntura di Zanzara",
      text: "Metti 1 segnalino danno su un personaggio a tua scelta.",
    },
  },
  inkType: ["emerald"],
  franchise: "Lilo and Stitch",
  set: "006",
  cardNumber: 96,
  rarity: "uncommon",
  cost: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_b2f167a1614348f194ac43b390bd7fe1",
    tcgPlayer: 592021,
  },
  text: "Put 1 damage counter on chosen character.",
  abilities: [
    {
      effect: {
        amount: 1,
        target: {
          cardTypes: ["character"],
          count: 1,
          owner: "any",
          selector: "chosen",
          zones: ["play"],
        },
        type: "put-damage",
      },
      type: "action",
    },
  ],
};
