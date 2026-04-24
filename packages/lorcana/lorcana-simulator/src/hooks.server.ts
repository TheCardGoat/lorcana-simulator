import { sequence } from "@sveltejs/kit/hooks";
import type { Handle } from "@sveltejs/kit";
import { paraglideMiddleware } from "$lib/paraglide/server.js";
import { getApiOrigin } from "$lib/config/public-url-config.js";
import { getServerApiOrigin, serverFetch } from "$lib/server/fetch-with-cf.js";
import type { AuthUser, AuthSession } from "@tcg/shared/auth";

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
    }
  } catch {
    // Session resolution failed — continue as anonymous
  }

  return resolve(event);
};

export const handle: Handle = sequence(handleParaglide, handleSession);
