import type { CharacterCard } from "@tcg/lorcana-types";

export const anitaRadcliffeDogLover: CharacterCard = {
  id: "q1w",
  canonicalId: "ci_q1w",
  reprints: ["set8-155"],
  cardType: "character",
  name: "Anita Radcliffe",
  version: "Dog Lover",
  i18n: {
    en: {
      name: "Anita Radcliffe",
      version: "Dog Lover",
      text: [
        {
          title: "I'LL TAKE CARE OF YOU",
          description:
            "When you play this character, you may give chosen Puppy character Resist +1 until the start of your next turn.",
        },
      ],
    },
    de: {
      name: "Anita Radcliffe",
      version: "Hundeliebhaberin",
      text: [
        {
          title: "ICH KÜMMERE MICH UM DICH",
          description:
            "Wenn du diesen Charakter ausspielst, darfst du einem Welpen deiner Wahl bis zu Beginn deines nächsten Zuges Robust +1 geben. (Reduziere jeglichen Schaden, der dem Charakter zugefügt wird, um 1.)",
        },
      ],
    },
    fr: {
      name: "Anita Radcliffe",
      version: "Passionnée de chiens",
      text: [
        {
          title: "JE PRENDRAI SOIN DE TOI",
          description:
            "Lorsque vous jouez ce personnage, vous pouvez choisir un personnage Chiot qui gagne Résistance +1 jusqu'au début de votre prochain tour.",
        },
      ],
    },
    it: {
      name: "Anita Radcliffe",
      version: "Amante dei Cani",
      text: [
        {
          title: "MI PRENDERÒ CURA DI TE",
          description:
            "Quando giochi questo personaggio, puoi dare Resistere +1 a un personaggio Cucciolo a tua scelta fino all'inizio del tuo prossimo turno.",
        },
      ],
    },
  },
  inkType: ["sapphire"],
  franchise: "101 Dalmatians",
  set: "008",
  cardNumber: 155,
  rarity: "common",
  cost: 3,
  strength: 3,
  willpower: 3,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_3e1fbfdb7f9c42119cd02bba07f694e7",
    tcgPlayer: 633100,
  },
  text: [
    {
      title: "I'LL TAKE CARE OF YOU",
      description:
        "When you play this character, you may give chosen Puppy character Resist +1 until the start of your next turn.",
    },
  ],
  classifications: ["Storyborn", "Ally"],
  abilities: [
    {
      effect: {
        from: "hand",
        type: "play-card",
      },
      id: "id4-1",
      name: "I'LL TAKE CARE OF YOU",
      text: "I'LL TAKE CARE OF YOU When you play this character, you may give chosen Puppy character Resist +1 until the start of your next turn.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
