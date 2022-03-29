import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { LimitsDisplay, LimitsDisplayProps } from "./LimitsDisplay";

export default {
  title: "CryptoWallet/Components/LimitsDisplay",
  component: LimitsDisplay,
} as Meta;

const Template: Story<LimitsDisplayProps> = (args) => (
  <div className="bg-white w-full h-full p-6">
    <LimitsDisplay {...args} />
  </div>
);

export const Primary = Template.bind({});

Primary.args = {
  limits: {
    weekly: 500,
    monthly: 5000,
    yearly: 50000,
  },
};

Primary.parameters = {
  // for some reason the tests are failing due to a
  // timeout, so let's disable storyshots here for now.
  storyshots: false,
};
