import type { ItemCard } from "@tcg/lorcana-types";

export const enigmaticInkcaster: ItemCard = {
  id: "Nmx",
  canonicalId: "ci_Nmx",
  reprints: ["set10-100"],
  cardType: "item",
  name: "Enigmatic Inkcaster",
  i18n: {
    en: {
      name: "Enigmatic Inkcaster",
      text: [
        {
          title: "ITS OWN REWARD",
          description: "{E} — If you've played 2 or more cards this turn, gain 1 lore.",
        },
      ],
    },
    de: {
      name: "Rätselhafter Tintenformer",
      text: [
        {
          title: "SEINE EIGENE BELOHNUNG",
          description:
            "— Falls du in diesem Zug mindestens 2 Karten ausgespielt hast, sammelst du 1 Legende.",
        },
      ],
    },
    fr: {
      name: "Invocateur d’encre mystérieux",
      text: [
        {
          title: "UNE",
          description:
            "RÉCOMPENSE EN SOI — Si vous avez joué 2 cartes ou plus ce tour-ci, gagnez 1 éclat de Lore.",
        },
      ],
    },
    it: {
      name: "Inchiostratore Enigmatico",
      text: [
        {
          title: "UNA RICOMPENSA DI PER",
          description: "SÉ — Se hai giocato 2 o più carte in questo turno, ottieni 1 leggenda.",
        },
      ],
    },
  },
  inkType: ["emerald"],
  franchise: "Lorcana",
  set: "010",
  cardNumber: 100,
  rarity: "rare",
  cost: 2,
  inkable: false,
  externalIds: {
    lorcast: "crd_d774288aca6149239c554da4daab38b4",
    tcgPlayer: 659453,
  },
  text: [
    {
      title: "ITS OWN REWARD",
      description: "{E} — If you've played 2 or more cards this turn, gain 1 lore.",
    },
  ],
  abilities: [],
};
