import type { CharacterCard } from "@tcg/lorcana-types";

export const arielEtherealVoiceIconic: CharacterCard = {
  id: "P7j",
  canonicalId: "ci_izM",
  reprints: ["set10-017"],
  cardType: "character",
  name: "Ariel",
  version: "Ethereal Voice",
  i18n: {
    en: {
      name: "Ariel",
      version: "Ethereal Voice",
      text: [
        {
          title: "Boost 1 {I}",
        },
        {
          title: "COMMAND PERFORMANCE",
          description:
            "Once during your turn, whenever you play a song, if there's a card under this character, you may draw a card.",
        },
      ],
    },
    de: {
      name: "Arielle",
      version: "Ätherische Stimme",
      text: "Stärken 1 ANORDNUNG ZUM AUFTRITT Einmal während deines Zuges, wenn du ein Lied ausspielst und falls dieser Charakter mindestens eine Karte unter sich hat, darfst du 1 Karte ziehen.",
    },
    fr: {
      name: "Ariel",
      version: "Voix éthérée",
      text: "Boost 1 COMMANDE SPÉCIALE Une fois durant votre tour, lorsque vous jouez une chanson, s'il y a une carte sous ce personnage, vous pouvez piocher une carte.",
    },
    it: {
      name: "Ariel",
      version: "Voce Eterea",
      text: "Potenziamento 1 RICHIESTA DI ESIBIZIONE Una volta durante il tuo turno, ogni volta che giochi una canzone, se c'è una carta sotto a questo personaggio, puoi pescare una carta.",
    },
  },
  inkType: ["amber"],
  franchise: "Little Mermaid",
  set: "010",
  cardNumber: 241,
  rarity: "common",
  specialRarity: "iconic",
  cost: 4,
  strength: 3,
  willpower: 4,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_5b53a4c5b3854ab0ba71dd388aaa0d9f",
    tcgPlayer: 657885,
  },
  text: [
    {
      title: "Boost 1 {I}",
    },
    {
      title: "COMMAND PERFORMANCE",
      description:
        "Once during your turn, whenever you play a song, if there's a card under this character, you may draw a card.",
    },
  ],
  classifications: ["Storyborn", "Hero", "Princess", "Whisper"],
  abilities: [
    {
      id: "1l1-1",
      keyword: "Boost",
      type: "keyword",
      value: 1,
      text: "Boost 1 {I}",
    },
    {
      id: "1l1-2",
      effect: {
        condition: {
          expression: "there's a card under this character",
          type: "if",
        },
        then: {
          amount: 1,
          target: "CONTROLLER",
          type: "draw",
        },
        type: "conditional",
      },
      name: "COMMAND PERFORMANCE Once",
      trigger: {
        event: "play",
        on: {
          cardType: "action",
          controller: "you",
        },
        timing: "whenever",
      },
      type: "triggered",
      text: "COMMAND PERFORMANCE Once during your turn, whenever you play a song, if there's a card under this character, you may draw a card.",
    },
  ],
};
