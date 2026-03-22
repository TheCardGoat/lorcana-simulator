import type { CharacterCard } from "@tcg/lorcana-types";
import { mittensSassyStreetCatI18n } from "./009-mittens-sassy-street-cat.i18n";

export const mittensSassyStreetCat: CharacterCard = {
  id: "msV",
  canonicalId: "ci_msV",
  reprints: ["set7-009"],
  cardType: "character",
  name: "Mittens",
  version: "Sassy Street Cat",
  inkType: ["amber"],
  franchise: "Bolt",
  set: "007",
  cardNumber: 9,
  rarity: "rare",
  cost: 5,
  strength: 4,
  willpower: 5,
  lore: 2,
  inkable: false,
  externalIds: {
    lorcast: "crd_9b5d0e7c5c15447d9f17ea4419b07e3f",
    tcgPlayer: 618159,
  },
  text: [
    {
      title: "Bodyguard",
    },
    {
      title: "NO THANKS NECESSARY",
      description:
        "Once during your turn, whenever a card is put into your inkwell, your other characters with Bodyguard get +1 {L} this turn.",
    },
  ],
  classifications: ["Storyborn", "Ally"],
  abilities: [
    {
      id: "et6-1",
      keyword: "Bodyguard",
      text: "Bodyguard",
      type: "keyword",
    },
    {
      effect: {
        duration: "this-turn",
        modifier: 1,
        stat: "lore",
        target: "YOUR_CHARACTERS",
        type: "modify-stat",
      },
      id: "et6-2",
      name: "NO THANKS NECESSARY Once",
      text: "NO THANKS NECESSARY Once during your turn, whenever a card is put into your inkwell, your other characters with Bodyguard get +1 {L} this turn.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
  i18n: mittensSassyStreetCatI18n,
};
