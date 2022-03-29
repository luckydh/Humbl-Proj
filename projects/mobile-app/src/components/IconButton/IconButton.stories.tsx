import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";

import { IconButton, IconButtonProps } from "./IconButton";
import withPadding from "../../utils/withPadding";

export default {
  title: "Components/IconButton",
  component: IconButton,
  argTypes: {
    onClick: { action: "clicked" },
  },
  decorators: [withPadding],
} as Meta;

const HomeIcon = () => (
    <svg width="26" height="24" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12.633 4.666l10.369 8.544a.25.25 0 01.019.108v8.655a1.171 1.171 0 01-1.154 1.154h-6.921v-6.923h-4.623v6.923H3.402a1.171 1.171 0 01-1.153-1.154V13.32a.273.273 0 01.009-.054.211.211 0 00.009-.054l10.366-8.546zM11.266.467a2.241 2.241 0 012.739 0l10.994 9.137c.12.094.192.235.199.387a.584.584 0 01-.124.423l-1.12 1.334a.622.622 0 01-.373.2h-.055a.553.553 0 01-.374-.124L12.626 3.09 2.054 11.927a.67.67 0 01-.433.124.614.614 0 01-.374-.2l-1.12-1.333a.588.588 0 01-.124-.424.521.521 0 01.2-.387z"
        fillRule="nonzero"
      />
    </svg>
  );

const Template: Story<IconButtonProps> = (args) => (
  <IconButton {...args}>
    <HomeIcon />
  </IconButton>
);

export const Outline = Template.bind({});
Outline.args = {
  variant: "outline",
};

export const Solid = Template.bind({});
Solid.args = {
  variant: "solid",
};
