import { resolve } from "path";
import { defineConfig } from "vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";
import svgr from "vite-plugin-svgr";
import cssInjectedByJs from "vite-plugin-css-injected-by-js";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  if (mode === "lib") {
    return {
      plugins: [
        react(),
        babel({ presets: [reactCompilerPreset()] }),
        svgr(),
        cssInjectedByJs(), // CSS를 자동으로 JS에 인젝션
      ],
      build: {
        lib: {
          entry: resolve(__dirname, "src/index.ts"),
          name: "DesignSystemApp",
          fileName: "index",
          formats: ["es"], // ES modules만 빌드
        },
        rollupOptions: {
          external: ["react", "react-dom", "react-hook-form"],
          output: {
            globals: {
              react: "React",
              "react-dom": "ReactDOM",
              "react-hook-form": "ReactHookForm",
            },
          },
        },
      },
    };
  }

  return {
    plugins: [react(), babel({ presets: [reactCompilerPreset()] }), svgr()],
  };
});
