import type { CharacterCard } from "@tcg/lorcana-types";
import { perditaDeterminedMotherEnchantedI18n } from "./207-perdita-determined-mother-enchanted.i18n";
import { shift } from "../../../helpers/abilities/shift";

export const perditaDeterminedMotherEnchanted: CharacterCard = {
  id: "RxC",
  canonicalId: "ci_Q1m",
  reprints: ["set8-027"],
  cardType: "character",
  name: "Perdita",
  version: "Determined Mother",
  inkType: ["amber", "sapphire"],
  franchise: "101 Dalmatians",
  set: "008",
  cardNumber: 207,
  rarity: "enchanted",
  specialRarity: "enchanted",
  cost: 6,
  strength: 4,
  willpower: 6,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_db4137ebc57046a3ba7736adbdb01d44",
    tcgPlayer: 632686,
  },
  text: [
    {
      title: "Shift 4",
    },
    {
      title: "QUICK, EVERYONE HIDE",
      description:
        "When you play this character, you may put all Puppy character cards from your discard into your inkwell facedown and exerted.",
    },
  ],
  classifications: ["Floodborn", "Hero"],
  abilities: [
    shift(4),
    {
      effect: {
        chooser: "CONTROLLER",
        effect: {
          exerted: true,
          facedown: true,
          source: "discard",
          target: "CONTROLLER",
          type: "put-into-inkwell",
        },
        type: "optional",
      },
      id: "169-2",
      text: "QUICK, EVERYONE HIDE When you play this character, you may put all Puppy character cards from your discard into your inkwell facedown and exerted.",
      type: "action",
    },
  ],
  i18n: perditaDeterminedMotherEnchantedI18n,
};
