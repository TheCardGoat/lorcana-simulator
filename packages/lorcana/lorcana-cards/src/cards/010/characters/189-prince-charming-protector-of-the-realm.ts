import type { CharacterCard } from "@tcg/lorcana-types";

export const princeCharmingProtectorOfTheRealm: CharacterCard = {
  id: "rzC",
  canonicalId: "ci_rzC",
  reprints: ["set10-189"],
  cardType: "character",
  name: "Prince Charming",
  version: "Protector of the Realm",
  i18n: {
    en: {
      name: "Prince Charming",
      version: "Protector of the Realm",
      text: [
        {
          title: "Bodyguard",
        },
        {
          title: "PROTECTIVE PRESENCE",
          description: "Each turn, only one character can challenge.",
        },
      ],
    },
    de: {
      name: "Prinz Charming",
      version: "Beschützer des Königreichs",
      text: "Beschützen (Du darfst diesen Charakter erschöpft ausspielen. Gegnerische Charaktere müssen beim Herausfordern deiner Charaktere zuerst deine Charaktere mit Beschützen wählen, wenn möglich.) BESCHÜTZERISCHE PRÄSENZ In jedem Zug kann nur ein Charakter herausfordern.",
    },
    fr: {
      name: "Prince charmant",
      version: "Protecteur du royaume",
      text: [
        {
          title: "Rempart",
          description:
            "(Ce personnage peut entrer en jeu épuisé. Lorsqu'il défie l'un de vos personnages, un personnage adverse doit, s'il le peut, choisir l'un de vos personnages avec Rempart.) PRÉSENCE PROTECTRICE Un seul personnage peut défier chaque tour.",
        },
      ],
    },
    it: {
      name: "Principe Azzurro",
      version: "Protettore del Reame",
      text: "Guardiano PRESENZA PROTETTIVA Ogni turno, solo un personaggio può sfidare.",
    },
  },
  inkType: ["steel"],
  franchise: "Cinderella",
  set: "010",
  cardNumber: 189,
  rarity: "legendary",
  cost: 7,
  strength: 3,
  willpower: 10,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_fafe3c3da4484cf6b0485a5f5a1c557a",
    tcgPlayer: 658343,
  },
  text: [
    {
      title: "Bodyguard",
    },
    {
      title: "PROTECTIVE PRESENCE",
      description: "Each turn, only one character can challenge.",
    },
  ],
  classifications: ["Dreamborn", "Hero", "Prince"],
  abilities: [],
};
