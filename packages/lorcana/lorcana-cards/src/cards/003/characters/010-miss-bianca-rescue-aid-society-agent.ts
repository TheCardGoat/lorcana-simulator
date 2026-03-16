import type { CharacterCard } from "@tcg/lorcana-types";

export const missBiancaRescueAidSocietyAgent: CharacterCard = {
  id: "psy",
  canonicalId: "ci_psy",
  reprints: ["set3-010"],
  cardType: "character",
  name: "Miss Bianca",
  version: "Rescue Aid Society Agent",
  i18n: {
    en: {
      name: "Miss Bianca",
      version: "Rescue Aid Society Agent",
      text: "Singer 4",
    },
    de: {
      name: "Miss Bianca",
      version: "Agentin der internationalen Rettungshilfegesellschaft",
      text: [
        {
          title: "Singen 4",
          description: "(Die Kosten dieses Charakters gelten als 4 für das Singen von Liedern.)",
        },
      ],
    },
    fr: {
      name: "Miss Bianca",
      version: "Agente de S.O.S Société",
      text: "Mélomane 4 (Ce personnage est considéré comme ayant un coût de 4 pour chanter des chansons.)",
    },
    it: {
      name: "Miss Bianca",
      version: "Agente della Società Internazionale di Salvataggio",
      text: "Melodioso 4",
    },
  },
  inkType: ["amber"],
  franchise: "Rescuers",
  set: "003",
  cardNumber: 10,
  rarity: "common",
  cost: 2,
  strength: 2,
  willpower: 2,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_a2bdf443390f4009bed7f162badd841c",
    tcgPlayer: 539063,
  },
  text: "Singer 4",
  classifications: ["Storyborn", "Hero"],
  abilities: [
    {
      id: "113-1",
      keyword: "Singer",
      type: "keyword",
      value: 4,
      text: "Singer 4",
    },
  ],
};
