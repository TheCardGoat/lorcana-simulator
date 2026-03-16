import type { CharacterCard } from "@tcg/lorcana-types";

export const shenziHeadHyena: CharacterCard = {
  id: "Ggo",
  canonicalId: "ci_Ggo",
  reprints: ["set5-091"],
  cardType: "character",
  name: "Shenzi",
  version: "Head Hyena",
  i18n: {
    en: {
      name: "Shenzi",
      version: "Head Hyena",
      text: [
        {
          title: "STICK AROUND FOR DINNER",
          description:
            "This character gets +1 {S} for each other Hyena character you have in play.",
        },
        {
          title: "WHAT HAVE WE GOT HERE?",
          description:
            "Whenever one of your Hyena characters challenges a damaged character, gain 2 lore.",
        },
      ],
    },
    de: {
      name: "Shenzi",
      version: "Leithyäne",
      text: [
        {
          title: "WARUM BLEIBT IHR NICHT ZUM ESSEN?",
          description: "Dieser Charakter erhält +1 für jede weitere Hyäne, die du im Spiel hast.",
        },
        {
          title: "WAS HABEN WIR DENN DA?",
          description:
            "Jedes Mal, wenn eine deiner Hyänen einen beschädigten Charakter herausfordert, sammelst du 2 Legenden.",
        },
      ],
    },
    fr: {
      name: "Shenzi",
      version: "Meneuse des hyènes",
      text: [
        {
          title: "RAVIES DE VOUS AVOIR À DÎNER",
          description:
            "Ce personnage gagne +1 pour chaque autre personnage Hyène que vous avez en jeu.",
        },
        {
          title: "TIENS TIENS TIENS...",
          description:
            "Chaque fois que l'un de vos personnages Hyène défie un personnage ayant au moins un dommage sur lui, gagnez 2 éclats de Lore.",
        },
      ],
    },
    it: {
      name: "Shenzi",
      version: "Capo Iena",
      text: [
        {
          title: "AVERVI PER CENA",
          description:
            "Questo personaggio riceve +1 per ogni altro personaggio Iena che hai in gioco.",
        },
        {
          title: "CHE COSA ABBIAMO QUI?",
          description:
            "Ogni volta che uno dei tuoi personaggi Iena sfida un personaggio danneggiato, ottieni 2 leggenda.",
        },
      ],
    },
  },
  inkType: ["emerald"],
  franchise: "Lion King",
  set: "005",
  cardNumber: 91,
  rarity: "rare",
  cost: 5,
  strength: 3,
  willpower: 6,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_a4bc1bcb3ca54062af8854d9ee7a920f",
    tcgPlayer: 561169,
  },
  text: [
    {
      title: "STICK AROUND FOR DINNER",
      description: "This character gets +1 {S} for each other Hyena character you have in play.",
    },
    {
      title: "WHAT HAVE WE GOT HERE?",
      description:
        "Whenever one of your Hyena characters challenges a damaged character, gain 2 lore.",
    },
  ],
  classifications: ["Storyborn", "Ally", "Hyena"],
  abilities: [
    {
      id: "19k-1",
      text: "STICK AROUND FOR DINNER This character gets +1 {S} for each other Hyena character you have in play.",
      name: "STICK AROUND FOR DINNER",
      effect: {
        modifier: {
          classification: "Hyena",
          controller: "you",
          type: "classification-character-count",
        },
        stat: "strength",
        target: "SELF",
        type: "modify-stat",
      },
      type: "static",
    },
    {
      id: "19k-2",
      text: "WHAT HAVE WE GOT HERE? Whenever one of your Hyena characters challenges a damaged character, gain 2 lore.",
      name: "WHAT HAVE WE GOT HERE?",
      effect: {
        amount: 0,
        type: "gain-lore",
      },
      trigger: {
        defender: {
          filters: [
            {
              type: "damaged",
            },
          ],
        },
        event: "challenge",
        on: {
          classification: "Hyena",
          controller: "you",
        },
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
};
