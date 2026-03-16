import type { CharacterCard } from "@tcg/lorcana-types";

export const goofyGhostHunter: CharacterCard = {
  id: "LuA",
  canonicalId: "ci_A5H",
  reprints: ["set10-021"],
  cardType: "character",
  name: "Goofy",
  version: "Ghost Hunter",
  i18n: {
    en: {
      name: "Goofy",
      version: "Ghost Hunter",
      text: [
        {
          title: "PERFECT TRAP",
          description:
            "When you play this character, chosen opposing character gets -1 {S} until the start of your next turn.",
        },
      ],
    },
    de: {
      name: "Goofy",
      version: "Geisterjäger",
      text: [
        {
          title: "PERFEKTE FALLE",
          description:
            "Wenn du diesen Charakter ausspielst, erhält ein gegnerischer Charakter deiner Wahl bis zu Beginn deines nächsten Zuges -1.",
        },
      ],
    },
    fr: {
      name: "Dingo",
      version: "Chasseur de fantômes",
      text: [
        {
          title: "LE PIÈGE PARFAIT",
          description:
            "Lorsque vous jouez ce personnage, choisissez un personnage adverse qui subit -1 jusqu'au début de votre prochain tour.",
        },
      ],
    },
    it: {
      name: "Pippo",
      version: "Cacciatore di Fantasmi",
      text: [
        {
          title: "TRAPPOLA PERFETTA",
          description:
            "Quando giochi questo personaggio, un personaggio avversario a tua scelta riceve -1 fino all'inizio del tuo prossimo turno.",
        },
      ],
    },
  },
  inkType: ["amber"],
  set: "010",
  cardNumber: 21,
  rarity: "common",
  cost: 4,
  strength: 4,
  willpower: 5,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_6283ca50c61544b7a6226fadbc7f0a17",
    tcgPlayer: 660359,
  },
  text: [
    {
      title: "PERFECT TRAP",
      description:
        "When you play this character, chosen opposing character gets -1 {S} until the start of your next turn.",
    },
  ],
  classifications: ["Dreamborn", "Hero", "Detective"],
  abilities: [
    {
      effect: {
        modifier: -1,
        stat: "strength",
        target: "CHOSEN_CHARACTER",
        type: "modify-stat",
      },
      id: "1mg-1",
      name: "PERFECT TRAP",
      text: "PERFECT TRAP When you play this character, chosen opposing character gets -1 {S} until the start of your next turn.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
