import type { CharacterCard } from "@tcg/lorcana-types";

export const stitchNaughtyExperiment: CharacterCard = {
  id: "wMm",
  canonicalId: "ci_wMm",
  reprints: ["set11-070"],
  cardType: "character",
  name: "Stitch",
  version: "Naughty Experiment",
  i18n: {
    en: {
      name: "Stitch",
      version: "Naughty Experiment",
      text: [
        {
          title: "I DARE YOU!",
          description:
            "{E} — Chosen opposing character gains Reckless until the start of your next turn. (They can't quest and must challenge if able.)",
        },
      ],
    },
    de: {
      name: "Stitch",
      version: "Freches Experiment",
      text: [
        {
          title: "TRAU DICH!",
          description:
            "— Ein gegnerischer Charakter deiner Wahl erhält bis zu Beginn deines nächsten Zuges Impulsiv. (Der Charakter kann nicht erkunden und muss herausfordern, wenn möglich.)",
        },
      ],
    },
    fr: {
      name: "Stitch",
      version: "Expérience taquine",
      text: [
        {
          title: "T'OSERAS JAMAIS!",
          description:
            "— Choisissez un personnage adverse qui gagne Combattant jusqu'au début de votre prochain tour.",
        },
      ],
    },
    it: {
      name: "Stitch",
      version: "Esperimento Impertinente",
      text: [
        {
          title: "TI SFIDO!",
          description:
            "— Un personaggio avversario a tua scelta ottiene Attaccabrighe fino all'inizio del tuo prossimo turno. (Non può andare all'avventura e deve sfidare, se possibile.)",
        },
      ],
    },
  },
  inkType: ["emerald"],
  franchise: "Lilo and Stitch",
  set: "011",
  cardNumber: 70,
  rarity: "common",
  cost: 1,
  strength: 2,
  willpower: 1,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_38185e538f0e444bbffd676c96efd9c9",
    tcgPlayer: 675386,
  },
  text: [
    {
      title: "I DARE YOU!",
      description:
        "{E} — Chosen opposing character gains Reckless until the start of your next turn. (They can't quest and must challenge if able.)",
    },
  ],
  classifications: ["Storyborn", "Hero", "Alien"],
  abilities: [
    {
      id: "1hh-1",
      cost: {
        exert: true,
      },
      effect: {
        keyword: "Reckless",
        target: "CHOSEN_CHARACTER",
        type: "gain-keyword",
      },
      type: "activated",
      text: "I DARE YOU! {E} — Chosen opposing character gains Reckless until the start of your next turn.",
    },
  ],
};
