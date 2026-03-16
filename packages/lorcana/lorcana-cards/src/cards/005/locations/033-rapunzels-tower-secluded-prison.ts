import type { LocationCard } from "@tcg/lorcana-types";

export const rapunzelsTowerSecludedPrison: LocationCard = {
  id: "RU5",
  canonicalId: "ci_RU5",
  reprints: ["set5-033"],
  cardType: "location",
  name: "Rapunzel's Tower",
  version: "Secluded Prison",
  i18n: {
    en: {
      name: "Rapunzel's Tower",
      version: "Secluded Prison",
      text: [
        {
          title: "SAFE AND SOUND",
          description: "Characters get +3 {W} while here.",
        },
      ],
    },
    de: {
      name: "Rapunzels Turm",
      version: "Abgelegenes Gefängnis",
      text: [
        {
          title: "DAMIT DIR NICHTS GESCHIEHT",
          description: "Charaktere an diesem Ort erhalten +3.",
        },
      ],
    },
    fr: {
      name: "Tour de Raiponce",
      version: "Prison cachée",
      text: [
        {
          title: "POUR QU'IL NE T'ARRIVE RIEN",
          description: "Les personnages sur ce lieu gagnent +3.",
        },
      ],
    },
    it: {
      name: "Torre di Rapunzel",
      version: "Prigione Isolata",
      text: [
        {
          title: "VEGLIO SU DI TE I",
          description: "personaggi ricevono +3 mentre si trovano in questo luogo.",
        },
      ],
    },
  },
  inkType: ["amber"],
  franchise: "Tangled",
  set: "005",
  cardNumber: 33,
  rarity: "uncommon",
  cost: 2,
  willpower: 8,
  moveCost: 1,
  lore: 0,
  inkable: true,
  externalIds: {
    lorcast: "crd_f27b7d5ae80b49c4a1a6019138a14ace",
    tcgPlayer: 560916,
  },
  text: [
    {
      title: "SAFE AND SOUND",
      description: "Characters get +3 {W} while here.",
    },
  ],
  abilities: [
    {
      effect: {
        modifier: 3,
        stat: "willpower",
        target: "CHARACTERS_HERE",
        type: "modify-stat",
      },
      id: "vng-1",
      name: "SAFE AND SOUND",
      text: "SAFE AND SOUND Characters get +3 {W} while here.",
      type: "static",
    },
  ],
};
