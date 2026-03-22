import type { CharacterCard } from "@tcg/lorcana-types";
import { scroogeMcduckCavernProspectorI18n } from "./018-scrooge-mcduck-cavern-prospector.i18n";

export const scroogeMcduckCavernProspector: CharacterCard = {
  id: "rwm",
  canonicalId: "ci_rwm",
  reprints: ["set10-018"],
  cardType: "character",
  name: "Scrooge McDuck",
  version: "Cavern Prospector",
  inkType: ["amber"],
  franchise: "Ducktales",
  set: "010",
  cardNumber: 18,
  rarity: "rare",
  cost: 6,
  strength: 4,
  willpower: 7,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_6da6c21dbc834a55b8b49e039c0e3c52",
    tcgPlayer: 658381,
  },
  text: [
    {
      title: "Shift 4 {I}",
    },
    {
      title: "SPECULATION",
      description:
        "Whenever you play a character or location with Boost, you may put the top card of your deck facedown under them.",
    },
  ],
  classifications: ["Floodborn", "Hero"],
  abilities: [],
  i18n: scroogeMcduckCavernProspectorI18n,
};
