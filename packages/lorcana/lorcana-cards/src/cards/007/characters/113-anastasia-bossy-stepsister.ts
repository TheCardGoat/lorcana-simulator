import type { CharacterCard } from "@tcg/lorcana-types";

export const anastasiaBossyStepsister: CharacterCard = {
  id: "zB6",
  canonicalId: "ci_zB6",
  reprints: ["set7-113"],
  cardType: "character",
  name: "Anastasia",
  version: "Bossy Stepsister",
  i18n: {
    en: {
      name: "Anastasia",
      version: "Bossy Stepsister",
      text: [
        {
          title: "OH, I HATE THIS!",
          description:
            "Whenever this character is challenged, the challenging player chooses and discards a card.",
        },
      ],
    },
    de: {
      name: "Anastasia",
      version: "Rechthaberische Stiefschwester",
      text: [
        {
          title: "ICH HASSE ES!",
          description:
            "Jedes Mal, wenn dieser Charakter herausgefordert wird, wählt die herausfordernde Person 1 Karte aus ihrer Hand und wirft sie ab.",
        },
      ],
    },
    fr: {
      name: "Anastasie",
      version: "Belle-soeur autoritaire",
      text: [
        {
          title: "OH, JE DÉTESTE ÇA!",
          description:
            "Chaque fois que ce personnage est défié, le joueur qui a lancé le défi choisit et défausse une de ses cartes.",
        },
      ],
    },
    it: {
      name: "Anastasia",
      version: "Sorellastra Prepotente",
      text: [
        {
          title: "CHE PORCHERIA!",
          description:
            "Ogni volta che questo personaggio viene sfidato, il giocatore sfidante sceglie e scarta una carta.",
        },
      ],
    },
  },
  inkType: ["emerald"],
  franchise: "Cinderella",
  set: "007",
  cardNumber: 113,
  rarity: "uncommon",
  cost: 3,
  strength: 3,
  willpower: 1,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_17faea698cdc496d81f840310128074b",
    tcgPlayer: 619467,
  },
  text: [
    {
      title: "OH, I HATE THIS!",
      description:
        "Whenever this character is challenged, the challenging player chooses and discards a card.",
    },
  ],
  classifications: ["Storyborn", "Ally"],
  abilities: [
    {
      effect: {
        amount: 1,
        chosen: true,
        target: "CONTROLLER",
        type: "discard",
      },
      id: "6rw-1",
      text: "OH, I HATE THIS! Whenever this character is challenged, the challenging player chooses and discards a card.",
      type: "action",
    },
  ],
};
