import type { CharacterCard } from "@tcg/lorcana-types";

export const goofyMarleysClumsySpirit: CharacterCard = {
  id: "z3A",
  canonicalId: "ci_z3A",
  reprints: ["set11-120"],
  cardType: "character",
  name: "Goofy",
  version: "Marley's Clumsy Spirit",
  i18n: {
    en: {
      name: "Goofy",
      version: "Marley's Clumsy Spirit",
      text: [
        {
          title: "PREPARE YOURSELF",
          description:
            "When you play this character, you may ready chosen character. If you do, they can't quest for the rest of this turn.",
        },
      ],
    },
    de: {
      name: "Goofy",
      version: "Marleys ungeschickter Geist",
      text: [
        {
          title: "MACH DICH BEREIT",
          description:
            "Wenn du diesen Charakter ausspielst, darfst du einen Charakter deiner Wahl bereit machen. Wenn du dies tust, kann er in diesem Zug nicht mehr erkunden.",
        },
      ],
    },
    fr: {
      name: "Dingo",
      version: "Esprit maladroit de Marley",
      text: [
        {
          title: "PRÉPAREZ-VOUS",
          description:
            "Lorsque vous jouez ce personnage, vous pouvez choisir un personnage et le redresser. Si vous le faites, il ne peut pas être envoyé à l'aventure pour le reste de ce tour.",
        },
      ],
    },
    it: {
      name: "Pippo",
      version: "Spirito Imbranato di Marley",
      text: [
        {
          title: "PREPARATI",
          description:
            "Quando giochi questo personaggio, puoi preparare un personaggio a tua scelta. Se lo fai, non può andare all'avventura per il resto di questo turno.",
        },
      ],
    },
  },
  inkType: ["ruby"],
  franchise: "Mickey's Christmas Carol",
  set: "011",
  cardNumber: 120,
  rarity: "common",
  cost: 5,
  strength: 5,
  willpower: 5,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_aeb75ac2ab524eb690b3b96aeddc80cc",
    tcgPlayer: 673759,
  },
  text: [
    {
      title: "PREPARE YOURSELF",
      description:
        "When you play this character, you may ready chosen character. If you do, they can't quest for the rest of this turn.",
    },
  ],
  classifications: ["Storyborn", "Ally", "Ghost"],
  abilities: [
    {
      id: "dju-1",
      effect: {
        steps: [
          {
            chooser: "CONTROLLER",
            effect: {
              target: {
                cardTypes: ["character"],
                count: 1,
                owner: "any",
                selector: "chosen",
                zones: ["play"],
              },
              type: "ready",
            },
            type: "optional",
          },
          {
            restriction: "cant-quest",
            target: "SELF",
            type: "restriction",
            duration: "this-turn",
          },
        ],
        type: "sequence",
      },
      name: "PREPARE YOURSELF",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
      text: "PREPARE YOURSELF When you play this character, you may ready chosen character. If you do, they can't quest for the rest of this turn.",
    },
  ],
};
