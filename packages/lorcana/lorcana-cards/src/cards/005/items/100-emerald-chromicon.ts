import type { ItemCard } from "@tcg/lorcana-types";

export const emeraldChromicon: ItemCard = {
  id: "TUy",
  canonicalId: "ci_TUy",
  reprints: ["set5-100"],
  cardType: "item",
  name: "Emerald Chromicon",
  i18n: {
    en: {
      name: "Emerald Chromicon",
      text: [
        {
          title: "EMERALD LIGHT",
          description:
            "During opponents' turns, whenever one of your characters is banished, you may return chosen character to their player's hand.",
        },
      ],
    },
    de: {
      name: "Smaragd Chromikon",
      text: [
        {
          title: "SMARAGDFARBENES LICHT",
          description:
            "Jedes Mal, wenn einer deiner Charaktere im Zug einer gegnerischen Person verbannt wird, darfst du einen Charakter deiner Wahl zurück auf die zugehörige Hand schicken.",
        },
      ],
    },
    fr: {
      name: "Chromicône d'Émeraude",
      text: [
        {
          title: "LUEUR D'ÉMERAUDE",
          description:
            "Durant le tour de vos adversaires, chaque fois que l'un de vos personnages est banni, vous pouvez choisir un personnage et le renvoyer dans la main de son propriétaire.",
        },
      ],
    },
    it: {
      name: "Cromicon di Smeraldo",
      text: [
        {
          title: "LUCE DI SMERALDO",
          description:
            "Durante il turno degli avversari, ogni volta che uno dei tuoi personaggi viene esiliato, puoi far riprendere in mano al suo giocatore un personaggio a tua scelta.",
        },
      ],
    },
  },
  inkType: ["emerald"],
  franchise: "Lorcana",
  set: "005",
  cardNumber: 100,
  rarity: "uncommon",
  cost: 3,
  inkable: false,
  externalIds: {
    lorcast: "crd_693273eeac4846a39a3539fc6ded617d",
    tcgPlayer: 560098,
  },
  text: [
    {
      title: "EMERALD LIGHT",
      description:
        "During opponents' turns, whenever one of your characters is banished, you may return chosen character to their player's hand.",
    },
  ],
  abilities: [
    {
      id: "1sl-1",
      name: "EMERALD LIGHT",
      type: "triggered",
      trigger: {
        event: "banish",
        on: "YOUR_CHARACTERS",
        restrictions: [
          {
            type: "during-turn",
            whose: "opponent",
          },
        ],
        timing: "whenever",
      },
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
          type: "return-to-hand",
        },
        type: "optional",
      },
      text: "EMERALD LIGHT During opponents' turns, whenever one of your characters is banished, you may return chosen character to their player's hand.",
    },
  ],
};
