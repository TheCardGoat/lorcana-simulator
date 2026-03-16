import type { CharacterCard } from "@tcg/lorcana-types";

export const scroogeMcduckReformedEbenezer: CharacterCard = {
  id: "ySs",
  canonicalId: "ci_aqI",
  reprints: ["set11-152"],
  cardType: "character",
  name: "Scrooge McDuck",
  version: "Reformed Ebenezer",
  i18n: {
    en: {
      name: "Scrooge McDuck",
      version: "Reformed Ebenezer",
      text: [
        {
          title: "Shift 4 {I}",
        },
        {
          title: "SPREADING JOY",
          description:
            "When you play this character, you may put a card from the top of your deck facedown under each of your other characters. If you do, those characters gain Ward until the start of your next turn.",
        },
      ],
    },
    de: {
      name: "Dagobert Duck",
      version: "Reformierter Ebenezer",
      text: "Gestaltwandel 4 FREUDE VERBREITEN Wenn du diesen Charakter ausspielst, darfst du jeweils für jeden deiner anderen Charaktere die oberste Karte deines Decks verdeckt unter jenen Charakter legen. Wenn du dies tust, erhalten jene Charaktere bis zu Beginn deines nächsten Zuges Behütet.",
    },
    fr: {
      name: "Balthazar Picsou",
      version: "Ebenezer repenti",
      text: "Alter 4 RÉPAND LA JOIE Lorsque vous jouez ce personnage, vous pouvez placer une carte du dessus de votre pioche, face cachée, sous chacun de vos autres personnages. Si vous le faites, ces personnages gagnent Hors d'atteinte jusqu'au début de votre prochain tour.",
    },
    it: {
      name: "Paperon de' Paperoni",
      version: "Ebenezer Redento",
      text: "Trasformazione 4 DISTRIBUIRE GIOIA Quando giochi questo personaggio, puoi mettere una carta dalla cima del tuo mazzo a faccia in giù sotto a ogni tuo altro personaggio. Se lo fai, quei personaggi ottengono Protetto fino all'inizio del tuo prossimo turno.",
    },
  },
  inkType: ["sapphire"],
  franchise: "Mickey's Christmas Carol",
  set: "011",
  cardNumber: 152,
  rarity: "legendary",
  cost: 6,
  strength: 4,
  willpower: 6,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_b30562a95420404b911886bcfc9e7a9c",
    tcgPlayer: 677166,
  },
  text: [
    {
      title: "Shift 4 {I}",
    },
    {
      title: "SPREADING JOY",
      description:
        "When you play this character, you may put a card from the top of your deck facedown under each of your other characters. If you do, those characters gain Ward until the start of your next turn.",
    },
  ],
  classifications: ["Floodborn", "Hero"],
  abilities: [
    {
      id: "1yi-1",
      cost: {
        ink: 4,
      },
      keyword: "Shift",
      type: "keyword",
      text: "Shift 4 {I}",
    },
    {
      id: "1yi-2",
      effect: {
        keyword: "Ward",
        target: "YOUR_CHARACTERS",
        type: "gain-keyword",
      },
      name: "SPREADING JOY",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
      text: "SPREADING JOY When you play this character, you may put a card from the top of your deck facedown under each of your other characters. If you do, those characters gain Ward until the start of your next turn.",
    },
  ],
};
