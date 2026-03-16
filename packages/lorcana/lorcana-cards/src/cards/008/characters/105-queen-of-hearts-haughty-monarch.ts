import type { CharacterCard } from "@tcg/lorcana-types";

export const queenOfHeartsHaughtyMonarch: CharacterCard = {
  id: "OAZ",
  canonicalId: "ci_OAZ",
  reprints: ["set8-105"],
  cardType: "character",
  name: "Queen of Hearts",
  version: "Haughty Monarch",
  i18n: {
    en: {
      name: "Queen of Hearts",
      version: "Haughty Monarch",
      text: [
        {
          title: "COUNT OFF!",
          description:
            "While there are 5 or more characters with damage in play, this character gets +3 {L}.",
        },
      ],
    },
    de: {
      name: "Die Herzkönigin",
      version: "Hochmütige Monarchin",
      text: [
        {
          title: "ZÄHLT AB!",
          description:
            "Solange mindestens 5 Charaktere im Spiel beschädigt sind, erhält dieser Charakter +3.",
        },
      ],
    },
    fr: {
      name: "La Reine de Cœur",
      version: "Monarque hautaine",
      text: [
        {
          title: "COMPTEZ-VOUS!",
          description:
            "Tant qu'il y a 5 personnages ou plus en jeu ayant au moins un dommage, ce personnage-ci gagne +3.",
        },
      ],
    },
    it: {
      name: "La Regina di Cuori",
      version: "Monarca Altezzosa",
      text: [
        {
          title: "CONTA!",
          description:
            "Mentre sono in gioco 5 o più personaggi con danno, questo personaggio riceve +3.",
        },
      ],
    },
  },
  inkType: ["emerald", "ruby"],
  franchise: "Alice in Wonderland",
  set: "008",
  cardNumber: 105,
  rarity: "common",
  cost: 4,
  strength: 2,
  willpower: 3,
  lore: 3,
  inkable: true,
  externalIds: {
    lorcast: "crd_f941ecb827224dc5ae1054314c084d0f",
    tcgPlayer: 631688,
  },
  text: [
    {
      title: "COUNT OFF!",
      description:
        "While there are 5 or more characters with damage in play, this character gets +3 {L}.",
    },
  ],
  classifications: ["Storyborn", "Villain", "Queen"],
  abilities: [
    {
      effect: {
        modifier: 3,
        stat: "lore",
        target: "SELF",
        type: "modify-stat",
      },
      id: "1dq-1",
      text: "COUNT OFF! While there are 5 or more characters with damage in play, this character gets +3 {L}.",
      type: "action",
    },
  ],
};
