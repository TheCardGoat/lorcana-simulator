import type { CharacterCard } from "@tcg/lorcana-types";

export const simbaRightfulKing: CharacterCard = {
  id: "Pp2",
  canonicalId: "ci_Pp2",
  reprints: ["set3-193"],
  cardType: "character",
  name: "Simba",
  version: "Rightful King",
  i18n: {
    en: {
      name: "Simba",
      version: "Rightful King",
      text: [
        {
          title: "TRIUMPHANT STANCE",
          description:
            "During your turn, whenever this character banishes another character in a challenge, chosen opposing character can't challenge during their next turn.",
        },
      ],
    },
    de: {
      name: "Simba",
      version: "Rechtmäßiger König",
      text: [
        {
          title: "TRIUMPHALE HALTUNG",
          description:
            "Jedes Mal, wenn dieser Charakter in deinem Zug durch eine Herausforderung einen anderen Charakter verbannt, wähle einen gegnerischen Charakter. Er kann in seinem nächsten Zug nicht herausfordern.",
        },
      ],
    },
    fr: {
      name: "Simba",
      version: "Roi légitime",
      text: [
        {
          title: "POSE TRIOMPHANTE",
          description:
            "Chaque fois que ce personnage en bannit un autre via un défi durant votre tour, choisissez un personnage adverse, il ne pourra pas défier durant son prochain tour.",
        },
      ],
    },
    it: {
      name: "Simba",
      version: "Sovrano Legittimo",
      text: [
        {
          title: "POSA TRIONFALE",
          description:
            "Durante il tuo turno, ogni volta che questo personaggio esilia un altro personaggio in una sfida, un personaggio avversario a tua scelta non può sfidare durante il suo prossimo turno.",
        },
      ],
    },
  },
  inkType: ["steel"],
  franchise: "Lion King",
  set: "003",
  cardNumber: 193,
  rarity: "uncommon",
  cost: 5,
  strength: 4,
  willpower: 6,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_1985d10b104a4176a621275358537fa9",
    tcgPlayer: 535636,
  },
  text: [
    {
      title: "TRIUMPHANT STANCE",
      description:
        "During your turn, whenever this character banishes another character in a challenge, chosen opposing character can't challenge during their next turn.",
    },
  ],
  classifications: ["Storyborn", "Hero", "King"],
  missingTests: true,
  abilities: [
    {
      effect: {
        restriction: "cant-challenge",
        target: "SELF",
        type: "restriction",
      },
      id: "1nc-1",
      name: "TRIUMPHANT STANCE",
      text: "TRIUMPHANT STANCE During your turn, whenever this character banishes another character in a challenge, chosen opposing character can't challenge during their next turn.",
      trigger: {
        event: "banish",
        on: "OPPONENT_CHARACTERS",
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
};
