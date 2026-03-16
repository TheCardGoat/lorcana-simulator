import type { ActionCard } from "@tcg/lorcana-types";

export const strengthOfARagingFire: ActionCard = {
  id: "rHN",
  canonicalId: "ci_s73",
  reprints: ["set2-201", "set9-201"],
  cardType: "action",
  name: "Strength of a Raging Fire",
  i18n: {
    en: {
      name: "Strength of a Raging Fire",
      text: "Deal damage to chosen character equal to the number of characters you have in play.",
    },
    de: {
      name: "Herz aus Stahl",
      text: "Zähle deine Charaktere im Spiel. Füge einem Charakter deiner Wahl dieselbe Anzahl Schaden zu.",
    },
    fr: {
      name: "Plus ardent que le feu des volcans",
      text: "Choisissez un personnage et infligez-lui autant de dommages que de personnages que vous avez en jeu.",
    },
    it: {
      name: "Potente Come un Vulcano Attivo",
      text: "(Un personaggio con costo 3 o superiore può per cantare questa canzone gratis.) Infliggi danno a un personaggio a tua scelta pari al numero di personaggi che hai in gioco.",
    },
  },
  inkType: ["steel"],
  franchise: "Mulan",
  set: "002",
  cardNumber: 201,
  rarity: "rare",
  cost: 3,
  inkable: true,
  externalIds: {
    lorcast: "crd_0f4ad89d1f5348b0ae5b8d6010dc70d9",
    tcgPlayer: 647674,
  },
  text: "Deal damage to chosen character equal to the number of characters you have in play.",
  actionSubtype: "song",
  abilities: [
    {
      type: "action",
      effect: {
        amount: {
          controller: "you",
          type: "characters-in-play",
        },
        target: "CHOSEN_CHARACTER",
        type: "deal-damage",
      },
    },
  ],
};
