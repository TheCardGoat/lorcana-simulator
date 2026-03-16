import type { CharacterCard } from "@tcg/lorcana-types";

export const princeEricUrsulasGroom: CharacterCard = {
  id: "sTh",
  canonicalId: "ci_sTh",
  reprints: ["set4-022"],
  cardType: "character",
  name: "Prince Eric",
  version: "Ursula's Groom",
  i18n: {
    en: {
      name: "Prince Eric",
      version: "Ursula's Groom",
      text: [
        {
          title: "Shift 4",
        },
        {
          title: "UNDER VANESSA'S SPELL",
          description:
            "While you have a character named Ursula in play, this character gains Bodyguard and gets +2 {W}. (An opposing character who challenges one of your characters must choose one with Bodyguard if able.)",
        },
      ],
    },
    de: {
      name: "Prinz Eric",
      version: "Ursulas Bräutigam",
      text: "Gestaltwandel 4 IN VANESSAS BANN Solange du mindestens einen Ursula-Charakter im Spiel hast, erhält dieser Charakter +2 und Beschützen. (Gegnerische Charaktere müssen beim Herausfordern deiner Charaktere zuerst deine Charaktere mit Beschützen wählen, wenn möglich.)",
    },
    fr: {
      name: "Prince Eric",
      version: "Fiancé d'Ursula",
      text: "Alter 4 SOUS LE CHARME DE VANESSA Tant que vous avez un personnage Ursula en jeu, ce personnage-ci gagne Rempart et +2. (Lorsqu'un adversaire défie l'un de vos personnages, il doit, si possible, choisir l'un de vos personnages avec Rempart.)",
    },
    it: {
      name: "Principe Eric",
      version: "Sposo di Ursula",
      text: "Trasformazione 4 SOTTO L'INCANTO DI VANESSA Mentre hai in gioco un personaggio chiamato Ursula, questo personaggio ottiene Guardiano e riceve +2. (Un personaggio avversario che sfida uno dei tuoi personaggi deve sceglierne uno con Guardiano, se possibile.)",
    },
  },
  inkType: ["amber"],
  franchise: "Little Mermaid",
  set: "004",
  cardNumber: 22,
  rarity: "uncommon",
  cost: 6,
  strength: 5,
  willpower: 5,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_58e889f440504f44b3283ed76f3f54a4",
    tcgPlayer: 550561,
  },
  text: [
    {
      title: "Shift 4",
    },
    {
      title: "UNDER VANESSA'S SPELL",
      description:
        "While you have a character named Ursula in play, this character gains Bodyguard and gets +2 {W}. (An opposing character who challenges one of your characters must choose one with Bodyguard if able.)",
    },
  ],
  classifications: ["Floodborn", "Hero", "Prince"],
  abilities: [
    {
      cost: {
        ink: 4,
      },
      id: "1rd-1",
      keyword: "Shift",
      text: "Shift 4",
      type: "keyword",
    },
    {
      effect: {
        steps: [
          {
            keyword: "Bodyguard",
            target: "SELF",
            type: "gain-keyword",
          },
          {
            modifier: 2,
            stat: "willpower",
            target: "CHOSEN_CHARACTER",
            type: "modify-stat",
          },
        ],
        type: "sequence",
      },
      id: "1rd-2",
      text: "UNDER VANESSA'S SPELL While you have a character named Ursula in play, this character gains Bodyguard and gets +2 {W}.",
      type: "action",
    },
  ],
};
