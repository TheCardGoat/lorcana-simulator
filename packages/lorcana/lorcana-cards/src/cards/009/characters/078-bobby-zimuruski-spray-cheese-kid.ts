import type { CharacterCard } from "@tcg/lorcana-types";

export const bobbyZimuruskiSprayCheeseKid: CharacterCard = {
  id: "3V0",
  canonicalId: "ci_3V0",
  reprints: ["set9-078"],
  cardType: "character",
  name: "Bobby Zimuruski",
  version: "Spray Cheese Kid",
  i18n: {
    en: {
      name: "Bobby Zimuruski",
      version: "Spray Cheese Kid",
      text: [
        {
          title: "SO CHEESY",
          description:
            "When you play this character, you may draw a card, then choose and discard a card.",
        },
      ],
    },
    de: {
      name: "Robert Zimuruski",
      version: "Sprühkäse-Kind",
      text: [
        {
          title: "SO KÄSIG",
          description:
            "Wenn du diesen Charakter ausspielst, darfst du 1 Karte ziehen. Wähle danach 1 Karte aus deiner Hand und wirf sie ab.",
        },
      ],
    },
    fr: {
      name: "Bobby Zimmeruski",
      version: "Fan de fromage en spray",
      text: [
        {
          title: "ULTRA COULANT",
          description:
            "Lorsque vous jouez ce personnage, vous pouvez piocher une carte, puis défausser une carte.",
        },
      ],
    },
    it: {
      name: "Bobby Zimuruski",
      version: "Ragazzo del Gorgonzola Spray",
      text: [
        {
          title: "GORGONZOLESCO",
          description:
            "Quando giochi questo personaggio, puoi pescare una carta, poi scegli e scarta una carta.",
        },
      ],
    },
  },
  inkType: ["emerald"],
  franchise: "Goofy Movie",
  set: "009",
  cardNumber: 78,
  rarity: "uncommon",
  cost: 1,
  strength: 1,
  willpower: 2,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_912d9241d6084800bd0168df05d52bc3",
    tcgPlayer: 650018,
  },
  text: [
    {
      title: "SO CHEESY",
      description:
        "When you play this character, you may draw a card, then choose and discard a card.",
    },
  ],
  classifications: ["Storyborn", "Ally"],
  abilities: [
    {
      effect: {
        chooser: "CONTROLLER",
        effect: {
          amount: 1,
          chosen: true,
          target: "CONTROLLER",
          type: "discard",
        },
        type: "optional",
      },
      id: "1kg-1",
      name: "SO CHEESY",
      text: "SO CHEESY When you play this character, you may draw a card, then choose and discard a card.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
