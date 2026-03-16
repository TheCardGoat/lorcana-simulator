import type { CharacterCard } from "@tcg/lorcana-types";

export const taffytaMuttonfudgeSourSpeedster: CharacterCard = {
  id: "5D9",
  canonicalId: "ci_5D9",
  reprints: ["set5-117"],
  cardType: "character",
  name: "Taffyta Muttonfudge",
  version: "Sour Speedster",
  i18n: {
    en: {
      name: "Taffyta Muttonfudge",
      version: "Sour Speedster",
      text: [
        {
          title: "Shift 2",
        },
        {
          title: "NEW ROSTER",
          description: "Once per turn, when this character moves to a location, gain 2 lore.",
        },
      ],
    },
    de: {
      name: "Taffyta Muttonfudge",
      version: "Saure Raserin",
      text: "Gestaltwandel 2 NEUE STARTFORMATION Einmal pro Zug, wenn dieser Charakter zu einem Ort bewegt wird, sammelst du 2 Legenden.",
    },
    fr: {
      name: "Taffyta Crème Brûlée",
      version: "Coureuse acide",
      text: "Alter 2 REMETTRE LES COMPTEURS À ZÉRO Une fois par tour, lorsque ce personnage est déplacé sur un lieu, gagnez 2 éclats de Lore.",
    },
    it: {
      name: "Taffyta Muttonfudge",
      version: "Aspra Velocista",
      text: "Trasformazione 2 NUOVI CONCORRENTI Una volta per turno, quando questo personaggio si sposta in un luogo, ottieni 2 leggenda.",
    },
  },
  inkType: ["ruby"],
  franchise: "Wreck It Ralph",
  set: "005",
  cardNumber: 117,
  rarity: "uncommon",
  cost: 4,
  strength: 3,
  willpower: 3,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_b486db00d41f4888984650e72cc36b00",
    tcgPlayer: 555270,
  },
  text: [
    {
      title: "Shift 2",
    },
    {
      title: "NEW ROSTER",
      description: "Once per turn, when this character moves to a location, gain 2 lore.",
    },
  ],
  classifications: ["Floodborn", "Ally", "Racer"],
  abilities: [
    {
      cost: {
        ink: 2,
      },
      id: "1a5-1",
      keyword: "Shift",
      text: "Shift 2",
      type: "keyword",
    },
    {
      effect: {
        amount: 2,
        type: "gain-lore",
      },
      id: "1a5-2",
      name: "NEW ROSTER",
      text: "NEW ROSTER Once per turn, when this character moves to a location, gain 2 lore.",
      trigger: {
        event: "move",
        on: "SELF",
        restrictions: [
          {
            type: "once-per-turn",
          },
        ],
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
