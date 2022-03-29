import React from "react";
import { Meta, Story } from "@storybook/react/types-6-0";
import { withDesign } from "storybook-addon-designs";
import withPadding from "utils/withPadding";
import { IMerchantFormInputs, MerchantForm, MerchantFormProps } from "./CreateMerchantForm";
import { useForm } from "react-hook-form";
import { MockedProvider } from "@apollo/client/testing";
import Button from "../Button/Button";
import { joiResolver } from "@hookform/resolvers/joi";
import { useAddressCreateSchema } from "../../pages/MerchantProfileCreate/address-create.schema";

export default {
  decorators: [withPadding, withDesign],
  title: "Merchants/CreateMerchantForm",
  component: MerchantForm,
} as Meta;

const initialValues = {
  displayName: "",
  currency: undefined,
  phoneNumber: "",
  userName: "",
  merchantType: "",
  hasAddress: false,
  location: {},
};

const Template: Story<MerchantFormProps> = (args) => {
  const form = useForm<IMerchantFormInputs>({
    defaultValues: initialValues,
    mode: "onChange",
    shouldFocusError: false,
    resolver: joiResolver(useAddressCreateSchema(), {
      abortEarly: false,
    }),
  });

  return (
    <MockedProvider>
      <form onSubmit={form.handleSubmit(() => {})}>
        <MerchantForm {...args} form={form} />
        <Button type={"submit"}>Submit</Button>
      </form>
    </MockedProvider>
  );
};

export const Primary = Template.bind({});
Primary.args = {};
Primary.parameters = {
  design: {
    type: "figma",
    url: "https://www.figma.com/proto/QPSFMyF0BndoFizvebnr9b/HUMBL-Pay-from-XD?node-id=119%3A11485&scaling=min-zoom&page-id=66%3A11208",
  },
};

export const EditMode = Template.bind({});

EditMode.args = {
  mode: "edit",
};
