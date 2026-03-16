import type { CharacterCard } from "@tcg/lorcana-types";

export const grammaTalaSpiritOfTheOceanEnchanted: CharacterCard = {
  id: "gsg",
  canonicalId: "ci_l6C",
  reprints: ["set3-143"],
  cardType: "character",
  name: "Gramma Tala",
  version: "Spirit of the Ocean",
  i18n: {
    en: {
      name: "Gramma Tala",
      version: "Spirit of the Ocean",
      text: [
        {
          title: "Shift 5",
        },
        {
          title: "DO YOU KNOW WHO YOU ARE?",
          description: "Whenever a card is put into your inkwell, gain 1 lore.",
        },
      ],
    },
    de: {
      name: "Gramma Tala",
      version: "Geist des Ozeans",
      text: "Gestaltwandel 5 WEISST DU, WER DU BIST? Jedes Mal, wenn eine Karte in deinen Tintenvorrat gelegt wird, sammelst du 1 Legende.",
    },
    fr: {
      name: "Grand-mère Tala",
      version: "Esprit de l'océan",
      text: "Alter 5 SAIS-TU QUI TU ES? Chaque fois qu'une carte est placée dans votre réserve d'encre, gagnez 1 éclat de Lore.",
    },
    it: {
      name: "Nonna Tala",
      version: "Spirito dell'Oceano",
      text: "Trasformazione 5 PUÒ RIVELARTI SOLO IL TUO CUORE CHI TU SIA Ogni volta che una carta vene aggiunta al tuo calamaio, ottieni 1 leggenda.",
    },
  },
  inkType: ["sapphire"],
  franchise: "Moana",
  set: "003",
  cardNumber: 217,
  rarity: "enchanted",
  specialRarity: "enchanted",
  cost: 7,
  strength: 4,
  willpower: 8,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_7ad03b4873f042bcae4da820a7061ba4",
    tcgPlayer: 539275,
  },
  text: [
    {
      title: "Shift 5",
    },
    {
      title: "DO YOU KNOW WHO YOU ARE?",
      description: "Whenever a card is put into your inkwell, gain 1 lore.",
    },
  ],
  classifications: ["Floodborn", "Mentor"],
  abilities: [
    {
      cost: {
        ink: 5,
      },
      id: "1xw-1",
      keyword: "Shift",
      text: "Shift 5",
      type: "keyword",
    },
    {
      effect: {
        amount: 1,
        type: "gain-lore",
      },
      id: "1xw-2",
      name: "DO YOU KNOW WHO YOU ARE?",
      text: "DO YOU KNOW WHO YOU ARE? Whenever a card is put into your inkwell, gain 1 lore.",
      trigger: {
        event: "ink",
        on: "CONTROLLER",
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
};
