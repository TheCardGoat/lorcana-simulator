import type { CharacterCard } from "@tcg/lorcana-types";

export const madamMimFox: CharacterCard = {
  id: "XBE",
  canonicalId: "ci_XBE",
  reprints: ["set2-046"],
  cardType: "character",
  name: "Madam Mim",
  version: "Fox",
  i18n: {
    en: {
      name: "Madam Mim",
      version: "Fox",
      text: [
        {
          title: "CHASING THE RABBIT",
          description:
            "When you play this character, banish her or return another chosen character of yours to your hand.",
        },
        {
          title: "Rush",
        },
      ],
    },
    de: {
      name: "Madame Mim",
      version: "Fuchs",
      text: [
        {
          title: "DEM HASEN NACHJAGEN",
          description:
            "Wenn du diesen Charakter ausspielst, musst du ihn verbannen oder einen deiner anderen Charaktere wählen und zurück auf deine Hand nehmen. Rasant",
        },
      ],
    },
    fr: {
      name: "Madame Mime",
      version: "En renard",
      text: [
        {
          title: "À LA POURSUITE DU LAPIN",
          description:
            "Lorsque vous jouez ce personnage, bannissez-le ou renvoyez l'un de vos autres personnages en jeu dans votre main. Charge",
        },
      ],
    },
    it: {
      name: "Maga Magò",
      version: "Volpe",
      text: [
        {
          title: "INSEGUIRE IL CONIGLIO",
          description:
            "Quando giochi questo personaggio, esilialo o riprendi in mano un tuo altro personaggio a tua scelta. Lesto (Questo personaggio può sfidare nel turno in cui è stato giocato.)",
        },
      ],
    },
  },
  inkType: ["amethyst"],
  franchise: "Sword in the Stone",
  set: "002",
  cardNumber: 46,
  rarity: "rare",
  cost: 3,
  strength: 4,
  willpower: 3,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_3c23dd0191ce4f80897a8f50d75bc7bc",
    tcgPlayer: 521719,
  },
  text: [
    {
      title: "CHASING THE RABBIT",
      description:
        "When you play this character, banish her or return another chosen character of yours to your hand.",
    },
    {
      title: "Rush",
    },
  ],
  classifications: ["Storyborn", "Villain", "Sorcerer"],
  missingTests: true,
  abilities: [
    {
      id: "1ej-1",
      name: "CHASING THE RABBIT",
      text: "CHASING THE RABBIT When you play this character, banish her or return another chosen character of yours to your hand.",
      effect: {
        type: "or",
        optionLabels: ["banish her", "return another chosen character of yours to your hand"],
        options: [
          {
            target: "SELF",
            type: "banish",
          },
          {
            target: {
              cardTypes: ["character"],
              count: 1,
              excludeSelf: true,
              owner: "you",
              selector: "chosen",
              zones: ["play"],
            },
            type: "return-to-hand",
          },
        ],
      },
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
    {
      id: "1ej-2",
      keyword: "Rush",
      text: "Rush",
      type: "keyword",
    },
  ],
};
