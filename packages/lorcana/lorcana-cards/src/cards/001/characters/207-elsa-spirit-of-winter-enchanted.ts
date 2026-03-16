import type { CharacterCard } from "@tcg/lorcana-types";

export const elsaSpiritOfWinterEnchanted: CharacterCard = {
  id: "yio",
  canonicalId: "ci_4Pf",
  reprints: ["set1-042", "set9-043"],
  cardType: "character",
  name: "Elsa",
  version: "Spirit of Winter",
  i18n: {
    en: {
      name: "Elsa",
      version: "Spirit of Winter",
      text: [
        {
          title: "Shift 6",
        },
        {
          title: "DEEP FREEZE",
          description:
            "When you play this character, exert up to 2 chosen characters. They can't ready at the start of their next turn.",
        },
      ],
    },
    de: {
      name: "Elsa",
      version: "Magie des Winters",
      text: "Gestaltwandel 6 EISESKÄLTE Wenn du diesen Charakter ausspielst, erschöpfe bis zu 2 Charaktere deiner Wahl. Sie werden zu Beginn ihres nächsten Zugs nicht bereit gemacht.",
    },
    fr: {
      name: "ELSA",
      version: "Esprit de l'hiver",
      text: "Alter 6 GEL INTENSE\\ Lorsque vous jouez ce personnage, choisissez jusqu'à 2 personnages et épuisez-les. Ils ne peuvent pas être redressés au début de leur prochain tour.",
    },
    it: {
      name: "Elsa",
      version: "Spirit of Winter",
      text: [
        {
          title: "Shift 6",
          description:
            "(You may pay 6 to play this on top of one of your characters named Elsa.) DEEP FREEZE When you play this character, exert up to 2 chosen characters. They can't ready at the start of their next turn.",
        },
      ],
    },
  },
  inkType: ["amethyst"],
  franchise: "Frozen",
  set: "001",
  cardNumber: 207,
  rarity: "enchanted",
  specialRarity: "enchanted",
  cost: 8,
  strength: 4,
  willpower: 6,
  lore: 3,
  inkable: false,
  missingTests: true,
  externalIds: {
    lorcast: "crd_096f0a6be34a4134aaa682c768cceeec",
    tcgPlayer: 649990,
  },
  text: [
    {
      title: "Shift 6",
    },
    {
      title: "DEEP FREEZE",
      description:
        "When you play this character, exert up to 2 chosen characters. They can't ready at the start of their next turn.",
    },
  ],
  classifications: ["Floodborn", "Hero", "Queen", "Sorcerer"],
  abilities: [
    {
      cost: {
        ink: 6,
      },
      id: "95w-1",
      keyword: "Shift",
      text: "Shift 6 {I}",
      type: "keyword",
    },
    {
      effect: {
        target: {
          cardTypes: ["character"],
          count: 1,
          owner: "any",
          selector: "chosen",
          zones: ["play"],
        },
        type: "exert",
      },
      id: "95w-2",
      name: "DEEP FREEZE",
      text: "DEEP FREEZE When you play this character, exert up to 2 chosen characters. They can’t ready at the start of their next turn.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
