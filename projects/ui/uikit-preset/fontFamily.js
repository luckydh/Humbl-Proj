const defaultTheme = require("tailwindcss/defaultTheme");

const fontFamily = {
  sans: ["Inter var", ...defaultTheme.fontFamily.sans],
  hando: ["Hando", ...defaultTheme.fontFamily.sans],
};

module.exports = fontFamily;
