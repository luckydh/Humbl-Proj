const defaultTheme = require("tailwindcss/defaultTheme");
const uiKitPreset = require("@humbl/uikit/uikit-preset");

module.exports = {
  presets: [uiKitPreset],
  prefix: "",
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  mode: "jit",
  darkMode: "media", // or 'media' or 'class'
  theme: {
    minWidth: {
      0: "0",
      "1/4": "25%",
      "1/2": "50%",
      "3/4": "75%",
      full: "100%",
    },
    extend: {
      screens: {
        sm: "375px",
        app_sm: "320px",
        app_md: "360px",
        app_lg: "411px",
      },
      fontSize: {
        xxs: ["0.65rem", "0.65rem"],
      },
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
        hando: ["Hando", ...defaultTheme.fontFamily.sans],
      },
      backgroundImage: () => ({
        banner: "url('/src/assets/svgs/banner-bg.svg')",
        interestCardBackground: "url('/src/assets/svgs/InterestCardBackground.svg')",
        onboardingBackground: "url('/src/assets/svgs/OnboardingBackground.svg')",
        ellipse: "url('/src/assets/svgs/ellipse.svg')",
        ellipseSolid: "url('/src/assets/svgs/ellipse-solid.svg')",
        etxCardBackground: "url('/src/assets/svgs/EtxCardBackground.svg')",
      }),
      boxShadow: {
        "button-active": "inset 0 0 0 2px rgb(var(--blue-dark))",
        "button-outline": "inset 0 0 0 2px white",
        "input-error": "inset 0 0 0 2px var(--red)",
      },
      colors: {
        "light-bright-blue": "var(--light-bright-blue)",
        "bright-blue": "var(--bright-blue)",
        "blue-light": "var(--blue-light)",
        blue: "var(--blue)",
        "blue-lightest": "var(--blue-lightest)",
        "blue-lightest2": "var(--blue-lightest2)",
        "blue-dark": "rgb(var(--blue-dark))",
        "blue-dark2": "var(--blue-dark2)",
        "blue-dark-opaque": "rgb(var(--blue-dark),0.8)",
        "red-light": "var(--red-light)",
        red: "var(--red)",
        "grey-light": "var(--grey-light)",
        green: {
          positive: "#24c08b",
        },
        "red-failed": "var(--red-failed)",
        "white-faded": "var(--white-faded)",
        "blue-lightest3": "var(--blue-lightest3)",
        "blue-dark3": "var(--blue-dark3)",
        grey: {
          DEFAULT: "var(--grey)",
        },
        "blue-lightest4": "var(--blue-lightest4)",
        yellow: "#c99a00",
        "yellow-light": "#edd888",
      },
      transitionDelay: {
        "item-1": "100ms",
        "item-2": "200ms",
        "item-3": "300ms",
        "item-4": "400ms",
        "item-5": "500ms",
        "item-6": "600ms",
      },
      spacing: {
        45: "45px",
      },
      placeholderColor: {
        "blue-dark": "rgb(var(--blue-dark), 0.6)",
      },
    },
  },
  variants: {
    extend: {
      margin: ["first", "last"],
      opacity: ["disabled"],
      boxShadow: ["active"],
      textColor: ["active"],
      backgroundColor: ["active"],
      borderWidth: ["last"],
    },
  },
  plugins: [
    // require("@tailwindcss/forms"),
    // require("@tailwindcss/typography"),
    // require("@tailwindcss/aspect-ratio"),
    // require("@tailwindcss/line-clamp"),
  ],
};
