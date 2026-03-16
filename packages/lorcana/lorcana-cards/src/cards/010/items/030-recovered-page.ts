import type { ItemCard } from "@tcg/lorcana-types";

export const recoveredPage: ItemCard = {
  id: "3sY",
  canonicalId: "ci_3sY",
  reprints: ["set10-030"],
  cardType: "item",
  name: "Recovered Page",
  i18n: {
    en: {
      name: "Recovered Page",
      text: [
        {
          title: "WHAT IS TO COME",
          description:
            "When you play this item, look at the top 4 cards of your deck. You may reveal a character card and put it into your hand. Put the rest on the bottom of your deck in any order.",
        },
        {
          title: "WHISPERED POWER 1",
          description:
            "{I}, Banish this item — Put the top card of your deck facedown under one of your characters or locations with Boost.",
        },
      ],
    },
    de: {
      name: "Wiedergefundene Seite",
      text: [
        {
          title: "WAS NOCH KOMMEN WIRD",
          description:
            "Wenn du diesen Gegenstand ausspielst, schaue dir die obersten 4 Karten deines Decks an. Du darfst 1 Charakterkarte daraus aufdecken und auf deine Hand nehmen. Lege die restlichen Karten in beliebiger Reihenfolge unter dein Deck. GEFLÜSTERTE MACHT 1, Verbanne diesen Gegenstand — Lege die oberste Karte deines Decks verdeckt unter einen deiner Charaktere oder Orte mit Stärken.",
        },
      ],
    },
    fr: {
      name: "Page retrouvée",
      text: [
        {
          title: "CE QUI NOUS ATTEND",
          description:
            "Lorsque vous jouez cet objet, regardez les 4 cartes du dessus de votre pioche. Vous pouvez révéler une carte Personnage parmi elles et l'ajouter à votre main. Placez les autres cartes sous votre pioche, dans l'ordre de votre choix. LUEUR DE PUISSANCE 1, bannissez cet objet — Placez la carte du dessus de votre pioche face cachée sous l'un de vos personnages ou lieux ayant Boost.",
        },
      ],
    },
    it: {
      name: "Pagina Recuperata",
      text: [
        {
          title: "COSA",
          description:
            "SUCCEDERÀ Quando giochi questo oggetto, guarda le prime 4 carte del tuo mazzo. Puoi rivelare una carta personaggio e aggiungerla alla tua mano. Metti il resto in fondo al tuo mazzo in qualsiasi ordine. POTERE SUSSURRATO 1, esilia questo oggetto — Metti la prima carta del tuo mazzo a faccia in giù sotto a uno dei tuoi personaggi o luoghi con Potenziamento.",
        },
      ],
    },
  },
  inkType: ["amber"],
  franchise: "Lorcana",
  set: "010",
  cardNumber: 30,
  rarity: "uncommon",
  cost: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_f682ac8152d24a3192669d92bb1f22d0",
    tcgPlayer: 658330,
  },
  text: [
    {
      title: "WHAT IS TO COME",
      description:
        "When you play this item, look at the top 4 cards of your deck. You may reveal a character card and put it into your hand. Put the rest on the bottom of your deck in any order.",
    },
    {
      title: "WHISPERED POWER 1",
      description:
        "{I}, Banish this item — Put the top card of your deck facedown under one of your characters or locations with Boost.",
    },
  ],
  abilities: [
    {
      id: "1xi-1",
      text: "WHAT IS TO COME When you play this item, look at the top 4 cards of your deck. You may reveal a character card and put it into your hand. Put the rest on the bottom of your deck in any order.",
      name: "WHAT IS TO COME",
      effect: {
        type: "scry",
        amount: 4,
        destinations: [
          {
            filter: {
              cardType: "character",
              type: "card-type",
            },
            max: 1,
            min: 0,
            zone: "hand",
          },
          {
            ordering: "player-choice",
            remainder: true,
            zone: "deck-bottom",
          },
        ],
        target: "CONTROLLER",
      },
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
