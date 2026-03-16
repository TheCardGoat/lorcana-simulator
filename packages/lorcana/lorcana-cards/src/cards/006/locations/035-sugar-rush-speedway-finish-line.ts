import type { LocationCard } from "@tcg/lorcana-types";

export const sugarRushSpeedwayFinishLine: LocationCard = {
  id: "kh2",
  canonicalId: "ci_jO7",
  reprints: ["set6-035"],
  cardType: "location",
  name: "Sugar Rush Speedway",
  version: "Finish Line",
  i18n: {
    en: {
      name: "Sugar Rush Speedway",
      version: "Finish Line",
      text: [
        {
          title: "BRING IT HOME, LITTLE ONE!",
          description:
            "When you move a character here from another location, you may banish this location to gain 3 lore and draw 3 cards.",
        },
      ],
    },
    de: {
      name: "Sugar Rush Rennstrecke",
      version: "Ziellinie",
      text: [
        {
          title: "FAHR'S NACH HAUSE, KLEINE!",
          description:
            "Wenn einer deiner Charaktere von einem Ort an diesen Ort bewegt wird, kannst du diesen Ort verbannen, um 3 Legenden zu sammeln und 3 Karten zu ziehen.",
        },
      ],
    },
    fr: {
      name: "Piste de Sugar Rush",
      version: "Ligne d’arrivée",
      text: [
        {
          title: "ELLE EST POUR TOI, PETITE!",
          description:
            "Lorsque vous déplacez un personnage d'un lieu sur celui-ci, vous pouvez bannir ce lieu-ci pour gagner 3 éclats de Lore et piocher 3 cartes.",
        },
      ],
    },
    it: {
      name: "Pista di Sugar Rush",
      version: "Traguardo",
      text: [
        {
          title: "LI HAI FATTI FUORI TUTTI!",
          description:
            "Quando sposti un personaggio in questo luogo da un altro luogo, puoi esiliare questo luogo per ottenere 3 leggenda e pescare 3 carte.",
        },
      ],
    },
  },
  inkType: ["amber"],
  franchise: "Wreck It Ralph",
  set: "006",
  cardNumber: 35,
  rarity: "common",
  cost: 2,
  willpower: 7,
  moveCost: 6,
  lore: 0,
  inkable: false,
  externalIds: {
    lorcast: "crd_60630688715e45079236d447087a9a83",
    tcgPlayer: 592001,
  },
  text: [
    {
      title: "BRING IT HOME, LITTLE ONE!",
      description:
        "When you move a character here from another location, you may banish this location to gain 3 lore and draw 3 cards.",
    },
  ],
  abilities: [
    {
      id: "cxj-1",
      name: "BRING IT HOME, LITTLE ONE!",
      trigger: {
        event: "move",
        on: "CHARACTERS_HERE",
        restrictions: [
          {
            type: "from-location",
          },
        ],
        timing: "when",
      },
      effect: {
        chooser: "CONTROLLER",
        effect: {
          steps: [
            {
              target: {
                selector: "self",
                count: 1,
                owner: "you",
                zones: ["play"],
                cardTypes: ["location"],
              },
              type: "banish",
            },
            {
              amount: 3,
              type: "gain-lore",
            },
            {
              amount: 3,
              target: "CONTROLLER",
              type: "draw",
            },
          ],
          type: "sequence",
        },
        type: "optional",
      },
      text: "BRING IT HOME, LITTLE ONE! When you move a character here from another location, you may banish this location to gain 3 lore and draw 3 cards.",
      type: "triggered",
    },
  ],
};
