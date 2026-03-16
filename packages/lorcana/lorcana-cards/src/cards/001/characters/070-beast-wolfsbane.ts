import type { CharacterCard } from "@tcg/lorcana-types";

export const beastWolfsbane: CharacterCard = {
  id: "bXY",
  canonicalId: "ci_bXY",
  reprints: ["set1-070"],
  cardType: "character",
  name: "Beast",
  version: "Wolfsbane",
  i18n: {
    en: {
      name: "Beast",
      version: "Wolfsbane",
      text: [
        {
          title: "Rush",
        },
        {
          title: "ROAR",
          description: "When you play this character, exert all opposing damaged characters.",
        },
      ],
    },
    de: {
      name: "Biest",
      version: "Schrecken der Wölfe",
      text: "Rasant BRÜLLEN Wenn du diesen Charakter ausspielst, erschöpfe alle gegnerischen beschädigten Charaktere.",
    },
    fr: {
      name: "LA BÊTE",
      version: "Fléau des loups",
      text: "Charge RUGISSEMENT Lorsque vous jouez ce personnage, épuisez tous les personnages adverses ayant des jetons Dommage.",
    },
    it: {
      name: "Beast",
      version: "Wolfsbane",
      text: [
        {
          title: "Rush",
          description:
            "(This character can challenge the turn they're played.) ROAR When you play this character, exert all opposing damaged characters.",
        },
      ],
    },
  },
  inkType: ["emerald"],
  franchise: "Beauty and the Beast",
  set: "001",
  cardNumber: 70,
  rarity: "legendary",
  cost: 5,
  strength: 4,
  willpower: 4,
  lore: 2,
  inkable: false,
  externalIds: {
    lorcast: "crd_cd3d8417b8544063ae6a41766d24b130",
    tcgPlayer: 501404,
  },
  text: [
    {
      title: "Rush",
    },
    {
      title: "ROAR",
      description: "When you play this character, exert all opposing damaged characters.",
    },
  ],
  classifications: ["Dreamborn", "Hero", "Prince"],
  abilities: [
    {
      id: "bXY-1",
      keyword: "Rush",
      text: "Rush",
      type: "keyword",
    },
    {
      id: "bXY-2",
      name: "ROAR",
      text: "ROAR When you play this character, exert all opposing damaged characters.",
      type: "triggered",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      effect: {
        type: "exert",
        target: {
          selector: "all",
          count: "all",
          owner: "opponent",
          zones: ["play"],
          cardTypes: ["character"],
          filter: [
            {
              type: "damaged",
            },
          ],
        },
      },
    },
  ],
};
