import type { CharacterCard } from "@tcg/lorcana-types";

export const liloBundledUp: CharacterCard = {
  id: "Vf6",
  canonicalId: "ci_Vf6",
  reprints: ["set11-195"],
  cardType: "character",
  name: "Lilo",
  version: "Bundled Up",
  i18n: {
    en: {
      name: "Lilo",
      version: "Bundled Up",
      text: [
        {
          title: "EXTRA LAYERS",
          description:
            "During each opponent's turn, the first time this character would take damage, she takes no damage instead.",
        },
      ],
    },
    de: {
      name: "Lilo",
      version: "Gut angezogen",
      text: [
        {
          title: "EXTRASCHICHTEN",
          description:
            "Jedes erste Mal, wenn dieser Charakter im Zug einer gegnerischen Person Schaden erhalten würde, erhält er stattdessen keinen Schaden.",
        },
      ],
    },
    fr: {
      name: "Lilo",
      version: "Bien emmitouflée",
      text: [
        {
          title: "EXTRA COUCHES",
          description:
            "Durant le tour de chaque adversaire, la première fois que ce personnage doit subir des dommages, il n'en subit aucun à la place.",
        },
      ],
    },
    it: {
      name: "Lilo",
      version: "Infagottata",
      text: [
        {
          title: "STRATI AGGIUNTIVI",
          description:
            "Durante il turno di ogni avversario, la prima volta che questo personaggio subirebbe danni, non subisce invece alcun danno.",
        },
      ],
    },
  },
  inkType: ["steel"],
  franchise: "Lilo and Stitch",
  set: "011",
  cardNumber: 195,
  rarity: "common",
  cost: 2,
  strength: 1,
  willpower: 2,
  lore: 2,
  inkable: false,
  externalIds: {
    lorcast: "crd_f86297c4c6f940cc8135cd806d96105a",
    tcgPlayer: 676247,
  },
  text: [
    {
      title: "EXTRA LAYERS",
      description:
        "During each opponent's turn, the first time this character would take damage, she takes no damage instead.",
    },
  ],
  classifications: ["Dreamborn", "Hero"],
  abilities: [
    {
      id: "Vf6-1",
      replaces: "damage-to-self",
      replacement: {
        appliesTo: "self",
        during: "opponents-turn",
        firstTimeEachTurn: "opponent-turn",
        type: "prevent-damage",
      },
      text: "EXTRA LAYERS During each opponent's turn, the first time this character would take damage, she takes no damage instead.",
      type: "replacement",
    },
  ],
};
