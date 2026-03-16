import type { CharacterCard } from "@tcg/lorcana-types";

export const naniHeistMastermind: CharacterCard = {
  id: "3b6",
  canonicalId: "ci_3b6",
  reprints: ["set8-165"],
  cardType: "character",
  name: "Nani",
  version: "Heist Mastermind",
  i18n: {
    en: {
      name: "Nani",
      version: "Heist Mastermind",
      text: [
        {
          title: "STICK TO THE PLAN",
          description: "{E} — Another chosen character gains Resist +2 this turn.",
        },
        {
          title: "IT'S UP TO YOU, LILO",
          description:
            "Your characters named Lilo gain Support. (Whenever they quest, you may add their {S} to another chosen character's {S} this turn.)",
        },
      ],
    },
    de: {
      name: "Nani",
      version: "Diebisches Superhirn",
      text: [
        {
          title: "HALTE DICH AN DEN PLAN",
          description:
            "— Ein anderer Charakter deiner Wahl erhält in diesem Zug Robust +2. (Reduziere jeglichen Schaden, der dem Charakter zugefügt wird, um 2.) ES LIEGT AN DIR, LILO Deine Lilo-Charaktere erhalten Unterstützen. (Jedes Mal, wenn die Charaktere erkunden, darfst du ihre in diesem Zug zur eines anderen Charakters deiner Wahl addieren.)",
        },
      ],
    },
    fr: {
      name: "Nani",
      version: "Cerveau du vol",
      text: [
        {
          title: "S'EN TENIR AU PLAN",
          description:
            "— Choisissez un autre personnage qui gagne Résistance +2 pour le reste de ce tour. À TOI DE JOUER, LILO Vos personnages nommés Lilo gagnent Soutien. (Lorsque ces personnages sont envoyés à l'aventure, vous pouvez ajouter leur à celle d'un autre personnage au choix pour le reste de ce tour.)",
        },
      ],
    },
    it: {
      name: "Nani",
      version: "Ideatrice del Colpo",
      text: [
        {
          title: "ATTIENITI AL PIANO",
          description:
            "— Un altro personaggio a tua scelta ottiene Resistere +2 per questo turno. TOCCA A TE, LILO I tuoi personaggi chiamati Lilo ottengono Aiutante. (Ogni volta che vanno all'avventura, puoi aggiungere la loro alla di un altro personaggio a tua scelta per questo turno.)",
        },
      ],
    },
  },
  inkType: ["sapphire"],
  franchise: "Lilo and Stitch",
  set: "008",
  cardNumber: 165,
  rarity: "rare",
  cost: 4,
  strength: 3,
  willpower: 3,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_b5e5171ece4a407eb3261f2f026f4df7",
    tcgPlayer: 631462,
  },
  text: [
    {
      title: "STICK TO THE PLAN",
      description: "{E} — Another chosen character gains Resist +2 this turn.",
    },
    {
      title: "IT'S UP TO YOU, LILO",
      description:
        "Your characters named Lilo gain Support. (Whenever they quest, you may add their {S} to another chosen character's {S} this turn.)",
    },
  ],
  classifications: ["Storyborn", "Hero"],
  abilities: [
    {
      cost: {
        exert: true,
      },
      effect: {
        duration: "this-turn",
        keyword: "Resist",
        target: {
          cardTypes: ["character"],
          count: 1,
          owner: "any",
          selector: "chosen",
          zones: ["play"],
        },
        type: "gain-keyword",
        value: 2,
      },
      id: "d2e-1",
      text: "STICK TO THE PLAN {E} — Another chosen character gains Resist +2 this turn.",
      type: "activated",
    },
    {
      effect: {
        keyword: "Support",
        target: "YOUR_CHARACTERS",
        type: "gain-keyword",
      },
      id: "d2e-2",
      text: "IT'S UP TO YOU, LILO Your characters named Lilo gain Support.",
      type: "action",
    },
  ],
};
