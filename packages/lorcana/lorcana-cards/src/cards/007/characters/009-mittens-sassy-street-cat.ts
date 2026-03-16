import type { CharacterCard } from "@tcg/lorcana-types";

export const mittensSassyStreetCat: CharacterCard = {
  id: "msV",
  canonicalId: "ci_msV",
  reprints: ["set7-009"],
  cardType: "character",
  name: "Mittens",
  version: "Sassy Street Cat",
  i18n: {
    en: {
      name: "Mittens",
      version: "Sassy Street Cat",
      text: [
        {
          title: "Bodyguard",
        },
        {
          title: "NO THANKS NECESSARY",
          description:
            "Once during your turn, whenever a card is put into your inkwell, your other characters with Bodyguard get +1 {L} this turn.",
        },
      ],
    },
    de: {
      name: "Mittens",
      version: "Freche Straßenkatze",
      text: "Beschützen (Du darfst diesen Charakter erschöpft ausspielen. Gegnerische Charaktere müssen beim Herausfordern deiner Charaktere zuerst deine Charaktere mit Beschützen wählen, wenn möglich.) NICHTS ZU DANKEN Einmal während deines Zuges, wenn eine Karte in deinen Tintenvorrat gelegt wird, erhalten deine anderen Charaktere mit Beschützen in diesem Zug +1.",
    },
    fr: {
      name: "Mitaine",
      version: "Chatte de gouttière insolente",
      text: [
        {
          title: "Rempart",
          description:
            "(Ce personnage peut entrer en jeu épuisé. Lorsqu'il défie l'un de vos personnages, un personnage adverse doit, s'il le peut, choisir l'un de vos personnages avec Rempart.) NE ME REMERCIE PAS Une seule fois durant votre tour, lorsqu'une carte est placée dans votre réserve d'encre, vos autres personnages avec Rempart gagnent +1 pour le reste de ce tour.",
        },
      ],
    },
    it: {
      name: "Mittens",
      version: "Insolente Gatta di Strada",
      text: "Guardiano NON SERVE RINGRAZIARE Una volta durante il tuo turno, ogni volta che una carta viene aggiunta al tuo calamaio, i tuoi altri personaggi con Guardiano ricevono +1 per questo turno.",
    },
  },
  inkType: ["amber"],
  franchise: "Bolt",
  set: "007",
  cardNumber: 9,
  rarity: "rare",
  cost: 5,
  strength: 4,
  willpower: 5,
  lore: 2,
  inkable: false,
  externalIds: {
    lorcast: "crd_9b5d0e7c5c15447d9f17ea4419b07e3f",
    tcgPlayer: 618159,
  },
  text: [
    {
      title: "Bodyguard",
    },
    {
      title: "NO THANKS NECESSARY",
      description:
        "Once during your turn, whenever a card is put into your inkwell, your other characters with Bodyguard get +1 {L} this turn.",
    },
  ],
  classifications: ["Storyborn", "Ally"],
  abilities: [
    {
      id: "et6-1",
      keyword: "Bodyguard",
      text: "Bodyguard",
      type: "keyword",
    },
    {
      effect: {
        duration: "this-turn",
        modifier: 1,
        stat: "lore",
        target: "YOUR_CHARACTERS",
        type: "modify-stat",
      },
      id: "et6-2",
      name: "NO THANKS NECESSARY Once",
      text: "NO THANKS NECESSARY Once during your turn, whenever a card is put into your inkwell, your other characters with Bodyguard get +1 {L} this turn.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
