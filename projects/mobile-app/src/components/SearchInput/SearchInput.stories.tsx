import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";

import { SearchInput, SearchInputProps } from "./SearchInput";
import withPadding from "../../utils/withPadding";

export default {
  title: "Components/SearchInput",
  component: SearchInput,
  argTypes: {
    onClick: { action: "onClick" },
  },
  decorators: [withPadding],
} as Meta;

const Template: Story<SearchInputProps> = (args) => <SearchInput {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
