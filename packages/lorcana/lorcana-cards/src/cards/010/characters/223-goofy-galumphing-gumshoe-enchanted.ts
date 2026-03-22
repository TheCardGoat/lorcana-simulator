import type { CharacterCard } from "@tcg/lorcana-types";
import { goofyGalumphingGumshoeEnchantedI18n } from "./223-goofy-galumphing-gumshoe-enchanted.i18n";

export const goofyGalumphingGumshoeEnchanted: CharacterCard = {
  id: "Lbk",
  canonicalId: "ci_zXO",
  reprints: ["set10-024"],
  cardType: "character",
  name: "Goofy",
  version: "Galumphing Gumshoe",
  inkType: ["amber"],
  set: "010",
  cardNumber: 223,
  rarity: "enchanted",
  specialRarity: "enchanted",
  cost: 8,
  strength: 5,
  willpower: 7,
  lore: 3,
  inkable: true,
  externalIds: {
    lorcast: "crd_51faef6e502845188f6fee9429829df2",
    tcgPlayer: 660365,
  },
  text: [
    {
      title: "Shift 5 {I}",
    },
    {
      title: "HOT PURSUIT",
      description:
        "When you play this character and whenever he quests, each opposing character gets -1 {S} until the start of your next turn.",
    },
  ],
  classifications: ["Floodborn", "Hero", "Detective"],
  abilities: [
    {
      cost: {
        ink: 5,
      },
      id: "1mo-1",
      keyword: "Shift",
      text: "Shift 5 {I}",
      type: "keyword",
    },
    {
      id: "1mo-2",
      name: "HOT PURSUIT",
      text: "HOT PURSUIT When you play this character, each opposing character gets -1 {S} until the start of your next turn.",
      type: "triggered",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      effect: {
        type: "modify-stat",
        modifier: -1,
        stat: "strength",
        duration: "until-start-of-next-turn",
        target: {
          selector: "all",
          count: "all",
          owner: "opponent",
          zones: ["play"],
          cardTypes: ["character"],
        },
      },
    },
    {
      id: "1mo-3",
      name: "HOT PURSUIT",
      text: "HOT PURSUIT Whenever he quests, each opposing character gets -1 {S} until the start of your next turn.",
      type: "triggered",
      trigger: {
        event: "quest",
        on: "SELF",
        timing: "whenever",
      },
      effect: {
        type: "modify-stat",
        modifier: -1,
        stat: "strength",
        duration: "until-start-of-next-turn",
        target: {
          selector: "all",
          count: "all",
          owner: "opponent",
          zones: ["play"],
          cardTypes: ["character"],
        },
      },
    },
  ],
  i18n: goofyGalumphingGumshoeEnchantedI18n,
};
