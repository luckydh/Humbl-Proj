import React from "react";
import { Meta, Story } from "@storybook/react/types-6-0";
import { withDesign } from "storybook-addon-designs";
import withPadding from "utils/withPadding";
import IndividualDetails from "./IndividualDetails";
import { OnboardingFlowFormsProps } from "../OnboardingFlowFormsProps";
import { Countries } from "../../../../utils/Countries";

export default {
  decorators: [withPadding, withDesign],
  title: "Merchants/Individual/Details",
  argTypes: {
    selectedCountry: { control: { type: "radio" } },
  },
  component: IndividualDetails,
} as Meta;

const Template: Story<OnboardingFlowFormsProps> = (args) => (
    <IndividualDetails onNextStep={() => { }} selectedCountry={args.selectedCountry} onFormChanged={() => { }} />
  );

export const Details = Template.bind({});

Details.args = {
  selectedCountry: Countries.US,
};

Details.parameters = {
  design: {
    type: "figma",
    url: "https://www.figma.com/file/QPSFMyF0BndoFizvebnr9b/HUMBL-Pay-Mobile?node-id=792%3A24517",
  }
}
