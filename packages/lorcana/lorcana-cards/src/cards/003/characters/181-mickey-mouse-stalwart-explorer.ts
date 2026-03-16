import type { CharacterCard } from "@tcg/lorcana-types";

export const mickeyMouseStalwartExplorer: CharacterCard = {
  id: "tp9",
  canonicalId: "ci_tp9",
  reprints: ["set3-181"],
  cardType: "character",
  name: "Mickey Mouse",
  version: "Stalwart Explorer",
  i18n: {
    en: {
      name: "Mickey Mouse",
      version: "Stalwart Explorer",
      text: [
        {
          title: "LET'S TAKE A LOOK",
          description: "This character gets +1 {S} for each location you have in play.",
        },
      ],
    },
    de: {
      name: "Micky Maus",
      version: "Unerschütterlicher Entdecker",
      text: [
        {
          title: "SCHAUEN WIR UNS DAS MAL AN",
          description: "Dieser Charakter erhält +1 für jeden Ort, den du im Spiel hast.",
        },
      ],
    },
    fr: {
      name: "Mickey Mouse",
      version: "Vaillant explorateur",
      text: [
        {
          title: "ALLONS JETER UN ŒIL",
          description: "Ce personnage gagne +1 pour chaque lieu que vous avez en jeu.",
        },
      ],
    },
    it: {
      name: "Topolino",
      version: "Prode Esploratore",
      text: [
        {
          title: "DIAMO UN'OCCHIATA",
          description: "Questo personaggio riceve +1 per ogni luogo che hai in gioco.",
        },
      ],
    },
  },
  inkType: ["steel"],
  set: "003",
  cardNumber: 181,
  rarity: "common",
  cost: 3,
  strength: 3,
  willpower: 3,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_6910c7f861604c41b2921961ebf886d1",
    tcgPlayer: 539109,
  },
  text: [
    {
      title: "LET'S TAKE A LOOK",
      description: "This character gets +1 {S} for each location you have in play.",
    },
  ],
  classifications: ["Dreamborn", "Hero"],
  missingTests: true,
  abilities: [
    {
      effect: {
        modifier: 1,
        stat: "strength",
        target: "SELF",
        type: "modify-stat",
      },
      id: "j8w-1",
      text: "LET'S TAKE A LOOK This character gets +1 {S} for each location you have in play.",
      type: "static",
    },
  ],
};
