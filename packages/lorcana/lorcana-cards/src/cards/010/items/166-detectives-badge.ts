import type { ItemCard } from "@tcg/lorcana-types";

export const detectivesBadge: ItemCard = {
  id: "os1",
  canonicalId: "ci_os1",
  reprints: ["set10-166"],
  cardType: "item",
  name: "Detective's Badge",
  i18n: {
    en: {
      name: "Detective's Badge",
      text: [
        {
          title: "PROTECT AND SERVE",
          description:
            "{E}, 1 {I} — Chosen character gains Resist +1 and the Detective classification until the start of your next turn.",
        },
      ],
    },
    de: {
      name: "Dienstmarke",
      text: [
        {
          title: "SCHÜTZEN UND DIENEN,",
          description:
            "1 — Ein Charakter deiner Wahl erhält bis zu Beginn deines nächsten Zuges Robust +1 und die Klassifizierung Detektiv. (Reduziere jeglichen Schaden, der dem Charakter zugefügt wird, um 1.)",
        },
      ],
    },
    fr: {
      name: "Badge de police",
      text: [
        {
          title: "PROTÉGER ET SERVIR,",
          description:
            "1 — Choisissez un personnage qui gagne Résistance +1 et la classification Détective jusqu'au début de votre prochain tour.",
        },
      ],
    },
    it: {
      name: "Distintivo da Detective",
      text: [
        {
          title: "PROTEGGERE E SERVIRE, 1",
          description:
            "— Un personaggio a tua scelta ottiene Resistere +1 e la classificazione Detective fino all'inizio del tuo prossimo turno.",
        },
      ],
    },
  },
  inkType: ["sapphire"],
  franchise: "Zootropolis",
  set: "010",
  cardNumber: 166,
  rarity: "common",
  cost: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_423d5717f2d347448441e9da6d022847",
    tcgPlayer: 660340,
  },
  text: [
    {
      title: "PROTECT AND SERVE",
      description:
        "{E}, 1 {I} — Chosen character gains Resist +1 and the Detective classification until the start of your next turn.",
    },
  ],
  abilities: [],
};
