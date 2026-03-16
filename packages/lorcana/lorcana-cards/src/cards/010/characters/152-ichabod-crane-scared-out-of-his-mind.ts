import type { CharacterCard } from "@tcg/lorcana-types";

export const ichabodCraneScaredOutOfHisMind: CharacterCard = {
  id: "qEC",
  canonicalId: "ci_qEC",
  reprints: ["set10-152"],
  cardType: "character",
  name: "Ichabod Crane",
  version: "Scared Out of His Mind",
  i18n: {
    en: {
      name: "Ichabod Crane",
      version: "Scared Out of His Mind",
      text: [
        {
          title: "CHILLING TALE",
          description:
            "When this character is banished, you may put this card into your inkwell facedown and exerted.",
        },
      ],
    },
    de: {
      name: "Ichabod Crane",
      version: "Zu tiefst verängstigt",
      text: [
        {
          title: "SCHAURIGE GESCHICHTE",
          description:
            "Wenn dieser Charakter verbannt wird, darfst du diese Karte verdeckt und erschöpft in deinen Tintenvorrat legen.",
        },
      ],
    },
    fr: {
      name: "Ichabod Crane",
      version: "Saisi d'une peur bleue",
      text: [
        {
          title: "RÉCIT EFFRAYANT",
          description:
            "Lorsque ce personnage est banni, vous pouvez placer cette carte dans votre réserve d'encre, face cachée et épuisée.",
        },
      ],
    },
    it: {
      name: "Ichabod Crane",
      version: "Spaventato a Morte",
      text: [
        {
          title: "RACCONTO AGGHIACCIANTE",
          description:
            "Quando questo personaggio viene esiliato, puoi aggiungere questa carta al tuo calamaio, a faccia in giù e impegnata.",
        },
      ],
    },
  },
  inkType: ["sapphire"],
  franchise: "Sleepy Hollow",
  set: "010",
  cardNumber: 152,
  rarity: "uncommon",
  cost: 2,
  strength: 0,
  willpower: 2,
  lore: 2,
  inkable: false,
  externalIds: {
    lorcast: "crd_295ea334c82b494ca1954f544117bf8a",
    tcgPlayer: 660021,
  },
  text: [
    {
      title: "CHILLING TALE",
      description:
        "When this character is banished, you may put this card into your inkwell facedown and exerted.",
    },
  ],
  classifications: ["Storyborn", "Hero"],
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
      id: "1dh-1",
      name: "CHILLING TALE",
      text: "CHILLING TALE When this character is banished, you may put this card into your inkwell facedown and exerted.",
      trigger: {
        event: "banish",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
