import type { CharacterCard } from "@tcg/lorcana-types";

export const madamMimPurpleDragon: CharacterCard = {
  id: "EHY",
  canonicalId: "ci_xvT",
  reprints: ["set2-047"],
  cardType: "character",
  name: "Madam Mim",
  version: "Purple Dragon",
  i18n: {
    en: {
      name: "Madam Mim",
      version: "Purple Dragon",
      text: [
        {
          title: "Evasive",
        },
        {
          title: "I WIN, I WIN!",
          description:
            "When you play this character, banish her or return another 2 chosen characters of yours to your hand.",
        },
      ],
    },
    de: {
      name: "Madame Mim",
      version: "Lila Drache",
      text: "Wendig GEWONNEN, GEWONNEN! Wenn du diesen Charakter ausspielst, musst du ihn verbannen oder 2 deiner anderen Charaktere wählen und zurück auf deine Hand nehmen.",
    },
    fr: {
      name: "Madame Mime",
      version: "En dragon",
      text: "Insaisissable JE L'AI EU, J'AI GAGNÉ! Lorsque vous jouez ce personnage, bannissez-le ou renvoyez 2 de vos autres personnages en jeu dans votre main.",
    },
    it: {
      name: "Madam Mim",
      version: "Purple Dragon",
      text: [
        {
          title: "Evasive",
          description:
            "(Only characters with Evasive can challenge this character.) I WIN, I WIN! When you play this character, banish her or return another 2 chosen characters of yours to your hand.",
        },
      ],
    },
  },
  inkType: ["amethyst"],
  franchise: "Sword in the Stone",
  set: "002",
  cardNumber: 47,
  rarity: "legendary",
  cost: 7,
  strength: 5,
  willpower: 7,
  lore: 4,
  inkable: true,
  externalIds: {
    lorcast: "crd_26dd3cd037974467a3c4078d58f4ae25",
    tcgPlayer: 528107,
  },
  text: [
    {
      title: "Evasive",
    },
    {
      title: "I WIN, I WIN!",
      description:
        "When you play this character, banish her or return another 2 chosen characters of yours to your hand.",
    },
  ],
  classifications: ["Storyborn", "Villain", "Sorcerer", "Dragon"],
  missingTests: true,
  abilities: [
    {
      id: "12t-1",
      keyword: "Evasive",
      text: "Evasive",
      type: "keyword",
    },
    {
      effect: {
        type: "or",
        optionLabels: ["banish her", "return another 2 chosen characters of yours to your hand"],
        options: [
          {
            target: "SELF",
            type: "banish",
          },
          {
            target: {
              excludeSelf: true,
              selector: "chosen",
              count: 2,
              owner: "you",
              zones: ["play"],
              cardTypes: ["character"],
            },
            type: "return-to-hand",
          },
        ],
      },
      id: "12t-2",
      name: "I WIN, I WIN!",
      text: "I WIN, I WIN! When you play this character, banish her or return another 2 chosen characters of yours to your hand.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
