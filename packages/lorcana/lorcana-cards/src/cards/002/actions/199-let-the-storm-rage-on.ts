import type { ActionCard } from "@tcg/lorcana-types";

export const letTheStormRageOn: ActionCard = {
  id: "404",
  canonicalId: "ci_404",
  reprints: ["set2-199"],
  cardType: "action",
  name: "Let the Storm Rage On",
  i18n: {
    en: {
      name: "Let the Storm Rage On",
      text: "Deal 2 damage to chosen character. Draw a card.",
    },
    de: {
      name: "Ein Sturm zieht auf",
      text: "Füge einem Charakter deiner Wahl 2 Schaden zu. Ziehe 1 Karte.",
    },
    fr: {
      name: "Perdue dans l'hiver",
      text: "Choisissez un personnage et infligez-lui 2 dommages. Piochez une carte.",
    },
    it: {
      name: "Ecco Qua la Tempesta",
      text: "(Un personaggio con costo 3 o superiore può per cantare questa canzone gratis.) Infliggi 2 danni a un personaggio a tua scelta. Pesca una carta.",
    },
  },
  inkType: ["steel"],
  franchise: "Frozen",
  set: "002",
  cardNumber: 199,
  rarity: "common",
  cost: 3,
  inkable: false,
  externalIds: {
    lorcast: "crd_ce1ec049b9994d6fae071a0f74886cb3",
    tcgPlayer: 527239,
  },
  text: "Deal 2 damage to chosen character. Draw a card.",
  actionSubtype: "song",
  abilities: [
    {
      effect: {
        steps: [
          {
            amount: 2,
            target: "CHOSEN_CHARACTER",
            type: "deal-damage",
          },
          {
            amount: 1,
            target: "CONTROLLER",
            type: "draw",
          },
        ],
        type: "sequence",
      },
      type: "action",
    },
  ],
};
