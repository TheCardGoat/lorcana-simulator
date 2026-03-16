import type { CharacterCard } from "@tcg/lorcana-types";

export const chernabogUnnaturalForce: CharacterCard = {
  id: "OZJ",
  canonicalId: "ci_OZJ",
  reprints: ["set11-077"],
  cardType: "character",
  name: "Chernabog",
  version: "Unnatural Force",
  i18n: {
    en: {
      name: "Chernabog",
      version: "Unnatural Force",
      text: [
        {
          title: "DARK DANCE",
          description:
            "When you play this character, you may shuffle chosen opposing character into their player's deck. If you do, that player may play a character from their discard for free.",
        },
      ],
    },
    de: {
      name: "Chernabog",
      version: "Unnatürliche Macht",
      text: [
        {
          title: "DUNKLER TANZ",
          description:
            "Wenn du diesen Charakter ausspielst, darfst du einen gegnerischen Charakter deiner Wahl zurück in das zugehörige Deck mischen. Wenn du dies tust, darf die Person, die den Charakter im Spiel hatte, einen Charakter aus ihrem Ablagestapel kostenlos ausspielen.",
        },
      ],
    },
    fr: {
      name: "Chernabog",
      version: "Force contre nature",
      text: [
        {
          title: "DANSE DES TÉNÈBRES",
          description:
            "Lorsque vous jouez ce personnage, vous pouvez choisir un personnage adverse et le mélanger dans la pioche de son propriétaire. Si vous le faites, son propriétaire peut jouer gratuitement un personnage de sa défausse.",
        },
      ],
    },
    it: {
      name: "Chernabog",
      version: "Forza Innaturale",
      text: [
        {
          title: "DANZA OSCURA",
          description:
            "Quando giochi questo personaggio, puoi mescolare un personaggio avversario a tua scelta nel mazzo del suo giocatore. Se lo fai, quel giocatore può giocare un personaggio dai suoi scarti, gratis.",
        },
      ],
    },
  },
  inkType: ["emerald"],
  franchise: "Fantasia",
  set: "011",
  cardNumber: 77,
  rarity: "common",
  cost: 5,
  strength: 5,
  willpower: 4,
  lore: 2,
  inkable: false,
  externalIds: {
    lorcast: "crd_10d405a5074a498592c40bed3888538a",
    tcgPlayer: 676198,
  },
  text: [
    {
      title: "DARK DANCE",
      description:
        "When you play this character, you may shuffle chosen opposing character into their player's deck. If you do, that player may play a character from their discard for free.",
    },
  ],
  classifications: ["Storyborn", "Villain"],
  abilities: [
    {
      id: "1yh-1",
      effect: {
        from: "hand",
        type: "play-card",
        cardType: "character",
        cost: "free",
      },
      name: "DARK DANCE",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
      text: "DARK DANCE When you play this character, you may shuffle chosen opposing character into their player’s deck. If you do, that player may play a character from their discard for free.",
    },
  ],
};
