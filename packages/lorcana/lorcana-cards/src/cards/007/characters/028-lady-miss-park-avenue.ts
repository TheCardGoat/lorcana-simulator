import type { CharacterCard } from "@tcg/lorcana-types";

export const ladyMissParkAvenue: CharacterCard = {
  id: "Yv7",
  canonicalId: "ci_Yv7",
  reprints: ["set7-028"],
  cardType: "character",
  name: "Lady",
  version: "Miss Park Avenue",
  i18n: {
    en: {
      name: "Lady",
      version: "Miss Park Avenue",
      text: [
        {
          title: "Shift 3",
        },
        {
          title: "SOMETHING WONDERFUL",
          description:
            "When you play this character, you may return up to 2 character cards with cost 2 or less each from your discard to your hand.",
        },
      ],
    },
    de: {
      name: "Susi",
      version: "Miss Welt",
      text: "Gestaltwandel 3 WAS WUNDERSCHÖNES Wenn du diesen Charakter ausspielst, darfst du bis zu 2 Charakterkarten mit Kosten von 2 oder weniger aus deinem Ablagestapel zurück auf deine Hand nehmen.",
    },
    fr: {
      name: "Lady",
      version: "Princesse Fanfreluche",
      text: "Alter 3 UN TRUC MERVEILLEUX Lorsque vous jouez ce personnage, vous pouvez renvoyer jusqu'à 2 cartes Personnage coûtant 2 ou moins de votre défausse dans votre main.",
    },
    it: {
      name: "Lilli",
      version: "Miss Parioli",
      text: "Trasformazione 3 QUALCOSA DI MAGNIFICO Quando giochi questo personaggio, puoi riprendere in mano fino a 2 carte personaggio con costo 2 o inferiore ciascuno dai tuoi scarti.",
    },
  },
  inkType: ["amber", "emerald"],
  franchise: "Lady and the Tramp",
  set: "007",
  cardNumber: 28,
  rarity: "common",
  cost: 5,
  strength: 4,
  willpower: 4,
  lore: 2,
  inkable: false,
  externalIds: {
    lorcast: "crd_50725381dc53418bbb9acdb5df2d16c2",
    tcgPlayer: 618265,
  },
  text: [
    {
      title: "Shift 3",
    },
    {
      title: "SOMETHING WONDERFUL",
      description:
        "When you play this character, you may return up to 2 character cards with cost 2 or less each from your discard to your hand.",
    },
  ],
  classifications: ["Floodborn", "Hero"],
  abilities: [
    {
      cost: {
        ink: 3,
      },
      id: "188-1",
      keyword: "Shift",
      text: "Shift 3",
      type: "keyword",
    },
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
      id: "188-2",
      name: "SOMETHING WONDERFUL",
      text: "SOMETHING WONDERFUL When you play this character, you may return up to 2 character cards with cost 2 or less each from your discard to your hand.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
