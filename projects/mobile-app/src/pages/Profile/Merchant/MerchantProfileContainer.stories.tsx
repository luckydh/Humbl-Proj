import { MerchantProfileContainer } from "./MerchantProfileContainer";
import { MockedProvider } from "@apollo/client/testing";
import React from "react";
import { Meta } from "@storybook/react/types-6-0";
import { Story } from "@storybook/react";
import { useGetAccountByIdQueryMock } from "../../../utils/test-helpers/random-users/randomUserMocks";
import { setCurrentAccountId } from "../../../state/cache";
import { MyProfile } from "../MyProfile";

export default {
  decorators: [],
  title: "Pages/Merchant Profile Container",
  component: MerchantProfileContainer,
  args: {},
} as Meta;

type OptionsType = {
  averageRating: number;
  chargesEnabled: boolean;
  currentlyDueRequirements?: string[];
  hasBanking: boolean;
  hasOnboarded: boolean;
  pastDueRequirements?: string[];
  payoutsEnabled: boolean;
  requirementsDueDate?: string;
  totalReviewsCount: number;
};

const Template: Story<OptionsType> = ({
  averageRating,
  chargesEnabled,
  currentlyDueRequirements,
  hasBanking,
  hasOnboarded,
  pastDueRequirements,
  payoutsEnabled,
  requirementsDueDate,
  totalReviewsCount,
}) => {
  setCurrentAccountId("65");
  const options = {
    isMerchant: true,
    averageRating,
    reviews: { pageInfo: { totalCount: totalReviewsCount } },
    merchantProfileDetails: {
      businessDetails: {
        chargesEnabled,
        currentlyDueRequirements,
        hasBanking,
        hasOnboarded,
        pastDueRequirements,
        payoutsEnabled,
        requirementsDueDate,
      },
    },
  };
  const accountByIdQueryMock = useGetAccountByIdQueryMock(65, options);

  return (
    <MockedProvider mocks={[accountByIdQueryMock]} addTypename={false}>
      <MyProfile />
    </MockedProvider>
  );
};

export const UserDidNotFinishOnboarding = Template.bind({});
UserDidNotFinishOnboarding.args = {
  hasBanking: false,
  hasOnboarded: false,
  chargesEnabled: false,
  payoutsEnabled: false,
  averageRating: 0,
  totalReviewsCount: 0,
};

export const UserFinishedOnboardingAndHasReviews = Template.bind({});
UserFinishedOnboardingAndHasReviews.args = {
  hasBanking: true,
  hasOnboarded: true,
  chargesEnabled: true,
  payoutsEnabled: true,
  averageRating: 3.5,
  totalReviewsCount: 30,
};

export const UserFinishedOnboardingAndHasZeroReviews = Template.bind({});
UserFinishedOnboardingAndHasZeroReviews.args = {
  hasBanking: true,
  hasOnboarded: true,
  chargesEnabled: true,
  payoutsEnabled: true,
  averageRating: 0,
  totalReviewsCount: 0,
};

export const UserHasCurrentlyDueRequirements = Template.bind({});
UserHasCurrentlyDueRequirements.args = {
  hasOnboarded: true,
  hasBanking: true,
  chargesEnabled: true,
  payoutsEnabled: true,
  currentlyDueRequirements: ["external_account"],
  requirementsDueDate: "2021-08-15T13:45:30",
  averageRating: 3.5,
  totalReviewsCount: 30,
};

export const UserHasCurrentlyDueRequirementsNoPayouts = Template.bind({});
UserHasCurrentlyDueRequirementsNoPayouts.args = {
  hasOnboarded: true,
  hasBanking: true,
  chargesEnabled: true,
  payoutsEnabled: false,
  currentlyDueRequirements: ["external_account"],
  averageRating: 3.5,
  totalReviewsCount: 30,
  requirementsDueDate: "2021-08-15T13:45:30",
};

export const UserOnboardingIsPendingHasBankingNoPayouts = Template.bind({});
UserOnboardingIsPendingHasBankingNoPayouts.args = {
  hasOnboarded: true,
  hasBanking: true,
  chargesEnabled: true,
  payoutsEnabled: false,
};

export const UserOnboardingIsPendinghasBankingNoPayoutsNoPayments = Template.bind({});
UserOnboardingIsPendinghasBankingNoPayoutsNoPayments.args = {
  hasOnboarded: true,
  hasBanking: true,
  chargesEnabled: false,
  payoutsEnabled: false,
};

export const UserHasPastAndCurrentlyDueRequirements = Template.bind({});
UserHasPastAndCurrentlyDueRequirements.args = {
  hasOnboarded: true,
  hasBanking: false,
  chargesEnabled: false,
  payoutsEnabled: false,
  currentlyDueRequirements: ["external_account"],
  pastDueRequirements: ["external_account"],
  averageRating: 3.5,
  totalReviewsCount: 30,
};

export const UserHasPastAndCurrentlyDueRequirementsNoPayoutsNoPayments = Template.bind({});
UserHasPastAndCurrentlyDueRequirementsNoPayoutsNoPayments.args = {
  hasOnboarded: true,
  hasBanking: true,
  chargesEnabled: false,
  payoutsEnabled: false,
  currentlyDueRequirements: ["external_account"],
  pastDueRequirements: ["external_account"],
};

export const UserHasPastAndCurrentlyDueRequirementsNoPayouts = Template.bind({});
UserHasPastAndCurrentlyDueRequirementsNoPayouts.args = {
  hasOnboarded: true,
  hasBanking: true,
  chargesEnabled: true,
  payoutsEnabled: false,
  currentlyDueRequirements: ["external_account"],
  pastDueRequirements: ["external_account"],
};

export const DocumentVerificationRequired = Template.bind({});
DocumentVerificationRequired.args = {
  hasOnboarded: true,
  hasBanking: true,
  chargesEnabled: true,
  payoutsEnabled: false,
  currentlyDueRequirements: ["1sfsdf123.verification.document"],
  pastDueRequirements: ["1sfsdf123.verification.document"],
};

export const DocumentVerificationRequiredSoon = Template.bind({});
DocumentVerificationRequiredSoon.args = {
  hasOnboarded: true,
  hasBanking: true,
  chargesEnabled: true,
  payoutsEnabled: false,
  currentlyDueRequirements: ["1sfsdf123.verification.document"],
  requirementsDueDate: "2021-08-15T13:45:30",
  pastDueRequirements: [],
};

export const UserIsOnboardedHasNoBanking = Template.bind({});
UserIsOnboardedHasNoBanking.args = {
  hasOnboarded: true,
  hasBanking: false,
  chargesEnabled: true,
  payoutsEnabled: false,
};
