import type { CharacterCard } from "@tcg/lorcana-types";

export const honeymarenNorthuldraGuide: CharacterCard = {
  id: "7Vg",
  canonicalId: "ci_7Vg",
  reprints: ["set7-048"],
  cardType: "character",
  name: "Honeymaren",
  version: "Northuldra Guide",
  i18n: {
    en: {
      name: "Honeymaren",
      version: "Northuldra Guide",
      text: [
        {
          title: "TALE OF THE FIFTH SPIRIT",
          description:
            "When you play this character, if an opponent has an exerted character in play, gain 1 lore.",
        },
      ],
    },
    de: {
      name: "Honeymaren",
      version: "Northuldra Fremdenführerin",
      text: [
        {
          title: "GESCHICHTE DES FÜNFTEN GEISTES",
          description:
            "Wenn du diesen Charakter ausspielst und mindestens eine gegnerische Person einen erschöpften Charakter im Spiel hat, sammelst du 1 Legende.",
        },
      ],
    },
    fr: {
      name: "Honeymaren",
      version: "Guide de Northuldra",
      text: [
        {
          title: "CONTE DU CINQUIÈME ESPRIT",
          description:
            "Lorsque vous jouez ce personnage, si un adversaire a un personnage épuisé en jeu, gagnez 1 éclat de Lore.",
        },
      ],
    },
    it: {
      name: "Honeymaren",
      version: "Guida dei Northuldri",
      text: [
        {
          title: "LA LEGGENDA DEL QUINTO SPIRITO",
          description:
            "Quando giochi questo personaggio, se un avversario ha in gioco un personaggio impegnato, ottieni 1 leggenda.",
        },
      ],
    },
  },
  inkType: ["amethyst"],
  franchise: "Frozen",
  set: "007",
  cardNumber: 48,
  rarity: "common",
  cost: 2,
  strength: 2,
  willpower: 2,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_db6704b5f5e54a799f35d46afeca395d",
    tcgPlayer: 619432,
  },
  text: [
    {
      title: "TALE OF THE FIFTH SPIRIT",
      description:
        "When you play this character, if an opponent has an exerted character in play, gain 1 lore.",
    },
  ],
  classifications: ["Storyborn", "Ally"],
  abilities: [
    {
      effect: {
        condition: {
          expression: "an opponent has an exerted character in play",
          type: "if",
        },
        then: {
          amount: 1,
          type: "gain-lore",
        },
        type: "conditional",
      },
      id: "1d4-1",
      name: "TALE OF THE FIFTH SPIRIT",
      text: "TALE OF THE FIFTH SPIRIT When you play this character, if an opponent has an exerted character in play, gain 1 lore.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
