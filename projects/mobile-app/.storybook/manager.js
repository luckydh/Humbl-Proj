// .storybook/manager.js

import { addons } from "@storybook/addons";
import { themes } from "@storybook/theming";
import HumblTheme from "./HumblTheme";

addons.setConfig({
  theme: HumblTheme,
});
