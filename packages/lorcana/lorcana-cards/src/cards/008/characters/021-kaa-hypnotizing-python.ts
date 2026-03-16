import type { CharacterCard } from "@tcg/lorcana-types";

export const kaaHypnotizingPython: CharacterCard = {
  id: "mhw",
  canonicalId: "ci_mhw",
  reprints: ["set8-021"],
  cardType: "character",
  name: "Kaa",
  version: "Hypnotizing Python",
  i18n: {
    en: {
      name: "Kaa",
      version: "Hypnotizing Python",
      text: [
        {
          title: "LOOK ME IN THE EYE",
          description:
            "Whenever this character quests, chosen opposing character gets -2 {S} and gains Reckless until the start of your next turn. (They can't quest and must challenge if able.)",
        },
      ],
    },
    de: {
      name: "Kaa",
      version: "Hypnotisierende Python",
      text: [
        {
          title: "SCHAU MIR IN DIE AUGEN",
          description:
            "Jedes Mal, wenn dieser Charakter erkundet, erhält ein gegnerischer Charakter deiner Wahl bis zu Beginn deines nächsten Zuges -2 und Impulsiv. (Der Charakter kann nicht erkunden und muss herausfordern, wenn möglich.)",
        },
      ],
    },
    fr: {
      name: "Kaa",
      version: "Python hypnotiseur",
      text: [
        {
          title: "REGARDE-MOI DANS LES YEUX",
          description:
            "Chaque fois que ce personnage est envoyé à l'aventure, choisissez un personnage adverse qui subit -2 et qui gagne Combattant jusqu'au début de votre prochain tour.",
        },
      ],
    },
    it: {
      name: "Kaa",
      version: "Pitone Ipnotico",
      text: [
        {
          title: "GUARDAMI NEGLI OCCHI",
          description:
            "Ogni volta che questo personaggio va all'avventura, un personaggio avversario a tua scelta riceve -2 e ottiene Attaccabrighe fino all'inizio del tuo prossimo turno. (Non può andare all'avventura e deve sfidare, se possibile.)",
        },
      ],
    },
  },
  inkType: ["amber", "emerald"],
  franchise: "Jungle Book",
  set: "008",
  cardNumber: 21,
  rarity: "uncommon",
  cost: 4,
  strength: 3,
  willpower: 3,
  lore: 2,
  inkable: false,
  externalIds: {
    lorcast: "crd_c71a707f446d4f01b5c4e66bdde91643",
    tcgPlayer: 631365,
  },
  text: [
    {
      title: "LOOK ME IN THE EYE",
      description:
        "Whenever this character quests, chosen opposing character gets -2 {S} and gains Reckless until the start of your next turn. (They can't quest and must challenge if able.)",
    },
  ],
  classifications: ["Storyborn", "Villain"],
  abilities: [
    {
      effect: {
        steps: [
          {
            modifier: -2,
            stat: "strength",
            target: "CHOSEN_CHARACTER",
            type: "modify-stat",
          },
          {
            keyword: "Reckless",
            target: "SELF",
            type: "gain-keyword",
          },
        ],
        type: "sequence",
      },
      id: "1v1-1",
      name: "LOOK ME IN THE EYE",
      text: "LOOK ME IN THE EYE Whenever this character quests, chosen opposing character gets -2 {S} and gains Reckless until the start of your next turn.",
      trigger: {
        event: "quest",
        on: "SELF",
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
};
