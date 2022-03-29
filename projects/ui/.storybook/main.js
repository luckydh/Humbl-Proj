const process = require("process");

module.exports = {
  core: {
    builder: "webpack5",
  },
  webpackFinal: (config) => {
    config.resolve.modules.push(process.cwd() + "/node_modules");
    config.resolve.modules.push(process.cwd() + "/src");

    // this is needed for working w/ linked folders
    config.resolve.symlinks = false;
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
