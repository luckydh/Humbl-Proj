import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import withPadding from "utils/withPadding";
import { CreditCardCheckbox, CreditCardCheckboxProps } from "./CreditCardCheckbox";
import { CardBrandsObject } from "__fixtures__/paymentMethods";

export default {
  title: "CryptoWallet/Components/CreditCardCheckbox",
  component: CreditCardCheckbox,
  decorators: [withPadding],
} as Meta;

const Template: Story<CreditCardCheckboxProps> = (args) => <CreditCardCheckbox {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  card: CardBrandsObject.visa,
};

export const Selected = Template.bind({});
Selected.args = {
  card: CardBrandsObject.visa,
  selected: true,
};

export const CVVLength4 = Template.bind({});
CVVLength4.args = {
  card: CardBrandsObject.amex,
  selected: true,
};
