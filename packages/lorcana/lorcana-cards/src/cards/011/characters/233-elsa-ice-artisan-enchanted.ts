import type { CharacterCard } from "@tcg/lorcana-types";

export const elsaIceArtisanEnchanted: CharacterCard = {
  id: "t58",
  canonicalId: "ci_8cv",
  reprints: ["set11-123"],
  cardType: "character",
  name: "Elsa",
  version: "Ice Artisan",
  i18n: {
    en: {
      name: "Elsa",
      version: "Ice Artisan",
      text: [
        {
          title: "Shift 4 {I}",
        },
        {
          title: "ENDLESS WINTER",
          description:
            "When you play this character and whenever you play a location, you may exert chosen character with 3 {S} or less.",
        },
        {
          title: "DISTANT CALL",
          description: "While this character is at a location, she gets +3 {L}.",
        },
      ],
    },
    de: {
      name: "Elsa",
      version: "Eiskünstlerin",
      text: "Gestaltwandel 4 ENDLOSER WINTER Wenn du diesen Charakter ausspielst und jedes Mal, wenn du einen Ort ausspielst, darfst du einen Charakter deiner Wahl mit 3 oder weniger erschöpfen. RUF AUS DER FERNE Solange dieser Charakter an einem Ort ist, erhält er +3.",
    },
    fr: {
      name: "Elsa",
      version: "Artisane de la glace",
      text: "Alter 4 HIVER SANS FIN Lorsque vous jouez ce personnage et chaque fois que vous jouez un lieu, vous pouvez choisir un personnage ayant 3 ou moins et l'épuiser. APPEL LOINTAIN Tant que ce personnage est sur un lieu, il gagne +3.",
    },
    it: {
      name: "Elsa",
      version: "Artigiana del Ghiaccio",
      text: "Trasformazione 4 INVERNO SENZA FINE Quando giochi questo personaggio e ogni volta che giochi un luogo, puoi impegnare un personaggio a tua scelta con 3 o inferiore. RICHIAMO LONTANO Mentre questo personaggio si trova in un luogo, riceve +3.",
    },
  },
  inkType: ["ruby"],
  franchise: "Frozen",
  set: "011",
  cardNumber: 233,
  rarity: "enchanted",
  specialRarity: "enchanted",
  cost: 6,
  strength: 5,
  willpower: 5,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_b35b509f95d441c1bd11ec67d755db5d",
    tcgPlayer: 675515,
  },
  text: [
    {
      title: "Shift 4 {I}",
    },
    {
      title: "ENDLESS WINTER",
      description:
        "When you play this character and whenever you play a location, you may exert chosen character with 3 {S} or less.",
    },
    {
      title: "DISTANT CALL",
      description: "While this character is at a location, she gets +3 {L}.",
    },
  ],
  classifications: ["Floodborn", "Hero", "Queen", "Sorcerer"],
  abilities: [
    {
      id: "vt4-1",
      cost: {
        ink: 4,
      },
      keyword: "Shift",
      type: "keyword",
      text: "Shift 4 {I}",
    },
    {
      id: "vt4-2",
      effect: {
        chooser: "CONTROLLER",
        effect: {
          target: {
            cardTypes: ["character"],
            count: 1,
            owner: "any",
            selector: "chosen",
            zones: ["play"],
          },
          type: "exert",
        },
        type: "optional",
      },
      name: "ENDLESS WINTER When you play this character and",
      trigger: {
        event: "play",
        on: {
          cardType: "location",
          controller: "you",
        },
        timing: "whenever",
      },
      type: "triggered",
      text: "ENDLESS WINTER When you play this character and whenever you play a location, you may exert chosen character with 3 {S} or less.",
    },
    {
      id: "vt4-3",
      effect: {
        modifier: 3,
        stat: "lore",
        target: "SELF",
        type: "modify-stat",
      },
      type: "static",
      text: "DISTANT CALL While this character is at a location, she gets +3 {L}.",
    },
  ],
};
