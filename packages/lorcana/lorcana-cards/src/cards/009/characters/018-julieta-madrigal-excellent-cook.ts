import type { CharacterCard } from "@tcg/lorcana-types";

export const julietaMadrigalExcellentCook: CharacterCard = {
  id: "yxp",
  canonicalId: "ci_YPQ",
  reprints: ["set4-013", "set9-018"],
  cardType: "character",
  name: "Julieta Madrigal",
  version: "Excellent Cook",
  i18n: {
    en: {
      name: "Julieta Madrigal",
      version: "Excellent Cook",
      text: [
        {
          title: "SIGNATURE RECIPE",
          description:
            "When you play this character, you may remove up to 2 damage from chosen character. If you removed damage this way, you may draw a card.",
        },
      ],
    },
    de: {
      name: "Julieta Madrigal",
      version: "Exzellente Köchin",
      text: [
        {
          title: "EIGENES REZEPT",
          description:
            "Wenn du diesen Charakter ausspielst, darfst du bis zu 2 Schaden von einem Charakter deiner Wahl entfernen. Falls du dadurch mindestens einen Schaden entfernt hast, darfst du 1 Karte ziehen.",
        },
      ],
    },
    fr: {
      name: "Julieta Madrigal",
      version: "Cuisinière hors pair",
      text: [
        {
          title: "SPÉCIALITÉ DE LA CHEFFE",
          description:
            "Lorsque vous jouez ce personnage, vous pouvez choisir un personnage et lui retirer jusqu'à 2 jetons Dommage. Si vous en avez retiré au moins un de cette façon, vous pouvez piocher une carte.",
        },
      ],
    },
    it: {
      name: "Julieta Madrigal",
      version: "Cuoca Sopraffina",
      text: [
        {
          title: "RICETTA TIPICA",
          description:
            "Quando giochi questo personaggio, puoi rimuovere fino a 2 danni da un personaggio a tua scelta. Se hai rimosso almeno un danno in questo modo, puoi pescare una carta.",
        },
      ],
    },
  },
  inkType: ["amber"],
  franchise: "Encanto",
  set: "009",
  cardNumber: 18,
  rarity: "uncommon",
  cost: 3,
  strength: 1,
  willpower: 4,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_e0516a7bb03e48249017bd27b84a9d92",
    tcgPlayer: 649966,
  },
  text: [
    {
      title: "SIGNATURE RECIPE",
      description:
        "When you play this character, you may remove up to 2 damage from chosen character. If you removed damage this way, you may draw a card.",
    },
  ],
  classifications: ["Storyborn", "Mentor", "Madrigal"],
  abilities: [
    {
      effect: {
        condition: {
          expression: "you removed damage this way",
          type: "if",
        },
        then: {
          amount: 1,
          target: "CONTROLLER",
          type: "draw",
        },
        type: "conditional",
      },
      id: "10k-1",
      name: "SIGNATURE RECIPE",
      text: "SIGNATURE RECIPE When you play this character, you may remove up to 2 damage from chosen character. If you removed damage this way, you may draw a card.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
