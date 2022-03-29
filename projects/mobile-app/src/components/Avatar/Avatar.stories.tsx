import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";

import { Avatar, AvatarProps } from "./Avatar";
import withPadding from "../../utils/withPadding";

export default {
  title: "Components/Avatar",
  component: Avatar,
  argTypes: {},
  decorators: [withPadding],
} as Meta;

const Template: Story<AvatarProps> = (args) => <Avatar {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  src:
    "https://www.zooportraits.com/wp-content/uploads/2018/05/Harbor-Seal-Phoca-Vitulina.jpg",
};
