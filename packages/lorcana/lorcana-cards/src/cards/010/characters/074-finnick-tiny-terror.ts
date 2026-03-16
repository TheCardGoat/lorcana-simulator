import type { CharacterCard } from "@tcg/lorcana-types";

export const finnickTinyTerror: CharacterCard = {
  id: "oXH",
  canonicalId: "ci_oXH",
  reprints: ["set10-074"],
  cardType: "character",
  name: "Finnick",
  version: "Tiny Terror",
  i18n: {
    en: {
      name: "Finnick",
      version: "Tiny Terror",
      text: [
        {
          title: "YOU BETTER RUN",
          description:
            "When you play this character, you may pay 2 {I} to return chosen opposing character with 2 {S} or less to their player's hand.",
        },
      ],
    },
    de: {
      name: "Finnick",
      version: "Kleiner Schrecken",
      text: [
        {
          title: "LAUF LIEBER WEG",
          description:
            "Wenn du diesen Charakter ausspielst, darfst du 2 bezahlen, um einen gegnerischen Charakter deiner Wahl, mit 2 oder weniger, zurück auf die zugehörige Hand zu schicken.",
        },
      ],
    },
    fr: {
      name: "Finnick",
      version: "Petite terreur",
      text: [
        {
          title: "TU FERAIS MIEUX DE DÉGUERPIR",
          description:
            "Lorsque vous jouez ce personnage, vous pouvez payer 2 pour choisir un personnage adverse ayant 2 ou moins et le renvoyer dans la main de son propriétaire.",
        },
      ],
    },
    it: {
      name: "Finnick",
      version: "Minuscolo Terrore",
      text: [
        {
          title: "MEGLIO SE SCAPPI",
          description:
            "Quando giochi questo personaggio, puoi pagare 2 per far riprendere in mano al suo giocatore un personaggio avversario a tua scelta con 2 o inferiore.",
        },
      ],
    },
  },
  inkType: ["emerald"],
  franchise: "Zootropolis",
  set: "010",
  cardNumber: 74,
  rarity: "common",
  cost: 1,
  strength: 1,
  willpower: 2,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_c9465de418104f1fab0483d5c168266b",
    tcgPlayer: 658876,
  },
  text: [
    {
      title: "YOU BETTER RUN",
      description:
        "When you play this character, you may pay 2 {I} to return chosen opposing character with 2 {S} or less to their player's hand.",
    },
  ],
  classifications: ["Storyborn", "Ally"],
  abilities: [
    {
      effect: {
        chooser: "CONTROLLER",
        effect: {
          target: {
            selector: "chosen",
            count: 1,
            owner: "opponent",
            zones: ["play"],
            cardTypes: ["character"],
          },
          type: "return-to-hand",
        },
        type: "optional",
      },
      id: "1ee-1",
      name: "YOU BETTER RUN",
      text: "YOU BETTER RUN When you play this character, you may pay 2 {I} to return chosen opposing character with 2 {S} or less to their player's hand.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
