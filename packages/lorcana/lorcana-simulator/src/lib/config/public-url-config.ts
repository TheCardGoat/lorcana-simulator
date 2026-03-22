import { env } from "$env/dynamic/public";

const DEFAULT_API_ORIGIN = "http://localhost:3000";
const DEFAULT_GAME_SERVER_ORIGIN = "http://localhost:3001";
const DEFAULT_SIMULATOR_ASSET_BASE_URL = "https://r2.tcg.online/public/lorcana/simulator";
const DEFAULT_LORCANA_ASSET_BASE_URL = "https://r2.tcg.online/public/lorcana";

function normalizeConfiguredUrl(
  value: string | undefined,
  {
    envName,
    fallback,
    allowedProtocols,
    stripTrailingV1 = false,
  }: {
    envName: string;
    fallback: string;
    allowedProtocols: readonly string[];
    stripTrailingV1?: boolean;
  },
): string {
  const trimmedValue = value?.trim();
  const candidate = trimmedValue?.length ? trimmedValue : fallback;
  const normalizedCandidate = stripTrailingV1 ? candidate.replace(/\/v1\/?$/, "") : candidate;

  let parsedUrl: URL;
  try {
    parsedUrl = new URL(normalizedCandidate);
  } catch {
    throw new Error(
      `Invalid ${envName} "${trimmedValue}". Expected an absolute URL using ${allowedProtocols.join(" or ")}.`,
    );
  }

  if (!allowedProtocols.includes(parsedUrl.protocol)) {
    throw new Error(
      `Invalid ${envName} "${trimmedValue}". Expected an absolute URL using ${allowedProtocols.join(" or ")}.`,
    );
  }

  return parsedUrl.toString().replace(/\/$/, "");
}

function deriveGatewayWsUrl(gameServerOrigin: string): string {
  const httpBase = new URL(gameServerOrigin);
  const wsUrl = new URL("/v1/gateway/ws", httpBase);
  wsUrl.protocol = httpBase.protocol === "https:" ? "wss:" : "ws:";
  return wsUrl.toString();
}

export interface PublicUrlConfig {
  apiOrigin: string;
  gameServerOrigin: string;
  gatewayWsUrl: string;
  simulatorAssetBaseUrl: string;
  lorcanaAssetBaseUrl: string;
}

export function getPublicUrlConfig(): PublicUrlConfig {
  const apiOrigin = normalizeConfiguredUrl(env.PUBLIC_API_URL, {
    envName: "PUBLIC_API_URL",
    fallback: DEFAULT_API_ORIGIN,
    allowedProtocols: ["http:", "https:"],
    stripTrailingV1: true,
  });

  const gameServerOrigin = normalizeConfiguredUrl(env.PUBLIC_GAME_SERVER_URL, {
    envName: "PUBLIC_GAME_SERVER_URL",
    fallback: DEFAULT_GAME_SERVER_ORIGIN,
    allowedProtocols: ["http:", "https:"],
    stripTrailingV1: true,
  });

  const simulatorAssetBaseUrl = normalizeConfiguredUrl(env.PUBLIC_SIMULATOR_ASSET_BASE_URL, {
    envName: "PUBLIC_SIMULATOR_ASSET_BASE_URL",
    fallback: DEFAULT_SIMULATOR_ASSET_BASE_URL,
    allowedProtocols: ["http:", "https:"],
  });

  const lorcanaAssetBaseUrl = normalizeConfiguredUrl(env.PUBLIC_LORCANA_ASSET_BASE_URL, {
    envName: "PUBLIC_LORCANA_ASSET_BASE_URL",
    fallback: DEFAULT_LORCANA_ASSET_BASE_URL,
    allowedProtocols: ["http:", "https:"],
  });

  const gatewayWsUrl = env.PUBLIC_GATEWAY_WS_URL?.trim().length
    ? normalizeConfiguredUrl(env.PUBLIC_GATEWAY_WS_URL, {
        envName: "PUBLIC_GATEWAY_WS_URL",
        fallback: deriveGatewayWsUrl(gameServerOrigin),
        allowedProtocols: ["ws:", "wss:"],
      })
    : deriveGatewayWsUrl(gameServerOrigin);

  return {
    apiOrigin,
    gameServerOrigin,
    gatewayWsUrl,
    simulatorAssetBaseUrl,
    lorcanaAssetBaseUrl,
  };
}

export function getApiOrigin(): string {
  return getPublicUrlConfig().apiOrigin;
}

export function getGameServerOrigin(): string {
  return getPublicUrlConfig().gameServerOrigin;
}

export function getGatewayWsUrl(): string {
  return getPublicUrlConfig().gatewayWsUrl;
}

export function getSimulatorAssetBaseUrl(): string {
  return getPublicUrlConfig().simulatorAssetBaseUrl;
}

export function getLorcanaAssetBaseUrl(): string {
  return getPublicUrlConfig().lorcanaAssetBaseUrl;
}

export function buildSimulatorAssetUrl(path: string): string {
  const relativePath = path.replace(/^\/+/, "");
  return `${getSimulatorAssetBaseUrl()}/${relativePath}`;
}

export function buildLorcanaAssetUrl(path: string): string {
  const relativePath = path.replace(/^\/+/, "");
  return `${getLorcanaAssetBaseUrl()}/${relativePath}`;
}
