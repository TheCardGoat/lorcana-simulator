import type { CharacterCard } from "@tcg/lorcana-types";

export const idunaCaringMother: CharacterCard = {
  id: "yri",
  canonicalId: "ci_yri",
  reprints: ["set4-147"],
  cardType: "character",
  name: "Iduna",
  version: "Caring Mother",
  i18n: {
    en: {
      name: "Iduna",
      version: "Caring Mother",
      text: [
        {
          title: "ENDURING LOVE",
          description:
            "When this character is banished, you may put this card into your inkwell facedown and exerted.",
        },
      ],
    },
    de: {
      name: "Iduna",
      version: "Fürsorgliche Mutter",
      text: [
        {
          title: "EWIGE LIEBE",
          description:
            "Wenn dieser Charakter verbannt wird, darfst du diese Karte verdeckt und erschöpft in deinen Tintenvorrat legen.",
        },
      ],
    },
    fr: {
      name: "Iduna",
      version: "Mère bienveillante",
      text: [
        {
          title: "AMOUR ÉTERNEL",
          description:
            "Lorsque ce personnage est banni, vous pouvez le placer dans votre réserve d'encre, face cachée et épuisé.",
        },
      ],
    },
    it: {
      name: "Iduna",
      version: "Madre Premurosa",
      text: [
        {
          title: "AMORE DUREVOLE",
          description:
            "Quando questo personaggio viene esiliato, puoi aggiungere questa carta al tuo calamaio, a faccia in giù e impegnata.",
        },
      ],
    },
  },
  inkType: ["sapphire"],
  franchise: "Frozen",
  set: "004",
  cardNumber: 147,
  rarity: "uncommon",
  cost: 4,
  strength: 3,
  willpower: 3,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_162d0aec8da44e1d88e84982dd524156",
    tcgPlayer: 550607,
  },
  text: [
    {
      title: "ENDURING LOVE",
      description:
        "When this character is banished, you may put this card into your inkwell facedown and exerted.",
    },
  ],
  classifications: ["Storyborn", "Mentor", "Queen"],
  abilities: [
    {
      effect: {
        chooser: "CONTROLLER",
        effect: {
          exerted: true,
          facedown: true,
          source: "this-card",
          target: "CONTROLLER",
          type: "put-into-inkwell",
        },
        type: "optional",
      },
      id: "178-1",
      name: "ENDURING LOVE",
      text: "ENDURING LOVE When this character is banished, you may put this card into your inkwell facedown and exerted.",
      trigger: {
        event: "banish",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
