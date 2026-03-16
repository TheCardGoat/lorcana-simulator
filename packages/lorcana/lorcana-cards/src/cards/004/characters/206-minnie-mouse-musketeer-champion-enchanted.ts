import type { CharacterCard } from "@tcg/lorcana-types";

export const minnieMouseMusketeerChampionEnchanted: CharacterCard = {
  id: "ixE",
  canonicalId: "ci_AWE",
  reprints: ["set4-017"],
  cardType: "character",
  name: "Minnie Mouse",
  version: "Musketeer Champion",
  i18n: {
    en: {
      name: "Minnie Mouse",
      version: "Musketeer Champion",
      text: [
        {
          title: "Bodyguard",
        },
        {
          title: "DRAMATIC ENTRANCE",
          description:
            "When you play this character, banish chosen opposing character with 5 {S} or more.",
        },
      ],
    },
    de: {
      name: "Minnie Maus",
      version: "Musketier-Champion",
      text: "Beschützen (Du darfst diesen Charakter erschöpft ausspielen. Gegnerische Charaktere müssen beim Herausfordern deiner Charaktere zuerst deine Charaktere mit Beschützen wählen, wenn möglich.) SPEKTAKULÄRER AUFTRITT Wenn du diesen Charakter ausspielst, verbanne einen gegnerischen Charakter deiner Wahl mit 5 oder mehr.",
    },
    fr: {
      name: "Minnie",
      version: "Championne Mousquetaire",
      text: [
        {
          title: "Rempart",
          description:
            "(Ce personnage peut entrer en jeu épuisé. Lorsqu'un adversaire défie l'un de vos personnages, il doit, si possible, choisir l'un de vos personnages avec Rempart.) ENTRÉE THÉATRALE Lorsque vous jouez ce personnage, choisissez un personnage adverse avec 5 ou plus et bannissez-le.",
        },
      ],
    },
    it: {
      name: "Minni",
      version: "Paladina dei Moschettieri",
      text: "Guardiano ENTRATA DRAMMATICA Quando giochi questo personaggio, esilia un personaggio avversario a tua scelta con 5 o superiore.",
    },
  },
  inkType: ["amber"],
  set: "004",
  cardNumber: 206,
  rarity: "enchanted",
  specialRarity: "enchanted",
  cost: 5,
  strength: 1,
  willpower: 5,
  lore: 2,
  inkable: false,
  externalIds: {
    lorcast: "crd_b20587f1945e42d59b750f9b69cc4a6b",
    tcgPlayer: 550537,
  },
  text: [
    {
      title: "Bodyguard",
    },
    {
      title: "DRAMATIC ENTRANCE",
      description:
        "When you play this character, banish chosen opposing character with 5 {S} or more.",
    },
  ],
  classifications: ["Dreamborn", "Hero", "Musketeer"],
  abilities: [
    {
      id: "1kb-1",
      keyword: "Bodyguard",
      text: "Bodyguard",
      type: "keyword",
    },
    {
      effect: {
        target: {
          cardTypes: ["character"],
          count: 1,
          owner: "opponent",
          selector: "chosen",
          zones: ["play"],
        },
        type: "banish",
      },
      id: "1kb-2",
      name: "DRAMATIC ENTRANCE",
      text: "DRAMATIC ENTRANCE When you play this character, banish chosen opposing character with 5 {S} or more.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
