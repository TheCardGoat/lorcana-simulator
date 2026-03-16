import type { CharacterCard } from "@tcg/lorcana-types";

export const annaIceBreaker: CharacterCard = {
  id: "5hH",
  canonicalId: "ci_5hH",
  reprints: ["set7-072"],
  cardType: "character",
  name: "Anna",
  version: "Ice Breaker",
  i18n: {
    en: {
      name: "Anna",
      version: "Ice Breaker",
      text: [
        {
          title: "Support",
        },
        {
          title: "WINTER AMBUSH",
          description:
            "When you play this character, chosen opposing character can't ready at the start of their next turn.",
        },
      ],
    },
    de: {
      name: "Anna",
      version: "Eisbrecherin",
      text: "Unterstützen (Jedes Mal, wenn dieser Charakter erkundet, darfst du seine in diesem Zug zur eines anderen Charakters deiner Wahl addieren.) WINTERLICHER HINTERHALT Wenn du diesen Charakter ausspielst, wähle einen gegnerischen Charakter. Er wird zu Beginn seines nächsten Zuges nicht bereit gemacht.",
    },
    fr: {
      name: "Anna",
      version: "Briseuse de glace",
      text: "Soutien EMBUSCADE GLACIALE Lorsque vous jouez ce personnage, choisissez un personnage adverse qui ne se redresse pas au début de son prochain tour.",
    },
    it: {
      name: "Anna",
      version: "Rompighiaccio",
      text: "Aiutante IMBOSCATA INVERNALE Quando giochi questo personaggio, un personaggio avversario a tua scelta non si può preparare all'inizio del suo prossimo turno.",
    },
  },
  inkType: ["amethyst", "sapphire"],
  franchise: "Frozen",
  set: "007",
  cardNumber: 72,
  rarity: "uncommon",
  cost: 4,
  strength: 2,
  willpower: 3,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_b46a014c04334b358578cee5fbd9444f",
    tcgPlayer: 619444,
  },
  text: [
    {
      title: "Support",
    },
    {
      title: "WINTER AMBUSH",
      description:
        "When you play this character, chosen opposing character can't ready at the start of their next turn.",
    },
  ],
  classifications: ["Dreamborn", "Hero", "Queen", "Sorcerer"],
  abilities: [
    {
      id: "pj2-1",
      keyword: "Support",
      text: "Support",
      type: "keyword",
    },
    {
      effect: {
        duration: "until-start-of-next-turn",
        restriction: "cant-ready",
        target: "SELF",
        type: "restriction",
      },
      id: "pj2-2",
      name: "WINTER AMBUSH",
      text: "WINTER AMBUSH When you play this character, chosen opposing character can't ready at the start of their next turn.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
