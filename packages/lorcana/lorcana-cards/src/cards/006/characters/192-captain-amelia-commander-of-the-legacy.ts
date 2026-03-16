import type { CharacterCard } from "@tcg/lorcana-types";

export const captainAmeliaCommanderOfTheLegacy: CharacterCard = {
  id: "2tR",
  canonicalId: "ci_OsQ",
  reprints: ["set6-192"],
  cardType: "character",
  name: "Captain Amelia",
  version: "Commander of the Legacy",
  i18n: {
    en: {
      name: "Captain Amelia",
      version: "Commander of the Legacy",
      text: [
        {
          title: "DRIVELING GALOOTS",
          description: "This character can't be challenged by Pirate characters.",
        },
        {
          title: "EVERYTHING SHIPSHAPE",
          description: "While being challenged, your other characters gain Resist +1.",
        },
      ],
    },
    de: {
      name: "Käpt'n Amelia",
      version: "Kommandantin der Legacy",
      text: [
        {
          title: "EIN JÄMMERLICHER HAUFEN",
          description: "Dieser Charakter kann nicht von Piraten herausgefordert werden.",
        },
        {
          title: "ALLES TIPPTOPP",
          description:
            "Deine anderen Charaktere erhalten Robust +1, während sie herausgefordert werden. (Reduziere jeglichen Schaden, der ihnen zugefügt wird, um 1.)",
        },
      ],
    },
    fr: {
      name: "Capitaine Amélia",
      version: "Commandante du RLS Héritage",
      text: [
        {
          title: "DEMEURÉS RADOTEURS",
          description: "Ce personnage ne peut pas être défié par un personnage Pirate.",
        },
        {
          title: "ET LE BATEAU, ÇA BAIGNE?",
          description: "Vos autres personnages gagnent Résistance +1 tant qu'ils sont défiés.",
        },
      ],
    },
    it: {
      name: "Capitano Amelia",
      version: "Comandante della Legacy",
      text: [
        {
          title: "CANAGLIUME VARIO",
          description: "Questo personaggio non può essere sfidato da personaggi Pirata.",
        },
        {
          title: "TUTTO A POSTO",
          description: "Mentre vengono sfidati, i tuoi altri personaggi ottengono Resistere +1.",
        },
      ],
    },
  },
  inkType: ["steel"],
  franchise: "Treasure Planet",
  set: "006",
  cardNumber: 192,
  rarity: "common",
  cost: 4,
  strength: 1,
  willpower: 4,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_eb10018264004dc59f9bf0f31295d757",
    tcgPlayer: 592014,
  },
  text: [
    {
      title: "DRIVELING GALOOTS",
      description: "This character can't be challenged by Pirate characters.",
    },
    {
      title: "EVERYTHING SHIPSHAPE",
      description: "While being challenged, your other characters gain Resist +1.",
    },
  ],
  classifications: ["Storyborn", "Ally", "Alien", "Captain"],
  abilities: [
    {
      effect: {
        restriction: "cant-be-challenged",
        target: "SELF",
        type: "restriction",
      },
      id: "1ln-1",
      name: "DRIVELING GALOOTS",
      text: "DRIVELING GALOOTS This character can't be challenged by Pirate characters.",
      type: "static",
    },
    {
      effect: {
        keyword: "Resist",
        target: "YOUR_CHARACTERS",
        type: "gain-keyword",
        value: 1,
      },
      id: "1ln-2",
      text: "EVERYTHING SHIPSHAPE While being challenged, your other characters gain Resist +1.",
      type: "static",
    },
  ],
};
