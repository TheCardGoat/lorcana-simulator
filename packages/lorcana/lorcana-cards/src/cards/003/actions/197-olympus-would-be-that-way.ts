import type { ActionCard } from "@tcg/lorcana-types";

export const olympusWouldBeThatWay: ActionCard = {
  id: "N1o",
  canonicalId: "ci_N1o",
  reprints: ["set3-197"],
  cardType: "action",
  name: "Olympus Would Be That Way",
  i18n: {
    en: {
      name: "Olympus Would Be That Way",
      text: "Your characters get +3 {S} while challenging a location this turn.",
    },
    de: {
      name: "Zum Olymp geht's da lang",
      text: "Deine Charaktere erhalten in diesem Zug +3, während sie einen Ort herausfordern.",
    },
    fr: {
      name: "L'Olympe, ce serait pas plutôt par là ?",
      text: "Lorsqu'ils défient un lieu durant votre tour, vos personnages gagnent +3.",
    },
    it: {
      name: "L'Olimpo Sarebbe per di Là",
      text: [
        {
          title: "I",
          description:
            "tuoi personaggi ottengono +3 mentre stanno sfidando luoghi per questo turno.",
        },
      ],
    },
  },
  inkType: ["steel"],
  franchise: "Hercules",
  set: "003",
  cardNumber: 197,
  rarity: "common",
  cost: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_68b76d76c7b1460cbae204778e1da3f2",
    tcgPlayer: 539117,
  },
  text: "Your characters get +3 {S} while challenging a location this turn.",
  abilities: [
    {
      type: "action",
      effect: {
        type: "modify-stat",
        stat: "strength",
        modifier: 3,
        duration: "this-turn",
        target: "YOUR_CHARACTERS",
        condition: {
          type: "in-challenge",
          role: "attacker",
          againstCardType: "location",
        },
      },
    },
  ],
};
