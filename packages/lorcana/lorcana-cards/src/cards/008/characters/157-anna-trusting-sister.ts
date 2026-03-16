import type { CharacterCard } from "@tcg/lorcana-types";

export const annaTrustingSister: CharacterCard = {
  id: "wSF",
  canonicalId: "ci_wSF",
  reprints: ["set8-157"],
  cardType: "character",
  name: "Anna",
  version: "Trusting Sister",
  i18n: {
    en: {
      name: "Anna",
      version: "Trusting Sister",
      text: [
        {
          title: "WE CAN DO THIS TOGETHER",
          description:
            "When you play this character, if you have a character named Elsa in play, you may put the top card of your deck into your inkwell facedown and exerted.",
        },
      ],
    },
    de: {
      name: "Anna",
      version: "Vertrauensvolle Schwester",
      text: [
        {
          title: "WIR KÖNNEN DAS GEMEINSAM SCHAFFEN",
          description:
            "Wenn du diesen Charakter ausspielst und einen Elsa-Charakter im Spiel hast, darfst du die oberste Karte deines Decks verdeckt und erschöpft in deinen Tintenvorrat legen.",
        },
      ],
    },
    fr: {
      name: "Anna",
      version: "Sœur confiante",
      text: [
        {
          title: "ENSEMBLE, NOUS POUVONS Y PARVENIR",
          description:
            "Lorsque vous jouez ce personnage, si vous avez un personnage nommé Elsa en jeu, vous pouvez placer la première carte de votre pioche dans votre réserve d'encre, face cachée et épuisée.",
        },
      ],
    },
    it: {
      name: "Anna",
      version: "Sorella Fiduciosa",
      text: [
        {
          title: "INSIEME POSSIAMO FARCELA",
          description:
            "Quando giochi questo personaggio, se hai in gioco un personaggio chiamato Elsa, puoi aggiungere la prima carta del tuo mazzo al tuo calamaio, a faccia in giù e impegnata.",
        },
      ],
    },
  },
  inkType: ["sapphire"],
  franchise: "Frozen",
  set: "008",
  cardNumber: 157,
  rarity: "common",
  cost: 3,
  strength: 2,
  willpower: 2,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_37bea5da923b495eaeecaf71420a2beb",
    tcgPlayer: 631455,
  },
  text: [
    {
      title: "WE CAN DO THIS TOGETHER",
      description:
        "When you play this character, if you have a character named Elsa in play, you may put the top card of your deck into your inkwell facedown and exerted.",
    },
  ],
  classifications: ["Storyborn", "Hero", "Queen"],
  abilities: [
    {
      effect: {
        condition: {
          expression: "you have a character named Elsa in play",
          type: "if",
        },
        then: {
          exerted: true,
          facedown: true,
          source: "top-of-deck",
          target: "CONTROLLER",
          type: "put-into-inkwell",
        },
        type: "conditional",
      },
      id: "8vk-1",
      name: "WE CAN DO THIS TOGETHER",
      text: "WE CAN DO THIS TOGETHER When you play this character, if you have a character named Elsa in play, you may put the top card of your deck into your inkwell facedown and exerted.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
