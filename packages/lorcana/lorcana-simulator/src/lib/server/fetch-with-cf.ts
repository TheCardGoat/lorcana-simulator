import { env } from "$env/dynamic/private";
import { validateAndNormalizePrivateApiOrigin } from "./fetch-with-cf-utils.js";

function getClientId(): string | undefined {
  return env.CF_ACCESS_CLIENT_ID ?? env["CF-ACCESS-CLIENT-ID"];
}

function getClientSecret(): string | undefined {
  return env.CF_ACCESS_CLIENT_SECRET ?? env["CF-ACCESS-CLIENT-SECRET"];
}

export function getServerApiOrigin(publicOrigin: string): string {
  const privateOrigin = env.PRIVATE_API_URL?.trim();
  return privateOrigin ? validateAndNormalizePrivateApiOrigin(privateOrigin) : publicOrigin;
}

export async function serverFetch(url: string, init?: RequestInit): Promise<Response> {
  const headers = new Headers(init?.headers);
  const clientId = getClientId();
  const clientSecret = getClientSecret();

  if (clientId && clientSecret) {
    headers.set("CF-Access-Client-Id", clientId);
    headers.set("CF-Access-Client-Secret", clientSecret);
  }

  return fetch(url, { ...init, headers });
}
