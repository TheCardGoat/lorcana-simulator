import type { CharacterCard } from "@tcg/lorcana-types";

export const baymaxArmoredCompanion: CharacterCard = {
  id: "w4v",
  canonicalId: "ci_w4v",
  reprints: ["set6-157"],
  cardType: "character",
  name: "Baymax",
  version: "Armored Companion",
  i18n: {
    en: {
      name: "Baymax",
      version: "Armored Companion",
      text: [
        {
          title: "THE TREATMENT IS WORKING",
          description:
            "When you play this character and whenever he quests, you may remove up to 2 damage from another chosen character of yours. Gain 1 lore for each 1 damage removed this way.",
        },
      ],
    },
    de: {
      name: "Baymax",
      version: "Armored Companion",
      text: [
        {
          title: "THE TREATMENT IS WORKING",
          description:
            "When you play this character and whenever he quests, you may remove up to 2 damage from another chosen character of yours. Gain 1 lore for each 1 damage removed this way.",
        },
      ],
    },
    fr: {
      name: "Baymax",
      version: "Armored Companion",
      text: [
        {
          title: "THE TREATMENT IS WORKING",
          description:
            "When you play this character and whenever he quests, you may remove up to 2 damage from another chosen character of yours. Gain 1 lore for each 1 damage removed this way.",
        },
      ],
    },
    it: {
      name: "Baymax",
      version: "Armored Companion",
      text: [
        {
          title: "THE TREATMENT IS WORKING",
          description:
            "When you play this character and whenever he quests, you may remove up to 2 damage from another chosen character of yours. Gain 1 lore for each 1 damage removed this way.",
        },
      ],
    },
  },
  inkType: ["sapphire"],
  franchise: "Big Hero 6",
  set: "006",
  cardNumber: 157,
  rarity: "legendary",
  cost: 5,
  strength: 2,
  willpower: 6,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_982364cf0c5f42ee9ba82a335bf674b5",
    tcgPlayer: 578165,
  },
  text: [
    {
      title: "THE TREATMENT IS WORKING",
      description:
        "When you play this character and whenever he quests, you may remove up to 2 damage from another chosen character of yours. Gain 1 lore for each 1 damage removed this way.",
    },
  ],
  classifications: ["Storyborn", "Hero", "Robot"],
  abilities: [
    {
      effect: {
        chooser: "CONTROLLER",
        effect: {
          amount: 2,
          target: {
            selector: "chosen",
            count: 1,
            owner: "any",
            zones: ["play"],
            cardTypes: ["character"],
          },
          type: "remove-damage",
          upTo: true,
        },
        type: "optional",
      },
      id: "12n-1",
      name: "THE TREATMENT IS WORKING When you play this character and",
      text: "THE TREATMENT IS WORKING When you play this character and whenever he quests, you may remove up to 2 damage from another chosen character of yours. Gain 1 lore for each 1 damage removed this way.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
