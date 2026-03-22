import type { CharacterCard } from "@tcg/lorcana-types";
import { tiggerBouncingAllTheWayEpicI18n } from "./208-tigger-bouncing-all-the-way-epic.i18n";

export const tiggerBouncingAllTheWayEpic: CharacterCard = {
  id: "2XS",
  canonicalId: "ci_F3L",
  reprints: ["set11-037"],
  cardType: "character",
  name: "Tigger",
  version: "Bouncing All the Way",
  inkType: ["amethyst"],
  franchise: "Winnie the Pooh",
  set: "011",
  cardNumber: 208,
  rarity: "common",
  specialRarity: "epic",
  cost: 4,
  strength: 4,
  willpower: 3,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_899fe35731aa4f609bb72a19d7e831c8",
    tcgPlayer: 677144,
  },
  text: [
    {
      title: "SPLENDERIFFIC BOUNCE",
      description:
        "When you play this character, you may return chosen character, item, or location with cost 2 or less to their player's hand.",
    },
  ],
  classifications: ["Storyborn", "Tigger"],
  abilities: [
    {
      id: "3b3-1",
      effect: {
        chooser: "CONTROLLER",
        effect: {
          target: {
            cardTypes: ["character"],
            count: 1,
            owner: "any",
            selector: "chosen",
            zones: ["play"],
          },
          type: "return-to-hand",
        },
        type: "optional",
      },
      name: "SPLENDERIFFIC BOUNCE",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
      text: "SPLENDERIFFIC BOUNCE When you play this character, you may return chosen character, item, or location with cost 2 or less to their player's hand.",
    },
  ],
  i18n: tiggerBouncingAllTheWayEpicI18n,
};
