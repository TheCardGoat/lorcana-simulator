import type { CharacterCard } from "@tcg/lorcana-types";

export const widowTweedKindlySoul: CharacterCard = {
  id: "EI1",
  canonicalId: "ci_EI1",
  reprints: ["set11-026"],
  cardType: "character",
  name: "Widow Tweed",
  version: "Kindly Soul",
  i18n: {
    en: {
      name: "Widow Tweed",
      version: "Kindly Soul",
      text: [
        {
          title: "I'VE GOT YOU",
          description:
            "When you play this character, return a character card from your discard to your hand. If that character is named Tod, you may play him for free.",
        },
      ],
    },
    de: {
      name: "Witwe Tweed",
      version: "Freundliche Seele",
      text: [
        {
          title: "ICH HAB DICH",
          description:
            "Wenn du diesen Charakter ausspielst, nimm 1 Charakterkarte aus deinem Ablagestapel zurück auf deine Hand. Falls jene Karte eine Cap-Charakterkarte ist, darfst du sie kostenlos ausspielen.",
        },
      ],
    },
    fr: {
      name: "Veuve Tartine",
      version: "Âme bienveillante",
      text: [
        {
          title: "JE TE TIENS",
          description:
            "Lorsque vous jouez ce personnage, renvoyez dans votre main une carte Personnage de votre défausse. Si ce personnage-là est nommé Rox, vous pouvez le jouer gratuitement.",
        },
      ],
    },
    it: {
      name: "Signora Tweed",
      version: "Anima Gentile",
      text: [
        {
          title: "CI PENSO IO",
          description:
            "Quando giochi questo personaggio, riprendi in mano una carta personaggio dai tuoi scarti. Se quel personaggio si chiama Red, puoi giocarlo gratis.",
        },
      ],
    },
  },
  inkType: ["amber"],
  franchise: "Fox and the Hound",
  set: "011",
  cardNumber: 26,
  rarity: "rare",
  cost: 6,
  strength: 2,
  willpower: 8,
  lore: 2,
  inkable: false,
  externalIds: {
    lorcast: "crd_5d8b927e8f92419c93dd42424d44f562",
    tcgPlayer: 676191,
  },
  text: [
    {
      title: "I'VE GOT YOU",
      description:
        "When you play this character, return a character card from your discard to your hand. If that character is named Tod, you may play him for free.",
    },
  ],
  classifications: ["Storyborn", "Ally"],
  abilities: [
    {
      id: "i8u-1",
      effect: {
        condition: {
          expression: "that character is named Tod",
          type: "if",
        },
        then: {
          from: "hand",
          type: "play-card",
          cost: "free",
        },
        type: "conditional",
      },
      name: "I'VE GOT YOU",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
      text: "I'VE GOT YOU When you play this character, return a character card from your discard to your hand. If that character is named Tod, you may play him for free.",
    },
  ],
};
