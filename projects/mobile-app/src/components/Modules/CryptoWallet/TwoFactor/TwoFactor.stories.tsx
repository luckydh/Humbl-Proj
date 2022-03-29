import React, { useState } from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { TwoFactor, TwoFactorProps } from "./TwoFactor";
import withPadding from "utils/withPadding";

export default {
  title: "CryptoWallet/Components/TwoFactor",
  component: TwoFactor,
  decorators: [withPadding],
} as Meta;

const Template: Story<TwoFactorProps> = (args) => {
  const [otp, setOtp] = useState("");

  const { value, onChange, ...newArgs } = args;

  return <TwoFactor value={otp} onChange={setOtp} {...newArgs} />;
};

export const Primary = Template.bind({});

Primary.args = {
  error: "",
  phoneNumber: "(123) 456-7890",
  twoFactorType: "BANK",
};

export const SMS = Template.bind({});

SMS.args = {
  error: "",
  phoneNumber: "(123) 456-7890",
  twoFactorType: "SMS",
};

export const ErrorStateSMS = Template.bind({});

ErrorStateSMS.args = {
  error: "The code in incorrect",
  twoFactorType: "SMS",
};

export const ErrorStateBank = Template.bind({});

ErrorStateBank.args = {
  error: "The code in incorrect",
  twoFactorType: "BANK",
};

export const BankTransfer = Template.bind({});

BankTransfer.args = {
  error: "",
  phoneNumber: "(123) 456-7890",
  twoFactorType: "BANK",
};
