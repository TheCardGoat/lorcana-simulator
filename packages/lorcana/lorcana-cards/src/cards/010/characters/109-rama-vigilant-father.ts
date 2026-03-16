import type { CharacterCard } from "@tcg/lorcana-types";

export const ramaVigilantFather: CharacterCard = {
  id: "Y2X",
  canonicalId: "ci_Y2X",
  reprints: ["set10-109"],
  cardType: "character",
  name: "Rama",
  version: "Vigilant Father",
  i18n: {
    en: {
      name: "Rama",
      version: "Vigilant Father",
      text: [
        {
          title: "PROTECTION OF THE PACK",
          description:
            "Whenever you play another character with 5 {S} or more, you may ready this character. If you do, he can't quest for the rest of this turn.",
        },
      ],
    },
    de: {
      name: "Rama",
      version: "Wachsamer Vater",
      text: [
        {
          title: "SCHUTZ DES RUDELS",
          description:
            "Jedes Mal, wenn du einen anderen Charakter mit 5 oder mehr ausspielst, darfst du diesen Charakter bereit machen. Wenn du dies tust, kann er in diesem Zug nicht mehr erkunden.",
        },
      ],
    },
    fr: {
      name: "Rama",
      version: "Père vigilant",
      text: [
        {
          title: "LA PROTECTION DE NOTRE CLAN",
          description:
            "Chaque fois que vous jouez un autre personnage ayant 5 ou plus, vous pouvez redresser ce personnage-ci. Si vous le faites, ce personnage-ci ne peut pas être envoyé à l'aventure pour le reste de ce tour.",
        },
      ],
    },
    it: {
      name: "Rama",
      version: "Padre Vigile",
      text: [
        {
          title: "PROTEZIONE DEL BRANCO",
          description:
            "Ogni volta che giochi un altro personaggio con 5 o superiore, puoi preparare questo personaggio. Se lo fai, non può andare all'avventura per il resto di questo turno.",
        },
      ],
    },
  },
  inkType: ["ruby"],
  franchise: "Jungle Book",
  set: "010",
  cardNumber: 109,
  rarity: "common",
  cost: 6,
  strength: 6,
  willpower: 6,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_869c25119c0747c7a1de1cdbfff70eb0",
    tcgPlayer: 659600,
  },
  text: [
    {
      title: "PROTECTION OF THE PACK",
      description:
        "Whenever you play another character with 5 {S} or more, you may ready this character. If you do, he can't quest for the rest of this turn.",
    },
  ],
  classifications: ["Storyborn", "Ally"],
  abilities: [
    {
      effect: {
        steps: [
          {
            chooser: "CONTROLLER",
            effect: {
              type: "ready",
              target: {
                selector: "self",
                count: 1,
                owner: "any",
                zones: ["play"],
                cardTypes: ["character"],
              },
            },
            type: "optional",
          },
          {
            duration: "this-turn",
            restriction: "cant-quest",
            target: "SELF",
            type: "restriction",
          },
        ],
        type: "sequence",
      },
      id: "1d1-1",
      name: "PROTECTION OF THE PACK",
      text: "PROTECTION OF THE PACK Whenever you play another character with 5 {S} or more, you may ready this character. If you do, he can't quest for the rest of this turn.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
