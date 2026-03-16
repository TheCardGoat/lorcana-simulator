import type { CharacterCard } from "@tcg/lorcana-types";

export const mrsPottsEnchantedTeapot: CharacterCard = {
  id: "R9W",
  canonicalId: "ci_R9W",
  reprints: ["set4-052"],
  cardType: "character",
  name: "Mrs. Potts",
  version: "Enchanted Teapot",
  i18n: {
    en: {
      name: "Mrs. Potts",
      version: "Enchanted Teapot",
      text: [
        {
          title: "IT'LL TURN OUT ALL RIGHT",
          description:
            "When you play this character, if you have a character named Lumiere or Cogsworth in play, you may draw a card.",
        },
      ],
    },
    de: {
      name: "Mme. Pottine",
      version: "Verzauberte Teekanne",
      text: [
        {
          title: "AM ENDE WIRD ALLES GUT",
          description:
            "Wenn du diesen Charakter ausspielst und einen Lumière-Charakter oder einen Von-Unruh-Charakter im Spiel hast, darfst du 1 Karte ziehen.",
        },
      ],
    },
    fr: {
      name: "Madame Samovar",
      version: "Théière enchantée",
      text: [
        {
          title: "IL Y AURA DES JOURS MEILLEURS",
          description:
            "Lorsque vous jouez ce personnage, si vous avez un personnage Lumière ou Big Ben en jeu, vous pouvez piocher une carte.",
        },
      ],
    },
    it: {
      name: "Mrs. Bric",
      version: "Teiera Incantata",
      text: [
        {
          title: "VEDRAI CHE TUTTO SI AGGIUSTERÀ",
          description:
            "Quando giochi questo personaggio, se hai in gioco un personaggio chiamato Lumiere o Tockins, puoi pescare una carta.",
        },
      ],
    },
  },
  inkType: ["amethyst"],
  franchise: "Beauty and the Beast",
  set: "004",
  cardNumber: 52,
  rarity: "rare",
  cost: 4,
  strength: 3,
  willpower: 4,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_26639bb10e744e3ca745b81492084497",
    tcgPlayer: 549620,
  },
  text: [
    {
      title: "IT'LL TURN OUT ALL RIGHT",
      description:
        "When you play this character, if you have a character named Lumiere or Cogsworth in play, you may draw a card.",
    },
  ],
  classifications: ["Storyborn", "Ally"],
  abilities: [
    {
      effect: {
        condition: {
          controller: "you",
          name: "Lumiere or Cogsworth in play",
          type: "has-named-character",
        },
        then: {
          amount: 1,
          target: "CONTROLLER",
          type: "draw",
        },
        type: "conditional",
      },
      id: "1mj-1",
      name: "IT'LL TURN OUT ALL RIGHT",
      text: "IT'LL TURN OUT ALL RIGHT When you play this character, if you have a character named Lumiere or Cogsworth in play, you may draw a card.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
