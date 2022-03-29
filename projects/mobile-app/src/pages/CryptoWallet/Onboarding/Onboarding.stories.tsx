import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { withDesign } from "storybook-addon-designs";
import { Onboarding, OnboardingProps } from "./Onboarding";
import "./style.scss";
import { MockedProvider } from "@apollo/client/testing";
import { getFeaturesQueryMock } from "utils/test-helpers/featuresMocks";

export default {
  decorators: [withDesign],
  title: "CryptoWallet/Screens/Onboarding",
  component: Onboarding,
  parameters: {},
} as Meta;

const Template: Story<OnboardingProps & { mocks: any[] }> = ({ mocks, ...args }) => (
  <MockedProvider
    mocks={mocks ?? [getFeaturesQueryMock("humblPay-interestgaining-temp-091221", true)]}
    addTypename={false}>
    <Onboarding {...args} />
  </MockedProvider>
);

const defaultArgs = {
  setShouldShowOnBoardingBoolean: () => {},
};

export const Primary = Template.bind({});
Primary.args = defaultArgs;

export const InterestFeatureDisabled = Template.bind({});
InterestFeatureDisabled.args = {
  ...defaultArgs,
  mocks: [getFeaturesQueryMock("humblPay-interestgaining-temp-091221", false)],
};
