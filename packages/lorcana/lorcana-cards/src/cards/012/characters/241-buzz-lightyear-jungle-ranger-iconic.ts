import type { CharacterCard } from "@tcg/lorcana-types";
import { shift } from "../../../helpers/abilities/shift";
import { buzzLightyearJungleRangerIconicI18n } from "./241-buzz-lightyear-jungle-ranger-iconic.i18n";

export const buzzLightyearJungleRangerIconic: CharacterCard = {
  id: "wbm",
  canonicalId: "ci_KHv",
  reprints: ["set12-091"],
  cardType: "character",
  name: "Buzz Lightyear",
  version: "Jungle Ranger",
  inkType: ["emerald"],
  franchise: "Toy Story",
  set: "012",
  cardNumber: 241,
  rarity: "common",
  specialRarity: "iconic",
  cost: 7,
  strength: 7,
  willpower: 5,
  lore: 2,
  inkable: false,
  externalIds: {
    lorcast: "crd_0b928f0cd5d2473482e07a609205c26b",
  },
  text: [
    {
      title: "Shift 5 {I}",
    },
    {
      title: "TAKE CHARGE",
      description:
        "When you play this character, you may return an action card with cost 7 or less from your discard to your hand.",
    },
    {
      title: "ADVANCED TRAINING",
      description: "Whenever you play an action, chosen character gets +1 {L} this turn.",
    },
  ],
  classifications: ["Floodborn", "Hero", "Toy", "Captain"],
  abilities: [
    shift(5),
    {
      id: "wbm-2",
      name: "TAKE CHARGE",
      type: "triggered",
      text: "TAKE CHARGE When you play this character, you may return an action card with cost 7 or less from your discard to your hand.",
      trigger: { event: "play", on: "SELF", timing: "when" },
      effect: {
        type: "optional",
        chooser: "CONTROLLER",
        effect: {
          type: "return-from-discard",
          cardType: "action",
          destination: "hand",
          target: "CONTROLLER",
          filters: [{ type: "cost-comparison", comparison: "less-or-equal", value: 7 }],
        },
      },
    },
    {
      id: "wbm-3",
      name: "ADVANCED TRAINING",
      type: "triggered",
      text: "ADVANCED TRAINING Whenever you play an action, chosen character gets +1 {L} this turn.",
      trigger: {
        event: "play",
        on: { controller: "you", cardType: "action" },
        timing: "whenever",
      },
      effect: {
        type: "modify-stat",
        stat: "lore",
        modifier: 1,
        target: "CHOSEN_CHARACTER",
        duration: "this-turn",
      },
    },
  ],
  i18n: buzzLightyearJungleRangerIconicI18n,
};
