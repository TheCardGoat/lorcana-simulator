export type GuidanceMode = "default" | "pregame" | "challenge";

export interface GuidanceAction {
  id: string;
  label: string;
  onClick: () => void;
  disabled?: boolean;
  emphasis?: boolean;
}

export interface ActivePlayerGuidanceItem {
  id: string;
  message: string;
  actions: GuidanceAction[];
  mode: GuidanceMode;
  order: number;
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
