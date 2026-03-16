import type { CharacterCard } from "@tcg/lorcana-types";

export const yzmaUnjustlyTreated: CharacterCard = {
  id: "luJ",
  canonicalId: "ci_luJ",
  reprints: ["set5-184"],
  cardType: "character",
  name: "Yzma",
  version: "Unjustly Treated",
  i18n: {
    en: {
      name: "Yzma",
      version: "Unjustly Treated",
      text: [
        {
          title: "I'M WARNING YOU!",
          description:
            "During your turn, whenever one of your characters banishes a character in a challenge, you may deal 1 damage to chosen character.",
        },
      ],
    },
    de: {
      name: "Isma",
      version: "Ungerecht behandelt",
      text: [
        {
          title: "ICH WARNE DICH!",
          description:
            "Jedes Mal, wenn einer deiner Charaktere in deinem Zug durch eine Herausforderung einen anderen Charakter verbannt, darfst du einem Charakter deiner Wahl 1 Schaden zufügen.",
        },
      ],
    },
    fr: {
      name: "Yzma",
      version: "Injustement traitée",
      text: [
        {
          title: "JE T'AVERTIS!",
          description:
            "Durant votre tour, chaque fois que l'un de vos personnages en bannit un autre via un défi, vous pouvez choisir un personnage et lui infliger 1 dommage.",
        },
      ],
    },
    it: {
      name: "Yzma",
      version: "Trattata Ingiustamente",
      text: [
        {
          title: "STAI BEN ATTENTO!",
          description:
            "Durante il tuo turno, ogni volta che uno dei tuoi personaggi esilia un altro personaggio in una sfida, puoi infliggere 1 danno a un personaggio a tua scelta.",
        },
      ],
    },
  },
  inkType: ["steel"],
  franchise: "Emperors New Groove",
  set: "005",
  cardNumber: 184,
  rarity: "rare",
  cost: 4,
  strength: 1,
  willpower: 4,
  lore: 2,
  inkable: false,
  externalIds: {
    lorcast: "crd_6349578aae2742c6901e3129e8da6925",
    tcgPlayer: 561493,
  },
  text: [
    {
      title: "I'M WARNING YOU!",
      description:
        "During your turn, whenever one of your characters banishes a character in a challenge, you may deal 1 damage to chosen character.",
    },
  ],
  classifications: ["Dreamborn", "Villain", "Sorcerer"],
  abilities: [
    {
      effect: {
        chooser: "CONTROLLER",
        effect: {
          amount: 1,
          target: {
            selector: "chosen",
            count: 1,
            owner: "any",
            zones: ["play"],
            cardTypes: ["character"],
          },
          type: "deal-damage",
        },
        type: "optional",
      },
      id: "1pn-1",
      name: "I'M WARNING YOU!",
      text: "I'M WARNING YOU! During your turn, whenever one of your characters banishes a character in a challenge, you may deal 1 damage to chosen character.",
      trigger: {
        event: "banish",
        on: "YOUR_OTHER_CHARACTERS",
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
};
