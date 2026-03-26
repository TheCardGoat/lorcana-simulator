import type { CharacterCard } from "@tcg/lorcana-types";
import { elsaIceMakerEpicI18n } from "./224-elsa-ice-maker-epic.i18n";
import { shift } from "../../../helpers/abilities/shift";

export const elsaIceMakerEpic: CharacterCard = {
  id: "2hI",
  canonicalId: "ci_6Se",
  reprints: ["set7-069"],
  cardType: "character",
  name: "Elsa",
  version: "Ice Maker",
  inkType: ["amethyst", "sapphire"],
  franchise: "Frozen",
  set: "007",
  cardNumber: 224,
  rarity: "common",
  specialRarity: "epic",
  cost: 7,
  strength: 5,
  willpower: 5,
  lore: 2,
  inkable: false,
  externalIds: {
    lorcast: "crd_01c4835a62df4960bb973aeff81f2bb2",
    tcgPlayer: 618356,
  },
  text: [
    {
      title: "Shift 4",
      description: "(You may pay 4 to play this on top of one of your characters named Elsa.)",
    },
    {
      title: "WINTER WALL",
      description:
        "Whenever this character quests, you may exert chosen character. If you do and you have a character named Anna in play, the chosen character can't ready at the start of their next turn.",
    },
  ],
  classifications: ["Floodborn", "Hero", "Queen", "Sorcerer"],
  abilities: [
    shift(4),
    {
      effect: {
        type: "sequence",
        steps: [
          {
            chooser: "CONTROLLER",
            effect: {
              target: {
                selector: "chosen",
                count: 1,
                owner: "any",
                zones: ["play"],
                cardTypes: ["character"],
              },
              type: "exert",
            },
            type: "optional",
          },
          {
            condition: {
              type: "and",
              conditions: [
                {
                  type: "if-you-do",
                },
                {
                  type: "has-named-character",
                  name: "Anna",
                  controller: "you",
                },
              ],
            },
            then: {
              type: "restriction",
              restriction: "cant-ready",
              duration: "until-start-of-next-turn",
              target: {
                ref: "previous-target",
              },
            },
            type: "conditional",
          },
        ],
      },
      id: "1v2-2",
      name: "WINTER WALL",
      text: "WINTER WALL Whenever this character quests, you may exert chosen character. If you do and you have a character named Anna in play, the chosen character can’t ready at the start of their next turn.",
      trigger: {
        event: "quest",
        on: "SELF",
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
  i18n: elsaIceMakerEpicI18n,
};
