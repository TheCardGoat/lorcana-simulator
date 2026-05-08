import { sequence } from "@sveltejs/kit/hooks";
import type { Handle } from "@sveltejs/kit";
import { getLogger } from "@logtape/logtape";
import { paraglideMiddleware } from "$lib/paraglide/server";
import { getApiOrigin } from "$lib/config/public-url-config.js";
import { getServerApiOrigin, serverFetch } from "$lib/server/fetch-with-cf.js";
import { isGdprStrictCountry, normalizeCfCountry } from "$lib/geo/eu-countries.js";
import type { AuthUser, AuthSession } from "@tcg/shared/auth";

const sessionLogger = getLogger(["tcg", "core-simulator", "session"]);

const handleParaglide: Handle = ({ event, resolve }) =>
  paraglideMiddleware(
    event.request,
    ({ request, locale }: { request: Request; locale: string }) => {
      event.request = request;

      return resolve(event, {
        transformPageChunk: ({ html }) =>
          html.replace("%lang%", locale).replace("%dir%", getDirection(locale)),
      });
    },
  );

function getDirection(locale: string): "ltr" | "rtl" {
  return locale.startsWith("ar") ? "rtl" : "ltr";
}

/**
 * Resolve the Better Auth session server-side by forwarding the cookie to the API.
 * Populates event.locals.user and event.locals.session for all downstream load functions.
 */
const handleSession: Handle = async ({ event, resolve }) => {
  event.locals.user = null;
  event.locals.session = null;

  const cookie = event.request.headers.get("cookie");
  if (!cookie) {
    return resolve(event);
  }

  try {
    const apiOrigin = getServerApiOrigin(getApiOrigin());
    const res = await serverFetch(`${apiOrigin}/api/auth/get-session`, {
      headers: { cookie },
    });

    if (res.ok) {
      const data = (await res.json()) as { user: AuthUser; session: AuthSession } | null;
      if (data?.user && data?.session) {
        event.locals.user = data.user;
        event.locals.session = data.session;
      }
    } else {
      sessionLogger.warn("getSession request failed status={status} statusText={statusText}", {
        status: res.status,
        statusText: res.statusText,
      });
    }
  } catch (error) {
    // Continue as anonymous, but surface the failure so API outages are visible
    sessionLogger.warn("getSession request threw error={error}", {
      error: error instanceof Error ? error.message : String(error),
    });
  }

  return resolve(event);
};

/**
 * Resolve visitor geolocation from Cloudflare's `cf-ipcountry` header so the
 * client can apply GDPR-strict consent defaults for EU/EEA/UK visitors.
 *
 * Fail-closed posture: when the header is absent or unparseable (local dev,
 * direct origin hits, Cloudflare sentinels like `XX`/`T1`), `country` is null
 * AND `gdprStrict` is true. Treating unknowns as strict avoids leaking GA4
 * events to a user whose jurisdiction we can't determine.
 */
const handleGeo: Handle = ({ event, resolve }) => {
  const country = normalizeCfCountry(event.request.headers.get("cf-ipcountry"));
  event.locals.country = country;
  event.locals.gdprStrict = country == null ? true : isGdprStrictCountry(country);
  return resolve(event);
};

export const handle: Handle = sequence(handleParaglide, handleGeo, handleSession);
