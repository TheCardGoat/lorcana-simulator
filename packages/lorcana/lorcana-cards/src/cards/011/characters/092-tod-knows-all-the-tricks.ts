import type { CharacterCard } from "@tcg/lorcana-types";

export const todKnowsAllTheTricks: CharacterCard = {
  id: "WP5",
  canonicalId: "ci_0ez",
  reprints: ["set11-092"],
  cardType: "character",
  name: "Tod",
  version: "Knows All the Tricks",
  i18n: {
    en: {
      name: "Tod",
      version: "Knows All the Tricks",
      text: [
        {
          title: "Shift 5 {I}",
        },
        {
          title: "Evasive",
        },
        {
          title: "IMPRESSIVE LEAPS",
          description:
            "Twice during your turn, whenever this character is chosen for an action or an item's ability, you may ready him.",
        },
      ],
    },
    de: {
      name: "Cap",
      version: "Kennt alle Tricks",
      text: "Gestaltwandel 5 Wendig BEEINDRUCKENDE SPRÜNGE Zweimal während deines Zuges, wenn dieser Charakter von einer Aktion oder einem Gegenstand ausgewählt wird, darfst du ihn bereit machen.",
    },
    fr: {
      name: "Rox",
      version: "A des trucs à lui",
      text: "Alter 5 Insaisissable SAUTS IMPRESSIONNANTS Deux fois durant votre tour, lorsque ce personnage est choisi avec une action ou la capacité d'un objet, vous pouvez le redresser.",
    },
    it: {
      name: "Red",
      version: "Conosce Tutti i Trucchi",
      text: "Trasformazione 5, Sfuggente SALTI ECCEZIONALI Due volte durante il tuo turno, ogni volta che questo personaggio viene scelto per un'azione o per l'abilità di un oggetto, puoi prepararlo.",
    },
  },
  inkType: ["emerald"],
  franchise: "Fox and the Hound",
  set: "011",
  cardNumber: 92,
  rarity: "legendary",
  cost: 7,
  strength: 6,
  willpower: 6,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_2319774247e242a19dfa6a0fe584fff0",
    tcgPlayer: 677163,
  },
  text: [
    {
      title: "Shift 5 {I}",
    },
    {
      title: "Evasive",
    },
    {
      title: "IMPRESSIVE LEAPS",
      description:
        "Twice during your turn, whenever this character is chosen for an action or an item's ability, you may ready him.",
    },
  ],
  classifications: ["Floodborn", "Hero"],
  abilities: [
    {
      id: "15s-1",
      cost: {
        ink: 5,
      },
      keyword: "Shift",
      type: "keyword",
      text: "Shift 5 {I}",
    },
    {
      id: "15s-2",
      keyword: "Evasive",
      type: "keyword",
      text: "Evasive",
    },
    {
      id: "15s-3",
      effect: {
        chooser: "CONTROLLER",
        effect: {
          target: "CHOSEN_CHARACTER",
          type: "ready",
        },
        type: "optional",
      },
      name: "IMPRESSIVE LEAPS Twice",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
      text: "IMPRESSIVE LEAPS Twice during your turn, whenever this character is chosen for an action or an item’s ability, you may ready him.",
    },
  ],
};
