import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { SupportedCardProviders } from "./SupportedCardProviders";
import withPadding from "../../utils/withPadding";

export default {
  title: "Components/SupportedCardProviders",
  component: SupportedCardProviders,
  decorators: [withPadding],
} as Meta;

const Template: Story = () => <SupportedCardProviders />;

export const Primary = Template.bind({});
