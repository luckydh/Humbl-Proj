// This is so we can use an ideal config in staging while
// without applying to CI lint as that would be too much change.
// Remove this temp config once the main eslintrc file is allowed
// to have the ideal config
module.exports = {
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "import"],
  ignorePatterns: "**/*/generated/*",
  extends: [
    "airbnb",
    "airbnb-typescript",
    "react-app",
    "eslint:recommended",
    "plugin:import/typescript",
    "plugin:prettier/recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  rules: {
    curly: "warn",
    "consistent-return": "off",
    "function-paren-newline": "off",
    "no-underscore-dangle": "off",
    "no-nested-ternary": "off",
    "import/no-named-as-default": "off",
    "import/prefer-default-export": "off",
    "import/no-cycle": "off",
    "jsx-a11y/click-events-have-key-events": "off",
    "jsx-a11y/no-static-element-interactions": "off",
    "import/order": "off",
    "no-console": "warn",
    "no-use-before-define": "off",
    "react/function-component-definition": [
      2,
      {
        namedComponents: ["function-declaration", "arrow-function"],
      },
    ],
    "react/jsx-uses-react": "off",
    "react/react-in-jsx-scope": "off",
    "no-param-reassign": ["warn", { props: true, ignorePropertyModificationsForRegex: ["^curr"] }],
    "no-warning-comments": ["warn", { terms: ["debug"], location: "anywhere" }],
    "react/button-has-type": "off",
    "react/jsx-props-no-spreading": "off",
    "react/no-unused-prop-types": "off",
    "react/prop-types": "off",
    "react/require-default-props": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/no-non-null-asserted-optional-chain": "off",
    "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_", ignoreRestSiblings: true }],
    "@typescript-eslint/no-use-before-define": ["error"],
    "@typescript-eslint/no-var-requires": "off",
    "import/no-extraneous-dependencies": [
      "error",
      {
        devDependencies: true,
      },
    ],
  },
  parserOptions: {
    project: ["./tsconfig.json", "./projects/*/tsconfig.json"],
  },
};
