import type { CharacterCard } from "@tcg/lorcana-types";

export const basilTenaciousMouse: CharacterCard = {
  id: "1XP",
  canonicalId: "ci_1XP",
  reprints: ["set10-179"],
  cardType: "character",
  name: "Basil",
  version: "Tenacious Mouse",
  i18n: {
    en: {
      name: "Basil",
      version: "Tenacious Mouse",
      text: [
        {
          title: "HOLD YOUR GROUND",
          description:
            "Whenever you play another Detective character, this character gains Resist +1 until the start of your next turn.",
        },
      ],
    },
    de: {
      name: "Basil",
      version: "Hartnäckige Maus",
      text: [
        {
          title: "HÄLT DIE STELLUNG",
          description:
            "Jedes Mal, wenn du einen anderen Detektiv ausspielst, erhält dieser Charakter bis zu Beginn deines nächsten Zuges Robust +1. (Reduziere jeglichen Schaden, der diesem Charakter zugefügt wird, um 1.)",
        },
      ],
    },
    fr: {
      name: "Basil",
      version: "Souris tenace",
      text: [
        {
          title: "TENIR LA POSITION",
          description:
            "Chaque fois que vous jouez un autre personnage Détective, ce personnage-ci gagne Résistance +1 jusqu'au début de votre prochain tour.",
        },
      ],
    },
    it: {
      name: "Basil",
      version: "Topo Tenace",
      text: [
        {
          title: "DIFENDERE LA POSIZIONE",
          description:
            "Ogni volta che giochi un altro personaggio Detective, questo personaggio ottiene Resistere +1 fino all'inizio del tuo prossimo turno.",
        },
      ],
    },
  },
  inkType: ["steel"],
  franchise: "Great Mouse Detective",
  set: "010",
  cardNumber: 179,
  rarity: "common",
  cost: 3,
  strength: 3,
  willpower: 2,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_5047361d5e154f1099d8996c8904fb2d",
    tcgPlayer: 658783,
  },
  text: [
    {
      title: "HOLD YOUR GROUND",
      description:
        "Whenever you play another Detective character, this character gains Resist +1 until the start of your next turn.",
    },
  ],
  classifications: ["Dreamborn", "Hero", "Detective"],
  abilities: [
    {
      effect: {
        keyword: "Resist",
        target: "SELF",
        type: "gain-keyword",
        value: 1,
      },
      id: "l21-1",
      name: "HOLD YOUR GROUND",
      text: "HOLD YOUR GROUND Whenever you play another Detective character, this character gains Resist +1 until the start of your next turn.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
