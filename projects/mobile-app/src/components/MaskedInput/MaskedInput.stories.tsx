import React from "react";
import { Meta, Story } from "@storybook/react/types-6-0";
import { MaskedDateInput } from "./MaskedDateInput";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Button from "../Button/Button";
import withPadding from "../../utils/withPadding";
import { getExtendedJoiInstance } from "../../hooks/useExtendedJoi";
import { Countries } from "../../utils/Countries";

const Template: Story = ({ schema, name }) => {
  const { handleSubmit, errors, control, getValues } = useForm({
    mode: "onBlur",
    resolver: joiResolver(schema, {
      abortEarly: false,
    }),
  });

  // TODO: use action for these instead?
  /* eslint-disable no-console */
  const onSubmitFormSuccess = (data: unknown) => {
    console.log({ data });
  };
  const onSubmitFormError = (allErrors: unknown) => {
    console.log({ allErrors });
  };
  /* eslint-enable no-console */

  return (
    <>
      <div className="flex flex-col">
        <form onSubmit={handleSubmit(onSubmitFormSuccess, onSubmitFormError)}>
          <MaskedDateInput errors={errors} field={{ name, country: [Countries.US] }} control={control} />
          <Button type="submit">Submit</Button>
        </form>
      </div>
      <div className="my-2">
        <div>Errors: {JSON.stringify(errors)}</div>
        <div>Values: {JSON.stringify(getValues())}</div>
      </div>
    </>
  );
};

export default {
  title: "Components/Masked Input",
  component: MaskedDateInput,
  decorators: [withPadding],
} as Meta;
const Joi = getExtendedJoiInstance();
export const USDate = Template.bind({});
USDate.args = {
  name: "testField",
  schema: Joi.object({ testField: Joi.date().format("MM/DD/YYYY").utc() }),
  isRevealingMask: false,
};
