import type { CharacterCard } from "@tcg/lorcana-types";

export const stabbingtonBrotherWithAPatch: CharacterCard = {
  id: "QMj",
  canonicalId: "ci_QMj",
  reprints: ["set7-128"],
  cardType: "character",
  name: "Stabbington Brother",
  version: "With a Patch",
  i18n: {
    en: {
      name: "Stabbington Brother",
      version: "With a Patch",
      text: [
        {
          title: "CRIME OF OPPORTUNITY",
          description: "When you play this character, chosen opponent loses 1 lore.",
        },
      ],
    },
    de: {
      name: "Stabbington-Bruder",
      version: "Mit Augenklappe",
      text: [
        {
          title: "VERBRECHEN DER GELEGENHEIT",
          description:
            "Wenn du diesen Charakter ausspielst, verliert eine gegnerische Person deiner Wahl 1 Legende.",
        },
      ],
    },
    fr: {
      name: "Un frère Stabbington",
      version: "Celui avec un cache-œil",
      text: [
        {
          title: "OPPORTUNITÉ CRAPULEUSE",
          description:
            "Lorsque vous jouez ce personnage, choisissez un adversaire qui perd 1 éclat de Lore.",
        },
      ],
    },
    it: {
      name: "Fratello Stabbington",
      version: "Con la Benda",
      text: [
        {
          title: "L'OCCASIONE FA L'UOMO LADRO",
          description:
            "Quando giochi questo personaggio, un avversario a tua scelta perde 1 leggenda.",
        },
      ],
    },
  },
  inkType: ["ruby"],
  franchise: "Tangled",
  set: "007",
  cardNumber: 128,
  rarity: "common",
  cost: 5,
  strength: 4,
  willpower: 4,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_2e6d017b97da415fb97b8d42bb129e98",
    tcgPlayer: 619476,
  },
  text: [
    {
      title: "CRIME OF OPPORTUNITY",
      description: "When you play this character, chosen opponent loses 1 lore.",
    },
  ],
  classifications: ["Storyborn", "Ally"],
  abilities: [
    {
      effect: {
        amount: 1,
        target: "OPPONENT",
        type: "lose-lore",
      },
      id: "y6f-1",
      name: "CRIME OF OPPORTUNITY",
      text: "CRIME OF OPPORTUNITY When you play this character, chosen opponent loses 1 lore.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
