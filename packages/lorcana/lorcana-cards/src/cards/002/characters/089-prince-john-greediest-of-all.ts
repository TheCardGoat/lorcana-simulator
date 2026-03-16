import type { CharacterCard } from "@tcg/lorcana-types";

export const princeJohnGreediestOfAll: CharacterCard = {
  id: "Jlo",
  canonicalId: "ci_Jlo",
  reprints: ["set2-089"],
  cardType: "character",
  name: "Prince John",
  version: "Greediest of All",
  i18n: {
    en: {
      name: "Prince John",
      version: "Greediest of All",
      text: [
        {
          title: "Ward",
        },
        {
          title: "I SENTENCE YOU",
          description:
            "Whenever your opponent discards 1 or more cards, you may draw a card for each card discarded.",
        },
      ],
    },
    de: {
      name: "Prinz John",
      version: "Der Gierigste",
      text: "Behütet ICH VERURTEILE DICH Jedes Mal, wenn gegnerische Mitspielende Handkarten abwerfen, darfst du für jede abgeworfene Karte 1 Karte ziehen.",
    },
    fr: {
      name: "Prince Jean",
      version: "Le plus cupide de tous",
      text: "Hors d'atteinte JE TE CONDAMNE Chaque fois qu'un adversaire défausse au moins une carte, vous pouvez piocher autant de cartes.",
    },
    it: {
      name: "Prince John",
      version: "Greediest of All",
      text: [
        {
          title: "Ward",
          description:
            "(Opponents can't choose this character except to challenge.) I SENTENCE YOU Whenever your opponent discards 1 or more cards, you may draw a card for each card discarded.",
        },
      ],
    },
  },
  inkType: ["emerald"],
  franchise: "Robin Hood",
  set: "002",
  cardNumber: 89,
  rarity: "rare",
  cost: 3,
  strength: 1,
  willpower: 2,
  lore: 2,
  inkable: false,
  externalIds: {
    lorcast: "crd_f5e766865cfb44288cd71675cda91f7f",
    tcgPlayer: 522737,
  },
  text: [
    {
      title: "Ward",
    },
    {
      title: "I SENTENCE YOU",
      description:
        "Whenever your opponent discards 1 or more cards, you may draw a card for each card discarded.",
    },
  ],
  classifications: ["Dreamborn", "Villain", "Prince"],
  missingTests: true,
  abilities: [
    {
      id: "9so-1",
      keyword: "Ward",
      text: "Ward",
      type: "keyword",
    },
    {
      effect: {
        chooser: "CONTROLLER",
        effect: {
          amount: {
            type: "trigger-amount",
          },
          target: "CONTROLLER",
          type: "draw",
        },
        type: "optional",
      },
      id: "9so-2",
      name: "I SENTENCE YOU",
      text: "I SENTENCE YOU Whenever your opponent discards 1 or more cards, you may draw a card for each card discarded.",
      trigger: {
        event: "discard",
        on: "OPPONENT",
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
};
