import React from "react";
import { Meta, Story } from "@storybook/react/types-6-0";
import withPadding from "utils/withPadding";
import { OnboardingTasksContainer } from "./OnboardingTasksContainer";
import { MockedProvider } from "@apollo/client/testing";
import { useGetAccountByIdQueryMock } from "utils/test-helpers/random-users/randomUserMocks";
import { setCurrentAccountId } from "state/cache";
import { RecoilRoot } from "recoil";
import createApolloMock from "generated/createApolloMock";
import { MembershipStatus, GetMyPaymentMethodsDocument, PaymentMethodCategory } from "generated/graphql";
import { getFeaturesQueryMock } from "utils/test-helpers/featuresMocks";

export default {
  title: "OnboardingTasks",
  component: OnboardingTasksContainer,
  decorators: [withPadding],
} as Meta;

const plaidEnabledMock = getFeaturesQueryMock("ach-feature-redux-121521", true);

const noPaymentMethodsMock = createApolloMock(
  GetMyPaymentMethodsDocument,
  {},
  {
    data: {
      paymentMethods: [],
    },
  }
);

const withPaymentMethodsMock = createApolloMock(
  GetMyPaymentMethodsDocument,
  { paymentMethodCategory: PaymentMethodCategory.Ach },
  {
    data: {
      paymentMethods: [{ someData: true }],
    },
  }
);

const defaultArgs = {
  mocks: [noPaymentMethodsMock, plaidEnabledMock],
  kycNeeded: true,
};

const Template: Story<{ mocks: any[]; kycNeeded?: boolean; kycStatus?: MembershipStatus }> = (args) => {
  const accountId = 65;
  setCurrentAccountId(String(accountId));
  const accountStatusMock = useGetAccountByIdQueryMock(accountId, {
    kycNeeded: args.kycNeeded,
    kycStatus: { status: args.kycStatus },
  });
  return (
    <RecoilRoot>
      <MockedProvider mocks={[accountStatusMock, ...args.mocks]} addTypename={false}>
        <OnboardingTasksContainer />
      </MockedProvider>
    </RecoilRoot>
  );
};

export const Primary = Template.bind({});
Primary.args = defaultArgs;

export const PlaidDisabled = Template.bind({});
PlaidDisabled.args = {
  ...defaultArgs,
  mocks: [noPaymentMethodsMock],
};

export const PlaidEnabledWithPaymentMethods = Template.bind({});
PlaidEnabledWithPaymentMethods.args = {
  ...defaultArgs,
  mocks: [withPaymentMethodsMock, plaidEnabledMock],
};

export const KYCPending = Template.bind({});
KYCPending.args = {
  ...defaultArgs,
  kycStatus: MembershipStatus.Pending,
};

export const KYCActionsNeeded = Template.bind({});
KYCActionsNeeded.args = {
  ...defaultArgs,
  kycStatus: MembershipStatus.ActionsNeeded,
};

export const KYCOpen = Template.bind({});
KYCOpen.args = {
  ...defaultArgs,
  kycStatus: MembershipStatus.Open,
};

export const KYCNotNeeded = Template.bind({});
KYCNotNeeded.args = {
  ...defaultArgs,
  kycNeeded: false,
  kycStatus: MembershipStatus.Approved,
};
