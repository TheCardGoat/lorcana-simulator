import type { CharacterCard } from "@tcg/lorcana-types";
import { hiramFlavershamToymakerI18n } from "./149-hiram-flaversham-toymaker.i18n";

export const hiramFlavershamToymaker: CharacterCard = {
  id: "LsX",
  canonicalId: "ci_LsX",
  reprints: ["set2-149"],
  cardType: "character",
  name: "Hiram Flaversham",
  version: "Toymaker",
  inkType: ["sapphire"],
  franchise: "Great Mouse Detective",
  set: "002",
  cardNumber: 149,
  rarity: "rare",
  cost: 4,
  strength: 1,
  willpower: 6,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_e0ddeb51820a4e46840686240e076a57",
    tcgPlayer: 527277,
  },
  text: [
    {
      title: "ARTIFICER",
      description:
        "When you play this character and whenever he quests, you may banish one of your items to draw 2 cards.",
    },
  ],
  classifications: ["Storyborn", "Inventor"],
  abilities: [
    {
      effect: {
        chooser: "CONTROLLER",
        effect: {
          target: {
            selector: "all",
            count: "all",
            owner: "you",
            zones: ["play"],
            cardTypes: ["item"],
          },
          type: "banish",
        },
        type: "optional",
      },
      id: "slt-1",
      name: "ARTIFICER When you play this character and",
      text: "ARTIFICER When you play this character and whenever he quests, you may banish one of your items to draw 2 cards.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
  missingTests: true,
  i18n: hiramFlavershamToymakerI18n,
};
