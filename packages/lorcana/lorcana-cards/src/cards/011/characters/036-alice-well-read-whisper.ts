import type { CharacterCard } from "@tcg/lorcana-types";

export const aliceWellreadWhisper: CharacterCard = {
  id: "Sgs",
  canonicalId: "ci_Sgs",
  reprints: ["set11-036"],
  cardType: "character",
  name: "Alice",
  version: "Well-Read Whisper",
  i18n: {
    en: {
      name: "Alice",
      version: "Well-Read Whisper",
      text: [
        {
          title: "Boost 2 {I}",
        },
        {
          title: "MYSTICAL INSIGHT",
          description:
            "Whenever this character quests, put all cards from under her into your hand.",
        },
      ],
    },
    de: {
      name: "Alice",
      version: "Belesenes Geflüster",
      text: "Stärken 2 MYSTISCHE EINSICHT Jedes Mal, wenn dieser Charakter erkundet, nimm alle Karten unter ihm auf deine Hand.",
    },
    fr: {
      name: "Alice",
      version: "Lueur cultivée",
      text: "Boost 2 INTUITION MYSTIQUE Chaque fois que ce personnage est envoyé à l'aventure, placez toutes les cartes sous lui dans votre main.",
    },
    it: {
      name: "Alice",
      version: "Sussurro Istruito",
      text: [
        {
          title: "Potenziamento 2",
          description:
            "(Una volta durante il tuo turno, puoi pagare 2 per mettere la prima carta del tuo mazzo a faccia in giù sotto a questo personaggio.) CONOSCENZA MISTICA Ogni volta che questo personaggio va all'avventura, aggiungi tutte le carte sotto di esso alla tua mano.",
        },
      ],
    },
  },
  inkType: ["amethyst"],
  franchise: "Alice in Wonderland",
  set: "011",
  cardNumber: 36,
  rarity: "uncommon",
  cost: 4,
  strength: 4,
  willpower: 4,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_4328715a70224a1fae6ee75034f305fa",
    tcgPlayer: 674841,
  },
  text: [
    {
      title: "Boost 2 {I}",
    },
    {
      title: "MYSTICAL INSIGHT",
      description: "Whenever this character quests, put all cards from under her into your hand.",
    },
  ],
  classifications: ["Storyborn", "Hero", "Whisper"],
  abilities: [],
};
