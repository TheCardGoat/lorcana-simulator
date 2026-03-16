import type { CharacterCard } from "@tcg/lorcana-types";

export const maxGoofChartTopper: CharacterCard = {
  id: "47m",
  canonicalId: "ci_DrO",
  reprints: ["set9-077"],
  cardType: "character",
  name: "Max Goof",
  version: "Chart Topper",
  i18n: {
    en: {
      name: "Max Goof",
      version: "Chart Topper",
      text: [
        {
          title: "Shift 4 {I}",
        },
        {
          title: "NUMBER ONE HIT",
          description:
            "Whenever this character quests, you may play a song card with cost 4 or less from your discard for free, then put it on the bottom of your deck instead of into your discard.",
        },
      ],
    },
    de: {
      name: "Max Goof",
      version: "Chartstürmer",
      text: "Gestaltwandel 4 NUMMER-EINS-HIT Jedes Mal, wenn dieser Charakter erkundet, darfst du eine Liedkarte von deinem Ablagestapel, die 4 oder weniger kostet, kostenlos ausspielen. Lege sie danach unter dein Deck.",
    },
    fr: {
      name: "Max Dingo",
      version: "En tête du hit-parade",
      text: "Alter 4 NUMÉRO UN DU TOP Chaque fois que ce personnage est envoyé à l'aventure, vous pouvez jouer gratuitement une carte Chanson avec un coût de 4 ou moins depuis votre défausse. Placez-la ensuite sous votre pioche.",
    },
    it: {
      name: "Max Pippo",
      version: "In Vetta alle Classifiche",
      text: "Trasformazione 4 HIT NUMERO UNO Ogni volta che questo personaggio va all'avventura, puoi giocare una carta canzone con costo 4 o inferiore dai tuoi scarti gratis, poi mettila in fondo al tuo mazzo invece che nei tuoi scarti.",
    },
  },
  inkType: ["emerald"],
  franchise: "Goofy Movie",
  set: "009",
  cardNumber: 77,
  rarity: "legendary",
  cost: 6,
  strength: 4,
  willpower: 5,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_b5087f60fdf4442686a00fb4243fcf48",
    tcgPlayer: 651113,
  },
  text: [
    {
      title: "Shift 4 {I}",
    },
    {
      title: "NUMBER ONE HIT",
      description:
        "Whenever this character quests, you may play a song card with cost 4 or less from your discard for free, then put it on the bottom of your deck instead of into your discard.",
    },
  ],
  classifications: ["Floodborn", "Hero"],
  abilities: [
    {
      cost: {
        ink: 4,
      },
      id: "iz6-1",
      keyword: "Shift",
      text: "Shift 4 {I}",
      type: "keyword",
    },
    {
      effect: {
        chooser: "CONTROLLER",
        effect: {
          steps: [
            {
              duration: "this-turn",
              replacement: {
                consumeOnApply: true,
                eventKinds: ["zone-change"],
                fromZones: ["play", "limbo"],
                replacementPosition: "bottom",
                replacementZone: "deck",
                targetRef: "selected-target",
                toZone: "discard",
                type: "zone-destination",
              },
              type: "create-replacement-effect",
            },
            {
              cardType: "song",
              cost: "free",
              filter: {
                cardType: "song",
                maxCost: 4,
              },
              from: "discard",
              type: "play-card",
            },
          ],
          type: "sequence",
        },
        type: "optional",
      },
      id: "iz6-2",
      name: "NUMBER ONE HIT",
      text: "NUMBER ONE HIT Whenever this character quests, you may play a song card with cost 4 or less from your discard for free, then put it on the bottom of your deck instead of into your discard.",
      trigger: {
        event: "quest",
        on: "SELF",
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
};
