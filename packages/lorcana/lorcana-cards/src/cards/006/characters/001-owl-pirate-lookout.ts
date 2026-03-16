import type { CharacterCard } from "@tcg/lorcana-types";

export const owlPirateLookout: CharacterCard = {
  id: "6MA",
  canonicalId: "ci_6MA",
  reprints: ["set6-001"],
  cardType: "character",
  name: "Owl",
  version: "Pirate Lookout",
  i18n: {
    en: {
      name: "Owl",
      version: "Pirate Lookout",
      text: [
        {
          title: "WELL SPOTTED",
          description:
            "During your turn, whenever a card is put into your inkwell, chosen opposing character gets -1 {S} until the start of your next turn.",
        },
      ],
    },
    de: {
      name: "Eule",
      version: "Piraten-Ausguck",
      text: [
        {
          title: "GUT ERKANNT",
          description:
            "Jedes Mal während deines Zuges, wenn eine Karte in deinen Tintenvorrat gelegt wird, erhält ein gegnerischer Charakter deiner Wahl bis zu Beginn deines nächsten Zuges -1.",
        },
      ],
    },
    fr: {
      name: "Maître Hibou",
      version: "Vigie pirate",
      text: [
        {
          title: "BIEN VU",
          description:
            "Durant votre tour, chaque fois qu'une carte est placée dans votre réserve d'encre, choisissez un personnage adverse qui subit -1 jusqu'au début de votre prochain tour.",
        },
      ],
    },
    it: {
      name: "Uffa",
      version: "Vedetta Pirata",
      text: [
        {
          title: "CHE OCCHIO!",
          description:
            "Durante il tuo turno, ogni volta che una carta viene aggiunta al tuo calamaio, un personaggio avversario a tua scelta riceve -1 fino all'inizio del tuo prossimo turno.",
        },
      ],
    },
  },
  inkType: ["amber"],
  franchise: "Winnie the Pooh",
  set: "006",
  cardNumber: 1,
  rarity: "uncommon",
  cost: 3,
  strength: 3,
  willpower: 3,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_7b8a887fbfda4b869f7529f31da115f6",
    tcgPlayer: 588072,
  },
  text: [
    {
      title: "WELL SPOTTED",
      description:
        "During your turn, whenever a card is put into your inkwell, chosen opposing character gets -1 {S} until the start of your next turn.",
    },
  ],
  classifications: ["Storyborn", "Ally", "Pirate"],
  abilities: [
    {
      effect: {
        modifier: -1,
        stat: "strength",
        target: "CHOSEN_CHARACTER",
        type: "modify-stat",
      },
      id: "kq3-1",
      name: "WELL SPOTTED",
      text: "WELL SPOTTED During your turn, whenever a card is put into your inkwell, chosen opposing character gets -1 {S} until the start of your next turn.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
