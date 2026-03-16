import type { CharacterCard } from "@tcg/lorcana-types";

export const olafRecappingTheStory: CharacterCard = {
  id: "obo",
  canonicalId: "ci_obo",
  reprints: ["set8-156"],
  cardType: "character",
  name: "Olaf",
  version: "Recapping the Story",
  i18n: {
    en: {
      name: "Olaf",
      version: "Recapping the Story",
      text: [
        {
          title: "ENDLESS TALE",
          description:
            "When you play this character, chosen opposing character gets -1 {S} this turn.",
        },
      ],
    },
    de: {
      name: "Olaf",
      version: "Fasst die Geschichte zusammen",
      text: [
        {
          title: "UNENDLICHE ERZÄHLUNG",
          description:
            "Wenn du diesen Charakter ausspielst, erhält ein gegnerischer Charakter deiner Wahl in diesem Zug -1.",
        },
      ],
    },
    fr: {
      name: "Olaf",
      version: "Résumant l’histoire",
      text: [
        {
          title: "RÉCIT SANS FIN",
          description:
            "Lorsque vous jouez ce personnage, choisissez un personnage adverse qui subit -1 pour le reste de ce tour.",
        },
      ],
    },
    it: {
      name: "Olaf",
      version: "Che Riassume la Storia",
      text: [
        {
          title: "RACCONTO INFINITO",
          description:
            "Quando giochi questo personaggio, un personaggio avversario a tua scelta riceve -1 per questo turno.",
        },
      ],
    },
  },
  inkType: ["sapphire"],
  franchise: "Frozen",
  set: "008",
  cardNumber: 156,
  rarity: "common",
  cost: 1,
  strength: 2,
  willpower: 1,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_af73ab0ecfb241e08c2ab10bc74ea708",
    tcgPlayer: 631454,
  },
  text: [
    {
      title: "ENDLESS TALE",
      description: "When you play this character, chosen opposing character gets -1 {S} this turn.",
    },
  ],
  classifications: ["Storyborn", "Ally"],
  abilities: [
    {
      effect: {
        duration: "this-turn",
        modifier: -1,
        stat: "strength",
        target: "CHOSEN_CHARACTER",
        type: "modify-stat",
      },
      id: "fgl-1",
      name: "ENDLESS TALE",
      text: "ENDLESS TALE When you play this character, chosen opposing character gets -1 {S} this turn.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
