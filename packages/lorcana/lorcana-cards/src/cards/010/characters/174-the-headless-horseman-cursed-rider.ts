import type { CharacterCard } from "@tcg/lorcana-types";

export const theHeadlessHorsemanCursedRider: CharacterCard = {
  id: "OVf",
  canonicalId: "ci_OVf",
  reprints: ["set10-174"],
  cardType: "character",
  name: "The Headless Horseman",
  version: "Cursed Rider",
  i18n: {
    en: {
      name: "The Headless Horseman",
      version: "Cursed Rider",
      text: [
        {
          title: "Shift 5 {I}",
        },
        {
          title: "WITCHING HOUR",
          description:
            "When you play this character, each player draws 3 cards, then discards 3 cards at random. Choose an opposing character and deal 2 damage to them for each action card discarded this way.",
        },
      ],
    },
    de: {
      name: "Der kopflose Reiter",
      version: "Verfluchter Reiter",
      text: "Gestaltwandel 5 GEISTERSTUNDE Wenn du diesen Charakter ausspielst, ziehen alle Mitspielenden (auch du) je 3 Karten und werfen dann 3 zufällig ausgewählte Karten von ihrer Hand ab. Wähle danach einen gegnerischen Charakter und füge diesem für jede auf diese Weise abgeworfene Aktionskarte 2 Schaden zu.",
    },
    fr: {
      name: "Le Cavalier sans tête",
      version: "Cavalier maudit",
      text: "Alter 5 HEURE ANGOISSANTE Lorsque vous jouez ce personnage, chaque joueur pioche 3 cartes, puis se défausse de 3 cartes au hasard. Choisissez un personnage adverse et infligez-lui 2 dommages pour chaque carte Action défaussée ainsi.",
    },
    it: {
      name: "Il Cavaliere Senza Testa",
      version: "Cavaliere Maledetto",
      text: "Trasformazione 5 L'ORA PIÙ PROPIZIA AGLI INCANTESIMI Quando giochi questo personaggio, ogni giocatore pesca 3 carte, poi scarta 3 carte a caso. Scegli un personaggio avversario e infliggigli 2 danni per ogni carta azione scartata in questo modo.",
    },
  },
  inkType: ["steel"],
  franchise: "Sleepy Hollow",
  set: "010",
  cardNumber: 174,
  rarity: "common",
  cost: 8,
  strength: 5,
  willpower: 7,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_1e28088d9c49441390e874b91d6352d0",
    tcgPlayer: 660020,
  },
  text: [
    {
      title: "Shift 5 {I}",
    },
    {
      title: "WITCHING HOUR",
      description:
        "When you play this character, each player draws 3 cards, then discards 3 cards at random. Choose an opposing character and deal 2 damage to them for each action card discarded this way.",
    },
  ],
  classifications: ["Floodborn", "Villain"],
  abilities: [
    {
      cost: {
        ink: 5,
      },
      id: "1xu-1",
      keyword: "Shift",
      text: "Shift 5 {I}",
      type: "keyword",
    },
    {
      effect: {
        steps: [
          {
            amount: 3,
            target: "EACH_PLAYER",
            type: "draw",
          },
          {
            amount: 2,
            target: {
              selector: "chosen",
              count: 1,
              owner: "any",
              zones: ["play"],
              cardTypes: ["card"],
            },
            type: "deal-damage",
          },
        ],
        type: "sequence",
      },
      id: "1xu-2",
      name: "WITCHING HOUR",
      text: "WITCHING HOUR When you play this character, each player draws 3 cards, then discards 3 cards at random. Choose an opposing character and deal 2 damage to them for each action card discarded this way.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
