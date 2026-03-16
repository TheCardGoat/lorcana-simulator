import type { ItemCard } from "@tcg/lorcana-types";

export const goldCoin: ItemCard = {
  id: "5vQ",
  canonicalId: "ci_5vQ",
  reprints: ["set6-133"],
  cardType: "item",
  name: "Gold Coin",
  i18n: {
    en: {
      name: "Gold Coin",
      text: [
        {
          title: "GLITTERING ACCESS",
          description:
            "{E}, 1 {I}, Banish this item — Ready chosen character of yours. They can't quest for the rest of this turn.",
        },
      ],
    },
    de: {
      name: "Goldmünze",
      text: [
        {
          title: "GLITZERNDER EINSTIEG, 1,",
          description:
            "Verbanne diesen Gegenstand — Wähle einen deiner Charaktere und mache ihn bereit. Er kann in diesem Zug nicht mehr erkunden.",
        },
      ],
    },
    fr: {
      name: "Pièce d’or",
      text: [
        {
          title: "ACCÈS ÉTINCELANT,",
          description:
            "1, bannissez cet objet — Choisissez l'un de vos personnages et redressez-le. Ce personnage ne peut pas être envoyé à l'aventure pour le reste de ce tour.",
        },
      ],
    },
    it: {
      name: "Moneta d'Oro",
      text: [
        {
          title: "ACCESSO SCINTILLANTE, 1,",
          description:
            "esilia questo oggetto — Prepara un tuo personaggio a tua scelta. Non può andare all'avventura per il resto di questo turno.",
        },
      ],
    },
  },
  inkType: ["ruby"],
  franchise: "Wreck It Ralph",
  set: "006",
  cardNumber: 133,
  rarity: "common",
  cost: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_2543ac0748a945e3a4a68ef2f90e2feb",
    tcgPlayer: 591124,
  },
  text: [
    {
      title: "GLITTERING ACCESS",
      description:
        "{E}, 1 {I}, Banish this item — Ready chosen character of yours. They can't quest for the rest of this turn.",
    },
  ],
  abilities: [
    {
      cost: {
        exert: true,
        ink: 1,
        banishSelf: true,
      },
      effect: {
        type: "sequence",
        steps: [
          {
            type: "ready",
            target: "CHOSEN_CHARACTER_OF_YOURS",
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
      id: "1fl-1",
      name: "GLITTERING ACCESS",
      text: "GLITTERING ACCESS {E}, 1 {I}, Banish this item — Ready chosen character of yours. They can't quest for the rest of this turn.",
      type: "activated",
    },
  ],
};
