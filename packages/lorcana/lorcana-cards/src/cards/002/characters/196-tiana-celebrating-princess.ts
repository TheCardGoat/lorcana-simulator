import type { CharacterCard } from "@tcg/lorcana-types";

export const tianaCelebratingPrincess: CharacterCard = {
  id: "ivr",
  canonicalId: "ci_ivr",
  reprints: ["set2-196"],
  cardType: "character",
  name: "Tiana",
  version: "Celebrating Princess",
  i18n: {
    en: {
      name: "Tiana",
      version: "Celebrating Princess",
      text: [
        {
          title: "Resist +2",
        },
        {
          title: "WHAT YOU GIVE IS WHAT YOU GET",
          description:
            "While this character is exerted and you have no cards in your hand, opponents can't play actions.",
        },
      ],
    },
    de: {
      name: "Tiana",
      version: "Festliche Prinzessin",
      text: "Robust +2 (Reduziere jeglichen Schaden, der diesem Charakter zugefügt wird, um 2.) WAS DU GIBST IST WAS DU KRIEGST Solange dieser Charakter erschöpft ist und du keine Karten auf der Hand hast, können gegnerische Mitspielende keine Aktionen ausspielen.",
    },
    fr: {
      name: "Tiana",
      version: "Princesse en fête",
      text: "Résistance +2 LE SUCCÈS DÉPEND DE TOI Tant que ce personnage est épuisé et que vous n'avez aucune carte en main, vos adversaires ne peuvent pas jouer de cartes Action.",
    },
    it: {
      name: "Tiana",
      version: "Celebrating Princess",
      text: "Resist +2 (Damage dealt to this character is reduced by 2.) WHAT YOU GIVE IS WHAT YOU GET While this character is exerted and you have no cards in your hand, opponents can't play actions.",
    },
  },
  inkType: ["steel"],
  franchise: "Princess and the Frog",
  set: "002",
  cardNumber: 196,
  rarity: "common",
  cost: 4,
  strength: 1,
  willpower: 4,
  lore: 2,
  inkable: false,
  externalIds: {
    lorcast: "crd_5879c143b9484d898408440f80e8531e",
    tcgPlayer: 516398,
  },
  text: [
    {
      title: "Resist +2",
    },
    {
      title: "WHAT YOU GIVE IS WHAT YOU GET",
      description:
        "While this character is exerted and you have no cards in your hand, opponents can't play actions.",
    },
  ],
  classifications: ["Dreamborn", "Hero", "Princess"],
  missingTests: true,
  abilities: [
    {
      id: "14e-1",
      keyword: "Resist",
      text: "Resist +2",
      type: "keyword",
      value: 2,
    },
    {
      effect: {
        from: "hand",
        type: "play-card",
      },
      id: "14e-2",
      text: "WHAT YOU GIVE IS WHAT YOU GET While this character is exerted and you have no cards in your hand, opponents can't play actions.",
      type: "static",
    },
  ],
};
