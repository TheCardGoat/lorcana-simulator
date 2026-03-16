import type { CharacterCard } from "@tcg/lorcana-types";

export const princeNaveenVigilantFirstMate: CharacterCard = {
  id: "rPA",
  canonicalId: "ci_rPA",
  reprints: ["set6-009"],
  cardType: "character",
  name: "Prince Naveen",
  version: "Vigilant First Mate",
  i18n: {
    en: {
      name: "Prince Naveen",
      version: "Vigilant First Mate",
      text: [
        {
          title: "Shift 3",
        },
        {
          title: "Bodyguard",
        },
      ],
    },
    de: {
      name: "Prinz Naveen",
      version: "Wachsamer Erster Maat",
      text: "Gestaltwandel 3 Beschützen (Du darfst diesen Charakter erschöpft ausspielen. Gegnerische Charaktere müssen beim Herausfordern deiner Charaktere zuerst deine Charaktere mit Beschützen wählen, wenn möglich.)",
    },
    fr: {
      name: "Prince Naveen",
      version: "Second vigilant",
      text: [
        {
          title: "Alter 3 Rempart",
          description:
            "(Ce personnage peut entrer en jeu épuisé. Lorsqu'un adversaire défie l'un de vos personnages, il doit, si possible, choisir l'un de vos personnages avec Rempart.)",
        },
      ],
    },
    it: {
      name: "Principe Naveen",
      version: "Primo Ufficiale di Vedetta",
      text: "Trasformazione 3 Guardiano",
    },
  },
  inkType: ["amber"],
  franchise: "Princess and the Frog",
  set: "006",
  cardNumber: 9,
  rarity: "uncommon",
  cost: 5,
  strength: 2,
  willpower: 6,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_39972f3e75a3417488662b70443b3164",
    tcgPlayer: 592016,
  },
  text: [
    {
      title: "Shift 3",
    },
    {
      title: "Bodyguard",
    },
  ],
  classifications: ["Floodborn", "Hero", "Prince"],
  abilities: [
    {
      cost: {
        ink: 3,
      },
      id: "1hg-1",
      keyword: "Shift",
      text: "Shift 3",
      type: "keyword",
    },
    {
      id: "1hg-2",
      keyword: "Bodyguard",
      text: "Bodyguard",
      type: "keyword",
    },
  ],
};
