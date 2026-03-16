import type { CharacterCard } from "@tcg/lorcana-types";

export const beastTragicHero: CharacterCard = {
  id: "VVb",
  canonicalId: "ci_VVb",
  reprints: ["set2-173"],
  cardType: "character",
  name: "Beast",
  version: "Tragic Hero",
  i18n: {
    en: {
      name: "Beast",
      version: "Tragic Hero",
      text: [
        {
          title: "Shift 3",
        },
        {
          title: "IT'S BETTER THIS WAY",
          description:
            "At the start of your turn, if this character has no damage, draw a card. Otherwise, he gets +4 {S} this turn.",
        },
      ],
    },
    de: {
      name: "Biest",
      version: "Tragischer Held",
      text: "Gestaltwandel 3 VIELLEICHT IST ES SO BESSER Ziehe zu Beginn deines Zuges 1 Karte, falls dieser Charakter unbeschädigt ist. Ist er beschädigt, erhält er in diesem Zug +4.",
    },
    fr: {
      name: "La Bête",
      version: "Héros tragique",
      text: "Alter 3 C'EST PEUT-ÊTRE MIEUX COMME ÇA Si ce personnage n'a aucun jeton dommage sur lui au début de votre tour, piochez une carte. Sinon, il gagne +4 pour le reste de ce tour.",
    },
    it: {
      name: "Beast",
      version: "Tragic Hero",
      text: [
        {
          title: "Shift 3",
          description:
            "(You may pay 3 to play this on top of one of your characters named Beast.) IT'S BETTER THIS WAY At the start of your turn, if this character has no damage, draw a card. Otherwise, he gets +4 this turn.",
        },
      ],
    },
  },
  inkType: ["steel"],
  franchise: "Beauty and the Beast",
  set: "002",
  cardNumber: 173,
  rarity: "legendary",
  cost: 5,
  strength: 3,
  willpower: 5,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_7ffeed1a4c364378ab7814dda3b99b73",
    tcgPlayer: 527629,
  },
  text: [
    {
      title: "Shift 3",
    },
    {
      title: "IT'S BETTER THIS WAY",
      description:
        "At the start of your turn, if this character has no damage, draw a card. Otherwise, he gets +4 {S} this turn.",
    },
  ],
  missingImplementation: true,
  missingTests: true,
  classifications: ["Floodborn", "Hero", "Prince"],
  abilities: [
    {
      cost: {
        ink: 3,
      },
      id: "kyf-1",
      keyword: "Shift",
      text: "Shift 3",
      type: "keyword",
    },
    {
      id: "kyf-2",
      name: "IT'S BETTER THIS WAY",
      text: "IT'S BETTER THIS WAY At the start of your turn, if this character has no damage, draw a card. Otherwise, he gets +4 {S} this turn.",
      type: "triggered",
      trigger: {
        event: "start-turn",
        on: "YOU",
        timing: "at",
      },
      effect: {
        type: "conditional",
        condition: {
          type: "target-query",
          query: {
            selector: "all",
            reference: "source",
            filters: [
              {
                type: "undamaged",
              },
            ],
          },
          comparison: {
            operator: "gte",
            value: 1,
          },
        },
        then: {
          amount: 1,
          target: "CONTROLLER",
          type: "draw",
        },
        else: {
          duration: "this-turn",
          modifier: 4,
          stat: "strength",
          target: "SELF",
          type: "modify-stat",
        },
      },
    },
  ],
};
