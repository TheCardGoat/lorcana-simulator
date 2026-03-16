import type { CharacterCard } from "@tcg/lorcana-types";

export const theQueenMirrorSeekerEpic: CharacterCard = {
  id: "5AS",
  canonicalId: "ci_h2q",
  reprints: ["set3-156", "set9-149"],
  cardType: "character",
  name: "The Queen",
  version: "Mirror Seeker",
  i18n: {
    en: {
      name: "The Queen",
      version: "Mirror Seeker",
      text: [
        {
          title: "CALCULATING AND VAIN",
          description:
            "Whenever this character quests, you may look at the top 3 cards of your deck and put them back in any order.",
        },
      ],
    },
    de: {
      name: "Die Königin",
      version: "Spiegel-Sucherin",
      text: [
        {
          title: "BERECHNEND UND EITEL",
          description:
            "Jedes Mal, wenn dieser Charakter erkundet, darfst du dir die obersten 3 Karten deines Decks anschauen und in beliebiger Reihenfolge zurücklegen.",
        },
      ],
    },
    fr: {
      name: "La Reine",
      version: "Narcissique",
      text: [
        {
          title: "CALCULATRICE ET VANITEUSE",
          description:
            "Chaque fois que ce personnage est envoyé à l'aventure, vous pouvez regarder les 3 premières cartes de votre pioche, puis les remettre sur le dessus de votre pioche dans l'ordre de votre choix.",
        },
      ],
    },
    it: {
      name: "Regina",
      version: "Consultatrice di Specchi",
      text: [
        {
          title: "CALCOLATRICE E VANITOSA",
          description:
            "Ogni volta che questo personaggio va all'avventura, puoi guardare le prime 3 carte del tuo mazzo e rimetterle in cima al mazzo in qualsiasi ordine.",
        },
      ],
    },
  },
  inkType: ["sapphire"],
  franchise: "Snow White",
  set: "009",
  cardNumber: 219,
  rarity: "common",
  specialRarity: "epic",
  cost: 4,
  strength: 2,
  willpower: 5,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_2124e542c7de4cadb69cb6e1887547ee",
    tcgPlayer: 650154,
  },
  text: [
    {
      title: "CALCULATING AND VAIN",
      description:
        "Whenever this character quests, you may look at the top 3 cards of your deck and put them back in any order.",
    },
  ],
  classifications: ["Storyborn", "Villain", "Queen", "Sorcerer"],
  abilities: [
    {
      effect: {
        chooser: "CONTROLLER",
        effect: {
          amount: 3,
          destinations: [
            {
              zone: "deck-top",
              remainder: true,
              ordering: "player-choice",
            },
          ],
          target: "CONTROLLER",
          type: "scry",
        },
        type: "optional",
      },
      id: "fah-1",
      name: "CALCULATING AND VAIN",
      text: "CALCULATING AND VAIN Whenever this character quests, you may look at the top 3 cards of your deck and put them back in any order.",
      trigger: {
        event: "quest",
        on: "SELF",
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
};
