import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";

import Toggle, { ToggleProps } from "./Toggle";
import withPadding from "../../utils/withPadding";

export default {
  title: "Components/Toggle",
  component: Toggle,
  argTypes: {},
  decorators: [withPadding],
} as Meta;

const Template: Story<ToggleProps> = (args) => <Toggle {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  checked: true,
};
