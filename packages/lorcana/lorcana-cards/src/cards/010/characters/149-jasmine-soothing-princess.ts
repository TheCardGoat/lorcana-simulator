import type { CharacterCard } from "@tcg/lorcana-types";

export const jasmineSoothingPrincess: CharacterCard = {
  id: "pbv",
  canonicalId: "ci_pbv",
  reprints: ["set10-149"],
  cardType: "character",
  name: "Jasmine",
  version: "Soothing Princess",
  i18n: {
    en: {
      name: "Jasmine",
      version: "Soothing Princess",
      text: [
        {
          title: "Boost 2 {I}",
        },
        {
          title: "UPLIFTING AURA",
          description:
            "Whenever this character quests, if there's a card under her, remove up to 3 damage from each of your characters.",
        },
      ],
    },
    de: {
      name: "Jasmin",
      version: "Beruhigende Prinzessin",
      text: "Stärken 2 AUFMUNTERNDE AURA Jedes Mal, wenn dieser Charakter erkundet, falls er mindestens eine Karte unter sich hat, entferne bis zu 3 Schaden von jedem deiner Charaktere.",
    },
    fr: {
      name: "Jasmine",
      version: "Princesse apaisante",
      text: "Boost 2 AURA REVIGORANTE Chaque fois que ce personnage est envoyé à l'aventure, s'il y a une carte sous lui, retirez jusqu'à 3 dommages de chacun de vos personnages.",
    },
    it: {
      name: "Jasmine",
      version: "Principessa Confortante",
      text: [
        {
          title: "Potenziamento 2",
          description:
            "(Una volta durante il tuo turno, puoi pagare 2 per mettere la prima carta del tuo mazzo a faccia in giù sotto a questo personaggio.) AURA INCORAGGIANTE Ogni volta che questo personaggio va all'avventura, se c'è una carta sotto di esso, rimuovi fino a 3 danni da ogni tuo personaggio.",
        },
      ],
    },
  },
  inkType: ["sapphire"],
  franchise: "Aladdin",
  set: "010",
  cardNumber: 149,
  rarity: "uncommon",
  cost: 4,
  strength: 2,
  willpower: 5,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_19f087c81e534ceda53b510446d75965",
    tcgPlayer: 658216,
  },
  text: [
    {
      title: "Boost 2 {I}",
    },
    {
      title: "UPLIFTING AURA",
      description:
        "Whenever this character quests, if there's a card under her, remove up to 3 damage from each of your characters.",
    },
  ],
  classifications: ["Storyborn", "Hero", "Princess", "Whisper"],
  abilities: [
    {
      id: "1rh-1",
      keyword: "Boost",
      text: "Boost 2 {I}",
      type: "keyword",
      value: 2,
    },
    {
      effect: {
        condition: {
          expression: "there’s a card under her",
          type: "if",
        },
        then: {
          amount: 3,
          target: {
            selector: "all",
            count: "all",
            owner: "you",
            zones: ["play"],
            cardTypes: ["character"],
          },
          type: "remove-damage",
          upTo: true,
        },
        type: "conditional",
      },
      id: "1rh-2",
      name: "UPLIFTING AURA",
      text: "UPLIFTING AURA Whenever this character quests, if there’s a card under her, remove up to 3 damage from each of your characters.",
      trigger: {
        event: "quest",
        on: "SELF",
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
};
