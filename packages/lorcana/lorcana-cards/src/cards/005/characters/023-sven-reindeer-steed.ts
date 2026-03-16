import type { CharacterCard } from "@tcg/lorcana-types";

export const svenReindeerSteed: CharacterCard = {
  id: "DzB",
  canonicalId: "ci_DzB",
  reprints: ["set5-023"],
  cardType: "character",
  name: "Sven",
  version: "Reindeer Steed",
  i18n: {
    en: {
      name: "Sven",
      version: "Reindeer Steed",
      text: [
        {
          title: "REINDEER GAMES",
          description:
            "When you play this character, you may ready chosen character. They can't quest or challenge for the rest of this turn.",
        },
      ],
    },
    de: {
      name: "Sven",
      version: "Rentier",
      text: [
        {
          title: "RENTIER SPIELE",
          description:
            "Wenn du diesen Charakter ausspielst, darfst du einen Charakter deiner Wahl bereit machen. Er kann in diesem Zug nicht mehr erkunden oder herausfordern.",
        },
      ],
    },
    fr: {
      name: "Sven",
      version: "Destrier renne",
      text: [
        {
          title: "JEUX DE RENNES",
          description:
            "Lorsque vous jouez ce personnage, vous pouvez choisir un personnage et le redresser. Il ne peut ni partir à l'aventure ni défier pour le reste de ce tour.",
        },
      ],
    },
    it: {
      name: "Sven",
      version: "Renna Destriero",
      text: [
        {
          title: "GIOCHI DA RENNE",
          description:
            "Quando giochi questo personaggio, puoi preparare un personaggio a tua scelta. Non può andare all'avventura o sfidare per il resto di questo turno.",
        },
      ],
    },
  },
  inkType: ["amber"],
  franchise: "Frozen",
  set: "005",
  cardNumber: 23,
  rarity: "uncommon",
  cost: 4,
  strength: 3,
  willpower: 3,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_a35ce7543f7e4af49eb325083776e061",
    tcgPlayer: 559714,
  },
  text: [
    {
      title: "REINDEER GAMES",
      description:
        "When you play this character, you may ready chosen character. They can't quest or challenge for the rest of this turn.",
    },
  ],
  classifications: ["Storyborn", "Ally"],
  abilities: [
    {
      effect: {
        chooser: "CONTROLLER",
        effect: {
          duration: "this-turn",
          restriction: "cant-quest",
          target: "SELF",
          type: "restriction",
        },
        type: "optional",
      },
      id: "m3t-1",
      name: "REINDEER GAMES",
      text: "REINDEER GAMES When you play this character, you may ready chosen character. They can't quest or challenge for the rest of this turn.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
