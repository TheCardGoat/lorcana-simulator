import type { CharacterCard } from "@tcg/lorcana-types";

export const billTheLizardChimneySweep: CharacterCard = {
  id: "7bC",
  canonicalId: "ci_7bC",
  reprints: ["set8-090"],
  cardType: "character",
  name: "Bill the Lizard",
  version: "Chimney Sweep",
  i18n: {
    en: {
      name: "Bill the Lizard",
      version: "Chimney Sweep",
      text: [
        {
          title: "NOTHING TO IT",
          description: "While another character in play has damage, this character gains Evasive.",
        },
      ],
    },
    de: {
      name: "Bill, die Eidechse",
      version: "Schornsteinfeger",
      text: [
        {
          title: "DAS SCHAFFST DU DOCH",
          description:
            "Solange mindestens ein anderer Charakter im Spiel beschädigt ist, erhält dieser Charakter Wendig.",
        },
      ],
    },
    fr: {
      name: "Bill le Lézard",
      version: "Ramoneur",
      text: [
        {
          title: "C'EST TRÈS FACILE À FAIRE",
          description:
            "Tant qu'un autre personnage en jeu a au moins un dommage sur lui, ce personnage-ci gagne Insaisissable.",
        },
      ],
    },
    it: {
      name: "Biagio Lucertola",
      version: "Spazzacamino",
      text: [
        {
          title: "ROBA DA RAGAZZI",
          description:
            "Mentre un altro personaggio in gioco ha danno, questo personaggio ottiene Sfuggente. (Solo altri personaggi con Sfuggente possono sfidarlo.)",
        },
      ],
    },
  },
  inkType: ["emerald"],
  franchise: "Alice in Wonderland",
  set: "008",
  cardNumber: 90,
  rarity: "common",
  cost: 1,
  strength: 1,
  willpower: 2,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_f76b2615a724413dbb91cdc1b1787b21",
    tcgPlayer: 631847,
  },
  text: [
    {
      title: "NOTHING TO IT",
      description: "While another character in play has damage, this character gains Evasive.",
    },
  ],
  classifications: ["Storyborn"],
  abilities: [
    {
      effect: {
        keyword: "Evasive",
        target: "SELF",
        type: "gain-keyword",
      },
      id: "tc2-1",
      text: "NOTHING TO IT While another character in play has damage, this character gains Evasive.",
      type: "action",
    },
  ],
};
