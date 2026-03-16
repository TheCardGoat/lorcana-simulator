import type { CharacterCard } from "@tcg/lorcana-types";

export const maidMarianBadmintonAce: CharacterCard = {
  id: "II0",
  canonicalId: "ci_II0",
  reprints: ["set7-176"],
  cardType: "character",
  name: "Maid Marian",
  version: "Badminton Ace",
  i18n: {
    en: {
      name: "Maid Marian",
      version: "Badminton Ace",
      text: [
        {
          title: "GOOD SHOT",
          description:
            "During an opponent's turn, whenever one of your Ally characters is damaged, deal 1 damage to chosen opposing character.",
        },
        {
          title: "FAIR PLAY",
          description: "Your characters named Lady Kluck gain Resist +1.",
        },
      ],
    },
    de: {
      name: "Maid Marian",
      version: "Badminton-Ass",
      text: [
        {
          title: "EIN GUTER SCHLAG",
          description:
            "Jedes Mal, wenn einer deiner Verbündeten im Zug einer gegnerischen Person Schaden erhält, füge einem gegnerischen Charakter deiner Wahl 1 Schaden zu.",
        },
        {
          title: "FAIRES SPIEL",
          description:
            "Deine Lady-Gluck-Charaktere erhalten Robust +1 (Reduziere jeglichen Schaden, der ihnen zugefügt wird, um 1.)",
        },
      ],
    },
    fr: {
      name: "Belle Marianne",
      version: "As du badminton",
      text: [
        {
          title: "FORT BIEN JOUÉ",
          description:
            "Durant le tour d'un adversaire, chaque fois que l'un de vos personnages Allié subit des dommages, choisissez un personnage adverse et infligez-lui 1 dommage.",
        },
        {
          title: "ESPRIT SPORTIF",
          description: "Vos personnages Dame Gertrude gagnent Résistance +1.",
        },
      ],
    },
    it: {
      name: "Lady Marian",
      version: "Asso del Volano",
      text: [
        {
          title: "BEL COLPO",
          description:
            "Durante il turno di un avversario, ogni volta che uno dei tuoi personaggi Alleato viene danneggiato, infliggi 1 danno a un personaggio avversario a tua scelta.",
        },
        {
          title: "FAIR PLAY I",
          description: "tuoi personaggi chiamati Lady Cocca ottengono Resistere +1.",
        },
      ],
    },
  },
  inkType: ["sapphire", "steel"],
  franchise: "Robin Hood",
  set: "007",
  cardNumber: 176,
  rarity: "common",
  cost: 4,
  strength: 3,
  willpower: 3,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_1a7dadb10b334375b5b5b4eca2cce42c",
    tcgPlayer: 619508,
  },
  text: [
    {
      title: "GOOD SHOT",
      description:
        "During an opponent's turn, whenever one of your Ally characters is damaged, deal 1 damage to chosen opposing character.",
    },
    {
      title: "FAIR PLAY",
      description: "Your characters named Lady Kluck gain Resist +1.",
    },
  ],
  classifications: ["Dreamborn", "Hero", "Princess"],
  abilities: [
    {
      effect: {
        amount: 1,
        target: {
          cardTypes: ["character"],
          count: 1,
          owner: "opponent",
          selector: "chosen",
          zones: ["play"],
        },
        type: "deal-damage",
      },
      id: "6at-1",
      text: "GOOD SHOT During an opponent's turn, whenever one of your Ally characters is damaged, deal 1 damage to chosen opposing character.",
      type: "action",
    },
    {
      effect: {
        keyword: "Resist",
        target: "YOUR_CHARACTERS",
        type: "gain-keyword",
        value: 1,
      },
      id: "6at-2",
      text: "FAIR PLAY Your characters named Lady Kluck gain Resist +1.",
      type: "action",
    },
  ],
};
