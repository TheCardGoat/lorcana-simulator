import type { CharacterCard } from "@tcg/lorcana-types";
import { sisuDaringVisitorI18n } from "./119-sisu-daring-visitor.i18n";

export const sisuDaringVisitor: CharacterCard = {
  id: "dPe",
  canonicalId: "ci_zcv",
  reprints: ["set4-123", "set9-119"],
  cardType: "character",
  name: "Sisu",
  version: "Daring Visitor",
  inkType: ["ruby"],
  franchise: "Raya and the Last Dragon",
  set: "009",
  cardNumber: 119,
  rarity: "uncommon",
  cost: 3,
  strength: 1,
  willpower: 1,
  lore: 1,
  inkable: false,
  externalIds: {
    lorcast: "crd_76066fccc9724d34b6e7a238e52bee61",
    tcgPlayer: 650055,
  },
  text: [
    {
      title: "Evasive",
    },
    {
      title: "BRING ON THE HEAT!",
      description:
        "When you play this character, banish chosen opposing character with 1 {S} or less.",
    },
  ],
  classifications: ["Storyborn", "Hero", "Deity", "Dragon"],
  abilities: [
    {
      id: "1y1-1",
      keyword: "Evasive",
      text: "Evasive",
      type: "keyword",
    },
    {
      effect: {
        from: "hand",
        type: "play-card",
      },
      id: "1y1-2",
      name: "BRING ON THE HEAT!",
      text: "BRING ON THE HEAT! When you play this character, banish chosen opposing character with 1 {S} or less.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
  i18n: sisuDaringVisitorI18n,
};
