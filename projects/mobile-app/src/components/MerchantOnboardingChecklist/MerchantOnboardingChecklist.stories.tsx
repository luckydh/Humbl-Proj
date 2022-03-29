import React from "react";
import { Meta, Story } from "@storybook/react";

import withPadding from "../../utils/withPadding";
import { MerchantOnboardingChecklist, MerchantOnboardingChecklistProps } from "./MerchantOnboardingChecklist";
import { ChecklistStatus } from "./ChecklistStatus";

export default {
  title: "Components/MerchantOnboarding/Checklist",
  component: MerchantOnboardingChecklist,
  argTypes: {
    onClick: { action: "onClick" },
  },
  decorators: [withPadding],
} as Meta;

const Template: Story<MerchantOnboardingChecklistProps> = (args) => (
  <div className="container mx-auto">
    <MerchantOnboardingChecklist {...args} />
  </div>
);

export const BusinessDetailsPending = Template.bind({});
BusinessDetailsPending.args = {
  items: [
    {
      label: "Merchant Profile",
      status: ChecklistStatus.COMPLETE,
    },
    {
      label: "Business Details",
      status: ChecklistStatus.PENDING,
    },
    {
      label: "Bank Information",
      status: ChecklistStatus.LOCKED,
    },
  ],
};

export const BusinessDetailsPendingHiddenIcon = Template.bind({});
BusinessDetailsPendingHiddenIcon.args = {
  items: [
    {
      label: "Merchant Profile",
      status: ChecklistStatus.COMPLETE,
    },
    {
      label: "Business Details",
      status: ChecklistStatus.PENDING,
      hideIcon: true,
    },
    {
      label: "Bank Information",
      status: ChecklistStatus.LOCKED,
    },
  ],
};

export const BusinessDetailsError = Template.bind({});
BusinessDetailsError.args = {
  items: [
    {
      label: "Merchant Profile",
      status: ChecklistStatus.COMPLETE,
    },
    {
      label: "Business Details",
      status: ChecklistStatus.ERROR,
    },
    {
      label: "Bank Information",
      status: ChecklistStatus.LOCKED,
    },
  ],
};

export const BankInformationPending = Template.bind({});
BankInformationPending.args = {
  items: [
    {
      label: "Merchant Profile",
      status: ChecklistStatus.COMPLETE,
    },
    {
      label: "Business Details",
      status: ChecklistStatus.COMPLETE,
    },
    {
      label: "Bank Information",
      status: ChecklistStatus.PENDING,
    },
  ],
};

export const BusinessDetailsCurrent = Template.bind({});
BusinessDetailsCurrent.args = {
  items: [
    {
      label: "Merchant Profile",
      status: ChecklistStatus.COMPLETE,
    },
    {
      label: "Business Details",
      status: ChecklistStatus.CURRENT,
    },
    {
      label: "Bank Information",
      status: ChecklistStatus.LOCKED,
    },
  ],
};
