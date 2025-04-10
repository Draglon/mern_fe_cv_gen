import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.config({
    extends: ["next/core-web-vitals", "next/typescript", "prettier"],
    rules: {
      semi: ["error"],
      quotes: ["error", "double"],
      "prefer-arrow-callback": ["error"],
      "prefer-template": ["error"],

      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/ban-ts-comment": "off",
      "no-restricted-imports": [
        "error",
        {
          "name": "next/link",
          "message": "Please import from `@/navigation` instead",
          "importNames": ["default"]
        },
        {
          "name": "next/navigation",
          "message": "Please import from `@/navigation` instead",
          "importNames": ["redirect", "permanentRedirect", "useRouter", "usePathname"]
        }
      ],
    }
  })
];

export default eslintConfig;
