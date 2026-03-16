import type { CharacterCard } from "@tcg/lorcana-types";

export const magicaDeSpellConnivingSorceress: CharacterCard = {
  id: "dD1",
  canonicalId: "ci_dD1",
  reprints: ["set10-054"],
  cardType: "character",
  name: "Magica De Spell",
  version: "Conniving Sorceress",
  i18n: {
    en: {
      name: "Magica De Spell",
      version: "Conniving Sorceress",
      text: [
        {
          title: "Shift 7 {I}",
        },
        {
          title: "SHADOW'S GRASP",
          description:
            "When you play this character, if you used Shift to play her, you may draw 4 cards.",
        },
      ],
    },
    de: {
      name: "Gundel Gaukeley",
      version: "Hinterhältige Zauberin",
      text: "Gestaltwandel 7 GRIFF DES SCHATTENS Wenn du diesen Charakter mithilfe von Gestaltwandel ausspielst, darfst du 4 Karten ziehen.",
    },
    fr: {
      name: "Miss Tick",
      version: "Sorcière machiavélique",
      text: "Alter 7 EMPRISE DE L'OMBRE Si vous jouez ce personnage en utilisant sa capacité Alter, vous pouvez piocher 4 cartes.",
    },
    it: {
      name: "Amelia",
      version: "Strega Subdola",
      text: "Trasformazione 7 NELLE GRINFIE DELL'OMBRA Quando giochi questo personaggio, se hai usato Trasformazione per giocarlo, puoi pescare 4 carte.",
    },
  },
  inkType: ["amethyst"],
  franchise: "Ducktales",
  set: "010",
  cardNumber: 54,
  rarity: "common",
  cost: 7,
  strength: 7,
  willpower: 7,
  lore: 1,
  inkable: false,
  externalIds: {
    lorcast: "crd_c8b3b3f1c90f441ca2eab63ef98d79cf",
    tcgPlayer: 659427,
  },
  text: [
    {
      title: "Shift 7 {I}",
    },
    {
      title: "SHADOW'S GRASP",
      description:
        "When you play this character, if you used Shift to play her, you may draw 4 cards.",
    },
  ],
  classifications: ["Floodborn", "Villain", "Sorcerer"],
  abilities: [
    {
      cost: {
        ink: 7,
      },
      id: "x7f-1",
      keyword: "Shift",
      text: "Shift 7 {I}",
      type: "keyword",
    },
    {
      effect: {
        condition: {
          type: "used-shift",
        },
        then: {
          amount: 4,
          target: "CONTROLLER",
          type: "draw",
        },
        type: "conditional",
      },
      id: "x7f-2",
      name: "SHADOW'S GRASP",
      text: "SHADOW'S GRASP When you play this character, if you used Shift to play her, you may draw 4 cards.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
