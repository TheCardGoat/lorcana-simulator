import type { LocationCard } from "@tcg/lorcana-types";

export const duckburgFunsosFunzone: LocationCard = {
  id: "Skh",
  canonicalId: "ci_Skh",
  reprints: ["set10-034"],
  cardType: "location",
  name: "Duckburg",
  version: "Funso’s Funzone",
  i18n: {
    en: {
      name: "Duckburg",
      version: "Funso’s Funzone",
      text: [
        {
          title: "WHERE FUN IS IN THE ZONE",
          description:
            "Whenever a character quests while here, you pay 2 less for the next character you play this turn.",
        },
      ],
    },
    de: {
      name: "Entenhausen",
      version: "Fonsos Funpark",
      text: [
        {
          title: "FÜR SPASS, WIE ICH IHN MAG",
          description:
            "Jedes Mal, wenn einer deiner Charaktere an diesem Ort erkundet, zahlst du 2 weniger für den nächsten Charakter, den du in diesem Zug ausspielst.",
        },
      ],
    },
    fr: {
      name: "Canardville",
      version: "Au pays des jeux de Funso",
      text: [
        {
          title: "FUNSO FAIT DES HEUREUX",
          description:
            "Chaque fois qu'un personnage sur ce lieu est envoyé à l'aventure, le prochain personnage que vous jouez ce tour-ci vous coûte 2 de moins.",
        },
      ],
    },
    it: {
      name: "Paperopoli",
      version: "Casa dello Spasso di Spassi",
      text: [
        {
          title: "LA CASA DELLO SPASSO",
          description:
            "Ogni volta che un personaggio va all'avventura mentre si trova in questo luogo, paga 2 in meno per giocare il tuo prossimo personaggio per questo turno.",
        },
      ],
    },
  },
  inkType: ["amber"],
  franchise: "Ducktales",
  set: "010",
  cardNumber: 34,
  rarity: "rare",
  cost: 2,
  willpower: 6,
  moveCost: 2,
  lore: 0,
  inkable: true,
  externalIds: {
    lorcast: "crd_516d19ec66bf46689607d453ce6f267d",
    tcgPlayer: 660034,
  },
  text: [
    {
      title: "WHERE FUN IS IN THE ZONE",
      description:
        "Whenever a character quests while here, you pay 2 less for the next character you play this turn.",
    },
  ],
  abilities: [
    {
      effect: {
        amount: 2,
        cardType: "character",
        duration: "next-play-this-turn",
        target: "CONTROLLER",
        type: "cost-reduction",
      },
      id: "bzp-1",
      name: "WHERE FUN IS IN THE ZONE",
      text: "WHERE FUN IS IN THE ZONE Whenever a character quests while here, you pay 2 less for the next character you play this turn.",
      trigger: {
        event: "quest",
        on: "CHARACTER_HERE",
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
};
