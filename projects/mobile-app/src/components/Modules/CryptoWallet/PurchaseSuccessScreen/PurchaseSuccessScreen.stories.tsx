import React from "react";
import { Meta, Story } from "@storybook/react/types-6-0";
import withPadding from "utils/withPadding";
import { BitcoinLogoIcon } from "assets/icons";
import { PurchaseSuccessScreen, PurchaseSuccessScreenProps } from "./PurchaseSuccessScreen";

export default {
  title: "CryptoWallet/Screens/PurchaseSuccess",
  component: PurchaseSuccessScreen,
  decorators: [withPadding],
  parameters: {
    storyshots: false,
  },
} as Meta;

const Template: Story<PurchaseSuccessScreenProps> = (args) => <PurchaseSuccessScreen {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  title: "Your order is complete!",
  subTitle: "A confirmation email was sent to useremail@email.com. This transaction might take 3-5 days to process.",
  transactionId: "01234567889",
  price: 10,
  amount: 99,
  coin: "Bitcoin",
  coinName: "Bitcoin",
  logo: BitcoinLogoIcon,
};
