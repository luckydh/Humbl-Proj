import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { TwoFactorLanding, TwoFactorLandingProps, TwoFactorLandingType } from "./TwoFactorLanding";
import withPadding from "utils/withPadding";

export default {
  title: "CryptoWallet/Components/TwoFactorLanding",
  component: TwoFactorLanding,
  decorators: [withPadding],
} as Meta;

const Template: Story<TwoFactorLandingProps> = (args) => <TwoFactorLanding {...args} />;

export const BANK = Template.bind({});

BANK.args = {
  twoFactorType: TwoFactorLandingType.Bank,
};

export const SMS = Template.bind({});

SMS.args = {
  twoFactorType: TwoFactorLandingType.Sms,
};

export const BOTH = Template.bind({});

BOTH.args = {
  twoFactorType: TwoFactorLandingType.Both,
};
