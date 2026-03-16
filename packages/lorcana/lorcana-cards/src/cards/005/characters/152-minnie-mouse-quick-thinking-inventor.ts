import type { CharacterCard } from "@tcg/lorcana-types";

export const minnieMouseQuickthinkingInventor: CharacterCard = {
  id: "JJ3",
  canonicalId: "ci_JJ3",
  reprints: ["set5-152"],
  cardType: "character",
  name: "Minnie Mouse",
  version: "Quick-Thinking Inventor",
  i18n: {
    en: {
      name: "Minnie Mouse",
      version: "Quick-Thinking Inventor",
      text: [
        {
          title: "CAKE CATAPULT",
          description: "When you play this character, chosen character gets -2 {S} this turn.",
        },
      ],
    },
    de: {
      name: "Minnie Maus",
      version: "Geistesgegenwärtige Erfinderin",
      text: [
        {
          title: "KUCHEN-KATAPULT",
          description:
            "Wenn du diesen Charakter ausspielst, gib einem Charakter deiner Wahl in diesem Zug -2.",
        },
      ],
    },
    fr: {
      name: "Minnie",
      version: "Inventrice à l'esprit vif",
      text: [
        {
          title: "CATAPULTE À GÂTEAU",
          description:
            "Lorsque vous jouez ce personnage, choisissez un personnage qui subit -2 pour le reste de ce tour.",
        },
      ],
    },
    it: {
      name: "Minni",
      version: "Sveglia Inventrice",
      text: [
        {
          title: "CATAPULTA PER TORTE",
          description:
            "Quando giochi questo personaggio, un personaggio a tua scelta riceve -2 per questo turno.",
        },
      ],
    },
  },
  inkType: ["sapphire"],
  set: "005",
  cardNumber: 152,
  rarity: "common",
  cost: 1,
  strength: 1,
  willpower: 2,
  lore: 1,
  inkable: false,
  externalIds: {
    lorcast: "crd_a5dbf42b10974a1d96749b32de706c58",
    tcgPlayer: 561649,
  },
  text: [
    {
      title: "CAKE CATAPULT",
      description: "When you play this character, chosen character gets -2 {S} this turn.",
    },
  ],
  classifications: ["Dreamborn", "Hero", "Inventor"],
  abilities: [
    {
      effect: {
        duration: "this-turn",
        modifier: -2,
        stat: "strength",
        target: {
          cardTypes: ["character"],
          count: 1,
          owner: "any",
          selector: "chosen",
          zones: ["play"],
        },
        type: "modify-stat",
      },
      id: "1h2-1",
      name: "CAKE CATAPULT",
      text: "CAKE CATAPULT When you play this character, chosen character gets -2 {S} this turn.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
