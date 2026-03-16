import type { CharacterCard } from "@tcg/lorcana-types";

export const minnieMouseDaringDefender: CharacterCard = {
  id: "t5R",
  canonicalId: "ci_t5R",
  reprints: ["set8-006"],
  cardType: "character",
  name: "Minnie Mouse",
  version: "Daring Defender",
  i18n: {
    en: {
      name: "Minnie Mouse",
      version: "Daring Defender",
      text: [
        {
          title: "Bodyguard",
        },
        {
          title: "TRUE VALOR",
          description: "This character gets +1 {S} for each 1 damage on her.",
        },
      ],
    },
    de: {
      name: "Minnie Maus",
      version: "Wagemutige Beschützerin",
      text: "Beschützen (Du darfst diesen Charakter erschöpft ausspielen. Gegnerische Charaktere müssen beim Herausfordern deiner Charaktere zuerst deine Charaktere mit Beschützen wählen, wenn möglich.) WAHRE TAPFERKEIT Dieser Charakter erhält +1 für jeden Schaden auf ihm.",
    },
    fr: {
      name: "Minnie",
      version: "Défenseuse hardie",
      text: [
        {
          title: "Rempart",
          description:
            "(Ce personnage peut entrer en jeu épuisé. Lorsqu'il défie l'un de vos personnages, un personnage adverse doit, s'il le peut, choisir l'un de vos personnages avec Rempart.) BRAVOURE VÉRITABLE Ce personnage gagne +1 pour chaque dommage sur lui.",
        },
      ],
    },
    it: {
      name: "Minni",
      version: "Difenditrice Coraggiosa",
      text: "Guardiano VERO VALORE Questo personaggio riceve +1 per ogni singolo danno su di esso.",
    },
  },
  inkType: ["amber", "ruby"],
  set: "008",
  cardNumber: 6,
  rarity: "rare",
  cost: 4,
  strength: 0,
  willpower: 8,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_693ec0809a974a8ba6ce2a5b3a29f209",
    tcgPlayer: 631352,
  },
  text: [
    {
      title: "Bodyguard",
    },
    {
      title: "TRUE VALOR",
      description: "This character gets +1 {S} for each 1 damage on her.",
    },
  ],
  classifications: ["Dreamborn", "Hero"],
  abilities: [
    {
      id: "7k3-1",
      keyword: "Bodyguard",
      text: "Bodyguard",
      type: "keyword",
    },
    {
      effect: {
        modifier: 1,
        stat: "strength",
        target: "SELF",
        type: "modify-stat",
      },
      id: "7k3-2",
      text: "TRUE VALOR This character gets +1 {S} for each 1 damage on her.",
      type: "static",
    },
  ],
};
