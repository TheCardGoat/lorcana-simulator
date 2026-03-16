import type { CharacterCard } from "@tcg/lorcana-types";

export const tinkerBellGiantFairyEnchanted: CharacterCard = {
  id: "bL7",
  canonicalId: "ci_6gQ",
  reprints: ["set1-193", "set9-188"],
  cardType: "character",
  name: "Tinker Bell",
  version: "Giant Fairy",
  i18n: {
    en: {
      name: "Tinker Bell",
      version: "Giant Fairy",
      text: [
        {
          title: "Shift 4",
        },
        {
          title: "ROCK THE BOAT",
          description: "When you play this character, deal 1 damage to each opposing character.",
        },
        {
          title: "PUNY PIRATE!",
          description:
            "During your turn, whenever this character banishes another character in a challenge, you may deal 2 damage to chosen opposing character.",
        },
      ],
    },
    de: {
      name: "Naseweis",
      version: "Gigantische Fee",
      text: "Gestaltwandel 4 FLUTWELLE Wenn du diesen Charakter ausspielst, füge jedem gegnerischen Charakter 1 Schaden zu. MICKRIGER PIRAT! Jedes Mal, wenn dieser Charakter in deinem Zug einen anderen Charakter durch eine Herausforderung verbannt, darfst du einem gegnerischen Charakter deiner Wahl 2 Schaden zufügen.",
    },
    fr: {
      name: "LA FÉE CLOCHETTE",
      version: "Fée géante",
      text: [
        {
          title: "Alter 4",
          description:
            "(Vous pouvez payer 4 pour jouer ce personnage sur un autre personnage Clochette) SECOUE LE BATEAU Lorsque vous jouez ce personnage, infligez 1 dommage à chaque personnage adverse. PETIT PIRATE! Lorsque ce personnage en bannit un autre via un défi durant votre tour, vous pouvez choisir un personnage adverse et lui infliger 2 dommages.",
        },
      ],
    },
    it: {
      name: "Tinker Bell",
      version: "Giant Fairy",
      text: [
        {
          title: "Shift 4",
          description:
            "(You may pay 4 to play this on top of one of your characters named Tinker Bell.) ROCK THE BOAT When you play this character, deal 1 damage to each opposing character. PUNY PIRATE! During your turn, whenever this character banishes another character in a challenge, you may deal 2 damage to chosen opposing character.",
        },
      ],
    },
  },
  inkType: ["steel"],
  franchise: "Peter Pan",
  set: "001",
  cardNumber: 216,
  rarity: "enchanted",
  specialRarity: "enchanted",
  cost: 6,
  strength: 4,
  willpower: 5,
  lore: 2,
  inkable: true,
  missingTests: true,
  externalIds: {
    lorcast: "crd_a77ba07844374c399becfa3d49262642",
    tcgPlayer: 650121,
  },
  text: [
    {
      title: "Shift 4",
    },
    {
      title: "ROCK THE BOAT",
      description: "When you play this character, deal 1 damage to each opposing character.",
    },
    {
      title: "PUNY PIRATE!",
      description:
        "During your turn, whenever this character banishes another character in a challenge, you may deal 2 damage to chosen opposing character.",
    },
  ],
  classifications: ["Floodborn", "Ally", "Fairy"],
  abilities: [
    {
      cost: {
        ink: 4,
      },
      id: "pf8-1",
      keyword: "Shift",
      text: "Shift 4 {I}",
      type: "keyword",
    },
    {
      effect: {
        amount: 1,
        target: {
          cardTypes: ["character"],
          count: "all",
          owner: "opponent",
          selector: "all",
          zones: ["play"],
        },
        type: "deal-damage",
      },
      id: "pf8-2",
      name: "ROCK THE BOAT",
      text: "ROCK THE BOAT When you play this character, deal 1 damage to each opposing character.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
    {
      effect: {
        chooser: "CONTROLLER",
        effect: {
          amount: 2,
          target: {
            selector: "chosen",
            count: 1,
            owner: "opponent",
            zones: ["play"],
            cardTypes: ["character"],
          },
          type: "deal-damage",
        },
        type: "optional",
      },
      id: "pf8-3",
      name: "PUNY PIRATE!",
      text: "PUNY PIRATE! During your turn, whenever this character banishes another character in a challenge, you may deal 2 damage to chosen opposing character.",
      trigger: {
        event: "banish",
        on: "OPPONENT_CHARACTERS",
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
};
