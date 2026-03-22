import type { CharacterCard } from "@tcg/lorcana-types";
import { princeNaveenUkulelePlayerI18n } from "./003-prince-naveen-ukulele-player.i18n";

export const princeNaveenUkulelePlayer: CharacterCard = {
  id: "4kO",
  canonicalId: "ci_hWb",
  reprints: ["set5-003"],
  cardType: "character",
  name: "Prince Naveen",
  version: "Ukulele Player",
  inkType: ["amber"],
  franchise: "Princess and the Frog",
  set: "005",
  cardNumber: 3,
  rarity: "legendary",
  cost: 4,
  strength: 3,
  willpower: 3,
  lore: 2,
  inkable: false,
  externalIds: {
    lorcast: "crd_74f050d47ef34391ba29b8c521450dac",
    tcgPlayer: 561993,
  },
  text: [
    {
      title: "Singer 6",
    },
    {
      title: "IT'S BEAUTIFUL, NO?",
      description:
        "When you play this character, you may play a song with cost 6 or less for free.",
    },
  ],
  classifications: ["Storyborn", "Hero", "Prince"],
  abilities: [
    {
      id: "v3r-1",
      keyword: "Singer",
      text: "Singer 6",
      type: "keyword",
      value: 6,
    },
    {
      effect: {
        chooser: "CONTROLLER",
        effect: {
          cost: "free",
          costRestriction: {
            comparison: "less-or-equal",
            value: 6,
          },
          from: "hand",
          type: "play-card",
        },
        type: "optional",
      },
      id: "v3r-2",
      text: "IT'S BEAUTIFUL, NO? When you play this character, you may play a song with cost 6 or less for free.",
      type: "action",
    },
  ],
  i18n: princeNaveenUkulelePlayerI18n,
};
