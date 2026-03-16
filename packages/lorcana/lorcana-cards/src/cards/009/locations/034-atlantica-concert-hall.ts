import type { LocationCard } from "@tcg/lorcana-types";

export const atlanticaConcertHall: LocationCard = {
  id: "WHL",
  canonicalId: "ci_b67",
  reprints: ["set4-033", "set9-034"],
  cardType: "location",
  name: "Atlantica",
  version: "Concert Hall",
  i18n: {
    en: {
      name: "Atlantica",
      version: "Concert Hall",
      text: [
        {
          title: "UNDERWATER ACOUSTICS",
          description: "Characters count as having +2 cost to sing songs while here.",
        },
      ],
    },
    de: {
      name: "Atlantica",
      version: "Konzertsaal",
      text: [
        {
          title: "AKUSTIK UNTER WASSER",
          description:
            "Die Kosten von Charakteren an diesem Ort gelten als +2 für das Singen von Liedern.",
        },
      ],
    },
    fr: {
      name: "Atlantica",
      version: "Salle de concert",
      text: [
        {
          title: "ACOUSTIQUE SOUS-MARINE",
          description:
            "Les personnages sur ce lieu sont considérés comme ayant un coût de +2 pour chanter des chansons.",
        },
      ],
    },
    it: {
      name: "Atlantica",
      version: "Sala dei Concerti",
      text: [
        {
          title: "ACUSTICA SUBACQUEA I",
          description:
            "personaggi contano come di costo +2 per cantare le canzoni mentre si trovano in questo luogo.",
        },
      ],
    },
  },
  inkType: ["amber"],
  franchise: "Little Mermaid",
  set: "009",
  cardNumber: 34,
  rarity: "common",
  cost: 1,
  willpower: 6,
  moveCost: 2,
  lore: 0,
  inkable: true,
  externalIds: {
    lorcast: "crd_74c2fa84872c4c68ac1eb0e2a7a8affc",
    tcgPlayer: 649981,
  },
  text: [
    {
      title: "UNDERWATER ACOUSTICS",
      description: "Characters count as having +2 cost to sing songs while here.",
    },
  ],
  abilities: [
    {
      id: "6b5-1",
      name: "UNDERWATER ACOUSTICS",
      text: "UNDERWATER ACOUSTICS Characters count as having +2 cost to sing songs while here.",
      type: "static",
      effect: {
        type: "property-modification",
        property: "singer-threshold",
        operation: "add",
        value: "2",
        target: "CHARACTERS_HERE",
      },
    },
  ],
};
