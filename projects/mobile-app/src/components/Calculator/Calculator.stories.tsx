import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { Calculator, CalculatorProps } from "./Calculator";
import withPadding from "utils/withPadding";

export default {
  title: "Components/Calculator",
  component: Calculator,
  argTypes: {},
  decorators: [withPadding],
} as Meta;

const Template: Story<CalculatorProps> = (args) => <Calculator {...args} />;

export const Default = Template.bind({});

Default.args = {};

export const Decimal = Template.bind({});

Decimal.args = {
  variant: "decimal",
};
