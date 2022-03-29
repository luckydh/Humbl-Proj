import { Story, Meta } from "@storybook/react/types-6-0";
import { INITIAL_VIEWPORTS, MINIMAL_VIEWPORTS } from "@storybook/addon-viewport";
import { withPadding } from "utils/withPadding";
import { List } from "./List";
import { ListItem } from "./ListItem";

export default {
  title: "List",
  component: List,
  decorators: [withPadding],
  parameters: {
    backgrounds: {
      default: "white",
      values: [{ name: "white", value: "#ffffff" }],
    },
    design: {
      type: "figma",
      url: "https://www.figma.com/file/QPSFMyF0BndoFizvebnr9b/HUMBL-Pay-Mobile?node-id=10332%3A100263",
    },
    viewport: {
      viewports: { ...INITIAL_VIEWPORTS, ...MINIMAL_VIEWPORTS },
      defaultViewport: "mobile1",
    },
  },
} as Meta;

const languages = ["English", "Español", "Português", "Français"];

const Primary: Story = () => (
  <div>
    <List>
      {languages.map((language) => (
        <ListItem key={language}>
          <div key={language} className="uikit-flex uikit-justify-between">
            <div>{language}</div>
            <input type="radio" className="appearance-none" />
          </div>
        </ListItem>
      ))}
    </List>
  </div>
);

export const ListItems = Primary.bind({});
