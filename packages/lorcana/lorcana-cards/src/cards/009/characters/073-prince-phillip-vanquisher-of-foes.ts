import type { CharacterCard } from "@tcg/lorcana-types";
import { princePhillipVanquisherOfFoesI18n } from "./073-prince-phillip-vanquisher-of-foes.i18n";

export const princePhillipVanquisherOfFoes: CharacterCard = {
  id: "5fm",
  canonicalId: "ci_UBa",
  reprints: ["set4-087", "set9-073"],
  cardType: "character",
  name: "Prince Phillip",
  version: "Vanquisher of Foes",
  inkType: ["emerald"],
  franchise: "Sleeping Beauty",
  set: "009",
  cardNumber: 73,
  rarity: "common",
  cost: 9,
  strength: 6,
  willpower: 6,
  lore: 3,
  inkable: true,
  externalIds: {
    lorcast: "crd_4c762e16709149b79b4f7d895fd1de8b",
    tcgPlayer: 650015,
  },
  text: [
    {
      title: "Shift 6 {I}",
    },
    {
      title: "Evasive",
    },
    {
      title: "SWIFT AND SURE",
      description: "When you play this character, banish all opposing damaged characters.",
    },
  ],
  classifications: ["Floodborn", "Hero", "Prince"],
  abilities: [
    {
      cost: {
        ink: 6,
      },
      id: "1db-1",
      keyword: "Shift",
      text: "Shift 6 {I}",
      type: "keyword",
    },
    {
      id: "1db-2",
      keyword: "Evasive",
      text: "Evasive",
      type: "keyword",
    },
    {
      effect: {
        target: {
          cardTypes: ["character"],
          count: 1,
          owner: "any",
          selector: "chosen",
          zones: ["play"],
        },
        type: "banish",
      },
      id: "1db-3",
      name: "SWIFT AND SURE",
      text: "SWIFT AND SURE When you play this character, banish all opposing damaged characters.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
  i18n: princePhillipVanquisherOfFoesI18n,
};
