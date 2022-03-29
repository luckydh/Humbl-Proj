import { MockedProvider } from "@apollo/client/testing";
import React from "react";
import { Meta } from "@storybook/react/types-6-0";
import { Story } from "@storybook/react";
import ProfileEdit from "./ProfileEdit";
import {
  useGetAccountByIdQueryMock,
  useMeQueryMock,
  useMyUserProfileQueryMock,
} from "../../utils/test-helpers/random-users/randomUserMocks";

export default {
  decorators: [],
  title: "Pages/Profile Edit",
  component: ProfileEdit,
  args: {},
} as Meta;

const Template: Story = (args) => (
    <>
      <MockedProvider
        mocks={[
          useGetAccountByIdQueryMock(args.userPosition),
          useMeQueryMock(args.userPosition),
          useMyUserProfileQueryMock(args.userPosition),
        ]}
        addTypename={false}
      >
        <ProfileEdit />
      </MockedProvider>
    </>
  );

export const Example = Template.bind({});
Example.args = {
  userPosition: 65,
};
