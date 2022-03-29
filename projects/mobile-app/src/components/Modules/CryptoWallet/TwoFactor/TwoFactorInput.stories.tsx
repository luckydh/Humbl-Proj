import React, { useState } from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { TwoFactorInput, TwoFactorInputProps } from "./TwoFactorInput";
import withPadding from "utils/withPadding";

export default {
  title: "CryptoWallet/Components/TwoFactorInput",
  component: TwoFactorInput,
  decorators: [withPadding],
} as Meta;

const Template: Story<TwoFactorInputProps> = (args) => {
  const [otp, setOtp] = useState("");
  const { value, onChange, ...newArgs } = args;

  return <TwoFactorInput value={otp} onChange={setOtp} {...newArgs} />;
};

export const Primary = Template.bind({});

Primary.args = {
  numInputs: 6,
  separator: <span>&nbsp;&nbsp;</span>,
  error: "",
};

export const ErrorInput = Template.bind({});

ErrorInput.args = {
  numInputs: 6,
  separator: <span>&nbsp;&nbsp;</span>,
  error: "The code in incorrect",
};
