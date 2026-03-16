import type { CharacterCard } from "@tcg/lorcana-types";

export const powerlineWorldsGreatestRockStar: CharacterCard = {
  id: "PmB",
  canonicalId: "ci_O1h",
  reprints: ["set9-110"],
  cardType: "character",
  name: "Powerline",
  version: "World's Greatest Rock Star",
  i18n: {
    en: {
      name: "Powerline",
      version: "World's Greatest Rock Star",
      text: [
        {
          title: "Shift 4 {I}",
        },
        {
          title: "Singer 9",
        },
        {
          title: "MASH-UP",
          description:
            "Once during your turn, whenever this character sings a song, look at the top 4 cards of your deck. You may reveal a song card with cost 9 or less and play it for free. Put the rest on the bottom of your deck in any order.",
        },
      ],
    },
    de: {
      name: "Powerline",
      version: "Größter Rockstar der Welt",
      text: "Gestaltwandel 4 Singen 9 MASH-UP Einmal während deines Zuges, wenn dieser Charakter ein Lied singt, schaue dir die obersten 4 Karten deines Decks an. Du darfst 1 Liedkarte daraus, die 9 oder weniger kostet, aufdecken und kostenlos ausspielen. Lege die restlichen Karten in beliebiger Reihenfolge unter dein Deck.",
    },
    fr: {
      name: "Powerline",
      version: "La plus grande rockstar de la planète",
      text: "Alter 4 Mélomane 9 MASH-UP Une fois durant votre tour, lorsque ce personnage chante une chanson, regardez les 4 cartes du dessus de votre pioche. Vous pouvez révéler parmi elles une carte Chanson coûtant 9 ou moins et la jouer gratuitement. Placez les autres cartes sous votre pioche, dans l'ordre de votre choix.",
    },
    it: {
      name: "Powerline",
      version: "La Più Grande Rock Star del Mondo",
      text: "Trasformazione 4 Melodioso 9 MASH-UP Una volta durante il tuo turno, ogni volta che questo personaggio canta una canzone, guarda le prime 4 carte del tuo mazzo. Puoi rivelare una carta canzone con costo 9 o inferiore e giocarla gratis. Metti il resto in fondo al tuo mazzo in qualsiasi ordine.",
    },
  },
  inkType: ["ruby"],
  franchise: "Goofy Movie",
  set: "009",
  cardNumber: 110,
  rarity: "common",
  cost: 6,
  strength: 6,
  willpower: 4,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_be9c85638bda44878c44cf4cc7e7cfb0",
    tcgPlayer: 649231,
  },
  text: [
    {
      title: "Shift 4 {I}",
    },
    {
      title: "Singer 9",
    },
    {
      title: "MASH-UP",
      description:
        "Once during your turn, whenever this character sings a song, look at the top 4 cards of your deck. You may reveal a song card with cost 9 or less and play it for free. Put the rest on the bottom of your deck in any order.",
    },
  ],
  classifications: ["Floodborn"],
  abilities: [
    {
      cost: {
        ink: 4,
      },
      id: "k9i-1",
      keyword: "Shift",
      text: "Shift 4 {I}",
      type: "keyword",
    },
    {
      id: "k9i-2",
      keyword: "Singer",
      text: "Singer 9",
      type: "keyword",
      value: 9,
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
      id: "k9i-3",
      name: "MASH-UP Once",
      text: "MASH-UP Once during your turn, whenever this character sings a song, look at the top 4 cards of your deck. You may reveal a song card with cost 9 or less and play it for free. Put the rest on the bottom of your deck in any order.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
