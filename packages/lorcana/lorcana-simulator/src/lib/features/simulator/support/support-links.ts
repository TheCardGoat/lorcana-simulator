export type SimulatorSupportActionId = "reportBug" | "shareFeedback";

export interface SimulatorSupportActionLink {
  id: SimulatorSupportActionId;
  url: string;
  labelKey: string;
  descriptionKey: string;
}

export const SIMULATOR_SUPPORT_ACTIONS = [
  {
    id: "reportBug",
    url: "https://github.com/TheCardGoat/the-card-goat-online/issues/new/choose",
    labelKey: "sim.support.reportBugLabel",
    descriptionKey: "sim.support.reportBugDescription",
  },
  {
    id: "shareFeedback",
    url: "https://discord.gg/FxxWaJW2rP",
    labelKey: "sim.support.shareFeedbackLabel",
    descriptionKey: "sim.support.shareFeedbackDescription",
  },
] satisfies readonly SimulatorSupportActionLink[];

export function openSimulatorSupportAction(actionId: SimulatorSupportActionId): void {
  const action = SIMULATOR_SUPPORT_ACTIONS.find((entry) => entry.id === actionId);
  if (!action || typeof window === "undefined") {
    return;
  }

  window.open(action.url, "_blank", "noopener,noreferrer");
}
