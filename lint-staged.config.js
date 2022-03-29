const micromatch = require("micromatch");

module.exports = {
  "*.{ts,tsx}": (files) => {
    const match = micromatch.not(files, "**/*/src/generated/*");

    return [
      // note the lint-staged-temp-eslint config file is just temporary until
      // the app is fully updated and .eslintrc can be used without the disabled rules

      // `eslint ${match.join(" ")} --no-eslintrc -c ./lint-staged-temp-eslint.config.js --fix --max-warnings=0`,
      `eslint ${match.join(" ")} --fix --max-warnings=0`,
      `prettier ${match.join(" ")} --write`,
    ];
  },
};
