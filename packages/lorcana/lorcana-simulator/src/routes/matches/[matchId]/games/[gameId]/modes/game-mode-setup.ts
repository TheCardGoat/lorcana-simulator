import { MatchChatController } from "@/features/match-chat/match-chat-controller.svelte.js";
import type { OpponentPresenceTracker } from "@/features/gateway/opponent-presence.svelte.js";
import type { GatewayClientStore } from "@/features/gateway/gateway-client.svelte.js";
import type { LorcanaPlayerSettingsMap } from "$lib/features/simulator/model/player-visual-settings.js";
import type { GameContextParticipant } from "../+page.server.js";

export function buildVisualSettings(
  participants: GameContextParticipant[],
): LorcanaPlayerSettingsMap {
  const visuals: LorcanaPlayerSettingsMap = {};
  for (const p of participants) {
    if (p.visualSettings) visuals[p.id] = p.visualSettings;
  }
  return visuals;
}

export function buildDisplayNames(participants: GameContextParticipant[]): Record<string, string> {
  const names: Record<string, string> = {};
  for (const p of participants) {
    if (p.displayName) names[p.id] = p.displayName;
  }
  return names;
}

export function buildIsMobileMap(participants: GameContextParticipant[]): Record<string, boolean> {
  const map: Record<string, boolean> = {};
  for (const p of participants) {
    if (p.isMobile !== undefined) map[p.id] = p.isMobile;
  }
  return map;
}

export function mergeWsVisuals(
  current: LorcanaPlayerSettingsMap,
  wsVisuals: LorcanaPlayerSettingsMap | undefined,
): LorcanaPlayerSettingsMap {
  if (wsVisuals && Object.keys(wsVisuals).length > 0) {
    return { ...current, ...wsVisuals };
  }
  return current;
}

export function createMatchChat(params: {
  gameId: string;
  canSend: boolean;
  gateway: GatewayClientStore;
}): MatchChatController {
  return new MatchChatController({
    gameId: params.gameId,
    canSend: params.canSend,
    sendMessage: (message) => params.gateway.send(message),
  });
}

export function checkInitialPresence(
  players: Array<{ id: string; connected: boolean; disconnectedAt?: string }> | undefined,
  selfId: string | undefined,
  tracker: OpponentPresenceTracker,
): void {
  if (!players) return;
  const opponent = selfId
    ? players.find((p) => p.id !== selfId)
    : players.find((p) => !p.connected);
  if (opponent && !opponent.connected) {
    tracker.handlePresenceChange("disconnected", opponent.disconnectedAt);
  }
}
