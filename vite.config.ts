import { resolve } from "node:path";
import { defineConfig } from "vitest/config"; // vite 의 defineConfig + test 옵션 타입
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";
import svgr from "vite-plugin-svgr";
import cssInjectedByJs from "vite-plugin-css-injected-by-js";
import { playwright } from "@vitest/browser-playwright";
import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";

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
          entry: resolve(import.meta.dirname, "src/index.ts"),
          name: "DesignSystemApp",
          fileName: "index",
          formats: ["es"], // ES modules만 빌드
        },
        copyPublicDir: false, // public/ 의 데모 자산(vite.svg)이 dist 로 배포되지 않도록
        rolldownOptions: {
          external: [/^react($|\/)/, /^react-dom($|\/)/], // 하위 경로(react/jsx-runtime, react/compiler-runtime)도 번들에서 제외
        },
      },
    };
  }

  return {
    plugins: [react(), babel({ presets: [reactCompilerPreset()] }), svgr()],
    test: {
      projects: [
        {
          plugins: [
            // Storybook 설정의 스토리들을 테스트로 실행
            // https://storybook.js.org/docs/writing-tests/test-addon#storybooktest
            storybookTest({
              configDir: resolve(import.meta.dirname, ".storybook"),
            }),
          ],
          test: {
            name: "storybook",
            browser: {
              enabled: true,
              headless: true,
              provider: playwright(),
              instances: [{ browser: "chromium" }],
            },
          },
        },
      ],
    },
  };
});
