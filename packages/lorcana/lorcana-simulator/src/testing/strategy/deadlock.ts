import type { PlayerId } from "@tcg/lorcana-engine";

export const STRATEGY_REPEAT_THRESHOLD = 3;
export const STRATEGY_TURN_LIMIT = 35;
export const STRATEGY_ACTION_LIMIT = 250;

export type StrategyMatchEndReason =
  | "winner"
  | "turn-limit"
  | "action-limit"
  | "repeated-state-deadlock";

export interface RepeatedStateObservation {
  actorId?: PlayerId;
  stateFingerprint: string;
}

export interface RepeatedStateObservationResult {
  count: number;
  key?: string;
  repeatedStateDeadlock: boolean;
}

export function createRepeatedStateDeadlockTracker(repeatThreshold = STRATEGY_REPEAT_THRESHOLD) {
  const seenStates = new Map<string, number>();

  return {
    observe(observation: RepeatedStateObservation): RepeatedStateObservationResult {
      if (!observation.actorId) {
        return {
          count: 0,
          repeatedStateDeadlock: false,
        };
      }

      const key = `${observation.actorId}:${observation.stateFingerprint}`;
      const count = (seenStates.get(key) ?? 0) + 1;
      seenStates.set(key, count);

      return {
        count,
        key,
        repeatedStateDeadlock: count >= repeatThreshold,
      };
    },
  };
}

export function resolveStrategyMatchEndReason(args: {
  actionCount: number;
  actionLimit?: number;
  pendingDeadlock: boolean;
  turnLimit?: number;
  turnNumber: number;
  winner?: PlayerId;
}): StrategyMatchEndReason | undefined {
  if (args.winner) {
    return "winner";
  }

  if (args.pendingDeadlock) {
    return "repeated-state-deadlock";
  }

  if (args.turnNumber > (args.turnLimit ?? STRATEGY_TURN_LIMIT)) {
    return "turn-limit";
  }

  if (args.actionCount > (args.actionLimit ?? STRATEGY_ACTION_LIMIT)) {
    return "action-limit";
  }

  return undefined;
}
