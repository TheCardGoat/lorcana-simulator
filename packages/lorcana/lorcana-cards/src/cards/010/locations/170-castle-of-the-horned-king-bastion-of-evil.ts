import type { LocationCard } from "@tcg/lorcana-types";

export const castleOfTheHornedKingBastionOfEvil: LocationCard = {
  id: "ilT",
  canonicalId: "ci_ilT",
  reprints: ["set10-170"],
  cardType: "location",
  name: "Castle of the Horned King",
  version: "Bastion of Evil",
  i18n: {
    en: {
      name: "Castle of the Horned King",
      version: "Bastion of Evil",
      text: [
        {
          title: "INTO THE GLOOM",
          description:
            "Once during your turn, whenever a character quests while here, you may ready chosen item.",
        },
      ],
    },
    de: {
      name: "Das Schloss des gehörnten Königs",
      version: "Bastion des Bösen",
      text: [
        {
          title: "IN DIE FINSTERNIS",
          description:
            "Einmal während deines Zuges, wenn einer deiner Charaktere an diesem Ort erkundet, darfst du einen Gegenstand deiner Wahl bereit machen.",
        },
      ],
    },
    fr: {
      name: "Le Château du Seigneur des Ténèbres",
      version: "Bastion du mal",
      text: [
        {
          title: "DANS LA PÉNOMBRE",
          description:
            "Une fois durant votre tour, lorsqu'un personnage sur ce lieu est envoyé à l'aventure, vous pouvez choisir un objet et le redresser.",
        },
      ],
    },
    it: {
      name: "Castello di Re Cornelius",
      version: "Roccaforte del Male",
      text: [
        {
          title: "NELLE TENEBRE",
          description:
            "Una volta durante il tuo turno, ogni volta che un personaggio va all'avventura mentre si trova in questo luogo, puoi preparare un oggetto a tua scelta.",
        },
      ],
    },
  },
  inkType: ["sapphire"],
  franchise: "Black Cauldron",
  set: "010",
  cardNumber: 170,
  rarity: "rare",
  cost: 1,
  willpower: 5,
  moveCost: 1,
  lore: 0,
  inkable: true,
  externalIds: {
    lorcast: "crd_da44468c05d647ad965adcaf8f568c8c",
    tcgPlayer: 659603,
  },
  text: [
    {
      title: "INTO THE GLOOM",
      description:
        "Once during your turn, whenever a character quests while here, you may ready chosen item.",
    },
  ],
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
          type: "ready",
        },
        type: "optional",
      },
      id: "lzh-1",
      name: "INTO THE GLOOM Once",
      text: "INTO THE GLOOM Once during your turn, whenever a character quests while here, you may ready chosen item.",
      trigger: {
        event: "quest",
        on: "CHARACTER_HERE",
        restrictions: [
          {
            type: "during-turn",
            whose: "your",
          },
          {
            type: "first-time-each-turn",
          },
        ],
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
};
