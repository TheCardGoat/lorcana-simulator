import type { CharacterCard } from "@tcg/lorcana-types";

export const ladyTremaineOverbearingMatriarch: CharacterCard = {
  id: "B8N",
  canonicalId: "ci_B8N",
  reprints: ["set2-111"],
  cardType: "character",
  name: "Lady Tremaine",
  version: "Overbearing Matriarch",
  i18n: {
    en: {
      name: "Lady Tremaine",
      version: "Overbearing Matriarch",
      text: [
        {
          title: "NOT FOR YOU",
          description:
            "When you play this character, each opponent with more lore than you loses 1 lore.",
        },
      ],
    },
    de: {
      name: "Gräfin Tremaine",
      version: "Überhebliches Familienoberhaupt",
      text: [
        {
          title: "NICHT FÜR DICH",
          description:
            "Wenn du diesen Charakter ausspielst, verlieren alle gegnerischen Mitspielenden, die mehr Legenden als du haben, je 1 Legende.",
        },
      ],
    },
    fr: {
      name: "Madame de Trémaine",
      version: "Marâtre autoritaire",
      text: [
        {
          title: "PAS POUR TOI",
          description:
            "Lorsque vous jouez ce personnage, chaque adversaire ayant plus d'éclats de Lore que vous perd 1 éclat de Lore.",
        },
      ],
    },
    it: {
      name: "Lady Tremaine",
      version: "Overbearing Matriarch",
      text: [
        {
          title: "NOT FOR YOU",
          description:
            "When you play this character, each opponent with more lore than you loses 1 lore.",
        },
      ],
    },
  },
  inkType: ["ruby"],
  franchise: "Cinderella",
  set: "002",
  cardNumber: 111,
  rarity: "common",
  cost: 2,
  strength: 2,
  willpower: 2,
  lore: 1,
  inkable: false,
  externalIds: {
    lorcast: "crd_5c953b299f3b4de08ff77ddd3b041270",
    tcgPlayer: 522698,
  },
  text: [
    {
      title: "NOT FOR YOU",
      description:
        "When you play this character, each opponent with more lore than you loses 1 lore.",
    },
  ],
  classifications: ["Storyborn", "Villain"],
  missingTests: true,
  abilities: [
    {
      effect: {
        amount: 1,
        target: "EACH_OPPONENT",
        type: "lose-lore",
      },
      id: "r0v-1",
      name: "NOT FOR YOU",
      text: "NOT FOR YOU When you play this character, each opponent with more lore than you loses 1 lore.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
