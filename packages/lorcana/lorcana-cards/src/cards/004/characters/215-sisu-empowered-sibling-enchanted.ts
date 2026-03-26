import type { CharacterCard } from "@tcg/lorcana-types";
import { sisuEmpoweredSiblingEnchantedI18n } from "./215-sisu-empowered-sibling-enchanted.i18n";
import { shift } from "../../../helpers/abilities/shift";

export const sisuEmpoweredSiblingEnchanted: CharacterCard = {
  id: "VLy",
  canonicalId: "ci_bdj",
  reprints: ["set4-125"],
  cardType: "character",
  name: "Sisu",
  version: "Empowered Sibling",
  inkType: ["ruby"],
  franchise: "Raya and the Last Dragon",
  set: "004",
  cardNumber: 215,
  rarity: "enchanted",
  specialRarity: "enchanted",
  cost: 8,
  strength: 5,
  willpower: 4,
  lore: 3,
  inkable: false,
  externalIds: {
    lorcast: "crd_d0714091b2a14f478e2d7704c8eb50d8",
    tcgPlayer: 550839,
  },
  text: [
    {
      title: "Shift 6",
    },
    {
      title: "I GOT THIS!",
      description:
        "When you play this character, banish all opposing characters with 2 {S} or less.",
    },
  ],
  classifications: ["Floodborn", "Hero", "Deity", "Dragon"],
  abilities: [
    shift(6),
    {
      effect: {
        from: "hand",
        type: "play-card",
      },
      id: "1q9-2",
      name: "I GOT THIS!",
      text: "I GOT THIS! When you play this character, banish all opposing characters with 2 {S} or less.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
  i18n: sisuEmpoweredSiblingEnchantedI18n,
};
