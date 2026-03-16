import type { CharacterCard } from "@tcg/lorcana-types";

export const flitReflectiveHummingbird: CharacterCard = {
  id: "lgw",
  canonicalId: "ci_lgw",
  reprints: ["set11-039"],
  cardType: "character",
  name: "Flit",
  version: "Reflective Hummingbird",
  i18n: {
    en: {
      name: "Flit",
      version: "Reflective Hummingbird",
      text: [
        {
          title: "LOOK OUT!",
          description:
            "When you play this character, move up to 1 damage from chosen character to chosen opposing character.",
        },
      ],
    },
    de: {
      name: "Flit",
      version: "Reflektierter Kolibri",
      text: [
        {
          title: "PASS DOCH AUF!",
          description:
            "Wenn du diesen Charakter ausspielst, verschiebe bis zu 1 Schaden von einem Charakter deiner Wahl zu einem gegnerischen Charakter deiner Wahl.",
        },
      ],
    },
    fr: {
      name: "Flit",
      version: "Colibri réfléchissant",
      text: [
        {
          title: "ATTENTION!",
          description:
            "Lorsque vous jouez ce personnage, vous pouvez choisir un personnage et déplacer 1 de ses dommages sur un personnage adverse de votre choix.",
        },
      ],
    },
    it: {
      name: "Flit",
      version: "Colibrì Che Si Riflette",
      text: [
        {
          title: "ATTENTO!",
          description:
            "Quando giochi questo personaggio, sposta fino a 1 danno da un personaggio a tua scelta a un personaggio avversario a tua scelta.",
        },
      ],
    },
  },
  inkType: ["amethyst"],
  franchise: "Pocahontas",
  set: "011",
  cardNumber: 39,
  rarity: "uncommon",
  cost: 1,
  strength: 0,
  willpower: 2,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_fcdeeb8639c74831b6c234d81ad2f476",
    tcgPlayer: 674697,
  },
  text: [
    {
      title: "LOOK OUT!",
      description:
        "When you play this character, move up to 1 damage from chosen character to chosen opposing character.",
    },
  ],
  classifications: ["Storyborn", "Ally"],
  abilities: [
    {
      id: "14k-1",
      effect: {
        from: "hand",
        type: "play-card",
      },
      name: "LOOK OUT!",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
      text: "LOOK OUT! When you play this character, move up to 1 damage from chosen character to chosen opposing character.",
    },
  ],
};
