import { createPlayerId, type PlayerId } from "#core";

type PlayerIdSource = {
  playerIds?: readonly PlayerId[] | null;
  ctx?: {
    zones?: {
      zoneDefs?: Record<string, { ownerScoped?: boolean }>;
      private?: {
        cardIndex?: Record<string, { ownerID?: string }>;
      };
    };
  };
};

export function resolveRuntimePlayerIds(source: PlayerIdSource): PlayerId[] {
  if (Array.isArray(source.playerIds) && source.playerIds.length > 0) {
    return [...source.playerIds];
  }

  const playerIds: PlayerId[] = [];
  const seen = new Set<string>();
  const zoneDefs = source.ctx?.zones?.zoneDefs ?? {};

  for (const [zoneId, zoneDef] of Object.entries(zoneDefs)) {
    if (!zoneDef?.ownerScoped) {
      continue;
    }

    const separatorIndex = zoneId.indexOf(":");
    if (separatorIndex <= 0 || separatorIndex >= zoneId.length - 1) {
      continue;
    }

    const playerId = zoneId.slice(separatorIndex + 1);
    if (!playerId || seen.has(playerId)) {
      continue;
    }

    seen.add(playerId);
    playerIds.push(createPlayerId(playerId));
  }

  if (playerIds.length > 0) {
    return playerIds;
  }

  const cardIndex = source.ctx?.zones?.private?.cardIndex ?? {};
  for (const cardState of Object.values(cardIndex)) {
    const playerId = cardState?.ownerID;
    if (!playerId || seen.has(playerId)) {
      continue;
    }

    seen.add(playerId);
    playerIds.push(createPlayerId(playerId));
  }

  return playerIds;
}
