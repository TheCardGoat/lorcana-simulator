import type { CharacterCard } from "@tcg/lorcana-types";
import { mickeyMouseBobCratchitEpicI18n } from "./219-mickey-mouse-bob-cratchit-epic.i18n";

export const mickeyMouseBobCratchitEpic: CharacterCard = {
  id: "sdt",
  canonicalId: "ci_mnC",
  reprints: ["set11-159"],
  cardType: "character",
  name: "Mickey Mouse",
  version: "Bob Cratchit",
  inkType: ["sapphire"],
  franchise: "Mickey's Christmas Carol",
  set: "011",
  cardNumber: 219,
  rarity: "common",
  specialRarity: "epic",
  cost: 2,
  strength: 3,
  willpower: 2,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_7379a15083914913b21c37d59e503c0c",
    tcgPlayer: 677154,
  },
  text: [
    {
      title: "HARD WORK",
      description:
        "Whenever this character quests, put the top card of your deck facedown under him.",
    },
    {
      title: "A GIVING HEART",
      description:
        "When this character is banished in a challenge, you may put all cards that were under him under another chosen character or location of yours.",
    },
  ],
  classifications: ["Storyborn", "Hero"],
  abilities: [],
  i18n: mickeyMouseBobCratchitEpicI18n,
};
