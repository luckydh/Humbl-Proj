import React from "react";
import { Meta, Story } from "@storybook/react/types-6-0";
import { withDesign } from "storybook-addon-designs";
import withPadding from "utils/withPadding";
import { IndividualBusinessDetails } from "./IndividualBusinessDetails";
import { Countries } from "../../../../utils/Countries";
import { OnboardingFlowFormsProps } from "../OnboardingFlowFormsProps";

export default {
  decorators: [withPadding, withDesign],
  title: "Merchants/Individual/Business Details",
  argTypes: {
    selectedCountry: { control: { type: "radio" } },
  },
  component: IndividualBusinessDetails,
} as Meta;

const Template: Story<OnboardingFlowFormsProps> = (args) => (
    <IndividualBusinessDetails onNextStep={() => {}} onFormChanged={() => {}} selectedCountry={args.selectedCountry} />
  );

export const BusinessDetails = Template.bind({});
BusinessDetails.args = {
  selectedCountry: Countries.EU,
};
BusinessDetails.parameters = {
  design: {
    type: "figma",
    url: "https://www.figma.com/file/QPSFMyF0BndoFizvebnr9b/HUMBL-Pay-Mobile?node-id=792%3A25166",
  },
};
