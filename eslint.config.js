import { defineConfig, includeIgnoreFile } from "eslint/config";
import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import { reactRefresh } from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import storybook from "eslint-plugin-storybook";
import eslintConfigPrettier from "eslint-config-prettier/flat";
import { fileURLToPath, URL } from "node:url";

const gitignorePath = fileURLToPath(new URL(".gitignore", import.meta.url));

export default defineConfig(
  includeIgnoreFile(gitignorePath, "Imported .gitignore patterns"),

  // JavaScript
  js.configs.recommended,

  // TypeScript
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      globals: globals.browser,
    },
    extends: [reactHooks.configs.flat.recommended, reactRefresh.configs.vite()],
  },
  tseslint.configs.strict,
  tseslint.configs.stylistic,
  {
    // `...rest`로 키를 빼내는 구조 분해는 객체에서 키를 제외하는 용도로 쓴다.
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        { ignoreRestSiblings: true },
      ],
    },
  },

  // 스토리북
  storybook.configs["flat/recommended"],

  // 프리티어
  eslintConfigPrettier,
);
