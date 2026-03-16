import type { CharacterCard } from "@tcg/lorcana-types";

export const mushuSneakyDragon: CharacterCard = {
  id: "feU",
  canonicalId: "ci_m8p",
  reprints: ["set11-082"],
  cardType: "character",
  name: "Mushu",
  version: "Sneaky Dragon",
  i18n: {
    en: {
      name: "Mushu",
      version: "Sneaky Dragon",
      text: [
        {
          title: "SNOWY SURPRISE",
          description: "When you play this character, deal 2 damage to chosen character.",
        },
      ],
    },
    de: {
      name: "Mushu",
      version: "Listiger Drache",
      text: [
        {
          title: "ÜBERRASCHUNG AUS SCHNEE",
          description:
            "Wenn du diesen Charakter ausspielst, füge einem Charakter deiner Wahl 2 Schaden zu.",
        },
      ],
    },
    fr: {
      name: "Mushu",
      version: "Dragon malicieux",
      text: [
        {
          title: "SURPRISE ENNEIGÉE",
          description:
            "Lorsque vous jouez ce personnage, choisissez un personnage et infligez-lui 2 dommages.",
        },
      ],
    },
    it: {
      name: "Mushu",
      version: "Drago Furbetto",
      text: [
        {
          title: "SORPRESA NEVOSA",
          description:
            "Quando giochi questo personaggio, infliggi 2 danni a un personaggio a tua scelta.",
        },
      ],
    },
  },
  inkType: ["emerald"],
  franchise: "Mulan",
  set: "011",
  cardNumber: 82,
  rarity: "uncommon",
  cost: 5,
  strength: 3,
  willpower: 2,
  lore: 3,
  inkable: false,
  externalIds: {
    lorcast: "crd_239773eb4b194139916d4c31bba66356",
    tcgPlayer: 677147,
  },
  text: [
    {
      title: "SNOWY SURPRISE",
      description: "When you play this character, deal 2 damage to chosen character.",
    },
  ],
  classifications: ["Storyborn", "Ally", "Dragon"],
  abilities: [
    {
      id: "1by-1",
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
      name: "SNOWY SURPRISE",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
      text: "SNOWY SURPRISE When you play this character, deal 2 damage to chosen character.",
    },
  ],
};
