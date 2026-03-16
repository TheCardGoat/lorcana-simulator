import type { CharacterCard } from "@tcg/lorcana-types";

export const giantCobraGhostlySerpent: CharacterCard = {
  id: "FdJ",
  canonicalId: "ci_FdJ",
  reprints: ["set7-057"],
  cardType: "character",
  name: "Giant Cobra",
  version: "Ghostly Serpent",
  i18n: {
    en: {
      name: "Giant Cobra",
      version: "Ghostly Serpent",
      text: [
        {
          title: "Vanish",
          description: "(When an opponent chooses this character for an action, banish them.)",
        },
        {
          title: "MYSTERIOUS ADVANTAGE",
          description:
            "When you play this character, you may choose and discard a card to gain 2 lore.",
        },
      ],
    },
    de: {
      name: "Riesenkobra",
      version: "Geisterhafte Schlange",
      text: [
        {
          title: "Verschwinden",
          description:
            "(Jedes Mal, wenn dieser Charakter von einer Aktion einer gegnerischen Person ausgewählt wird, verbanne ihn.) MYSTERIÖSER VORTEIL Wenn du diesen Charakter ausspielst, darfst du eine Karte von deiner Hand auswählen und abwerfen, um 2 Legenden zu sammeln.",
        },
      ],
    },
    fr: {
      name: "Cobra géant",
      version: "Serpent fantomatique",
      text: [
        {
          title: "Dissipation",
          description:
            "(Lorsqu'un adversaire choisit ce personnage avec une action, bannissez-le.) MYSTÉRIEUX AVANTAGE Lorsque vous jouez ce personnage, vous pouvez défausser une carte pour gagner 2 éclats de Lore.",
        },
      ],
    },
    it: {
      name: "Cobra Gigante",
      version: "Serpente Spettrale",
      text: [
        {
          title: "Svanire",
          description:
            "(Quando un avversario sceglie questo personaggio per un'azione, esilialo.) VANTAGGIO MISTERIOSO Quando giochi questo personaggio, puoi scegliere e scartare una carta per ottenere 2 leggenda.",
        },
      ],
    },
  },
  inkType: ["amethyst", "steel"],
  franchise: "Aladdin",
  set: "007",
  cardNumber: 57,
  rarity: "uncommon",
  cost: 3,
  strength: 4,
  willpower: 4,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_e83395def01e4f76b670fd014c79d440",
    tcgPlayer: 618174,
  },
  text: [
    {
      title: "Vanish",
      description: "(When an opponent chooses this character for an action, banish them.)",
    },
    {
      title: "MYSTERIOUS ADVANTAGE",
      description:
        "When you play this character, you may choose and discard a card to gain 2 lore.",
    },
  ],
  classifications: ["Dreamborn", "Ally", "Illusion"],
  abilities: [
    {
      id: "1bh-1",
      keyword: "Vanish",
      text: "Vanish",
      type: "keyword",
    },
    {
      effect: {
        chooser: "CONTROLLER",
        effect: {
          amount: 2,
          type: "gain-lore",
        },
        type: "optional",
      },
      id: "1bh-2",
      name: "MYSTERIOUS ADVANTAGE",
      text: "MYSTERIOUS ADVANTAGE When you play this character, you may choose and discard a card to gain 2 lore.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
