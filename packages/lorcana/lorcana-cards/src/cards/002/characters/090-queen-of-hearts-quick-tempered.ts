import type { CharacterCard } from "@tcg/lorcana-types";

export const queenOfHeartsQuicktempered: CharacterCard = {
  id: "VtO",
  canonicalId: "ci_VtO",
  reprints: ["set2-090"],
  cardType: "character",
  name: "Queen of Hearts",
  version: "Quick-Tempered",
  i18n: {
    en: {
      name: "Queen of Hearts",
      version: "Quick-Tempered",
      text: [
        {
          title: "ROYAL RAGE",
          description:
            "When you play this character, deal 1 damage to chosen damaged opposing character.",
        },
      ],
    },
    de: {
      name: "Die Herzkönigin",
      version: "Jähzornig",
      text: [
        {
          title: "ICH WARNE DICH, KIND!",
          description:
            "Wenn du diesen Charakter ausspielst, füge einem beschädigten gegnerischen Charakter deiner Wahl 1 Schaden zu.",
        },
      ],
    },
    fr: {
      name: "La Reine de Cœur",
      version: "Rapidement en colère",
      text: [
        {
          title: "FUREUR ROYALE",
          description:
            "Lorsque vous jouez ce personnage, choisissez un personnage adverse blessé et infligez-lui 1 dommage supplémentaire.",
        },
      ],
    },
    it: {
      name: "Queen of Hearts",
      version: "Quick-Tempered",
      text: [
        {
          title: "ROYAL RAGE",
          description:
            "When you play this character, deal 1 damage to chosen damaged opposing character.",
        },
      ],
    },
  },
  inkType: ["emerald"],
  franchise: "Alice in Wonderland",
  set: "002",
  cardNumber: 90,
  rarity: "common",
  cost: 2,
  strength: 1,
  willpower: 2,
  lore: 2,
  inkable: false,
  externalIds: {
    lorcast: "crd_2f01947ccb4d4bae8b2cda6308a77323",
    tcgPlayer: 525079,
  },
  text: [
    {
      title: "ROYAL RAGE",
      description:
        "When you play this character, deal 1 damage to chosen damaged opposing character.",
    },
  ],
  classifications: ["Dreamborn", "Villain", "Queen"],
  missingTests: true,
  abilities: [
    {
      effect: {
        amount: 1,
        target: {
          cardTypes: ["character"],
          count: "all",
          owner: "opponent",
          selector: "all",
          zones: ["play"],
        },
        type: "deal-damage",
      },
      id: "hry-1",
      name: "ROYAL RAGE",
      text: "ROYAL RAGE When you play this character, deal 1 damage to chosen damaged opposing character.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
