import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { KYC } from "./KYC";
import { MockedProvider } from "@apollo/client/testing";
import createApolloMock from "generated/createApolloMock";
import { UpdateKycInfoDocument } from "generated/graphql";

export default {
  title: "CryptoWallet/Screens/KYC",
  component: KYC,
} as Meta;

const updateKycInfoMock = createApolloMock(
  UpdateKycInfoDocument,
  {},
  {
    data: {
      enterKYCInfo: {
        confirmedUpload: true,
      },
    },
  }
);

const Template: Story = () => (
  <MockedProvider mocks={[updateKycInfoMock]} addTypename={false}>
    <KYC onClose={() => {}} />
  </MockedProvider>
);

export const Primary = Template.bind({});
