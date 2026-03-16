import type { CharacterCard } from "@tcg/lorcana-types";

export const theHeadlessHorsemanRelentlessSpirit: CharacterCard = {
  id: "Dfg",
  canonicalId: "ci_Dfg",
  reprints: ["set10-194"],
  cardType: "character",
  name: "The Headless Horseman",
  version: "Relentless Spirit",
  i18n: {
    en: {
      name: "The Headless Horseman",
      version: "Relentless Spirit",
      text: "Bodyguard",
    },
    de: {
      name: "Der kopflose Reiter",
      version: "Unbarmherziger Geist",
      text: "Beschützen (Du darfst diesen Charakter erschöpft ausspielen. Gegnerische Charaktere müssen beim Herausfordern deiner Charaktere zuerst deine Charaktere mit Beschützen wählen, wenn möglich.)",
    },
    fr: {
      name: "Le Cavalier sans tête",
      version: "Esprit implacable",
      text: [
        {
          title: "Rempart",
          description:
            "(Ce personnage peut entrer en jeu épuisé. Lorsqu'il défie l'un de vos personnages, un personnage adverse doit, s'il le peut, choisir l'un de vos personnages avec Rempart.)",
        },
      ],
    },
    it: {
      name: "Il Cavaliere Senza Testa",
      version: "Spirito Implacabile",
      text: "Guardiano",
    },
  },
  inkType: ["steel"],
  franchise: "Sleepy Hollow",
  set: "010",
  cardNumber: 194,
  rarity: "common",
  cost: 4,
  strength: 4,
  willpower: 4,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_27747f32e8a3479cac5b138f81f0dff0",
    tcgPlayer: 660017,
  },
  text: "Bodyguard",
  classifications: ["Storyborn", "Villain"],
  abilities: [
    {
      id: "i51-1",
      keyword: "Bodyguard",
      text: "Bodyguard",
      type: "keyword",
    },
  ],
};
