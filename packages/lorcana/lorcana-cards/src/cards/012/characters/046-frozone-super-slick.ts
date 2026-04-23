import type { CharacterCard } from "@tcg/lorcana-types";
import { evasive } from "../../../helpers/abilities/evasive";
import { frozoneSuperSlickI18n } from "./046-frozone-super-slick.i18n";

export const frozoneSuperSlick: CharacterCard = {
  id: "cV4",
  canonicalId: "ci_cV4",
  reprints: ["set12-046"],
  cardType: "character",
  name: "Frozone",
  version: "Super Slick",
  inkType: ["amethyst"],
  franchise: "Incredibles",
  set: "012",
  cardNumber: 46,
  rarity: "common",
  cost: 2,
  strength: 2,
  willpower: 2,
  lore: 1,
  inkable: true,
  text: "Evasive",
  classifications: ["Storyborn", "Super", "Hero"],
  abilities: [evasive],
  i18n: frozoneSuperSlickI18n,
};
