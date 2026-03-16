import type { CharacterCard } from "@tcg/lorcana-types";

export const beastSelflessProtector: CharacterCard = {
  id: "sLs",
  canonicalId: "ci_sLs",
  reprints: ["set2-172"],
  cardType: "character",
  name: "Beast",
  version: "Selfless Protector",
  i18n: {
    en: {
      name: "Beast",
      version: "Selfless Protector",
      text: [
        {
          title: "SHIELD ANOTHER",
          description:
            "Whenever one of your other characters would be dealt damage, put that many damage counters on this character instead.",
        },
      ],
    },
    de: {
      name: "Biest",
      version: "Selbstloser Beschützer",
      text: [
        {
          title: "ANDERE SCHÜTZEN",
          description:
            "Jedes Mal, wenn einer deiner anderen Charaktere Schaden erhalten würde, lege die entsprechenden Schadensmarker stattdessen auf diesen Charakter.",
        },
      ],
    },
    fr: {
      name: "La Bête",
      version: "Prêt à se sacrifier",
      text: [
        {
          title: "PROTÉGER LES AUTRES",
          description:
            "Si des dommages sont infligés à l'un de vos autres personnages, placez-les sur ce personnage à la place.",
        },
      ],
    },
    it: {
      name: "Beast",
      version: "Selfless Protector",
      text: [
        {
          title: "SHIELD ANOTHER",
          description:
            "Whenever one of your other characters would be dealt damage, put that many damage counters on this character instead.",
        },
      ],
    },
  },
  inkType: ["steel"],
  franchise: "Beauty and the Beast",
  set: "002",
  cardNumber: 172,
  rarity: "common",
  cost: 6,
  strength: 2,
  willpower: 8,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_966bd91d331f46b3af9f199a2e03515d",
    tcgPlayer: 527772,
  },
  text: [
    {
      title: "SHIELD ANOTHER",
      description:
        "Whenever one of your other characters would be dealt damage, put that many damage counters on this character instead.",
    },
  ],
  classifications: ["Storyborn", "Hero", "Prince"],
  missingTests: true,
  abilities: [
    {
      id: "sLs-1",
      replaces: "damage-to-character",
      replacement: {
        type: "redirect-damage",
        appliesTo: "your-other-characters",
        redirectTo: "self",
      },
      text: "SHIELD ANOTHER Whenever one of your other characters would be dealt damage, put that many damage counters on this character instead.",
      type: "replacement",
    },
  ],
};
