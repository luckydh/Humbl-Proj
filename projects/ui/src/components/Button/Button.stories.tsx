import { Story, Meta } from "@storybook/react/types-6-0";
import { withDesign } from "storybook-addon-designs";
import { action } from "@storybook/addon-actions";
import { INITIAL_VIEWPORTS, MINIMAL_VIEWPORTS } from "@storybook/addon-viewport";

import { withPadding } from "utils/withPadding";

import { Button, ButtonProps } from "./Button";
import { ReactNode } from "react";

export default {
  title: "Button",
  component: Button,
  decorators: [withPadding, withDesign],
  args: {
    disabled: false,
    block: false,
    onClick: action("Click"),
  },
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

type StoryProps = ButtonProps & { children: ReactNode };

const Template: Story<StoryProps> = (args) => <Button {...args} />;

const GridTemplate: Story = () => (
  <div className="uikit-grid uikit-grid-cols-2 uikit-grid-rows-1 uikit-gap-4">
    <div>
      <Button type="primary">Primary</Button>
    </div>
    <div>
      <Button type="secondary">Secondary</Button>
    </div>
  </div>
);

export const Primary = Template.bind({});
Primary.args = {
  type: "primary",
  size: "sm",
  children: "Primary Button",
};

export const Secondary = Template.bind({});
Secondary.args = {
  type: "secondary",
  size: "sm",
  children: "Secondary Button",
};

export const Tertiary = Template.bind({});
Tertiary.args = {
  type: "tertiary",
  size: "sm",
  children: "Tertiary Button",
};

export const Link = Template.bind({});
Link.args = {
  type: "link",
  size: "sm",
  children: "Link Button",
};

export const Grid = GridTemplate.bind({});
