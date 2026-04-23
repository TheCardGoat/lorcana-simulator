import type { CharacterCard } from "@tcg/lorcana-types";
import { rush } from "../../../helpers/abilities/rush";
import { frozoneSuperCoolI18n } from "./059-frozone-super-cool.i18n";

export const frozoneSuperCool: CharacterCard = {
  id: "Ea1",
  canonicalId: "ci_Ea1",
  reprints: ["set12-059"],
  cardType: "character",
  name: "Frozone",
  version: "Super Cool",
  inkType: ["amethyst"],
  franchise: "Incredibles",
  set: "012",
  cardNumber: 59,
  rarity: "rare",
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
      title: "Rush",
    },
    {
      title: "JUST CHILL",
      description:
        "When you play this character, if you have another Super character in play, you may exert chosen opposing character.",
    },
  ],
  classifications: ["Storyborn", "Super", "Hero"],
  abilities: [
    rush,
    {
      id: "Ea1-1",
      name: "JUST CHILL",
      type: "triggered",
      text: "JUST CHILL When you play this character, if you have another Super character in play, you may exert chosen opposing character.",
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
  i18n: frozoneSuperCoolI18n,
};
