import type { CharacterCard } from "@tcg/lorcana-types";

export const doloresMadrigalEasyListener: CharacterCard = {
  id: "L27",
  canonicalId: "ci_xFh",
  reprints: ["set4-041", "set9-051"],
  cardType: "character",
  name: "Dolores Madrigal",
  version: "Easy Listener",
  i18n: {
    en: {
      name: "Dolores Madrigal",
      version: "Easy Listener",
      text: [
        {
          title: "MAGICAL INFORMANT",
          description:
            "When you play this character, if an opponent has an exerted character in play, you may draw a card.",
        },
      ],
    },
    de: {
      name: "Dolores Madrigal",
      version: "Gute Zuhörerin",
      text: [
        {
          title: "MAGISCHE INFORMANTIN",
          description:
            "Wenn du diesen Charakter ausspielst und mindestens eine gegnerische Person einen erschöpfen Charakter im Spiel hat, darfst du 1 Karte ziehen.",
        },
      ],
    },
    fr: {
      name: "Dolores Madrigal",
      version: "Oreille fine",
      text: [
        {
          title: "INFORMATRICE MAGIQUE",
          description:
            "Lorsque vous jouez ce personnage, si un adversaire a un personnage épuisé en jeu, vous pouvez piocher une carte.",
        },
      ],
    },
    it: {
      name: "Dolores Madrigal",
      version: "Fine Ascoltatrice",
      text: [
        {
          title: "INFORMATRICE MAGICA",
          description:
            "Quando giochi questo personaggio, se un avversario ha in gioco un personaggio impegnato, puoi pescare una carta.",
        },
      ],
    },
  },
  inkType: ["amethyst"],
  franchise: "Encanto",
  set: "009",
  cardNumber: 51,
  rarity: "common",
  cost: 4,
  strength: 3,
  willpower: 3,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_d9a1ea3bfe5d4911918825597c51e0a6",
    tcgPlayer: 649995,
  },
  text: [
    {
      title: "MAGICAL INFORMANT",
      description:
        "When you play this character, if an opponent has an exerted character in play, you may draw a card.",
    },
  ],
  classifications: ["Storyborn", "Ally", "Madrigal"],
  abilities: [
    {
      id: "n9k-1",
      effect: {
        condition: {
          expression: "an opponent has an exerted character in play",
          type: "if",
        },
        then: {
          amount: 1,
          target: "CONTROLLER",
          type: "draw",
        },
        type: "conditional",
      },
      name: "MAGICAL INFORMANT",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
      text: "MAGICAL INFORMANT When you play this character, if an opponent has an exerted character in play, you may draw a card.",
    },
  ],
};
