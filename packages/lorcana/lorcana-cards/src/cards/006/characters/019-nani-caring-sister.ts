import type { CharacterCard } from "@tcg/lorcana-types";

export const naniCaringSister: CharacterCard = {
  id: "eOi",
  canonicalId: "ci_eOi",
  reprints: ["set6-019"],
  cardType: "character",
  name: "Nani",
  version: "Caring Sister",
  i18n: {
    en: {
      name: "Nani",
      version: "Caring Sister",
      text: [
        {
          title: "Support",
        },
        {
          title: "I AM SO SORRY 2",
          description: "{I} — Chosen character gets -1 {S} until the start of your next turn.",
        },
      ],
    },
    de: {
      name: "Nani",
      version: "Fürsorgliche Schwester",
      text: "Unterstützen (Jedes Mal, wenn dieser Charakter erkundet, darfst du seine in diesem Zug zur eines anderen Charakters deiner Wahl addieren.) ES TUT MIR SO LEID 2 — Gib einem Charakter deiner Wahl bis zu Beginn deines nächsten Zuges -1.",
    },
    fr: {
      name: "Nani",
      version: "Sœur bienveillante",
      text: "Soutien JE SUIS SINCÈREMENT DÉSOLÉE 2 — Choisissez un personnage qui subit -1 jusqu'au début de votre prochain tour.",
    },
    it: {
      name: "Nani",
      version: "Sorella Premurosa",
      text: "Aiutante MI DISPIACE MOLTO 2 — Un personaggio a tua scelta riceve -1 fino all'inizio del tuo prossimo turno.",
    },
  },
  inkType: ["amber"],
  franchise: "Lilo and Stitch",
  set: "006",
  cardNumber: 19,
  rarity: "rare",
  cost: 5,
  strength: 3,
  willpower: 5,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_43a7721fdfb145f8a5216c85da2c77ec",
    tcgPlayer: 592005,
  },
  text: [
    {
      title: "Support",
    },
    {
      title: "I AM SO SORRY 2",
      description: "{I} — Chosen character gets -1 {S} until the start of your next turn.",
    },
  ],
  classifications: ["Storyborn", "Hero"],
  abilities: [
    {
      id: "1fu-1",
      keyword: "Support",
      text: "Support",
      type: "keyword",
    },
    {
      effect: {
        modifier: -1,
        stat: "strength",
        target: {
          cardTypes: ["character"],
          count: 1,
          owner: "any",
          selector: "chosen",
          zones: ["play"],
        },
        type: "modify-stat",
      },
      id: "1fu-2",
      text: "I AM SO SORRY 2 {I} - Chosen character gets -1 {S} until the start of your next turn.",
      type: "action",
    },
  ],
};
