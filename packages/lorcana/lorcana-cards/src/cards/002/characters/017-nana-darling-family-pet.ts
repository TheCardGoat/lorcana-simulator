import type { CharacterCard } from "@tcg/lorcana-types";

export const nanaDarlingFamilyPet: CharacterCard = {
  id: "RVI",
  canonicalId: "ci_RVI",
  reprints: ["set2-017"],
  cardType: "character",
  name: "Nana",
  version: "Darling Family Pet",
  i18n: {
    en: {
      name: "Nana",
      version: "Darling Family Pet",
      text: [
        {
          title: "NURSEMAID",
          description:
            "Whenever you play a Floodborn character, you may remove all damage from chosen character.",
        },
      ],
    },
    de: {
      name: "Nana",
      version: "Haustier der Darlings",
      text: [
        {
          title: "KINDERFRAU",
          description:
            "Jedes Mal, wenn du eine Flutgestalt ausspielst, darfst du jeglichen Schaden von einem Charakter deiner Wahl entfernen.",
        },
      ],
    },
    fr: {
      name: "Nana",
      version: "Chienne de la famille Darling",
      text: [
        {
          title: "NOUNOU",
          description:
            "Chaque fois vous jouez un personnage Floodborn, vous pouvez choisir un personnage et lui retirer tous ses jetons Dommage.",
        },
      ],
    },
    it: {
      name: "Nana",
      version: "Darling Family Pet",
      text: [
        {
          title: "NURSEMAID",
          description:
            "Whenever you play a Floodborn character, you may remove all damage from chosen character.",
        },
      ],
    },
  },
  inkType: ["amber"],
  franchise: "Peter Pan",
  set: "002",
  cardNumber: 17,
  rarity: "uncommon",
  cost: 2,
  strength: 1,
  willpower: 3,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_2efc304326314401b518565ccfc8f238",
    tcgPlayer: 527718,
  },
  text: [
    {
      title: "NURSEMAID",
      description:
        "Whenever you play a Floodborn character, you may remove all damage from chosen character.",
    },
  ],
  classifications: ["Storyborn", "Ally"],
  abilities: [
    {
      id: "1ic-1",
      name: "NURSEMAID",
      text: "NURSEMAID Whenever you play a Floodborn character, you may remove all damage from chosen character.",
      type: "triggered",
      trigger: {
        event: "play",
        on: {
          cardType: "character",
          classification: "Floodborn",
          controller: "you",
        },
        timing: "whenever",
      },
      effect: {
        type: "optional",
        chooser: "CONTROLLER",
        effect: {
          amount: "all",
          target: "CHOSEN_CHARACTER",
          type: "remove-damage",
        },
      },
    },
  ],
};
