import type { CharacterCard } from "@tcg/lorcana-types";

export const tamatoaHappyAsAClam: CharacterCard = {
  id: "c1L",
  canonicalId: "ci_rx2",
  reprints: ["set7-162"],
  cardType: "character",
  name: "Tamatoa",
  version: "Happy as a Clam",
  i18n: {
    en: {
      name: "Tamatoa",
      version: "Happy as a Clam",
      text: [
        {
          title: "COOLEST COLLECTION",
          description:
            "When you play this character, return up to 2 item cards from your discard to your hand.",
        },
        {
          title: "I'M BEAUTIFUL, BABY!",
          description: "Whenever this character quests, you may play an item for free.",
        },
      ],
    },
    de: {
      name: "Tamatoa",
      version: "Ist er nicht souverän",
      text: [
        {
          title: "SAGENHAFTE SAMMLUNG",
          description:
            "Wenn du diesen Charakter ausspielst, nimm bis zu 2 Gegenstandskarten aus deinem Ablagestapel zurück auf deine Hand.",
        },
        {
          title: "ICH BIN STRAHLEND SCHÖN, BABY!",
          description:
            "Jedes Mal, wenn dieser Charakter erkundet, darfst du einen Gegenstand kostenlos ausspielen.",
        },
      ],
    },
    fr: {
      name: "Tamatoa",
      version: "Peut enfin sécher ses larmes",
      text: [
        {
          title: "LA PLUS BELLE DES COLLECTIONS",
          description:
            "Lorsque vous jouez ce personnage, renvoyez dans votre main jusqu'à 2 objets de votre défausse.",
        },
        {
          title: "ON M'APPELLE L'ARTISTE",
          description:
            "Chaque fois que ce personnage est envoyé à l'aventure, vous pouvez jouer un objet gratuitement.",
        },
      ],
    },
    it: {
      name: "Tamatoa",
      version: "Fama Trovata",
      text: [
        {
          title: "INCREDIBILE COLLEZIONE",
          description:
            "Quando giochi questo personaggio, riprendi in mano fino a 2 carte oggetto dai tuoi scarti.",
        },
        {
          title: "IO SONO IL PIÙ BELLO, BABY!",
          description:
            "Ogni volta che questo personaggio va all'avventura, puoi giocare un oggetto gratis.",
        },
      ],
    },
  },
  inkType: ["sapphire"],
  franchise: "Moana",
  set: "007",
  cardNumber: 162,
  rarity: "legendary",
  cost: 6,
  strength: 4,
  willpower: 5,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_f2493d13b19a45559af0e7ce96f079bc",
    tcgPlayer: 619747,
  },
  text: [
    {
      title: "COOLEST COLLECTION",
      description:
        "When you play this character, return up to 2 item cards from your discard to your hand.",
    },
    {
      title: "I'M BEAUTIFUL, BABY!",
      description: "Whenever this character quests, you may play an item for free.",
    },
  ],
  classifications: ["Storyborn", "Villain"],
  abilities: [
    {
      effect: {
        target: {
          cardTypes: ["item"],
          count: 1,
          owner: "any",
          selector: "chosen",
          zones: ["play"],
        },
        type: "return-to-hand",
      },
      id: "1i4-1",
      name: "COOLEST COLLECTION",
      text: "COOLEST COLLECTION When you play this character, return up to 2 item cards from your discard to your hand.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
    {
      effect: {
        chooser: "CONTROLLER",
        effect: {
          cardType: "item",
          cost: "free",
          from: "hand",
          type: "play-card",
        },
        type: "optional",
      },
      id: "1i4-2",
      text: "I'M BEAUTIFUL, BABY! Whenever this character quests, you may play an item for free.",
      type: "action",
    },
  ],
};
