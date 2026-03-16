import type { CharacterCard } from "@tcg/lorcana-types";

export const gurgiAppleLover: CharacterCard = {
  id: "KY3",
  canonicalId: "ci_KY3",
  reprints: ["set10-010"],
  cardType: "character",
  name: "Gurgi",
  version: "Apple Lover",
  i18n: {
    en: {
      name: "Gurgi",
      version: "Apple Lover",
      text: [
        {
          title: "HAPPY DAY",
          description:
            "When you play this character, you may remove up to 2 damage from chosen character.",
        },
      ],
    },
    de: {
      name: "Gurgi",
      version: "Apfelliebhaber",
      text: [
        {
          title: "GLÜCKSTAG",
          description:
            "Wenn du diesen Charakter ausspielst, darfst du bis zu 2 Schaden von einem Charakter deiner Wahl entfernen.",
        },
      ],
    },
    fr: {
      name: "Gurgi",
      version: "Mordu de pommes",
      text: [
        {
          title: "CHANCE LUI SOURIT",
          description:
            "Lorsque vous jouez ce personnage, vous pouvez choisir un personnage et lui retirer jusqu'à 2 dommages.",
        },
      ],
    },
    it: {
      name: "Gurghi",
      version: "Amante delle Mele",
      text: [
        {
          title: "GIORNO FORTUNATO",
          description:
            "Quando giochi questo personaggio, puoi rimuovere fino a 2 danni da un personaggio a tua scelta.",
        },
      ],
    },
  },
  inkType: ["amber"],
  franchise: "Black Cauldron",
  set: "010",
  cardNumber: 10,
  rarity: "common",
  cost: 2,
  strength: 2,
  willpower: 3,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_9b85042e33b2405e923af72d271b377e",
    tcgPlayer: 658290,
  },
  text: [
    {
      title: "HAPPY DAY",
      description:
        "When you play this character, you may remove up to 2 damage from chosen character.",
    },
  ],
  classifications: ["Storyborn", "Ally"],
  abilities: [
    {
      effect: {
        chooser: "CONTROLLER",
        effect: {
          amount: 2,
          target: {
            selector: "chosen",
            count: 1,
            owner: "any",
            zones: ["play"],
            cardTypes: ["character"],
          },
          type: "remove-damage",
          upTo: true,
        },
        type: "optional",
      },
      id: "1pr-1",
      name: "HAPPY DAY",
      text: "HAPPY DAY When you play this character, you may remove up to 2 damage from chosen character.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
