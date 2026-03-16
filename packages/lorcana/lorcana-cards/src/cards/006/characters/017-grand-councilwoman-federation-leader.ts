import type { CharacterCard } from "@tcg/lorcana-types";

export const grandCouncilwomanFederationLeader: CharacterCard = {
  id: "Lt8",
  canonicalId: "ci_Lt8",
  reprints: ["set6-017"],
  cardType: "character",
  name: "Grand Councilwoman",
  version: "Federation Leader",
  i18n: {
    en: {
      name: "Grand Councilwoman",
      version: "Federation Leader",
      text: [
        {
          title: "FIND IT!",
          description:
            "Whenever this character quests, your other Alien characters get +1 {L} this turn.",
        },
      ],
    },
    de: {
      name: "Präsidentin des Hohen Rats",
      version: "Leiterin der Galaktischen Föderation",
      text: [
        {
          title: "FINDET ES!",
          description:
            "Jedes Mal, wenn dieser Charakter erkundet, erhalten deine anderen Aliens in diesem Zug +1.",
        },
      ],
    },
    fr: {
      name: "Présidente du Grand Conseil",
      version: "Dirigeante de la Fédération",
      text: [
        {
          title: "TROUVEZ-LE!",
          description:
            "Chaque fois que ce personnage est envoyé à l'aventure, vos autres personnages Alien gagnent +1 pour le reste de ce tour.",
        },
      ],
    },
    it: {
      name: "Gran Consigliera",
      version: "Leader della Federazione",
      text: [
        {
          title: "TROVATELO!",
          description:
            "Ogni volta che questo personaggio va all'avventura, i tuoi altri personaggi Alieno ricevono +1 per questo turno.",
        },
      ],
    },
  },
  inkType: ["amber"],
  franchise: "Lilo and Stitch",
  set: "006",
  cardNumber: 17,
  rarity: "uncommon",
  cost: 2,
  strength: 1,
  willpower: 3,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_07af0c79c9fe46728b147454f273deac",
    tcgPlayer: 587757,
  },
  text: [
    {
      title: "FIND IT!",
      description:
        "Whenever this character quests, your other Alien characters get +1 {L} this turn.",
    },
  ],
  classifications: ["Storyborn", "Alien"],
  abilities: [
    {
      effect: {
        duration: "this-turn",
        modifier: 1,
        stat: "lore",
        target: "SELF",
        type: "modify-stat",
      },
      id: "zvy-1",
      name: "FIND IT!",
      text: "FIND IT! Whenever this character quests, your other Alien characters get +1 {L} this turn.",
      trigger: {
        event: "quest",
        on: "SELF",
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
};
