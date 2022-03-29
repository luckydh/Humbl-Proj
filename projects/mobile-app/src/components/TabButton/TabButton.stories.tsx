import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";

import { TabButton, TabButtonProps } from "./TabButton";
import withPadding from "../../utils/withPadding";
import { SearchIcon } from "../../assets/svgs/SearchIcon";

export default {
  title: "Components/TabButton",
  component: TabButton,
  argTypes: {
    onClick: { action: "onClick" },
  },
  decorators: [withPadding],
} as Meta;

const Template: Story<TabButtonProps> = (args) => <TabButton {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  icon: <SearchIcon />,
  id: "search",
  title: "Search",
};
