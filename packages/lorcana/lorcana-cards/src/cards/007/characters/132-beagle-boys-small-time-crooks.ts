import type { CharacterCard } from "@tcg/lorcana-types";

export const beagleBoysSmalltimeCrooks: CharacterCard = {
  id: "WJM",
  canonicalId: "ci_WJM",
  reprints: ["set7-132"],
  cardType: "character",
  name: "Beagle Boys",
  version: "Small-Time Crooks",
  i18n: {
    en: {
      name: "Beagle Boys",
      version: "Small-Time Crooks",
      text: [
        {
          title: "HURRY IT UP!",
          description:
            "Whenever this character quests, chosen character of yours gains Rush and Resist +1 this turn. (They can challenge the turn they're played. Damage dealt to them is reduced by 1.)",
        },
      ],
    },
    de: {
      name: "Die Panzerknacker",
      version: "Kleinkriminelle",
      text: [
        {
          title: "MACH SCHNELLER!",
          description:
            "Jedes Mal, wenn dieser Charakter erkundet, wähle einen deiner Charaktere. Jener erhält in diesem Zug Rasant und Robust +1. (Der Charakter kann im selben Zug herausfordern, in dem er ausgespielt wird. Reduziere jeglichen Schaden, der dem Charakter zugefügt wird, um 1.)",
        },
      ],
    },
    fr: {
      name: "Les Rapetou",
      version: "Escrocs à la petite semaine",
      text: [
        {
          title: "FAITES VITE!",
          description:
            "Chaque fois que ce personnage est envoyé à l'aventure, choisissez l'un de vos personnages qui gagne Charge et Résistance +1 pour le reste de ce tour. (Ce personnage peut défier le tour où il est joué. Les dommages qui lui sont infligés sont réduits de 1.)",
        },
      ],
    },
    it: {
      name: "Banda Bassotti",
      version: "Furfanti da Quattro Soldi",
      text: [
        {
          title: "MUOVETEVI!",
          description:
            "Ogni volta che questo personaggio va all'avventura, un tuo personaggio a tua scelta ottiene Lesto e Resistere +1 per questo turno. (Può sfidare nel turno in cui viene giocato. Il danno che gli viene inflitto è ridotto di 1.)",
        },
      ],
    },
  },
  inkType: ["ruby", "sapphire"],
  franchise: "Ducktales",
  set: "007",
  cardNumber: 132,
  rarity: "uncommon",
  cost: 4,
  strength: 3,
  willpower: 3,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_0d3c06bef62348d7b6dcb0fe03afa6d0",
    tcgPlayer: 619478,
  },
  text: [
    {
      title: "HURRY IT UP!",
      description:
        "Whenever this character quests, chosen character of yours gains Rush and Resist +1 this turn. (They can challenge the turn they're played. Damage dealt to them is reduced by 1.)",
    },
  ],
  classifications: ["Storyborn", "Villain"],
  abilities: [
    {
      effect: {
        duration: "this-turn",
        keyword: "Rush",
        target: "SELF",
        type: "gain-keyword",
      },
      id: "f1x-1",
      name: "HURRY IT UP!",
      text: "HURRY IT UP! Whenever this character quests, chosen character of yours gains Rush and Resist +1 this turn.",
      trigger: {
        event: "quest",
        on: "SELF",
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
};
