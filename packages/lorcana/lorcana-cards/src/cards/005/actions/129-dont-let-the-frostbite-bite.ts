import type { ActionCard } from "@tcg/lorcana-types";

export const dontLetTheFrostbiteBite: ActionCard = {
  id: "2Hu",
  canonicalId: "ci_2Hu",
  reprints: ["set5-129"],
  cardType: "action",
  name: "Don't Let the Frostbite Bite",
  i18n: {
    en: {
      name: "Don't Let the Frostbite Bite",
      text: "Ready all your characters. They can't quest for the rest of this turn.",
    },
    de: {
      name: "Ich geb' gut auf dich Acht",
      text: "Mache alle deine Charaktere bereit. Sie können in diesem Zug nicht mehr erkunden.",
    },
    fr: {
      name: "Endors-toi sans peine",
      text: "Redressez tous vos personnages. Ils ne peuvent pas être envoyés à l'aventure pour le reste de ce tour.",
    },
    it: {
      name: "Tu Non Deludermi Mai",
      text: "(Un personaggio con costo 7 o superiore può per cantare questa canzone gratis.) Prepara tutti i tuoi personaggi. Non possono andare all'avventura per il resto di questo turno.",
    },
  },
  inkType: ["ruby"],
  franchise: "Frozen",
  set: "005",
  cardNumber: 129,
  rarity: "rare",
  cost: 7,
  inkable: true,
  externalIds: {
    lorcast: "crd_0f1a48118a4d4952864c66eec69808cf",
    tcgPlayer: 560524,
  },
  text: "Ready all your characters. They can't quest for the rest of this turn.",
  actionSubtype: "song",
  abilities: [
    {
      id: "cu3-1",
      text: "Ready all your characters. They can't quest for the rest of this turn.",
      effect: {
        steps: [
          {
            target: {
              cardTypes: ["character"],
              count: "all",
              owner: "you",
              selector: "all",
              zones: ["play"],
            },
            type: "ready",
          },
          {
            duration: "this-turn",
            restriction: "cant-quest",
            target: {
              cardTypes: ["character"],
              count: "all",
              owner: "you",
              selector: "all",
              zones: ["play"],
            },
            type: "restriction",
          },
        ],
        type: "sequence",
      },
      type: "action",
    },
  ],
};
