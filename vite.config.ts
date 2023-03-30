import { resolve } from "path";
import { uglify } from "rollup-plugin-uglify";
import { defineConfig } from "vite";
import commonjs from "vite-plugin-commonjs";

export default defineConfig(() => {
  return {
    plugins: [commonjs()],
    build: {
      manifest: true,
      minify: true,
      reportCompressedSize: true,
      lib: {
        // Could also be a dictionary or array of multiple entry points
        entry: resolve(__dirname, "src/main.ts"),
        name: "Kelola Bayar Snap",
        // the proper extensions will be added
        fileName: "quix",
        formats: ["cjs", "es", "umd"],
      },
      commonjsOptions: {},
      rollupOptions: {
        plugins: [uglify()],
      },
    },
  };
});
