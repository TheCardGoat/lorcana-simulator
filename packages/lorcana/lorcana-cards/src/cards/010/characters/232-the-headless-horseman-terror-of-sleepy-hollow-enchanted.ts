import type { CharacterCard } from "@tcg/lorcana-types";
import { theHeadlessHorsemanTerrorOfSleepyHollowEnchantedI18n } from "./232-the-headless-horseman-terror-of-sleepy-hollow-enchanted.i18n";

export const theHeadlessHorsemanTerrorOfSleepyHollowEnchanted: CharacterCard = {
  id: "LLF",
  canonicalId: "ci_3XX",
  reprints: ["set10-125"],
  cardType: "character",
  name: "The Headless Horseman",
  version: "Terror of Sleepy Hollow",
  inkType: ["ruby"],
  franchise: "Sleepy Hollow",
  set: "010",
  cardNumber: 232,
  rarity: "enchanted",
  specialRarity: "enchanted",
  cost: 5,
  strength: 4,
  willpower: 2,
  lore: 2,
  inkable: false,
  missingImplementation: true,
  missingTests: true,
  externalIds: {
    lorcast: "crd_c2a0cc56159841db921d13a52589d13a",
    tcgPlayer: 660012,
  },
  text: [
    {
      title: "LEAVES NO TRACE",
      description:
        "When you play this character, banish chosen opposing character with 2 {S} or less.",
    },
    {
      title: "GATHERING STRENGTH",
      description:
        "During your turn, whenever an opposing character is banished, each of your characters gets +1 {S} this turn.",
    },
  ],
  classifications: ["Storyborn", "Villain"],
  i18n: theHeadlessHorsemanTerrorOfSleepyHollowEnchantedI18n,
};
