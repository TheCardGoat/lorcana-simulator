import type { CharacterCard } from "@tcg/lorcana-types";

export const chernabogEvildoerEnchanted: CharacterCard = {
  id: "thO",
  canonicalId: "ci_dKG",
  reprints: ["set3-003"],
  cardType: "character",
  name: "Chernabog",
  version: "Evildoer",
  i18n: {
    en: {
      name: "Chernabog",
      version: "Evildoer",
      text: [
        {
          title: "THE POWER OF EVIL",
          description:
            "For each character card in your discard, you pay 1 {I} less to play this character.",
        },
        {
          title: "SUMMON THE SPIRITS",
          description:
            "When you play this character, shuffle all character cards from your discard into your deck.",
        },
      ],
    },
    de: {
      name: "Chernabog",
      version: "Übeltäter",
      text: [
        {
          title: "DIE MACHT DES BÖSEN",
          description:
            "Für jede Charakterkarte in deinem Ablagestapel zahlst du 1 weniger, um diesen Charakter auszuspielen.",
        },
        {
          title: "DIE GEISTER BESCHWÖREN",
          description:
            "Wenn du diesen Charakter ausspielst, mische alle Charakterkarten aus deinem Ablagestapel zurück in dein Deck.",
        },
      ],
    },
    fr: {
      name: "Chernabog",
      version: "Répand le mal",
      text: [
        {
          title: "LE POUVOIR DU MAL",
          description:
            "Ce personnage vous coûte 1 de moins pour chaque carte Personnage dans votre défausse.",
        },
        {
          title: "INVOCATION DES ESPRITS",
          description:
            "Lorsque vous jouez ce personnage, remettez tous les personnages de votre défausse dans votre pioche, puis mélangez-la.",
        },
      ],
    },
    it: {
      name: "Chernabog",
      version: "Maligno",
      text: [
        {
          title: "IL POTERE DEL MALE",
          description:
            "Per ogni carta personaggio nei tuoi scarti, paga 1 in meno per giocare questo personaggio.",
        },
        {
          title: "EVOCARE GLI SPIRITI",
          description:
            "Quando giochi questo personaggio, rimescola nel tuo mazzo tutte le carte personaggio nei tuoi scarti.",
        },
      ],
    },
  },
  inkType: ["amber"],
  franchise: "Fantasia",
  set: "003",
  cardNumber: 205,
  rarity: "enchanted",
  specialRarity: "enchanted",
  cost: 10,
  strength: 9,
  willpower: 9,
  lore: 3,
  inkable: false,
  externalIds: {
    lorcast: "crd_7a288d030d1a471fbb818ccfdddc6052",
    tcgPlayer: 539156,
  },
  text: [
    {
      title: "THE POWER OF EVIL",
      description:
        "For each character card in your discard, you pay 1 {I} less to play this character.",
    },
    {
      title: "SUMMON THE SPIRITS",
      description:
        "When you play this character, shuffle all character cards from your discard into your deck.",
    },
  ],
  classifications: ["Storyborn", "Villain"],
  abilities: [
    {
      effect: {
        amount: {
          type: "filtered-count",
          owner: "you",
          zones: ["discard"],
          cardType: "character",
          filters: [],
        },
        cardType: "character",
        type: "cost-reduction",
      },
      id: "r3g-1",
      name: "THE POWER OF EVIL",
      sourceZones: ["hand"],
      text: "THE POWER OF EVIL For each character card in your discard, you pay 1 {I} less to play this character.",
      type: "static",
    },
    {
      effect: {
        intoDeck: "owner",
        target: {
          cardTypes: ["character"],
          count: "all",
          owner: "you",
          selector: "all",
          zones: ["discard"],
        },
        type: "shuffle-into-deck",
      },
      id: "r3g-2",
      name: "SUMMON THE SPIRITS",
      text: "SUMMON THE SPIRITS When you play this character, shuffle all character cards from your discard into your deck.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
