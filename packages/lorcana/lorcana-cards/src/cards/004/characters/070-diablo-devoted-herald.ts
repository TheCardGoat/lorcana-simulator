import type { CharacterCard } from "@tcg/lorcana-types";
import { diabloDevotedHeraldI18n } from "./070-diablo-devoted-herald.i18n";

export const diabloDevotedHerald: CharacterCard = {
  id: "Mnw",
  canonicalId: "ci_Ljv",
  reprints: ["set4-070"],
  cardType: "character",
  name: "Diablo",
  version: "Devoted Herald",
  inkType: ["emerald"],
  franchise: "Sleeping Beauty",
  set: "004",
  cardNumber: 70,
  rarity: "legendary",
  cost: 3,
  strength: 2,
  willpower: 2,
  lore: 1,
  inkable: false,
  externalIds: {
    lorcast: "crd_93ab5d88940f4610a375a928963a570f",
    tcgPlayer: 550535,
  },
  text: [
    {
      title:
        "Shift: Discard an action card (You may discard an action card to play this on top of one of your characters named Diablo.)",
    },
    {
      title: "Evasive",
    },
    {
      title: "CIRCLE FAR AND WIDE",
      description:
        "During each opponent's turn, whenever they draw a card while this character is exerted, you may draw a card.",
    },
  ],
  classifications: ["Floodborn", "Ally"],
  abilities: [],
  i18n: diabloDevotedHeraldI18n,
};
