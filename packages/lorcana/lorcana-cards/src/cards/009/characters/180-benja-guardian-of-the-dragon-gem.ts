import type { CharacterCard } from "@tcg/lorcana-types";

export const benjaGuardianOfTheDragonGem: CharacterCard = {
  id: "amr",
  canonicalId: "ci_pfZ",
  reprints: ["set2-174", "set9-180"],
  cardType: "character",
  name: "Benja",
  version: "Guardian of the Dragon Gem",
  i18n: {
    en: {
      name: "Benja",
      version: "Guardian of the Dragon Gem",
      text: [
        {
          title: "WE HAVE A CHOICE",
          description: "When you play this character, you may banish chosen item.",
        },
      ],
    },
    de: {
      name: "Benja",
      version: "Wächter des Drachenjuwels",
      text: [
        {
          title: "WIR HABEN EINE WAHL",
          description:
            "Wenn du diesen Charakter ausspielst, darfst du einen Gegenstand deiner Wahl verbannen.",
        },
      ],
    },
    fr: {
      name: "Benja",
      version: "Gardien de la Pierre de Dragon",
      text: [
        {
          title: "NOUS DEVONS CHOISIR",
          description:
            "Lorsque vous jouez ce personnage, vous pouvez choisir un objet et le bannir.",
        },
      ],
    },
    it: {
      name: "Benja",
      version: "Custode della Gemma Drago",
      text: [
        {
          title: "LA SCELTA È NOSTRA",
          description: "Quando giochi questo personaggio, puoi esiliare un oggetto a tua scelta.",
        },
      ],
    },
  },
  inkType: ["steel"],
  franchise: "Raya and the Last Dragon",
  set: "009",
  cardNumber: 180,
  rarity: "common",
  cost: 3,
  strength: 2,
  willpower: 3,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_66a2a59da61b4b54a92f25b54c375d93",
    tcgPlayer: 650113,
  },
  text: [
    {
      title: "WE HAVE A CHOICE",
      description: "When you play this character, you may banish chosen item.",
    },
  ],
  classifications: ["Storyborn", "Mentor", "King"],
  abilities: [
    {
      effect: {
        chooser: "CONTROLLER",
        effect: {
          target: {
            selector: "chosen",
            count: 1,
            owner: "any",
            zones: ["play"],
            cardTypes: ["item"],
          },
          type: "banish",
        },
        type: "optional",
      },
      id: "14h-1",
      name: "WE HAVE A CHOICE",
      text: "WE HAVE A CHOICE When you play this character, you may banish chosen item.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
