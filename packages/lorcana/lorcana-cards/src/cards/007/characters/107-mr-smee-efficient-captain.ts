import type { CharacterCard } from "@tcg/lorcana-types";

export const mrSmeeEfficientCaptain: CharacterCard = {
  id: "Y7a",
  canonicalId: "ci_Y7a",
  reprints: ["set7-107"],
  cardType: "character",
  name: "Mr. Smee",
  version: "Efficient Captain",
  i18n: {
    en: {
      name: "Mr. Smee",
      version: "Efficient Captain",
      text: [
        {
          title: "PIPE UP THE CREW",
          description:
            "Whenever you play an action that isn't a song, you may ready chosen Pirate character.",
        },
      ],
    },
    de: {
      name: "Herr Smee",
      version: "Effizienter Kapitän",
      text: [
        {
          title: "HERAUF MIT DEN LEUTEN",
          description:
            "Jedes Mal, wenn du eine Aktion ausspielst, die kein Lied ist, darfst du einen Piraten deiner Wahl bereit machen.",
        },
      ],
    },
    fr: {
      name: "Monsieur Mouche",
      version: "Capitaine efficace",
      text: [
        {
          title: "TOUS LES HOMMES SUR LE PONT",
          description:
            "Chaque fois que vous jouez une action qui n'est pas une chanson, vous pouvez choisir un personnage Pirate et le redresser.",
        },
      ],
    },
    it: {
      name: "Spugna",
      version: "Capitano Efficiente",
      text: [
        {
          title: "RADUNA LA CIURMA",
          description:
            "Ogni volta che giochi un'azione che non è una canzone, puoi preparare un personaggio Pirata a tua scelta.",
        },
      ],
    },
  },
  inkType: ["emerald", "steel"],
  franchise: "Peter Pan",
  set: "007",
  cardNumber: 107,
  rarity: "uncommon",
  cost: 3,
  strength: 3,
  willpower: 3,
  lore: 1,
  inkable: false,
  externalIds: {
    lorcast: "crd_0cea7c1e74014adeb7fc3a59ddce500f",
    tcgPlayer: 618140,
  },
  text: [
    {
      title: "PIPE UP THE CREW",
      description:
        "Whenever you play an action that isn't a song, you may ready chosen Pirate character.",
    },
  ],
  classifications: ["Dreamborn", "Villain", "Pirate", "Captain"],
  abilities: [
    {
      effect: {
        chooser: "CONTROLLER",
        effect: {
          target: {
            selector: "chosen",
            count: 1,
            owner: "any",
            zones: ["play"],
            cardTypes: ["character"],
          },
          type: "ready",
        },
        type: "optional",
      },
      id: "1co-1",
      name: "PIPE UP THE CREW",
      text: "PIPE UP THE CREW Whenever you play an action that isn't a song, you may ready chosen Pirate character.",
      trigger: {
        event: "play",
        on: {
          cardType: "action",
          controller: "you",
        },
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
};
