import type { CharacterCard } from "@tcg/lorcana-types";

export const johnSilverFerociousFriend: CharacterCard = {
  id: "J7B",
  canonicalId: "ci_J7B",
  reprints: ["set6-109"],
  cardType: "character",
  name: "John Silver",
  version: "Ferocious Friend",
  i18n: {
    en: {
      name: "John Silver",
      version: "Ferocious Friend",
      text: [
        {
          title: "YOU HAVE TO CHART YOUR OWN COURSE",
          description:
            "Whenever this character quests, you may deal 1 damage to one of your other characters. If you do, ready that character. They cannot quest this turn.",
        },
      ],
    },
    de: {
      name: "John Silver",
      version: "Gefährlicher Freund",
      text: [
        {
          title: "DU MUSST DEINEN KURS SELBER BESTIMMEN",
          description:
            "Jedes Mal, wenn dieser Charakter erkundet, darfst du einem deiner anderen Charaktere 1 Schaden zufügen. Wenn du dies tust, mache den Charakter bereit. Er kann in diesem Zug nicht mehr erkunden.",
        },
      ],
    },
    fr: {
      name: "John Silver",
      version: "Ami féroce",
      text: [
        {
          title: "CHOISIS TON PROPRE CAP",
          description:
            "Chaque fois que ce personnage est envoyé à l'aventure, vous pouvez choisir un autre de vos personnages. Infligez-lui 1 dommage et redressez-le. Ce personnage ne peut pas être envoyé à l'aventure pour le reste de ce tour.",
        },
      ],
    },
    it: {
      name: "John Silver",
      version: "Amico Feroce",
      text: [
        {
          title: "TRACCIARE LA TUA ROTTA",
          description:
            "Ogni volta che questo personaggio va all'avventura, puoi infliggere 1 danno a un tuo altro personaggio a tua scelta. Se lo fai, prepara quel personaggio. Non può andare all'avventura per il resto di questo turno.",
        },
      ],
    },
  },
  inkType: ["ruby"],
  franchise: "Treasure Planet",
  set: "006",
  cardNumber: 109,
  rarity: "uncommon",
  cost: 4,
  strength: 2,
  willpower: 4,
  lore: 2,
  inkable: false,
  externalIds: {
    lorcast: "crd_6c12ae52fc6c4244b1f638ff2102bf59",
    tcgPlayer: 591121,
  },
  text: [
    {
      title: "YOU HAVE TO CHART YOUR OWN COURSE",
      description:
        "Whenever this character quests, you may deal 1 damage to one of your other characters. If you do, ready that character. They cannot quest this turn.",
    },
  ],
  classifications: ["Storyborn", "Villain", "Alien", "Pirate", "Captain"],
  abilities: [
    {
      effect: {
        steps: [
          {
            chooser: "CONTROLLER",
            effect: {
              type: "deal-damage",
              amount: 1,
              target: {
                selector: "all",
                count: "all",
                owner: "any",
                zones: ["play"],
                cardTypes: ["character"],
              },
            },
            type: "optional",
          },
          {
            duration: "this-turn",
            restriction: "cant-quest",
            target: "SELF",
            type: "restriction",
          },
        ],
        type: "sequence",
      },
      id: "sje-1",
      name: "YOU HAVE TO CHART YOUR OWN COURSE",
      text: "YOU HAVE TO CHART YOUR OWN COURSE Whenever this character quests, you may deal 1 damage to one of your other characters. If you do, ready that character. They cannot quest this turn.",
      trigger: {
        event: "quest",
        on: "SELF",
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
};
