import type { CharacterCard } from "@tcg/lorcana-types";

export const plutoDeterminedDefender: CharacterCard = {
  id: "yv4",
  canonicalId: "ci_Iga",
  reprints: ["set3-017", "set9-014"],
  cardType: "character",
  name: "Pluto",
  version: "Determined Defender",
  i18n: {
    en: {
      name: "Pluto",
      version: "Determined Defender",
      text: [
        {
          title: "Shift 5 {I}",
        },
        {
          title: "Bodyguard",
        },
        {
          title: "GUARD DOG",
          description: "At the start of your turn, remove up to 3 damage from this character.",
        },
      ],
    },
    de: {
      name: "Pluto",
      version: "Entschlossener Verteidiger",
      text: "Gestaltwandel 5 Beschützen (Du darfst diesen Charakter erschöpft ausspielen. Gegnerische Charaktere müssen beim Herausfordern deiner Charaktere zuerst deine Charaktere mit Beschützen wählen, wenn möglich.) WACHHUND Zu Beginn deines Zuges, entferne bis zu 3 Schaden von diesem Charakter.",
    },
    fr: {
      name: "Pluto",
      version: "Protecteur déterminé",
      text: [
        {
          title: "Alter 5 Rempart",
          description:
            "(Ce personnage peut entrer en jeu épuisé. Lorsqu'il vous défie, un personnage adverse doit, si possible, choisir l'un de vos personnages avec Rempart.) CHIEN DE GARDE Au début de votre tour, retirez jusqu'à 3 jetons Dommage de ce personnage.",
        },
      ],
    },
    it: {
      name: "Pluto",
      version: "Guardia Risoluta",
      text: "Trasformazione 5 Guardiano CANE DA GUARDIA All'inizio del tuo turno, rimuovi fino a 3 danni da questo personaggio.",
    },
  },
  inkType: ["amber"],
  set: "009",
  cardNumber: 14,
  rarity: "rare",
  cost: 7,
  strength: 3,
  willpower: 8,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_d30e5a514aae4bd9b28d98cf45569a23",
    tcgPlayer: 649963,
  },
  text: [
    {
      title: "Shift 5 {I}",
    },
    {
      title: "Bodyguard",
    },
    {
      title: "GUARD DOG",
      description: "At the start of your turn, remove up to 3 damage from this character.",
    },
  ],
  classifications: ["Floodborn", "Ally"],
  abilities: [
    {
      cost: {
        ink: 5,
      },
      id: "zh2-1",
      keyword: "Shift",
      text: "Shift 5 {I}",
      type: "keyword",
    },
    {
      id: "zh2-2",
      keyword: "Bodyguard",
      text: "Bodyguard",
      type: "keyword",
    },
    {
      effect: {
        amount: 3,
        target: {
          cardTypes: ["character"],
          count: 1,
          owner: "any",
          selector: "self",
          zones: ["play"],
        },
        type: "remove-damage",
        upTo: true,
      },
      id: "zh2-3",
      text: "GUARD DOG At the start of your turn, remove up to 3 damage from this character.",
      type: "action",
    },
  ],
};
