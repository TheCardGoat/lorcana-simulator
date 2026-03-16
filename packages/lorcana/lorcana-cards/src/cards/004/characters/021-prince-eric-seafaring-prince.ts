import type { CharacterCard } from "@tcg/lorcana-types";

export const princeEricSeafaringPrince: CharacterCard = {
  id: "U2e",
  canonicalId: "ci_U2e",
  reprints: ["set4-021"],
  cardType: "character",
  name: "Prince Eric",
  version: "Seafaring Prince",
  i18n: {
    en: {
      name: "Prince Eric",
      version: "Seafaring Prince",
      text: [
        {
          title: "Bodyguard",
          description:
            "(This character may enter play exerted. An opposing character who challenges one of your characters must choose a character with Bodyguard if able.)",
        },
      ],
    },
    de: {
      name: "Prinz Eric",
      version: "Seefahrer Prinz",
      text: "Beschützen (Du darfst diesen Charakter erschöpft ausspielen. Gegnerische Charaktere müssen beim Herausfordern deiner Charaktere zuerst deine Charaktere mit Beschützen wählen, wenn möglich.)",
    },
    fr: {
      name: "Prince Eric",
      version: "Prince navigateur",
      text: [
        {
          title: "Rempart",
          description:
            "(Ce personnage peut entrer en jeu épuisé. Lorsqu'un adversaire défie l'un de vos personnages, il doit, si possible, choisir l'un de vos personnages avec Rempart.)",
        },
      ],
    },
    it: {
      name: "Principe Eric",
      version: "Principe Navigatore",
      text: "Guardiano",
    },
  },
  inkType: ["amber"],
  franchise: "Little Mermaid",
  set: "004",
  cardNumber: 21,
  rarity: "common",
  cost: 3,
  strength: 3,
  willpower: 3,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_59c6d7badfc34295857ca0743b40ceca",
    tcgPlayer: 550560,
  },
  text: [
    {
      title: "Bodyguard",
      description:
        "(This character may enter play exerted. An opposing character who challenges one of your characters must choose a character with Bodyguard if able.)",
    },
  ],
  classifications: ["Dreamborn", "Hero", "Prince"],
  abilities: [
    {
      id: "98x-1",
      keyword: "Bodyguard",
      text: "Bodyguard",
      type: "keyword",
    },
  ],
};
