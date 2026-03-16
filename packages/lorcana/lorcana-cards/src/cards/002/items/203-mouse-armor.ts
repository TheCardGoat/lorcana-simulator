import type { ItemCard } from "@tcg/lorcana-types";

export const mouseArmor: ItemCard = {
  id: "ab5",
  canonicalId: "ci_ab5",
  reprints: ["set2-203"],
  cardType: "item",
  name: "Mouse Armor",
  i18n: {
    en: {
      name: "Mouse Armor",
      text: [
        {
          title: "PROTECTION",
          description: "{E} — Chosen character gains Resist +1 until the start of your next turn.",
        },
      ],
    },
    de: {
      name: "Mäuserüstung",
      text: [
        {
          title: "SCHUTZ",
          description:
            "— Ein Charakter deiner Wahl erhält bis zu Beginn deines nächsten Zuges Robust +1. (Reduziere jeglichen Schaden, der dem Charakter zugefügt wird, um 1.)",
        },
      ],
    },
    fr: {
      name: "Armure de souris",
      text: [
        {
          title: "PROTECTION",
          description:
            "— Choisissez un personnage, il gagne Résistance +1 jusqu'au début de votre prochain tour.",
        },
      ],
    },
    it: {
      name: "Armatura per Topi",
      text: [
        {
          title: "PROTEZIONE",
          description:
            "— Un personaggio a tua scelta ottiene Resistere +1 fino all'inizio del tuo prossimo turno.",
        },
      ],
    },
  },
  inkType: ["steel"],
  franchise: "Great Mouse Detective",
  set: "002",
  cardNumber: 203,
  rarity: "uncommon",
  cost: 2,
  inkable: false,
  externalIds: {
    lorcast: "crd_a529727601b84e9ca6f8b5052d1d2572",
    tcgPlayer: 520862,
  },
  text: [
    {
      title: "PROTECTION",
      description: "{E} — Chosen character gains Resist +1 until the start of your next turn.",
    },
  ],
  abilities: [
    {
      cost: {
        exert: true,
      },
      effect: {
        duration: "until-start-of-next-turn",
        keyword: "Resist",
        target: "CHOSEN_CHARACTER",
        type: "gain-keyword",
        value: 1,
      },
      id: "1as-1",
      name: "PROTECTION",
      text: "PROTECTION {E} — Chosen character gains Resist +1 until the start of your next turn.",
      type: "activated",
    },
  ],
};
