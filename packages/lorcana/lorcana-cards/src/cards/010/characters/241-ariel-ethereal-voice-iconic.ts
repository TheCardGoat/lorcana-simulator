import type { CharacterCard } from "@tcg/lorcana-types";
import { arielEtherealVoiceIconicI18n } from "./241-ariel-ethereal-voice-iconic.i18n";

export const arielEtherealVoiceIconic: CharacterCard = {
  id: "P7j",
  canonicalId: "ci_izM",
  reprints: ["set10-017"],
  cardType: "character",
  name: "Ariel",
  version: "Ethereal Voice",
  inkType: ["amber"],
  franchise: "Little Mermaid",
  set: "010",
  cardNumber: 241,
  rarity: "common",
  specialRarity: "iconic",
  cost: 4,
  strength: 3,
  willpower: 4,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_5b53a4c5b3854ab0ba71dd388aaa0d9f",
    tcgPlayer: 657885,
  },
  text: [
    {
      title: "Boost 1 {I}",
    },
    {
      title: "COMMAND PERFORMANCE",
      description:
        "Once during your turn, whenever you play a song, if there's a card under this character, you may draw a card.",
    },
  ],
  classifications: ["Storyborn", "Hero", "Princess", "Whisper"],
  abilities: [
    {
      id: "1l1-1",
      keyword: "Boost",
      type: "keyword",
      value: 1,
      text: "Boost 1 {I}",
    },
    {
      id: "1l1-2",
      condition: {
        type: "has-card-under",
      },
      effect: {
        chooser: "CONTROLLER",
        effect: {
          amount: 1,
          target: "CONTROLLER",
          type: "draw",
        },
        type: "optional",
      },
      name: "COMMAND PERFORMANCE Once",
      trigger: {
        event: "play",
        on: {
          cardType: "action",
          controller: "you",
        },
        restrictions: [
          {
            type: "during-turn",
            whose: "your",
          },
          {
            type: "once-per-turn",
          },
        ],
        timing: "whenever",
      },
      type: "triggered",
      text: "COMMAND PERFORMANCE Once during your turn, whenever you play a song, if there's a card under this character, you may draw a card.",
    },
  ],
  i18n: arielEtherealVoiceIconicI18n,
};
