import type { CharacterCard } from "@tcg/lorcana-types";

export const princeNaveenUkulelePlayer: CharacterCard = {
  id: "4kO",
  canonicalId: "ci_hWb",
  reprints: ["set5-003"],
  cardType: "character",
  name: "Prince Naveen",
  version: "Ukulele Player",
  i18n: {
    en: {
      name: "Prince Naveen",
      version: "Ukulele Player",
      text: [
        {
          title: "Singer 6",
        },
        {
          title: "IT'S BEAUTIFUL, NO?",
          description:
            "When you play this character, you may play a song with cost 6 or less for free.",
        },
      ],
    },
    de: {
      name: "Prinz Naveen",
      version: "Ukulelespieler",
      text: [
        {
          title: "Singen 6",
          description:
            "(Die Kosten dieses Charakters gelten als 6 für das Singen von Liedern.) SCHÖN, NICHT WAHR? Wenn du diesen Charakter ausspielst, darfst du ein Lied, das 6 oder weniger kostet, kostenlos ausspielen.",
        },
      ],
    },
    fr: {
      name: "Prince Naveen",
      version: "Joueur de ukulélé",
      text: "Mélomane 6 (Ce personnage est considéré comme ayant un coût de 6 pour chanter des chansons.) C'EST MERVEILLEUX, NON? Lorsque vous jouez ce personnage, vous pouvez jouer gratuitement une carte Chanson coûtant 6 ou moins.",
    },
    it: {
      name: "Principe Naveen",
      version: "Suonatore di Ukulele",
      text: "Melodioso 6 È BELLISSIMA, NO? Quando giochi questo personaggio, puoi giocare una canzone con costo 6 o inferiore gratis.",
    },
  },
  inkType: ["amber"],
  franchise: "Princess and the Frog",
  set: "005",
  cardNumber: 3,
  rarity: "legendary",
  cost: 4,
  strength: 3,
  willpower: 3,
  lore: 2,
  inkable: false,
  externalIds: {
    lorcast: "crd_74f050d47ef34391ba29b8c521450dac",
    tcgPlayer: 561993,
  },
  text: [
    {
      title: "Singer 6",
    },
    {
      title: "IT'S BEAUTIFUL, NO?",
      description:
        "When you play this character, you may play a song with cost 6 or less for free.",
    },
  ],
  classifications: ["Storyborn", "Hero", "Prince"],
  abilities: [
    {
      id: "v3r-1",
      keyword: "Singer",
      text: "Singer 6",
      type: "keyword",
      value: 6,
    },
    {
      effect: {
        chooser: "CONTROLLER",
        effect: {
          cost: "free",
          costRestriction: {
            comparison: "less-or-equal",
            value: 6,
          },
          from: "hand",
          type: "play-card",
        },
        type: "optional",
      },
      id: "v3r-2",
      text: "IT'S BEAUTIFUL, NO? When you play this character, you may play a song with cost 6 or less for free.",
      type: "action",
    },
  ],
};
