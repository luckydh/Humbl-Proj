import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { SuggestionButton, SuggestionButtonProps } from "./SuggestionButton";

export default {
  title: "CryptoWallet/Components/SuggestionButton",
  component: SuggestionButton,
} as Meta;

const Template: Story<SuggestionButtonProps> = (args) => (
  <div className="bg-white p-6">
    <SuggestionButton {...args} />
  </div>
);

export const Flat = Template.bind({});
Flat.args = {
  currencySymbol: "$",
  ariaLabel: "TESTFLATLABEL",
  suggestion: { type: "flat", value: 50 },
};

export const Max = Template.bind({});
Max.args = {
  ariaLabel: "TESTMAXLABEL",
  suggestion: { type: "max" },
};
