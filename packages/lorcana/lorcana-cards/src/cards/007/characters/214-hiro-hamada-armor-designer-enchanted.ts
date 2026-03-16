import type { CharacterCard } from "@tcg/lorcana-types";

export const hiroHamadaArmorDesignerEnchanted: CharacterCard = {
  id: "dNZ",
  canonicalId: "ci_TaU",
  reprints: ["set7-096"],
  cardType: "character",
  name: "Hiro Hamada",
  version: "Armor Designer",
  i18n: {
    en: {
      name: "Hiro Hamada",
      version: "Armor Designer",
      text: [
        {
          title: "Shift 5",
        },
        {
          title: "YOU CAN BE WAY MORE",
          description:
            "Your Floodborn characters that have a card under them gain Evasive and Ward. (Only characters with Evasive can challenge them. Opponents can't choose them except to challenge.)",
        },
      ],
    },
    de: {
      name: "Hiro Hamada",
      version: "Rüstungsdesigner",
      text: "Gestaltwandel 5 DU KANNST VIEL MEHR SEIN Deine Flutgestalten, die eine Karte unter sich liegen haben, erhalten Wendig und Behütet. (Nur Charaktere mit Wendig können jene Charaktere herausfordern. Gegnerische Mitspielende können jene Charaktere nicht auswählen, außer um sie herauszufordern.)",
    },
    fr: {
      name: "Hiro Hamada",
      version: "Concepteur d'armures",
      text: "Alter 5 VOUS SEREZ BIEN PLUS Vos personnages Floodborn avec une carte sous eux gagnent Insaisissable et Hors d'atteinte. (Seuls les personnages avec Insaisissable peuvent défier ces personnages. Les adversaires ne peuvent pas choisir ces personnages, hormis pour un défi.)",
    },
    it: {
      name: "Hiro Hamada",
      version: "Proggettista di Armature",
      text: "Trasformazione 5 POTETE DIVENTARE MOLTO DI PIÙ I tuoi personaggi Imbevuti che hanno una carta sotto di essi ottengono Sfuggente e Protetto. (Solo altri personaggi con Sfuggente possono sfidarli. Gli avversari non possono sceglierli se non per sfidarli.)",
    },
  },
  inkType: ["emerald", "sapphire"],
  franchise: "Big Hero 6",
  set: "007",
  cardNumber: 214,
  rarity: "enchanted",
  specialRarity: "enchanted",
  cost: 7,
  strength: 4,
  willpower: 6,
  lore: 3,
  inkable: true,
  externalIds: {
    lorcast: "crd_434537e486234e2095f03c19628e07d4",
    tcgPlayer: 619742,
  },
  text: [
    {
      title: "Shift 5",
    },
    {
      title: "YOU CAN BE WAY MORE",
      description:
        "Your Floodborn characters that have a card under them gain Evasive and Ward. (Only characters with Evasive can challenge them. Opponents can't choose them except to challenge.)",
    },
  ],
  classifications: ["Floodborn", "Hero", "Inventor"],
  abilities: [
    {
      cost: {
        ink: 5,
      },
      id: "zri-1",
      keyword: "Shift",
      text: "Shift 5",
      type: "keyword",
    },
    {
      effect: {
        keyword: "Evasive",
        target: "YOUR_CHARACTERS",
        type: "gain-keyword",
      },
      id: "zri-2",
      text: "YOU CAN BE WAY MORE Your Floodborn characters that have a card under them gain Evasive and Ward.",
      type: "action",
    },
  ],
};
