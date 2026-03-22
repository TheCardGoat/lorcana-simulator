import type { CharacterCard } from "@tcg/lorcana-types";
import { scarHeartlessHunterI18n } from "./127-scar-heartless-hunter.i18n";

export const scarHeartlessHunter: CharacterCard = {
  id: "YvX",
  canonicalId: "ci_YvX",
  reprints: ["set6-127"],
  cardType: "character",
  name: "Scar",
  version: "Heartless Hunter",
  inkType: ["ruby"],
  franchise: "Lion King",
  set: "006",
  cardNumber: 127,
  rarity: "common",
  cost: 5,
  strength: 4,
  willpower: 2,
  lore: 3,
  inkable: false,
  externalIds: {
    lorcast: "crd_eea9acebbeb6449a8cc03786f5bca24d",
    tcgPlayer: 591122,
  },
  text: [
    {
      title: "BARED TEETH",
      description:
        "When you play this character, deal 2 damage to chosen character of yours to deal 2 damage to chosen character.",
    },
  ],
  classifications: ["Storyborn", "Villain"],
  abilities: [
    {
      effect: {
        amount: 2,
        target: {
          cardTypes: ["character"],
          count: 1,
          owner: "any",
          selector: "chosen",
          zones: ["play"],
        },
        type: "deal-damage",
      },
      id: "mp6-1",
      name: "BARED TEETH",
      text: "BARED TEETH When you play this character, deal 2 damage to chosen character of yours to deal 2 damage to chosen character.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
  i18n: scarHeartlessHunterI18n,
};
