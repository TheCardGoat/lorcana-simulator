import type { CharacterCard } from "@tcg/lorcana-types";

export const hiroHamadaTeamLeader: CharacterCard = {
  id: "Lzp",
  canonicalId: "ci_Lzp",
  reprints: ["set6-154"],
  cardType: "character",
  name: "Hiro Hamada",
  version: "Team Leader",
  i18n: {
    en: {
      name: "Hiro Hamada",
      version: "Team Leader",
      text: [
        {
          title: "I NEED TO UPGRADE ALL OF YOU",
          description: "Your other Inventor characters gain Resist +1.",
        },
        {
          title: "SHAPE THE FUTURE 2",
          description:
            "{I} — Look at the top card of your deck. Put it on either the top or the bottom of your deck.",
        },
      ],
    },
    de: {
      name: "Hiro Hamada",
      version: "Teamleiter",
      text: [
        {
          title: "ICH MUSS JEDEN EINZELNEN VON EUCH UPGRADEN",
          description:
            "Deine anderen Erfinder erhalten Robust +1. (Reduziere jeglichen Schaden, der ihnen zugefügt wird, um 1.) FORME DIE ZUKUNFT 2 — Schaue dir die oberste Karte deines Decks an. Lege sie anschließend entweder auf dein Deck oder darunter.",
        },
      ],
    },
    fr: {
      name: "Hiro Hamada",
      version: "Leader de l’équipe",
      text: [
        {
          title: "JE VAIS TOUS VOUS METTRE",
          description:
            "À JOUR Vos autres personnages Inventeur gagnent Résistance +1. FAÇONNER L'AVENIR 2 — Regardez la carte du dessus de votre pioche. Remettez-la soit sur le dessus de votre pioche, soit en dessous.",
        },
      ],
    },
    it: {
      name: "Hiro Hamada",
      version: "Capo del Team",
      text: [
        {
          title: "AVRETE TUTTI BISOGNO DI UN UPGRADE I",
          description:
            "tuoi altri personaggi Inventore ottengono Resistere +1. PLASMARE IL FUTURO 2 — Guarda la prima carta del tuo mazzo. Mettila in cima o in fondo al tuo mazzo.",
        },
      ],
    },
  },
  inkType: ["sapphire"],
  franchise: "Big Hero 6",
  set: "006",
  cardNumber: 154,
  rarity: "rare",
  cost: 4,
  strength: 1,
  willpower: 5,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_7115d5f5c2604ff08596a89ef6574d19",
    tcgPlayer: 578232,
  },
  text: [
    {
      title: "I NEED TO UPGRADE ALL OF YOU",
      description: "Your other Inventor characters gain Resist +1.",
    },
    {
      title: "SHAPE THE FUTURE 2",
      description:
        "{I} — Look at the top card of your deck. Put it on either the top or the bottom of your deck.",
    },
  ],
  classifications: ["Storyborn", "Hero", "Inventor"],
  abilities: [
    {
      effect: {
        keyword: "Resist",
        target: "CHOSEN_CHARACTER",
        type: "gain-keyword",
        value: 1,
      },
      id: "1yr-1",
      name: "I NEED TO UPGRADE ALL OF YOU Your other Inventor",
      text: "I NEED TO UPGRADE ALL OF YOU Your other Inventor characters gain Resist +1.",
      type: "static",
    },
    {
      effect: {
        target: "CHOSEN_CHARACTER",
        type: "put-on-bottom",
      },
      id: "1yr-2",
      text: "SHAPE THE FUTURE 2 {I} - Look at the top card of your deck. Put it on either the top or the bottom of your deck.",
      type: "action",
    },
  ],
};
