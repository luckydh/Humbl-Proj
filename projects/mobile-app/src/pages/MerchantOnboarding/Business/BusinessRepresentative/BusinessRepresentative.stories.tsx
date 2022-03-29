import React from "react";
import { Meta, Story } from "@storybook/react/types-6-0";
import { withDesign } from "storybook-addon-designs";
import withPadding from "utils/withPadding";

import { BusinessRepresentatveInformation } from "./BusinessRepresentativeInformation";
import { OnboardingFlowFormsProps } from "../../Individual/OnboardingFlowFormsProps";
import { Countries } from "../../../../utils/Countries";

export default {
  decorators: [withPadding, withDesign],
  title: "Merchants/Business/Representative",
  argTypes: {
    selectedCountry: { control: { type: "radio" } },
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/QPSFMyF0BndoFizvebnr9b/HUMBL-Pay-Mobile?node-id=792%3A25166",
    },
  },
  component: BusinessRepresentatveInformation,
} as Meta;

const Template: Story<OnboardingFlowFormsProps> = (args) => (
    <BusinessRepresentatveInformation
      selectedCountry={args.selectedCountry}
      onNextStep={() => {}}
    />
  );

export const RepresentativeUS = Template.bind({});
RepresentativeUS.args = {
  selectedCountry: Countries.US,
};
export const RepresentativeSG = Template.bind({});
RepresentativeSG.args = {
  selectedCountry: Countries.SG,
};
export const RepresentativeMX = Template.bind({});
RepresentativeMX.args = {
  selectedCountry: Countries.MX,
};
export const RepresentativeCA = Template.bind({});
RepresentativeCA.args = {
  selectedCountry: Countries.CA,
};
export const RepresentativeAU = Template.bind({});
RepresentativeAU.args = {
  selectedCountry: Countries.AU,
};
export const RepresentativeNZ = Template.bind({});
RepresentativeNZ.args = {
  selectedCountry: Countries.NZ,
};
export const RepresentativeEU = Template.bind({});
RepresentativeEU.args = {
  selectedCountry: Countries.EU,
};
