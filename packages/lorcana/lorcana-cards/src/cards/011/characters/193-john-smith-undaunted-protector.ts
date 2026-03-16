import type { CharacterCard } from "@tcg/lorcana-types";

export const johnSmithUndauntedProtector: CharacterCard = {
  id: "h1O",
  canonicalId: "ci_h1O",
  reprints: ["set11-193"],
  cardType: "character",
  name: "John Smith",
  version: "Undaunted Protector",
  i18n: {
    en: {
      name: "John Smith",
      version: "Undaunted Protector",
      text: [
        {
          title: "Bodyguard",
        },
        {
          title: "DO YOUR WORST",
          description: "Opponents must choose this character for actions and abilities if able.",
        },
      ],
    },
    de: {
      name: "John Smith",
      version: "Unerschrockener Beschützer",
      text: "Beschützen (Du darfst diesen Charakter erschöpft ausspielen. Gegnerische Charaktere müssen beim Herausfordern deiner Charaktere zuerst deine Charaktere mit Beschützen wählen, wenn möglich.) TU, WAS DU NICHT LASSEN KANNST Gegnerische Mitspielende müssen mit ihren Aktionen und Fähigkeiten diesen Charakter auswählen, wenn möglich.",
    },
    fr: {
      name: "John Smith",
      version: "Protecteur impavide",
      text: [
        {
          title: "Rempart",
          description:
            "(Ce personnage peut entrer en jeu épuisé. Lorsqu'il défie l'un de vos personnages, un personnage adverse doit, s'il le peut, choisir l'un de vos personnages avec Rempart.) TENTE TA CHANCE Les adversaires doivent, s'ils le peuvent, choisir ce personnage avec toute action ou capacité.",
        },
      ],
    },
    it: {
      name: "John Smith",
      version: "Protettore Indomito",
      text: "Guardiano FAI DEL TUO PEGGIO Gli avversari devono scegliere questo personaggio per azioni e abilità, se possibile.",
    },
  },
  inkType: ["steel"],
  franchise: "Pocahontas",
  set: "011",
  cardNumber: 193,
  rarity: "common",
  cost: 5,
  strength: 3,
  willpower: 6,
  lore: 2,
  inkable: false,
  externalIds: {
    lorcast: "crd_26b1e9d58acf429aa2d77f89f6534c16",
    tcgPlayer: 676245,
  },
  text: [
    {
      title: "Bodyguard",
    },
    {
      title: "DO YOUR WORST",
      description: "Opponents must choose this character for actions and abilities if able.",
    },
  ],
  classifications: ["Dreamborn", "Hero"],
  abilities: [
    {
      id: "h1O-1",
      keyword: "Bodyguard",
      text: "Bodyguard",
      type: "keyword",
    },
    {
      id: "h1O-2",
      type: "static",
      text: "DO YOUR WORST Opponents must choose this character for actions and abilities if able.",
      effect: {
        type: "restriction",
        target: "SELF",
        restriction: "must-be-chosen-for-effects",
      },
    },
  ],
};
