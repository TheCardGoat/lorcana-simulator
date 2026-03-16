import type { ItemCard } from "@tcg/lorcana-types";

export const theMagicFeather: ItemCard = {
  id: "sHD",
  canonicalId: "ci_sHD",
  reprints: ["set9-064"],
  cardType: "item",
  name: "The Magic Feather",
  i18n: {
    en: {
      name: "The Magic Feather",
      text: [
        {
          title: "NOW YOU CAN FLY!",
          description:
            "When you play this item, choose a character of yours. While this item is in play, that character gains Evasive.",
        },
        {
          title: "GROUNDED 3",
          description: "{I} — Return this item to your hand.",
        },
      ],
    },
    de: {
      name: "Die magische Feder",
      text: [
        {
          title: "JETZT KANNST DU FLIEGEN!",
          description:
            "Wenn du diesen Gegenstand ausspielst, wähle einen deiner Charaktere. Solange dieser Gegenstand im Spiel ist, erhält jener Charakter Wendig. GEERDET 3 — Nimm diesen Gegenstand zurück auf deine Hand.",
        },
      ],
    },
    fr: {
      name: "La plume magique",
      text: [
        {
          title: "TU VAS POUVOIR VOLER!",
          description:
            "Lorsque vous jouez cet objet, choisissez l'un de vos personnages. Tant que cet objet est en jeu, le personnage ainsi choisi gagne Insaisissable. AU SOL 3 — Renvoyez cet objet dans votre main.",
        },
      ],
    },
    it: {
      name: "La Piuma Magica",
      text: [
        {
          title: "ORA POTRAI VOLARE!",
          description:
            "Quando giochi questo oggetto, scegli un tuo personaggio. Mentre questo oggetto è in gioco, quel personaggio ottiene Sfuggente. (Solo altri personaggi con Sfuggente possono sfidarlo.) A TERRA 3 — Riprendi in mano questo oggetto.",
        },
      ],
    },
  },
  inkType: ["amethyst"],
  franchise: "Dumbo",
  set: "009",
  cardNumber: 64,
  rarity: "rare",
  cost: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_34d603519eae499991189bf1efc0207c",
    tcgPlayer: 647677,
  },
  text: [
    {
      title: "NOW YOU CAN FLY!",
      description:
        "When you play this item, choose a character of yours. While this item is in play, that character gains Evasive.",
    },
    {
      title: "GROUNDED 3",
      description: "{I} — Return this item to your hand.",
    },
  ],
  abilities: [
    {
      cost: {
        ink: 3,
      },
      effect: {
        target: {
          cardTypes: ["item"],
          count: 1,
          owner: "you",
          selector: "self",
          zones: ["play"],
        },
        type: "return-to-hand",
      },
      id: "cfx-2",
      name: "GROUNDED 3",
      text: "GROUNDED 3 {I} — Return this item to your hand.",
      type: "activated",
    },
  ],
};
