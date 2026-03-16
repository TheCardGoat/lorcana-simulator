import type { CharacterCard } from "@tcg/lorcana-types";

export const goldenHarpEnchanterOfTheLand: CharacterCard = {
  id: "KkZ",
  canonicalId: "ci_KkZ",
  reprints: ["set4-011"],
  cardType: "character",
  name: "Golden Harp",
  version: "Enchanter of the Land",
  i18n: {
    en: {
      name: "Golden Harp",
      version: "Enchanter of the Land",
      text: [
        {
          title: "STOLEN AWAY",
          description:
            "At the end of your turn, if you didn't play a song this turn, banish this character.",
        },
      ],
    },
    de: {
      name: "Goldene Harfe",
      version: "Landverzauberin",
      text: [
        {
          title: "GESTOHLEN",
          description:
            "Am Ende deines Zuges, verbanne diesen Charakter, falls du in diesem Zug kein Lied ausgespielt hast.",
        },
      ],
    },
    fr: {
      name: "La Harpe Magique",
      version: "Enchanteresse de la Vallée",
      text: [
        {
          title: "VOLÉE À",
          description:
            "la fin de votre tour, si vous n'avez pas joué de chanson durant ce tour, bannissez ce personnage.",
        },
      ],
    },
    it: {
      name: "Arpa Magica",
      version: "Ammaliatrice della Valle",
      text: [
        {
          title: "RAPITA",
          description:
            "Alla fine del tuo turno, esilia questo personaggio se non hai giocato una canzone in questo turno.",
        },
      ],
    },
  },
  inkType: ["amber"],
  set: "004",
  cardNumber: 11,
  rarity: "rare",
  cost: 1,
  strength: 1,
  willpower: 4,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_4047afdc24734dc081571f81815febd8",
    tcgPlayer: 549623,
  },
  text: [
    {
      title: "STOLEN AWAY",
      description:
        "At the end of your turn, if you didn't play a song this turn, banish this character.",
    },
  ],
  classifications: ["Storyborn", "Ally"],
  abilities: [
    {
      effect: {
        condition: {
          type: "turn-metric",
          metric: "played-songs",
          comparison: {
            operator: "eq",
            value: 0,
          },
        },
        then: {
          target: {
            selector: "self",
            count: 1,
            owner: "any",
            zones: ["play"],
            cardTypes: ["character"],
          },
          type: "banish",
        },
        type: "conditional",
      },
      id: "1vy-1",
      text: "STOLEN AWAY At the end of your turn, if you didn't play a song this turn, banish this character.",
      type: "action",
    },
  ],
};
