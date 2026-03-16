import type { CharacterCard } from "@tcg/lorcana-types";

export const aladdinBarrelingThrough: CharacterCard = {
  id: "c04",
  canonicalId: "ci_pqa",
  reprints: ["set10-123"],
  cardType: "character",
  name: "Aladdin",
  version: "Barreling Through",
  i18n: {
    en: {
      name: "Aladdin",
      version: "Barreling Through",
      text: [
        {
          title: "Boost 1 {I}",
        },
        {
          title: "Reckless",
        },
        {
          title: "ONLY THE BOLD",
          description:
            'While there\'s a card under this character, your characters with Reckless gain "{E} — Gain 1 lore."',
        },
      ],
    },
    de: {
      name: "Aladdin",
      version: "Volle Kraft voraus",
      text: 'Stärken 1 Impulsiv NUR DIE KRÄFTIGEN Solange dieser Charakter mindestens eine Karte unter sich hat, erhalten deine Charaktere mit Impulsiv " — Sammle 1 Legende".',
    },
    fr: {
      name: "Aladdin",
      version: "À toute allure",
      text: 'Boost 1 Combattant SEULS LES AUDACIEUX Tant qu\'il y a une carte sous ce personnage, vos personnages avec Combattant gagnent " — Gagnez 1 éclat de Lore."',
    },
    it: {
      name: "Aladdin",
      version: "Alla Carica",
      text: [
        {
          title: "Potenziamento 1",
          description:
            '(Una volta durante il tuo turno, puoi pagare 1 per mettere la prima carta del tuo mazzo a faccia in giù sotto a questo personaggio.) Attaccabrighe SOLO I CORAGGIOSI Mentre c\'è una carta sotto a questo personaggio, i tuoi personaggi con Attaccabrighe ottengono " — Ottieni 1 leggenda".',
        },
      ],
    },
  },
  inkType: ["ruby"],
  franchise: "Aladdin",
  set: "010",
  cardNumber: 123,
  rarity: "rare",
  cost: 3,
  strength: 4,
  willpower: 4,
  lore: 0,
  inkable: true,
  externalIds: {
    lorcast: "crd_eca465c4f9f6483db912ae876f8011ce",
    tcgPlayer: 660269,
  },
  text: [
    {
      title: "Boost 1 {I}",
    },
    {
      title: "Reckless",
    },
    {
      title: "ONLY THE BOLD",
      description:
        'While there\'s a card under this character, your characters with Reckless gain "{E} — Gain 1 lore."',
    },
  ],
  classifications: ["Storyborn", "Hero", "Whisper"],
  abilities: [
    {
      id: "1tr-1",
      keyword: "Boost",
      text: "Boost 1 {I}",
      type: "keyword",
      value: 1,
    },
    {
      id: "1tr-2",
      keyword: "Reckless",
      text: "Reckless",
      type: "keyword",
    },
    {
      cost: {
        exert: true,
      },
      effect: {
        amount: 1,
        type: "gain-lore",
      },
      id: "1tr-3",
      text: 'ONLY THE BOLD While there\'s a card under this character, your characters with Reckless gain "{E} — Gain 1 lore."',
      type: "activated",
    },
  ],
};
