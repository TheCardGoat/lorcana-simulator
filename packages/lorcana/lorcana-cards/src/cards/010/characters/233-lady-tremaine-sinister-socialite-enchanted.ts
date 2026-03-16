import type { CharacterCard } from "@tcg/lorcana-types";

export const ladyTremaineSinisterSocialiteEnchanted: CharacterCard = {
  id: "IiM",
  canonicalId: "ci_F4M",
  reprints: ["set10-124"],
  cardType: "character",
  name: "Lady Tremaine",
  version: "Sinister Socialite",
  i18n: {
    en: {
      name: "Lady Tremaine",
      version: "Sinister Socialite",
      text: [
        {
          title: "Boost 2 {I}",
        },
        {
          title: "EXPEDIENT SCHEMES",
          description:
            "Whenever this character quests, if you've put a card under her this turn, you may play an action with cost 5 or less from your discard for free, then put that action card on the bottom of your deck instead of into your discard.",
        },
      ],
    },
    de: {
      name: "Gräfin Tremaine",
      version: "Unheilbringende Prominenz",
      text: "Stärken 2 ZWECKMÄSSIGE INTRIGEN Jedes Mal, wenn dieser Charakter erkundet, falls du in diesem Zug mindestens eine Karte unter diesen Charakter gelegt hast, darfst du eine Aktionskarte von deinem Ablagestapel, die 5 oder weniger kostet, kostenlos ausspielen. Lege sie danach unter dein Deck.",
    },
    fr: {
      name: "Madame de Trémaine",
      version: "Mondaine sinistre",
      text: "Boost 2 PLANS OPPORTUNISTES Chaque fois que ce personnage est envoyé à l'aventure, si vous avez placé une carte sous lui ce tour-ci, vous pouvez jouer gratuitement une action coûtant 5 ou moins de votre défausse. Placez-la ensuite sous votre pioche.",
    },
    it: {
      name: "La Matrigna",
      version: "Nobildonna Sinistra",
      text: "Potenziamento 2 COMPLOTTI VANTAGGIOSI Ogni volta che questo personaggio va all'avventura, se hai messo una carta sotto di esso in questo turno, puoi giocare un'azione con costo 5 o inferiore dai tuoi scarti gratis, poi metti quella carta azione in fondo al tuo mazzo invece che nei tuoi scarti.",
    },
  },
  inkType: ["ruby"],
  franchise: "Cinderella",
  set: "010",
  cardNumber: 233,
  rarity: "enchanted",
  specialRarity: "enchanted",
  cost: 5,
  strength: 5,
  willpower: 4,
  lore: 2,
  inkable: false,
  externalIds: {
    lorcast: "crd_ee5abfdfaa9d469e93dd20e1253ed1d0",
    tcgPlayer: 660042,
  },
  text: [
    {
      title: "Boost 2 {I}",
    },
    {
      title: "EXPEDIENT SCHEMES",
      description:
        "Whenever this character quests, if you've put a card under her this turn, you may play an action with cost 5 or less from your discard for free, then put that action card on the bottom of your deck instead of into your discard.",
    },
  ],
  classifications: ["Storyborn", "Villain", "Whisper"],
  abilities: [
    {
      id: "a1d-1",
      keyword: "Boost",
      text: "Boost 2 {I}",
      type: "keyword",
      value: 2,
    },
    {
      effect: {
        condition: {
          expression: "you've put a card under her this turn",
          type: "if",
        },
        then: {
          target: {
            selector: "chosen",
            count: 1,
            owner: "any",
            zones: ["play"],
            cardTypes: ["card"],
          },
          type: "put-on-bottom",
        },
        type: "conditional",
      },
      id: "a1d-2",
      name: "EXPEDIENT SCHEMES",
      text: "EXPEDIENT SCHEMES Whenever this character quests, if you've put a card under her this turn, you may play an action with cost 5 or less from your discard for free, then put that action card on the bottom of your deck instead of into your discard.",
      trigger: {
        event: "quest",
        on: "SELF",
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
};
