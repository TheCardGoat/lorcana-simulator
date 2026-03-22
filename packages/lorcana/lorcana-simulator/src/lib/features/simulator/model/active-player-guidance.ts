import type { NamedCardSearchEntry } from "../panels/NamedCardSearchInput.svelte";

export type GuidanceMode = "default" | "pregame" | "challenge";
export type GuidanceAnchor = "top" | "bottom";
export type GuidancePosition = GuidanceAnchor;

export interface GuidanceAction {
  id: string;
  label: string;
  onClick: () => void;
  disabled?: boolean;
  emphasis?: boolean;
}

export interface NamedCardSearchState {
  query: string;
  results: NamedCardSearchEntry[];
  oninput: (query: string) => void;
  onselect: (cardName: string, displayLabel: string) => void;
}

export interface ActivePlayerGuidanceItem {
  id: string;
  message: string;
  actions: GuidanceAction[];
  mode: GuidanceMode;
  order: number;
  namedCardSearch?: NamedCardSearchState;
}

export interface ActivePlayerGuidanceOverlayInput {
  id: string;
  message: string;
  actions?: GuidanceAction[];
  mode?: GuidanceMode;
}

export interface ActivePlayerGuidanceController {
  upsert: (item: ActivePlayerGuidanceOverlayInput) => void;
  remove: (id: string) => void;
  setSecondLayerCategory: (categoryLabel: string | null) => void;
}
