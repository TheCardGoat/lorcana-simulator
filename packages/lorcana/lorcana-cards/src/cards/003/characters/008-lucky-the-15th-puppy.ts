import type { CharacterCard } from "@tcg/lorcana-types";

export const luckyThe15thPuppy: CharacterCard = {
  id: "nH3",
  canonicalId: "ci_nH3",
  reprints: ["set3-008"],
  cardType: "character",
  name: "Lucky",
  version: "The 15th Puppy",
  i18n: {
    en: {
      name: "Lucky",
      version: "The 15th Puppy",
      text: [
        {
          title: "GOOD AS NEW",
          description:
            "{E} — Reveal the top 3 cards of your deck. You may put each character card with cost 2 or less into your hand. Put the rest on the bottom of your deck in any order.",
        },
        {
          title: "PUPPY LOVE",
          description:
            "Whenever this character quests, if you have 4 or more other characters in play, your other characters get +1 {L} this turn.",
        },
      ],
    },
    de: {
      name: "Lucky",
      version: "Der 15. Welpe",
      text: [
        {
          title: "EIN PRACHTEXEMPLAR",
          description:
            "— Decke die obersten 3 Karten deines Decks auf. Du darfst davon jeden Charakter, der 2 oder weniger kostet, auf deine Hand nehmen. Lege die restlichen Karten in beliebiger Reihenfolge unter dein Deck. HUNDELIEBE Jedes Mal, wenn dieser Charakter erkundet und du mindestens 4 weitere Charaktere im Spiel hast, erhalten deine anderen Charaktere in diesem Zug je +1.",
        },
      ],
    },
    fr: {
      name: "Lucky",
      version: "Le 15e chiot",
      text: [
        {
          title: "CE SERA UN COSTAUD",
          description:
            "— Révélez les 3 premières cartes de votre pioche. Vous pouvez ajouter toutes les cartes personnages coûtant 2 ou moins à votre main. Remettez le reste sous votre pioche, dans l'ordre de votre choix. AMOUR DE CHIOT Si vous avez au moins 4 autres cartes personnages en jeu lorsque ce personnage est envoyé à l'aventure, vos autres personnages gagnent +1 pour le reste de ce tour.",
        },
      ],
    },
    it: {
      name: "Lucky",
      version: "Quindicesimo Cucciolo",
      text: [
        {
          title: "PIÙ VIVO CHE MAI",
          description:
            "— Rivela le prime 3 carte del tuo mazzo. Puoi aggiungere ogni carta personaggio con costo 2 o inferiore alla tua mano. Metti il resto in fondo al tuo mazzo, in qualsiasi ordine. SUPPORTO TRA CUCCIOLI Ogni volta che questo personaggio va all'avventura, se hai altri 4 o più personaggi in gioco, i tuoi altri personaggi ottengono +1 per questo turno.",
        },
      ],
    },
  },
  inkType: ["amber"],
  franchise: "101 Dalmatians",
  set: "003",
  cardNumber: 8,
  rarity: "rare",
  cost: 4,
  strength: 2,
  willpower: 3,
  lore: 1,
  inkable: false,
  externalIds: {
    lorcast: "crd_885f1f8ac17a447fa3c9f7b668fa8663",
    tcgPlayer: 538354,
  },
  text: [
    {
      title: "GOOD AS NEW",
      description:
        "{E} — Reveal the top 3 cards of your deck. You may put each character card with cost 2 or less into your hand. Put the rest on the bottom of your deck in any order.",
    },
    {
      title: "PUPPY LOVE",
      description:
        "Whenever this character quests, if you have 4 or more other characters in play, your other characters get +1 {L} this turn.",
    },
  ],
  classifications: ["Storyborn", "Puppy"],
  missingTests: true,
  abilities: [
    {
      cost: {
        exert: true,
      },
      effect: {
        chooser: "CONTROLLER",
        effect: {
          target: {
            selector: "all",
            count: "all",
            owner: "any",
            zones: ["play"],
            cardTypes: ["character"],
          },
          type: "put-on-bottom",
        },
        type: "optional",
      },
      id: "5ql-1",
      text: "GOOD AS NEW {E} — Reveal the top 3 cards of your deck. You may put each character card with cost 2 or less into your hand. Put the rest on the bottom of your deck in any order.",
      type: "activated",
    },
    {
      effect: {
        condition: {
          expression: "you have 4 or more other characters in play",
          type: "if",
        },
        then: {
          duration: "this-turn",
          modifier: 1,
          stat: "lore",
          target: "YOUR_CHARACTERS",
          type: "modify-stat",
        },
        type: "conditional",
      },
      id: "5ql-2",
      name: "PUPPY LOVE",
      text: "PUPPY LOVE Whenever this character quests, if you have 4 or more other characters in play, your other characters get +1 {L} this turn.",
      trigger: {
        event: "quest",
        on: "SELF",
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
};
