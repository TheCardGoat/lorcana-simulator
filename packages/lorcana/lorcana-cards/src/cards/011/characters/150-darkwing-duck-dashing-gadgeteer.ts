import type { CharacterCard } from "@tcg/lorcana-types";

export const darkwingDuckDashingGadgeteer: CharacterCard = {
  id: "Zlv",
  canonicalId: "ci_UY0",
  reprints: ["set11-150"],
  cardType: "character",
  name: "Darkwing Duck",
  version: "Dashing Gadgeteer",
  i18n: {
    en: {
      name: "Darkwing Duck",
      version: "Dashing Gadgeteer",
      text: [
        {
          title: "MODERN MARVEL",
          description:
            "Whenever this character quests, you may put an item card from your discard on the bottom of your deck. If you do, you may play an item with cost 5 or less from your discard for free.",
        },
      ],
    },
    de: {
      name: "Darkwing Duck",
      version: "Gerissener Tüftler",
      text: [
        {
          title: "MODERNES WUNDER",
          description:
            "Jedes Mal, wenn dieser Charakter erkundet, darfst du 1 Gegenstandskarte aus deinem Ablagestapel unter dein Deck legen. Wenn du dies tust, darfst du einen Gegenstand, der 5 oder weniger kostet, aus deinem Ablagestapel kostenlos ausspielen.",
        },
      ],
    },
    fr: {
      name: "Myster Mask",
      version: "Fringant bricoleur de gadgets",
      text: [
        {
          title: "MERVEILLE MODERNE",
          description:
            "Chaque fois que ce personnage est envoyé à l'aventure, vous pouvez placer une carte Objet de votre défausse sous votre pioche. Si vous le faites, vous pouvez jouer gratuitement un objet coûtant 5 ou moins de votre défausse.",
        },
      ],
    },
    it: {
      name: "Darkwing Duck",
      version: "Affascinante Appassionato di Gadget",
      text: [
        {
          title: "MERAVIGLIA MODERNA",
          description:
            "Ogni volta che questo personaggio va all'avventura, puoi mettere una carta oggetto dai tuoi scarti in fondo al tuo mazzo. Se lo fai, puoi giocare un oggetto con costo 5 o inferiore dai tuoi scarti, gratis.",
        },
      ],
    },
  },
  inkType: ["sapphire"],
  franchise: "Darkwing Duck",
  set: "011",
  cardNumber: 150,
  rarity: "common",
  cost: 4,
  strength: 3,
  willpower: 5,
  lore: 1,
  inkable: false,
  externalIds: {
    lorcast: "crd_79e8c2e58ef1439ba301da0ec23f1f08",
    tcgPlayer: 658218,
  },
  text: [
    {
      title: "MODERN MARVEL",
      description:
        "Whenever this character quests, you may put an item card from your discard on the bottom of your deck. If you do, you may play an item with cost 5 or less from your discard for free.",
    },
  ],
  classifications: ["Dreamborn", "Super", "Hero", "Detective"],
  abilities: [
    {
      id: "19r-1",
      effect: {
        steps: [
          {
            chooser: "CONTROLLER",
            effect: {
              target: {
                cardTypes: ["item"],
                count: 1,
                owner: "any",
                selector: "chosen",
                zones: ["play"],
              },
              type: "put-on-bottom",
            },
            type: "optional",
          },
          {
            from: "discard",
            type: "play-card",
            cost: "free",
          },
        ],
        type: "sequence",
      },
      name: "MODERN MARVEL",
      trigger: {
        event: "quest",
        on: "SELF",
        timing: "whenever",
      },
      type: "triggered",
      text: "MODERN MARVEL Whenever this character quests, you may put an item card from your discard on the bottom of your deck. If you do, you may play an item with cost 5 or less from your discard for free.",
    },
  ],
};
