const process = require("process");

module.exports = {
  core: {
    builder: "webpack5",
  },
  webpackFinal: (config) => {
    config.resolve.modules.push(process.cwd() + "/node_modules");

    // this is needed for working w/ linked folders
    config.resolve.modules.push(process.cwd() + "/src");

    config.resolve.symlinks = false;

    // disable webpack eslint plugin on storybook as it conflicts with our stuff
    config.plugins = config.plugins.filter((plugin) => {
      if (plugin.constructor.name === "ESLintWebpackPlugin") {
        return false;
      }
      return true;
    });

    return config;
  },
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-knobs",
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/preset-create-react-app",
    "storybook-addon-designs",
  ],
};
