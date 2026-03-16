import type { ItemCard } from "@tcg/lorcana-types";

export const inscrutableMap: ItemCard = {
  id: "EeQ",
  canonicalId: "ci_EeQ",
  reprints: ["set10-099"],
  cardType: "item",
  name: "Inscrutable Map",
  i18n: {
    en: {
      name: "Inscrutable Map",
      text: [
        {
          title: "BACKTRACK",
          description:
            "{E}, 1 {I} — Chosen opposing character gets -1 {L} until the start of your next turn.",
        },
      ],
    },
    de: {
      name: "Unergründliche Karte",
      text: [
        {
          title: "ZURÜCKVERFOLGEN,",
          description:
            "1 — Ein gegnerischer Charakter deiner Wahl erhält bis zu Beginn deines nächsten Zuges -1.",
        },
      ],
    },
    fr: {
      name: "Carte indéchiffrable",
      text: [
        {
          title: "REBROUSSER CHEMIN, 1",
          description:
            "— Choisissez un personnage adverse qui subit -1 jusqu'au début de votre prochain tour.",
        },
      ],
    },
    it: {
      name: "Mappa Imperscrutabile",
      text: [
        {
          title: "TORNARE SUI PROPRI PASSI, 1",
          description:
            "— Un personaggio avversario a tua scelta riceve -1 fino all'inizio del tuo prossimo turno.",
        },
      ],
    },
  },
  inkType: ["emerald"],
  franchise: "Lorcana",
  set: "010",
  cardNumber: 99,
  rarity: "uncommon",
  cost: 3,
  inkable: true,
  externalIds: {
    lorcast: "crd_9c1be117f6004fffaa9455c468395bf7",
    tcgPlayer: 658445,
  },
  text: [
    {
      title: "BACKTRACK",
      description:
        "{E}, 1 {I} — Chosen opposing character gets -1 {L} until the start of your next turn.",
    },
  ],
  abilities: [
    {
      cost: {
        exert: true,
        ink: 1,
      },
      effect: {
        duration: "until-start-of-next-turn",
        modifier: -1,
        stat: "lore",
        target: {
          selector: "chosen",
          count: 1,
          owner: "opponent",
          zones: ["play"],
          cardTypes: ["character"],
        },
        type: "modify-stat",
      },
      id: "fpa-1",
      name: "BACKTRACK",
      text: "BACKTRACK {E}, 1 {I} — Chosen opposing character gets -1 {L} until the start of your next turn.",
      type: "activated",
    },
  ],
};
