import type { CharacterCard } from "@tcg/lorcana-types";

export const theHeadlessHorsemanTerrorOfSleepyHollow: CharacterCard = {
  id: "nGJ",
  canonicalId: "ci_3XX",
  reprints: ["set10-125"],
  cardType: "character",
  name: "The Headless Horseman",
  version: "Terror of Sleepy Hollow",
  i18n: {
    en: {
      name: "The Headless Horseman",
      version: "Terror of Sleepy Hollow",
      text: [
        {
          title: "LEAVES NO TRACE",
          description:
            "When you play this character, banish chosen opposing character with 2 {S} or less.",
        },
        {
          title: "GATHERING STRENGTH",
          description:
            "During your turn, whenever an opposing character is banished, each of your characters gets +1 {S} this turn.",
        },
      ],
    },
    de: {
      name: "Der kopflose Reiter",
      version: "Schrecken von Sleepy Hollow",
      text: [
        {
          title: "HINTERLÄSST KEINE SPUREN",
          description:
            "Wenn du diesen Charakter ausspielst, verbanne einen gegnerischen Charakter deiner Wahl mit 2 oder weniger.",
        },
        {
          title: "KRÄFTE SAMMELN",
          description:
            "Jedes Mal während deines Zuges, wenn ein gegnerischer Charakter verbannt wird, erhalten deine Charaktere in diesem Zug +1.",
        },
      ],
    },
    fr: {
      name: "Le Cavalier sans tête",
      version: "Terreur de Sleepy Hollow",
      text: [
        {
          title: "SANS LAISSER DE TRACE",
          description:
            "Lorsque vous jouez ce personnage, choisissez un personnage adverse ayant 2 ou moins et bannissez-le.",
        },
        {
          title: "COLLECTANT LA FORCE",
          description:
            "Durant votre tour, chaque fois qu'un personnage adverse est banni, chacun de vos personnages gagne +1 pour le reste de ce tour.",
        },
      ],
    },
    it: {
      name: "Il Cavaliere Senza Testa",
      version: "Terrore della Valle Addormentata",
      text: [
        {
          title: "NON LASCIA TRACCE",
          description:
            "Quando giochi questo personaggio, esilia un personaggio avversario a tua scelta con 2 o inferiore.",
        },
        {
          title: "ACCUMULARE FORZA",
          description:
            "Durante il tuo turno, ogni volta che un personaggio avversario viene esiliato, ogni tuo personaggio riceve +1 per questo turno.",
        },
      ],
    },
  },
  inkType: ["ruby"],
  franchise: "Sleepy Hollow",
  set: "010",
  cardNumber: 125,
  rarity: "legendary",
  cost: 5,
  strength: 4,
  willpower: 2,
  lore: 2,
  inkable: false,
  externalIds: {
    lorcast: "crd_c2a0cc56159841db921d13a52589d13a",
    tcgPlayer: 660012,
  },
  text: [
    {
      title: "LEAVES NO TRACE",
      description:
        "When you play this character, banish chosen opposing character with 2 {S} or less.",
    },
    {
      title: "GATHERING STRENGTH",
      description:
        "During your turn, whenever an opposing character is banished, each of your characters gets +1 {S} this turn.",
    },
  ],
  classifications: ["Storyborn", "Villain"],
  abilities: [
    {
      effect: {
        target: {
          cardTypes: ["character"],
          count: 1,
          owner: "opponent",
          selector: "chosen",
          zones: ["play"],
        },
        type: "banish",
      },
      id: "171-1",
      name: "LEAVES NO TRACE",
      text: "LEAVES NO TRACE When you play this character, banish chosen opposing character with 2 {S} or less.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
    {
      effect: {
        duration: "this-turn",
        modifier: 1,
        stat: "strength",
        target: "YOUR_CHARACTERS",
        type: "modify-stat",
      },
      id: "171-2",
      name: "GATHERING STRENGTH",
      text: "GATHERING STRENGTH During your turn, whenever an opposing character is banished, each of your characters gets +1 {S} this turn.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
