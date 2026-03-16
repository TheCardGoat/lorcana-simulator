import type { CharacterCard } from "@tcg/lorcana-types";

import {
  type BanishEffect,
  type LorcanaCard,
  type ModifyStatEffect,
  type TriggeredAbility,
  type ActivatedAbility,
  type PutUnderEffect,
  type StaticAbility,
  type KeywordAbility,
} from "@tcg/lorcana-types";

const whosComing: TriggeredAbility = {
  type: "triggered",
  trigger: {
    event: "banish",
    on: "SELF",
    timing: "when",
  },
  effect: {
    type: "banish",
    target: {
      selector: "all",
      count: "all",
      cardTypes: ["character"],
      zones: ["play"],
      excludeSelf: true,
      filter: [
        {
          type: "strength-comparison",
          comparison: "less-or-equal",
          value: "source",
        },
      ],
    },
  } as BanishEffect,
};

const poweredUp: StaticAbility = {
  type: "static",
  effect: {
    type: "modify-stat",
    stat: "strength",
    target: "SELF",
    modifier: {
      type: "cards-under-self",
    },
  } as ModifyStatEffect,
};

const activatedAbility: ActivatedAbility = {
  type: "activated",
  cost: {
    ink: 1,
  },
  effect: {
    type: "put-under",
    under: "self",
    source: "top-of-deck",
  } as PutUnderEffect,
  restrictions: [{ type: "once-per-turn" }],
};

const boost: KeywordAbility = {
  type: "keyword",
  keyword: "Boost",
  value: 1,
};

export const wreckitRalphRagingWrecker: CharacterCard = {
  id: "C0z",
  canonicalId: "ci_C0z",
  reprints: ["set11-103"],
  cardType: "character",
  name: "Wreck-it Ralph",
  version: "Raging Wrecker",
  i18n: {
    en: {
      name: "Wreck-it Ralph",
      version: "Raging Wrecker",
      text: [
        {
          title: "Boost 1 {I}",
        },
        {
          title: "POWERED UP",
          description: "This character gets +1 {S} for each card under him.",
        },
        {
          title: "WHO'S COMIN' WITH ME?",
          description:
            "When this character is banished, banish all characters with {S} equal to or less than the {S} he had in play.",
        },
      ],
    },
    de: {
      name: "Randale Ralph",
      version: "Rasender Zerstörer",
      text: [
        {
          title: "Stärken 1",
        },
        {
          title: "ANGESTACHELT",
          description: "Dieser Charakter erhält für jede Karte unter ihm +1.",
        },
        {
          title: "WER KOMMT MIT MIR?",
          description:
            "Wenn dieser Charakter verbannt wird, verbanne alle Charaktere mit genauso viel oder weniger, wie dieser Charakter im Spiel hatte.",
        },
      ],
    },
    fr: {
      name: "Ralph la Casse",
      version: "Démolisseur déchaîné",
      text: "Boost 1 POWER UP Ce personnage gagne +1 pour chaque carte sous lui. QUI VIENT AVEC MOI? Lorsque ce personnage est banni, bannissez tous les personnages ayant une inférieure ou égale à la qu'il avait en jeu.",
    },
    it: {
      name: "Ralph Spaccatutto",
      version: "Spaccatore Impetuoso",
      text: [
        {
          title: "Potenziamento 1",
          description:
            "(Una volta durante il tuo turno, puoi pagare 1 per mettere la prima carta del tuo mazzo a faccia in giù sotto a questo personaggio.)",
        },
        {
          title: "CARICATO",
          description: "Questo personaggio riceve +1 per ogni carta sotto di sé.",
        },
        {
          title: "CHI VIENE CON ME?",
          description:
            "Quando questo personaggio viene esiliato, esilia tutti i personaggi con uguale o inferiore alla che aveva in gioco.",
        },
      ],
    },
  },
  inkType: ["ruby"],
  franchise: "Wreck It Ralph",
  set: "011",
  cardNumber: 103,
  rarity: "legendary",
  cost: 7,
  strength: 3,
  willpower: 4,
  lore: 3,
  inkable: false,
  externalIds: {
    lorcast: "crd_cb5f4cea3a664d12952b12a0a30fbbf3",
    tcgPlayer: 675344,
  },
  text: [
    {
      title: "Boost 1 {I}",
    },
    {
      title: "POWERED UP",
      description: "This character gets +1 {S} for each card under him.",
    },
    {
      title: "WHO'S COMIN' WITH ME?",
      description:
        "When this character is banished, banish all characters with {S} equal to or less than the {S} he had in play.",
    },
  ],
  classifications: ["Storyborn", "Hero", "Whisper"],
  abilities: [whosComing, poweredUp, activatedAbility, boost],
};
