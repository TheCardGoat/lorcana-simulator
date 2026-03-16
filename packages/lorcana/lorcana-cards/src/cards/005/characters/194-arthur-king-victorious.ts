import type { CharacterCard } from "@tcg/lorcana-types";

export const arthurKingVictorious: CharacterCard = {
  id: "xkQ",
  canonicalId: "ci_KRT",
  reprints: ["set5-194"],
  cardType: "character",
  name: "Arthur",
  version: "King Victorious",
  i18n: {
    en: {
      name: "Arthur",
      version: "King Victorious",
      text: [
        {
          title: "Shift 5",
        },
        {
          title: "KNIGHTED BY THE KING",
          description:
            "When you play this character, chosen character gains Challenger +2 and Resist +2 and can challenge ready characters this turn. (They get +2 {S} while challenging. Damage dealt to them is reduced by 2.)",
        },
      ],
    },
    de: {
      name: "Arthur",
      version: "Siegreicher König",
      text: "Gestaltwandel 5 VOM KÖNIG ZUM RITTER GESCHLAGEN Wenn du diesen Charakter ausspielst, erhält ein Charakter deiner Wahl in diesem Zug Herausfordern +2, Robust +2 und kann in diesem Zug bereite Charaktere herausfordern. (Während der Charakter herausfordert, erhält er +2. Reduziere jeglichen Schaden, der ihm zugefügt wird, um 2.)",
    },
    fr: {
      name: "Arthur",
      version: "Roi victorieux",
      text: "Alter 5 ADOUBÉ PAR LE ROI Lorsque vous jouez ce personnage, choisissez un personnage qui gagne, pour le reste de ce tour, Offensif +2, Résistance +2, et peut défier les personnages redressés. (Les dommages qui lui sont infligés sont réduits de 2 et lorsqu'il défie, ce personnage gagne +2.)",
    },
    it: {
      name: "Artù",
      version: "Re Vittorioso",
      text: "Trasformazione 5 NOMINATO CAVALIERE DAL RE Quando giochi questo personaggio, un personaggio a tua scelta ottiene Sfidante +2 e Resistere +2 e può sfidare i personaggi preparati per questo turno. (Riceve +2 mentre sta sfidando. Il danno che gli viene inflitto è ridotto di 2.)",
    },
  },
  inkType: ["steel"],
  franchise: "Sword in the Stone",
  set: "005",
  cardNumber: 194,
  rarity: "legendary",
  cost: 7,
  strength: 3,
  willpower: 6,
  lore: 3,
  inkable: false,
  externalIds: {
    lorcast: "crd_ad336bbf94b74813aa25312a57af4525",
    tcgPlayer: 561981,
  },
  text: [
    {
      title: "Shift 5",
    },
    {
      title: "KNIGHTED BY THE KING",
      description:
        "When you play this character, chosen character gains Challenger +2 and Resist +2 and can challenge ready characters this turn. (They get +2 {S} while challenging. Damage dealt to them is reduced by 2.)",
    },
  ],
  classifications: ["Floodborn", "Hero", "King"],
  abilities: [
    {
      cost: {
        ink: 5,
      },
      id: "d3q-1",
      keyword: "Shift",
      text: "Shift 5",
      type: "keyword",
    },
    {
      effect: {
        duration: "this-turn",
        keyword: "Challenger",
        target: {
          cardTypes: ["character"],
          count: 1,
          owner: "any",
          selector: "chosen",
          zones: ["play"],
        },
        type: "gain-keyword",
        value: 2,
      },
      id: "d3q-2",
      name: "KNIGHTED BY THE KING",
      text: "KNIGHTED BY THE KING When you play this character, chosen character gains Challenger +2 and Resist +2 and can challenge ready characters this turn.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
