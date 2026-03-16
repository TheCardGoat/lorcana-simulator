import type { CharacterCard } from "@tcg/lorcana-types";

export const bellwetherAssistantMayor: CharacterCard = {
  id: "2R6",
  canonicalId: "ci_2R6",
  reprints: ["set6-090"],
  cardType: "character",
  name: "Bellwether",
  version: "Assistant Mayor",
  i18n: {
    en: {
      name: "Bellwether",
      version: "Assistant Mayor",
      text: [
        {
          title: "FEAR ALWAYS WORKS",
          description:
            "During your turn, whenever a card is put into your inkwell, chosen opposing character gains Reckless during their next turn. (They can't quest and must challenge if able.)",
        },
      ],
    },
    de: {
      name: "Bellwether",
      version: "Stellvertretende Bürgermeisterin",
      text: [
        {
          title: "ANGST FUNKTIONIERT IMMER",
          description:
            "Jedes Mal während deines Zuges, wenn eine Karte in deinen Tintenvorrat gelegt wird, erhält ein gegnerischer Charakter deiner Wahl in seinem nächsten Zug Impulsiv. (Der Charakter kann nicht erkunden und muss herausfordern, wenn möglich.)",
        },
      ],
    },
    fr: {
      name: "Bellwether",
      version: "Adjointe au maire",
      text: [
        {
          title: "LA PEUR, ÇA MARCHE TOUJOURS",
          description:
            "Durant votre tour, chaque fois qu'une carte est placée dans votre réserve d'encre, choisissez un personnage adverse qui gagne Combattant durant son prochain tour.",
        },
      ],
    },
    it: {
      name: "Bellwether",
      version: "Assistente Sindaco",
      text: [
        {
          title: "LA PAURA FUNZIONA SEMPRE",
          description:
            "Durante il tuo turno, ogni volta che una carta viene aggiunta al tuo calamaio, un personaggio avversario a tua scelta ottiene Attaccabrighe durante il suo prossimo turno. (Non può andare all'avventura e deve sfidare, se possibile.)",
        },
      ],
    },
  },
  inkType: ["emerald"],
  franchise: "Zootropolis",
  set: "006",
  cardNumber: 90,
  rarity: "uncommon",
  cost: 3,
  strength: 2,
  willpower: 3,
  lore: 1,
  inkable: false,
  externalIds: {
    lorcast: "crd_94afdca365e64d8ba0d826076fc4448e",
    tcgPlayer: 591120,
  },
  text: [
    {
      title: "FEAR ALWAYS WORKS",
      description:
        "During your turn, whenever a card is put into your inkwell, chosen opposing character gains Reckless during their next turn. (They can't quest and must challenge if able.)",
    },
  ],
  classifications: ["Storyborn", "Villain"],
  abilities: [
    {
      effect: {
        keyword: "Reckless",
        target: "CHOSEN_CHARACTER",
        type: "gain-keyword",
      },
      id: "vwg-1",
      name: "FEAR ALWAYS WORKS",
      text: "FEAR ALWAYS WORKS During your turn, whenever a card is put into your inkwell, chosen opposing character gains Reckless during their next turn.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
