import type { CharacterCard } from "@tcg/lorcana-types";

export const brunoMadrigalSingleminded: CharacterCard = {
  id: "qZd",
  canonicalId: "ci_qZd",
  reprints: ["set8-051"],
  cardType: "character",
  name: "Bruno Madrigal",
  version: "Single-Minded",
  i18n: {
    en: {
      name: "Bruno Madrigal",
      version: "Single-Minded",
      text: [
        {
          title: "STANDING TALL",
          description:
            "When you play this character, chosen opposing character can't ready at the start of their next turn.",
        },
      ],
    },
    de: {
      name: "Bruno Madrigal",
      version: "Zielstrebig",
      text: [
        {
          title: "STEHT AUFRECHT",
          description:
            "Wenn du diesen Charakter ausspielst, wähle einen gegnerischen Charakter. Er wird zu Beginn seines nächsten Zuges nicht bereit gemacht.",
        },
      ],
    },
    fr: {
      name: "Bruno Madrigal",
      version: "Obsessionnel",
      text: [
        {
          title: "FIÈREMENT DRESSÉ",
          description:
            "Lorsque vous jouez ce personnage, choisissez un personnage adverse qui ne se redresse pas au début de son prochain tour.",
        },
      ],
    },
    it: {
      name: "Bruno Madrigal",
      version: "Determinato",
      text: [
        {
          title: "A TESTA ALTA",
          description:
            "Quando giochi questo personaggio, un personaggio avversario a tua scelta non si può preparare all'inizio del suo prossimo turno.",
        },
      ],
    },
  },
  inkType: ["amethyst"],
  franchise: "Encanto",
  set: "008",
  cardNumber: 51,
  rarity: "common",
  cost: 4,
  strength: 3,
  willpower: 4,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_8aa3ca8ac51847e2987d4798c5ddb893",
    tcgPlayer: 631385,
  },
  text: [
    {
      title: "STANDING TALL",
      description:
        "When you play this character, chosen opposing character can't ready at the start of their next turn.",
    },
  ],
  classifications: ["Storyborn", "Ally", "Madrigal"],
  abilities: [
    {
      effect: {
        duration: "until-start-of-next-turn",
        restriction: "cant-ready",
        target: "SELF",
        type: "restriction",
      },
      id: "1a1-1",
      name: "STANDING TALL",
      text: "STANDING TALL When you play this character, chosen opposing character can't ready at the start of their next turn.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
