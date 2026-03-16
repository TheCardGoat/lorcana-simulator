import type { CharacterCard } from "@tcg/lorcana-types";

export const tiggerBouncingAllTheWay: CharacterCard = {
  id: "IyC",
  canonicalId: "ci_F3L",
  reprints: ["set11-037"],
  cardType: "character",
  name: "Tigger",
  version: "Bouncing All the Way",
  i18n: {
    en: {
      name: "Tigger",
      version: "Bouncing All the Way",
      text: [
        {
          title: "SPLENDERIFFIC BOUNCE",
          description:
            "When you play this character, you may return chosen character, item, or location with cost 2 or less to their player's hand.",
        },
      ],
    },
    de: {
      name: "Tigger",
      version: "Immerzu am Hüpfen",
      text: [
        {
          title: "WUNDERTASTISCHER SPRUNG",
          description:
            "Wenn du diesen Charakter ausspielst, darfst du einen Charakter, Gegenstand oder Ort deiner Wahl, der 2 oder weniger kostet, zurück auf die zugehörige Hand schicken.",
        },
      ],
    },
    fr: {
      name: "Tigrou",
      version: "Bondit à tout va",
      text: [
        {
          title: "BOND SPLENDIFIQUE",
          description:
            "Lorsque vous jouez ce personnage, vous pouvez choisir un personnage, un objet ou un lieu coûtant 2 ou moins et le renvoyer dans la main de son propriétaire.",
        },
      ],
    },
    it: {
      name: "Tigro",
      version: "Sempre Saltellante",
      text: [
        {
          title: "SALTELLO SPLENDERRIMO",
          description:
            "Quando giochi questo personaggio, puoi far riprendere in mano al suo giocatore un personaggio, un oggetto o un luogo a tua scelta con costo 2 o inferiore.",
        },
      ],
    },
  },
  inkType: ["amethyst"],
  franchise: "Winnie the Pooh",
  set: "011",
  cardNumber: 37,
  rarity: "common",
  cost: 4,
  strength: 4,
  willpower: 3,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_899fe35731aa4f609bb72a19d7e831c8",
    tcgPlayer: 677144,
  },
  text: [
    {
      title: "SPLENDERIFFIC BOUNCE",
      description:
        "When you play this character, you may return chosen character, item, or location with cost 2 or less to their player's hand.",
    },
  ],
  classifications: ["Storyborn", "Tigger"],
  abilities: [
    {
      id: "3b3-1",
      effect: {
        chooser: "CONTROLLER",
        effect: {
          target: {
            cardTypes: ["character"],
            count: 1,
            owner: "any",
            selector: "chosen",
            zones: ["play"],
          },
          type: "return-to-hand",
        },
        type: "optional",
      },
      name: "SPLENDERIFFIC BOUNCE",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
      text: "SPLENDERIFFIC BOUNCE When you play this character, you may return chosen character, item, or location with cost 2 or less to their player's hand.",
    },
  ],
};
