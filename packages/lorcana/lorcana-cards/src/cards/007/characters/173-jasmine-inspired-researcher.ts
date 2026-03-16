import type { CharacterCard } from "@tcg/lorcana-types";

export const jasmineInspiredResearcher: CharacterCard = {
  id: "TlP",
  canonicalId: "ci_TlP",
  reprints: ["set7-173"],
  cardType: "character",
  name: "Jasmine",
  version: "Inspired Researcher",
  i18n: {
    en: {
      name: "Jasmine",
      version: "Inspired Researcher",
      text: [
        {
          title: "EXTRA ASSISTANCE",
          description:
            "Whenever this character quests, if you have no cards in your hand, draw a card for each Ally character you have in play.",
        },
      ],
    },
    de: {
      name: "Jasmin",
      version: "Inspirierte Forscherin",
      text: [
        {
          title: "ZUSÄTZLICHE UNTERSTÜTZUNG",
          description:
            "Jedes Mal, wenn dieser Charakter erkundet, falls du keine Karten auf der Hand hast, ziehe 1 Karte für jeden Verbündeten, den du im Spiel hast.",
        },
      ],
    },
    fr: {
      name: "Jasmine",
      version: "Chercheuse inspirée",
      text: [
        {
          title: "AIDE SUPPLÉMENTAIRE",
          description:
            "Chaque fois que ce personnage est envoyé à l'aventure, si vous n'avez aucune carte en main, piochez une carte pour chaque personnage Allié que vous avez en jeu.",
        },
      ],
    },
    it: {
      name: "Jasmine",
      version: "Ricercatrice Ispirata",
      text: [
        {
          title: "AIUTO AGGIUNTIVO",
          description:
            "Ogni volta che questo personaggio va all'avventura, se non hai carte in mano, pesca una carta per ogni personaggio Alleato che hai in gioco.",
        },
      ],
    },
  },
  inkType: ["sapphire", "steel"],
  franchise: "Aladdin",
  set: "007",
  cardNumber: 173,
  rarity: "rare",
  cost: 5,
  strength: 3,
  willpower: 5,
  lore: 2,
  inkable: false,
  externalIds: {
    lorcast: "crd_62c3a4d3b2234f26b7d63be72faf93a4",
    tcgPlayer: 619505,
  },
  text: [
    {
      title: "EXTRA ASSISTANCE",
      description:
        "Whenever this character quests, if you have no cards in your hand, draw a card for each Ally character you have in play.",
    },
  ],
  classifications: ["Storyborn", "Hero", "Princess"],
  abilities: [
    {
      effect: {
        condition: {
          expression: "you have no cards in your hand",
          type: "if",
        },
        then: {
          amount: 1,
          target: "CONTROLLER",
          type: "draw",
        },
        type: "conditional",
      },
      id: "4mp-1",
      name: "EXTRA ASSISTANCE",
      text: "EXTRA ASSISTANCE Whenever this character quests, if you have no cards in your hand, draw a card for each Ally character you have in play.",
      trigger: {
        event: "quest",
        on: "SELF",
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
};
