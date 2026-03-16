import type { CharacterCard } from "@tcg/lorcana-types";

export const cubbyMightyLostBoy: CharacterCard = {
  id: "3Fn",
  canonicalId: "ci_3Fn",
  reprints: ["set3-069"],
  cardType: "character",
  name: "Cubby",
  version: "Mighty Lost Boy",
  i18n: {
    en: {
      name: "Cubby",
      version: "Mighty Lost Boy",
      text: [
        {
          title: "THE BEAR",
          description: "Whenever this character moves to a location, he gets +3 {S} this turn.",
        },
      ],
    },
    de: {
      name: "Curly",
      version: "Stärkster der verwunschenen Kinder",
      text: [
        {
          title: "DER BÄR",
          description:
            "Jedes Mal, wenn dieser Charakter zu einem Ort bewegt wird, erhält er in diesem Zug +3.",
        },
      ],
    },
    fr: {
      name: "Le Frisé",
      version: "Enfant perdu très costaud",
      text: [
        {
          title: "L'OURS",
          description:
            "Chaque fois que vous déplacez ce personnage sur un lieu, il gagne +3 pour le reste de ce tour.",
        },
      ],
    },
    it: {
      name: "Cubby",
      version: "Possente Bimbo Sperduto",
      text: [
        {
          title: "L'ORSO",
          description:
            "Ogni volta che questo personaggio si sposta in un luogo, riceve +3 per questo turno.",
        },
      ],
    },
  },
  inkType: ["emerald"],
  franchise: "Peter Pan",
  set: "003",
  cardNumber: 69,
  rarity: "common",
  cost: 4,
  strength: 3,
  willpower: 5,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_1406e73a81ad4687ad3e502447d21287",
    tcgPlayer: 537945,
  },
  text: [
    {
      title: "THE BEAR",
      description: "Whenever this character moves to a location, he gets +3 {S} this turn.",
    },
  ],
  classifications: ["Storyborn", "Ally"],
  missingTests: true,
  abilities: [
    {
      effect: {
        duration: "this-turn",
        modifier: 3,
        stat: "strength",
        target: "CHOSEN_CHARACTER",
        type: "modify-stat",
      },
      id: "1y3-1",
      name: "THE BEAR",
      text: "THE BEAR Whenever this character moves to a location, he gets +3 {S} this turn.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
