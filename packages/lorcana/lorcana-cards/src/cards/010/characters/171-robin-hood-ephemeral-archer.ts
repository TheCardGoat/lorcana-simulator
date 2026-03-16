import type { CharacterCard } from "@tcg/lorcana-types";

export const robinHoodEphemeralArcher: CharacterCard = {
  id: "6Ji",
  canonicalId: "ci_ZXj",
  reprints: ["set10-171"],
  cardType: "character",
  name: "Robin Hood",
  version: "Ephemeral Archer",
  i18n: {
    en: {
      name: "Robin Hood",
      version: "Ephemeral Archer",
      text: [
        {
          title: "Boost 1 {I}",
        },
        {
          title: "EXPERT SHOT",
          description:
            "Whenever this character quests, if there's a card under him, deal 1 damage to up to 2 chosen characters.",
        },
      ],
    },
    de: {
      name: "Robin Hood",
      version: "Flüchtiger Bogenschütze",
      text: "Stärken 1 MEISTERHAFTER SCHUSS Jedes Mal, wenn dieser Charakter erkundet, falls er mindestens eine Karte unter sich hat, wähle bis zu 2 Charaktere und füge ihnen je 1 Schaden zu.",
    },
    fr: {
      name: "Robin des Bois",
      version: "Archer éphémère",
      text: "Boost 1 TIREUR EXPERT Chaque fois que ce personnage est envoyé à l'aventure, s'il y a une carte sous lui, choisissez jusqu'à 2 personnages et infligez 1 dommage à chacun.",
    },
    it: {
      name: "Robin Hood",
      version: "Arciere Effimero",
      text: [
        {
          title: "Potenziamento 1",
          description:
            "(Una volta durante il tuo turno, puoi pagare 1 per mettere la prima carta del tuo mazzo a faccia in giù sotto a questo personaggio.) TIRO ESPERTO Ogni volta che questo personaggio va all'avventura, se c'è una carta sotto di esso, infliggi 1 danno a fino a 2 personaggi a tua scelta.",
        },
      ],
    },
  },
  inkType: ["steel"],
  franchise: "Robin Hood",
  set: "010",
  cardNumber: 171,
  rarity: "rare",
  cost: 4,
  strength: 2,
  willpower: 4,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_9a7e83a63b8444438f4bc7714df6faf9",
    tcgPlayer: 660272,
  },
  text: [
    {
      title: "Boost 1 {I}",
    },
    {
      title: "EXPERT SHOT",
      description:
        "Whenever this character quests, if there's a card under him, deal 1 damage to up to 2 chosen characters.",
    },
  ],
  classifications: ["Storyborn", "Hero", "Whisper"],
  abilities: [
    {
      id: "1pw-1",
      keyword: "Boost",
      text: "Boost 1 {I}",
      type: "keyword",
      value: 1,
    },
    {
      effect: {
        condition: {
          expression: "there's a card under him",
          type: "if",
        },
        then: {
          amount: 1,
          target: {
            selector: "chosen",
            count: 1,
            owner: "any",
            zones: ["play"],
            cardTypes: ["character"],
          },
          type: "deal-damage",
        },
        type: "conditional",
      },
      id: "1pw-2",
      name: "EXPERT SHOT",
      text: "EXPERT SHOT Whenever this character quests, if there's a card under him, deal 1 damage to up to 2 chosen characters.",
      trigger: {
        event: "quest",
        on: "SELF",
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
};
