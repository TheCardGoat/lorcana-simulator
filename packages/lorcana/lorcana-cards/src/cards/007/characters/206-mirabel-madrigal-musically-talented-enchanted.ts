import type { CharacterCard } from "@tcg/lorcana-types";

export const mirabelMadrigalMusicallyTalentedEnchanted: CharacterCard = {
  id: "m94",
  canonicalId: "ci_X10",
  reprints: ["set7-035"],
  cardType: "character",
  name: "Mirabel Madrigal",
  version: "Musically Talented",
  i18n: {
    en: {
      name: "Mirabel Madrigal",
      version: "Musically Talented",
      text: [
        {
          title: "Shift 4",
        },
        {
          title: "HER OWN SPECIAL GIFT",
          description:
            "Whenever this character quests, you may return a song card with cost 3 or less from your discard to your hand.",
        },
      ],
    },
    de: {
      name: "Mirabel Madrigal",
      version: "Musikalisch begabt",
      text: "Gestaltwandel 4 IHRE EIGENE BESONDERE GABE Jedes Mal, wenn dieser Charakter erkundet, darfst du 1 Liedkarte, die 3 oder weniger kostet, aus deinem Ablagestapel zurück auf deine Hand nehmen.",
    },
    fr: {
      name: "Mirabel Madrigal",
      version: "Musicalement talentueuse",
      text: "Alter 4 SON PROPRE POUVOIR Chaque fois que ce personnage est envoyé à l'aventure, vous pouvez renvoyer une carte Chanson coûtant 3 ou moins de votre défausse dans votre main.",
    },
    it: {
      name: "Mirabel Madrigal",
      version: "Musicista Dotata",
      text: "Trasformazione 4 IL SUO TALENTO SPECIALE Ogni volta che questo personaggio va all'avventura, puoi riprendere in mano una carta canzone con costo 3 o inferiore dai tuoi scarti.",
    },
  },
  inkType: ["amber", "amethyst"],
  franchise: "Encanto",
  set: "007",
  cardNumber: 206,
  rarity: "enchanted",
  specialRarity: "enchanted",
  cost: 6,
  strength: 2,
  willpower: 6,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_dbecb4ca526f46ac8faa1a361f1c8bdf",
    tcgPlayer: 619734,
  },
  text: [
    {
      title: "Shift 4",
    },
    {
      title: "HER OWN SPECIAL GIFT",
      description:
        "Whenever this character quests, you may return a song card with cost 3 or less from your discard to your hand.",
    },
  ],
  classifications: ["Floodborn", "Hero", "Madrigal"],
  abilities: [
    {
      cost: {
        ink: 4,
      },
      id: "1ri-1",
      keyword: "Shift",
      text: "Shift 4",
      type: "keyword",
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
            cardTypes: ["card"],
          },
          type: "return-to-hand",
        },
        type: "optional",
      },
      id: "1ri-2",
      name: "HER OWN SPECIAL GIFT",
      text: "HER OWN SPECIAL GIFT Whenever this character quests, you may return a song card with cost 3 or less from your discard to your hand.",
      trigger: {
        event: "quest",
        on: "SELF",
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
};
