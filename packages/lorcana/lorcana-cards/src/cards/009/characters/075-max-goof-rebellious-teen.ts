import type { CharacterCard } from "@tcg/lorcana-types";

export const maxGoofRebelliousTeen: CharacterCard = {
  id: "A7j",
  canonicalId: "ci_A7j",
  reprints: ["set9-075"],
  cardType: "character",
  name: "Max Goof",
  version: "Rebellious Teen",
  i18n: {
    en: {
      name: "Max Goof",
      version: "Rebellious Teen",
      text: [
        {
          title: "PERSONAL SOUNDTRACK",
          description:
            "When you play this character, you may pay 1 {I} to return a song card with cost 3 or less from your discard to your hand.",
        },
      ],
    },
    de: {
      name: "Max Goof",
      version: "Rebellischer Teenager",
      text: [
        {
          title: "PERSÖNLICHER SOUNDTRACK",
          description:
            "Wenn du diesen Charakter ausspielst, darfst du 1 bezahlen, um 1 Liedkarte, die 3 oder weniger kostet, aus deinem Ablagestapel zurück auf deine Hand zu nehmen.",
        },
      ],
    },
    fr: {
      name: "Max Dingo",
      version: "Ado rebelle",
      text: [
        {
          title: "BANDE-SON PERSONNELLE",
          description:
            "Lorsque vous jouez ce personnage, vous pouvez payer 1 pour renvoyer dans votre main une carte Chanson avec un coût de 3 ou moins de votre défausse.",
        },
      ],
    },
    it: {
      name: "Max Pippo",
      version: "Adolescente Ribelle",
      text: [
        {
          title: "COLONNA SONORA PERSONALE",
          description:
            "Quando giochi questo personaggio, puoi pagare 1 per riprendere in mano una carta canzone con costo 3 o inferiore dai tuoi scarti.",
        },
      ],
    },
  },
  inkType: ["emerald"],
  franchise: "Goofy Movie",
  set: "009",
  cardNumber: 75,
  rarity: "rare",
  cost: 3,
  strength: 2,
  willpower: 2,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_0599c55386a649bb9af21a906ed52db5",
    tcgPlayer: 647681,
  },
  text: [
    {
      title: "PERSONAL SOUNDTRACK",
      description:
        "When you play this character, you may pay 1 {I} to return a song card with cost 3 or less from your discard to your hand.",
    },
  ],
  classifications: ["Storyborn", "Hero"],
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
            cardTypes: ["card"],
          },
          type: "return-to-hand",
        },
        type: "optional",
      },
      id: "1va-1",
      name: "PERSONAL SOUNDTRACK",
      text: "PERSONAL SOUNDTRACK When you play this character, you may pay 1 {I} to return a song card with cost 3 or less from your discard to your hand.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
