import "../src/assets/compiled.css";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  // Set the viewports in Chromatic globally.
  chromatic: { viewports: [414] },
};
