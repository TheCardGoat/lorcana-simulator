import type { CharacterCard } from "@tcg/lorcana-types";
import { evasive } from "../../../helpers/abilities/evasive";
import { bashfulRidingTheRailsI18n } from "./039-bashful-riding-the-rails.i18n";

export const bashfulRidingTheRails: CharacterCard = {
  id: "yQo",
  canonicalId: "ci_yQo",
  reprints: ["set12-039"],
  cardType: "character",
  name: "Bashful",
  version: "Riding the Rails",
  inkType: ["amethyst"],
  franchise: "Snow White",
  set: "012",
  cardNumber: 39,
  rarity: "common",
  cost: 5,
  strength: 3,
  willpower: 6,
  lore: 2,
  inkable: true,
  text: "Evasive",
  classifications: ["Storyborn", "Ally", "Seven Dwarfs"],
  abilities: [evasive],
  i18n: bashfulRidingTheRailsI18n,
};
