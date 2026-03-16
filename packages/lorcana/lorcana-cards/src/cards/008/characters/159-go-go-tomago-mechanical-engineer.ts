import type { CharacterCard } from "@tcg/lorcana-types";

export const goGoTomagoMechanicalEngineer: CharacterCard = {
  id: "mVc",
  canonicalId: "ci_mVc",
  reprints: ["set8-159"],
  cardType: "character",
  name: "Go Go Tomago",
  version: "Mechanical Engineer",
  i18n: {
    en: {
      name: "Go Go Tomago",
      version: "Mechanical Engineer",
      text: [
        {
          title: "NEED THIS!",
          description:
            "When you play a Floodborn character on this card, you may put the top card of your deck into your inkwell facedown and exerted.",
        },
      ],
    },
    de: {
      name: "Go Go Tomago",
      version: "Maschineningenieurin",
      text: [
        {
          title: "DAS BRAUCH ICH!",
          description:
            "Wenn du eine Flutgestalt auf diesen Charakter ausspielst, darfst du die oberste Karte deines Decks verdeckt und erschöpft in deinen Tintenvorrat legen.",
        },
      ],
    },
    fr: {
      name: "Go Go Tomago",
      version: "Ingénieure en mécanique",
      text: [
        {
          title: "J'AI BESOIN DE ÇA!",
          description:
            "Lorsque vous jouez un personnage Floodborn sur cette carte, vous pouvez placer la première carte de votre pioche dans votre réserve d'encre, face cachée et épuisée.",
        },
      ],
    },
    it: {
      name: "Go Go Tomago",
      version: "Ingegnere Meccanico",
      text: [
        {
          title: "MI SERVE!",
          description:
            "Quando giochi un personaggio Imbevuto sopra a questa carta, puoi aggiungere la prima carta del tuo mazzo al tuo calamaio, a faccia in giù e impegnata.",
        },
      ],
    },
  },
  inkType: ["sapphire"],
  franchise: "Big Hero 6",
  set: "008",
  cardNumber: 159,
  rarity: "common",
  cost: 2,
  strength: 1,
  willpower: 3,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_bc3a96f6dcf64d1d87da6c83288a8146",
    tcgPlayer: 631691,
  },
  text: [
    {
      title: "NEED THIS!",
      description:
        "When you play a Floodborn character on this card, you may put the top card of your deck into your inkwell facedown and exerted.",
    },
  ],
  classifications: ["Storyborn", "Hero", "Inventor"],
  abilities: [
    {
      effect: {
        chooser: "CONTROLLER",
        effect: {
          exerted: true,
          facedown: true,
          source: "top-of-deck",
          target: "CONTROLLER",
          type: "put-into-inkwell",
        },
        type: "optional",
      },
      id: "hwg-1",
      name: "NEED THIS!",
      text: "NEED THIS! When you play a Floodborn character on this card, you may put the top card of your deck into your inkwell facedown and exerted.",
      trigger: {
        event: "play",
        on: {
          cardType: "character",
          classification: "Floodborn",
          controller: "you",
        },
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
