import type { CharacterCard } from "@tcg/lorcana-types";

export const brutusFearsomeCrocodile: CharacterCard = {
  id: "ZmK",
  canonicalId: "ci_ZmK",
  reprints: ["set8-125"],
  cardType: "character",
  name: "Brutus",
  version: "Fearsome Crocodile",
  i18n: {
    en: {
      name: "Brutus",
      version: "Fearsome Crocodile",
      text: [
        {
          title: "SPITEFUL",
          description:
            "During your turn, when this character is banished, if one of your characters was damaged this turn, gain 2 lore.",
        },
      ],
    },
    de: {
      name: "Brutus, das Krokodil",
      version: "Furchterregendes Krokodil",
      text: [
        {
          title: "BISSIG",
          description:
            "Wenn dieser Charakter in deinem Zug verbannt wird, falls in diesem Zug einer deiner Charaktere beschädigt wurde, sammelst du 2 Legenden.",
        },
      ],
    },
    fr: {
      name: "Brutus",
      version: "Redoutable crocodile",
      text: [
        {
          title: "MALVEILLANT",
          description:
            "Durant votre tour, lorsque ce personnage est banni, si l'un de vos personnages a subi un dommage ou plus ce tour-ci, gagnez 2 éclats de Lore.",
        },
      ],
    },
    it: {
      name: "Bruto",
      version: "Coccodrillo Spaventoso",
      text: [
        {
          title: "MALEVOLO",
          description:
            "Durante il tuo turno, quando questo personaggio viene esiliato, se uno dei tuoi personaggi è stato danneggiato in questo turno, ottieni 2 leggenda.",
        },
      ],
    },
  },
  inkType: ["ruby"],
  franchise: "Rescuers",
  set: "008",
  cardNumber: 125,
  rarity: "common",
  cost: 4,
  strength: 4,
  willpower: 3,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_413aa60d7950479282acb68e97eaafcd",
    tcgPlayer: 633431,
  },
  text: [
    {
      title: "SPITEFUL",
      description:
        "During your turn, when this character is banished, if one of your characters was damaged this turn, gain 2 lore.",
    },
  ],
  classifications: ["Storyborn", "Ally"],
  abilities: [
    {
      effect: {
        condition: {
          expression: "one of your characters was damaged this turn",
          type: "if",
        },
        then: {
          amount: 2,
          type: "gain-lore",
        },
        type: "conditional",
      },
      id: "j0c-1",
      name: "SPITEFUL",
      text: "SPITEFUL During your turn, when this character is banished, if one of your characters was damaged this turn, gain 2 lore.",
      trigger: {
        event: "banish",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
