import React from "react";
import { Meta, Story } from "@storybook/react/types-6-0";
import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import { GetBanksDocument } from "generated/graphql";
import createApolloMock from "generated/createApolloMock";
import { bankListMock } from "./bankListMock";
import { BankListPage, SelectBankPageProps } from "./BankListPage";

export default {
  decorators: [],
  title: "Pages/BankListPage",
  component: BankListPage,
  args: {},
} as Meta;

const mockedBankList = createApolloMock(
  GetBanksDocument,
  {},
  {
    data: {
      getBanks: bankListMock,
    },
  },
  { addTypename: false }
);

const mockedBankListEmpty = createApolloMock(
  GetBanksDocument,
  {},
  {
    data: [],
  },
  { addTypename: false }
);

const mockedBankListLoading: MockedResponse = {
  request: { query: GetBanksDocument },
  result: { data: [] },
  delay: 100000000000000,
};

const Template: Story<SelectBankPageProps & { mocks: ReadonlyArray<MockedResponse> }> = ({ mocks, ...args }) => (
  <MockedProvider mocks={mocks ?? [mockedBankList]} addTypename={false}>
    <BankListPage {...args} />
  </MockedProvider>
);

export const Primary = Template.bind({});

export const Empty = Template.bind({});
Empty.args = {
  mocks: [mockedBankListEmpty],
};

export const Loading = Template.bind({});
Loading.args = {
  mocks: [mockedBankListLoading],
};
