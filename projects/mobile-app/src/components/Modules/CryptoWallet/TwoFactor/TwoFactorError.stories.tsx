import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import withPadding from "utils/withPadding";
import { TwoFactorError, TwoFactorErrorProps } from "./TwoFactorError";

export default {
  title: "CryptoWallet/Components/TwoFactorError",
  component: TwoFactorError,
  decorators: [withPadding],
} as Meta;

const Template: Story<TwoFactorErrorProps> = (args) => <TwoFactorError {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  type: "WrongCode",
};

export const TooManyAttempts = Template.bind({});

TooManyAttempts.args = {
  type: "TooManyAttempts",
};

export const TimeOut = Template.bind({});
TimeOut.args = {
  type: "TimeOut",
};
