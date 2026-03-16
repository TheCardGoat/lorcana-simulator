import type { CharacterCard } from "@tcg/lorcana-types";

export const jasmineFearlessPrincessEnchanted: CharacterCard = {
  id: "RMt",
  canonicalId: "ci_TLB",
  reprints: ["set9-178"],
  cardType: "character",
  name: "Jasmine",
  version: "Fearless Princess",
  i18n: {
    en: {
      name: "Jasmine",
      version: "Fearless Princess",
      text: [
        {
          title: "TAKE THE LEAP",
          description: "During your turn, this character gains Evasive.",
        },
        {
          title: "NOW'S MY CHANCE",
          description: "Choose and discard a card — This character gains Challenger +3 this turn.",
        },
      ],
    },
    de: {
      name: "Jasmin",
      version: "Furchtlose Prinzessin",
      text: [
        {
          title: "WAGE DEN SPRUNG",
          description:
            "In deinem Zug erhält dieser Charakter Wendig. (Er kann Charaktere mit Wendig herausfordern.)",
        },
        {
          title: "JETZT IST MEINE CHANCE",
          description:
            "Wähle eine Karte aus deiner Hand und wirf sie ab — Dieser Charakter erhält in diesem Zug Herausfordern +3. (Während der Charakter herausfordert, erhält er +3.)",
        },
      ],
    },
    fr: {
      name: "Jasmine",
      version: "Princesse intrépide",
      text: [
        {
          title: "FAIRE LE SAUT",
          description:
            "Durant votre tour, ce personnage gagne Insaisissable. (Il peut défier des personnages avec Insaisissable.)",
        },
        {
          title: "C'EST LE MOMENT OU JAMAIS",
          description:
            "Défaussez une carte — Ce personnage gagne Offensif +3 pour le reste de ce tour.",
        },
      ],
    },
    it: {
      name: "Jasmine",
      version: "Principessa Impavida",
      text: [
        {
          title: "SALTARE",
          description:
            "Durante il tuo turno, questo personaggio ottiene Sfuggente. (Può sfidare altri personaggi con Sfuggente.)",
        },
        {
          title: "ORA",
          description:
            "È IL MIO MOMENTO Scegli e scarta una carta — Questo personaggio ottiene Sfidante +3 per questo turno.",
        },
      ],
    },
  },
  inkType: ["steel"],
  franchise: "Aladdin",
  set: "009",
  cardNumber: 240,
  rarity: "enchanted",
  specialRarity: "enchanted",
  cost: 5,
  strength: 3,
  willpower: 7,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_7e0b8f2e97fc4d6ca8badbb552024f58",
    tcgPlayer: 651114,
  },
  text: [
    {
      title: "TAKE THE LEAP",
      description: "During your turn, this character gains Evasive.",
    },
    {
      title: "NOW'S MY CHANCE",
      description: "Choose and discard a card — This character gains Challenger +3 this turn.",
    },
  ],
  classifications: ["Storyborn", "Hero", "Princess"],
  abilities: [
    {
      condition: {
        type: "turn",
        whose: "your",
      },
      effect: {
        keyword: "Evasive",
        target: "SELF",
        type: "gain-keyword",
      },
      id: "t89-1",
      text: "TAKE THE LEAP During your turn, this character gains Evasive.",
      type: "static",
    },
    {
      cost: {
        exert: true,
      },
      effect: {
        duration: "this-turn",
        keyword: "Challenger",
        target: "SELF",
        type: "gain-keyword",
        value: 3,
      },
      id: "t89-2",
      text: "NOW'S MY CHANCE Choose and discard a card — This character gains Challenger +3 this turn.",
      type: "activated",
    },
  ],
};
