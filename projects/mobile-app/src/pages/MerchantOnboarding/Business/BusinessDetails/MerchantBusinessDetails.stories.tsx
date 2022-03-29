import React from "react";
import { Meta, Story } from "@storybook/react/types-6-0";
import { withDesign } from "storybook-addon-designs";
import withPadding from "utils/withPadding";
import { MerchantBusinessDetails } from "./MerchantBusinessDetails";
import { OnboardingFlowFormsProps } from "../../Individual/OnboardingFlowFormsProps";
import { Countries } from "../../../../utils/Countries";

export default {
  decorators: [withPadding, withDesign],
  title: "Merchants/Business/Details",
  component: MerchantBusinessDetails,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/QPSFMyF0BndoFizvebnr9b/HUMBL-Pay-Mobile?node-id=792%3A25166",
    },
  },
  argTypes: {
    selectedCountry: { control: { type: "radio" } },
  },
} as Meta;

const Template: Story<OnboardingFlowFormsProps> = (args) => (
    <MerchantBusinessDetails
      selectedCountry={args.selectedCountry}
      onNextStep={() => {}}
    />
  );

export const BusinessDetailsUS = Template.bind({});
BusinessDetailsUS.args = {
  selectedCountry: Countries.US,
};
export const BusinessDetailsSG = Template.bind({});
BusinessDetailsSG.args = {
  selectedCountry: Countries.SG,
};
export const BusinessDetailsMX = Template.bind({});
BusinessDetailsMX.args = {
  selectedCountry: Countries.MX,
};
export const BusinessDetailsCA = Template.bind({});
BusinessDetailsCA.args = {
  selectedCountry: Countries.CA,
};
export const BusinessDetailsAU = Template.bind({});
BusinessDetailsAU.args = {
  selectedCountry: Countries.AU,
};
export const BusinessDetailsNZ = Template.bind({});
BusinessDetailsNZ.args = {
  selectedCountry: Countries.NZ,
};
export const BusinessDetailsEU = Template.bind({});
BusinessDetailsEU.args = {
  selectedCountry: Countries.EU,
};
