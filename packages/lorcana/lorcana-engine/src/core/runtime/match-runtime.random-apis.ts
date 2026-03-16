/**
 * MatchRuntime Random API Factories
 */

import type { Draft } from "immer";
import type { MatchState } from "./types";
import type { RandomAPI } from "./match-runtime.types";

export function createRandomAPIForDraft<G>(draft: Draft<MatchState<G>>): RandomAPI {
  const random = (): number => {
    draft.ctx.random.draws++;
    const seed = draft.ctx.random.seed;
    const x = Math.sin(seed.length * 9999 + draft.ctx.random.draws) * 10000;
    return x - Math.floor(x);
  };

  return {
    random,
    shuffle: <T>(array: T[]): T[] => {
      const result = [...array];
      for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(random() * (i + 1));
        [result[i], result[j]] = [result[j], result[i]];
      }
      return result;
    },
  };
}
