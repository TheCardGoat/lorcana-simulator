import type { CharacterCard } from "@tcg/lorcana-types";
import { rooLittlestPirateI18n } from "./023-roo-littlest-pirate.i18n";

export const rooLittlestPirate: CharacterCard = {
  id: "JPo",
  canonicalId: "ci_JPo",
  reprints: ["set6-023"],
  cardType: "character",
  name: "Roo",
  version: "Littlest Pirate",
  inkType: ["amber"],
  franchise: "Winnie the Pooh",
  set: "006",
  cardNumber: 23,
  rarity: "common",
  cost: 2,
  strength: 1,
  willpower: 2,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_8497d60197bd451c91b4c2468f85b156",
    tcgPlayer: 587967,
  },
  text: [
    {
      title: "I'M",
      description:
        "A PIRATE TOO! When you play this character, you may give chosen character -2 {S} until the start of your next turn.",
    },
  ],
  classifications: ["Dreamborn", "Ally", "Pirate"],
  abilities: [
    {
      effect: {
        from: "hand",
        type: "play-card",
      },
      id: "q64-1",
      name: "I'M A PIRATE TOO!",
      text: "I'M A PIRATE TOO! When you play this character, you may give chosen character -2 {S} until the start of your next turn.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
  i18n: rooLittlestPirateI18n,
};
