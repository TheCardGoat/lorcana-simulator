import { m as generatedMessages } from "$lib/paraglide/messages.js";
import enMessages from "../../messages/en.json";

export * from "$lib/paraglide/messages.js";

type Locale = "en" | "de" | "it" | "es" | "pt-br";
type LocalizedString = string;
export type SimulatorMessageTranslator = (
  inputs?: Record<string, unknown>,
  options?: { locale?: Locale },
) => LocalizedString;

function renderWithValues(messageTemplate: unknown, values: Record<string, unknown> = {}): string {
  if (typeof messageTemplate !== "string") {
    return String(messageTemplate);
  }

  return messageTemplate.replace(/\{([^{}]+)\}/g, (_, key) =>
    Object.prototype.hasOwnProperty.call(values, key) ? String(values[key]) : `{${key}}`,
  );
}

export const m = new Proxy(
  generatedMessages as unknown as Record<string, SimulatorMessageTranslator>,
  {
    get(target, propertyKey) {
      if (typeof propertyKey !== "string") {
        return Reflect.get(target, propertyKey);
      }

      const message = Reflect.get(target, propertyKey);
      if (typeof message === "function") {
        return message;
      }

      return (
        inputs: Record<string, unknown> = {},
        _options?: { locale?: Locale },
      ): LocalizedString => {
        const fallbackMessage = (enMessages as Record<string, unknown>)[propertyKey];
        if (typeof fallbackMessage === "string") {
          return renderWithValues(fallbackMessage, inputs);
        }

        return `[${propertyKey}]`;
      };
    },
  },
) as Record<string, SimulatorMessageTranslator>;
