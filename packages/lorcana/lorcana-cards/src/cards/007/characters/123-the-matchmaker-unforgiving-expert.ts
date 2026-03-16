import type { CharacterCard } from "@tcg/lorcana-types";

export const theMatchmakerUnforgivingExpert: CharacterCard = {
  id: "w5E",
  canonicalId: "ci_w5E",
  reprints: ["set7-123"],
  cardType: "character",
  name: "The Matchmaker",
  version: "Unforgiving Expert",
  i18n: {
    en: {
      name: "The Matchmaker",
      version: "Unforgiving Expert",
      text: [
        {
          title: "YOU ARE A DISGRACE!",
          description:
            "Whenever this character challenges another character, each opponent loses 1 lore.",
        },
      ],
    },
    de: {
      name: "Heiratsvermittlerin",
      version: "Kompromisslose Expertin",
      text: [
        {
          title: "DU BIST EINE SCHANDE!",
          description:
            "Jedes Mal, wenn dieser Charakter einen anderen Charakter herausfordert, verlieren alle gegnerischen Mitspielenden je 1 Legende.",
        },
      ],
    },
    fr: {
      name: "La Dame marieuse",
      version: "Experte impitoyable",
      text: [
        {
          title: "TU DEVRAIS AVOIR HONTE!",
          description:
            "Chaque fois que ce personnage en défie un autre, chaque adversaire perd 1 éclat de Lore.",
        },
      ],
    },
    it: {
      name: "La Mezzana",
      version: "Esperta Inflessibile",
      text: [
        {
          title: "SEI UNA DISGRAZIA!",
          description:
            "Ogni volta che questo personaggio sfida un altro personaggio, ogni avversario perde 1 leggenda.",
        },
      ],
    },
  },
  inkType: ["ruby"],
  franchise: "Mulan",
  set: "007",
  cardNumber: 123,
  rarity: "common",
  cost: 4,
  strength: 4,
  willpower: 3,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_9b84afa5574c49e4a0270195f6ced69b",
    tcgPlayer: 618207,
  },
  text: [
    {
      title: "YOU ARE A DISGRACE!",
      description:
        "Whenever this character challenges another character, each opponent loses 1 lore.",
    },
  ],
  classifications: ["Storyborn"],
  abilities: [
    {
      effect: {
        amount: 1,
        target: "EACH_OPPONENT",
        type: "lose-lore",
      },
      id: "fhg-1",
      name: "YOU ARE A DISGRACE!",
      text: "YOU ARE A DISGRACE! Whenever this character challenges another character, each opponent loses 1 lore.",
      trigger: {
        event: "challenge",
        on: "SELF",
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
};
