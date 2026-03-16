import type { CharacterCard } from "@tcg/lorcana-types";

export const cobraBubblesDedicatedOfficial: CharacterCard = {
  id: "gZF",
  canonicalId: "ci_gZF",
  reprints: ["set11-014"],
  cardType: "character",
  name: "Cobra Bubbles",
  version: "Dedicated Official",
  i18n: {
    en: {
      name: "Cobra Bubbles",
      version: "Dedicated Official",
      text: [
        {
          title: "AURA OF AUTHORITY",
          description:
            "Whenever this character quests, chosen opposing character can't challenge and must quest during their next turn if able.",
        },
      ],
    },
    de: {
      name: "Cobra Bobo",
      version: "Engagierter Beamter",
      text: [
        {
          title: "AURA DER AUTORITÄT",
          description:
            "Jedes Mal, wenn dieser Charakter erkundet, wähle einen gegnerischen Charakter. Er kann in seinem nächsten Zug nicht herausfordern und muss erkunden, wenn möglich.",
        },
      ],
    },
    fr: {
      name: "Cobra Bubbles",
      version: "Fonctionnaire dévoué",
      text: [
        {
          title: "AURA D'AUTORITÉ",
          description:
            "Chaque fois que ce personnage est envoyé à l'aventure, choisissez un personnage adverse qui ne peut pas défier et doit, s'il le peut, être envoyé à l'aventure durant son prochain tour.",
        },
      ],
    },
    it: {
      name: "Cobra Bubbles",
      version: "Dedito Agente",
      text: [
        {
          title: "AURA DI AUTORITÀ",
          description:
            "Ogni volta che questo personaggio va all'avventura, un personaggio avversario a tua scelta non può sfidare e deve andare all'avventura durante il suo prossimo turno, se possibile.",
        },
      ],
    },
  },
  inkType: ["amber"],
  franchise: "Lilo and Stitch",
  set: "011",
  cardNumber: 14,
  rarity: "rare",
  cost: 5,
  strength: 3,
  willpower: 6,
  lore: 2,
  inkable: false,
  externalIds: {
    lorcast: "crd_f3b02d0a1478421da5b8ad2dac40d1b0",
    tcgPlayer: 675379,
  },
  text: [
    {
      title: "AURA OF AUTHORITY",
      description:
        "Whenever this character quests, chosen opposing character can't challenge and must quest during their next turn if able.",
    },
  ],
  classifications: ["Storyborn", "Ally"],
  abilities: [
    {
      id: "1he-1",
      effect: {
        restriction: "cant-challenge",
        target: "SELF",
        type: "restriction",
      },
      name: "AURA OF AUTHORITY",
      trigger: {
        event: "quest",
        on: "SELF",
        timing: "whenever",
      },
      type: "triggered",
      text: "AURA OF AUTHORITY Whenever this character quests, chosen opposing character can't challenge and must quest during their next turn if able.",
    },
  ],
};
