import type { CharacterCard } from "@tcg/lorcana-types";

export const vincenzoSantoriniTheExplosivesExpert: CharacterCard = {
  id: "QiE",
  canonicalId: "ci_QiE",
  reprints: ["set8-197"],
  cardType: "character",
  name: "Vincenzo Santorini",
  version: "The Explosives Expert",
  i18n: {
    en: {
      name: "Vincenzo Santorini",
      version: "The Explosives Expert",
      text: [
        {
          title: "I JUST LIKE TO BLOW THINGS UP",
          description: "When you play this character, you may deal 3 damage to chosen character.",
        },
      ],
    },
    de: {
      name: "Vincenzo Santorini",
      version: "Der Sprengstoffexperte",
      text: [
        {
          title: "ICH SPRENGE GERN SACHEN IN DIE LUFT",
          description:
            "Wenn du diesen Charakter ausspielst, darfst du einem Charakter deiner Wahl 3 Schaden zufügen.",
        },
      ],
    },
    fr: {
      name: "Vincenzo Santorini",
      version: "L'expert en explosifs",
      text: [
        {
          title: "MOI CE QUI M'ÉCLATE, C'EST CE QUI FAIT BOUM",
          description:
            "Lorsque vous jouez ce personnage, vous pouvez choisir un personnage et lui infliger 3 dommages.",
        },
      ],
    },
    it: {
      name: "Vincenzo Santorini",
      version: "L'Esperto di Esplosivi",
      text: [
        {
          title: "MI PIACE FAR ESPLODERE LE COSE",
          description:
            "Quando giochi questo personaggio, puoi infliggere 3 danni a un personaggio a tua scelta.",
        },
      ],
    },
  },
  inkType: ["steel"],
  franchise: "Atlantis",
  set: "008",
  cardNumber: 197,
  rarity: "rare",
  cost: 7,
  strength: 2,
  willpower: 8,
  lore: 3,
  inkable: true,
  externalIds: {
    lorcast: "crd_bf626cba6fd7425793d1cbfb0ee6aa2b",
    tcgPlayer: 631481,
  },
  text: [
    {
      title: "I JUST LIKE TO BLOW THINGS UP",
      description: "When you play this character, you may deal 3 damage to chosen character.",
    },
  ],
  classifications: ["Storyborn", "Ally"],
  abilities: [
    {
      effect: {
        chooser: "CONTROLLER",
        effect: {
          amount: 3,
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
      id: "t0e-1",
      name: "I JUST LIKE TO BLOW THINGS UP",
      text: "I JUST LIKE TO BLOW THINGS UP When you play this character, you may deal 3 damage to chosen character.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
