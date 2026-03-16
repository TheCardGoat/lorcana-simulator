import type { CharacterCard } from "@tcg/lorcana-types";

export const nanaCanineCaregiver: CharacterCard = {
  id: "wwt",
  canonicalId: "ci_wwt",
  reprints: ["set10-053"],
  cardType: "character",
  name: "Nana",
  version: "Canine Caregiver",
  i18n: {
    en: {
      name: "Nana",
      version: "Canine Caregiver",
      text: [
        {
          title: "HELPFUL INSTINCTS",
          description:
            "When you play this character, you may choose and discard a card to return chosen character with cost 2 or less to their player's hand.",
        },
      ],
    },
    de: {
      name: "Nana",
      version: "Betreuungshündin",
      text: [
        {
          title: "HILFREICHE INSTINKTE",
          description:
            "Wenn du diesen Charakter ausspielst, darfst du eine Karte von deiner Hand auswählen und abwerfen, um einen Charakter deiner Wahl, der 2 oder weniger kostet, auf die zugehörige Hand zurückzuschicken.",
        },
      ],
    },
    fr: {
      name: "Nana",
      version: "Nourrice canine",
      text: [
        {
          title: "INSTINCTS DE SECOURS",
          description:
            "Lorsque vous jouez ce personnage, vous pouvez défausser une carte pour choisir un personnage coûtant 2 ou moins et le renvoyer dans la main de son propriétaire.",
        },
      ],
    },
    it: {
      name: "Nana",
      version: "Balia Canina",
      text: [
        {
          title: "ISTINTI COLLABORATIVI",
          description:
            "Quando giochi questo personaggio, puoi scegliere e scartare una carta per far riprendere in mano al suo giocatore un personaggio a tua scelta con costo 2 o inferiore.",
        },
      ],
    },
  },
  inkType: ["amethyst"],
  franchise: "Peter Pan",
  set: "010",
  cardNumber: 53,
  rarity: "uncommon",
  cost: 3,
  strength: 3,
  willpower: 3,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_217c6bfcdfaa48be949cb14f7ef7a862",
    tcgPlayer: 660025,
  },
  text: [
    {
      title: "HELPFUL INSTINCTS",
      description:
        "When you play this character, you may choose and discard a card to return chosen character with cost 2 or less to their player's hand.",
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
            owner: "any",
            zones: ["play"],
            cardTypes: ["character"],
          },
          type: "return-to-hand",
        },
        type: "optional",
      },
      id: "1lc-1",
      name: "HELPFUL INSTINCTS",
      text: "HELPFUL INSTINCTS When you play this character, you may choose and discard a card to return chosen character with cost 2 or less to their player's hand.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
