import type { CharacterCard } from "@tcg/lorcana-types";
import { minnieMouseSweetheartPrincessIconicI18n } from "./241-minnie-mouse-sweetheart-princess-iconic.i18n";

export const minnieMouseSweetheartPrincessIconic: CharacterCard = {
  id: "xiP",
  canonicalId: "ci_f4y",
  reprints: ["set9-005"],
  cardType: "character",
  name: "Minnie Mouse",
  version: "Sweetheart Princess",
  inkType: ["amber"],
  set: "009",
  cardNumber: 241,
  rarity: "common",
  specialRarity: "iconic",
  cost: 4,
  strength: 2,
  willpower: 4,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_77b92f4bb7d2460ea85b9d547cb8e72f",
    tcgPlayer: 651106,
  },
  text: [
    {
      title: "ROYAL FAVOR",
      description: "Your characters named Mickey Mouse gain Support.",
    },
    {
      title: "BYE BYE, NOW",
      description:
        "Whenever this character quests, you may banish chosen exerted character with 5 {S} or more.",
    },
  ],
  classifications: ["Dreamborn", "Hero", "Princess"],
  abilities: [
    {
      effect: {
        keyword: "Support",
        target: "YOUR_CHARACTERS",
        type: "gain-keyword",
      },
      id: "ofq-1",
      text: "ROYAL FAVOR Your characters named Mickey Mouse gain Support.",
      type: "action",
    },
    {
      effect: {
        chooser: "CONTROLLER",
        effect: {
          target: {
            selector: "chosen",
            count: 1,
            owner: "any",
            zones: ["play"],
            cardTypes: ["character"],
          },
          type: "banish",
        },
        type: "optional",
      },
      id: "ofq-2",
      text: "BYE BYE, NOW Whenever this character quests, you may banish chosen exerted character with 5 {S} or more.",
      type: "action",
    },
  ],
  i18n: minnieMouseSweetheartPrincessIconicI18n,
};
