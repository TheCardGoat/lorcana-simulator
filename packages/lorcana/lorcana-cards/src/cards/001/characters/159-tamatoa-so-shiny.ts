import type { CharacterCard } from "@tcg/lorcana-types";

export const tamatoaSoShiny: CharacterCard = {
  id: "Z2D",
  canonicalId: "ci_Z2D",
  reprints: ["set1-159"],
  cardType: "character",
  name: "Tamatoa",
  version: "So Shiny!",
  i18n: {
    en: {
      name: "Tamatoa",
      version: "So Shiny!",
      text: [
        {
          title: "WHAT HAVE WE HERE?",
          description:
            "When you play this character and whenever he quests, you may return an item card from your discard to your hand.",
        },
        {
          title: "GLAM",
          description: "This character gets +1 {L} for each item you have in play.",
        },
      ],
    },
    de: {
      name: "Tamatoa",
      version: "So glänzend!",
      text: [
        {
          title: "WAS HABEN WIR DENN HIER?",
          description:
            "Wenn du diesen Charakter ausspielst und jedes Mal, wenn er erkundet, darfst du 1 Gegenstandskarte aus deinem Ablagestapel zurück auf deine Hand nehmen.GLAMOURÖS Dieser Charakter erhält +1 für jeden Gegenstand, den du im Spiel hast.",
        },
      ],
    },
    fr: {
      name: "TAMATOA",
      version: "Bling-bling",
      text: [
        {
          title: "MAIS QU'AVONS NOUS LÀ?",
          description:
            "Lorsque vous jouez ce personnage ou qu'il est envoyé à l'aventure, vous pouvez reprendre en main une carte objet de votre défausse.",
        },
        {
          title: "SPLENDIDE",
          description: "Ce personnage a +1 pour chaque objet que vous avez en jeu.",
        },
      ],
    },
    it: {
      name: "Tamatoa",
      version: "So Shiny!",
      text: [
        {
          title: "WHAT HAVE WE HERE?",
          description:
            "When you play this character and whenever he quests, you may return an item card from your discard to your hand.",
        },
        {
          title: "GLAM",
          description: "This character gets +1 for each item you have in play.",
        },
      ],
    },
  },
  inkType: ["sapphire"],
  franchise: "Moana",
  set: "001",
  cardNumber: 159,
  rarity: "common",
  cost: 8,
  strength: 5,
  willpower: 8,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_43467fa51d7b4bcc9ebe110d9fe9e3b9",
    tcgPlayer: 508881,
  },
  text: [
    {
      title: "WHAT HAVE WE HERE?",
      description:
        "When you play this character and whenever he quests, you may return an item card from your discard to your hand.",
    },
    {
      title: "GLAM",
      description: "This character gets +1 {L} for each item you have in play.",
    },
  ],
  classifications: ["Storyborn", "Villain"],
  abilities: [
    {
      effect: {
        chooser: "CONTROLLER",
        effect: {
          cardType: "item",
          target: "CONTROLLER",
          type: "return-from-discard",
        },
        type: "optional",
      },
      id: "sj3-1",
      name: "WHAT HAVE WE HERE?",
      text: "WHAT HAVE WE HERE? When you play this character and whenever he quests, you may return an item card from your discard to your hand.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
    {
      effect: {
        modifier: {
          controller: "you",
          type: "items-in-play",
        },
        stat: "lore",
        target: "SELF",
        type: "modify-stat",
      },
      id: "sj3-2",
      name: "GLAM",
      text: "GLAM This character gets +1 {L} for each item you have in play.",
      type: "static",
    },
  ],
};
