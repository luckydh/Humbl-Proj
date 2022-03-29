import React from "react";
import { Meta, Story } from "@storybook/react/types-6-0";
import { MockedProvider } from "@apollo/client/testing";
import { CryptoWithdrawScreen } from "./CryptoWithdrawScreen";

export default {
  title: "Cryptowallet/Screens/Withdraw Screen",
  component: CryptoWithdrawScreen,
} as Meta;

const Template: Story = () => (
  <MockedProvider mocks={[]} addTypename={false}>
    <CryptoWithdrawScreen onClose={() => {}} />
  </MockedProvider>
);

export const Example = Template.bind({});
Example.args = {};
