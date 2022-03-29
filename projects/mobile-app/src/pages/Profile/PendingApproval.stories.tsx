import React from "react";
import { Meta, Story } from "@storybook/react/types-6-0";
import { MockedProvider } from "@apollo/client/testing";
import StripePendingApproval from "./StripePendingApproval";

export default {
  decorators: [],
  title: "Merchants/PendingApproval",
  component: StripePendingApproval,
  args: {},
} as Meta;

const mocks: any = [];

const Template: Story = (args) => (
  <MockedProvider mocks={mocks} addTypename={false}>
    <StripePendingApproval {...args} />
  </MockedProvider>
);

export const Primary = Template.bind({});
Primary.args = {};
