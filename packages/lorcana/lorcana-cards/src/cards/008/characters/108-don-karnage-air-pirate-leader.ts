import type { CharacterCard } from "@tcg/lorcana-types";

export const donKarnageAirPirateLeader: CharacterCard = {
  id: "lub",
  canonicalId: "ci_lub",
  reprints: ["set8-108"],
  cardType: "character",
  name: "Don Karnage",
  version: "Air Pirate Leader",
  i18n: {
    en: {
      name: "Don Karnage",
      version: "Air Pirate Leader",
      text: [
        {
          title: "Evasive",
        },
        {
          title: "SCORNFUL TAUNT",
          description:
            "Whenever you play an action that isn't a song, chosen opposing character gains Reckless during their next turn. (They can't quest and must challenge if able.)",
        },
      ],
    },
    de: {
      name: "Don Kanaille",
      version: "Anführer der Luftpiraten",
      text: "Wendig VERÄCHTLICHER SPOTT Jedes Mal, wenn du eine Aktion ausspielst, die kein Lied ist, erhält ein gegnerischer Charakter deiner Wahl in seinem nächsten Zug Impulsiv. (Der Charakter kann nicht erkunden und muss herausfordern, wenn möglich.)",
    },
    fr: {
      name: "Don Carnage",
      version: "Chef des pirates de l’air",
      text: "Insaisissable RAILLERIE MÉPRISANTE Chaque fois que vous jouez une action qui n'est pas une chanson, choisissez un personnage adverse qui gagne Combattant durant son prochain tour.",
    },
    it: {
      name: "Don Massacre",
      version: "Leader dei Pirati dell'Aria",
      text: "Sfuggente PROVOCAZIONE SPREZZANTE Ogni volta che giochi un'azione che non è una canzone, un personaggio avversario a tua scelta ottiene Attaccabrighe durante il suo prossimo turno. (Non può andare all'avventura e deve sfidare, se possibile.)",
    },
  },
  inkType: ["emerald", "steel"],
  franchise: "Talespin",
  set: "008",
  cardNumber: 108,
  rarity: "uncommon",
  cost: 3,
  strength: 3,
  willpower: 2,
  lore: 1,
  inkable: false,
  externalIds: {
    lorcast: "crd_618a43c6b78446dbb31c8637116fafb7",
    tcgPlayer: 631419,
  },
  text: [
    {
      title: "Evasive",
    },
    {
      title: "SCORNFUL TAUNT",
      description:
        "Whenever you play an action that isn't a song, chosen opposing character gains Reckless during their next turn. (They can't quest and must challenge if able.)",
    },
  ],
  classifications: ["Storyborn", "Villain", "Prince", "Pirate"],
  abilities: [
    {
      id: "3tm-1",
      keyword: "Evasive",
      text: "Evasive",
      type: "keyword",
    },
    {
      effect: {
        keyword: "Reckless",
        target: "CHOSEN_CHARACTER",
        type: "gain-keyword",
      },
      id: "3tm-2",
      name: "SCORNFUL TAUNT",
      text: "SCORNFUL TAUNT Whenever you play an action that isn’t a song, chosen opposing character gains Reckless during their next turn.",
      trigger: {
        event: "play",
        on: {
          cardType: "action",
          controller: "you",
        },
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
};
