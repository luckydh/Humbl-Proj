import React from "react";
import { Meta, Story } from "@storybook/react/types-6-0";
import { withDesign } from "storybook-addon-designs";
import withPadding from "utils/withPadding";
import BankingDetails from "./IndividualPayoutDetails";
import { Countries } from "../../../../utils/Countries";
import { OnboardingFlowFormsProps } from "../OnboardingFlowFormsProps";

export default {
  parameters: { storyshots: false },
  decorators: [withPadding, withDesign],
  title: "Merchants/Individual/Payout",
  component: BankingDetails,
  argTypes: {
    selectedCountry: { control: { type: "radio", options: Countries } },
  },
} as Meta;

const Template: Story<OnboardingFlowFormsProps> = (args) => <BankingDetails selectedCountry={args.selectedCountry} onNextStep={() => {}} onFormChanged={() => {}} />;

export const Payout = Template.bind({});
Payout.args = {
  selectedCountry: Countries.US,
};
Payout.parameters = {
  design: {
    type: "figma",
    url: "https://www.figma.com/file/QPSFMyF0BndoFizvebnr9b/HUMBL-Pay-Mobile?node-id=792%3A25166",
  },
};
