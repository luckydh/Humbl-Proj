import React from "react";
import { Meta, Story } from "@storybook/react/types-6-0";
import { MockedProvider } from "@apollo/client/testing";
import withPadding from "../../../utils/withPadding";
import { Countries } from "../../../utils/Countries";
import { BankDetailsForm, BankDetailsFormProps } from "./BankDetailsForm";

export default {
  decorators: [withPadding],
  title: "Forms/Add New Bank Account/Bank Details Form",
  component: BankDetailsForm,
  args: {},
} as Meta;

const Template: Story<BankDetailsFormProps> = (args) => (
    <MockedProvider mocks={[]} addTypename={false}>
      <BankDetailsForm {...args} />
    </MockedProvider>
  );

export const ExamplePageUS = Template.bind({});
ExamplePageUS.args = { countryCode: Countries.US };

export const ExamplePageEU = Template.bind({});
ExamplePageEU.args = { countryCode: Countries.EU };

export const ExamplePageMX = Template.bind({});
ExamplePageMX.args = { countryCode: Countries.MX };

export const ExamplePageAU = Template.bind({});
ExamplePageAU.args = { countryCode: Countries.AU };

export const ExamplePageCA = Template.bind({});
ExamplePageCA.args = { countryCode: Countries.CA };

export const ExamplePageNZ = Template.bind({});
ExamplePageNZ.args = { countryCode: Countries.NZ };

export const ExamplePageSG = Template.bind({});
ExamplePageSG.args = { countryCode: Countries.SG };
