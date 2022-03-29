import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import Input, { InputProps } from "./Input";

export default {
  title: "Core/Forms/Input",
  component: Input,
} as Meta;

const Template: Story<InputProps> = (args) => <Input {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  placeholder: "Placeholder Text",
};
export const WithLabel = Template.bind({});
WithLabel.args = {
  placeholder: "Placeholder Text",
  label: "This is a label",
};
export const Disabled = Template.bind({});
Disabled.args = {
  placeholder: "Placeholder Text",
  disabled: true,
};
