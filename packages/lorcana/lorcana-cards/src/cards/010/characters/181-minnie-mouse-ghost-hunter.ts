import type { CharacterCard } from "@tcg/lorcana-types";

export const minnieMouseGhostHunter: CharacterCard = {
  id: "0cC",
  canonicalId: "ci_CEB",
  reprints: ["set10-181"],
  cardType: "character",
  name: "Minnie Mouse",
  version: "Ghost Hunter",
  i18n: {
    en: {
      name: "Minnie Mouse",
      version: "Ghost Hunter",
      text: [
        {
          title: "SEARCH THE SHADOWS",
          description:
            "When you play this character, chosen Detective character gains Alert this turn. (They can challenge as if they had Evasive.)",
        },
      ],
    },
    de: {
      name: "Minnie Maus",
      version: "Geisterjägerin",
      text: [
        {
          title: "SUCHE IN DEN SCHATTEN",
          description:
            "Wenn du diesen Charakter ausspielst, erhält ein Detektiv deiner Wahl in diesem Zug Alarmiert. (Der Charakter kann herausfordern, als hätte er Wendig.)",
        },
      ],
    },
    fr: {
      name: "Minnie",
      version: "Chasseuse de fantômes",
      text: [
        {
          title: "INVESTIGUER LES OMBRES",
          description:
            "Lorsque vous jouez ce personnage, choisissez un personnage Détective qui gagne Agilité pour le reste de ce tour. (Il peut défier comme s'il avait Insaisissable.)",
        },
      ],
    },
    it: {
      name: "Minni",
      version: "Cacciatrice di Fantasmi",
      text: [
        {
          title: "CERCARE TRA LE OMBRE",
          description:
            "Quando giochi questo personaggio, un personaggio Detective a tua scelta ottiene Vigile per questo turno. (Può sfidare come se avesse Sfuggente.)",
        },
      ],
    },
  },
  inkType: ["steel"],
  set: "010",
  cardNumber: 181,
  rarity: "common",
  cost: 2,
  strength: 2,
  willpower: 3,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_1ad6e15d73174d7ab0d55b27d770e14d",
    tcgPlayer: 660364,
  },
  text: [
    {
      title: "SEARCH THE SHADOWS",
      description:
        "When you play this character, chosen Detective character gains Alert this turn. (They can challenge as if they had Evasive.)",
    },
  ],
  classifications: ["Dreamborn", "Hero", "Detective"],
  abilities: [
    {
      effect: {
        duration: "this-turn",
        keyword: "Alert",
        target: "CHOSEN_CHARACTER",
        type: "gain-keyword",
      },
      id: "oy7-1",
      name: "SEARCH THE SHADOWS",
      text: "SEARCH THE SHADOWS When you play this character, chosen Detective character gains Alert this turn.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
