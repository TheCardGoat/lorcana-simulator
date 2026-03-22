import type { CharacterCard } from "@tcg/lorcana-types";
import { whiteRabbitLateAgainI18n } from "./089-white-rabbit-late-again.i18n";

export const whiteRabbitLateAgain: CharacterCard = {
  id: "k8j",
  canonicalId: "ci_k8j",
  reprints: ["set11-089"],
  cardType: "character",
  name: "White Rabbit",
  version: "Late Again",
  inkType: ["emerald"],
  franchise: "Alice in Wonderland",
  set: "011",
  cardNumber: 89,
  rarity: "uncommon",
  cost: 2,
  strength: 2,
  willpower: 2,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_a8878d5ac3ea4ff7bfacb512552943cc",
    tcgPlayer: 673345,
  },
  text: [
    {
      title: "UNDERDOG",
      description:
        "If this is your first turn and you're not the first player, you pay 1 {I} less to play this character.",
    },
    {
      title: "Evasive",
    },
  ],
  classifications: ["Storyborn", "Ally"],
  abilities: [
    {
      id: "1go-1",
      name: "UNDERDOG",
      condition: {
        type: "first-turn-non-otp",
      },
      effect: {
        amount: 1,
        cardType: "character",
        type: "cost-reduction",
      },
      sourceZones: ["hand"],
      type: "static",
      text: "UNDERDOG If this is your first turn and you're not the first player, you pay 1 {I} less to play this character.",
    },
    {
      id: "1go-2",
      keyword: "Evasive",
      type: "keyword",
      text: "Evasive",
    },
  ],
  i18n: whiteRabbitLateAgainI18n,
};
