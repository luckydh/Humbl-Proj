import React from "react";
import { Meta, Story } from "@storybook/react/types-6-0";
import { BankInfoEditPage } from "./BankInfoEditPage";
import { MockedProvider } from "@apollo/client/testing";

export default {
  decorators: [],
  title: "Pages/Bank Info Edit Page",
  component: BankInfoEditPage,
  args: {},
} as Meta;

const Template: Story = (args) => (
    <MockedProvider mocks={[]} addTypename={false}>
      <BankInfoEditPage {...args} />
    </MockedProvider>
  );

export const ExamplePage = Template.bind({});
