import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { withDesign } from "storybook-addon-designs";
import withPadding from "utils/withPadding";
import { Countries } from "utils/Countries";
import { OnboardingUpdateScreen, Props } from "./OnboardingUpdateScreen";
import { PersonRelationshipStatus } from "generated/graphql";
import { IonApp, IonPage } from "@ionic/react";

export default {
  decorators: [withPadding, withDesign],
  title: "Pages/OnboardingUpdate",
  argTypes: {
    selectedCountry: { control: { type: "radio" } },
  },
  component: OnboardingUpdateScreen,
} as Meta;

const Template: Story<Props> = (args) => (
    <IonApp>
      <IonPage className="p-6">
        <OnboardingUpdateScreen {...args} />
      </IonPage>
    </IonApp>
  );

const individualDetailsMissingData = {
  business: {
    type: "individual",
    missingFields: [
      { fieldName: "firstName" },
      { fieldName: "lastName" },
      { fieldName: "dob" },
      { fieldName: "govId" },
      {
        fieldName: "address",
        properties: ["street", "streetAdditional", "city", "region", "postal"],
      },
    ],
  },
  persons: [],
};

const businessDetailsMissingData = {
  business: {
    type: "company",
    missingFields: [
      { fieldName: "taxId" },
      {
        fieldName: "address",
        properties: ["street", "streetAdditional", "city", "region", "postal"],
      },
    ],
  },
  persons: [],
};

const representativeFieldsMissingData = {
  business: {
    type: "company",
    missingFields: [],
  },
  persons: [
    {
      id: "person_r_12345",
      name: "Test Representative",
      relationships: [PersonRelationshipStatus.Representative],
      missingFields: [
        { fieldName: "firstName" },
        { fieldName: "lastName" },
        { fieldName: "govId" },
        { fieldName: "email" },
        { fieldName: "dob", properties: ["day", "month", "year"] },
      ],
    },
  ],
};

const ownerFieldsMissingData = {
  business: {
    type: "company",
    missingFields: [],
  },
  persons: [
    {
      id: "person_o_12345",
      name: "Test Owner",
      relationships: [PersonRelationshipStatus.Owner],
      missingFields: [
        { fieldName: "firstName" },
        { fieldName: "lastName" },
        { fieldName: "govId" },
        { fieldName: "email" },
        { fieldName: "dob", properties: ["day", "month", "year"] },
      ],
    },
  ],
};

const allFieldsMissingData = {
  ...businessDetailsMissingData,
  persons: [...ownerFieldsMissingData.persons, ...representativeFieldsMissingData.persons],
};

// ========================== start US ==========================
export const IndividualDetailsMissingUS = Template.bind({});
IndividualDetailsMissingUS.args = {
  selectedCountry: Countries.US,
  data: individualDetailsMissingData,
};

export const BusinessDetailsMissingUS = Template.bind({});
BusinessDetailsMissingUS.args = {
  selectedCountry: Countries.US,
  data: businessDetailsMissingData,
};

export const RepresentativeFieldsMissingUS = Template.bind({});
RepresentativeFieldsMissingUS.args = {
  selectedCountry: Countries.US,
  data: representativeFieldsMissingData,
};

export const OwnerFieldsMissingUS = Template.bind({});
OwnerFieldsMissingUS.args = {
  selectedCountry: Countries.US,
  data: ownerFieldsMissingData,
};

export const AllFieldsMissingUS = Template.bind({});
AllFieldsMissingUS.args = {
  selectedCountry: Countries.US,
  data: allFieldsMissingData,
  requireBankingFields: true,
};
// =========================== end US ===========================

// ========================== start CA ==========================
export const IndividualDetailsMissingCA = Template.bind({});
IndividualDetailsMissingCA.args = {
  selectedCountry: Countries.CA,
  data: individualDetailsMissingData,
};

export const BusinessDetailsMissingCA = Template.bind({});
BusinessDetailsMissingCA.args = {
  selectedCountry: Countries.CA,
  data: businessDetailsMissingData,
};

export const RepresentativeFieldsMissingCA = Template.bind({});
RepresentativeFieldsMissingCA.args = {
  selectedCountry: Countries.CA,
  data: representativeFieldsMissingData,
};

export const OwnerFieldsMissingCA = Template.bind({});
OwnerFieldsMissingCA.args = {
  selectedCountry: Countries.CA,
  data: ownerFieldsMissingData,
};

export const AllFieldsMissingCA = Template.bind({});
AllFieldsMissingCA.args = {
  selectedCountry: Countries.CA,
  data: allFieldsMissingData,
  requireBankingFields: true,
};
// =========================== end CA ===========================

// ========================== start MX ==========================
export const IndividualDetailsMissingMX = Template.bind({});
IndividualDetailsMissingMX.args = {
  selectedCountry: Countries.MX,
  data: individualDetailsMissingData,
};

export const BusinessDetailsMissingMX = Template.bind({});
BusinessDetailsMissingMX.args = {
  selectedCountry: Countries.MX,
  data: businessDetailsMissingData,
};

export const RepresentativeFieldsMissingMX = Template.bind({});
RepresentativeFieldsMissingMX.args = {
  selectedCountry: Countries.MX,
  data: representativeFieldsMissingData,
};

export const OwnerFieldsMissingMX = Template.bind({});
OwnerFieldsMissingMX.args = {
  selectedCountry: Countries.MX,
  data: ownerFieldsMissingData,
};

export const AllFieldsMissingMX = Template.bind({});
AllFieldsMissingMX.args = {
  selectedCountry: Countries.MX,
  data: allFieldsMissingData,
  requireBankingFields: true,
};
// =========================== end MX ===========================

// ========================== start SG ==========================
export const IndividualDetailsMissingSG = Template.bind({});
IndividualDetailsMissingSG.args = {
  selectedCountry: Countries.SG,
  data: individualDetailsMissingData,
};

export const BusinessDetailsMissingSG = Template.bind({});
BusinessDetailsMissingSG.args = {
  selectedCountry: Countries.SG,
  data: businessDetailsMissingData,
};

export const RepresentativeFieldsMissingSG = Template.bind({});
RepresentativeFieldsMissingSG.args = {
  selectedCountry: Countries.SG,
  data: representativeFieldsMissingData,
};

export const OwnerFieldsMissingSG = Template.bind({});
OwnerFieldsMissingSG.args = {
  selectedCountry: Countries.SG,
  data: ownerFieldsMissingData,
};

export const AllFieldsMissingSG = Template.bind({});
AllFieldsMissingSG.args = {
  selectedCountry: Countries.SG,
  data: allFieldsMissingData,
  requireBankingFields: true,
};
// =========================== end SG ===========================

// ========================== start NZ ==========================
export const IndividualDetailsMissingNZ = Template.bind({});
IndividualDetailsMissingNZ.args = {
  selectedCountry: Countries.NZ,
  data: individualDetailsMissingData,
};

export const BusinessDetailsMissingNZ = Template.bind({});
BusinessDetailsMissingNZ.args = {
  selectedCountry: Countries.NZ,
  data: businessDetailsMissingData,
};

export const RepresentativeFieldsMissingNZ = Template.bind({});
RepresentativeFieldsMissingNZ.args = {
  selectedCountry: Countries.NZ,
  data: representativeFieldsMissingData,
};

export const OwnerFieldsMissingNZ = Template.bind({});
OwnerFieldsMissingNZ.args = {
  selectedCountry: Countries.NZ,
  data: ownerFieldsMissingData,
};

export const AllFieldsMissingNZ = Template.bind({});
AllFieldsMissingNZ.args = {
  selectedCountry: Countries.NZ,
  data: allFieldsMissingData,
  requireBankingFields: true,
};
// =========================== end NZ ===========================

// ========================== start AU ==========================
export const IndividualDetailsMissingAU = Template.bind({});
IndividualDetailsMissingAU.args = {
  selectedCountry: Countries.AU,
  data: individualDetailsMissingData,
};

export const BusinessDetailsMissingAU = Template.bind({});
BusinessDetailsMissingAU.args = {
  selectedCountry: Countries.AU,
  data: businessDetailsMissingData,
};

export const RepresentativeFieldsMissingAU = Template.bind({});
RepresentativeFieldsMissingAU.args = {
  selectedCountry: Countries.AU,
  data: representativeFieldsMissingData,
};

export const OwnerFieldsMissingAU = Template.bind({});
OwnerFieldsMissingAU.args = {
  selectedCountry: Countries.AU,
  data: ownerFieldsMissingData,
};

export const AllFieldsMissingAU = Template.bind({});
AllFieldsMissingAU.args = {
  selectedCountry: Countries.AU,
  data: allFieldsMissingData,
  requireBankingFields: true,
};
// =========================== end AU ===========================
