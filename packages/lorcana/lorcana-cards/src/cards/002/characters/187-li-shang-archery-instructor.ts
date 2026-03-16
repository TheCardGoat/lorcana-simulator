import type { CharacterCard } from "@tcg/lorcana-types";

export const liShangArcheryInstructor: CharacterCard = {
  id: "vB7",
  canonicalId: "ci_vB7",
  reprints: ["set2-187"],
  cardType: "character",
  name: "Li Shang",
  version: "Archery Instructor",
  i18n: {
    en: {
      name: "Li Shang",
      version: "Archery Instructor",
      text: [
        {
          title: "ARCHERY LESSON",
          description:
            "Whenever this character quests, your characters gain Evasive this turn. (They can challenge characters with Evasive.)",
        },
      ],
    },
    de: {
      name: "Li Shang",
      version: "Bogenschützen-Ausbilder",
      text: [
        {
          title: "LEKTION IM BOGENSCHIESSEN",
          description:
            "Jedes Mal, wenn dieser Charakter erkundet, erhalten deine Charaktere in diesem Zug Wendig. (Sie können Charaktere mit Wendig herausfordern.)",
        },
      ],
    },
    fr: {
      name: "Li Shang",
      version: "Instructeur d'archerie",
      text: [
        {
          title: "LEÇON DE TIR À L'ARC",
          description:
            "Lorsque ce personnage est envoyé à l'aventure, vos personnages gagnent Insaisissable pour le reste de ce tour. (Ils peuvent défier les personnages avec Insaisissable.)",
        },
      ],
    },
    it: {
      name: "Li Shang",
      version: "Archery Instructor",
      text: [
        {
          title: "ARCHERY LESSON",
          description:
            "Whenever this character quests, your characters gain Evasive this turn. (They can challenge characters with Evasive.)",
        },
      ],
    },
  },
  inkType: ["steel"],
  franchise: "Mulan",
  set: "002",
  cardNumber: 187,
  rarity: "uncommon",
  cost: 5,
  strength: 3,
  willpower: 6,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_71250fc9f98742369de2116914b4109f",
    tcgPlayer: 523755,
  },
  text: [
    {
      title: "ARCHERY LESSON",
      description:
        "Whenever this character quests, your characters gain Evasive this turn. (They can challenge characters with Evasive.)",
    },
  ],
  classifications: ["Storyborn", "Hero"],
  missingTests: true,
  abilities: [
    {
      effect: {
        duration: "this-turn",
        keyword: "Evasive",
        target: "YOUR_CHARACTERS",
        type: "gain-keyword",
      },
      id: "1eu-1",
      name: "ARCHERY LESSON",
      text: "ARCHERY LESSON Whenever this character quests, your characters gain Evasive this turn.",
      trigger: {
        event: "quest",
        on: "SELF",
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
};
