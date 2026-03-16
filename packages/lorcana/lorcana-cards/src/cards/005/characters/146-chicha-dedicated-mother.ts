import type { CharacterCard } from "@tcg/lorcana-types";

export const chichaDedicatedMother: CharacterCard = {
  id: "RHS",
  canonicalId: "ci_RHS",
  reprints: ["set5-146"],
  cardType: "character",
  name: "Chicha",
  version: "Dedicated Mother",
  i18n: {
    en: {
      name: "Chicha",
      version: "Dedicated Mother",
      text: [
        {
          title: "Support",
        },
        {
          title: "ONE ON THE WAY",
          description:
            "During your turn, when you put a card into your inkwell, if it's the second card you've put into your inkwell this turn, you may draw a card.",
        },
      ],
    },
    de: {
      name: "Chicha",
      version: "Hingebungsvolle Mutter",
      text: "Unterstützen (Jedes Mal, wenn dieser Charakter erkundet, darfst du seine in diesem Zug zur eines anderen Charakters deiner Wahl addieren.) EINS UNTERWEGS Jedes Mal, wenn du in deinem Zug 1 Karte in deinen Tintenvorrat legst, falls es die zweite Karte ist, die du in diesem Zug in deinen Tintenvorrat gelegt hast, darfst du 1 Karte ziehen.",
    },
    fr: {
      name: "Chicha",
      version: "Maman dévouée",
      text: "Soutien LE BÉBÉ EST EN ROUTE Durant votre tour, lorsque vous placez une carte dans votre réserve d'encre, si c'est la deuxième ce tour-ci, vous pouvez piocher une carte.",
    },
    it: {
      name: "Chicha",
      version: "Madre Zelante",
      text: "Aiutante UN ALTRO IN ARRIVO Durante il tuo turno, quando aggiungi una carta al tuo calamaio, se è la seconda carta che hai aggiunto al calamaio in questo turno, puoi pescare una carta.",
    },
  },
  inkType: ["sapphire"],
  franchise: "Emperors New Groove",
  set: "005",
  cardNumber: 146,
  rarity: "rare",
  cost: 2,
  strength: 2,
  willpower: 1,
  lore: 1,
  inkable: false,
  externalIds: {
    lorcast: "crd_775c901d8b4d4fd3884750a11cb7b1be",
    tcgPlayer: 561998,
  },
  text: [
    {
      title: "Support",
    },
    {
      title: "ONE ON THE WAY",
      description:
        "During your turn, when you put a card into your inkwell, if it's the second card you've put into your inkwell this turn, you may draw a card.",
    },
  ],
  classifications: ["Storyborn", "Ally"],
  abilities: [
    {
      id: "q5f-1",
      keyword: "Support",
      type: "keyword",
      text: "Support",
    },
    {
      id: "q5f-2",
      effect: {
        condition: {
          expression: "it's the second card you've put into your inkwell this turn",
          type: "if",
        },
        then: {
          amount: 1,
          target: "CONTROLLER",
          type: "draw",
        },
        type: "conditional",
      },
      name: "ONE ON THE WAY",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
      text: "ONE ON THE WAY During your turn, when you put a card into your inkwell, if it's the second card you've put into your inkwell this turn, you may draw a card.",
    },
  ],
};
