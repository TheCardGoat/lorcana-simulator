import type { CharacterCard } from "@tcg/lorcana-types";

export const tukTukLivelyPartner: CharacterCard = {
  id: "PQN",
  canonicalId: "ci_j2H",
  reprints: ["set4-127", "set9-129"],
  cardType: "character",
  name: "Tuk Tuk",
  version: "Lively Partner",
  i18n: {
    en: {
      name: "Tuk Tuk",
      version: "Lively Partner",
      text: [
        {
          title: "Evasive",
        },
        {
          title: "ON A ROLL",
          description:
            "When you play this character, you may move him and one of your other characters to the same location for free. The other character gets +2 {S} this turn.",
        },
      ],
    },
    de: {
      name: "Tuktuk",
      version: "Lebendiger Verbündeter",
      text: "Wendig AUFGEDREHT Wenn du diesen Charakter ausspielst, darfst du ihn und einen deiner anderen Charaktere kostenlos zu dem selben Ort bewegen. Der andere Charakter erhält in diesem Zug +2.",
    },
    fr: {
      name: "Tuk Tuk",
      version: "Partenaire percutant",
      text: "Insaisissable ÇA ROULE Lorsque vous jouez ce personnage, vous pouvez choisir un autre personnage et les déplacer tous les deux gratuitement sur un même lieu. Le personnage choisi gagne +2 pour le reste de ce tour.",
    },
    it: {
      name: "Tuk Tuk",
      version: "Compagno Vivace",
      text: "Sfuggente ROTOLAMENTO Quando giochi questo personaggio, puoi spostare lui e uno dei tuoi altri personaggi in uno stesso luogo, gratis. L'altro personaggio riceve +2 per questo turno.",
    },
  },
  inkType: ["ruby"],
  franchise: "Raya and the Last Dragon",
  set: "004",
  cardNumber: 127,
  rarity: "rare",
  cost: 3,
  strength: 2,
  willpower: 3,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_1f37e8ef12cb407f815ee35eb21abf61",
    tcgPlayer: 650064,
  },
  text: [
    {
      title: "Evasive",
    },
    {
      title: "ON A ROLL",
      description:
        "When you play this character, you may move him and one of your other characters to the same location for free. The other character gets +2 {S} this turn.",
    },
  ],
  classifications: ["Storyborn", "Ally"],
  abilities: [
    {
      effect: {
        duration: "this-turn",
        modifier: 2,
        stat: "strength",
        target: "YOUR_CHARACTERS",
        type: "modify-stat",
      },
      id: "1qb-1",
      name: "Evasive ON A ROLL",
      text: "Evasive ON A ROLL When you play this character, you may move him and one of your other characters to the same location for free. If you do, the other character gets +2 {S} this turn.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
