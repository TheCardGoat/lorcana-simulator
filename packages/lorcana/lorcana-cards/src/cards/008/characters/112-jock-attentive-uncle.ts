import type { CharacterCard } from "@tcg/lorcana-types";

export const jockAttentiveUncle: CharacterCard = {
  id: "uXU",
  canonicalId: "ci_uXU",
  reprints: ["set8-112"],
  cardType: "character",
  name: "Jock",
  version: "Attentive Uncle",
  i18n: {
    en: {
      name: "Jock",
      version: "Attentive Uncle",
      text: [
        {
          title: "VOICE OF EXPERIENCE",
          description:
            "When you play this character, if you have 3 or more other characters in play, gain 2 lore.",
        },
      ],
    },
    de: {
      name: "Jock",
      version: "Aufmerksamer Onkel",
      text: [
        {
          title: "STIMME DER ERFAHRUNG",
          description:
            "Wenn du diesen Charakter ausspielst und du mindestens 3 weitere Charaktere im Spiel hast, sammelst du 2 Legenden.",
        },
      ],
    },
    fr: {
      name: "Jock",
      version: "Oncle attentif",
      text: [
        {
          title: "LA VOIX DE L'EXPÉRIENCE",
          description:
            "Lorsque vous jouez ce personnage, si vous avez 3 autres personnages en jeu ou plus, gagnez 2 éclats de Lore.",
        },
      ],
    },
    it: {
      name: "Whisky",
      version: "Zio Premuroso",
      text: [
        {
          title: "VOCE DELL'ESPERIENZA",
          description:
            "Quando giochi questo personaggio, se hai in gioco 3 o più altri personaggi, ottieni 2 leggenda.",
        },
      ],
    },
  },
  inkType: ["emerald"],
  franchise: "Lady and the Tramp",
  set: "008",
  cardNumber: 112,
  rarity: "common",
  cost: 4,
  strength: 3,
  willpower: 4,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_69f2afcfdc244d3c9fd71c4dcfd39c25",
    tcgPlayer: 631422,
  },
  text: [
    {
      title: "VOICE OF EXPERIENCE",
      description:
        "When you play this character, if you have 3 or more other characters in play, gain 2 lore.",
    },
  ],
  classifications: ["Storyborn", "Ally"],
  abilities: [
    {
      effect: {
        condition: {
          expression: "you have 3 or more other characters in play",
          type: "if",
        },
        then: {
          amount: 2,
          type: "gain-lore",
        },
        type: "conditional",
      },
      id: "17d-1",
      name: "VOICE OF EXPERIENCE",
      text: "VOICE OF EXPERIENCE When you play this character, if you have 3 or more other characters in play, gain 2 lore.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
