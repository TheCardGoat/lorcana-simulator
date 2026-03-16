/* eslint-disable */
import * as generatedMessages from "../paraglide-generated/messages/_index.js";
import enMessages from "../../messages/en.json";

export * from "../paraglide-generated/messages/_index.js";

/**
 * Track first-time missing-key warnings to avoid log spam.
 * @type {Set<string>}
 */
const warnedMissingKeys = new Set();

/** @param {unknown} messageTemplate @param {Record<string, unknown> | undefined} values */
function renderWithValues(messageTemplate, values = {}) {
  if (typeof messageTemplate !== "string") {
    return messageTemplate;
  }

  return messageTemplate.replace(/\{([^{}]+)\}/g, (_, key) =>
    Object.prototype.hasOwnProperty.call(values, key) ? String(values[key]) : `{${key}}`,
  );
}

/** @type {boolean} */
const shouldWarnMissingMessages =
  typeof import.meta !== "undefined" &&
  typeof import.meta.env !== "undefined" &&
  Boolean(import.meta.env.DEV);

/**
 * Fallback translation layer for generated messages.
 * Returns:
 * 1. The generated translation function (when available),
 * 2. English fallback from `messages/en.json` (including placeholder interpolation), or
 * 3. `[<messageId>]` when missing from both catalogs.
 */
export const m = new Proxy(
  /** @type {Record<string, (() => string) | ((...args: unknown[]) => string)>} */ (
    generatedMessages
  ),
  {
    get(target, propertyKey) {
      if (typeof propertyKey !== "string") {
        return Reflect.get(target, propertyKey);
      }

      const message = Reflect.get(target, propertyKey);
      if (message) {
        return message;
      }

      if (shouldWarnMissingMessages && !warnedMissingKeys.has(propertyKey)) {
        warnedMissingKeys.add(propertyKey);
        console.warn(
          `[i18n] Missing message key "${propertyKey}". Falling back to English message catalog.`,
        );
      }

      return (
        /** @type {{ [key: string]: unknown } | undefined} */ inputs = {},
        /** @type {{ locale?: string } | undefined} */ _options,
      ) => {
        const fallbackCatalog = /** @type {{ [key: string]: unknown }} */ (enMessages);
        const fallbackMessage = fallbackCatalog[propertyKey];
        if (typeof fallbackMessage === "string") {
          return renderWithValues(fallbackMessage, inputs);
        }

        return `[${propertyKey}]`;
      };
    },
  },
);
