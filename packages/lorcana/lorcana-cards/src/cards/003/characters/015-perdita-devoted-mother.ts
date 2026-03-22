import type { CharacterCard } from "@tcg/lorcana-types";
import { perditaDevotedMotherI18n } from "./015-perdita-devoted-mother.i18n";

export const perditaDevotedMother: CharacterCard = {
  id: "fgK",
  canonicalId: "ci_fgK",
  reprints: ["set3-015"],
  cardType: "character",
  name: "Perdita",
  version: "Devoted Mother",
  inkType: ["amber"],
  franchise: "101 Dalmatians",
  set: "003",
  cardNumber: 15,
  rarity: "legendary",
  cost: 6,
  strength: 1,
  willpower: 6,
  lore: 2,
  inkable: false,
  externalIds: {
    lorcast: "crd_a1c95bf6c8744ccaa5ff363453aa8716",
    tcgPlayer: 538722,
  },
  text: [
    {
      title: "COME ALONG, CHILDREN",
      description:
        "When you play this character and whenever she quests, you may play a character with cost 2 or less from your discard for free.",
    },
  ],
  classifications: ["Storyborn", "Hero"],
  abilities: [
    {
      effect: {
        chooser: "CONTROLLER",
        effect: {
          cost: "free",
          from: "discard",
          type: "play-card",
        },
        type: "optional",
      },
      id: "1dc-1",
      text: "COME ALONG, CHILDREN When you play this character and whenever she quests, you may play a character with cost 2 or less from your discard for free.",
      type: "action",
    },
  ],
  i18n: perditaDevotedMotherI18n,
};
