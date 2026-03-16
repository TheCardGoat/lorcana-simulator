import type { CharacterCard } from "@tcg/lorcana-types";

export const archimedesResourcefulOwl: CharacterCard = {
  id: "qnh",
  canonicalId: "ci_qnh",
  reprints: ["set8-113"],
  cardType: "character",
  name: "Archimedes",
  version: "Resourceful Owl",
  i18n: {
    en: {
      name: "Archimedes",
      version: "Resourceful Owl",
      text: [
        {
          title: "YOU DON'T NEED THAT",
          description: "When you play this character, you may banish chosen item.",
        },
        {
          title: "NOW, THAT'S NOT BAD",
          description:
            "During your turn, whenever an item is banished, you may draw a card, then choose and discard a card.",
        },
      ],
    },
    de: {
      name: "Archimedes",
      version: "Raffinierte Eule",
      text: [
        {
          title: "DAS BRAUCHST DU NICHT",
          description:
            "Wenn du diesen Charakter ausspielst, darfst du einen Gegenstand deiner Wahl verbannen.",
        },
        {
          title: "NUN, DAS IST NICHT ÜBEL",
          description:
            "Jedes Mal während deines Zuges, wenn ein Gegenstand verbannt wird, darfst du 1 Karte ziehen. Wähle danach 1 Karte aus deiner Hand und wirf sie ab.",
        },
      ],
    },
    fr: {
      name: "Archimède",
      version: "Hibou ingénieux",
      text: [
        {
          title: "TU N'AS PAS BESOIN DE ÇA",
          description:
            "Lorsque vous jouez ce personnage, vous pouvez choisir un objet et le bannir.",
        },
        {
          title: "HÉ, PAS MAL, ÇA",
          description:
            "Durant votre tour, chaque fois qu'un objet est banni, vous pouvez piocher une carte, puis défausser une carte.",
        },
      ],
    },
    it: {
      name: "Archimedes",
      version: "Resourceful Owl",
      text: [
        {
          title: "YOU DON'T NEED THAT",
          description: "When you play this character, you may banish chosen item.",
        },
        {
          title: "NOW, THAT'S NOT BAD",
          description:
            "During your turn, whenever an item is banished, you may draw a card, then choose and discard a card.",
        },
      ],
    },
  },
  inkType: ["emerald"],
  franchise: "Sword in the Stone",
  set: "008",
  cardNumber: 113,
  rarity: "rare",
  cost: 3,
  strength: 2,
  willpower: 2,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_bf2471b2597f495db6b088a5705d4502",
    tcgPlayer: 631423,
  },
  text: [
    {
      title: "YOU DON'T NEED THAT",
      description: "When you play this character, you may banish chosen item.",
    },
    {
      title: "NOW, THAT'S NOT BAD",
      description:
        "During your turn, whenever an item is banished, you may draw a card, then choose and discard a card.",
    },
  ],
  classifications: ["Storyborn", "Ally"],
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
            cardTypes: ["item"],
          },
          type: "banish",
        },
        type: "optional",
      },
      id: "3sv-1",
      name: "YOU DON'T NEED THAT",
      text: "YOU DON'T NEED THAT When you play this character, you may banish chosen item.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
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
      id: "3sv-2",
      text: "NOW, THAT'S NOT BAD During your turn, whenever an item is banished, you may draw a card, then choose and discard a card.",
      type: "action",
    },
  ],
};
