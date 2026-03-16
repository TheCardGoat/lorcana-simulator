import type { CharacterCard } from "@tcg/lorcana-types";

export const treasureGuardianProtectorOfTheCave: CharacterCard = {
  id: "gsz",
  canonicalId: "ci_gsz",
  reprints: ["set3-058"],
  cardType: "character",
  name: "Treasure Guardian",
  version: "Protector of the Cave",
  i18n: {
    en: {
      name: "Treasure Guardian",
      version: "Protector of the Cave",
      text: [
        {
          title: "WHO DISTURBS MY SLUMBER?",
          description: "This character can't challenge or quest unless it is at a location.",
        },
      ],
    },
    de: {
      name: "Hüter des Schatzes",
      version: "Wächter der Höhle",
      text: [
        {
          title: "WER STÖRT MICH IN MEINEM SCHLUMMER?",
          description:
            "Dieser Charakter kann nicht herausfordern oder erkunden, außer er ist an einem Ort.",
        },
      ],
    },
    fr: {
      name: "Le Gardien du Trésor",
      version: "Protecteur de la Caverne",
      text: [
        {
          title: "QUI DONC VIENT TROUBLER MON REPOS?",
          description:
            "Ce personnage ne peut ni défier, ni être envoyé à l'aventure à moins qu'il ne soit présent sur un lieu.",
        },
      ],
    },
    it: {
      name: "Guardiano del Tesoro",
      version: "Protettore della Caverna",
      text: [
        {
          title: "CHI OSA DISTURBARE IL MIO RIPOSO?",
          description:
            "Questo personaggio non può sfidare o andare all'avventura a meno che non si trovi in un luogo.",
        },
      ],
    },
  },
  inkType: ["amethyst"],
  franchise: "Aladdin",
  set: "003",
  cardNumber: 58,
  rarity: "rare",
  cost: 4,
  strength: 6,
  willpower: 6,
  lore: 2,
  inkable: false,
  externalIds: {
    lorcast: "crd_8b9133c809b04113a3b464d0f1c2ca82",
    tcgPlayer: 539077,
  },
  text: [
    {
      title: "WHO DISTURBS MY SLUMBER?",
      description: "This character can't challenge or quest unless it is at a location.",
    },
  ],
  classifications: ["Storyborn"],
  missingTests: true,
  abilities: [
    {
      effect: {
        restriction: "cant-challenge",
        target: "SELF",
        type: "restriction",
      },
      id: "1bw-1",
      name: "WHO DISTURBS MY SLUMBER?",
      text: "WHO DISTURBS MY SLUMBER? This character can't challenge or quest unless it is at a location.",
      type: "static",
    },
  ],
};
