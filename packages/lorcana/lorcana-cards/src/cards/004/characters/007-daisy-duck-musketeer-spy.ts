import type { CharacterCard } from "@tcg/lorcana-types";

export const daisyDuckMusketeerSpy: CharacterCard = {
  id: "de6",
  canonicalId: "ci_rUa",
  reprints: ["set4-007", "set9-011"],
  cardType: "character",
  name: "Daisy Duck",
  version: "Musketeer Spy",
  i18n: {
    en: {
      name: "Daisy Duck",
      version: "Musketeer Spy",
      text: [
        {
          title: "INFILTRATION",
          description: "When you play this character, each opponent chooses and discards a card.",
        },
      ],
    },
    de: {
      name: "Daisy Duck",
      version: "Musketier-Spionin",
      text: [
        {
          title: "INFILTRATION",
          description:
            "Wenn du diesen Charakter ausspielst, wählen alle gegnerischen Mitspielenden je 1 Karte aus ihrer Hand und werfen sie ab.",
        },
      ],
    },
    fr: {
      name: "Daisy",
      version: "Mousquetaire espionne",
      text: [
        {
          title: "INFILTRATION",
          description:
            "Lorsque vous jouez ce personnage, chaque adversaire choisit une carte de sa main et la défausse.",
        },
      ],
    },
    it: {
      name: "Paperina",
      version: "Spia dei Moschettieri",
      text: [
        {
          title: "INFILTRARSI",
          description:
            "Quando giochi questo personaggio, ogni avversario sceglie e scarta una carta.",
        },
      ],
    },
  },
  inkType: ["amber"],
  set: "004",
  cardNumber: 7,
  rarity: "common",
  cost: 4,
  strength: 2,
  willpower: 3,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_df9fc4392077467ab80211e4c47b6b2c",
    tcgPlayer: 649960,
  },
  text: [
    {
      title: "INFILTRATION",
      description: "When you play this character, each opponent chooses and discards a card.",
    },
  ],
  classifications: ["Dreamborn", "Hero", "Musketeer"],
  abilities: [
    {
      effect: {
        amount: 1,
        chosen: true,
        target: "EACH_OPPONENT",
        type: "discard",
      },
      id: "19a-1",
      name: "INFILTRATION",
      text: "INFILTRATION When you play this character, each opponent chooses and discards a card.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
