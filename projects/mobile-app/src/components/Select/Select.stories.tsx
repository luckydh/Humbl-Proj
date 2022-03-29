import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import withPadding from "../../utils/withPadding";
import { Select, SelectProps } from "./Select";

export default {
  title: "Components/Select",
  component: Select,
  decorators: [withPadding],
} as Meta;

const Template: Story<SelectProps> = (args) => <Select {...args} />;

const options = [
  { label: "JavaScript", value: "js" },
  { label: "TypeScript", value: "ts" },
  { label: "C#", value: "csharp" },
];

export const Primary = Template.bind({});

Primary.args = {
  options,
};

export const WithPlaceholder = Template.bind({});

WithPlaceholder.args = {
  options,
  placeholder: "Select the Best Language",
};
