import type { CharacterCard } from "@tcg/lorcana-types";

export const rabbitIndignantPirate: CharacterCard = {
  id: "p9G",
  canonicalId: "ci_p9G",
  reprints: ["set6-022"],
  cardType: "character",
  name: "Rabbit",
  version: "Indignant Pirate",
  i18n: {
    en: {
      name: "Rabbit",
      version: "Indignant Pirate",
      text: [
        {
          title: "BE MORE CAREFUL",
          description:
            "When you play this character, you may remove up to 1 damage from chosen character.",
        },
      ],
    },
    de: {
      name: "Rabbit",
      version: "Empörter Pirat",
      text: [
        {
          title: "SEI VORSICHTIGER",
          description:
            "Wenn du diesen Charakter ausspielst, darfst du bis zu 1 Schaden von einem Charakter deiner Wahl entfernen.",
        },
      ],
    },
    fr: {
      name: "Coco Lapin",
      version: "Pirate indigné",
      text: [
        {
          title: "SOIS PLUS PRUDENT",
          description:
            "Lorsque vous jouez ce personnage, vous pouvez choisir un personnage et lui retirer jusqu'à 1 dommage.",
        },
      ],
    },
    it: {
      name: "Tappo",
      version: "Pirata Indignato",
      text: [
        {
          title: "STAI PIÙ ATTENTO",
          description:
            "Quando giochi questo personaggio, puoi rimuovere fino a 1 danno da un personaggio a tua scelta.",
        },
      ],
    },
  },
  inkType: ["amber"],
  franchise: "Winnie the Pooh",
  set: "006",
  cardNumber: 22,
  rarity: "common",
  cost: 1,
  strength: 1,
  willpower: 2,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_6656edfc61dd4cc0846fee37f6c8e7b9",
    tcgPlayer: 587238,
  },
  text: [
    {
      title: "BE MORE CAREFUL",
      description:
        "When you play this character, you may remove up to 1 damage from chosen character.",
    },
  ],
  classifications: ["Dreamborn", "Ally", "Pirate"],
  abilities: [
    {
      effect: {
        chooser: "CONTROLLER",
        effect: {
          amount: 1,
          target: {
            selector: "chosen",
            count: 1,
            owner: "any",
            zones: ["play"],
            cardTypes: ["character"],
          },
          type: "remove-damage",
          upTo: true,
        },
        type: "optional",
      },
      id: "1cx-1",
      name: "BE MORE CAREFUL",
      text: "BE MORE CAREFUL When you play this character, you may remove up to 1 damage from chosen character.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
