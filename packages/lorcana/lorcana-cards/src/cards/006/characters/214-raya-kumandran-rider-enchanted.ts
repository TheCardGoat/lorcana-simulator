import type { CharacterCard } from "@tcg/lorcana-types";

export const rayaKumandranRiderEnchanted: CharacterCard = {
  id: "pyb",
  canonicalId: "ci_aR1",
  reprints: ["set6-107"],
  cardType: "character",
  name: "Raya",
  version: "Kumandran Rider",
  i18n: {
    en: {
      name: "Raya",
      version: "Kumandran Rider",
      text: [
        {
          title: "COME ON, LET'S DO THIS",
          description:
            "Once during your turn, whenever a card is put into your inkwell, you may ready another chosen character of yours. They can't quest for the rest of this turn.",
        },
      ],
    },
    de: {
      name: "Raya",
      version: "Reiterin aus Kumandra",
      text: [
        {
          title: "AUF GEHT'S, WIR SCHAFFEN DAS",
          description:
            "Einmal während deines Zuges, wenn eine Karte in deinen Tintenvorrat gelegt wird, darfst du einen deiner anderen Charaktere wählen und bereit machen. Er kann in diesem Zug nicht mehr erkunden.",
        },
      ],
    },
    fr: {
      name: "Raya",
      version: "Chevaucheuse de Kumandra",
      text: [
        {
          title: "ALLEZ, C'EST PARTI",
          description:
            "Une fois durant votre tour, lorsqu'une carte est placée dans votre réserve d'encre, vous pouvez choisir un autre de vos personnages et le redresser. Ce personnage ne peut pas être envoyé à l'aventure pour le reste de ce tour.",
        },
      ],
    },
    it: {
      name: "Raya",
      version: "Cavallerizza di Kumandra",
      text: [
        {
          title: "ANDIAMO, FACCIAMOLO",
          description:
            "Una volta durante il tuo turno, ogni volta che una carta viene aggiunta al tuo calamaio, puoi preparare un tuo altro personaggio a tua scelta. Non può andare all'avventura per il resto di questo turno.",
        },
      ],
    },
  },
  inkType: ["ruby"],
  franchise: "Raya and the Last Dragon",
  set: "006",
  cardNumber: 214,
  rarity: "enchanted",
  specialRarity: "enchanted",
  cost: 4,
  strength: 3,
  willpower: 3,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_b1ea1c67fc224e968a4906149590585c",
    tcgPlayer: 592036,
  },
  text: [
    {
      title: "COME ON, LET'S DO THIS",
      description:
        "Once during your turn, whenever a card is put into your inkwell, you may ready another chosen character of yours. They can't quest for the rest of this turn.",
    },
  ],
  classifications: ["Storyborn", "Hero", "Princess"],
  abilities: [
    {
      effect: {
        chooser: "CONTROLLER",
        effect: {
          duration: "this-turn",
          restriction: "cant-quest",
          target: "SELF",
          type: "restriction",
        },
        type: "optional",
      },
      id: "1dx-1",
      text: "COME ON, LET'S DO THIS Once during your turn, whenever a card is put into your inkwell, you may ready another chosen character of yours. They can't quest for the rest of this turn.",
      type: "action",
    },
  ],
};
