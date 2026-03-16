import type { CharacterCard } from "@tcg/lorcana-types";

export const falinePlayfulFawn: CharacterCard = {
  id: "OjR",
  canonicalId: "ci_OjR",
  reprints: ["set8-145"],
  cardType: "character",
  name: "Faline",
  version: "Playful Fawn",
  i18n: {
    en: {
      name: "Faline",
      version: "Playful Fawn",
      text: [
        {
          title: "Evasive",
        },
        {
          title: "PRECOCIOUS FRIEND",
          description:
            "While you have a character in play with more {S} than each opposing character, this character gets +2 {L}.",
        },
      ],
    },
    de: {
      name: "Feline",
      version: "Verspieltes Rehkitz",
      text: "Wendig VORWITZIGE FREUNDIN Solange du einen Charakter mit einer höheren als die jedes gegnerischen Charakters im Spiel hast, erhält dieser Charakter +2.",
    },
    fr: {
      name: "Féline",
      version: "Faonne enjouée",
      text: "Insaisissable AMIE DE JEUNESSE Tant que vous avez un personnage en jeu avec plus de que n'importe quel autre personnage adverse, ce personnage-ci gagne +2.",
    },
    it: {
      name: "Faline",
      version: "Cerbiatta Giocosa",
      text: "Sfuggente AMICA ALLA MANO Mentre hai in gioco un personaggio con più di ogni personaggio avversario, questo personaggio riceve +2.",
    },
  },
  inkType: ["ruby"],
  franchise: "Bambi",
  set: "008",
  cardNumber: 145,
  rarity: "rare",
  cost: 4,
  strength: 2,
  willpower: 4,
  lore: 1,
  inkable: false,
  externalIds: {
    lorcast: "crd_586a47f740a3450b930cd1cbc7f3e640",
    tcgPlayer: 631445,
  },
  text: [
    {
      title: "Evasive",
    },
    {
      title: "PRECOCIOUS FRIEND",
      description:
        "While you have a character in play with more {S} than each opposing character, this character gets +2 {L}.",
    },
  ],
  classifications: ["Storyborn", "Ally"],
  abilities: [
    {
      id: "12c-1",
      keyword: "Evasive",
      text: "Evasive",
      type: "keyword",
    },
    {
      effect: {
        modifier: 2,
        stat: "lore",
        target: "SELF",
        type: "modify-stat",
      },
      id: "12c-2",
      text: "PRECOCIOUS FRIEND While you have a character in play with more {S} than each opposing character, this character gets +2 {L}.",
      type: "action",
    },
  ],
};
