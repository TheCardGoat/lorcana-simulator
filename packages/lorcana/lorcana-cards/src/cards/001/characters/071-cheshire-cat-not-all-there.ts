import type { CharacterCard } from "@tcg/lorcana-types";

export const cheshireCatNotAllThere: CharacterCard = {
  id: "qpX",
  canonicalId: "ci_qpX",
  reprints: ["set1-071"],
  cardType: "character",
  name: "Cheshire Cat",
  version: "Not All There",
  i18n: {
    en: {
      name: "Cheshire Cat",
      version: "Not All There",
      text: [
        {
          title: "LOSE SOMETHING?",
          description:
            "When this character is challenged and banished, banish the challenging character.",
        },
      ],
    },
    de: {
      name: "Grinsekatze",
      version: "Nicht ganz da",
      text: [
        {
          title: "DA BIN ICH!",
          description:
            "Wenn dieser Charakter herausgefordert und verbannt wird, verbanne den herausfordernden Charakter.",
        },
      ],
    },
    fr: {
      name: "CHAT DU CHESHIRE",
      version: "N'a pas toujours toute sa tête",
      text: [
        {
          title: "VOUS AVEZ PERDU QUELQUE CHOSE?",
          description:
            "Si ce personnage est défié et banni, bannissez le personnage qui l'a défié.",
        },
      ],
    },
    it: {
      name: "Cheshire Cat",
      version: "Not All There",
      text: [
        {
          title: "LOSE SOMETHING?",
          description:
            "When this character is challenged and banished, banish the challenging character.",
        },
      ],
    },
  },
  inkType: ["emerald"],
  franchise: "Alice in Wonderland",
  set: "001",
  cardNumber: 71,
  rarity: "uncommon",
  cost: 3,
  strength: 0,
  willpower: 3,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_e49c0deba37f453f8f27da810c8bfe39",
    tcgPlayer: 492122,
  },
  text: [
    {
      title: "LOSE SOMETHING?",
      description:
        "When this character is challenged and banished, banish the challenging character.",
    },
  ],
  classifications: ["Storyborn"],
  abilities: [
    {
      effect: {
        target: {
          ref: "attacker",
        },
        type: "banish",
      },
      id: "qpX-1",
      name: "LOSE SOMETHING?",
      sourceZones: ["play", "discard"],
      text: "LOSE SOMETHING? When this character is challenged and banished, banish the challenging character.",
      trigger: {
        event: "challenged-and-banished",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
