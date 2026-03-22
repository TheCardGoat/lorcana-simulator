import type { CharacterCard } from "@tcg/lorcana-types";
import { chipNDaleRecoveryRangersI18n } from "./014-chip-n-dale-recovery-rangers.i18n";

export const chipNDaleRecoveryRangers: CharacterCard = {
  id: "FOd",
  canonicalId: "ci_0J8",
  reprints: ["set6-014"],
  cardType: "character",
  name: "Chip 'n' Dale",
  version: "Recovery Rangers",
  inkType: ["amber"],
  franchise: "Rescue Rangers",
  set: "006",
  cardNumber: 14,
  rarity: "rare",
  cost: 8,
  strength: 6,
  willpower: 6,
  lore: 3,
  inkable: false,
  externalIds: {
    lorcast: "crd_c1cd26316f4948a382770ffb29440699",
    tcgPlayer: 592030,
  },
  text: [
    {
      title: "Shift 5",
    },
    {
      title: "(This character counts as being named both Chip and Dale.)",
    },
    {
      title: "SEARCH AND RESCUE",
      description:
        "During your turn, whenever a card is put into your inkwell, you may return a character card from your discard to your hand.",
    },
  ],
  classifications: ["Floodborn", "Hero"],
  abilities: [
    {
      id: "1sm-1",
      keyword: "Shift",
      cost: {
        ink: 5,
      },
      shiftTarget: "Chip or Dale",
      text: "Shift 5",
      type: "keyword",
    },
    {
      id: "1sm-2",
      name: "SEARCH AND RESCUE",
      text: "SEARCH AND RESCUE During your turn, whenever a card is put into your inkwell, you may return a character card from your discard to your hand.",
      trigger: {
        event: "ink",
        on: "CONTROLLER",
        restrictions: [
          {
            type: "during-turn",
            whose: "your",
          },
        ],
        timing: "whenever",
      },
      effect: {
        chooser: "CONTROLLER",
        effect: {
          cardType: "character",
          target: "CONTROLLER",
          type: "return-from-discard",
        },
        type: "optional",
      },
      type: "triggered",
    },
  ],
  i18n: chipNDaleRecoveryRangersI18n,
};
