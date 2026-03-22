import type { CharacterCard } from "@tcg/lorcana-types";
import { annaMagicalMissionI18n } from "./072-anna-magical-mission.i18n";

export const annaMagicalMission: CharacterCard = {
  id: "7E5",
  canonicalId: "ci_7E5",
  reprints: ["set8-072"],
  cardType: "character",
  name: "Anna",
  version: "Magical Mission",
  inkType: ["amethyst", "sapphire"],
  franchise: "Frozen",
  set: "008",
  cardNumber: 72,
  rarity: "rare",
  cost: 6,
  strength: 3,
  willpower: 6,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_ae35ed50c6954dab9925888b61a657f2",
    tcgPlayer: 631399,
  },
  text: [
    {
      title: "Shift 4",
    },
    {
      title: "Support",
    },
    {
      title: "COORDINATED PLAN",
      description:
        "Whenever this character quests, if you have a character named Elsa in play, you may draw a card.",
    },
  ],
  classifications: ["Floodborn", "Hero", "Queen", "Sorcerer"],
  abilities: [
    {
      id: "1w2-1",
      cost: {
        ink: 4,
      },
      keyword: "Shift",
      type: "keyword",
      text: "Shift 4",
    },
    {
      id: "1w2-2",
      keyword: "Support",
      type: "keyword",
      text: "Support",
    },
    {
      id: "1w2-3",
      effect: {
        condition: {
          type: "has-named-character",
          name: "Elsa",
          controller: "you",
        },
        then: {
          chooser: "CONTROLLER",
          effect: {
            amount: 1,
            target: "CONTROLLER",
            type: "draw",
          },
          type: "optional",
        },
        type: "conditional",
      },
      name: "COORDINATED PLAN",
      trigger: {
        event: "quest",
        on: "SELF",
        timing: "whenever",
      },
      type: "triggered",
      text: "COORDINATED PLAN Whenever this character quests, if you have a character named Elsa in play, you may draw a card.",
    },
  ],
  i18n: annaMagicalMissionI18n,
};
