import type { CharacterCard } from "@tcg/lorcana-types";

export const dellaDuckReturningMother: CharacterCard = {
  id: "p1c",
  canonicalId: "ci_p1c",
  reprints: ["set10-022"],
  cardType: "character",
  name: "Della Duck",
  version: "Returning Mother",
  i18n: {
    en: {
      name: "Della Duck",
      version: "Returning Mother",
      text: [
        {
          title: "HERE TO HELP",
          description:
            "When you play this character, you may ready chosen character with Boost. If you do, they can't quest or challenge for the rest of this turn.",
        },
      ],
    },
    de: {
      name: "Della Duck",
      version: "Zurückkehrende Mutter",
      text: [
        {
          title: "HIER, UM ZU HELFEN",
          description:
            "Wenn du diesen Charakter ausspielst, darfst du einen Charakter deiner Wahl mit Stärken bereit machen. Wenn du dies tust, kann jener in diesem Zug nicht mehr erkunden oder herausfordern.",
        },
      ],
    },
    fr: {
      name: "Della Duck",
      version: "Mère en chemin",
      text: [
        {
          title: "LÀ POUR AIDER",
          description:
            "Lorsque vous jouez ce personnage, vous pouvez choisir un personnage ayant Boost et le redresser. Si vous le faites, ce personnage-là ne peut ni être envoyé à l'aventure ni défier pour le reste de ce tour.",
        },
      ],
    },
    it: {
      name: "Della Duck",
      version: "Madre Ritornata",
      text: [
        {
          title: "TI AIUTERÒ",
          description:
            "Quando giochi questo personaggio, puoi preparare un personaggio a tua scelta con Potenziamento. Se lo fai, non può andare all'avventura o sfidare per il resto di questo turno.",
        },
      ],
    },
  },
  inkType: ["amber"],
  franchise: "Ducktales",
  set: "010",
  cardNumber: 22,
  rarity: "common",
  cost: 4,
  strength: 2,
  willpower: 5,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_93548601e4fd42fcb0d385947c09fc8e",
    tcgPlayer: 658334,
  },
  text: [
    {
      title: "HERE TO HELP",
      description:
        "When you play this character, you may ready chosen character with Boost. If you do, they can't quest or challenge for the rest of this turn.",
    },
  ],
  classifications: ["Storyborn", "Ally"],
  abilities: [
    {
      effect: {
        steps: [
          {
            chooser: "CONTROLLER",
            effect: {
              type: "ready",
              target: {
                selector: "chosen",
                count: 1,
                owner: "any",
                zones: ["play"],
                cardTypes: ["character"],
              },
            },
            type: "optional",
          },
          {
            duration: "this-turn",
            restriction: "cant-quest",
            target: "SELF",
            type: "restriction",
          },
        ],
        type: "sequence",
      },
      id: "27n-1",
      name: "HERE TO HELP",
      text: "HERE TO HELP When you play this character, you may ready chosen character with Boost. If you do, they can't quest or challenge for the rest of this turn.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
