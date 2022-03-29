import React from "react";
import { Meta, Story } from "@storybook/react/types-6-0";

import withPadding from "../../utils/withPadding";
import SuccessMessage, { SuccessMessageProps } from "./SuccessMessage";

export default {
  title: "Components/SuccessMessage",
  component: SuccessMessage,
  argTypes: {
    onClick: { action: "onClick" },
  },
  decorators: [withPadding],
} as Meta;

const Template: Story<SuccessMessageProps> = (args) => <SuccessMessage {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
