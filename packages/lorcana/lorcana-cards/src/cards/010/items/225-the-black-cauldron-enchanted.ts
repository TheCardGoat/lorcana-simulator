import type { ItemCard } from "@tcg/lorcana-types";

export const theBlackCauldronEnchanted: ItemCard = {
  id: "WLA",
  canonicalId: "ci_uoZ",
  reprints: ["set10-032"],
  cardType: "item",
  name: "The Black Cauldron",
  i18n: {
    en: {
      name: "The Black Cauldron",
      text: [
        {
          title: "THE CAULDRON CALLS",
          description:
            "{E}, 1 {I} — Put a character card from your discard under this item faceup.",
        },
        {
          title: "RISE AND JOIN ME!",
          description: "{E}, 1 {I} — This turn, you may play characters from under this item.",
        },
      ],
    },
    de: {
      name: "Der schwarze Zauberkessel",
      text: [
        {
          title: "DER KESSEL RUFT, 1",
          description:
            "— Lege 1 Charakterkarte aus deinem Ablagestapel offen unter diesen Gegenstand. STEHT AUF UND FOLGT MIR!, 1 — Du darfst in diesem Zug Charaktere ausspielen, die unter diesem Gegenstand liegen.",
        },
      ],
    },
    fr: {
      name: "Le Chaudron magique",
      text: [
        {
          title: "L'APPEL DU CHAUDRON, 1",
          description:
            "— Placez une carte Personnage de votre défausse sous cet objet, face visible. LEVEZ-VOUS ET JOIGNEZ-VOUS À MOI!, 1 — Pour le reste de ce tour, vous pouvez jouer les personnages placés sous cet objet.",
        },
      ],
    },
    it: {
      name: "La Pentola Magica",
      text: [
        {
          title: "IL RICHIAMO DELLA PENTOLA, 1",
          description:
            "— Metti una carta personaggio dai tuoi scarti sotto a questo oggetto, a faccia in su. ALZATEVI E UNITEVI A ME!, 1 — Per questo turno, puoi giocare i personaggi da sotto questo oggetto.",
        },
      ],
    },
  },
  inkType: ["amber"],
  franchise: "Black Cauldron",
  set: "010",
  cardNumber: 225,
  rarity: "enchanted",
  specialRarity: "enchanted",
  cost: 3,
  inkable: false,
  externalIds: {
    lorcast: "crd_24dfd54db49e4a5d8004c51d0882aa46",
    tcgPlayer: 658884,
  },
  text: [
    {
      title: "THE CAULDRON CALLS",
      description: "{E}, 1 {I} — Put a character card from your discard under this item faceup.",
    },
    {
      title: "RISE AND JOIN ME!",
      description: "{E}, 1 {I} — This turn, you may play characters from under this item.",
    },
  ],
  abilities: [],
};
