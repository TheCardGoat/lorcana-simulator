const SIMULATOR_ASSET_BASE = "https://r2.tcg.online/public/lorcana/simulator";
const LEGACY_PLAYMAT_BASE = "https://r2.tcg.online/public/lorcana/simulator/playmats";

export interface LorcanaPlayerVisualSettings {
  cardBack?: string;
  playmat?: string;
}

export type LorcanaPlayerSettingsMap = Partial<Record<string, LorcanaPlayerVisualSettings>>;

export interface LorcanaResolvedCardBack {
  id: string;
  src: string;
  artOnlySrc: string;
}

export interface LorcanaResolvedPlaymat {
  id: string;
  src: string | null;
}

export interface LorcanaResolvedPlayerVisualSettings {
  cardBack: LorcanaResolvedCardBack;
  playmat: LorcanaResolvedPlaymat;
}

const CARD_BACK_PRESETS = {
  default: {
    src: `${SIMULATOR_ASSET_BASE}/card-back/back-cosmos.webp`,
    artOnlySrc: `${SIMULATOR_ASSET_BASE}/card-back/back-cosmos-square.webp`,
  },
  white: {
    src: `${SIMULATOR_ASSET_BASE}/card-back/back-white.webp`,
    artOnlySrc: `${SIMULATOR_ASSET_BASE}/card-back/back-white-square.webp`,
  },
  yellow: {
    src: `${SIMULATOR_ASSET_BASE}/card-back/back-yellow.webp`,
    artOnlySrc: `${SIMULATOR_ASSET_BASE}/card-back/back-yellow-square.webp`,
  },
  cosmos: {
    src: `${SIMULATOR_ASSET_BASE}/card-back/back-cosmos.webp`,
    artOnlySrc: `${SIMULATOR_ASSET_BASE}/card-back/back-cosmos-square.webp`,
  },
  ariel: {
    src: `${SIMULATOR_ASSET_BASE}/card-back/sleeve-ariel.webp`,
    artOnlySrc: `${SIMULATOR_ASSET_BASE}/card-back/sleeve-ariel.webp`,
  },
  cendrillon: {
    src: `${SIMULATOR_ASSET_BASE}/card-back/sleeve-cendrillon.webp`,
    artOnlySrc: `${SIMULATOR_ASSET_BASE}/card-back/sleeve-cendrillon.webp`,
  },
  minniee: {
    src: `${SIMULATOR_ASSET_BASE}/card-back/sleeve-minniee.webp`,
    artOnlySrc: `${SIMULATOR_ASSET_BASE}/card-back/sleeve-minniee.webp`,
  },
  _0001: {
    src: `${SIMULATOR_ASSET_BASE}/card-back/sleeve_0001.webp`,
    artOnlySrc: `${SIMULATOR_ASSET_BASE}/card-back/sleeve_0001.webp`,
  },
  bella: {
    src: `${SIMULATOR_ASSET_BASE}/card-back/sleevee-bella.webp`,
    artOnlySrc: `${SIMULATOR_ASSET_BASE}/card-back/sleevee-bella.webp`,
  },
  jasmine: {
    src: `${SIMULATOR_ASSET_BASE}/card-back/sleevejasminewebp.webp`,
    artOnlySrc: `${SIMULATOR_ASSET_BASE}/card-back/sleevejasminewebp.webp`,
  },
} as const satisfies Record<string, { src: string; artOnlySrc: string }>;

const PLAYMAT_PRESETS = {
  default: null,
  "005": `${LEGACY_PLAYMAT_BASE}/005.webp`,
  "beast-001": `${LEGACY_PLAYMAT_BASE}/beast-001.webp`,
  bela: `${LEGACY_PLAYMAT_BASE}/bela.webp`,
  "belle-001": `${LEGACY_PLAYMAT_BASE}/belle-001.webp`,
  besouro: `${LEGACY_PLAYMAT_BASE}/besouro.webp`,
  cat: `${LEGACY_PLAYMAT_BASE}/cat.webp`,
  corrida: `${LEGACY_PLAYMAT_BASE}/corrida.webp`,
  corridadenovo: `${LEGACY_PLAYMAT_BASE}/corridadenovo.webp`,
  dodnal: `${LEGACY_PLAYMAT_BASE}/dodnal.webp`,
  donal: `${LEGACY_PLAYMAT_BASE}/donal.webp`,
  dragao: `${LEGACY_PLAYMAT_BASE}/dragao.webp`,
  emerald: `${LEGACY_PLAYMAT_BASE}/emerald.webp`,
  elsa: `${LEGACY_PLAYMAT_BASE}/elsa_bg.webp`,
  fogogelo: `${LEGACY_PLAYMAT_BASE}/fogogelo.webp`,
  genio: `${LEGACY_PLAYMAT_BASE}/genio.webp`,
  hiro: `${LEGACY_PLAYMAT_BASE}/hiro.webp`,
  lorcana_1: `${LEGACY_PLAYMAT_BASE}/lorcana_1.webp`,
  "malificent-001": `${LEGACY_PLAYMAT_BASE}/malificent-001.webp`,
  "maui-001": `${LEGACY_PLAYMAT_BASE}/maui-001.webp`,
  "mickey-001": `${LEGACY_PLAYMAT_BASE}/mickey-001.webp`,
  "moana-001": `${LEGACY_PLAYMAT_BASE}/moana-001.webp`,
  moana: `${LEGACY_PLAYMAT_BASE}/moana.webp`,
  mulan: `${LEGACY_PLAYMAT_BASE}/mulan.webp`,
  pooh: `${LEGACY_PLAYMAT_BASE}/pooh.webp`,
  "pooh-001": `${LEGACY_PLAYMAT_BASE}/pooh-001.webp`,
  "rapunzel-001": `${LEGACY_PLAYMAT_BASE}/rapunzel-001.webp`,
  "rapunzel-002": `${LEGACY_PLAYMAT_BASE}/rapunzel-002.webp`,
  "stitch-001": `${LEGACY_PLAYMAT_BASE}/stitch-001.webp`,
  "stitch-002": `${LEGACY_PLAYMAT_BASE}/stitch-002.webp`,
  "tinker-bell-001": `${LEGACY_PLAYMAT_BASE}/tinker-bell-001.webp`,
} as const satisfies Record<string, string | null>;

export const DEFAULT_LORCANA_CARD_BACK_ID = "default";
export const DEFAULT_LORCANA_PLAYMAT_ID = "default";

export const DEFAULT_LORCANA_PLAYER_VISUAL_SETTINGS: LorcanaResolvedPlayerVisualSettings = {
  cardBack: {
    id: DEFAULT_LORCANA_CARD_BACK_ID,
    ...CARD_BACK_PRESETS.default,
  },
  playmat: {
    id: DEFAULT_LORCANA_PLAYMAT_ID,
    src: PLAYMAT_PRESETS.default,
  },
};

function isExternalAsset(value: string): boolean {
  return (
    value.startsWith("http://") ||
    value.startsWith("https://") ||
    value.startsWith("/") ||
    value.startsWith("data:")
  );
}

export function resolveLorcanaCardBack(selection?: string | null): LorcanaResolvedCardBack {
  if (!selection) {
    return DEFAULT_LORCANA_PLAYER_VISUAL_SETTINGS.cardBack;
  }

  if (isExternalAsset(selection)) {
    return {
      id: selection,
      src: selection,
      artOnlySrc: selection,
    };
  }

  const preset = CARD_BACK_PRESETS[selection as keyof typeof CARD_BACK_PRESETS];
  if (!preset) {
    return DEFAULT_LORCANA_PLAYER_VISUAL_SETTINGS.cardBack;
  }

  return {
    id: selection,
    ...preset,
  };
}

export function resolveLorcanaPlaymat(selection?: string | null): LorcanaResolvedPlaymat {
  if (!selection) {
    return DEFAULT_LORCANA_PLAYER_VISUAL_SETTINGS.playmat;
  }

  if (isExternalAsset(selection)) {
    return {
      id: selection,
      src: selection,
    };
  }

  const preset = PLAYMAT_PRESETS[selection as keyof typeof PLAYMAT_PRESETS];
  if (preset === undefined) {
    return DEFAULT_LORCANA_PLAYER_VISUAL_SETTINGS.playmat;
  }

  return {
    id: selection,
    src: preset,
  };
}

export function resolveLorcanaPlayerVisualSettings(
  playerSettings: LorcanaPlayerVisualSettings | null | undefined,
): LorcanaResolvedPlayerVisualSettings {
  return {
    cardBack: resolveLorcanaCardBack(playerSettings?.cardBack),
    playmat: resolveLorcanaPlaymat(playerSettings?.playmat),
  };
}

export function getLorcanaPlayerVisualSettings(
  playerSettingsByOwnerId: LorcanaPlayerSettingsMap | null | undefined,
  ownerId: string | null | undefined,
): LorcanaResolvedPlayerVisualSettings {
  if (!ownerId) {
    return DEFAULT_LORCANA_PLAYER_VISUAL_SETTINGS;
  }

  return resolveLorcanaPlayerVisualSettings(playerSettingsByOwnerId?.[ownerId]);
}
