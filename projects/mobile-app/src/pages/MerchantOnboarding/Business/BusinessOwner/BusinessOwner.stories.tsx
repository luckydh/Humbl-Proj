import React from "react";
import { Meta, Story } from "@storybook/react/types-6-0";
import { withDesign } from "storybook-addon-designs";
import withPadding from "utils/withPadding";
import { BusinessOwnerInformation } from "./BusinessOwnerInformation";
import { Countries } from "../../../../utils/Countries";
import { OnboardingFlowFormsProps } from "../../Individual/OnboardingFlowFormsProps";

export default {
  decorators: [withPadding, withDesign],
  title: "Merchants/Business/Owner",
  argTypes: {
    selectedCountry: { control: { type: "radio" } },
  },
  component: BusinessOwnerInformation,
} as Meta;

const Template: Story<OnboardingFlowFormsProps> = (args) => (
    <BusinessOwnerInformation
      selectedCountry={args.selectedCountry}
      onNextStep={() => {}}
    />
  );

export const Owner = Template.bind({});
Owner.args = {
  selectedCountry: Countries.US,
};
Owner.parameters = {
  design: {
    type: "figma",
    url: "https://www.figma.com/file/QPSFMyF0BndoFizvebnr9b/HUMBL-Pay-Mobile?node-id=792%3A25481",
  },
};

export const OwnerUS = Template.bind({});
OwnerUS.args = {
  selectedCountry: Countries.US,
};
export const OwnerSG = Template.bind({});
OwnerSG.args = {
  selectedCountry: Countries.SG,
};
export const OwnerMX = Template.bind({});
OwnerMX.args = {
  selectedCountry: Countries.MX,
};
export const OwnerCA = Template.bind({});
OwnerCA.args = {
  selectedCountry: Countries.CA,
};
export const OwnerAU = Template.bind({});
OwnerAU.args = {
  selectedCountry: Countries.AU,
};
export const OwnerNZ = Template.bind({});
OwnerNZ.args = {
  selectedCountry: Countries.NZ,
};
export const OwnerEU = Template.bind({});
OwnerEU.args = {
  selectedCountry: Countries.EU,
};
