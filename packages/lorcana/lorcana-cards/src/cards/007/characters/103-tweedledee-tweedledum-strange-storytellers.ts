import type { CharacterCard } from "@tcg/lorcana-types";

export const tweedledeeTweedledumStrangeStorytellers: CharacterCard = {
  id: "Myt",
  canonicalId: "ci_Myt",
  reprints: ["set7-103"],
  cardType: "character",
  name: "Tweedledee & Tweedledum",
  version: "Strange Storytellers",
  i18n: {
    en: {
      name: "Tweedledee & Tweedledum",
      version: "Strange Storytellers",
      text: [
        {
          title: "ANOTHER RECITATION",
          description:
            "Whenever this character quests, you may return chosen damaged character to their player's hand.",
        },
      ],
    },
    de: {
      name: "Dideldei und Dideldum",
      version: "Seltsame Geschichtenerzähler",
      text: [
        {
          title: "NOCH EINE GESCHICHTE",
          description:
            "Jedes Mal, wenn dieser Charakter erkundet, darfst du einen beschädigten Charakter deiner Wahl zurück auf die zugehörige Hand schicken.",
        },
      ],
    },
    fr: {
      name: "Tweedledee et Tweedeldum",
      version: "Étranges conteurs",
      text: [
        {
          title: "ENCORE UNE AUTRE HISTOIRE",
          description:
            "Chaque fois que ce personnage est envoyé à l'aventure, vous pouvez choisir un personnage avec au moins un dommage et le renvoyer dans la main de son propriétaire.",
        },
      ],
    },
    it: {
      name: "Pinco Panco e Panco Pinco",
      version: "Strani Cantastorie",
      text: [
        {
          title: "SECONDO NUMERO",
          description:
            "Ogni volta che questo personaggio va all'avventura, puoi far riprendere in mano al suo giocatore un personaggio danneggiato a tua scelta.",
        },
      ],
    },
  },
  inkType: ["emerald", "ruby"],
  franchise: "Alice in Wonderland",
  set: "007",
  cardNumber: 103,
  rarity: "uncommon",
  cost: 5,
  strength: 4,
  willpower: 4,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_f412907cdf7346cf8bbc1d02fab3d1d6",
    tcgPlayer: 619461,
  },
  text: [
    {
      title: "ANOTHER RECITATION",
      description:
        "Whenever this character quests, you may return chosen damaged character to their player's hand.",
    },
  ],
  classifications: ["Storyborn"],
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
            cardTypes: ["character"],
          },
          type: "return-to-hand",
        },
        type: "optional",
      },
      id: "1i9-1",
      name: "ANOTHER RECITATION",
      text: "ANOTHER RECITATION Whenever this character quests, you may return chosen damaged character to their player's hand.",
      trigger: {
        event: "quest",
        on: "SELF",
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
};
