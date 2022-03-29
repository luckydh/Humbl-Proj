import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";

import { Label, LabelProps } from "./Label";
import withPadding from "../../utils/withPadding";

export default {
  title: "Components/Label",
  component: Label,
  argTypes: {},
  decorators: [withPadding],
} as Meta;

const Template: Story<LabelProps> = (args) => <Label {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  children: "Label Text",
};
