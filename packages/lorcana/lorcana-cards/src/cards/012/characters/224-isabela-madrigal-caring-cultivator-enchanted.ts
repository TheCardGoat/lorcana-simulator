import type { CharacterCard } from "@tcg/lorcana-types";
import { isabelaMadrigalCaringCultivatorEnchantedI18n } from "./224-isabela-madrigal-caring-cultivator-enchanted.i18n";
import { shift } from "../../../helpers/abilities/shift";

export const isabelaMadrigalCaringCultivatorEnchanted: CharacterCard = {
  id: "fzU",
  canonicalId: "ci_fzU",
  cardType: "character",
  name: "Isabela Madrigal",
  version: "Caring Cultivator",
  inkType: ["amber"],
  franchise: "Encanto",
  set: "012",
  cardNumber: 224,
  rarity: "enchanted",
  specialRarity: "enchanted",
  cost: 6,
  strength: 4,
  willpower: 5,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_36cd916ef6924852970d3b63c2666f74",
  },
  text: [
    {
      title: "<Shift> 4 {I}",
    },
    {
      title: "Do No Wrong",
      description:
        "Whenever you remove damage from one of your characters, gain 1 lore for each 1 damage removed.",
    },
  ],
  classifications: ["Floodborn", "Ally", "Madrigal"],
  abilities: [
    shift(4),
    {
      id: "fzU-1",
      name: "Do No Wrong",
      type: "triggered",
      text: "Do No Wrong Whenever you remove damage from one of your characters, gain 1 lore for each 1 damage removed.",
      trigger: {
        event: "remove-damage",
        on: "YOUR_CHARACTERS",
        timing: "whenever",
      },
      effect: {
        amount: {
          type: "trigger-amount",
        },
        type: "gain-lore",
      },
    },
  ],
  i18n: isabelaMadrigalCaringCultivatorEnchantedI18n,
};
