import type { LocationCard } from "@tcg/lorcana-types";

export const graveyardOfChristmasFutureLonelyRestingPlace: LocationCard = {
  id: "gta",
  canonicalId: "ci_gta",
  reprints: ["set11-135"],
  cardType: "location",
  name: "Graveyard of Christmas Future",
  version: "Lonely Resting Place",
  i18n: {
    en: {
      name: "Graveyard of Christmas Future",
      version: "Lonely Resting Place",
      text: [
        {
          title: "NEW ARRIVAL",
          description:
            "Whenever you move a character here, put the top card of your deck under this location facedown.",
        },
        {
          title: "ANOTHER CHANCE",
          description:
            "At the start of your turn, you may put all cards from under this location into your hand. If you do, banish this location.",
        },
      ],
    },
    de: {
      name: "Friedhof der künftigen Weihnacht",
      version: "Einsame Ruhestätte",
      text: [
        {
          title: "NEUE ANKUNFT",
          description:
            "Jedes Mal, wenn einer deiner Charaktere an diesen Ort bewegt wird, lege die oberste Karte deines Decks verdeckt unter diesen Ort.",
        },
        {
          title: "NOCH EINE CHANCE",
          description:
            "Zu Beginn deines Zuges darfst du alle Karten, die unter diesem Ort liegen, auf deine Hand nehmen. Wenn du dies tust, verbanne diesen Ort.",
        },
      ],
    },
    fr: {
      name: "Cimetière du Noël futur",
      version: "Dernière demeure isolée",
      text: [
        {
          title: "NOUVEL ARRIVANT",
          description:
            "Chaque fois que vous déplacez un personnage sur ce lieu, placez la carte du dessus de votre pioche sous ce lieu, face cachée.",
        },
        {
          title: "UNE CHANCE",
          description:
            "Au début de votre tour, vous pouvez ajouter à votre main toutes les cartes sous ce lieu. Si vous le faites, bannissez ce lieu.",
        },
      ],
    },
    it: {
      name: "Cimitero del Natale Futuro",
      version: "Tomba Isolata",
      text: [
        {
          title: "NUOVO ARRIVO",
          description:
            "Ogni volta che sposti un personaggio in questo luogo, metti la prima carta del tuo mazzo a faccia in giù sotto a questo luogo.",
        },
        {
          title: "UN'ALTRA OCCASIONE",
          description:
            "All'inizio del tuo turno, puoi aggiungere alla tua mano tutte le carte sotto a questo luogo. Se lo fai, esilia questo luogo.",
        },
      ],
    },
  },
  inkType: ["ruby"],
  franchise: "Mickey's Christmas Carol",
  set: "011",
  cardNumber: 135,
  rarity: "rare",
  cost: 4,
  willpower: 8,
  moveCost: 1,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_648f06059c3b4f8680bc932c085d6182",
    tcgPlayer: 672432,
  },
  text: [
    {
      title: "NEW ARRIVAL",
      description:
        "Whenever you move a character here, put the top card of your deck under this location facedown.",
    },
    {
      title: "ANOTHER CHANCE",
      description:
        "At the start of your turn, you may put all cards from under this location into your hand. If you do, banish this location.",
    },
  ],
  abilities: [
    {
      id: "aa3-1",
      name: "NEW ARRIVAL",
      trigger: {
        event: "move",
        on: "CHARACTERS_HERE",
        timing: "whenever",
      },
      effect: {
        type: "put-under",
        source: "top-of-deck",
        under: "self",
      },
      text: "NEW ARRIVAL Whenever you move a character here, put the top card of your deck under this location facedown.",
      type: "triggered",
    },
    {
      id: "aa3-2",
      name: "ANOTHER CHANCE",
      trigger: {
        event: "start-turn",
        on: "YOU",
        timing: "at",
      },
      effect: {
        chooser: "CONTROLLER",
        type: "optional",
        effect: {
          type: "sequence",
          steps: [
            {
              type: "move-cards-from-under",
              target: {
                ref: "self",
              },
              source: "target",
              destination: "hand",
            },
            {
              type: "banish",
              target: {
                ref: "self",
              },
            },
          ],
        },
      },
      text: "ANOTHER CHANCE At the start of your turn, you may put all cards from under this location into your hand. If you do, banish this location.",
      type: "triggered",
    },
  ],
};
