import type { CharacterCard } from "@tcg/lorcana-types";
import { frozoneSuperCoolEnchantedI18n } from "./226-frozone-super-cool-enchanted.i18n";
import { rush } from "../../../helpers/abilities/rush";

export const frozoneSuperCoolEnchanted: CharacterCard = {
  id: "RDv",
  canonicalId: "ci_Ea1",
  reprints: ["set12-059"],
  cardType: "character",
  name: "Frozone",
  version: "Super Cool",
  inkType: ["amethyst"],
  franchise: "Incredibles",
  set: "012",
  cardNumber: 226,
  rarity: "enchanted",
  specialRarity: "enchanted",
  cost: 6,
  strength: 6,
  willpower: 4,
  lore: 2,
  inkable: false,
  externalIds: {
    lorcast: "crd_c36df8a0b082402b95a4545e874435f0",
  },
  text: [
    {
      title: "<Rush>",
    },
    {
      title: "Just Chill",
      description:
        "When you play this character, if you have another Super character in play, you may exert chosen opposing character.",
    },
  ],
  classifications: ["Storyborn", "Super", "Hero"],
  abilities: [
    rush,
    {
      id: "RDv-1",
      name: "Just Chill",
      type: "triggered",
      text: "Just Chill When you play this character, if you have another Super character in play, you may exert chosen opposing character.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      condition: {
        type: "has-character-count",
        controller: "you",
        comparison: "greater-or-equal",
        count: 1,
        classification: "Super",
        excludeSelf: true,
      },
      effect: {
        type: "optional",
        chooser: "CONTROLLER",
        effect: {
          type: "exert",
          target: {
            selector: "chosen",
            count: 1,
            owner: "opponent",
            cardTypes: ["character"],
            zones: ["play"],
          },
        },
      },
    },
  ],
  i18n: frozoneSuperCoolEnchantedI18n,
};
