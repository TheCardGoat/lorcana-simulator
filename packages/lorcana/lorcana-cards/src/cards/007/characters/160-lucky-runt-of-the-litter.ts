import type { CharacterCard } from "@tcg/lorcana-types";

export const luckyRuntOfTheLitter: CharacterCard = {
  id: "Kl0",
  canonicalId: "ci_Kl0",
  reprints: ["set7-160"],
  cardType: "character",
  name: "Lucky",
  version: "Runt of the Litter",
  i18n: {
    en: {
      name: "Lucky",
      version: "Runt of the Litter",
      text: [
        {
          title: "FOLLOW MY VOICE",
          description:
            "Whenever this character quests, look at the top 2 cards of your deck. You may reveal any number of Puppy character cards and put them in your hand. Put the rest on the bottom of your deck in any order.",
        },
      ],
    },
    de: {
      name: "Lucky",
      version: "Der Jüngste im Wurf",
      text: [
        {
          title: "FOLGE MEINER STIMME",
          description:
            "Jedes Mal, wenn dieser Charakter erkundet, schaue dir die obersten 2 Karten deines Decks an. Du darfst beliebig viele Welpen-Charakterkarten daraus aufdecken und auf deine Hand nehmen. Lege die restlichen Karten in beliebiger Reihenfolge unter dein Deck.",
        },
      ],
    },
    fr: {
      name: "Lucky",
      version: "Miraculé de la portée",
      text: [
        {
          title: "SUIVEZ MA VOIX",
          description:
            "Chaque fois que ce personnage est envoyé à l'aventure, regardez les 2 cartes du dessus de votre pioche. Vous pouvez révéler autant de cartes Personnage Chiot parmi elles que vous le souhaitez. Placez ces cartes dans votre main. Placez les autres cartes sous votre pioche, dans l'ordre de votre choix.",
        },
      ],
    },
    it: {
      name: "Lucky",
      version: "Il Più Piccolo della Cucciolata",
      text: [
        {
          title: "SEGUITE LA MIA VOCE",
          description:
            "Ogni volta che questo personaggio va all'avventura, guarda le prime 2 carte del tuo mazzo. Puoi rivelare un qualsiasi numero di carte personaggio Cucciolo e aggiungerle alla tua mano. Metti il resto in fondo al tuo mazzo in qualsiasi ordine.",
        },
      ],
    },
  },
  inkType: ["sapphire"],
  franchise: "101 Dalmatians",
  set: "007",
  cardNumber: 160,
  rarity: "rare",
  cost: 3,
  strength: 1,
  willpower: 3,
  lore: 2,
  inkable: false,
  externalIds: {
    lorcast: "crd_6f2802da6557456c8a34693d3650784f",
    tcgPlayer: 619498,
  },
  text: [
    {
      title: "FOLLOW MY VOICE",
      description:
        "Whenever this character quests, look at the top 2 cards of your deck. You may reveal any number of Puppy character cards and put them in your hand. Put the rest on the bottom of your deck in any order.",
    },
  ],
  classifications: ["Storyborn", "Puppy"],
  abilities: [
    {
      effect: {
        chooser: "CONTROLLER",
        effect: {
          target: "CHOSEN_CHARACTER",
          type: "put-on-bottom",
        },
        type: "optional",
      },
      id: "1qo-1",
      name: "FOLLOW MY VOICE",
      text: "FOLLOW MY VOICE Whenever this character quests, look at the top 2 cards of your deck. You may reveal any number of Puppy character cards and put them in your hand. Put the rest on the bottom of your deck in any order.",
      trigger: {
        event: "quest",
        on: "SELF",
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
};
