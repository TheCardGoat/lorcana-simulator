import type { CharacterCard } from "@tcg/lorcana-types";

export const donaldDuckMusketeerSoldier: CharacterCard = {
  id: "1Pa",
  canonicalId: "ci_1Pa",
  reprints: ["set4-008"],
  cardType: "character",
  name: "Donald Duck",
  version: "Musketeer Soldier",
  i18n: {
    en: {
      name: "Donald Duck",
      version: "Musketeer Soldier",
      text: [
        {
          title: "Bodyguard",
        },
        {
          title: "WAIT FOR ME!",
          description: "When you play this character, chosen character gets +1 {L} this turn.",
        },
      ],
    },
    de: {
      name: "Donald Duck",
      version: "Musketier-Soldat",
      text: "Beschützen (Du darfst diesen Charakter erschöpft ausspielen. Gegnerische Charaktere müssen beim Herausfordern deiner Charaktere zuerst deine Charaktere mit Beschützen wählen, wenn möglich.) WARTET AUF MICH Wenn du diesen Charakter ausspielst, erhält ein Charakter deiner Wahl in diesem Zug +1.",
    },
    fr: {
      name: "Donald",
      version: "Mousquetaire soldat",
      text: [
        {
          title: "Rempart",
          description:
            "(Ce personnage peut entrer en jeu épuisé. Lorsqu'un adversaire défie l'un de vos personnages, il doit, si possible, choisir l'un de vos personnages avec Rempart.) ATTENDEZ-MOI! Lorsque vous jouez ce personnage, choisissez un personnage qui gagne +1 pour le reste de ce tour.",
        },
      ],
    },
    it: {
      name: "Paperino",
      version: "Soldato Moschettiere",
      text: "Guardiano ECCOMI, ARRIVO! Quando giochi questo personaggio, un personaggio a tua scelta riceve +1 per questo turno.",
    },
  },
  inkType: ["amber"],
  set: "004",
  cardNumber: 8,
  rarity: "uncommon",
  cost: 3,
  strength: 2,
  willpower: 3,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_dd1edbb4a44c4017a3aabb30184c0888",
    tcgPlayer: 550556,
  },
  text: [
    {
      title: "Bodyguard",
    },
    {
      title: "WAIT FOR ME!",
      description: "When you play this character, chosen character gets +1 {L} this turn.",
    },
  ],
  classifications: ["Dreamborn", "Hero", "Musketeer"],
  abilities: [
    {
      id: "1hr-1",
      keyword: "Bodyguard",
      text: "Bodyguard",
      type: "keyword",
    },
    {
      effect: {
        duration: "this-turn",
        modifier: 1,
        stat: "lore",
        target: "SELF",
        type: "modify-stat",
      },
      id: "1hr-2",
      name: "WAIT FOR ME!",
      text: "WAIT FOR ME! When you play this character, chosen character gets +1 {L} this turn.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
