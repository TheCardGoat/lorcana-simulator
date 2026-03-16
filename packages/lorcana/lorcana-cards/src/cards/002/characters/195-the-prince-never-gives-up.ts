import type { CharacterCard } from "@tcg/lorcana-types";

export const thePrinceNeverGivesUp: CharacterCard = {
  id: "jp9",
  canonicalId: "ci_jp9",
  reprints: ["set2-195"],
  cardType: "character",
  name: "The Prince",
  version: "Never Gives Up",
  i18n: {
    en: {
      name: "The Prince",
      version: "Never Gives Up",
      text: [
        {
          title: "Bodyguard",
        },
        {
          title: "Resist +1",
        },
      ],
    },
    de: {
      name: "Der Prinz",
      version: "Gibt niemals auf",
      text: "Beschützen (Du darfst diesen Charakter erschöpft ausspielen. Gegnerische Charaktere müssen beim Herausfordern deiner Charaktere zuerst deine Charaktere mit Beschützen wählen, wenn möglich.) Robust +1 (Reduziere jeglichen Schaden, der diesem Charakter zugefügt wird, um 1.)",
    },
    fr: {
      name: "Le Prince",
      version: "N'abandonne jamais",
      text: [
        {
          title: "Rempart",
          description:
            "(Ce personnage peut entrer en jeu épuisé. Lorsqu'il vous défie, un personnage adverse doit, si possible, choisir l'un de vos personnages avec Rempart.) Résistance +1",
        },
      ],
    },
    it: {
      name: "The Prince",
      version: "Never Gives Up",
      text: [
        {
          title: "Bodyguard",
          description:
            "(This character may enter play exerted. An opposing character who challenges one of your characters must choose one with Bodyguard if able.) Resist +1 (Damage dealt to this character is reduced by 1.)",
        },
      ],
    },
  },
  inkType: ["steel"],
  franchise: "Snow White",
  set: "002",
  cardNumber: 195,
  rarity: "uncommon",
  cost: 3,
  strength: 1,
  willpower: 3,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_9cc22e72ff234c27acb37f7d0e1f4441",
    tcgPlayer: 517607,
  },
  text: [
    {
      title: "Bodyguard",
    },
    {
      title: "Resist +1",
    },
  ],
  classifications: ["Dreamborn", "Hero", "Prince"],
  abilities: [
    {
      id: "14d-1",
      keyword: "Bodyguard",
      text: "Bodyguard",
      type: "keyword",
    },
    {
      id: "14d-2",
      keyword: "Resist",
      text: "Resist +1",
      type: "keyword",
      value: 1,
    },
  ],
};
