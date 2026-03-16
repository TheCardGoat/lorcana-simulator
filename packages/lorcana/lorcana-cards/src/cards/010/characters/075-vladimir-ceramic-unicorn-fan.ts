import type { CharacterCard } from "@tcg/lorcana-types";

export const vladimirCeramicUnicornFan: CharacterCard = {
  id: "yNl",
  canonicalId: "ci_yNl",
  reprints: ["set10-075"],
  cardType: "character",
  name: "Vladimir",
  version: "Ceramic Unicorn Fan",
  i18n: {
    en: {
      name: "Vladimir",
      version: "Ceramic Unicorn Fan",
      text: [
        {
          title: "HIGH STANDARDS",
          description: "Whenever this character quests, you may banish chosen item.",
        },
      ],
    },
    de: {
      name: "Vladimir",
      version: "Fan von Keramik-Einhörnern",
      text: [
        {
          title: "HOHE ANSPRÜCHE",
          description:
            "Jedes Mal, wenn dieser Charakter erkundet, darfst du einen Gegenstand deiner Wahl verbannen.",
        },
      ],
    },
    fr: {
      name: "Vladimir",
      version: "Fan de petites licornes",
      text: [
        {
          title: "GRANDES EXIGENCES",
          description:
            "Chaque fois que ce personnage est envoyé à l'aventure, vous pouvez choisir un objet et le bannir.",
        },
      ],
    },
    it: {
      name: "Vladimir",
      version: "Fan degli Unicorni in Ceramica",
      text: [
        {
          title: "STANDARD ELEVATI",
          description:
            "Ogni volta che questo personaggio va all'avventura, puoi esiliare un oggetto a tua scelta.",
        },
      ],
    },
  },
  inkType: ["emerald"],
  franchise: "Tangled",
  set: "010",
  cardNumber: 75,
  rarity: "common",
  cost: 6,
  strength: 5,
  willpower: 6,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_86a728449c4a46b7862052f531d3cea4",
    tcgPlayer: 658879,
  },
  text: [
    {
      title: "HIGH STANDARDS",
      description: "Whenever this character quests, you may banish chosen item.",
    },
  ],
  classifications: ["Storyborn", "Ally"],
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
      id: "j0l-1",
      name: "HIGH STANDARDS",
      text: "HIGH STANDARDS Whenever this character quests, you may banish chosen item.",
      trigger: {
        event: "quest",
        on: "SELF",
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
};
