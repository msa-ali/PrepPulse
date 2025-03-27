import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import prettier from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";

export default tseslint.config(
  { ignores: ["dist", "node_modules"] }, // Ignore dist and node_modules
  {
    extends: [
      js.configs.recommended, // Base JS rules
      ...tseslint.configs.recommended, // TypeScript rules
      prettierConfig, // Disables rules that conflict with Prettier
    ],
    files: ["**/*.{ts,tsx,js,jsx}"], // Include JS and TS files
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.browser, // Browser globals
        ...globals.node, // Node.js globals (for scripts)
        ...globals.jest, // Vitest/Jest globals (for tests)
      },
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      prettier: prettier, // Prettier as an ESLint plugin
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "prettier/prettier": "off", // Enforces Prettier formatting
      "@typescript-eslint/no-unused-vars": "off", // Disable for TypeScript files
      "no-unused-vars": "off",
    },
  },
);
