import type { ItemCard } from "@tcg/lorcana-types";

export const inkrunner: ItemCard = {
  id: "VpM",
  canonicalId: "ci_VpM",
  reprints: ["set10-169"],
  cardType: "item",
  name: "Inkrunner",
  i18n: {
    en: {
      name: "Inkrunner",
      text: [
        {
          title: "PREFLIGHT CHECK",
          description: "When you play this item, draw a card.",
        },
        {
          title: "READY TO RIDE",
          description:
            "{E}, 1 {I} — Chosen character gains Alert this turn. (They can challenge as if they had Evasive.)",
        },
      ],
    },
    de: {
      name: "Tintenflügel",
      text: [
        {
          title: "KONTROLLE VOR DEM FLUG",
          description:
            "Wenn du diesen Gegenstand ausspielst, ziehe 1 Karte. BEREIT ZUM ABFLUG, 1 — Ein Charakter deiner Wahl erhält in diesem Zug Alarmiert. (Der Charakter kann herausfordern, als hätte er Wendig.)",
        },
      ],
    },
    fr: {
      name: "Encre-jet",
      text: [
        {
          title: "PRÉPARATIFS DE VOL",
          description:
            "Lorsque vous jouez cet objet, piochez une carte. PARÉ À VOLER, 1 — Choisissez un personnage qui gagne Agilité pour le reste de ce tour. (Il peut défier comme s'il avait Insaisissable.)",
        },
      ],
    },
    it: {
      name: "Alainchiostro",
      text: [
        {
          title: "VERIFICA PRE-VOLO",
          description:
            "Quando giochi questo oggetto, pesca una carta. PRONTO A PARTIRE, 1 — Un personaggio a tua scelta ottiene Vigile per questo turno. (Può sfidare come se avesse Sfuggente.)",
        },
      ],
    },
  },
  inkType: ["sapphire"],
  franchise: "Lorcana",
  set: "010",
  cardNumber: 169,
  rarity: "uncommon",
  cost: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_2e63442a36994d4fa8266285fe63addd",
    tcgPlayer: 659389,
  },
  text: [
    {
      title: "PREFLIGHT CHECK",
      description: "When you play this item, draw a card.",
    },
    {
      title: "READY TO RIDE",
      description:
        "{E}, 1 {I} — Chosen character gains Alert this turn. (They can challenge as if they had Evasive.)",
    },
  ],
  abilities: [
    {
      effect: {
        amount: 1,
        target: "CONTROLLER",
        type: "draw",
      },
      id: "u80-1",
      name: "PREFLIGHT CHECK",
      text: "PREFLIGHT CHECK When you play this item, draw a card.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
    {
      name: "READY TO RIDE",
      type: "activated",
      cost: {
        exert: true,
        ink: 1,
      },
      effect: {
        duration: "this-turn",
        keyword: "Alert",
        target: {
          cardTypes: ["character"],
          count: 1,
          owner: "any",
          selector: "chosen",
          zones: ["play"],
        },
        type: "gain-keyword",
      },
      id: "u80-2",
      text: "READY TO RIDE {E}, 1 {I} — Chosen character gains Alert this turn.",
    },
  ],
};
