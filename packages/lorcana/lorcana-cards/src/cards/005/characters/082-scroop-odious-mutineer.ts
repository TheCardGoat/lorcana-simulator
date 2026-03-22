import type { CharacterCard } from "@tcg/lorcana-types";
import { scroopOdiousMutineerI18n } from "./082-scroop-odious-mutineer.i18n";

export const scroopOdiousMutineer: CharacterCard = {
  id: "6v8",
  canonicalId: "ci_6v8",
  reprints: ["set5-082"],
  cardType: "character",
  name: "Scroop",
  version: "Odious Mutineer",
  inkType: ["emerald"],
  franchise: "Treasure Planet",
  set: "005",
  cardNumber: 82,
  rarity: "common",
  cost: 3,
  strength: 2,
  willpower: 1,
  lore: 2,
  inkable: false,
  externalIds: {
    lorcast: "crd_6ecf18a6435e46238220c23606eb7768",
    tcgPlayer: 561301,
  },
  text: [
    {
      title: "Evasive",
    },
    {
      title: "DO SAY HELLO TO MR.",
    },
    {
      title: "ARROW",
      description:
        "When you play this character, you may pay 3 {I} to banish chosen damaged character.",
    },
  ],
  classifications: ["Storyborn", "Villain", "Alien", "Pirate"],
  abilities: [
    {
      id: "br6-1",
      keyword: "Evasive",
      text: "Evasive",
      type: "keyword",
    },
    {
      effect: {
        from: "hand",
        type: "play-card",
      },
      id: "br6-2",
      text: "DO SAY HELLO TO MR. ARROW When you play this character, you may pay 3 {I} to banish chosen damaged character.",
      type: "action",
    },
  ],
  i18n: scroopOdiousMutineerI18n,
};
