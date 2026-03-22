import type { CharacterCard } from "@tcg/lorcana-types";
import { hadesLookingForADealIconicI18n } from "./242-hades-looking-for-a-deal-iconic.i18n";

export const hadesLookingForADealIconic: CharacterCard = {
  id: "R01",
  canonicalId: "ci_yoK",
  reprints: ["set10-056"],
  cardType: "character",
  name: "Hades",
  version: "Looking for a Deal",
  inkType: ["amethyst"],
  franchise: "Hercules",
  set: "010",
  cardNumber: 242,
  rarity: "common",
  specialRarity: "iconic",
  cost: 5,
  strength: 3,
  willpower: 4,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_4656262d1cbc478aab92978dc7729663",
    tcgPlayer: 657889,
  },
  text: [
    {
      title: "WHAT D'YA SAY?",
      description:
        "When you play this character, you may choose an opposing character. If you do, draw 2 cards unless that character's player puts that card on the bottom of their deck.",
    },
  ],
  classifications: ["Storyborn", "Villain", "Deity"],
  abilities: [
    {
      effect: {
        type: "optional",
        chooser: "CONTROLLER",
        effect: {
          type: "sequence",
          steps: [
            {
              type: "modify-stat",
              stat: "strength",
              modifier: 0,
              duration: "this-turn",
              target: "CHOSEN_OPPOSING_CHARACTER",
            },
            {
              type: "or",
              chooser: "OPPONENT",
              optionLabels: ["put that character on the bottom of their deck", "you draw 2 cards"],
              options: [
                {
                  type: "put-on-bottom",
                  target: {
                    ref: "previous-target",
                  },
                },
                {
                  amount: 2,
                  target: "CONTROLLER",
                  type: "draw",
                },
              ],
            },
          ],
        },
      },
      id: "qkg-1",
      name: "WHAT D'YA SAY?",
      text: "WHAT D'YA SAY? When you play this character, you may choose an opposing character. If you do, draw 2 cards unless that character’s player puts that card on the bottom of their deck.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
  i18n: hadesLookingForADealIconicI18n,
};
