import type { CharacterCard } from "@tcg/lorcana-types";

export const princeJohnGoldLover: CharacterCard = {
  id: "1ju",
  canonicalId: "ci_1ju",
  reprints: ["set5-147"],
  cardType: "character",
  name: "Prince John",
  version: "Gold Lover",
  i18n: {
    en: {
      name: "Prince John",
      version: "Gold Lover",
      text: [
        {
          title: "BEAUTIFUL, LOVELY TAXES",
          description:
            "{E} — Play an item from your hand or discard with cost 5 or less for free, exerted.",
        },
      ],
    },
    de: {
      name: "Prinz John",
      version: "Goldliebhaber",
      text: [
        {
          title: "WUNDERSCHÖNE, LIEBLICHE STEUERN",
          description:
            "— Spiele einen Gegenstand, der 5 oder weniger kostet, von deiner Hand oder aus deinem Ablagestapel kostenlos und erschöpft aus.",
        },
      ],
    },
    fr: {
      name: "Prince Jean",
      version: "Amateur d'or",
      text: [
        {
          title: "MAGNIFIQUES TAXES",
          description:
            "— Jouez gratuitement un objet coûtant 5 ou moins de votre main ou de votre défausse. Il entre en jeu épuisé.",
        },
      ],
    },
    it: {
      name: "Principe Giovanni",
      version: "Amante dell'Oro",
      text: [
        {
          title: "BELLISSIME, ADORABILI TASSE",
          description:
            "— Gioca gratis un oggetto dalla tua mano o dai tuoi scarti con costo 5 o inferiore, impegnato.",
        },
      ],
    },
  },
  inkType: ["sapphire"],
  franchise: "Robin Hood",
  set: "005",
  cardNumber: 147,
  rarity: "common",
  cost: 4,
  strength: 3,
  willpower: 4,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_b6134218a3104ed7b31df482ccb0b0a9",
    tcgPlayer: 556435,
  },
  text: [
    {
      title: "BEAUTIFUL, LOVELY TAXES",
      description:
        "{E} — Play an item from your hand or discard with cost 5 or less for free, exerted.",
    },
  ],
  classifications: ["Storyborn", "Villain", "Prince"],
  abilities: [
    {
      cost: {
        exert: true,
      },
      effect: {
        cost: "free",
        costRestriction: {
          comparison: "less-or-equal",
          value: 5,
        },
        from: "hand",
        type: "play-card",
      },
      id: "1b5-1",
      text: "BEAUTIFUL, LOVELY TAXES {E} — Play an item from your hand or discard with cost 5 or less for free, exerted.",
      type: "activated",
    },
  ],
};
