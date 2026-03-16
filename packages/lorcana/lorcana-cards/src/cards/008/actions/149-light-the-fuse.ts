import type { ActionCard } from "@tcg/lorcana-types";

export const lightTheFuse: ActionCard = {
  id: "Gsc",
  canonicalId: "ci_Gsc",
  reprints: ["set8-149"],
  cardType: "action",
  name: "Light the Fuse",
  i18n: {
    en: {
      name: "Light the Fuse",
      text: "Deal 1 damage to chosen character for each exerted character you have in play.",
    },
    de: {
      name: "Entzünde die Lunte",
      text: "Zähle deine erschöpften Charaktere im Spiel. Füge einem Charakter deiner Wahl dieselbe Anzahl Schaden zu.",
    },
    fr: {
      name: "Mettre le feu aux poudres",
      text: "Choisissez un personnage et infligez-lui 1 dommage pour chacun de vos personnages épuisés en jeu.",
    },
    it: {
      name: "Accendere la Miccia",
      text: "Infliggi 1 danno a un personaggio a tua scelta per ogni personaggio impegnato che hai in gioco.",
    },
  },
  inkType: ["ruby", "steel"],
  franchise: "Mulan",
  set: "008",
  cardNumber: 149,
  rarity: "uncommon",
  cost: 1,
  inkable: false,
  externalIds: {
    lorcast: "crd_e416c26c509b4f3eb41a49cf0d478734",
    tcgPlayer: 631449,
  },
  text: "Deal 1 damage to chosen character for each exerted character you have in play.",
  abilities: [
    {
      type: "action",
      effect: {
        type: "deal-damage",
        amount: {
          counter: {
            controller: "you",
            type: "exerted-characters",
          },
          type: "for-each",
        },
        target: "CHOSEN_CHARACTER",
      },
    },
  ],
};
