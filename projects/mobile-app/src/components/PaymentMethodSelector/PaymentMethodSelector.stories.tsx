import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { withDesign } from "storybook-addon-designs";
import withPadding from "utils/withPadding";
import PaymentMethodSelector, { PaymentMethodSelectorProps } from "./PaymentMethodSelector";
import { CreditCard } from "__fixtures__/paymentMethods";

export default {
  decorators: [withDesign, withPadding],
  title: "Components/PaymentMethodSelector",
  component: PaymentMethodSelector,
} as Meta;

const Template: Story<PaymentMethodSelectorProps> = (args) => (
  <PaymentMethodSelector useLegacyPaymentMethodScreen {...args} />
);

export const Loading = Template.bind({});

Loading.args = {
  loading: true,
};

export const Empty = Template.bind({});

export const MethodSelected = Template.bind({});

MethodSelected.args = {
  selectedPaymentMethod: CreditCard,
};

export const MultipleMethods = Template.bind({});

MultipleMethods.args = {
  selectedPaymentMethod: CreditCard,
  paymentMethods: [
    CreditCard,
    { ...CreditCard, id: "4567", lastFour: "4567" },
    { ...CreditCard, id: "8910", lastFour: "8910" },
  ],
};
