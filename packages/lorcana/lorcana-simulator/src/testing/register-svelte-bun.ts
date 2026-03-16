import { compile, compileModule } from "svelte/compiler";

function compileSvelteComponent(source: string, filename: string): string {
  const { js } = compile(source, {
    filename,
    generate: "server",
  });

  return js.code;
}

function compileSvelteModule(source: string, filename: string): string {
  const jsSource = filename.endsWith(".ts")
    ? new Bun.Transpiler({ loader: "ts" }).transformSync(source)
    : source;
  const { js } = compileModule(jsSource, {
    filename,
    generate: "server",
  });

  return js.code;
}

Bun.plugin({
  name: "lorcana-simulator-svelte-test-loader",
  setup(build) {
    build.onLoad({ filter: /\.svelte$/ }, async (args) => {
      const source = await Bun.file(args.path).text();

      return {
        contents: compileSvelteComponent(source, args.path),
        loader: "js",
      };
    });

    build.onLoad({ filter: /\.svelte\.[jt]s$/ }, async (args) => {
      const source = await Bun.file(args.path).text();

      return {
        contents: compileSvelteModule(source, args.path),
        loader: "js",
      };
    });
  },
});
