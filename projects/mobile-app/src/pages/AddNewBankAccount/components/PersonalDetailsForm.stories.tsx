import React from "react";
import { Meta, Story } from "@storybook/react/types-6-0";
import { MockedProvider } from "@apollo/client/testing";
import { PersonalDetailsForm, AddPersonalDetailsPageProps } from "./PersonalDetailsForm";
import { Countries } from "../../../utils/Countries";
import withPadding from "../../../utils/withPadding";

export default {
  decorators: [withPadding],
  title: "Forms/Add New Bank Account/Add Personal Details Page",
  component: PersonalDetailsForm,
  args: {},
} as Meta;

const Template: Story<AddPersonalDetailsPageProps> = (args) => (
    <MockedProvider mocks={[]} addTypename={false}>
      <PersonalDetailsForm {...args} />
    </MockedProvider>
  );

export const ExamplePage = Template.bind({});
ExamplePage.args = {
  countryCode: Countries.US,
};
