import type { CharacterCard } from "@tcg/lorcana-types";

export const pocahontasPeacekeeperIconic: CharacterCard = {
  id: "0wY",
  canonicalId: "ci_4DB",
  reprints: ["set11-022"],
  cardType: "character",
  name: "Pocahontas",
  version: "Peacekeeper",
  i18n: {
    en: {
      name: "Pocahontas",
      version: "Peacekeeper",
      text: [
        {
          title: "Shift 3 {I}",
        },
        {
          title: "CALMING WORDS",
          description:
            "When you play this character, if you used Shift to play her and none of your characters challenged this turn, characters can't challenge until the start of your next turn.",
        },
      ],
    },
    de: {
      name: "Pocahontas",
      version: "Friedenshüterin",
      text: "Gestaltwandel 3 BERUHIGENDE WORTE Wenn du diesen Charakter mithilfe von Gestaltwandel ausspielst, falls in diesem Zug noch keiner deiner Charaktere herausgefordert hat, können Charaktere bis zu Beginn deines nächsten Zuges nicht herausfordern.",
    },
    fr: {
      name: "Pocahontas",
      version: "Gardienne de la paix",
      text: "Alter 3 Lorsque vous jouez ce personnage via sa capacité Alter, si aucun de vos personnages n'a défié ce tour-ci, les personnages ne peuvent pas défier jusqu'au début de votre prochain tour.",
    },
    it: {
      name: "Pocahontas",
      version: "Pacificatrice",
      text: "Trasformazione 3 VOCE RASSICURANTE Quando giochi questo personaggio, se hai usato Trasformazione per giocarlo e nessuno dei tuoi personaggi ha sfidato in questo turno, i personaggi non possono sfidare fino all'inizio del tuo prossimo turno.",
    },
  },
  inkType: ["amber"],
  franchise: "Pocahontas",
  set: "011",
  cardNumber: 241,
  rarity: "common",
  specialRarity: "iconic",
  cost: 5,
  strength: 3,
  willpower: 6,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_40a3f6d8de604ff085fa5629597780a3",
    tcgPlayer: 673298,
  },
  text: [
    {
      title: "Shift 3 {I}",
    },
    {
      title: "CALMING WORDS",
      description:
        "When you play this character, if you used Shift to play her and none of your characters challenged this turn, characters can't challenge until the start of your next turn.",
    },
  ],
  classifications: ["Floodborn", "Hero", "Princess"],
  abilities: [
    {
      id: "sbm-1",
      cost: {
        ink: 3,
      },
      keyword: "Shift",
      type: "keyword",
      text: "Shift 3 {I}",
    },
    {
      id: "sbm-2",
      effect: {
        condition: {
          expression: "you used Shift to play her and none of your characters challenged this turn",
          type: "if",
        },
        then: {
          restriction: "cant-challenge",
          target: "SELF",
          type: "restriction",
        },
        type: "conditional",
      },
      name: "CALMING WORDS",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
      text: "CALMING WORDS When you play this character, if you used Shift to play her and none of your characters challenged this turn, characters can't challenge until the start of your next turn.",
    },
  ],
};
