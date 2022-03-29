import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { TwoFactorBankInfo, TwoFactorBankInfoProps } from "./TwoFactorBankInfo";
import withPadding from "utils/withPadding";

export default {
  title: "CryptoWallet/Components/BankInfo",
  component: TwoFactorBankInfo,
  decorators: [withPadding],
} as Meta;

const Template: Story<TwoFactorBankInfoProps> = (args) => <TwoFactorBankInfo {...args} />;

export const Primary = Template.bind({});

Primary.args = {};
