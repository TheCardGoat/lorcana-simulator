import type { CharacterCard } from "@tcg/lorcana-types";

export const madamMimSnake: CharacterCard = {
  id: "zyO",
  canonicalId: "ci_zyO",
  reprints: ["set2-049"],
  cardType: "character",
  name: "Madam Mim",
  version: "Snake",
  i18n: {
    en: {
      name: "Madam Mim",
      version: "Snake",
      text: [
        {
          title: "JUST YOU WAIT",
          description:
            "When you play this character, banish her or return another chosen character of yours to your hand.",
        },
      ],
    },
    de: {
      name: "Madame Mim",
      version: "Schlange",
      text: [
        {
          title: "NA WARTE!",
          description:
            "Wenn du diesen Charakter ausspielst, musst du ihn verbannen oder einen deiner anderen Charaktere wählen und zurück auf deine Hand nehmen.",
        },
      ],
    },
    fr: {
      name: "Madame Mime",
      version: "En serpent",
      text: [
        {
          title: "ATTENDEZ UN PEU",
          description:
            "Lorsque vous jouez ce personnage, bannissez-le ou renvoyez l'un de vos autres personnages en jeu dans votre main.",
        },
      ],
    },
    it: {
      name: "Maga Magò",
      version: "Serpente",
      text: [
        {
          title: "ASPETTA E VEDRAI",
          description:
            "Quando giochi questo personaggio, esilialo o riprendi in mano un tuo altro personaggio a tua scelta.",
        },
      ],
    },
  },
  inkType: ["amethyst"],
  franchise: "Sword in the Stone",
  set: "002",
  cardNumber: 49,
  rarity: "uncommon",
  cost: 2,
  strength: 3,
  willpower: 3,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_1718e93b703240a8a8be4fd0ab13b4e6",
    tcgPlayer: 522651,
  },
  text: [
    {
      title: "JUST YOU WAIT",
      description:
        "When you play this character, banish her or return another chosen character of yours to your hand.",
    },
  ],
  classifications: ["Storyborn", "Villain", "Sorcerer"],
  abilities: [
    {
      effect: {
        type: "or",
        optionLabels: ["banish her", "return another chosen character of yours to your hand"],
        options: [
          {
            target: "SELF",
            type: "banish",
          },
          {
            target: {
              cardTypes: ["character"],
              count: 1,
              excludeSelf: true,
              owner: "you",
              selector: "chosen",
              zones: ["play"],
            },
            type: "return-to-hand",
          },
        ],
      },
      id: "1tb-1",
      name: "JUST YOU WAIT",
      text: "JUST YOU WAIT When you play this character, banish her or return another chosen character of yours to your hand.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
