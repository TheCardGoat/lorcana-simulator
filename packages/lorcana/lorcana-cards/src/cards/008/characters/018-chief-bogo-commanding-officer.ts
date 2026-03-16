import type { CharacterCard } from "@tcg/lorcana-types";

export const chiefBogoCommandingOfficer: CharacterCard = {
  id: "2pp",
  canonicalId: "ci_2pp",
  reprints: ["set8-018"],
  cardType: "character",
  name: "Chief Bogo",
  version: "Commanding Officer",
  i18n: {
    en: {
      name: "Chief Bogo",
      version: "Commanding Officer",
      text: [
        {
          title: "SENDING BACKUP",
          description:
            "During an opponent's turn, whenever one of your characters with Bodyguard is banished, you may reveal the top card of your deck. If it's a character card with cost 5 or less, you may play that character for free. Otherwise, put it on the top of your deck.",
        },
      ],
    },
    de: {
      name: "Chief Bogo",
      version: "Befehlshaber",
      text: [
        {
          title: "SENDET VERSTÄRKUNG",
          description:
            "Jedes Mal, wenn einer deiner Charaktere mit Beschützen im Zug einer gegnerischen Person verbannt wird, darfst du die oberste Karte deines Decks aufdecken. Falls sie eine Charakterkarte ist, die 5 oder weniger kostet, darfst du sie kostenlos ausspielen. Falls nicht, lege sie zurück auf dein Deck.",
        },
      ],
    },
    fr: {
      name: "Chef Bogo",
      version: "Officier au commandement",
      text: [
        {
          title: "ENVOI DE RENFORTS",
          description:
            "Durant le tour d'un adversaire, chaque fois que l'un de vos personnages avec Rempart est banni, vous pouvez révéler la carte du dessus de votre pioche. S'il s'agit d'une carte Personnage avec un coût de 5 ou moins, vous pouvez la jouer gratuitement. Sinon, replacez-la sur votre pioche.",
        },
      ],
    },
    it: {
      name: "Capitano Bogo",
      version: "Ufficiale di Comando",
      text: [
        {
          title: "INVIARE RINFORZI",
          description:
            "Durante il turno di un avversario, ogni volta che uno dei tuoi personaggi con Guardiano viene esiliato, puoi rivelare la prima carta del tuo mazzo. Se è una carta personaggio con costo 5 o inferiore, puoi giocare quel personaggio gratis. Altrimenti, rimettila in cima al tuo mazzo.",
        },
      ],
    },
  },
  inkType: ["amber"],
  franchise: "Zootropolis",
  set: "008",
  cardNumber: 18,
  rarity: "legendary",
  cost: 6,
  strength: 5,
  willpower: 5,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_cafa13413b754a96b2ac5df738bd0b89",
    tcgPlayer: 631362,
  },
  text: [
    {
      title: "SENDING BACKUP",
      description:
        "During an opponent's turn, whenever one of your characters with Bodyguard is banished, you may reveal the top card of your deck. If it's a character card with cost 5 or less, you may play that character for free. Otherwise, put it on the top of your deck.",
    },
  ],
  classifications: ["Storyborn"],
  abilities: [
    {
      effect: {
        condition: {
          type: "target-query",
          query: {
            selector: "all",
            reference: "revealed-first",
            filters: [
              {
                type: "card-type",
                value: "character",
              },
              {
                type: "cost",
                comparison: "lte",
                value: 5,
              },
            ],
          },
          comparison: {
            operator: "gte",
            value: 1,
          },
        },
        then: {
          cost: "free",
          from: "hand",
          type: "play-card",
        },
        type: "conditional",
      },
      id: "17e-1",
      text: "SENDING BACKUP During an opponent's turn, whenever one of your characters with Bodyguard is banished, you may reveal the top card of your deck. If it's a character card with cost 5 or less, you may play that character for free. Otherwise, put it on the top of your deck.",
      type: "action",
    },
  ],
};
