import type { ItemCard } from "@tcg/lorcana-types";

export const gizmosuit: ItemCard = {
  id: "Ip9",
  canonicalId: "ci_Ip9",
  reprints: ["set3-200"],
  cardType: "item",
  name: "Gizmosuit",
  i18n: {
    en: {
      name: "Gizmosuit",
      text: [
        {
          title: "CYBERNETIC ARMOR",
          description:
            "Banish this item — Chosen character gains Resist +2 until the start of your next turn.",
        },
      ],
    },
    de: {
      name: "Krachbumm-Anzug",
      text: [
        {
          title: "CYBERNETISCHE",
          description:
            "RÜSTUNG Verbanne diesen Gegenstand — Ein Charakter deiner Wahl erhält bis zu Beginn deines nächsten Zuges Robust +2. (Reduziere jeglichen Schaden, der dem Charakter zugefügt wird, um 2.)",
        },
      ],
    },
    fr: {
      name: "Le costume de Robotik",
      text: [
        {
          title: "ARMURE",
          description:
            "CYBERNÉTIQUE Bannissez cet objet — Choisissez un personnage, il gagne Résistance +2 jusqu'au début de votre prochain tour.",
        },
      ],
    },
    it: {
      name: "Armatura di Robopap",
      text: [
        {
          title: "CORAZZA CIBERNETICA",
          description:
            "Esilia questo oggetto — Un personaggio a tua scelta ottiene Resistere +2 fino all'inizio del tuo prossimo turno.",
        },
      ],
    },
  },
  inkType: ["steel"],
  franchise: "Ducktales",
  set: "003",
  cardNumber: 200,
  rarity: "common",
  cost: 3,
  inkable: true,
  externalIds: {
    lorcast: "crd_4ffb52f1841e434f9263e1b8973f46a6",
    tcgPlayer: 538292,
  },
  text: [
    {
      title: "CYBERNETIC ARMOR",
      description:
        "Banish this item — Chosen character gains Resist +2 until the start of your next turn.",
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
        target: {
          cardTypes: ["character"],
          count: 1,
          owner: "any",
          selector: "chosen",
          zones: ["play"],
        },
        type: "gain-keyword",
        value: 2,
      },
      id: "1ip-1",
      name: "CYBERNETIC ARMOR",
      text: "CYBERNETIC ARMOR Banish this item — Chosen character gains Resist +2 until the start of your next turn.",
      type: "activated",
    },
  ],
};
