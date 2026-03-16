import type { CharacterCard } from "@tcg/lorcana-types";

export const kidaProtectorOfAtlantis: CharacterCard = {
  id: "lw9",
  canonicalId: "ci_L03",
  reprints: ["set3-007"],
  cardType: "character",
  name: "Kida",
  version: "Protector of Atlantis",
  i18n: {
    en: {
      name: "Kida",
      version: "Protector of Atlantis",
      text: [
        {
          title: "Shift 3",
        },
        {
          title: "PERHAPS WE CAN SAVE OUR FUTURE",
          description:
            "When you play this character, all characters get -3 {S} until the start of your next turn.",
        },
      ],
    },
    de: {
      name: "Kida",
      version: "Wächterin von Atlantis",
      text: "Gestaltwandel 3 VIELLEICHT KÖNNEN WIR UNSERE ZUKUNFT RETTEN Wenn du diesen Charakter ausspielst, gib allen Charakteren bis zu Beginn deines nächsten Zuges -3.",
    },
    fr: {
      name: "Kida",
      version: "Protectrice de l'Atlantide",
      text: "Alter 3 PEUT-ÊTRE POURRONS-NOUS SAUVER NOTRE AVENIR Lorsque vous jouez ce personnage, tous les personnages subissent -3 jusqu'au début de votre prochain tour.",
    },
    it: {
      name: "Kida",
      version: "Protettrice di Atlantide",
      text: "Trasformazione 3 FORSE RIUSCIREMO A SALVARE IL NOSTRO FUTURO Quando giochi questo personaggio, tutti i personaggi ricevono -3 fino all'inizio del tuo prossimo turno.",
    },
  },
  inkType: ["amber"],
  franchise: "Atlantis",
  set: "003",
  cardNumber: 7,
  rarity: "legendary",
  cost: 5,
  strength: 3,
  willpower: 5,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_ae42b2ab4e074f3e91c29d4ba2c3e601",
    tcgPlayer: 539273,
  },
  text: [
    {
      title: "Shift 3",
    },
    {
      title: "PERHAPS WE CAN SAVE OUR FUTURE",
      description:
        "When you play this character, all characters get -3 {S} until the start of your next turn.",
    },
  ],
  classifications: ["Floodborn", "Hero", "Princess"],
  missingTests: true,
  abilities: [
    {
      cost: {
        ink: 3,
      },
      id: "194-1",
      keyword: "Shift",
      text: "Shift 3",
      type: "keyword",
    },
    {
      effect: {
        duration: "until-start-of-next-turn",
        modifier: -3,
        stat: "strength",
        target: "ALL_CHARACTERS",
        type: "modify-stat",
      },
      id: "194-2",
      name: "PERHAPS WE CAN SAVE OUR FUTURE",
      text: "PERHAPS WE CAN SAVE OUR FUTURE When you play this character, all characters get -3 {S} until the start of your next turn.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
