import type { CharacterCard } from "@tcg/lorcana-types";

export const ursulaWhisperOfVanessa: CharacterCard = {
  id: "BB3",
  canonicalId: "ci_BB3",
  reprints: ["set10-059"],
  cardType: "character",
  name: "Ursula",
  version: "Whisper of Vanessa",
  i18n: {
    en: {
      name: "Ursula",
      version: "Whisper of Vanessa",
      text: [
        {
          title: "Boost 1 {I}",
        },
        {
          title: "SLIPPERY SPELL",
          description:
            "While there's a card under this character, she gets +1 {L} and gains Evasive.",
        },
      ],
    },
    de: {
      name: "Ursula",
      version: "Geflüster von Vanessa",
      text: "Stärken 1 GERISSENER ZAUBER Solange dieser Charakter mindestens eine Karte unter sich hat, erhält er +1 und Wendig.",
    },
    fr: {
      name: "Ursula",
      version: "Lueur de Vanessa",
      text: "Boost 1 SORT ÉVASIF Tant qu'il y a une carte sous ce personnage, il gagne +1 et Insaisissable.",
    },
    it: {
      name: "Ursula",
      version: "Sussurro di Vanessa",
      text: [
        {
          title: "Potenziamento 1",
          description:
            "(Una volta durante il tuo turno, puoi pagare 1 per mettere la prima carta del tuo mazzo a faccia in giù sotto a questo personaggio.) INCANTESIMO SUBDOLO Mentre c'è una carta sotto a questo personaggio, questo riceve +1 e ottiene Sfuggente. (Solo altri personaggi con Sfuggente possono sfidarlo.)",
        },
      ],
    },
  },
  inkType: ["amethyst"],
  franchise: "Little Mermaid",
  set: "010",
  cardNumber: 59,
  rarity: "rare",
  cost: 5,
  strength: 4,
  willpower: 5,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_340e919c6c0647b89636411cc834debc",
    tcgPlayer: 658327,
  },
  text: [
    {
      title: "Boost 1 {I}",
    },
    {
      title: "SLIPPERY SPELL",
      description: "While there's a card under this character, she gets +1 {L} and gains Evasive.",
    },
  ],
  classifications: ["Storyborn", "Villain", "Sorcerer", "Whisper"],
  abilities: [
    {
      id: "86p-1",
      keyword: "Boost",
      text: "Boost 1 {I}",
      type: "keyword",
      value: 1,
    },
    {
      effect: {
        steps: [
          {
            modifier: 1,
            stat: "lore",
            target: "SELF",
            type: "modify-stat",
          },
          {
            keyword: "Evasive",
            target: "SELF",
            type: "gain-keyword",
          },
        ],
        type: "sequence",
      },
      id: "86p-2",
      text: "SLIPPERY SPELL While there's a card under this character, she gets +1 {L} and gains Evasive.",
      type: "static",
    },
  ],
};
