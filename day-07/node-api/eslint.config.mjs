import globals from "globals";

export default [
  {
    files: ["src/**/*.js", "test/**/*.js"],
    languageOptions: { ecmaVersion: "latest", sourceType: "commonjs", globals: globals.node },
    rules: {
      "no-unused-vars": ["error", { argsIgnorePattern: "^_", caughtErrorsIgnorePattern: "^_" }],
      "no-console": "off",
      "eqeqeq": "error",
      "curly": "error"
    }
  },
  { ignores: ["node_modules/**", "data/**"] }
];
