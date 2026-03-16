import type { CharacterCard } from "@tcg/lorcana-types";

export const captainHookThePirateKing: CharacterCard = {
  id: "3AG",
  canonicalId: "ci_dkw",
  reprints: ["set8-109"],
  cardType: "character",
  name: "Captain Hook",
  version: "The Pirate King",
  i18n: {
    en: {
      name: "Captain Hook",
      version: "The Pirate King",
      text: [
        {
          title: "Shift 3",
        },
        {
          title: "GIVE 'EM ALL YOU GOT!",
          description:
            "Once during your turn, whenever an opposing character is damaged, your Pirate characters get +2 {S} and gain Resist +2 this turn.",
        },
      ],
    },
    de: {
      name: "Käpt'n Hook",
      version: "König der Piraten",
      text: "Gestaltwandel 3 GEBT IHNEN DEN REST! Einmal während deines Zuges, wenn ein gegnerischer Charakter beschädigt wird, erhalten deine Piraten in diesem Zug +2 und Robust +2. (Reduziere jeglichen Schaden, der den Charakteren zugefügt wird, um 2.)",
    },
    fr: {
      name: "Capitaine Crochet",
      version: "Le roi des pirates",
      text: "Alter 3 DONNEZ TOUT CE QUE VOUS AVEZ! Une fois durant votre tour, lorsqu'un personnage adverse subit un dommage ou plus, vos personnages Pirate gagnent +2 et Résistance +2 pour le reste de ce tour.",
    },
    it: {
      name: "Capitan Uncino",
      version: "Il Re dei Pirati",
      text: "Trasformazione 3 DATECI DENTRO FINO ALL'ULTIMO! Una volta durante il tuo turno, ogni volta che un personaggio avversario viene danneggiato, i tuoi personaggi Pirata ricevono +2 e ottengono Resistere +2 per questo turno.",
    },
  },
  inkType: ["emerald", "steel"],
  franchise: "Peter Pan",
  set: "008",
  cardNumber: 109,
  rarity: "rare",
  cost: 5,
  strength: 4,
  willpower: 5,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_0a53330fb9424adcab9e92d04aa428a0",
    tcgPlayer: 632251,
  },
  text: [
    {
      title: "Shift 3",
    },
    {
      title: "GIVE 'EM ALL YOU GOT!",
      description:
        "Once during your turn, whenever an opposing character is damaged, your Pirate characters get +2 {S} and gain Resist +2 this turn.",
    },
  ],
  classifications: ["Floodborn", "Villain", "King", "Pirate", "Captain"],
  abilities: [
    {
      cost: {
        ink: 3,
      },
      id: "1na-1",
      keyword: "Shift",
      text: "Shift 3",
      type: "keyword",
    },
    {
      effect: {
        steps: [
          {
            modifier: 2,
            stat: "strength",
            target: "YOUR_CHARACTERS",
            type: "modify-stat",
          },
          {
            duration: "this-turn",
            keyword: "Resist",
            target: "SELF",
            type: "gain-keyword",
            value: 2,
          },
        ],
        type: "sequence",
      },
      id: "1na-2",
      text: "GIVE ’EM ALL YOU GOT! Once during your turn, whenever an opposing character is damaged, your Pirate characters get +2 {S} and gain Resist +2 this turn.",
      type: "static",
    },
  ],
};
