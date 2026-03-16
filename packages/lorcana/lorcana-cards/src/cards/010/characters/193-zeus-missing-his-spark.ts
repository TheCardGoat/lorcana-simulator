import type { CharacterCard } from "@tcg/lorcana-types";

export const zeusMissingHisSpark: CharacterCard = {
  id: "s59",
  canonicalId: "ci_s59",
  reprints: ["set10-193"],
  cardType: "character",
  name: "Zeus",
  version: "Missing His Spark",
  i18n: {
    en: {
      name: "Zeus",
      version: "Missing His Spark",
      text: [
        {
          title: "Boost 2 {I}",
        },
        {
          title: "I NEED MORE THUNDERBOLTS!",
          description: "While there's a card under this character, he gets +2 {S} and +2 {W}.",
        },
      ],
    },
    de: {
      name: "Zeus",
      version: "Vermisst seine Blitze",
      text: "Stärken 2 MIR GEHEN DIE BLITZE AUS Solange dieser Charakter mindestens eine Karte unter sich hat, erhält er +2 und +2.",
    },
    fr: {
      name: "Zeus",
      version: "Sans son étincelle",
      text: "Boost 2 DONNEZ-MOI PLUS DE FOUDRE! Tant qu'il y a une carte sous ce personnage, il gagne +2 et +2.",
    },
    it: {
      name: "Zeus",
      version: "Senza la Sua Scintilla",
      text: [
        {
          title: "Potenziamento 2",
          description:
            "(Una volta durante il tuo turno, puoi pagare 2 per mettere la prima carta del tuo mazzo a faccia in giù sotto a questo personaggio.) MI SERVONO ALTRE SAETTE, FORZA! Mentre c'è una carta sotto a questo personaggio, questo riceve +2 e +2.",
        },
      ],
    },
  },
  inkType: ["steel"],
  franchise: "Hercules",
  set: "010",
  cardNumber: 193,
  rarity: "uncommon",
  cost: 3,
  strength: 2,
  willpower: 3,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_0e33059eee7d4f39a4082bb9b1211660",
    tcgPlayer: 659387,
  },
  text: [
    {
      title: "Boost 2 {I}",
    },
    {
      title: "I NEED MORE THUNDERBOLTS!",
      description: "While there's a card under this character, he gets +2 {S} and +2 {W}.",
    },
  ],
  classifications: ["Storyborn", "King", "Deity", "Whisper"],
  abilities: [
    {
      id: "gow-1",
      keyword: "Boost",
      text: "Boost 2 {I}",
      type: "keyword",
      value: 2,
    },
    {
      effect: {
        modifier: 2,
        stat: "strength",
        target: "SELF",
        type: "modify-stat",
      },
      id: "gow-2",
      text: "I NEED MORE THUNDERBOLTS! While there's a card under this character, he gets +2 {S} and +2 {W}.",
      type: "static",
    },
  ],
};
