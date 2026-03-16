import type { CharacterCard } from "@tcg/lorcana-types";

export const olafHelpingHand: CharacterCard = {
  id: "D7f",
  canonicalId: "ci_D7f",
  reprints: ["set10-057"],
  cardType: "character",
  name: "Olaf",
  version: "Helping Hand",
  i18n: {
    en: {
      name: "Olaf",
      version: "Helping Hand",
      text: [
        {
          title: "SECOND CHANCE",
          description:
            "When this character leaves play, you may return chosen character of yours to your hand.",
        },
      ],
    },
    de: {
      name: "Olaf",
      version: "Helfende Hand",
      text: [
        {
          title: "ZWEITE CHANCE",
          description:
            "Wenn dieser Charakter das Spiel verlässt, darfst du einen deiner Charaktere wählen und ihn zurück auf deine Hand nehmen.",
        },
      ],
    },
    fr: {
      name: "Olaf",
      version: "Tend la main",
      text: [
        {
          title: "DEUXIÈME CHANCE",
          description:
            "Lorsque ce personnage quitte la zone de jeu, vous pouvez choisir l'un de vos personnages et le renvoyer dans votre main.",
        },
      ],
    },
    it: {
      name: "Olaf",
      version: "Mano Amica",
      text: [
        {
          title: "SECONDA OCCASIONE",
          description:
            "Quando questo personaggio lascia il gioco, puoi riprendere in mano un tuo personaggio a tua scelta.",
        },
      ],
    },
  },
  inkType: ["amethyst"],
  franchise: "Frozen",
  set: "010",
  cardNumber: 57,
  rarity: "uncommon",
  cost: 1,
  strength: 2,
  willpower: 1,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_e9f12c944cfb48bb98fc1a02e87bb6db",
    tcgPlayer: 659447,
  },
  text: [
    {
      title: "SECOND CHANCE",
      description:
        "When this character leaves play, you may return chosen character of yours to your hand.",
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
            cardTypes: ["character"],
          },
          type: "return-to-hand",
        },
        type: "optional",
      },
      id: "uix-1",
      name: "SECOND CHANCE",
      text: "SECOND CHANCE When this character leaves play, you may return chosen character of yours to your hand.",
      trigger: {
        event: "leave-play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
