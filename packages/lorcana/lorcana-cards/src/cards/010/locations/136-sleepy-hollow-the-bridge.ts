import type { LocationCard } from "@tcg/lorcana-types";

export const sleepyHollowTheBridge: LocationCard = {
  id: "eWQ",
  canonicalId: "ci_eWQ",
  reprints: ["set10-136"],
  cardType: "location",
  name: "Sleepy Hollow",
  version: "The Bridge",
  i18n: {
    en: {
      name: "Sleepy Hollow",
      version: "The Bridge",
      text: [
        {
          title: "HEAD FOR THE BRIDGE!",
          description:
            "Whenever a character quests while here, you may banish this location to gain 2 lore and give them Evasive until the start of your next turn.",
        },
      ],
    },
    de: {
      name: "Sleepy Hollow",
      version: "Die Brücke",
      text: [
        {
          title: "AUF ZUR BRÜCKE!",
          description:
            "Jedes Mal, wenn einer deiner Charaktere an diesem Ort erkundet, darfst du diesen Ort verbannen, um 2 Legenden zu sammeln und dem Charakter bis zu Beginn deines nächsten Zuges Wendig zu geben.",
        },
      ],
    },
    fr: {
      name: "Sleepy Hollow",
      version: "Le Pont",
      text: [
        {
          title: "FRANCHISSEZ LE PONT!",
          description:
            "Lorsqu'un personnage sur ce lieu est envoyé à l'aventure, vous pouvez bannir ce lieu pour gagner 2 éclats de Lore et donner à ce personnage Insaisissable jusqu'au début de votre prochain tour.",
        },
      ],
    },
    it: {
      name: "La Valle Addormentata",
      version: "Il Ponte",
      text: [
        {
          title: "VERSO IL PONTE!",
          description:
            "Ogni volta che un personaggio va all'avventura mentre si trova in questo luogo, puoi esiliare questo luogo per ottenere 2 leggenda e dargli Sfuggente fino all'inizio del tuo prossimo turno. (Solo altri personaggi con Sfuggente possono sfidarlo.)",
        },
      ],
    },
  },
  inkType: ["ruby"],
  franchise: "Sleepy Hollow",
  set: "010",
  cardNumber: 136,
  rarity: "uncommon",
  cost: 3,
  willpower: 6,
  moveCost: 1,
  lore: 0,
  inkable: true,
  externalIds: {
    lorcast: "crd_98339be4f48249779fb2ae2de3e9b757",
    tcgPlayer: 660018,
  },
  text: [
    {
      title: "HEAD FOR THE BRIDGE!",
      description:
        "Whenever a character quests while here, you may banish this location to gain 2 lore and give them Evasive until the start of your next turn.",
    },
  ],
  abilities: [
    {
      effect: {
        chooser: "CONTROLLER",
        effect: {
          steps: [
            {
              duration: "until-start-of-next-turn",
              keyword: "Evasive",
              target: {
                selector: "all",
                count: 1,
                reference: "trigger-subject",
              },
              type: "gain-keyword",
            },
            {
              target: {
                selector: "self",
                count: 1,
                owner: "you",
                zones: ["play"],
                cardTypes: ["location"],
              },
              type: "banish",
            },
            {
              amount: 2,
              type: "gain-lore",
            },
          ],
          type: "sequence",
        },
        type: "optional",
      },
      id: "z63-1",
      name: "HEAD FOR THE BRIDGE!",
      text: "HEAD FOR THE BRIDGE! Whenever a character quests while here, you may banish this location to gain 2 lore and give them Evasive until the start of your next turn.",
      trigger: {
        event: "quest",
        on: "CHARACTER_HERE",
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
};
