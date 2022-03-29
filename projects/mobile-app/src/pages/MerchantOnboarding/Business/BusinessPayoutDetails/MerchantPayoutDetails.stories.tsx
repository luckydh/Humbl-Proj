import React from "react";
import { Meta, Story } from "@storybook/react/types-6-0";
import { withDesign } from "storybook-addon-designs";
import withPadding from "utils/withPadding";
import BankingDetails from "../../Individual/IndividualPayoutDetails/IndividualPayoutDetails";
import { OnboardingFlowFormsProps } from "../../Individual/OnboardingFlowFormsProps";
import { Countries } from "../../../../utils/Countries";

export default {
  parameters: { storyshots: false },
  decorators: [withPadding, withDesign],
  title: "Merchants/Business/Payout",
  component: BankingDetails,
  argTypes: {
    selectedCountry: { control: { type: "radio" } },
  },
} as Meta;

const Template: Story<OnboardingFlowFormsProps> = (args) => <BankingDetails selectedCountry={args.selectedCountry} onNextStep={() => {}} />;

export const Payout = Template.bind({});
Payout.args = {
  selectedCountry: Countries.EU,
};
Payout.parameters = {
  design: {
    type: "figma",
    url: "https://www.figma.com/file/QPSFMyF0BndoFizvebnr9b/HUMBL-Pay-Mobile?node-id=792%3A25166",
  },
};

export const BankingUS = Template.bind({});
BankingUS.args = {
  selectedCountry: Countries.US,
};
export const BankingSG = Template.bind({});
BankingSG.args = {
  selectedCountry: Countries.SG,
};
export const BankingMX = Template.bind({});
BankingMX.args = {
  selectedCountry: Countries.MX,
};
export const BankingCA = Template.bind({});
BankingCA.args = {
  selectedCountry: Countries.CA,
};
export const BankingAU = Template.bind({});
BankingAU.args = {
  selectedCountry: Countries.AU,
};
export const BankingNZ = Template.bind({});
BankingNZ.args = {
  selectedCountry: Countries.NZ,
};
export const BankingEU = Template.bind({});
BankingEU.args = {
  selectedCountry: Countries.EU,
};
