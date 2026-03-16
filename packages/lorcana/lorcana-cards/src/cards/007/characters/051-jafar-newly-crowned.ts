import type { CharacterCard } from "@tcg/lorcana-types";

export const jafarNewlyCrowned: CharacterCard = {
  id: "ilP",
  canonicalId: "ci_zaZ",
  reprints: ["set7-051"],
  cardType: "character",
  name: "Jafar",
  version: "Newly Crowned",
  i18n: {
    en: {
      name: "Jafar",
      version: "Newly Crowned",
      text: [
        {
          title: "THIS IS NOT DONE YET",
          description:
            "During an opponent's turn, whenever one of your Illusion characters is banished, you may return that card to your hand.",
        },
      ],
    },
    de: {
      name: "Dschafar",
      version: "Neu gekrönt",
      text: [
        {
          title: "MIT DIR BIN ICH NOCH NICHT FERTIG",
          description:
            "Jedes Mal, wenn eine deiner Illusionen im Zug einer gegnerischen Person verbannt wird, darfst du jene Karte zurück auf deine Hand nehmen.",
        },
      ],
    },
    fr: {
      name: "Jafar",
      version: "Tout juste couronné",
      text: [
        {
          title: "JE N'AI PAS DIT MON DERNIER MOT",
          description:
            "Durant le tour d'un adversaire, chaque fois que l'un de vos personnages Illusion est banni, vous pouvez le renvoyer dans votre main.",
        },
      ],
    },
    it: {
      name: "Jafar",
      version: "Appena Incoronato",
      text: [
        {
          title: "NON HAI ANCORA VINTO",
          description:
            "Durante il turno di un avversario, ogni volta che uno dei tuoi personaggi Illusione viene esiliato, puoi riprendere in mano quella carta.",
        },
      ],
    },
  },
  inkType: ["amethyst", "steel"],
  franchise: "Aladdin",
  set: "007",
  cardNumber: 51,
  rarity: "common",
  cost: 4,
  strength: 2,
  willpower: 4,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_1cda76d2cbe84ccda25bd2dc1b21844b",
    tcgPlayer: 619738,
  },
  text: [
    {
      title: "THIS IS NOT DONE YET",
      description:
        "During an opponent's turn, whenever one of your Illusion characters is banished, you may return that card to your hand.",
    },
  ],
  classifications: ["Dreamborn", "Villain", "Sorcerer"],
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
            cardTypes: ["card"],
          },
          type: "return-to-hand",
        },
        type: "optional",
      },
      id: "1i1-1",
      text: "THIS IS NOT DONE YET During an opponent's turn, whenever one of your Illusion characters is banished, you may return that card to your hand.",
      type: "action",
    },
  ],
};
