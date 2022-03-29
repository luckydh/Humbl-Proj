import React from "react";
import { Meta, Story } from "@storybook/react/types-6-0";
import { MockedProvider } from "@apollo/client/testing";
import SwitchAccounts from "./SwitchAccounts";
import { setCurrentAccountId } from "../../state/cache";
import { useMyAccountQueryMock } from "../../utils/test-helpers/random-users/randomUserMocks";
import { useRandomTestUser } from "../../utils/test-helpers/random-users/useRandomTestUser";

export default {
  decorators: [],
  title: "Pages/SwitchAccounts",
  component: SwitchAccounts,
  args: {},
} as Meta;

const Template: Story = (args) => {
  const myAccountQueryMock = useMyAccountQueryMock(args.accounts);
  const { user } = useRandomTestUser(args.accounts[0]);
  setCurrentAccountId(user.login.uuid);
  return (
    <MockedProvider mocks={[myAccountQueryMock]} addTypename={false}>
      <SwitchAccounts {...args} />
    </MockedProvider>
  );
};

export const SwitchableAccount = Template.bind({});
SwitchableAccount.args = {
  accounts: [10, 15, 20, 25, 30, 35, 40],
};
