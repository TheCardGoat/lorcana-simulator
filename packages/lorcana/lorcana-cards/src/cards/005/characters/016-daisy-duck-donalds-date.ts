import type { CharacterCard } from "@tcg/lorcana-types";

export const daisyDuckDonaldsDate: CharacterCard = {
  id: "lih",
  canonicalId: "ci_lih",
  reprints: ["set5-016"],
  cardType: "character",
  name: "Daisy Duck",
  version: "Donald's Date",
  i18n: {
    en: {
      name: "Daisy Duck",
      version: "Donald's Date",
      text: [
        {
          title: "BIG PRIZE",
          description:
            "Whenever this character quests, each opponent reveals the top card of their deck. If it's a character card, they may put it into their hand. Otherwise, they put it on the bottom of their deck.",
        },
      ],
    },
    de: {
      name: "Daisy Duck",
      version: "Donalds Verabredung",
      text: [
        {
          title: "GROSSER GEWINN",
          description:
            "Jedes Mal, wenn dieser Charakter erkundet, decken alle gegnerischen Mitspielenden die oberste Karte ihres Decks auf. Falls sie eine Charakterkarte ist, dürfen sie diese auf ihre Hand nehmen. Falls nicht, legen sie diese unter ihr Deck.",
        },
      ],
    },
    fr: {
      name: "Daisy",
      version: "Rendez-vous de Donald",
      text: [
        {
          title: "GROS LOT",
          description:
            "Chaque fois que ce personnage est envoyé à l'aventure, chaque adversaire révèle la carte du dessus de sa pioche. S'il s'agit d'une carte Personnage, il peut la prendre en main. Sinon, il la place sous sa pioche.",
        },
      ],
    },
    it: {
      name: "Paperina",
      version: "Ragazza di Paperino",
      text: [
        {
          title: "PRIMO PREMIO",
          description:
            "Ogni volta che questo personaggio va all'avventura, ogni avversario rivela la prima carta del suo mazzo. Se è una carta personaggio, l'avversario può aggiungerla alla sua mano. Altrimenti, la mette in fondo al suo mazzo.",
        },
      ],
    },
  },
  inkType: ["amber"],
  set: "005",
  cardNumber: 16,
  rarity: "common",
  cost: 1,
  strength: 1,
  willpower: 4,
  lore: 2,
  inkable: false,
  externalIds: {
    lorcast: "crd_8ae92c4a53ef47acb4aefde6341cba60",
    tcgPlayer: 559158,
  },
  text: [
    {
      title: "BIG PRIZE",
      description:
        "Whenever this character quests, each opponent reveals the top card of their deck. If it's a character card, they may put it into their hand. Otherwise, they put it on the bottom of their deck.",
    },
  ],
  classifications: ["Storyborn", "Ally"],
  abilities: [
    {
      effect: {
        condition: {
          expression: "it's a character card",
          type: "if",
        },
        then: {
          target: "CHOSEN_CHARACTER",
          type: "put-on-bottom",
        },
        type: "conditional",
      },
      id: "czn-1",
      name: "BIG PRIZE",
      text: "BIG PRIZE Whenever this character quests, each opponent reveals the top card of their deck. If it's a character card, they may put it into their hand. Otherwise, they put it on the bottom of their deck.",
      trigger: {
        event: "quest",
        on: "SELF",
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
};
