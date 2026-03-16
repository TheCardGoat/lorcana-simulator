import type { LocationCard } from "@tcg/lorcana-types";

export const illuminaryTunnelsLinkedCaverns: LocationCard = {
  id: "YpL",
  canonicalId: "ci_YpL",
  reprints: ["set10-202"],
  cardType: "location",
  name: "Illuminary Tunnels",
  version: "Linked Caverns",
  i18n: {
    en: {
      name: "Illuminary Tunnels",
      version: "Linked Caverns",
      text: [
        {
          title: "SUBTERRANEAN NETWORK",
          description:
            "While you have a character here, this location gets +1 {L} for each other location you have in play.",
        },
        {
          title: "LOCUS",
          description: "While you have a character here, you pay 1 {I} less to play locations.",
        },
      ],
    },
    de: {
      name: "Tunnel im Illuminarium",
      version: "Verbundene Höhlen",
      text: [
        {
          title: "UNTERIRDISCHES NETZWERK",
          description:
            "Solange du mindestens einen Charakter an diesem Ort hast, erhält dieser Ort +1 für jeden anderen Ort, den du im Spiel hast.",
        },
        {
          title: "LOCUS",
          description:
            "Solange du mindestens einen Charakter an diesem Ort hast, zahlst du 1 weniger, um Orte auszuspielen.",
        },
      ],
    },
    fr: {
      name: "Tunnels de l'Illuminarium",
      version: "Cavernes reliées",
      text: [
        {
          title: "RÉSEAU SOUTERRAIN",
          description:
            "Tant que vous avez un personnage sur ce lieu, ce lieu gagne +1 pour chaque autre lieu que vous avez en jeu.",
        },
        {
          title: "LOCUS",
          description:
            "Tant que vous avez un personnage sur ce lieu, jouer un lieu vous coûte 1 de moins.",
        },
      ],
    },
    it: {
      name: "Tunnel dell'Illuminarium",
      version: "Rete di Caverne",
      text: [
        {
          title: "RETE SOTTERRANEA",
          description:
            "Mentre hai un personaggio in questo luogo, questo luogo riceve +1 per ogni altro luogo che hai in gioco.",
        },
        {
          title: "LOCUS",
          description:
            "Mentre hai un personaggio in questo luogo, paga 1 in meno per giocare i luoghi.",
        },
      ],
    },
  },
  inkType: ["steel"],
  franchise: "Lorcana",
  set: "010",
  cardNumber: 202,
  rarity: "common",
  cost: 3,
  willpower: 6,
  moveCost: 1,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_f0d2c7f7fb9243bdb38b6c1e5eb522cd",
    tcgPlayer: 658460,
  },
  text: [
    {
      title: "SUBTERRANEAN NETWORK",
      description:
        "While you have a character here, this location gets +1 {L} for each other location you have in play.",
    },
    {
      title: "LOCUS",
      description: "While you have a character here, you pay 1 {I} less to play locations.",
    },
  ],
  abilities: [
    {
      id: "YpL-1",
      name: "SUBTERRANEAN NETWORK",
      text: "SUBTERRANEAN NETWORK While you have a character here, this location gets +1 {L} for each other location you have in play.",
      type: "static",
      condition: {
        type: "target-query",
        query: {
          selector: "all",
          owner: "you",
          zones: ["play"],
          cardType: "character",
          filter: [
            {
              type: "same-location-as-source",
            },
          ],
        },
        comparison: {
          operator: "gte",
          value: 1,
        },
      },
      effect: {
        type: "modify-stat",
        stat: "lore",
        modifier: {
          type: "filtered-count",
          owner: "you",
          zones: ["play"],
          cardType: "location",
          excludeSelf: true,
          filters: [],
        },
        target: "SELF",
      },
    },
    {
      id: "YpL-2",
      name: "LOCUS",
      text: "LOCUS While you have a character here, you pay 1 {I} less to play locations.",
      type: "static",
      condition: {
        type: "target-query",
        query: {
          selector: "all",
          owner: "you",
          zones: ["play"],
          cardType: "character",
          filter: [
            {
              type: "same-location-as-source",
            },
          ],
        },
        comparison: {
          operator: "gte",
          value: 1,
        },
      },
      effect: {
        type: "cost-reduction",
        amount: 1,
        cardType: "location",
      },
    },
  ],
};
