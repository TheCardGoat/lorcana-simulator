import type { LocationCard } from "@tcg/lorcana-types";

export const merlinsCottageTheWizardsHome: LocationCard = {
  id: "yVb",
  canonicalId: "ci_yVb",
  reprints: ["set5-170"],
  cardType: "location",
  name: "Merlin's Cottage",
  version: "The Wizard's Home",
  i18n: {
    en: {
      name: "Merlin's Cottage",
      version: "The Wizard's Home",
      text: [
        {
          title: "KNOWLEDGE IS POWER",
          description: "Each player plays with the top card of their deck face up.",
        },
      ],
    },
    de: {
      name: "Merlins Hütte",
      version: "Das Haus des Zauberers",
      text: [
        {
          title: "WISSEN IST MACHT Alle Mitspielenden",
          description: "(auch du) spielen mit der obersten Karte ihres Decks offen.",
        },
      ],
    },
    fr: {
      name: "Chaumière de Merlin",
      version: "Foyer du sorcier",
      text: [
        {
          title: "LE SAVOIR, C'EST LE POUVOIR",
          description: "Chaque joueur joue avec la carte du dessus de sa pioche révélée.",
        },
      ],
    },
    it: {
      name: "Casetta di Merlino",
      version: "La Casa del Mago",
      text: [
        {
          title: "LA CONOSCENZA È POTERE",
          description: "Ogni giocatore gioca con la prima carta del suo mazzo a faccia in su.",
        },
      ],
    },
  },
  inkType: ["sapphire"],
  franchise: "Sword in the Stone",
  set: "005",
  cardNumber: 170,
  rarity: "uncommon",
  cost: 1,
  willpower: 7,
  moveCost: 1,
  lore: 0,
  inkable: true,
  externalIds: {
    lorcast: "crd_cc13be0e046742f4ae3e0aaffb5d3f9e",
    tcgPlayer: 559715,
  },
  text: [
    {
      title: "KNOWLEDGE IS POWER",
      description: "Each player plays with the top card of their deck face up.",
    },
  ],
  abilities: [
    {
      id: "fdq-1",
      name: "KNOWLEDGE IS POWER",
      text: "KNOWLEDGE IS POWER Each player plays with the top card of their deck face up.",
      type: "static",
      effect: {
        type: "reveal-top-card",
        target: "EACH_PLAYER",
      },
    },
  ],
};
