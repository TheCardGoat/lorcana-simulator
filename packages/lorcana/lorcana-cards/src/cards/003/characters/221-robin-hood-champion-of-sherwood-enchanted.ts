import type { CharacterCard } from "@tcg/lorcana-types";

export const robinHoodChampionOfSherwoodEnchanted: CharacterCard = {
  id: "FBp",
  canonicalId: "ci_HOf",
  reprints: ["set3-190", "set9-177"],
  cardType: "character",
  name: "Robin Hood",
  version: "Champion of Sherwood",
  i18n: {
    en: {
      name: "Robin Hood",
      version: "Champion of Sherwood",
      text: [
        {
          title: "Shift 3",
        },
        {
          title: "SKILLED COMBATANT",
          description:
            "During your turn, whenever this character banishes another character in a challenge, gain 2 lore.",
        },
        {
          title: "THE GOOD OF OTHERS",
          description: "When this character is banished in a challenge, you may draw a card.",
        },
      ],
    },
    de: {
      name: "Robin Hood",
      version: "Champion von Sherwood",
      text: "Gestaltwandel 3 ERFAHRENER KÄMPFER Jedes Mal, wenn dieser Charakter in deinem Zug durch eine Herausforderung einen anderen Charakter verbannt, sammelst du 2 Legenden. DAS WOHL DER ANDEREN Wenn dieser Charakter durch eine Herausforderung verbannt wird, darfst du 1 Karte ziehen.",
    },
    fr: {
      name: "Robin des Bois",
      version: "Champion de Sherwood",
      text: "Alter 3 COMBATTANT ÉMÉRITE Chaque fois que ce personnage en bannit un autre via un défi durant votre tour, gagnez 2 éclats de Lore. POUR LE BIEN D'AUTRUI Si ce personnage est banni via un défi, vous pouvez piocher une carte.",
    },
    it: {
      name: "Robin Hood",
      version: "Campione di Sherwood",
      text: "Trasformazione 3 COMBATTENTE ESPERTO Durante il tuo turno, ogni volta che questo personaggio esilia un altro personaggio in una sfida, ottieni 2 leggenda. PER IL BENE DEGLI ALTRI Quando questo personaggio viene esiliato in una sfida, puoi pescare una carta.",
    },
  },
  inkType: ["steel"],
  franchise: "Robin Hood",
  set: "003",
  cardNumber: 221,
  rarity: "enchanted",
  specialRarity: "enchanted",
  cost: 5,
  strength: 3,
  willpower: 6,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_2bf47bf7bc7f46afa6d39e40f0dc86e7",
    tcgPlayer: 650110,
  },
  text: [
    {
      title: "Shift 3",
    },
    {
      title: "SKILLED COMBATANT",
      description:
        "During your turn, whenever this character banishes another character in a challenge, gain 2 lore.",
    },
    {
      title: "THE GOOD OF OTHERS",
      description: "When this character is banished in a challenge, you may draw a card.",
    },
  ],
  classifications: ["Floodborn", "Hero"],
  abilities: [
    {
      cost: {
        ink: 3,
      },
      id: "1oq-1",
      keyword: "Shift",
      text: "Shift 3 {I}",
      type: "keyword",
    },
    {
      effect: {
        amount: 2,
        type: "gain-lore",
      },
      id: "1oq-2",
      name: "SKILLED COMBATANT",
      text: "SKILLED COMBATANT During your turn, whenever this character banishes another character in a challenge, gain 2 lore.",
      trigger: {
        event: "banish",
        on: "OPPONENT_CHARACTERS",
        timing: "whenever",
      },
      type: "triggered",
    },
    {
      effect: {
        chooser: "CONTROLLER",
        effect: {
          amount: 1,
          target: "CONTROLLER",
          type: "draw",
        },
        type: "optional",
      },
      id: "1oq-3",
      name: "THE GOOD OF OTHERS",
      text: "THE GOOD OF OTHERS When this character is banished in a challenge, you may draw a card.",
      trigger: {
        event: "banish",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
