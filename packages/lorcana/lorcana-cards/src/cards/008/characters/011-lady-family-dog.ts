import type { CharacterCard } from "@tcg/lorcana-types";

export const ladyFamilyDog: CharacterCard = {
  id: "XlN",
  canonicalId: "ci_XlN",
  reprints: ["set8-011"],
  cardType: "character",
  name: "Lady",
  version: "Family Dog",
  i18n: {
    en: {
      name: "Lady",
      version: "Family Dog",
      text: [
        {
          title: "SOMEONE TO CARE FOR",
          description:
            "When you play this character, you may play a character with cost 2 or less for free.",
        },
      ],
    },
    de: {
      name: "Susi",
      version: "Familien-Hundedame",
      text: [
        {
          title: "JEMAND, FÜR DEN MAN SORGT",
          description:
            "Wenn du diesen Charakter ausspielst, darfst du einen Charakter, der 2 oder weniger kostet, kostenlos ausspielen.",
        },
      ],
    },
    fr: {
      name: "Lady",
      version: "Chienne de famille",
      text: [
        {
          title: "QUELQU'UN DONT ON DOIT S'OCCUPER",
          description:
            "Lorsque vous jouez ce personnage, vous pouvez jouer gratuitement un personnage coûtant 2 ou moins.",
        },
      ],
    },
    it: {
      name: "Lilli",
      version: "Cagnolina di Famiglia",
      text: [
        {
          title: "QUALCUNO DA ACCUDIRE",
          description:
            "Quando giochi questo personaggio, puoi giocare un personaggio con costo 2 o inferiore gratis.",
        },
      ],
    },
  },
  inkType: ["amber"],
  franchise: "Lady and the Tramp",
  set: "008",
  cardNumber: 11,
  rarity: "rare",
  cost: 3,
  strength: 2,
  willpower: 2,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_5cad0c55b4644a3ea12fff8717e5fe83",
    tcgPlayer: 631355,
  },
  text: [
    {
      title: "SOMEONE TO CARE FOR",
      description:
        "When you play this character, you may play a character with cost 2 or less for free.",
    },
  ],
  classifications: ["Storyborn", "Hero"],
  abilities: [
    {
      effect: {
        chooser: "CONTROLLER",
        effect: {
          cost: "free",
          costRestriction: {
            comparison: "less-or-equal",
            value: 2,
          },
          from: "hand",
          type: "play-card",
        },
        type: "optional",
      },
      id: "ri7-1",
      name: "SOMEONE TO CARE FOR",
      text: "SOMEONE TO CARE FOR When you play this character, you may play a character with cost 2 or less for free.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
