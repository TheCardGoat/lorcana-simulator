import type { ItemCard } from "@tcg/lorcana-types";

export const plateArmor: ItemCard = {
  id: "12X",
  canonicalId: "ci_12X",
  reprints: ["set5-201"],
  cardType: "item",
  name: "Plate Armor",
  i18n: {
    en: {
      name: "Plate Armor",
      text: [
        {
          title: "WELL CRAFTED",
          description: "{E} — Chosen character gains Resist +2 until the start of your next turn.",
        },
      ],
    },
    de: {
      name: "Plattenrüstung",
      text: [
        {
          title: "GUTE HANDWERKSKUNST",
          description:
            "— Ein Charakter deiner Wahl erhält bis zu Beginn deines nächsten Zuges Robust +2. (Reduziere jeglichen Schaden, der dem Charakter zugefügt wird, um 2.)",
        },
      ],
    },
    fr: {
      name: "Armure de plaques",
      text: [
        {
          title: "D'EXCELLENTE FACTURE",
          description:
            "— Choisissez un personnage qui gagne Résistance +2 jusqu'au début de votre prochain tour.",
        },
      ],
    },
    it: {
      name: "Armatura a Piastre",
      text: [
        {
          title: "BEN FATTA",
          description:
            "— Un personaggio a tua scelta ottiene Resistere +2 fino all'inizio del tuo prossimo turno.",
        },
      ],
    },
  },
  inkType: ["steel"],
  franchise: "Sword in the Stone",
  set: "005",
  cardNumber: 201,
  rarity: "rare",
  cost: 4,
  inkable: false,
  externalIds: {
    lorcast: "crd_170330e953034b0b84419cfff824f737",
    tcgPlayer: 561195,
  },
  text: [
    {
      title: "WELL CRAFTED",
      description: "{E} — Chosen character gains Resist +2 until the start of your next turn.",
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
        value: 2,
      },
      id: "14f-1",
      name: "WELL CRAFTED",
      text: "WELL CRAFTED {E} — Chosen character gains Resist +2 until the start of your next turn.",
      type: "activated",
    },
  ],
};
