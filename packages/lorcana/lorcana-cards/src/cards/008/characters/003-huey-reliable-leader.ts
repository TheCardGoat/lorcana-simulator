import type { CharacterCard } from "@tcg/lorcana-types";

export const hueyReliableLeader: CharacterCard = {
  id: "h09",
  canonicalId: "ci_h09",
  reprints: ["set8-003"],
  cardType: "character",
  name: "Huey",
  version: "Reliable Leader",
  i18n: {
    en: {
      name: "Huey",
      version: "Reliable Leader",
      text: [
        {
          title: "I KNOW THE WAY",
          description:
            "Whenever this character quests, you pay 1 {I} less for the next character you play this turn.",
        },
      ],
    },
    de: {
      name: "Tick Duck",
      version: "Verlässlicher Anführer",
      text: [
        {
          title: "ICH KENNE DEN WEG",
          description:
            "Jedes Mal, wenn dieser Charakter erkundet, zahlst du 1 weniger für den nächsten Charakter, den du in diesem Zug ausspielst.",
        },
      ],
    },
    fr: {
      name: "Riri",
      version: "Leader sérieux",
      text: [
        {
          title: "JE CONNAIS LE CHEMIN",
          description:
            "Chaque fois que ce personnage est envoyé à l'aventure, le prochain personnage que vous jouez ce tour-ci vous coûte 1 de moins.",
        },
      ],
    },
    it: {
      name: "Qui",
      version: "Leader Affidabile",
      text: [
        {
          title: "CONOSCO LA STRADA",
          description:
            "Ogni volta che questo personaggio va all'avventura, paga 1 in meno per giocare il tuo prossimo personaggio per questo turno.",
        },
      ],
    },
  },
  inkType: ["amber"],
  franchise: "Ducktales",
  set: "008",
  cardNumber: 3,
  rarity: "uncommon",
  cost: 2,
  strength: 2,
  willpower: 3,
  lore: 1,
  inkable: false,
  externalIds: {
    lorcast: "crd_8e39d0718ce5499c92ac736ff111f7e3",
    tcgPlayer: 633429,
  },
  text: [
    {
      title: "I KNOW THE WAY",
      description:
        "Whenever this character quests, you pay 1 {I} less for the next character you play this turn.",
    },
  ],
  classifications: ["Storyborn", "Ally"],
  abilities: [
    {
      effect: {
        from: "hand",
        type: "play-card",
      },
      id: "1g4-1",
      name: "I KNOW THE WAY",
      text: "I KNOW THE WAY Whenever this character quests, you pay 1 {I} less for the next character you play this turn.",
      trigger: {
        event: "quest",
        on: "SELF",
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
};
