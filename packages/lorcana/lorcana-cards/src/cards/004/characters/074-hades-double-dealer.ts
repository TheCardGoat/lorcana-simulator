import type { CharacterCard } from "@tcg/lorcana-types";

export const hadesDoubleDealer: CharacterCard = {
  id: "V9W",
  canonicalId: "ci_V9W",
  reprints: ["set4-074"],
  cardType: "character",
  name: "Hades",
  version: "Double Dealer",
  i18n: {
    en: {
      name: "Hades",
      version: "Double Dealer",
      text: [
        {
          title: "HERE'S THE TRADE-OFF",
          description:
            "{E}, Banish one of your other characters — Play a character with the same name as the banished character for free.",
        },
      ],
    },
    de: {
      name: "Hades",
      version: "Falsches Spiel",
      text: [
        {
          title: "NUN ZUM",
          description:
            "GESCHÄFT, Verbanne einen deiner anderen Charaktere — Spiele einen Charakter mit demselben Namen wie der verbannte Charakter, kostenlos aus.",
        },
      ],
    },
    fr: {
      name: "Hadès",
      version: "Double jeu",
      text: [
        {
          title: "VOILÀ LE MARCHÉ,",
          description:
            "Bannissez l'un de vos autres personnages — Jouez gratuitement un personnage de votre main portant le même nom que le personnage banni.",
        },
      ],
    },
    it: {
      name: "Ade",
      version: "Doppiogiochista",
      text: [
        {
          title: "FACCIAMO UNO SCAMBIO,",
          description:
            "esilia uno dei tuoi altri personaggi — Gioca un personaggio con lo stesso nome di quello che hai esiliato, gratis.",
        },
      ],
    },
  },
  inkType: ["emerald"],
  franchise: "Hercules",
  set: "004",
  cardNumber: 74,
  rarity: "legendary",
  cost: 4,
  strength: 3,
  willpower: 3,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_56206ef4f9ec4b82afc4a656d41e5ba4",
    tcgPlayer: 550575,
  },
  text: [
    {
      title: "HERE'S THE TRADE-OFF",
      description:
        "{E}, Banish one of your other characters — Play a character with the same name as the banished character for free.",
    },
  ],
  classifications: ["Storyborn", "Villain", "Deity"],
  abilities: [
    {
      cost: {
        exert: true,
      },
      effect: {
        cardType: "character",
        cost: "free",
        from: "hand",
        type: "play-card",
      },
      id: "i41-1",
      text: "HERE'S THE TRADE-OFF {E}, Banish one of your other characters — Play a character with the same name as the banished character for free.",
      type: "activated",
    },
  ],
};
