import type { DeepReadonly, MatchState } from "../runtime";
import type { GameEngine } from "./contracts";

type ExampleState = MatchState<{
  nested: {
    count: number;
  };
}>;

function assertReadonlyState(engine: GameEngine<ExampleState>) {
  const state = engine.getState();
  const readonlyState: DeepReadonly<ExampleState> = state;

  void readonlyState;

  // @ts-expect-error returned engine state must be deep-readonly
  state.G.nested.count = 1;
}

void assertReadonlyState;
