import type { CharacterCard } from "@tcg/lorcana-types";

export const kakamoraLongrangeSpecialist: CharacterCard = {
  id: "8jt",
  canonicalId: "ci_8jt",
  reprints: ["set6-171"],
  cardType: "character",
  name: "Kakamora",
  version: "Long-Range Specialist",
  i18n: {
    en: {
      name: "Kakamora",
      version: "Long-Range Specialist",
      text: [
        {
          title: "A LITTLE HELP",
          description:
            "When you play this character, if you have another Pirate character in play, you may deal 1 damage to chosen character or location.",
        },
      ],
    },
    de: {
      name: "Kokomora",
      version: "Spezialist für Langstrecken",
      text: [
        {
          title: "EIN BISSCHEN HILFE",
          description:
            "Wenn du diesen Charakter ausspielst und mindestens einen anderen Piraten im Spiel hast, darfst du einem Charakter oder einem Ort deiner Wahl 1 Schaden zufügen.",
        },
      ],
    },
    fr: {
      name: "Kakamora",
      version: "Spécialiste de la longue portée",
      text: [
        {
          title: "TU PEUX M'AIDER?",
          description:
            "Lorsque vous jouez ce personnage, si vous avez un autre personnage Pirate en jeu, vous pouvez choisir un personnage ou un lieu et lui infliger 1 dommage.",
        },
      ],
    },
    it: {
      name: "Kakamora",
      version: "Specialista da Lunga Gittata",
      text: [
        {
          title: "UN PICCOLO AIUTO",
          description:
            "Quando giochi questo personaggio, se hai in gioco un altro personaggio Pirata, puoi infliggere 1 danno a un personaggio o a un luogo a tua scelta.",
        },
      ],
    },
  },
  inkType: ["steel"],
  franchise: "Moana",
  set: "006",
  cardNumber: 171,
  rarity: "common",
  cost: 1,
  strength: 0,
  willpower: 2,
  lore: 1,
  inkable: false,
  externalIds: {
    lorcast: "crd_6df56dd3dbb5471589800f12bba4eb46",
    tcgPlayer: 588366,
  },
  text: [
    {
      title: "A LITTLE HELP",
      description:
        "When you play this character, if you have another Pirate character in play, you may deal 1 damage to chosen character or location.",
    },
  ],
  classifications: ["Storyborn", "Pirate"],
  abilities: [
    {
      effect: {
        condition: {
          expression: "you have another Pirate character in play",
          type: "if",
        },
        then: {
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
        type: "conditional",
      },
      id: "10z-1",
      name: "A LITTLE HELP",
      text: "A LITTLE HELP When you play this character, if you have another Pirate character in play, you may deal 1 damage to chosen character or location.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
