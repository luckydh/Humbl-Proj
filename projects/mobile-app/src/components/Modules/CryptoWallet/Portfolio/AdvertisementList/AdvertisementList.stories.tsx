import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { withDesign } from "storybook-addon-designs";
import { AdvertisementList, AdvertisementListProps } from ".";
import { WidgetContainer } from "components/Modules/Widgets/WidgetContainer";
import { MockedProvider } from "@apollo/client/testing";
import { getFeaturesQueryMock } from "utils/test-helpers/featuresMocks";
import { RecoilRoot } from "recoil";
import { CoinGainingInterestData } from "../../InterestGainAssets/CoinsGainingInterest/mock";

export default {
  decorators: [withDesign],
  title: "CryptoWallet/Components/Portfolio/AdvertisementList",
  component: AdvertisementList,
  parameters: {
    storyshots: false,
  },
} as Meta;

// eslint-disable-next-line
const Template: Story<AdvertisementListProps & { mocks: any[] }> = ({ mocks, ...args }) => (
  <RecoilRoot>
    <MockedProvider
      mocks={mocks ?? [getFeaturesQueryMock("humblPay-interestgaining-temp-091221", true)]}
      addTypename={false}
    >
      <ul>
        <WidgetContainer ariaLabel="ADVERTISEMENT_LIST_WIDGET_CONTAINER">
          <AdvertisementList {...args} />
        </WidgetContainer>
      </ul>
    </MockedProvider>
  </RecoilRoot>
);

export const AdvertisementWithNoGain = Template.bind({});
AdvertisementWithNoGain.args = {
  totalInterestGained: 0,
  interestAssets: {},
};

export const AdvertisementWithGaining = Template.bind({});
AdvertisementWithGaining.args = {
  hasGain: true,
  totalInterestGained: 0.0012767898765,
  interestAssets: CoinGainingInterestData,
};
