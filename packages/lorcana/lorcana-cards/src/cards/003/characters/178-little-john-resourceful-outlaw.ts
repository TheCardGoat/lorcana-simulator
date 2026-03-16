import type { CharacterCard } from "@tcg/lorcana-types";

export const littleJohnResourcefulOutlaw: CharacterCard = {
  id: "qJp",
  canonicalId: "ci_qJp",
  reprints: ["set3-178"],
  cardType: "character",
  name: "Little John",
  version: "Resourceful Outlaw",
  i18n: {
    en: {
      name: "Little John",
      version: "Resourceful Outlaw",
      text: [
        {
          title: "Shift 4",
        },
        {
          title: "OKAY, BIG SHOT",
          description:
            "While this character is exerted, your characters with Bodyguard gain Resist +1 and get +1 {L}.",
        },
      ],
    },
    de: {
      name: "Little John",
      version: "Raffinierter Gesetzloser",
      text: "Gestaltwandel 4 DEIN GLÜCK, DU KNILCH Solange dieser Charakter erschöpft ist, erhalten deine Charaktere mit Beschützen +1 und Robust +1 (Reduziere jeglichen Schaden, der ihnen zugefügt wird, um 1.)",
    },
    fr: {
      name: "Petit Jean",
      version: "Hors-la-loi plein de ressources",
      text: "Alter 4 C'EST ÇA, GRAND CHEF Tant que ce personnage est épuisé, vos personnages avec Rempart gagnent +1 et Résistance +1.",
    },
    it: {
      name: "Little John",
      version: "Fuorilegge Intraprendente",
      text: "Trasformazione 4 OK, BUFFONE Mentre questo personaggio è impegnato, i tuoi personaggi con Guardiano ottengono Resistere +1 e ricevono +1.",
    },
  },
  inkType: ["steel"],
  franchise: "Robin Hood",
  set: "003",
  cardNumber: 178,
  rarity: "common",
  cost: 6,
  strength: 4,
  willpower: 5,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_71fd1d1099c9451393725c4afa6ca274",
    tcgPlayer: 537943,
  },
  text: [
    {
      title: "Shift 4",
    },
    {
      title: "OKAY, BIG SHOT",
      description:
        "While this character is exerted, your characters with Bodyguard gain Resist +1 and get +1 {L}.",
    },
  ],
  classifications: ["Floodborn", "Hero"],
  missingImplementation: true,
  missingTests: true,
  abilities: [
    {
      cost: {
        ink: 4,
      },
      id: "kck-1",
      keyword: "Shift",
      text: "Shift 4",
      type: "keyword",
    },
    {
      effect: {
        steps: [
          {
            keyword: "Resist",
            target: "SELF",
            type: "gain-keyword",
            value: 1,
          },
          {
            modifier: 1,
            stat: "lore",
            target: "CHOSEN_CHARACTER",
            type: "modify-stat",
          },
        ],
        type: "sequence",
      },
      id: "kck-2",
      text: "OKAY, BIG SHOT While this character is exerted, your characters with Bodyguard gain Resist +1 and get +1 {L}.",
      type: "action",
    },
  ],
};
