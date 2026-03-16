import type { CharacterCard } from "@tcg/lorcana-types";

export const kuzcoSelfishEmperor: CharacterCard = {
  id: "9lb",
  canonicalId: "ci_9lb",
  reprints: ["set5-149"],
  cardType: "character",
  name: "Kuzco",
  version: "Selfish Emperor",
  i18n: {
    en: {
      name: "Kuzco",
      version: "Selfish Emperor",
      text: [
        {
          title: "OUTPLACEMENT",
          description:
            "When you play this character, you may put chosen item or location into its player's inkwell facedown and exerted.",
        },
        {
          title: "BY INVITE ONLY 4",
          description:
            "{I} — Your other characters gain Resist +1 until the start of your next turn.",
        },
      ],
    },
    de: {
      name: "Kusco",
      version: "Selbstsüchtiger Herrscher",
      text: [
        {
          title: "AUSMUSTERN",
          description:
            "Wenn du diesen Charakter ausspielst, darfst du einen Gegenstand oder Ort deiner Wahl verdeckt und erschöpft in den zugehörigen Tintenvorrat legen. NUR AUF EINLADUNG 4 — Deine anderen Charaktere erhalten bis zu Beginn deines nächsten Zuges Robust +1 (Reduziere jeglichen Schaden, der ihnen zugefügt wird, um 1.)",
        },
      ],
    },
    fr: {
      name: "Kuzco",
      version: "Empereur égoïste",
      text: [
        {
          title: "COUPES DRASTIQUES",
          description:
            "Lorsque vous jouez ce personnage, vous pouvez choisir un lieu ou un objet et le placer dans la réserve d'encre de son propriétaire, face cachée et épuisé. SUR INVITATION SEULEMENT 4 — Vos autres personnages gagnent Résistance +1 jusqu'au début de votre prochain tour.",
        },
      ],
    },
    it: {
      name: "Kuzco",
      version: "Imperatore Egoista",
      text: [
        {
          title: "RIDUZIONE DEL PERSONALE",
          description:
            "Quando giochi questo personaggio, puoi aggiungere un oggetto o un luogo a tua scelta al calamaio del suo giocatore, a faccia in giù e impegnato. SOLO SU INVITO 4 — I tuoi altri personaggi ottengono Resistere +1 fino all'inizio del tuo prossimo turno.",
        },
      ],
    },
  },
  inkType: ["sapphire"],
  franchise: "Emperors New Groove",
  set: "005",
  cardNumber: 149,
  rarity: "common",
  cost: 6,
  strength: 3,
  willpower: 5,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_b66ac79061b848eba1c927989cc2fd37",
    tcgPlayer: 561164,
  },
  text: [
    {
      title: "OUTPLACEMENT",
      description:
        "When you play this character, you may put chosen item or location into its player's inkwell facedown and exerted.",
    },
    {
      title: "BY INVITE ONLY 4",
      description: "{I} — Your other characters gain Resist +1 until the start of your next turn.",
    },
  ],
  classifications: ["Storyborn", "King"],
  abilities: [
    {
      id: "c7f-1",
      text: "OUTPLACEMENT When you play this character, you may put chosen item or location into its player's inkwell facedown and exerted.",
      name: "OUTPLACEMENT",
      effect: {
        effect: {
          exerted: true,
          source: "chosen-card-in-play",
          type: "put-into-inkwell",
        },
        type: "optional",
      },
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
    {
      id: "c7f-2",
      text: "BY INVITE ONLY {d} {I} — Your other characters gain Resist +{d} until the start of your next turn.",
      name: "BY INVITE ONLY",
      type: "activated",
      cost: {
        ink: 0,
      },
      effect: {
        duration: "until-start-of-next-turn",
        keyword: "Resist",
        target: {
          cardTypes: ["character"],
          count: "all",
          owner: "you",
          selector: "all",
          zones: ["play"],
          excludeSelf: true,
        },
        type: "gain-keyword",
        value: 0,
      },
    },
  ],
};
