import type { CharacterCard } from "@tcg/lorcana-types";

export const ursulaVoiceStealer: CharacterCard = {
  id: "JPS",
  canonicalId: "ci_JPS",
  reprints: ["set9-044"],
  cardType: "character",
  name: "Ursula",
  version: "Voice Stealer",
  i18n: {
    en: {
      name: "Ursula",
      version: "Voice Stealer",
      text: [
        {
          title: "SING FOR ME",
          description:
            "When you play this character, exert chosen opposing ready character. Then, you may play a song with cost equal to or less than the exerted character's cost for free.",
        },
      ],
    },
    de: {
      name: "Ursula",
      version: "Stimmendiebin",
      text: [
        {
          title: "SING FÜR MICH",
          description:
            "Wenn du diesen Charakter ausspielst, erschöpfe einen gegnerischen, bereiten Charakter deiner Wahl. Dann darfst du ein Lied, das maximal so viel wie der erschöpfte Charakter kostet, kostenlos ausspielen.",
        },
      ],
    },
    fr: {
      name: "Ursula",
      version: "Voleuse de voix",
      text: [
        {
          title: "CHANTE POUR MOI",
          description:
            "Lorsque vous jouez ce personnage, choisissez un personnage redressé adverse et épuisez-le. Ensuite, vous pouvez jouer gratuitement une chanson avec un coût égal ou inférieur au coût du personnage ainsi épuisé.",
        },
      ],
    },
    it: {
      name: "Ursula",
      version: "Ladra di Voci",
      text: [
        {
          title: "CANTA PER ME",
          description:
            "Quando giochi questo personaggio, impegna un personaggio avversario preparato a tua scelta. Poi, puoi giocare una canzone con costo pari o inferiore al costo del personaggio impegnato, gratis.",
        },
      ],
    },
  },
  inkType: ["amethyst"],
  franchise: "Little Mermaid",
  set: "009",
  cardNumber: 44,
  rarity: "common",
  cost: 5,
  strength: 3,
  willpower: 4,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_1c44a2b730a54018a567031f38363a17",
    tcgPlayer: 649991,
  },
  text: [
    {
      title: "SING FOR ME",
      description:
        "When you play this character, exert chosen opposing ready character. Then, you may play a song with cost equal to or less than the exerted character's cost for free.",
    },
  ],
  classifications: ["Storyborn", "Villain", "Sorcerer"],
  abilities: [
    {
      effect: {
        chooser: "CONTROLLER",
        effect: {
          cardType: "action",
          cost: "free",
          from: "hand",
          type: "play-card",
        },
        type: "optional",
      },
      id: "19w-1",
      name: "SING FOR ME",
      text: "SING FOR ME When you play this character, exert chosen opposing ready character. Then, you may play a song with cost equal to or less than the exerted character's cost for free.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
