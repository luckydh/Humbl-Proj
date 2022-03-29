import React from "react";
import { Meta, Story } from "@storybook/react";
import withPadding from "utils/withPadding";
import LoaderButton, { LoaderButtonTextProps } from "./LoaderButton";

const Template: Story<LoaderButtonTextProps> = (args) => <LoaderButton {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  text: "Find Tickets",
};

Primary.parameters = {
  storyshots: false,
};

export default {
  decorators: [withPadding],
  title: "Components/LoaderButton",
  component: LoaderButton,
} as Meta;
