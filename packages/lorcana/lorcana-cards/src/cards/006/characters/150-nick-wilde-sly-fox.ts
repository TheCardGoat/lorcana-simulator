import type { CharacterCard } from "@tcg/lorcana-types";
import { nickWildeSlyFoxI18n } from "./150-nick-wilde-sly-fox.i18n";

export const nickWildeSlyFox: CharacterCard = {
  id: "2oi",
  canonicalId: "ci_2oi",
  reprints: ["set6-150"],
  cardType: "character",
  name: "Nick Wilde",
  version: "Sly Fox",
  inkType: ["sapphire"],
  franchise: "Zootropolis",
  set: "006",
  cardNumber: 150,
  rarity: "uncommon",
  cost: 3,
  strength: 1,
  willpower: 3,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_48304fa82c024098bf755ea123884358",
    tcgPlayer: 591133,
  },
  text: [
    {
      title: "Shift 1",
    },
    {
      title: "CAN'T TOUCH ME",
      description: "While you have an item in play, this character can't be challenged.",
    },
  ],
  classifications: ["Floodborn", "Ally"],
  abilities: [
    {
      cost: {
        ink: 1,
      },
      id: "jsd-1",
      keyword: "Shift",
      text: "Shift 1",
      type: "keyword",
    },
    {
      effect: {
        restriction: "cant-be-challenged",
        target: "SELF",
        type: "restriction",
      },
      id: "jsd-2",
      text: "CAN'T TOUCH ME While you have an item in play, this character can't be challenged.",
      type: "action",
    },
  ],
  i18n: nickWildeSlyFoxI18n,
};
