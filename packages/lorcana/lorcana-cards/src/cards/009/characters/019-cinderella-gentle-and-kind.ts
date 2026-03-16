import type { CharacterCard } from "@tcg/lorcana-types";

export const cinderellaGentleAndKind: CharacterCard = {
  id: "4II",
  canonicalId: "ci_Rrb",
  reprints: ["set1-003", "set9-019"],
  cardType: "character",
  name: "Cinderella",
  version: "Gentle and Kind",
  i18n: {
    en: {
      name: "Cinderella",
      version: "Gentle and Kind",
      text: [
        {
          title: "Singer 5",
        },
        {
          title: "A WONDERFUL DREAM",
          description: "{E} — Remove up to 3 damage from chosen Princess character.",
        },
      ],
    },
    de: {
      name: "Cinderella",
      version: "Behutsam und freundlich",
      text: [
        {
          title: "Singen 5",
          description:
            "(Die Kosten dieses Charakters gelten als 5 für das Singen von Liedern.) EIN WUNDERVOLLER TRAUM — Entferne bis zu 3 Schaden von einer Prinzessin deiner Wahl.",
        },
      ],
    },
    fr: {
      name: "CENDRILLON",
      version: "Douce et charmante",
      text: "Mélomane 5 (Ce personnage est considéré comme ayant un coût de 5 pour chanter des chansons.) UN RÊVE MAGNIFIQUE — Choisissez un personnage Princesse et retirez-lui jusqu'à 3 jetons Dommage.",
    },
    it: {
      name: "Cinderella",
      version: "Gentle and Kind",
      text: [
        {
          title: "Singer 5",
          description:
            "(This character counts as cost 5 to sing songs.) A WONDERFUL DREAM — Remove up to 3 damage from chosen Princess character.",
        },
      ],
    },
  },
  inkType: ["amber"],
  franchise: "Cinderella",
  set: "009",
  cardNumber: 19,
  rarity: "uncommon",
  cost: 4,
  strength: 2,
  willpower: 5,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_0ae012bfcad54631949412a2947a8f7d",
    tcgPlayer: 649967,
  },
  text: [
    {
      title: "Singer 5",
    },
    {
      title: "A WONDERFUL DREAM",
      description: "{E} — Remove up to 3 damage from chosen Princess character.",
    },
  ],
  classifications: ["Storyborn", "Hero", "Princess"],
  abilities: [
    {
      id: "14u-1",
      keyword: "Singer",
      text: "Singer 5",
      type: "keyword",
      value: 5,
    },
    {
      cost: {
        exert: true,
      },
      effect: {
        amount: 3,
        target: {
          cardTypes: ["character"],
          count: 1,
          owner: "any",
          selector: "chosen",
          zones: ["play"],
        },
        type: "remove-damage",
        upTo: true,
      },
      id: "14u-2",
      text: "A WONDERFUL DREAM {E} — Remove up to 3 damage from chosen Princess character.",
      type: "activated",
    },
  ],
};
