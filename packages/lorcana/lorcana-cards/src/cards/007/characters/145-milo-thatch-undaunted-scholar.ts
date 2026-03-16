import type { CharacterCard } from "@tcg/lorcana-types";

export const miloThatchUndauntedScholar: CharacterCard = {
  id: "eBp",
  canonicalId: "ci_eBp",
  reprints: ["set7-145"],
  cardType: "character",
  name: "Milo Thatch",
  version: "Undaunted Scholar",
  i18n: {
    en: {
      name: "Milo Thatch",
      version: "Undaunted Scholar",
      text: [
        {
          title: "I'M YOUR GUY",
          description:
            "Whenever you play an action, you may give chosen character +2 {S} this turn.",
        },
      ],
    },
    de: {
      name: "Milo Thatch",
      version: "Unerschrockener Wissenschaftler",
      text: [
        {
          title: "ICH BIN DEIN MANN",
          description:
            "Jedes Mal, wenn du eine Aktion ausspielst, darfst du einem Charakter deiner Wahl in diesem Zug +2 geben.",
        },
      ],
    },
    fr: {
      name: "Milo Thatch",
      version: "Universitaire intrépide",
      text: [
        {
          title: "JE SUIS VOTRE HOMME",
          description:
            "Chaque fois que vous jouez une action, vous pouvez choisir un personnage qui gagne +2 pour le reste de ce tour.",
        },
      ],
    },
    it: {
      name: "Milo Thatch",
      version: "Studioso Imperterrito",
      text: [
        {
          title: "SONO IL TUO UOMO",
          description:
            "Ogni volta che giochi un'azione, puoi dare +2 a un personaggio a tua scelta per questo turno.",
        },
      ],
    },
  },
  inkType: ["ruby"],
  franchise: "Atlantis",
  set: "007",
  cardNumber: 145,
  rarity: "rare",
  cost: 2,
  strength: 2,
  willpower: 2,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_afc3f865b594418e86f60e638df7351b",
    tcgPlayer: 619489,
  },
  text: [
    {
      title: "I'M YOUR GUY",
      description: "Whenever you play an action, you may give chosen character +2 {S} this turn.",
    },
  ],
  classifications: ["Storyborn", "Hero"],
  abilities: [
    {
      effect: {
        cardType: "action",
        from: "hand",
        type: "play-card",
      },
      id: "1ah-1",
      name: "I'M YOUR GUY",
      text: "I'M YOUR GUY Whenever you play an action, you may give chosen character +2 {S} this turn.",
      trigger: {
        event: "play",
        on: {
          cardType: "action",
          controller: "you",
        },
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
};
