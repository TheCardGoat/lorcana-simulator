import type { CharacterCard } from "@tcg/lorcana-types";

export const motherGothelConceitedManipulator: CharacterCard = {
  id: "GVH",
  canonicalId: "ci_GVH",
  reprints: ["set5-089"],
  cardType: "character",
  name: "Mother Gothel",
  version: "Conceited Manipulator",
  i18n: {
    en: {
      name: "Mother Gothel",
      version: "Conceited Manipulator",
      text: [
        {
          title: "MOTHER KNOWS BEST",
          description:
            "When you play this character, you may pay 3 {I} to return chosen character to their player's hand.",
        },
      ],
    },
    de: {
      name: "Mutter Gothel",
      version: "Arglistige Manipulatorin",
      text: [
        {
          title: "MUTTER WEISS MEHR",
          description:
            "Wenn du diesen Charakter ausspielst, darfst du 3 bezahlen, um einen Charakter deiner Wahl auf die zugehörige Hand zurückzuschicken.",
        },
      ],
    },
    fr: {
      name: "Mère Gothel",
      version: "Manipulatrice vaniteuse",
      text: [
        {
          title: "ÉCOUTE TA MÈRE",
          description:
            "Lorsque vous jouez ce personnage, vous pouvez payer 3 pour choisir un personnage et le renvoyer dans la main de son propriétaire.",
        },
      ],
    },
    it: {
      name: "Madre Gothel",
      version: "Manipolatrice Presuntuosa",
      text: [
        {
          title: "RESTA CON ME",
          description:
            "Quando giochi questo personaggio, puoi pagare 3 per far riprendere in mano al suo giocatore un personaggio a tua scelta.",
        },
      ],
    },
  },
  inkType: ["emerald"],
  franchise: "Tangled",
  set: "005",
  cardNumber: 89,
  rarity: "uncommon",
  cost: 2,
  strength: 1,
  willpower: 3,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_209d406df9574154ad94b0b7c78d635f",
    tcgPlayer: 561631,
  },
  text: [
    {
      title: "MOTHER KNOWS BEST",
      description:
        "When you play this character, you may pay 3 {I} to return chosen character to their player's hand.",
    },
  ],
  classifications: ["Storyborn", "Villain"],
  abilities: [
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
          type: "return-to-hand",
        },
        type: "optional",
      },
      id: "1ui-1",
      name: "MOTHER KNOWS BEST",
      text: "MOTHER KNOWS BEST When you play this character, you may pay 3 {I} to return chosen character to their player's hand.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
