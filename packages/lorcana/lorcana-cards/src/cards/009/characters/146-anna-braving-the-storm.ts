import type { CharacterCard } from "@tcg/lorcana-types";

export const annaBravingTheStorm: CharacterCard = {
  id: "rAH",
  canonicalId: "ci_fSd",
  reprints: ["set4-137", "set9-146"],
  cardType: "character",
  name: "Anna",
  version: "Braving the Storm",
  i18n: {
    en: {
      name: "Anna",
      version: "Braving the Storm",
      text: [
        {
          title: "I WAS BORN READY",
          description: "While you have another Hero character in play, this character gets +1 {L}.",
        },
      ],
    },
    de: {
      name: "Anna",
      version: "Dem Sturm trotzend",
      text: [
        {
          title: "ICH BIN SO WAS VON BEREIT",
          description:
            "Wenn du mindestens eine andere Heldin oder einen Held im Spiel hast, erhält dieser Charakter +1.",
        },
      ],
    },
    fr: {
      name: "Anna",
      version: "Bravant la tempête",
      text: [
        {
          title: "JE SUIS TOUT À FAIT PRÊTE",
          description:
            "Tant que vous avez un autre personnage Héros en jeu, ce personnage-ci gagne +1.",
        },
      ],
    },
    it: {
      name: "Anna",
      version: "Che Affronta la Tempesta",
      text: [
        {
          title: "SONO NATA PRONTA",
          description: "Se hai in gioco un altro personaggio Eroe, questo personaggio riceve +1.",
        },
      ],
    },
  },
  inkType: ["sapphire"],
  franchise: "Frozen",
  set: "009",
  cardNumber: 146,
  rarity: "common",
  cost: 2,
  strength: 1,
  willpower: 4,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_d911158c4175449e9814484f3c5adb06",
    tcgPlayer: 650153,
  },
  text: [
    {
      title: "I WAS BORN READY",
      description: "While you have another Hero character in play, this character gets +1 {L}.",
    },
  ],
  classifications: ["Storyborn", "Hero", "Queen"],
  abilities: [
    {
      effect: {
        modifier: 1,
        stat: "lore",
        target: "SELF",
        type: "modify-stat",
      },
      id: "mi9-1",
      text: "I WAS BORN READY While you have another Hero character in play, this character gets +1 {L}.",
      type: "action",
    },
  ],
};
