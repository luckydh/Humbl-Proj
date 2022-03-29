import React from "react";
import { Meta, Story } from "@storybook/react/types-6-0";
import { MockedProvider } from "@apollo/client/testing";
import { MyProfile } from "./MyProfile";
import { useGetAccountByIdQueryMock } from "../../utils/test-helpers/random-users/randomUserMocks";
import { setCurrentAccountId } from "../../state/cache";

export default {
  decorators: [],
  title: "Pages/MyProfile",
  component: MyProfile,
  args: {},
} as Meta;

const Template: Story = ({ userPosition }) => {
  setCurrentAccountId("1234");
  return (
    <MockedProvider mocks={[useGetAccountByIdQueryMock(userPosition)]}>
      <MyProfile />
    </MockedProvider>
  );
};

export const profilePage = Template.bind({});

profilePage.args = {
  userPosition: 65,
};
