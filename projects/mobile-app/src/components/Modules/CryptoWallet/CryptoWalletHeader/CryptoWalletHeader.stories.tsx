import React from "react";
import { Story, Meta } from "@storybook/react";
import { withDesign } from "storybook-addon-designs";
import { MockedProvider } from "@apollo/client/testing";
import { range } from "lodash";

import { CryptoWalletHeader, CryptoWalletHeaderProps } from "./CryptoWalletHeader";
import { LayoutPrimary } from "components/PageTemplates/LayoutPrimary";
import { IntersectionDetector } from "components/common";

export default {
  title: "Components/CryptoWalletHeader",
  component: CryptoWalletHeader,
  decorators: [withDesign],
} as Meta;

const Template: Story<CryptoWalletHeaderProps> = (args) => (
  <MockedProvider>
    <CryptoWalletHeader {...args} />
  </MockedProvider>
);

export const Primary = Template.bind({});
Primary.args = {
  balance: 815,
  currencyCode: "USD",
};

const LayoutTemplate: Story<CryptoWalletHeaderProps> = (args) => (
  <MockedProvider>
    <LayoutPrimary>
      <div className="h-full">
        <IntersectionDetector>
          <CryptoWalletHeader {...args} />
        </IntersectionDetector>
        <div>
          <h1 className="text-white text-2xl mt-2 text-center">Dummy data</h1>
          {range(20).map((num) => (
            <div className="py-10 w-full bg-blue" key={num}>
              <h2 className="text-white text-lg text-center">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptate sapiente ratione, optio aliquid
                magni inventore sed quia omnis repellat aspernatur necessitatibus magnam hic pariatur. Perspiciatis
                dolorem quam ullam sed sint?
              </h2>
            </div>
          ))}
        </div>
      </div>
    </LayoutPrimary>
  </MockedProvider>
);

export const WithLayout = LayoutTemplate.bind({});

WithLayout.args = {
  balance: 2000,
  currencyCode: "USD",
};

WithLayout.parameters = {
  design: {
    type: "figma",
    url: "https://www.figma.com/file/QPSFMyF0BndoFizvebnr9b/HUMBL-Pay-Mobile?node-id=5642%3A70091",
  },
};
