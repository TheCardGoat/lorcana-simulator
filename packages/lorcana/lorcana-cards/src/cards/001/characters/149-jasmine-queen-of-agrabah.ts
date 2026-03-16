import type { CharacterCard } from "@tcg/lorcana-types";

export const jasmineQueenOfAgrabah: CharacterCard = {
  id: "Abg",
  canonicalId: "ci_Abg",
  reprints: ["set1-149"],
  cardType: "character",
  name: "Jasmine",
  version: "Queen of Agrabah",
  i18n: {
    en: {
      name: "Jasmine",
      version: "Queen of Agrabah",
      text: [
        {
          title: "Shift 3",
        },
        {
          title: "CARETAKER",
          description:
            "When you play this character and whenever she quests, you may remove up to 2 damage from each of your characters.",
        },
      ],
    },
    de: {
      name: "Jasmin",
      version: "Königin von Agrabah",
      text: "Gestaltwandel 3 FÜRSORGE Wenn du diesen Charakter ausspielst und jedes Mal, wenn er erkundet, darfst du bis zu 2 Schaden von jedem deiner Charaktere entfernen.",
    },
    fr: {
      name: "JASMINE",
      version: "Reine d'Agrabah",
      text: "Alter 3 PROTECTRICE Lorsque vous jouez ce personnage ou qu'elle est envoyée à l'aventure, vous pouvez retirer jusqu'à 2 jetons Dommage de chacun de vos personnages.",
    },
    it: {
      name: "Jasmine",
      version: "Regina di Agrabah",
      text: "Trasformazione 3 PROVVIDENTE Quando giochi questo personaggio e ogni volta che va all'avventura, puoi rimuovere fino a 2 danni da ogni tuo personaggio.",
    },
  },
  inkType: ["sapphire"],
  franchise: "Aladdin",
  set: "001",
  cardNumber: 149,
  rarity: "rare",
  cost: 5,
  strength: 2,
  willpower: 5,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_6b26bc2dda6e49bba695529a039dcaee",
    tcgPlayer: 508857,
  },
  text: [
    {
      title: "Shift 3",
    },
    {
      title: "CARETAKER",
      description:
        "When you play this character and whenever she quests, you may remove up to 2 damage from each of your characters.",
    },
  ],
  classifications: ["Floodborn", "Hero", "Princess", "Queen"],
  abilities: [
    {
      cost: {
        ink: 3,
      },
      id: "8w9-1",
      keyword: "Shift",
      text: "Shift 3",
      type: "keyword",
    },
    {
      effect: {
        chooser: "CONTROLLER",
        effect: {
          amount: 2,
          target: "YOUR_CHARACTERS",
          type: "remove-damage",
          upTo: true,
        },
        type: "optional",
      },
      id: "8w9-2",
      name: "CARETAKER",
      text: "CARETAKER When you play this character and whenever she quests, you may remove up to 2 damage from each of your characters.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
