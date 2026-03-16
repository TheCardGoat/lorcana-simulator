import type { CharacterCard } from "@tcg/lorcana-types";

export const magicaDeSpellShadowyAndSinister: CharacterCard = {
  id: "EI4",
  canonicalId: "ci_EI4",
  reprints: ["set10-041"],
  cardType: "character",
  name: "Magica De Spell",
  version: "Shadowy and Sinister",
  i18n: {
    en: {
      name: "Magica De Spell",
      version: "Shadowy and Sinister",
      text: [
        {
          title: "DARK INCANTATION",
          description:
            "When you play this character, you may shuffle a card from chosen player's discard into their deck.",
        },
      ],
    },
    de: {
      name: "Gundel Gaukeley",
      version: "Schattenhaft und unheimlich",
      text: [
        {
          title: "DUNKLE BESCHWÖRUNG",
          description:
            "Wenn du diesen Charakter ausspielst, darfst du 1 Karte deiner Wahl aus einem Ablagestapel zurück in das zugehörige Deck mischen.",
        },
      ],
    },
    fr: {
      name: "Miss Tick",
      version: "Ombre sinistre",
      text: [
        {
          title: "INCANTATION TÉNÉBREUSE",
          description:
            "Lorsque vous jouez ce personnage, vous pouvez choisir un joueur et mélanger une carte de sa défausse dans sa pioche.",
        },
      ],
    },
    it: {
      name: "Amelia",
      version: "Tenebrosa e Sinistra",
      text: [
        {
          title: "INCANTO OSCURO",
          description:
            "Quando giochi questo personaggio, puoi mescolare una carta dagli scarti di un giocatore a tua scelta nel suo mazzo.",
        },
      ],
    },
  },
  inkType: ["amethyst"],
  franchise: "Ducktales",
  set: "010",
  cardNumber: 41,
  rarity: "common",
  cost: 3,
  strength: 3,
  willpower: 4,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_6f5c4ee5c5ee4479be8ad253eb275033",
    tcgPlayer: 659459,
  },
  text: [
    {
      title: "DARK INCANTATION",
      description:
        "When you play this character, you may shuffle a card from chosen player's discard into their deck.",
    },
  ],
  classifications: ["Storyborn", "Villain", "Sorcerer"],
  abilities: [
    {
      effect: {
        chooser: "CONTROLLER",
        effect: {
          intoDeck: "owner",
          target: {
            selector: "chosen",
            count: 1,
            owner: "any",
            zones: ["play"],
            cardTypes: ["card"],
          },
          type: "shuffle-into-deck",
        },
        type: "optional",
      },
      id: "1l8-1",
      name: "DARK INCANTATION",
      text: "DARK INCANTATION When you play this character, you may shuffle a card from chosen player's discard into their deck.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
