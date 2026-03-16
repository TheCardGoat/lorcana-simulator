import type { CharacterCard } from "@tcg/lorcana-types";

export const jasmineDesertWarrior: CharacterCard = {
  id: "iKc",
  canonicalId: "ci_C4u",
  reprints: ["set4-078"],
  cardType: "character",
  name: "Jasmine",
  version: "Desert Warrior",
  i18n: {
    en: {
      name: "Jasmine",
      version: "Desert Warrior",
      text: [
        {
          title: "CUNNING MANEUVER",
          description:
            "When you play this character and whenever she's challenged, each opponent chooses and discards a card.",
        },
      ],
    },
    de: {
      name: "Jasmin",
      version: "Wüstenkriegerin",
      text: [
        {
          title: "RAFFINIERTES MANÖVER",
          description:
            "Wenn du diesen Charakter ausspielst und jedes Mal, wenn er herausgefordert wird, wählen alle gegnerischen Mitspielenden je 1 Karte aus ihrer Hand und werfen sie ab.",
        },
      ],
    },
    fr: {
      name: "Jasmine",
      version: "Combattante du désert",
      text: [
        {
          title: "MANŒUVRE ASTUCIEUSE",
          description:
            "Lorsque vous jouez ce personnage et à chaque fois qu'il est défié, chaque adversaire choisit une carte et la défausse.",
        },
      ],
    },
    it: {
      name: "Jasmine",
      version: "Guerriera del Deserto",
      text: [
        {
          title: "MANOVRA ASTUTA",
          description:
            "Quando giochi questo personaggio e ogni volta che viene sfidato, ogni avversario sceglie e scarta una carta.",
        },
      ],
    },
  },
  inkType: ["emerald"],
  franchise: "Aladdin",
  set: "004",
  cardNumber: 78,
  rarity: "rare",
  cost: 5,
  strength: 3,
  willpower: 3,
  lore: 2,
  inkable: false,
  externalIds: {
    lorcast: "crd_54e413e671dc4fa3872b3481db960d47",
    tcgPlayer: 551944,
  },
  text: [
    {
      title: "CUNNING MANEUVER",
      description:
        "When you play this character and whenever she's challenged, each opponent chooses and discards a card.",
    },
  ],
  classifications: ["Dreamborn", "Hero", "Princess"],
  abilities: [
    {
      effect: {
        amount: 1,
        chosen: true,
        target: "EACH_OPPONENT",
        type: "discard",
      },
      id: "160-1",
      name: "CUNNING MANEUVER When you play this character and",
      text: "CUNNING MANEUVER When you play this character and whenever she's challenged, each opponent chooses and discards a card.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
