import { resolve } from "path";
import { defineConfig } from "vite";
import commonjs from "vite-plugin-commonjs";
import { ViteMinifyPlugin } from 'vite-plugin-minify';

export default defineConfig(() => {
  return {
    plugins: [commonjs(), ViteMinifyPlugin({})],
    build: {
      manifest: true,
      minify: true,
      reportCompressedSize: true,
      lib: {
        // Could also be a dictionary or array of multiple entry points
        entry: resolve(__dirname, "src/main.ts"),
        name: "Kelola Bayar Quix",
        // the proper extensions will be added
        fileName: "quix",
        formats: ["cjs", "es", "umd"],
      },
      commonjsOptions: {},
    },
  };
});
