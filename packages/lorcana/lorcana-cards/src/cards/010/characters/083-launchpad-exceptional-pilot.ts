import type { CharacterCard } from "@tcg/lorcana-types";

export const launchpadExceptionalPilot: CharacterCard = {
  id: "zE0",
  canonicalId: "ci_zE0",
  reprints: ["set10-083"],
  cardType: "character",
  name: "Launchpad",
  version: "Exceptional Pilot",
  i18n: {
    en: {
      name: "Launchpad",
      version: "Exceptional Pilot",
      text: [
        {
          title: "OFF THE MAP",
          description: "When you play this character, you may banish chosen location.",
        },
      ],
    },
    de: {
      name: "Quack, der Bruchpilot",
      version: "Außergewöhnlicher Pilot",
      text: [
        {
          title: "NICHT AUF DER KARTE",
          description:
            "Wenn du diesen Charakter ausspielst, darfst du einen Ort deiner Wahl verbannen.",
        },
      ],
    },
    fr: {
      name: "Flagada Jones",
      version: "Pilote d'exception",
      text: [
        {
          title: "PAS SUR LA CARTE",
          description:
            "Lorsque vous jouez ce personnage, vous pouvez choisir un lieu et le bannir.",
        },
      ],
    },
    it: {
      name: "Jet",
      version: "Pilota Eccezionale",
      text: [
        {
          title: "OLTRE LA MAPPA",
          description: "Quando giochi questo personaggio, puoi esiliare un luogo a tua scelta.",
        },
      ],
    },
  },
  inkType: ["emerald"],
  franchise: "Ducktales",
  set: "010",
  cardNumber: 83,
  rarity: "common",
  cost: 4,
  strength: 4,
  willpower: 4,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_5380e792419f4668ad25176094c6e667",
    tcgPlayer: 658464,
  },
  text: [
    {
      title: "OFF THE MAP",
      description: "When you play this character, you may banish chosen location.",
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
            cardTypes: ["location"],
          },
          type: "banish",
        },
        type: "optional",
      },
      id: "m1r-1",
      name: "OFF THE MAP",
      text: "OFF THE MAP When you play this character, you may banish chosen location.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
