import type { CharacterCard } from "@tcg/lorcana-types";

export const perditaPlayfulMother: CharacterCard = {
  id: "uxF",
  canonicalId: "ci_uxF",
  reprints: ["set7-002"],
  cardType: "character",
  name: "Perdita",
  version: "Playful Mother",
  i18n: {
    en: {
      name: "Perdita",
      version: "Playful Mother",
      text: [
        {
          title: "WHO'S NEXT?",
          description:
            "Whenever this character quests, you pay 2 {I} less for the next Puppy character you play this turn.",
        },
        {
          title: "DON'T BE AFRAID",
          description: "Your Puppy characters gain Ward.",
        },
      ],
    },
    de: {
      name: "Perdi",
      version: "Verspielte Mutter",
      text: [
        {
          title: "WER KOMMT ALS NÄCHSTES?",
          description:
            "Jedes Mal, wenn dieser Charakter erkundet, zahlst du 2 weniger für den nächsten Welpen, den du in diesem Zug ausspielst.",
        },
        {
          title: "HABT KEINE ANGST",
          description:
            "Deine Welpen erhalten Behütet. (Gegnerische Mitspielende können diese Charaktere nicht auswählen, außer um sie herauszufordern.)",
        },
      ],
    },
    fr: {
      name: "Perdita",
      version: "Mère joueuse",
      text: [
        {
          title: "À QUI LE TOUR?",
          description:
            "Chaque fois que ce personnage est envoyé à l'aventure, le prochain personnage Chiot que vous jouez ce tour-ci vous coûte 2 de moins.",
        },
        {
          title: "N'AIE PAS PEUR",
          description:
            "Vos personnages Chiot gagnent Hors d'atteinte. (Les adversaires ne peuvent pas choisir ces personnages, hormis pour un défi.)",
        },
      ],
    },
    it: {
      name: "Peggy",
      version: "Madre Giocosa",
      text: [
        {
          title: "A CHI TOCCA?",
          description:
            "Ogni volta che questo personaggio va all'avventura, paga 2 in meno per giocare il tuo prossimo personaggio Cucciolo per questo turno.",
        },
        {
          title: "NON AVER PAURA I",
          description:
            "tuoi personaggi Cucciolo ottengono Protetto. (Gli avversari non possono sceglierli se non per sfidarli.)",
        },
      ],
    },
  },
  inkType: ["amber", "sapphire"],
  franchise: "101 Dalmatians",
  set: "007",
  cardNumber: 2,
  rarity: "rare",
  cost: 4,
  strength: 1,
  willpower: 4,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_9290224bc0aa4571a72a8cca9b3dc655",
    tcgPlayer: 618213,
  },
  text: [
    {
      title: "WHO'S NEXT?",
      description:
        "Whenever this character quests, you pay 2 {I} less for the next Puppy character you play this turn.",
    },
    {
      title: "DON'T BE AFRAID",
      description: "Your Puppy characters gain Ward.",
    },
  ],
  classifications: ["Storyborn", "Hero"],
  abilities: [
    {
      effect: {
        amount: 2,
        cardType: "character",
        classification: "Puppy",
        duration: "next-play-this-turn",
        target: "CONTROLLER",
        type: "cost-reduction",
      },
      id: "ehi-1",
      name: "WHO'S NEXT?",
      text: "WHO'S NEXT? Whenever this character quests, you pay 2 {I} less for the next Puppy character you play this turn.",
      trigger: {
        event: "quest",
        on: "SELF",
        timing: "whenever",
      },
      type: "triggered",
    },
    {
      effect: {
        keyword: "Ward",
        target: "YOUR_CHARACTERS",
        type: "gain-keyword",
      },
      id: "ehi-2",
      name: "DON'T BE AFRAID Your Puppy",
      text: "DON'T BE AFRAID Your Puppy characters gain Ward.",
      type: "static",
    },
  ],
};
