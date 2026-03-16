import type { CharacterCard } from "@tcg/lorcana-types";

export const hiroHamadaFutureChampion: CharacterCard = {
  id: "K5C",
  canonicalId: "ci_K5C",
  reprints: ["set7-090"],
  cardType: "character",
  name: "Hiro Hamada",
  version: "Future Champion",
  i18n: {
    en: {
      name: "Hiro Hamada",
      version: "Future Champion",
      text: [
        {
          title: "ORIGIN STORY",
          description: "When you play a Floodborn character on this card, draw a card.",
        },
      ],
    },
    de: {
      name: "Hiro Hamada",
      version: "Zukünftiger Champion",
      text: [
        {
          title: "UNSERE EIGENE SAGA",
          description: "Wenn du eine Flutgestalt auf diesen Charakter ausspielst, ziehe 1 Karte.",
        },
      ],
    },
    fr: {
      name: "Hiro Hamada",
      version: "Futur champion",
      text: [
        {
          title: "ÉPOPÉE",
          description:
            "Lorsque vous jouez un personnage Floodborn sur cette carte, piochez une carte.",
        },
      ],
    },
    it: {
      name: "Hiro Hamada",
      version: "Futuro Campione",
      text: [
        {
          title: "STORIA DELLE ORIGINI",
          description:
            "Quando giochi un personaggio Imbevuto sopra a questa carta, pesca una carta.",
        },
      ],
    },
  },
  inkType: ["emerald"],
  franchise: "Big Hero 6",
  set: "007",
  cardNumber: 90,
  rarity: "common",
  cost: 3,
  strength: 3,
  willpower: 3,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_82584b5e3b2e4d319077b9c8021cb066",
    tcgPlayer: 618250,
  },
  text: [
    {
      title: "ORIGIN STORY",
      description: "When you play a Floodborn character on this card, draw a card.",
    },
  ],
  classifications: ["Storyborn", "Hero", "Inventor"],
  abilities: [
    {
      id: "syk-1",
      effect: {
        amount: 1,
        target: "CONTROLLER",
        type: "draw",
      },
      name: "ORIGIN STORY",
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
      text: "ORIGIN STORY When you play a Floodborn character on this card, draw a card.",
    },
  ],
};
