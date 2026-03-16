import type { StorybookConfig } from "@storybook/sveltekit";

import { dirname } from "path";
import { fileURLToPath } from "url";
import { mergeConfig } from "vite";

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value: string) {
  return dirname(fileURLToPath(import.meta.resolve(`${value}/package.json`)));
}

const messagesDir = fileURLToPath(new URL("../messages", import.meta.url));
const lorcanaLocalizationDir = fileURLToPath(
  new URL("../../../lorcana/lorcana-cards/src/data", import.meta.url),
);

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(js|ts|svelte)"],
  addons: [
    getAbsolutePath("@storybook/addon-svelte-csf"),
    getAbsolutePath("@chromatic-com/storybook"),
    getAbsolutePath("@storybook/addon-vitest"),
    getAbsolutePath("@storybook/addon-a11y"),
    getAbsolutePath("@storybook/addon-docs"),
  ],
  framework: getAbsolutePath("@storybook/sveltekit"),
  async viteFinal(existingConfig) {
    return mergeConfig(existingConfig, {
      server: {
        fs: {
          allow: [messagesDir, lorcanaLocalizationDir],
        },
      },
      resolve: {
        alias: {
          "node:events": fileURLToPath(new URL("../src/lib/shims/node-events.ts", import.meta.url)),
        },
      },
    });
  },
};
export default config;
