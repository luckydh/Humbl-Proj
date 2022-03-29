import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import Footer from ".";
import UpdatedFooter from "./Footer-v2";
import { MockedProvider } from "@apollo/client/testing";
import { useGetAccountByIdQueryMock } from "utils/test-helpers/random-users/randomUserMocks";
import { setCurrentAccountId } from "state/cache";
import withPadding from "utils/withPadding";

export default {
  title: "Components/Footers",
  component: Footer,
  decorators: [withPadding],
  argTypes: {},
} as Meta;

const Template: Story = ({ userPosition }) => {
  setCurrentAccountId("65");
  return (
    <MockedProvider mocks={[useGetAccountByIdQueryMock(userPosition)]} addTypename={false}>
      <Footer />
    </MockedProvider>
  );
};
const NewFooterTemplate: Story = ({ userPosition }) => {
  setCurrentAccountId("65");
  return (
    <MockedProvider mocks={[useGetAccountByIdQueryMock(userPosition)]} addTypename={false}>
      <UpdatedFooter />
    </MockedProvider>
  );
};

export const Primary = Template.bind({});
Primary.args = {
  userPosition: 65,
};
export const NewFooter = NewFooterTemplate.bind({});
NewFooter.args = {
  userPosition: 65,
};
