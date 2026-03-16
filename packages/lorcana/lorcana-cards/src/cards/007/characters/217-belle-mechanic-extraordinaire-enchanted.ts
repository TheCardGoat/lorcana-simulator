import type { CharacterCard } from "@tcg/lorcana-types";

export const belleMechanicExtraordinaireEnchanted: CharacterCard = {
  id: "rX6",
  canonicalId: "ci_PhF",
  reprints: ["set7-126"],
  cardType: "character",
  name: "Belle",
  version: "Mechanic Extraordinaire",
  i18n: {
    en: {
      name: "Belle",
      version: "Mechanic Extraordinaire",
      text: [
        {
          title: "Shift 7",
        },
        {
          title: "SALVAGE",
          description:
            "For each item card in your discard, you pay 1 {I} less to play this character using her Shift ability.",
        },
        {
          title: "REPURPOSE",
          description:
            "Whenever this character quests, you may put up to 3 item cards from your discard on the bottom of your deck to gain 1 lore for each item card moved this way.",
        },
      ],
    },
    de: {
      name: "Belle",
      version: "Mechanikerin der Extraklasse",
      text: "Gestaltwandel 7 BERGUNG Die Gestaltwandel-Kosten dieses Charakters reduzieren sich für jede Gegenstandskarte in deinem Ablagestapel um 1. WIEDERVERWENDUNG Jedes Mal, wenn dieser Charakter erkundet, darfst du bis zu 3 Gegenstandskarten aus deinem Ablagestapel unter dein Deck legen, um für jede so bewegte Karte 1 Legende zu sammeln.",
    },
    fr: {
      name: "Belle",
      version: "Mécanicienne extraordinaire",
      text: "Alter 7 RÉCUPÉRATION Jouer ce personnage en utilisant sa capacité Alter vous coûte 1 de moins pour chaque carte Objet dans votre défausse. RECYCLAGE Chaque fois que ce personnage est envoyé à l'aventure, vous pouvez placer jusqu'à 3 cartes Objet de votre défausse sous votre pioche pour gagner 1 éclat de Lore par carte placée ainsi.",
    },
    it: {
      name: "Belle",
      version: "Meccanica Straordinaria",
      text: "Trasformazione 7 RECUPERARE Per ogni carta oggetto nei tuoi scarti, paga 1 in meno per giocare questo personaggio usando la sua abilità Trasformazione. CONVERTIRE Ogni volta che questo personaggio va all'avventura, puoi mettere fino a 3 carte oggetto dai tuoi scarti in fondo al tuo mazzo per ottenere 1 leggenda per ogni carta oggetto spostata in questo modo.",
    },
  },
  inkType: ["ruby", "sapphire"],
  franchise: "Beauty and the Beast",
  set: "007",
  cardNumber: 217,
  rarity: "enchanted",
  specialRarity: "enchanted",
  cost: 9,
  strength: 7,
  willpower: 7,
  lore: 3,
  inkable: true,
  externalIds: {
    lorcast: "crd_0d38ed42e8f14a299f6efefb250350d3",
    tcgPlayer: 619745,
  },
  text: [
    {
      title: "Shift 7",
    },
    {
      title: "SALVAGE",
      description:
        "For each item card in your discard, you pay 1 {I} less to play this character using her Shift ability.",
    },
    {
      title: "REPURPOSE",
      description:
        "Whenever this character quests, you may put up to 3 item cards from your discard on the bottom of your deck to gain 1 lore for each item card moved this way.",
    },
  ],
  classifications: ["Floodborn", "Hero", "Princess", "Inventor"],
  abilities: [
    {
      cost: {
        ink: 7,
      },
      id: "lej-1",
      keyword: "Shift",
      text: "Shift 7",
      type: "keyword",
    },
    {
      effect: {
        from: "hand",
        type: "play-card",
      },
      id: "lej-2",
      text: "SALVAGE For each item card in your discard, you pay 1 {I} less to play this character using her Shift ability.",
      type: "action",
    },
    {
      effect: {
        chooser: "CONTROLLER",
        effect: {
          amount: 1,
          type: "gain-lore",
        },
        type: "optional",
      },
      id: "lej-3",
      name: "REPURPOSE",
      text: "REPURPOSE Whenever this character quests, you may put up to 3 item cards from your discard on the bottom of your deck to gain 1 lore for each item card moved this way.",
      trigger: {
        event: "quest",
        on: "SELF",
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
};
