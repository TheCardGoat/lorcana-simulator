import type { CharacterCard } from "@tcg/lorcana-types";
import { jafarDreadnoughtI18n } from "./183-jafar-dreadnought.i18n";

export const jafarDreadnought: CharacterCard = {
  id: "OLg",
  canonicalId: "ci_OLg",
  reprints: ["set2-183"],
  cardType: "character",
  name: "Jafar",
  version: "Dreadnought",
  inkType: ["steel"],
  franchise: "Aladdin",
  set: "002",
  cardNumber: 183,
  rarity: "uncommon",
  cost: 4,
  strength: 3,
  willpower: 4,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_89090f037609469eaa214e72bc12d218",
    tcgPlayer: 527180,
  },
  text: [
    {
      title: "Shift 2",
    },
    {
      title: "NOW WHERE WERE WE?",
      description:
        "During your turn, whenever this character banishes another character in a challenge, you may draw a card.",
    },
  ],
  classifications: ["Floodborn", "Villain", "Sorcerer"],
  abilities: [
    {
      id: "22g-1",
      cost: {
        ink: 2,
      },
      keyword: "Shift",
      type: "keyword",
      text: "Shift 2",
    },
    {
      id: "22g-2",
      effect: {
        chooser: "CONTROLLER",
        effect: {
          amount: 1,
          target: "CONTROLLER",
          type: "draw",
        },
        type: "optional",
      },
      name: "NOW WHERE WERE WE?",
      trigger: {
        event: "banish",
        on: "OPPONENT_CHARACTERS",
        timing: "whenever",
      },
      type: "triggered",
      text: "NOW WHERE WERE WE? During your turn, whenever this character banishes another character in a challenge, you may draw a card.",
    },
  ],
  missingTests: true,
  i18n: jafarDreadnoughtI18n,
};
