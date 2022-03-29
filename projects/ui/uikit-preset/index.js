const colors = require("./colors");
const fontFamily = require("./fontFamily");
const plugins = require("./plugins");

module.exports = {
  prefix: "uikit-",
  theme: {
    extend: {
      colors,
      fontFamily,
      transformOrigin: {
        0: "0%",
      },
      zIndex: {
        "-1": "-1",
      },
    },
  },
  variants: {
    extend: {
      borderColor: ["focus-within"],
    },
  },
  plugins,
};
