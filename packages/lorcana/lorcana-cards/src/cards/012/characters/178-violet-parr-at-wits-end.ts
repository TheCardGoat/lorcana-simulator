import type { CharacterCard } from "@tcg/lorcana-types";
import { violetParrAtWitsEndI18n } from "./178-violet-parr-at-wits-end.i18n";
import { alert } from "../../../helpers/abilities/alert";

export const violetParrAtWitsEnd: CharacterCard = {
  id: "NsD",
  canonicalId: "ci_NsD",
  reprints: ["set12-178"],
  cardType: "character",
  name: "Violet Parr",
  version: "At Wits' End",
  inkType: ["steel"],
  franchise: "Incredibles",
  set: "012",
  cardNumber: 178,
  rarity: "common",
  cost: 1,
  strength: 2,
  willpower: 1,
  lore: 1,
  inkable: true,
  text: "<Alert> (This character can challenge as if they had Evasive.)",
  classifications: ["Storyborn", "Super", "Hero"],
  abilities: [alert],
  i18n: violetParrAtWitsEndI18n,
};
