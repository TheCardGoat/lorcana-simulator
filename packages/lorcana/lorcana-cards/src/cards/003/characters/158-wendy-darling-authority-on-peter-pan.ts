import type { CharacterCard } from "@tcg/lorcana-types";

export const wendyDarlingAuthorityOnPeterPan: CharacterCard = {
  id: "DdB",
  canonicalId: "ci_DdB",
  reprints: ["set3-158"],
  cardType: "character",
  name: "Wendy Darling",
  version: "Authority on Peter Pan",
  i18n: {
    en: {
      name: "Wendy Darling",
      version: "Authority on Peter Pan",
      text: [
        {
          title: "Ward",
        },
        {
          title: "Support",
        },
      ],
    },
    de: {
      name: "Wendy Darling",
      version: "Anerkannte Autorität in Fragen zu Peter Pan",
      text: "Behütet Unterstützen (Jedes Mal, wenn dieser Charakter erkundet, darfst du seine in diesem Zug zur eines anderen Charakters deiner Wahl addieren.)",
    },
    fr: {
      name: "Wendy Darling",
      version: "Autorité sur Peter Pan",
      text: "Hors d'atteinte Soutien",
    },
    it: {
      name: "Wendy Darling",
      version: "Esperta di Peter Pan",
      text: "Protetto Aiutante",
    },
  },
  inkType: ["sapphire"],
  franchise: "Peter Pan",
  set: "003",
  cardNumber: 158,
  rarity: "common",
  cost: 3,
  strength: 3,
  willpower: 1,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_43915110e8b94147baf492d89356e0ca",
    tcgPlayer: 531826,
  },
  text: [
    {
      title: "Ward",
    },
    {
      title: "Support",
    },
  ],
  classifications: ["Storyborn", "Hero"],
  abilities: [
    {
      id: "st9-1",
      keyword: "Ward",
      type: "keyword",
      text: "Ward",
    },
    {
      id: "st9-2",
      keyword: "Support",
      type: "keyword",
      text: "Support",
    },
  ],
};
