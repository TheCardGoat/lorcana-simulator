import type { CharacterCard } from "@tcg/lorcana-types";
import { camiloMadrigalPranksterI18n } from "./052-camilo-madrigal-prankster.i18n";

export const camiloMadrigalPrankster: CharacterCard = {
  id: "h3m",
  canonicalId: "ci_GAc",
  reprints: ["set4-040", "set9-052"],
  cardType: "character",
  name: "Camilo Madrigal",
  version: "Prankster",
  inkType: ["amethyst"],
  franchise: "Encanto",
  set: "009",
  cardNumber: 52,
  rarity: "uncommon",
  cost: 4,
  strength: 2,
  willpower: 5,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_b07f766507574745ae00ade904bd2558",
    tcgPlayer: 649996,
  },
  text: "MANY FORMS At the start of your turn, you may choose one:\n- This character gets +1 {L} this turn.\n- This character gains Challenger +2 this turn.",
  classifications: ["Storyborn", "Ally", "Madrigal"],
  abilities: [],
  i18n: camiloMadrigalPranksterI18n,
};
