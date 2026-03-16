import type { CharacterCard } from "@tcg/lorcana-types";

export const arielDeterminedMermaid: CharacterCard = {
  id: "Z4g",
  canonicalId: "ci_uu8",
  reprints: ["set4-174", "set9-196"],
  cardType: "character",
  name: "Ariel",
  version: "Determined Mermaid",
  i18n: {
    en: {
      name: "Ariel",
      version: "Determined Mermaid",
      text: [
        {
          title: "I WANT MORE",
          description:
            "Whenever you play a song, you may draw a card, then choose and discard a card.",
        },
      ],
    },
    de: {
      name: "Arielle",
      version: "Entschlossene Meerjungfrau",
      text: [
        {
          title: "ANDERSWO",
          description:
            "Jedes Mal, wenn du ein Lied ausspielst, darfst du 1 Karte ziehen. Wähle danach 1 Karte aus deiner Hand und wirf sie ab.",
        },
      ],
    },
    fr: {
      name: "Ariel",
      version: "Sirène déterminée",
      text: [
        {
          title: "JE M'ENNUIE",
          description:
            "Chaque fois que vous jouez une chanson, vous pouvez piocher une carte puis choisir et défausser une carte.",
        },
      ],
    },
    it: {
      name: "Ariel",
      version: "Sirena Determinata",
      text: [
        {
          title: "COSA MAI CI SARÀ",
          description:
            "Ogni volta che giochi una canzone, puoi pescare una carta e poi scegliere e scartare una carta.",
        },
      ],
    },
  },
  inkType: ["steel"],
  franchise: "Little Mermaid",
  set: "004",
  cardNumber: 174,
  rarity: "common",
  cost: 3,
  strength: 2,
  willpower: 4,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_8e9017b673fa48039cb919188a8dae7a",
    tcgPlayer: 650129,
  },
  text: [
    {
      title: "I WANT MORE",
      description: "Whenever you play a song, you may draw a card, then choose and discard a card.",
    },
  ],
  classifications: ["Storyborn", "Hero", "Princess"],
  abilities: [
    {
      effect: {
        chooser: "CONTROLLER",
        effect: {
          amount: 1,
          chosen: true,
          target: "CONTROLLER",
          type: "discard",
        },
        type: "optional",
      },
      id: "gsz-1",
      name: "I WANT MORE",
      text: "I WANT MORE Whenever you play a song, you may draw a card, then choose and discard a card.",
      trigger: {
        event: "play",
        on: {
          cardType: "action",
          controller: "you",
        },
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
};
