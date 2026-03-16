import type { LocationCard } from "@tcg/lorcana-types";

export const scroogesCountingHouseEbenezersOffice: LocationCard = {
  id: "Qwc",
  canonicalId: "ci_Qwc",
  reprints: ["set11-134"],
  cardType: "location",
  name: "Scrooge's Counting House",
  version: "Ebenezer's Office",
  i18n: {
    en: {
      name: "Scrooge's Counting House",
      version: "Ebenezer's Office",
      text: [
        {
          title: "Boost 2 {I}",
          description:
            "(Once during your turn, you may pay 2 {I} to put the top card of your deck facedown under this location.)",
        },
        {
          title: "Good Business This location gets +1 {W} and +1 {L} for each card under it.",
        },
      ],
    },
    de: {
      name: "Scrooges Schatzmeisterei",
      version: "Ebenezers Büro",
      text: "Stärken 2 GUTES GESCHÄFT Dieser Ort erhält für jede Karte unter ihm +1 und +1.",
    },
    fr: {
      name: "Maison de comptage de Scrooge",
      version: "Bureau d'Ebenezer",
      text: [
        {
          title: "Boost 2",
          description:
            "(Une fois durant votre tour, vous pouvez payer 2 pour placer la carte du dessus de votre pioche sous ce lieu, face cachée.) BONNES AFFAIRES Ce lieu gagne +1 et +1 pour chaque carte sous lui.",
        },
      ],
    },
    it: {
      name: "Ufficio Contabile di Scrooge",
      version: "Scrivania di Ebenezer",
      text: [
        {
          title: "Potenziamento 2",
          description:
            "(Una volta durante il tuo turno, puoi pagare 2 per mettere la prima carta del tuo mazzo a faccia in giù sotto a questo luogo.) BUONI AFFARI Questo luogo riceve +1 e +1 per ogni carta sotto di sé.",
        },
      ],
    },
  },
  inkType: ["ruby"],
  franchise: "Mickey's Christmas Carol",
  set: "011",
  cardNumber: 134,
  rarity: "uncommon",
  cost: 2,
  willpower: 4,
  moveCost: 1,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_889f6b26a5a746d6a6cbe4139412855a",
    tcgPlayer: 676216,
  },
  text: [
    {
      title: "Boost 2 {I}",
      description:
        "(Once during your turn, you may pay 2 {I} to put the top card of your deck facedown under this location.)",
    },
    {
      title: "Good Business This location gets +1 {W} and +1 {L} for each card under it.",
    },
  ],
  abilities: [
    {
      id: "v62-1",
      keyword: "Boost",
      type: "keyword",
      value: 2,
      text: "Boost 2 {I}",
    },
    {
      id: "v62-2",
      effect: {
        modifier: {
          type: "cards-under-self",
        },
        stat: "willpower",
        target: "SELF",
        type: "modify-stat",
      },
      type: "static",
      text: "Good Business This location gets +1 {W} and +1 {L} for each card under it.",
    },
    {
      id: "v62-3",
      effect: {
        modifier: {
          type: "cards-under-self",
        },
        stat: "lore",
        target: "SELF",
        type: "modify-stat",
      },
      type: "static",
      text: "Good Business This location gets +1 {W} and +1 {L} for each card under it.",
    },
  ],
};
