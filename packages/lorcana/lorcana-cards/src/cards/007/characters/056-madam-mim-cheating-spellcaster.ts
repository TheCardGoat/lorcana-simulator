import type { CharacterCard } from "@tcg/lorcana-types";

export const madamMimCheatingSpellcaster: CharacterCard = {
  id: "UyZ",
  canonicalId: "ci_UyZ",
  reprints: ["set7-056"],
  cardType: "character",
  name: "Madam Mim",
  version: "Cheating Spellcaster",
  i18n: {
    en: {
      name: "Madam Mim",
      version: "Cheating Spellcaster",
      text: [
        {
          title: "PLAY ROUGH",
          description: "Whenever this character quests, exert chosen opposing character.",
        },
      ],
    },
    de: {
      name: "Madame Mim",
      version: "Betrügerische Zauberkünstlerin",
      text: [
        {
          title: "UNFAIRE MITTEL",
          description:
            "Jedes Mal, wenn dieser Charakter erkundet, erschöpfe einen gegnerischen Charakter deiner Wahl.",
        },
      ],
    },
    fr: {
      name: "Madame Mime",
      version: "Sorcière tricheuse",
      text: [
        {
          title: "JOUER AU PLUS FIN",
          description:
            "Chaque fois que ce personnage est envoyé à l'aventure, choisissez un personnage adverse et épuisez-le.",
        },
      ],
    },
    it: {
      name: "Maga Magò",
      version: "Fattucchiera Imbrogliona",
      text: [
        {
          title: "GIOCO DURO",
          description:
            "Ogni volta che questo personaggio va all'avventura, impegna un personaggio avversario a tua scelta.",
        },
      ],
    },
  },
  inkType: ["amethyst"],
  franchise: "Sword in the Stone",
  set: "007",
  cardNumber: 56,
  rarity: "rare",
  cost: 6,
  strength: 4,
  willpower: 5,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_e1f18adb01e14dbd97be31ad052d642d",
    tcgPlayer: 619435,
  },
  text: [
    {
      title: "PLAY ROUGH",
      description: "Whenever this character quests, exert chosen opposing character.",
    },
  ],
  classifications: ["Storyborn", "Villain", "Sorcerer"],
  abilities: [
    {
      effect: {
        target: {
          cardTypes: ["character"],
          count: 1,
          owner: "opponent",
          selector: "chosen",
          zones: ["play"],
        },
        type: "exert",
      },
      id: "1rw-1",
      name: "PLAY ROUGH",
      text: "PLAY ROUGH Whenever this character quests, exert chosen opposing character.",
      trigger: {
        event: "quest",
        on: "SELF",
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
};
