import type { CharacterCard } from "@tcg/lorcana-types";

export const bagheeraGuardianJaguar: CharacterCard = {
  id: "n5M",
  canonicalId: "ci_n5M",
  reprints: ["set7-198"],
  cardType: "character",
  name: "Bagheera",
  version: "Guardian Jaguar",
  i18n: {
    en: {
      name: "Bagheera",
      version: "Guardian Jaguar",
      text: [
        {
          title: "Bodyguard",
        },
        {
          title: "YOU MUST BE BRAVE",
          description:
            "When this character is banished during an opponent's turn, deal 2 damage to each opposing character.",
        },
      ],
    },
    de: {
      name: "Baghira",
      version: "Wächter-Jaguar",
      text: "Beschützen (Du darfst diesen Charakter erschöpft ausspielen. Gegnerische Charaktere müssen beim Herausfordern deiner Charaktere zuerst deine Charaktere mit Beschützen wählen, wenn möglich.) DU MUSST JETZT TAPFER SEIN Wenn dieser Charakter im Zug einer gegnerischen Person verbannt wird, füge jedem gegnerischen Charakter 2 Schaden zu.",
    },
    fr: {
      name: "Bagheera",
      version: "Gardien félin",
      text: [
        {
          title: "Rempart",
          description:
            "(Ce personnage peut entrer en jeu épuisé. Lorsqu'il défie l'un de vos personnages, un personnage adverse doit, s'il le peut, choisir l'un de vos personnages avec Rempart.) IL FAUT QUE TU SOIS BRAVE Lorsque ce personnage est banni durant le tour d'un adversaire, infligez 2 dommages à chaque personnage adverse.",
        },
      ],
    },
    it: {
      name: "Bagheera",
      version: "Giaguaro Protettore",
      text: "Guardiano DEVI ESSERE CORAGGIOSO Durante il turno di un avversario, quando questo personaggio viene esiliato, infliggi 2 danni a ogni personaggio avversario.",
    },
  },
  inkType: ["steel"],
  franchise: "Jungle Book",
  set: "007",
  cardNumber: 198,
  rarity: "legendary",
  cost: 5,
  strength: 4,
  willpower: 3,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_cb99ab75225f41d49a1a33be32c8a170",
    tcgPlayer: 619522,
  },
  text: [
    {
      title: "Bodyguard",
    },
    {
      title: "YOU MUST BE BRAVE",
      description:
        "When this character is banished during an opponent's turn, deal 2 damage to each opposing character.",
    },
  ],
  classifications: ["Storyborn", "Ally"],
  abilities: [
    {
      id: "132-1",
      keyword: "Bodyguard",
      text: "Bodyguard",
      type: "keyword",
    },
    {
      effect: {
        amount: 2,
        target: {
          cardTypes: ["character"],
          count: "all",
          owner: "opponent",
          selector: "all",
          zones: ["play"],
        },
        type: "deal-damage",
      },
      id: "132-2",
      name: "YOU MUST BE BRAVE",
      text: "YOU MUST BE BRAVE When this character is banished during an opponent's turn, deal 2 damage to each opposing character.",
      trigger: {
        event: "banish",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
