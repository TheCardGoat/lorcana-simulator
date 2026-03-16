import type { CharacterCard } from "@tcg/lorcana-types";

export const basilDisguisedDetectiveEnchanted: CharacterCard = {
  id: "ksD",
  canonicalId: "ci_h57",
  reprints: ["set6-091"],
  cardType: "character",
  name: "Basil",
  version: "Disguised Detective",
  i18n: {
    en: {
      name: "Basil",
      version: "Disguised Detective",
      text: [
        {
          title: "Shift 4",
        },
        {
          title: "TWISTS AND TURNS",
          description:
            "During your turn, whenever a card is put into your inkwell, you may pay 1 {I} to have chosen opponent choose and discard a card.",
        },
      ],
    },
    de: {
      name: "Basil",
      version: "Verkleideter Detektiv",
      text: "Gestaltwandel 4 SCHLINGEN UND HAKEN Jedes Mal während deines Zuges, wenn eine Karte in deinen Tintenvorrat gelegt wird, darfst du 1 bezahlen, um eine gegnerische mitspielende Person deiner Wahl 1 Karte aus ihrer Hand auswählen und abwerfen zu lassen.",
    },
    fr: {
      name: "Basil",
      version: "Détective déguisé",
      text: "Alter 4 TOURS ET DÉTOURS Durant votre tour, chaque fois qu'une carte est placée dans votre réserve d'encre, vous pouvez payer 1. Si vous le faites, choisissez un adversaire qui défausse une carte.",
    },
    it: {
      name: "Basil",
      version: "Detective Camuffato",
      text: "Trasformazione 4 RISVOLTI E SVILUPPI Durante il tuo turno, ogni volta che una carta viene aggiunta al tuo calamaio, puoi pagare 1 per far scegliere e scartare una carta a un avversario a tua scelta.",
    },
  },
  inkType: ["emerald"],
  franchise: "Great Mouse Detective",
  set: "006",
  cardNumber: 212,
  rarity: "enchanted",
  specialRarity: "enchanted",
  cost: 6,
  strength: 4,
  willpower: 5,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_03fecbc6607a4948a586ccf4f0915c79",
    tcgPlayer: 591994,
  },
  text: [
    {
      title: "Shift 4",
    },
    {
      title: "TWISTS AND TURNS",
      description:
        "During your turn, whenever a card is put into your inkwell, you may pay 1 {I} to have chosen opponent choose and discard a card.",
    },
  ],
  classifications: ["Floodborn", "Hero", "Detective"],
  abilities: [
    {
      cost: {
        ink: 4,
      },
      id: "fop-1",
      keyword: "Shift",
      text: "Shift 4",
      type: "keyword",
    },
    {
      effect: {
        chooser: "CONTROLLER",
        effect: {
          amount: 1,
          chosen: true,
          target: "CONTROLLER",
          type: "discard",
        },
        type: "optional",
      },
      id: "fop-2",
      name: "TWISTS AND TURNS",
      text: "TWISTS AND TURNS During your turn, whenever a card is put into your inkwell, you may pay 1 {I} to have chosen opponent choose and discard a card.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
