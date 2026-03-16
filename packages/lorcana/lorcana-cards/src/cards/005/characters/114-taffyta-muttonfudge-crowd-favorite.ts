import type { CharacterCard } from "@tcg/lorcana-types";

export const taffytaMuttonfudgeCrowdFavorite: CharacterCard = {
  id: "47M",
  canonicalId: "ci_47M",
  reprints: ["set5-114"],
  cardType: "character",
  name: "Taffyta Muttonfudge",
  version: "Crowd Favorite",
  i18n: {
    en: {
      name: "Taffyta Muttonfudge",
      version: "Crowd Favorite",
      text: [
        {
          title: "SHOWSTOPPER",
          description:
            "When you play this character, if you have a location in play, each opponent loses 1 lore.",
        },
      ],
    },
    de: {
      name: "Taffyta Muttonfudge",
      version: "Publikumsliebling",
      text: [
        {
          title: "PUBLIKUMSMAGNET",
          description:
            "Wenn du diesen Charakter ausspielst und mindestens einen Ort im Spiel hast, verlieren alle gegnerischen Mitspielenden je 1 Legende.",
        },
      ],
    },
    fr: {
      name: "Taffyta Crème Brûlée",
      version: "La préférée du public",
      text: [
        {
          title: "CLOU DU SPECTACLE",
          description:
            "Lorsque vous jouez ce personnage, si vous avez un lieu en jeu, chaque adversaire perd 1 éclat de Lore.",
        },
      ],
    },
    it: {
      name: "Taffyta Muttonfudge",
      version: "Favorita della Folla",
      text: [
        {
          title: "DA APPLAUSI",
          description:
            "Quando giochi questo personaggio, se hai in gioco un luogo, ogni avversario perde 1 leggenda.",
        },
      ],
    },
  },
  inkType: ["ruby"],
  franchise: "Wreck It Ralph",
  set: "005",
  cardNumber: 114,
  rarity: "common",
  cost: 1,
  strength: 1,
  willpower: 2,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_4a0125f47df34b3c9f0f097e0cc68c84",
    tcgPlayer: 555269,
  },
  text: [
    {
      title: "SHOWSTOPPER",
      description:
        "When you play this character, if you have a location in play, each opponent loses 1 lore.",
    },
  ],
  classifications: ["Storyborn", "Ally", "Racer"],
  abilities: [
    {
      effect: {
        condition: {
          expression: "you have a location in play",
          type: "if",
        },
        then: {
          amount: 1,
          target: "EACH_OPPONENT",
          type: "lose-lore",
        },
        type: "conditional",
      },
      id: "1a4-1",
      name: "SHOWSTOPPER",
      text: "SHOWSTOPPER When you play this character, if you have a location in play, each opponent loses 1 lore.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
