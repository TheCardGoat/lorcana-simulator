import type { CharacterCard } from "@tcg/lorcana-types";

export const arthurWizardsApprentice: CharacterCard = {
  id: "W0X",
  canonicalId: "ci_tMV",
  reprints: ["set2-035"],
  cardType: "character",
  name: "Arthur",
  version: "Wizard's Apprentice",
  i18n: {
    en: {
      name: "Arthur",
      version: "Wizard's Apprentice",
      text: [
        {
          title: "STUDENT",
          description:
            "Whenever this character quests, you may return another chosen character of yours to your hand to gain 2 lore.",
        },
      ],
    },
    de: {
      name: "Arthur",
      version: "Zauberlehrling",
      text: [
        {
          title: "SCHÜLER",
          description:
            "Jedes Mal, wenn dieser Charakter erkundet, darfst du einen deiner anderen Charaktere wählen und zurück auf deine Hand nehmen, um 2 Legenden zu sammeln.",
        },
      ],
    },
    fr: {
      name: "Arthur",
      version: "Apprenti de l'Enchanteur",
      text: [
        {
          title: "ÉTUDIANT",
          description:
            "Lorsque ce personnage est envoyé à l'aventure, vous pouvez renvoyer l'un de vos autres personnages en jeu dans votre main pour gagner 2 éclats de Lore.",
        },
      ],
    },
    it: {
      name: "Arthur",
      version: "Wizard's Apprentice",
      text: [
        {
          title: "STUDENT",
          description:
            "Whenever this character quests, you may return another chosen character of yours to your hand to gain 2 lore.",
        },
      ],
    },
  },
  inkType: ["amethyst"],
  franchise: "Sword in the Stone",
  set: "002",
  cardNumber: 35,
  rarity: "common",
  cost: 3,
  strength: 1,
  willpower: 3,
  lore: 1,
  inkable: false,
  externalIds: {
    lorcast: "crd_19431b87131547d98fef8a693077a77e",
    tcgPlayer: 527797,
  },
  text: [
    {
      title: "STUDENT",
      description:
        "Whenever this character quests, you may return another chosen character of yours to your hand to gain 2 lore.",
    },
  ],
  classifications: ["Dreamborn", "Hero", "Sorcerer"],
  missingTests: true,
  abilities: [
    {
      effect: {
        chooser: "CONTROLLER",
        effect: {
          amount: 2,
          type: "gain-lore",
        },
        type: "optional",
      },
      trigger: {
        event: "quest",
        on: "SELF",
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
};
