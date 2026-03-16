import type { ItemCard } from "@tcg/lorcana-types";

export const shieldOfArendelle: ItemCard = {
  id: "k2d",
  canonicalId: "ci_k2d",
  reprints: ["set5-200"],
  cardType: "item",
  name: "Shield of Arendelle",
  i18n: {
    en: {
      name: "Shield of Arendelle",
      text: [
        {
          title: "DEFLECT",
          description:
            "Banish this item — Chosen character gains Resist +1 until the start of your next turn.",
        },
      ],
    },
    de: {
      name: "Schild von Arendelle",
      text: [
        {
          title: "ABWEHREN",
          description:
            "Verbanne diesen Gegenstand — Ein Charakter deiner Wahl erhält bis zu Beginn deines nächsten Zuges Robust +1. (Reduziere jeglichen Schaden, der dem Charakter zugefügt wird, um 1.)",
        },
      ],
    },
    fr: {
      name: "Bouclier d'Arendelle",
      text: [
        {
          title: "PARADE",
          description:
            "Bannissez cet objet — Choisissez un personnage qui gagne Résistance +1 jusqu'au début de votre prochain tour.",
        },
      ],
    },
    it: {
      name: "Scudo di Arendelle",
      text: [
        {
          title: "DEVIARE",
          description:
            "Esilia questo oggetto — Un personaggio a tua scelta ottiene Resistere +1 fino all'inizio del tuo prossimo turno.",
        },
      ],
    },
  },
  inkType: ["steel"],
  franchise: "Frozen",
  set: "005",
  cardNumber: 200,
  rarity: "common",
  cost: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_c54910dbfc304bb5b4e71639858ceb82",
    tcgPlayer: 561851,
  },
  text: [
    {
      title: "DEFLECT",
      description:
        "Banish this item — Chosen character gains Resist +1 until the start of your next turn.",
    },
  ],
  abilities: [
    {
      cost: {
        banishSelf: true,
      },
      effect: {
        duration: "until-start-of-next-turn",
        keyword: "Resist",
        target: "CHOSEN_CHARACTER",
        type: "gain-keyword",
        value: 1,
      },
      id: "rd3-1",
      name: "DEFLECT",
      text: "DEFLECT Banish this item — Chosen character gains Resist +1 until the start of your next turn.",
      type: "activated",
    },
  ],
};
