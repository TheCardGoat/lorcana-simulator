import type { CharacterCard } from "@tcg/lorcana-types";

export const ursulaDeceiverOfAll: CharacterCard = {
  id: "vf1",
  canonicalId: "ci_hfF",
  reprints: ["set3-091"],
  cardType: "character",
  name: "Ursula",
  version: "Deceiver of All",
  i18n: {
    en: {
      name: "Ursula",
      version: "Deceiver of All",
      text: [
        {
          title: "WHAT A DEAL",
          description:
            "Whenever this character sings a song, you may play that song again from your discard for free, then put it on the bottom of your deck.",
        },
      ],
    },
    de: {
      name: "Ursula",
      version: "Täuscht alle",
      text: [
        {
          title: "WAS FÜR EIN DEAL",
          description:
            "Jedes Mal, wenn dieser Charakter ein Lied singt, darfst du dieses Lied erneut von deinem Ablagestapel kostenlos ausspielen. Lege es danach unter dein Deck.",
        },
      ],
    },
    fr: {
      name: "Ursula",
      version: "La plus perfide de toutes",
      text: [
        {
          title: "QUEL CONTRAT",
          description:
            "Chaque fois que ce personnage chante une chanson, vous pouvez rejouer cette chanson gratuitement depuis votre défausse, puis la remettre sous votre pioche.",
        },
      ],
    },
    it: {
      name: "Ursula",
      version: "Ingannatrice di Tutti",
      text: [
        {
          title: "CHE AFFARE",
          description:
            "Ogni volta che questo personaggio canta una canzone, puoi giocare nuovamente quella canzone dagli scarti gratis, poi mettila in fondo al tuo mazzo.",
        },
      ],
    },
  },
  inkType: ["emerald"],
  franchise: "Little Mermaid",
  set: "003",
  cardNumber: 91,
  rarity: "legendary",
  cost: 3,
  strength: 2,
  willpower: 3,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_7c5be60911d844b48189f3a042abdcfa",
    tcgPlayer: 539164,
  },
  text: [
    {
      title: "WHAT A DEAL",
      description:
        "Whenever this character sings a song, you may play that song again from your discard for free, then put it on the bottom of your deck.",
    },
  ],
  classifications: ["Dreamborn", "Villain", "Sorcerer"],
  abilities: [
    {
      effect: {
        chooser: "CONTROLLER",
        effect: {
          steps: [
            {
              cost: "free",
              filter: {
                cardType: "song",
              },
              from: "discard",
              type: "play-card",
            },
            {
              condition: {
                type: "if-you-do",
              },
              then: {
                target: {
                  ref: "previous-target",
                },
                type: "put-on-bottom",
              },
              type: "conditional",
            },
          ],
          type: "sequence",
        },
        type: "optional",
      },
      trigger: {
        event: "sing",
        on: "SELF",
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
};
