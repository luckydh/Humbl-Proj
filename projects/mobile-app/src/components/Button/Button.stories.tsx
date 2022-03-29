import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";

import { Button, ButtonProps } from "./Button";
import withPadding from "../../utils/withPadding";
import { withDesign } from "storybook-addon-designs";

export default {
  title: "Components/Button",
  component: Button,
  parameters: {
    design: {
      type: "figma",
      url:
        "https://www.figma.com/file/QPSFMyF0BndoFizvebnr9b/HUMBL-Pay-Mobile?node-id=539%3A307",
    },
  },
  argTypes: {
    children: { control: "text" },
    onClick: { action: "onClick" },
    variant: { control: "select" },
  },
  decorators: [withPadding, withDesign],
} as Meta;

const Template: Story<ButtonProps> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  children: "Button Text",
};
export const ButtonSquare = Template.bind({});
ButtonSquare.args = {
  variant: "square",
  children: "Button Text",
};
export const ButtonSmall = Template.bind({});
ButtonSmall.args = {
  size: "small",
  children: "Button Text",
};
export const ButtonLarge = Template.bind({});
ButtonLarge.args = {
  size: "large",
  children: "Button Text",
};
export const ButtonLargeSquare = Template.bind({});
ButtonLargeSquare.args = {
  size: "large",
  variant: "square",
  children: "Button Text",
};

export const ButtonText = Template.bind({});
ButtonText.args = {
  variant: "text",
  children: "Button Text",
};
export const ButtonOutline = Template.bind({});
ButtonOutline.args = {
  variant: "outline",
  children: "Button Text",
};
export const ButtonSubmit = Template.bind({});
ButtonSubmit.args = {
  type: "submit",
  children: "Button Text",
};
export const ButtonDisabled = Template.bind({});
ButtonDisabled.args = {
  isDisabled: true,
  children: "Button Text",
};
