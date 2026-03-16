import type { CharacterCard } from "@tcg/lorcana-types";

export const plutoRescueDog: CharacterCard = {
  id: "vP8",
  canonicalId: "ci_hkQ",
  reprints: ["set4-020", "set9-016"],
  cardType: "character",
  name: "Pluto",
  version: "Rescue Dog",
  i18n: {
    en: {
      name: "Pluto",
      version: "Rescue Dog",
      text: [
        {
          title: "TO THE RESCUE",
          description:
            "When you play this character, you may remove up to 3 damage from one of your characters.",
        },
      ],
    },
    de: {
      name: "Pluto",
      version: "Rettungshund",
      text: [
        {
          title: "ZUR RETTUNG",
          description:
            "Wenn du diesen Charakter ausspielst, darfst du bis zu 3 Schaden von einem deiner Charaktere entfernen.",
        },
      ],
    },
    fr: {
      name: "Pluto",
      version: "Chien de sauvetage",
      text: [
        {
          title: "À LA RESCOUSSE",
          description:
            "Lorsque vous jouez ce personnage, vous pouvez retirer jusqu'à 3 jetons Dommage de l'un de vos personnages.",
        },
      ],
    },
    it: {
      name: "Pluto",
      version: "Cane da Salvataggio",
      text: [
        {
          title: "CORRERE IN SOCCORSO",
          description:
            "Quando giochi questo personaggio, puoi rimuovere fino a 3 danni da uno dei tuoi personaggi.",
        },
      ],
    },
  },
  inkType: ["amber"],
  set: "004",
  cardNumber: 20,
  rarity: "common",
  cost: 5,
  strength: 4,
  willpower: 5,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_e16de0af3ca24eaa9e6570598920d9e8",
    tcgPlayer: 649964,
  },
  text: [
    {
      title: "TO THE RESCUE",
      description:
        "When you play this character, you may remove up to 3 damage from one of your characters.",
    },
  ],
  classifications: ["Storyborn", "Ally"],
  abilities: [
    {
      effect: {
        chooser: "CONTROLLER",
        effect: {
          amount: 3,
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
      id: "141-1",
      name: "TO THE RESCUE",
      text: "TO THE RESCUE When you play this character, you may remove up to 3 damage from chosen character of yours.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
