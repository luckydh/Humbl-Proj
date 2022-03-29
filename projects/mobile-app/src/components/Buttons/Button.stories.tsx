import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import Button, { ButtonProps } from "./Button";

export default {
  title: "Core/Button",
  component: Button,
} as Meta;

const Template: Story<ButtonProps> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  label: "Button",
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
  label: "Button",
};

export const Longer = Template.bind({});
Longer.args = {
  label: "Longer Button Text",
};
