import type { CharacterCard } from "@tcg/lorcana-types";

export const peteGamesReferee: CharacterCard = {
  id: "MzI",
  canonicalId: "ci_MzI",
  reprints: ["set5-195"],
  cardType: "character",
  name: "Pete",
  version: "Games Referee",
  i18n: {
    en: {
      name: "Pete",
      version: "Games Referee",
      text: [
        {
          title: "BLOW THE WHISTLE",
          description:
            "When you play this character, opponents can't play actions until the start of your next turn.",
        },
      ],
    },
    de: {
      name: "Kater Karlo",
      version: "Schiedsrichter der Spiele",
      text: [
        {
          title: "ABPFIFF",
          description:
            "Wenn du diesen Charakter ausspielst, können gegnerische Mitspielende, bis zu Beginn deines nächsten Zuges, keine Aktionen ausspielen.",
        },
      ],
    },
    fr: {
      name: "Pat",
      version: "Arbitre",
      text: [
        {
          title: "SIFFLET!",
          description:
            "Lorsque vous jouez ce personnage, les adversaires ne peuvent pas jouer d'actions jusqu'au début de votre prochain tour.",
        },
      ],
    },
    it: {
      name: "Gambadilegno",
      version: "Arbitro di Gioco",
      text: [
        {
          title: "FISCHIARE",
          description:
            "Quando giochi questo personaggio, gli avversari non possono giocare azioni fino all'inizio del tuo prossimo turno.",
        },
      ],
    },
  },
  inkType: ["steel"],
  set: "005",
  cardNumber: 195,
  rarity: "uncommon",
  cost: 3,
  strength: 3,
  willpower: 3,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_d82108b67c434df495ba7ce11b811e79",
    tcgPlayer: 561975,
  },
  text: [
    {
      title: "BLOW THE WHISTLE",
      description:
        "When you play this character, opponents can't play actions until the start of your next turn.",
    },
  ],
  classifications: ["Dreamborn", "Villain"],
  abilities: [
    {
      effect: {
        type: "restriction",
        restriction: "cant-play-actions",
        target: "OPPONENTS",
        duration: "until-start-of-next-turn",
      },
      id: "1bd-1",
      name: "BLOW THE WHISTLE",
      text: "BLOW THE WHISTLE When you play this character, opponents can't play actions until the start of your next turn.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
