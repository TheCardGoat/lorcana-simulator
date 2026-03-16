import type { CharacterCard } from "@tcg/lorcana-types";

export const hadesLordOfTheUnderworld: CharacterCard = {
  id: "gvD",
  canonicalId: "ci_gvD",
  reprints: ["set1-006"],
  cardType: "character",
  name: "Hades",
  version: "Lord of the Underworld",
  i18n: {
    en: {
      name: "Hades",
      version: "Lord of the Underworld",
      text: [
        {
          title: "WELL OF SOULS",
          description:
            "When you play this character, return a character card from your discard to your hand.",
        },
      ],
    },
    de: {
      name: "Hades",
      version: "Herrscher der Unterwelt",
      text: [
        {
          title: "FLUSS DES TODES",
          description:
            "Wenn du diesen Charakter ausspielst, nimm 1 Charakterkarte aus deinem Ablagestapel zurück auf deine Hand.",
        },
      ],
    },
    fr: {
      name: "HADÈS",
      version: "Seigneur des Enfers",
      text: [
        {
          title: "PUITS DES ÂMES",
          description:
            "Lorsque vous jouez ce personnage, reprenez en main une carte personnage de votre défausse.",
        },
      ],
    },
    it: {
      name: "Ade",
      version: "Signore dell'Oltretomba",
      text: [
        {
          title: "POZZO DELLE ANIME",
          description:
            "Quando giochi questo personaggio, riprendi in mano una carta personaggio dai tuoi scarti.",
        },
      ],
    },
  },
  inkType: ["amber"],
  franchise: "Hercules",
  set: "001",
  cardNumber: 6,
  rarity: "rare",
  cost: 4,
  strength: 3,
  willpower: 2,
  lore: 1,
  inkable: false,
  missingTests: true,
  externalIds: {
    lorcast: "crd_4c9f441611314185a25b1fca893f6643",
    tcgPlayer: 493480,
  },
  text: [
    {
      title: "WELL OF SOULS",
      description:
        "When you play this character, return a character card from your discard to your hand.",
    },
  ],
  classifications: ["Storyborn", "Villain", "Deity"],
  abilities: [
    {
      effect: {
        cardType: "character",
        target: "CONTROLLER",
        type: "return-from-discard",
      },
      id: "1yp-1",
      name: "WELL OF SOULS",
      text: "WELL OF SOULS When you play this character, return a character card from your discard to your hand.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
