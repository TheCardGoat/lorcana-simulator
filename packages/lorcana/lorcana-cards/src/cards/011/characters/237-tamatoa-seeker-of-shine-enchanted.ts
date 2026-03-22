import type { CharacterCard } from "@tcg/lorcana-types";
import { tamatoaSeekerOfShineEnchantedI18n } from "./237-tamatoa-seeker-of-shine-enchanted.i18n";

export const tamatoaSeekerOfShineEnchanted: CharacterCard = {
  id: "7Tc",
  canonicalId: "ci_zL3",
  reprints: ["set11-156"],
  cardType: "character",
  name: "Tamatoa",
  version: "Seeker of Shine",
  inkType: ["sapphire"],
  franchise: "Moana",
  set: "011",
  cardNumber: 237,
  rarity: "enchanted",
  specialRarity: "enchanted",
  cost: 7,
  strength: 6,
  willpower: 6,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_82807328c2514c0d8f22366b4720a583",
    tcgPlayer: 677168,
  },
  text: [
    {
      title: "Boost 2 {I}",
    },
    {
      title: "Ward",
    },
    {
      title: "ANYTHING THAT GLITTERS",
      description:
        "Whenever you put a card under one of your characters or locations, this character gets +1 {L} this turn.",
    },
  ],
  classifications: ["Storyborn", "Villain", "Whisper"],
  abilities: [
    {
      id: "v4g-1",
      keyword: "Boost",
      type: "keyword",
      value: 2,
      text: "Boost 2 {I}",
    },
    {
      id: "v4g-2",
      keyword: "Ward",
      type: "keyword",
      text: "Ward",
    },
    {
      id: "v4g-3",
      effect: {
        modifier: 1,
        stat: "lore",
        target: "SELF",
        type: "modify-stat",
        duration: "this-turn",
      },
      name: "ANYTHING THAT GLITTERS",
      trigger: {
        event: "banish",
        timing: "whenever",
        on: "YOUR_OTHER_CHARACTERS",
      },
      type: "triggered",
      text: "ANYTHING THAT GLITTERS Whenever you put a card under one of your characters or locations, this character gets +1 {L} this turn.",
    },
  ],
  i18n: tamatoaSeekerOfShineEnchantedI18n,
};
