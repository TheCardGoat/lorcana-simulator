import type { CharacterCard } from "@tcg/lorcana-types";

export const angelExperiment624Enchanted: CharacterCard = {
  id: "7JX",
  canonicalId: "ci_oxv",
  reprints: ["set11-191"],
  cardType: "character",
  name: "Angel",
  version: "Experiment 624",
  i18n: {
    en: {
      name: "Angel",
      version: "Experiment 624",
      text: [
        {
          title: "UNTOUCHABLE",
          description: "While you have no cards in your hand, this character gains Resist +2.",
        },
        {
          title: "GOOD AIM",
          description:
            "Once during your turn, you may choose and discard a card to deal 2 damage to chosen character.",
        },
      ],
    },
    de: {
      name: "Engel",
      version: "Experiment 624",
      text: [
        {
          title: "UNANTASTBAR",
          description:
            "Solange du keine Karten auf der Hand hast, erhält dieser Charakter Robust +2.",
        },
        {
          title: "GUT GEZIELT",
          description:
            "Einmal während deines Zuges darfst du eine Karte von deiner Hand auswählen und abwerfen, um einem Charakter deiner Wahl 2 Schaden zuzufügen.",
        },
      ],
    },
    fr: {
      name: "Angel",
      version: "Expérience 624",
      text: [
        {
          title: "INTOUCHABLE",
          description:
            "Tant que vous n'avez aucune carte en main, ce personnage gagne Résistance +2.",
        },
        {
          title: "BIEN VISÉ",
          description:
            "Une fois durant votre tour, vous pouvez défausser une carte pour choisir un personnage et lui infliger 2 dommages.",
        },
      ],
    },
    it: {
      name: "Angel",
      version: "Esperimento 624",
      text: [
        {
          title: "IMBATTIBILE",
          description: "Mentre non hai carte in mano, questo personaggio ottiene Resistere +2.",
        },
        {
          title: "OTTIMA MIRA",
          description:
            "Una volta durante il tuo turno, puoi scegliere e scartare una carta per infliggere 2 danni a un personaggio a tua scelta.",
        },
      ],
    },
  },
  inkType: ["steel"],
  franchise: "Lilo and Stitch",
  set: "011",
  cardNumber: 238,
  rarity: "enchanted",
  specialRarity: "enchanted",
  cost: 4,
  strength: 3,
  willpower: 3,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_fbad358f2f804554838545c738341380",
    tcgPlayer: 677169,
  },
  text: [
    {
      title: "UNTOUCHABLE",
      description: "While you have no cards in your hand, this character gains Resist +2.",
    },
    {
      title: "GOOD AIM",
      description:
        "Once during your turn, you may choose and discard a card to deal 2 damage to chosen character.",
    },
  ],
  classifications: ["Storyborn", "Ally", "Alien"],
  abilities: [
    {
      id: "1cz-1",
      effect: {
        keyword: "Resist",
        target: "SELF",
        type: "gain-keyword",
        value: 2,
      },
      type: "action",
      text: "UNTOUCHABLE While you have no cards in your hand, this character gains Resist +2.",
    },
    {
      id: "1cz-2",
      effect: {
        chooser: "CONTROLLER",
        effect: {
          amount: 2,
          target: {
            cardTypes: ["character"],
            count: 1,
            owner: "any",
            selector: "chosen",
            zones: ["play"],
          },
          type: "deal-damage",
        },
        type: "optional",
      },
      type: "action",
      text: "GOOD AIM Once during your turn, you may choose and discard a card to deal 2 damage to chosen character.",
    },
  ],
};
