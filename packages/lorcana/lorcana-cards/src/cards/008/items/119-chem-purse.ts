import type { ItemCard } from "@tcg/lorcana-types";

export const chemPurse: ItemCard = {
  id: "VyL",
  canonicalId: "ci_VyL",
  reprints: ["set8-119"],
  cardType: "item",
  name: "Chem Purse",
  i18n: {
    en: {
      name: "Chem Purse",
      text: [
        {
          title: "HERE'S THE BEST PART",
          description:
            "Whenever you play a character, if you used Shift to play them, they get +4 {S} this turn.",
        },
      ],
    },
    de: {
      name: "Chemie-Tasche",
      text: [
        {
          title: "JETZT KOMMT DAS BESTE",
          description:
            "Jedes Mal, wenn du mithilfe von Gestaltwandel eine Flutgestalt ausspielst, erhält jene in diesem Zug +4.",
        },
      ],
    },
    fr: {
      name: "Nano-sac",
      text: [
        {
          title: "ET T'AS ENCORE RIEN VU",
          description:
            "Chaque fois que vous jouez un personnage en utilisant sa capacité Alter, il gagne +4 pour le reste du tour.",
        },
      ],
    },
    it: {
      name: "Borsetta Chimica",
      text: [
        {
          title: "ORA ARRIVA IL MEGLIO",
          description:
            "Ogni volta che giochi un personaggio, se hai usato Trasformazione per giocarlo, riceve +4 per questo turno.",
        },
      ],
    },
  },
  inkType: ["emerald"],
  franchise: "Big Hero 6",
  set: "008",
  cardNumber: 119,
  rarity: "common",
  cost: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_537258cef9b5410fafafa47026feedf6",
    tcgPlayer: 631428,
  },
  text: [
    {
      title: "HERE'S THE BEST PART",
      description:
        "Whenever you play a character, if you used Shift to play them, they get +4 {S} this turn.",
    },
  ],
  abilities: [
    {
      id: "1ea-1",
      name: "HERE'S THE BEST PART",
      text: "HERE'S THE BEST PART Whenever you play a character, if you used Shift to play them, they get +4 {S} this turn.",
      type: "triggered",
      trigger: {
        event: "play",
        on: {
          cardType: "character",
          controller: "you",
        },
        timing: "whenever",
      },
      effect: {
        condition: {
          type: "play-context",
          context: "used-shift",
        },
        then: {
          duration: "this-turn",
          modifier: 4,
          stat: "strength",
          target: {
            selector: "all",
            count: 1,
            reference: "trigger-subject",
          },
          type: "modify-stat",
        },
        type: "conditional",
      },
    },
  ],
};
