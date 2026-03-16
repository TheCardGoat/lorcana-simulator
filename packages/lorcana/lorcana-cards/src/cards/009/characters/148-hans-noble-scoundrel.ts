import type { CharacterCard } from "@tcg/lorcana-types";

export const hansNobleScoundrel: CharacterCard = {
  id: "ylY",
  canonicalId: "ci_nNC",
  reprints: ["set4-146", "set9-148"],
  cardType: "character",
  name: "Hans",
  version: "Noble Scoundrel",
  i18n: {
    en: {
      name: "Hans",
      version: "Noble Scoundrel",
      text: [
        {
          title: "ROYAL SCHEMES",
          description:
            "When you play this character, if a Princess or Queen character is in play, gain 1 lore.",
        },
      ],
    },
    de: {
      name: "Hans",
      version: "Adeliger Halunke",
      text: [
        {
          title: "KÖNIGLICHE PLÄNE",
          description:
            "Wenn du diesen Charakter ausspielst und mindestens eine Prinzessin oder eine Königin im Spiel ist, sammelst du 1 Legende.",
        },
      ],
    },
    fr: {
      name: "Hans",
      version: "Noble crapule",
      text: [
        {
          title: "INTRIGUES ROYALES",
          description:
            "S'il y a un personnage Princesse ou Reine en jeu lorsque vous jouez ce personnage, gagnez 1 éclat de Lore.",
        },
      ],
    },
    it: {
      name: "Hans",
      version: "Nobile Furfante",
      text: [
        {
          title: "COMPLOTTI REGALI",
          description:
            "Quando giochi questo personaggio, se un personaggio Principessa o Regina è in gioco, ottieni 1 leggenda.",
        },
      ],
    },
  },
  inkType: ["sapphire"],
  franchise: "Frozen",
  set: "009",
  cardNumber: 148,
  rarity: "common",
  cost: 3,
  strength: 3,
  willpower: 2,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_34956960ca9c4048b6d2887bb9ca7446",
    tcgPlayer: 650083,
  },
  text: [
    {
      title: "ROYAL SCHEMES",
      description:
        "When you play this character, if a Princess or Queen character is in play, gain 1 lore.",
    },
  ],
  classifications: ["Storyborn", "Villain", "Prince"],
  abilities: [
    {
      effect: {
        condition: {
          expression: "a Princess or Queen character is in play",
          type: "if",
        },
        then: {
          amount: 1,
          type: "gain-lore",
        },
        type: "conditional",
      },
      id: "1wq-1",
      name: "ROYAL SCHEMES",
      text: "ROYAL SCHEMES When you play this character, if a Princess or Queen character is in play, gain 1 lore.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
