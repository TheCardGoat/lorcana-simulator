import type { I18nProperties, Languages } from "@tcg/lorcana-types";

export const littleJohnSirReginaldI18n: Record<Languages, I18nProperties> = {
  en: {
    name: "Little John",
    version: "Sir Reginald",
    text: "WHAT A BEAUTIFUL BRAWL! When you play this character, choose one:\n- Chosen Hero character gains Resist +2 this turn.\n- Deal 2 damage to chosen Villain character.",
  },
  de: {
    name: "Little John",
    version: "Sir Reginald",
    text: [
      {
        title: "DAS MACHT UNERHÖRT SPASS!",
        description:
          "Wenn du diesen Charakter ausspielst, wähle eine Möglichkeit aus: • Ein Held deiner Wahl erhält in diesem Zug Robust +2. (Reduziere jeglichen Schaden, der dem Charakter zugefügt wird, um 2.) • Füge einem Schurken deiner Wahl 2 Schaden zu.",
      },
    ],
  },
  fr: {
    name: "Petit Jean",
    version: "Sir Reginald",
    text: [
      {
        title: "ÇA VA CHAUFFER!",
        description:
          "Lorsque vous jouez ce personnage, choisissez entre: • Choisissez un personnage Héros qui gagne Résistance +2 pour le reste de ce tour. • Choisissez un personnage Méchant et infligez-lui 2 dommages.",
      },
    ],
  },
  it: {
    name: "Little John",
    version: "Ser Reginald",
    text: [
      {
        title: "ME LA VOGLIO GODERE TUTTA!",
        description:
          "Quando giochi questo personaggio, scegli uno: • Un personaggio Eroe a tua scelta ottiene Resistere +2 per questo turno. • Infliggi 2 danni a un personaggio Cattivo a tua scelta.",
      },
    ],
  },
};
