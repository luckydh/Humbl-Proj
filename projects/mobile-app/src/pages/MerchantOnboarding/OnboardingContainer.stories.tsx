import React from "react";
import { Meta, Story } from "@storybook/react/types-6-0";
import withPadding from "utils/withPadding";
import { MockedProvider } from "@apollo/client/testing";
import { OnboardingContainer } from "./OnboardingContainer";
import { Countries } from "../../utils/Countries";

export default {
  decorators: [withPadding],
  title: "Pages/Onboarding",
  component: OnboardingContainer,
  argTypes: {
    selectedCountry: { control: { type: "radio" } },
  },
} as Meta;

const mocks: any = [];

const Template: Story = (args) => (
  <MockedProvider mocks={mocks} addTypename={false}>
    <div>
      <OnboardingContainer {...args} />
    </div>
  </MockedProvider>
);

export const Primary = Template.bind({});
Primary.args = {
  selectedCountry: Countries.US,
};
