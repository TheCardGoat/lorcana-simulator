import type { ItemCard } from "@tcg/lorcana-types";

export const theSwordOfShanyu: ItemCard = {
  id: "8S0",
  canonicalId: "ci_r32",
  reprints: ["set8-152"],
  cardType: "item",
  name: "The Sword of Shan-Yu",
  i18n: {
    en: {
      name: "The Sword of Shan-Yu",
      text: [
        {
          title: "WORTHY WEAPON",
          description:
            "{E}, {E} one of your characters — Ready chosen character. They can't quest for the rest of this turn.",
        },
      ],
    },
    de: {
      name: "Das Schwert des Shan-Yu",
      text: [
        {
          title: "WÜRDIGE WAFFE,",
          description:
            "einen deiner Charaktere — Mache einen Charakter deiner Wahl bereit. Er kann in diesem Zug nicht mehr erkunden.",
        },
      ],
    },
    fr: {
      name: "L’épée de Shan-Yu",
      text: [
        {
          title: "UNE ARME DIGNE DE CE NOM,",
          description:
            "l'un de vos personnages — Choisissez un personnage et redressez-le. Ce personnage ne peut pas être envoyé à l'aventure pour le reste de ce tour.",
        },
      ],
    },
    it: {
      name: "La Spada di Shan-Yu",
      text: [
        {
          title: "ARMA DEGNA,",
          description:
            "uno dei tuoi personaggi — Prepara un personaggio a tua scelta. Non può andare all'avventura per il resto di questo turno.",
        },
      ],
    },
  },
  inkType: ["ruby"],
  franchise: "Mulan",
  set: "008",
  cardNumber: 152,
  rarity: "rare",
  cost: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_8b81f6ba845442d095833d7c1bee3a6c",
    tcgPlayer: 631989,
  },
  text: [
    {
      title: "WORTHY WEAPON",
      description:
        "{E}, {E} one of your characters — Ready chosen character. They can't quest for the rest of this turn.",
    },
  ],
  abilities: [
    {
      cost: {
        exert: true,
        exertCharacters: 1,
      },
      effect: {
        type: "sequence",
        steps: [
          {
            type: "ready",
            target: "CHOSEN_CHARACTER",
          },
          {
            type: "restriction",
            restriction: "cant-quest",
            duration: "this-turn",
            target: {
              ref: "previous-target",
            },
          },
        ],
      },
      id: "1wb-1",
      name: "WORTHY WEAPON",
      text: "WORTHY WEAPON {E}, {E} one of your characters — Ready chosen character. They can't quest for the rest of this turn.",
      type: "activated",
    },
  ],
};
