import type { CharacterCard } from "@tcg/lorcana-types";

export const jasperCommonCrook: CharacterCard = {
  id: "gsE",
  canonicalId: "ci_gsE",
  reprints: ["set1-081"],
  cardType: "character",
  name: "Jasper",
  version: "Common Crook",
  i18n: {
    en: {
      name: "Jasper",
      version: "Common Crook",
      text: [
        {
          title: "PUPPYNAPPING",
          description:
            "Whenever this character quests, chosen opposing character can't quest during their next turn.",
        },
      ],
    },
    de: {
      name: "Jasper",
      version: "Gewöhnlicher Ganove",
      text: [
        {
          title: "WELPEN-ENTFÜHRUNG",
          description:
            "Jedes Mal, wenn dieser Charakter erkundet, wähle einen gegnerischen Charakter. Er kann in seinem nächsten Zug nicht erkunden.",
        },
      ],
    },
    fr: {
      name: "JASPER",
      version: "Petite frappe",
      text: [
        {
          title: "ENLÈVEMENT DE CHIOTS",
          description:
            "Lorsque ce personnage est envoyé à l'aventure, choisissez un personnage adverse qui ne pourra pas être envoyé à l'aventure durant son prochain tour.",
        },
      ],
    },
    it: {
      name: "Gaspare",
      version: "Comune Ladruncolo",
      text: [
        {
          title: "A NANNA CUCCIOLI",
          description:
            "Ogni volta che questo personaggio va all'avventura, un personaggio avversario a tua scelta non potrà andare all'avventura nel suo prossimo turno.",
        },
      ],
    },
  },
  inkType: ["emerald"],
  franchise: "101 Dalmatians",
  set: "001",
  cardNumber: 81,
  rarity: "uncommon",
  cost: 3,
  strength: 2,
  willpower: 4,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_1dd05220d5994e3181153d33340718fc",
    tcgPlayer: 507498,
  },
  text: [
    {
      title: "PUPPYNAPPING",
      description:
        "Whenever this character quests, chosen opposing character can't quest during their next turn.",
    },
  ],
  classifications: ["Storyborn", "Ally"],
  abilities: [
    {
      id: "gsE-1",
      name: "PUPPYNAPPING",
      text: "PUPPYNAPPING Whenever this character quests, chosen opposing character can't quest during their next turn.",
      type: "triggered",
      trigger: {
        event: "quest",
        on: "SELF",
        timing: "whenever",
      },
      effect: {
        type: "restriction",
        duration: "next-turn",
        restriction: "cant-quest",
        target: {
          selector: "chosen",
          count: 1,
          owner: "opponent",
          zones: ["play"],
          cardTypes: ["character"],
        },
      },
    },
  ],
};
