import type { CharacterCard } from "@tcg/lorcana-types";

export const daisyDuckSapphireChampion: CharacterCard = {
  id: "CLU",
  canonicalId: "ci_CLU",
  reprints: ["set10-158"],
  cardType: "character",
  name: "Daisy Duck",
  version: "Sapphire Champion",
  i18n: {
    en: {
      name: "Daisy Duck",
      version: "Sapphire Champion",
      text: [
        {
          title: "STAND FAST",
          description: "Your other Sapphire characters gain Resist +1.",
        },
        {
          title: "LOOK AHEAD",
          description:
            "Whenever one of your other Sapphire characters quests, you may look at the top card of your deck. Put it on either the top or the bottom of your deck.",
        },
      ],
    },
    de: {
      name: "Daisy Duck",
      version: "Saphir-Champion",
      text: [
        {
          title: "BLEIBT STANDHAFT",
          description:
            "Deine anderen Saphir-Charaktere erhalten Robust +1. (Reduziere jeglichen Schaden, der ihnen zugefügt wird, um 1.)",
        },
        {
          title: "BLICKT NACH VORNE",
          description:
            "Jedes Mal, wenn einer deiner anderen Saphir-Charaktere erkundet, darfst du dir die oberste Karte deines Decks anschauen. Lege sie anschließend entweder auf dein Deck oder darunter.",
        },
      ],
    },
    fr: {
      name: "Daisy",
      version: "Championne Saphir",
      text: [
        {
          title: "TENIR FERME",
          description: "Vos autres personnages Saphir gagnent Résistance +1.",
        },
        {
          title: "ANTICIPER",
          description:
            "Chaque fois que l'un de vos autres personnages Saphir est envoyé à l'aventure, vous pouvez regarder la carte du dessus de votre pioche. Remettez-la soit sur le dessus de votre pioche, soit en dessous.",
        },
      ],
    },
    it: {
      name: "Paperina",
      version: "Campionessa di Zaffiro",
      text: [
        {
          title: "TENERE DURO I",
          description: "tuoi altri personaggi Zaffiro ottengono Resistere +1.",
        },
        {
          title: "GUARDARE AVANTI",
          description:
            "Ogni volta che uno dei tuoi altri personaggi Zaffiro va all'avventura, puoi guardare la prima carta del tuo mazzo. Mettila o in cima o in fondo al tuo mazzo.",
        },
      ],
    },
  },
  inkType: ["sapphire"],
  set: "010",
  cardNumber: 158,
  rarity: "rare",
  cost: 5,
  strength: 5,
  willpower: 6,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_a41add9515e547cb8273ba6973b125b4",
    tcgPlayer: 659630,
  },
  text: [
    {
      title: "STAND FAST",
      description: "Your other Sapphire characters gain Resist +1.",
    },
    {
      title: "LOOK AHEAD",
      description:
        "Whenever one of your other Sapphire characters quests, you may look at the top card of your deck. Put it on either the top or the bottom of your deck.",
    },
  ],
  classifications: ["Dreamborn", "Hero"],
  abilities: [
    {
      effect: {
        keyword: "Resist",
        target: "YOUR_OTHER_SAPPHIRE_CHARACTERS",
        type: "gain-keyword",
        value: 1,
      },
      id: "107-1",
      name: "STAND FAST",
      text: "STAND FAST Your other Sapphire characters gain Resist +1.",
      type: "static",
    },
    {
      effect: {
        chooser: "CONTROLLER",
        effect: {
          type: "scry",
          amount: 1,
          destinations: [
            { zone: "deck-top", max: 1 },
            { zone: "deck-bottom", remainder: true },
          ],
        },
        type: "optional",
      },
      id: "107-2",
      name: "LOOK AHEAD",
      text: "LOOK AHEAD Whenever one of your other Sapphire characters quests, you may look at the top card of your deck. Put it on either the top or the bottom of your deck.",
      trigger: {
        event: "quest",
        on: "YOUR_OTHER_SAPPHIRE_CHARACTERS",
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
};
