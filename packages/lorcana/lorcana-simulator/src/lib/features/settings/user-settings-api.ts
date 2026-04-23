import { getApiOrigin } from "$lib/config/public-url-config.js";
import { requestVoid } from "$lib/data/transport/http-client.js";

export async function updateUserSettings(payload: {
  gameplaySettings: Record<string, unknown>;
}): Promise<void> {
  await requestVoid(
    `${getApiOrigin()}/v1/users/me/settings`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    },
    "Failed to save user settings",
  );
}

export async function updateUserVisualSettings(payload: {
  visualSettings: {
    cardBack?: string;
    playmat?: string;
  };
}): Promise<void> {
  await requestVoid(
    `${getApiOrigin()}/v1/users/me/settings`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    },
    "Failed to save visual settings",
  );
}
