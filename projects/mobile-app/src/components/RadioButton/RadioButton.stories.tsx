import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { RadioButton, RadioButtonProps } from "./RadioButton";
import withPadding from "../../utils/withPadding";

export default {
  title: "Components/RadioButton",
  component: RadioButton,
  decorators: [withPadding],
} as Meta;

const Template: Story<RadioButtonProps> = (args) => <RadioButton {...args} />;
export const Primary = Template.bind({});
Primary.args = {};
