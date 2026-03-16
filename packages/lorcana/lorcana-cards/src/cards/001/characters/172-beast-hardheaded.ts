import type { CharacterCard } from "@tcg/lorcana-types";

export const beastHardheaded: CharacterCard = {
  id: "VIG",
  canonicalId: "ci_VIG",
  reprints: ["set1-172"],
  cardType: "character",
  name: "Beast",
  version: "Hardheaded",
  i18n: {
    en: {
      name: "Beast",
      version: "Hardheaded",
      text: [
        {
          title: "BREAK",
          description: "When you play this character, you may banish chosen item.",
        },
      ],
    },
    de: {
      name: "Biest",
      version: "Dickköpfig",
      text: [
        {
          title: "ZERFETZEN",
          description:
            "Wenn du diesen Charakter ausspielst, darfst du einen Gegenstand deiner Wahl verbannen.",
        },
      ],
    },
    fr: {
      name: "LA BÊTE",
      version: "Colérique et aigrie",
      text: [
        {
          title: "DESTRUCTION",
          description:
            "Lorsque vous jouez ce personnage, vous pouvez choisir un objet et le bannir.",
        },
      ],
    },
    it: {
      name: "La Bestia",
      version: "Testarda",
      text: [
        {
          title: "ROMPERE",
          description: "Quando giochi questo personaggio, puoi esiliare un oggetto a tua scelta.",
        },
      ],
    },
  },
  inkType: ["steel"],
  franchise: "Beauty and the Beast",
  set: "001",
  cardNumber: 172,
  rarity: "uncommon",
  cost: 5,
  strength: 4,
  willpower: 4,
  lore: 2,
  inkable: true,
  missingTests: true,
  externalIds: {
    lorcast: "crd_9600ba030e244c31becf34a3bf0822af",
    tcgPlayer: 508900,
  },
  text: [
    {
      title: "BREAK",
      description: "When you play this character, you may banish chosen item.",
    },
  ],
  classifications: ["Storyborn", "Hero", "Prince"],
  abilities: [
    {
      effect: {
        chooser: "CONTROLLER",
        effect: {
          target: "CHOSEN_CHARACTER",
          type: "banish",
        },
        type: "optional",
      },
      id: "m8v-1",
      name: "BREAK",
      text: "BREAK When you play this character, you may banish chosen item.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
