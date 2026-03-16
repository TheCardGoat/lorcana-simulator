import type { CharacterCard } from "@tcg/lorcana-types";

export const lyleTiberiusRourkeCrystallizedMercenary: CharacterCard = {
  id: "AnC",
  canonicalId: "ci_AnC",
  reprints: ["set7-140"],
  cardType: "character",
  name: "Lyle Tiberius Rourke",
  version: "Crystallized Mercenary",
  i18n: {
    en: {
      name: "Lyle Tiberius Rourke",
      version: "Crystallized Mercenary",
      text: [
        {
          title: "EXPLOSIVE",
          description:
            "Once during your turn, whenever a card is put into your inkwell, deal 2 damage to each character in play.",
        },
      ],
    },
    de: {
      name: "Lyle Tiberius Rourke",
      version: "Kristallisierter Söldner",
      text: [
        {
          title: "EXPLOSIV",
          description:
            "Einmal während deines Zuges, wenn eine Karte in deinen Tintenvorrat gelegt wird, füge jedem Charakter 2 Schaden zu.",
        },
      ],
    },
    fr: {
      name: "Lyle Tiberius Rourke",
      version: "Mercenaire cristallisé",
      text: [
        {
          title: "EXPLOSIF",
          description:
            "Une seule fois durant votre tour, lorsqu'une carte est placée dans votre réserve d'encre, infligez 2 dommages à chaque personnage en jeu.",
        },
      ],
    },
    it: {
      name: "Lyle Tiberius Rourke",
      version: "Mercenario Cristallizzato",
      text: [
        {
          title: "ESPLOSIVO",
          description:
            "Una volta durante il tuo turno, ogni volta che una carta viene aggiunta al tuo calamaio, infliggi 2 danni a ogni personaggio in gioco.",
        },
      ],
    },
  },
  inkType: ["ruby"],
  franchise: "Atlantis",
  set: "007",
  cardNumber: 140,
  rarity: "rare",
  cost: 8,
  strength: 6,
  willpower: 4,
  lore: 3,
  inkable: true,
  externalIds: {
    lorcast: "crd_4ba6dbe9f2674bb880ec26795a4663c6",
    tcgPlayer: 619485,
  },
  text: [
    {
      title: "EXPLOSIVE",
      description:
        "Once during your turn, whenever a card is put into your inkwell, deal 2 damage to each character in play.",
    },
  ],
  classifications: ["Storyborn", "Villain"],
  abilities: [
    {
      effect: {
        amount: 2,
        target: {
          cardTypes: ["character"],
          count: "all",
          owner: "any",
          selector: "all",
          zones: ["play"],
        },
        type: "deal-damage",
      },
      id: "1ug-1",
      name: "EXPLOSIVE Once",
      text: "EXPLOSIVE Once during your turn, whenever a card is put into your inkwell, deal 2 damage to each character in play.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
