import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";

import { UserItem, UserItemProps } from "./UserItem";
import withPadding from "../../utils/withPadding";

export default {
  title: "Components/UserItem",
  component: UserItem,
  argTypes: {
    onClick: { action: "clicked" },
  },
  decorators: [withPadding],
} as Meta;

const Template: Story<UserItemProps> = (args) => <UserItem {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  src:
    "https://www.zooportraits.com/wp-content/uploads/2018/05/Harbor-Seal-Phoca-Vitulina.jpg",
  userName: "marina.soto",
  name: "Marina Sotomayour",
};
