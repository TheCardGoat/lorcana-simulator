import type { CharacterCard } from "@tcg/lorcana-types";

export const megaraSecretKeeperEpic: CharacterCard = {
  id: "Sa5",
  canonicalId: "ci_uSJ",
  reprints: ["set10-086"],
  cardType: "character",
  name: "Megara",
  version: "Secret Keeper",
  i18n: {
    en: {
      name: "Megara",
      version: "Secret Keeper",
      text: [
        {
          title: "Boost 1 {I}",
        },
        {
          title: "I'LL BE FINE",
          description:
            'While there\'s a card under this character, she gets +1 {L} and gains "Whenever this character is challenged, each opponent chooses and discards a card."',
        },
      ],
    },
    de: {
      name: "Meg",
      version: "Geheimnishüterin",
      text: 'Stärken 1 ES WIRD SCHON WIEDER Solange dieser Charakter mindestens eine Karte unter sich hat, erhält er +1 und "Jedes Mal, wenn dieser Charakter herausgefordert wird, wählen alle gegnerischen Mitspielenden je 1 Karte aus ihrer Hand und werfen sie ab".',
    },
    fr: {
      name: "Mégara",
      version: "Gardienne du secret",
      text: 'Boost 1 OH, JE SURVIVRAI Tant qu\'il y a une carte sous ce personnage, il gagne +1 et "Chaque fois que ce personnage est défié, chaque adversaire défausse une carte."',
    },
    it: {
      name: "Megara",
      version: "Custode dei Segreti",
      text: [
        {
          title: "Potenziamento 1",
          description:
            '(Una volta durante il tuo turno, puoi pagare 1 per mettere la prima carta del tuo mazzo a faccia in giù sotto a questo personaggio.) STO BENISSIMO Mentre c\'è una carta sotto a questo personaggio, questo riceve +1 e ottiene "Ogni volta che questo personaggio viene sfidato, ogni avversario sceglie e scarta una carta".',
        },
      ],
    },
  },
  inkType: ["emerald"],
  franchise: "Hercules",
  set: "010",
  cardNumber: 213,
  rarity: "common",
  specialRarity: "epic",
  cost: 3,
  strength: 3,
  willpower: 4,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_78c11305e1674d348fe8839940f029a5",
    tcgPlayer: 658217,
  },
  text: [
    {
      title: "Boost 1 {I}",
    },
    {
      title: "I'LL BE FINE",
      description:
        'While there\'s a card under this character, she gets +1 {L} and gains "Whenever this character is challenged, each opponent chooses and discards a card."',
    },
  ],
  classifications: ["Storyborn", "Ally", "Whisper"],
  abilities: [
    {
      id: "1af-1",
      keyword: "Boost",
      text: "Boost 1 {I}",
      type: "keyword",
      value: 1,
    },
    {
      effect: {
        modifier: 1,
        stat: "lore",
        target: "SELF",
        type: "modify-stat",
      },
      id: "1af-2",
      text: "I'LL BE FINE While there's a card under this character, she gets +1 {L} and gains \"Whenever this character is challenged, each opponent chooses and discards a card.\"",
      type: "static",
    },
  ],
};
