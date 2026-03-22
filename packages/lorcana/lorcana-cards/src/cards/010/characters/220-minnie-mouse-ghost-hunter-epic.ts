import type { CharacterCard } from "@tcg/lorcana-types";
import { minnieMouseGhostHunterEpicI18n } from "./220-minnie-mouse-ghost-hunter-epic.i18n";

export const minnieMouseGhostHunterEpic: CharacterCard = {
  id: "Cby",
  canonicalId: "ci_CEB",
  reprints: ["set10-181"],
  cardType: "character",
  name: "Minnie Mouse",
  version: "Ghost Hunter",
  inkType: ["steel"],
  set: "010",
  cardNumber: 220,
  rarity: "common",
  specialRarity: "epic",
  cost: 2,
  strength: 2,
  willpower: 3,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_1ad6e15d73174d7ab0d55b27d770e14d",
    tcgPlayer: 660364,
  },
  text: [
    {
      title: "SEARCH THE SHADOWS",
      description:
        "When you play this character, chosen Detective character gains Alert this turn. (They can challenge as if they had Evasive.)",
    },
  ],
  classifications: ["Dreamborn", "Hero", "Detective"],
  abilities: [
    {
      effect: {
        duration: "this-turn",
        keyword: "Alert",
        target: "CHOSEN_CHARACTER",
        type: "gain-keyword",
      },
      id: "oy7-1",
      name: "SEARCH THE SHADOWS",
      text: "SEARCH THE SHADOWS When you play this character, chosen Detective character gains Alert this turn.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
  i18n: minnieMouseGhostHunterEpicI18n,
};
