import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";

import { Message, MessageProps } from "./Message";
import withPadding from "../../utils/withPadding";

export default {
  title: "Components/Message",
  component: Message,
  argTypes: {},
  decorators: [withPadding],
} as Meta;

const Template: Story<MessageProps> = (args) => <Message {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  children:
    "This is how an invalid input should be relayed to the user on this awesome app",
  variant: "error",
};
