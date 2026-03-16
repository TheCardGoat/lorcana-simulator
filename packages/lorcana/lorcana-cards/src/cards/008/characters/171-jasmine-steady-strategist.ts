import type { CharacterCard } from "@tcg/lorcana-types";

export const jasmineSteadyStrategist: CharacterCard = {
  id: "iaq",
  canonicalId: "ci_UgP",
  reprints: ["set8-171"],
  cardType: "character",
  name: "Jasmine",
  version: "Steady Strategist",
  i18n: {
    en: {
      name: "Jasmine",
      version: "Steady Strategist",
      text: [
        {
          title: "Shift 2",
        },
        {
          title: "ALWAYS PLANNING",
          description:
            "Whenever this character quests, look at the top 3 cards of your deck. You may reveal an Ally character card and put it into your hand. Put the rest on the bottom of your deck in any order.",
        },
      ],
    },
    de: {
      name: "Jasmin",
      version: "Unermüdliche Strategin",
      text: "Gestaltwandel 2 STETS AM PLANEN Jedes Mal, wenn dieser Charakter erkundet, schaue dir die obersten 3 Karten deines Decks an. Du darfst 1 Verbündeten-Charakterkarte daraus aufdecken und auf deine Hand nehmen. Lege die restlichen Karten in beliebiger Reihenfolge unter dein Deck.",
    },
    fr: {
      name: "Jasmine",
      version: "Stratège fiable",
      text: "Alter 2 TOUJOURS À PLANIFIER Chaque fois que ce personnage est envoyé à l'aventure, regardez les 3 cartes du dessus de votre pioche. Vous pouvez révéler une carte Personnage Allié et la placer dans votre main. Placez les autres cartes sous votre pioche, dans l'ordre de votre choix.",
    },
    it: {
      name: "Jasmine",
      version: "Stratega Sicura",
      text: "Trasformazione 2 SEMPRE A PIANIFICARE Ogni volta che questo personaggio va all'avventura, guarda le prime 3 carte del tuo mazzo. Puoi rivelare una carta personaggio Alleato e aggiungerla alla tua mano. Metti il resto in fondo al tuo mazzo in qualsiasi ordine.",
    },
  },
  inkType: ["sapphire", "steel"],
  franchise: "Aladdin",
  set: "008",
  cardNumber: 171,
  rarity: "common",
  cost: 4,
  strength: 2,
  willpower: 5,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_a8b66e0b4abe48f58f9c47dc25593197",
    tcgPlayer: 633098,
  },
  text: [
    {
      title: "Shift 2",
    },
    {
      title: "ALWAYS PLANNING",
      description:
        "Whenever this character quests, look at the top 3 cards of your deck. You may reveal an Ally character card and put it into your hand. Put the rest on the bottom of your deck in any order.",
    },
  ],
  classifications: ["Floodborn", "Hero", "Princess"],
  abilities: [
    {
      cost: {
        ink: 2,
      },
      id: "13i-1",
      keyword: "Shift",
      text: "Shift 2",
      type: "keyword",
    },
    {
      effect: {
        chooser: "CONTROLLER",
        effect: {
          target: "CHOSEN_CHARACTER",
          type: "put-on-bottom",
        },
        type: "optional",
      },
      id: "13i-2",
      name: "ALWAYS PLANNING",
      text: "ALWAYS PLANNING Whenever this character quests, look at the top 3 cards of your deck. You may reveal an Ally character card and put it into your hand. Put the rest on the bottom of your deck in any order.",
      trigger: {
        event: "quest",
        on: "SELF",
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
};
