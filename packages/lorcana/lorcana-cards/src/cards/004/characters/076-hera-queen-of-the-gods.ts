import type { CharacterCard } from "@tcg/lorcana-types";

export const heraQueenOfTheGods: CharacterCard = {
  id: "vHX",
  canonicalId: "ci_vHX",
  reprints: ["set4-076"],
  cardType: "character",
  name: "Hera",
  version: "Queen of the Gods",
  i18n: {
    en: {
      name: "Hera",
      version: "Queen of the Gods",
      text: [
        {
          title: "Ward",
        },
        {
          title: "PROTECTIVE GODDESS",
          description: "Your characters named Zeus gain Ward.",
        },
        {
          title: "YOU'RE A TRUE HERO",
          description: "Your characters named Hercules gain Evasive.",
        },
      ],
    },
    de: {
      name: "Hera",
      version: "Königin der Götter",
      text: "Behütet SCHÜTZENDE GÖTTIN Deine Zeus-Charaktere erhalten Behütet. DU BIST EIN WAHRER HELD Deine Hercules-Charaktere erhalten Wendig.",
    },
    fr: {
      name: "Héra",
      version: "Reine des Dieux",
      text: "Hors d'atteinte DÉESSE PROTECTRICE Vos personnages Zeus gagnent Hors d'atteinte. TU ES UN VÉRITABLE HÉROS Vos personnages Hercule gagnent Insaisissable. (Seuls les personnages avec Insaisissable peuvent défier ces personnages.)",
    },
    it: {
      name: "Era",
      version: "Regina degli Dei",
      text: "Protetto DEA PROTETTIVA I tuoi personaggi chiamati Zeus ottengono Protetto. SEI UN VERO EROE I tuoi personaggi chiamati Ercole ottengono Sfuggente. (Solo altri personaggi con Sfuggente possono sfidarli.)",
    },
  },
  inkType: ["emerald"],
  franchise: "Hercules",
  set: "004",
  cardNumber: 76,
  rarity: "rare",
  cost: 3,
  strength: 1,
  willpower: 3,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_0ac3ee4c2bb043a280fa2e4f7f6505e7",
    tcgPlayer: 549668,
  },
  text: [
    {
      title: "Ward",
    },
    {
      title: "PROTECTIVE GODDESS",
      description: "Your characters named Zeus gain Ward.",
    },
    {
      title: "YOU'RE A TRUE HERO",
      description: "Your characters named Hercules gain Evasive.",
    },
  ],
  classifications: ["Storyborn", "Queen", "Deity"],
  abilities: [
    {
      id: "149-1",
      keyword: "Ward",
      text: "Ward",
      type: "keyword",
    },
    {
      effect: {
        keyword: "Ward",
        target: "YOUR_CHARACTERS",
        type: "gain-keyword",
      },
      id: "149-2",
      text: "PROTECTIVE GODDESS Your characters named Zeus gain Ward.",
      type: "action",
    },
    {
      effect: {
        keyword: "Evasive",
        target: "YOUR_CHARACTERS",
        type: "gain-keyword",
      },
      id: "149-3",
      text: "YOU'RE A TRUE HERO Your characters named Hercules gain Evasive.",
      type: "action",
    },
  ],
};
