import type { CharacterCard } from "@tcg/lorcana-types";

export const gastonFrightfulBully: CharacterCard = {
  id: "Kjy",
  canonicalId: "ci_JyZ",
  reprints: ["set10-002"],
  cardType: "character",
  name: "Gaston",
  version: "Frightful Bully",
  i18n: {
    en: {
      name: "Gaston",
      version: "Frightful Bully",
      text: [
        {
          title: "Boost 2 {I}",
        },
        {
          title: "TOP THAT!",
          description:
            "Whenever this character quests, if there's a card under him, chosen opposing character can't challenge and must quest if able during their next turn.",
        },
      ],
    },
    de: {
      name: "Gaston",
      version: "Schrecklicher Tyrann",
      text: "Stärken 2 MACH DAS ERST MAL NACH! Jedes Mal, wenn dieser Charakter erkundet, falls er mindestens eine Karte unter sich hat, wähle einen gegnerischen Charakter. Jener kann in seinem nächsten Zug nicht herausfordern und muss erkunden, wenn möglich.",
    },
    fr: {
      name: "Gaston",
      version: "Brute terrifiante",
      text: "Boost 2 FAIS MIEUX QUE ÇA! Chaque fois que ce personnage est envoyé à l'aventure, s'il y a une carte sous lui, choisissez un personnage adverse qui ne peut pas défier et doit être envoyé à l'aventure durant son prochain tour, s'il le peut.",
    },
    it: {
      name: "Gaston",
      version: "Bullo Spaventoso",
      text: [
        {
          title: "Potenziamento 2",
          description:
            "(Una volta durante il tuo turno, puoi pagare 2 per mettere la prima carta del tuo mazzo a faccia in giù sotto a questo personaggio.) BATTI QUESTO! Ogni volta che questo personaggio va all'avventura, se c'è una carta sotto di esso, un personaggio avversario a tua scelta non può sfidare e deve andare all'avventura durante il suo prossimo turno, se possibile.",
        },
      ],
    },
  },
  inkType: ["amber"],
  franchise: "Beauty and the Beast",
  set: "010",
  cardNumber: 2,
  rarity: "uncommon",
  cost: 2,
  strength: 3,
  willpower: 3,
  lore: 1,
  inkable: false,
  externalIds: {
    lorcast: "crd_22fb811c179742f6b17bead54e0d68f2",
    tcgPlayer: 657888,
  },
  text: [
    {
      title: "Boost 2 {I}",
    },
    {
      title: "TOP THAT!",
      description:
        "Whenever this character quests, if there's a card under him, chosen opposing character can't challenge and must quest if able during their next turn.",
    },
  ],
  classifications: ["Storyborn", "Villain", "Whisper"],
  abilities: [
    {
      id: "14y-1",
      keyword: "Boost",
      text: "Boost 2 {I}",
      type: "keyword",
      value: 2,
    },
    {
      effect: {
        condition: {
          expression: "there's a card under him",
          type: "if",
        },
        then: {
          restriction: "cant-challenge",
          target: "SELF",
          type: "restriction",
        },
        type: "conditional",
      },
      id: "14y-2",
      name: "TOP THAT!",
      text: "TOP THAT! Whenever this character quests, if there's a card under him, chosen opposing character can't challenge and must quest if able during their next turn.",
      trigger: {
        event: "quest",
        on: "SELF",
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
};
