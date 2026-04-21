import { plugin, file } from "bun";
await plugin({
  name: "Civet loader",
  async setup(builder) {
    const { compile } = await import("./main.mjs");
    return builder.onLoad({ filter: /\.civet$/ }, async ({ path }) => {
      const source = await file(path).text();
      let contents = await compile(source, { comptime: true });
      return {
        contents,
        loader: "tsx"
      };
    });
  }
});
