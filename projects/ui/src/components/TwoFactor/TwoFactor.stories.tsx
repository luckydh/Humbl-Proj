import React, { useState } from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { INITIAL_VIEWPORTS, MINIMAL_VIEWPORTS } from "@storybook/addon-viewport";
import { withPadding } from "utils/withPadding";
import { TwoFactorInput, TwoFactorInputProps } from "./TwoFactorInput";

export default {
  title: "Components/TwoFactorInput",
  component: TwoFactorInput,
  decorators: [withPadding],
  parameters: {
    backgrounds: {
      default: "white",
      values: [{ name: "white", value: "#ffffff" }],
    },
    design: {
      type: "figma",
      url: "https://www.figma.com/file/QPSFMyF0BndoFizvebnr9b/HUMBL-Pay-Mobile?node-id=10332%3A100263",
    },
    viewport: {
      viewports: { ...INITIAL_VIEWPORTS, ...MINIMAL_VIEWPORTS },
      defaultViewport: "mobile1",
    },
  },
} as Meta;

const Template: Story<TwoFactorInputProps> = (args) => <TwoFactorInput {...args} />;
const Primary: Story = () => {
  const [otp, setOtp] = useState("");
  return (
    <TwoFactorInput
      numInputs={6}
      value={otp}
      onChange={(otp: string) => {
        setOtp(otp);
      }}
      error={false}
      errorMessage="Invalid code. Please try again."
    />
  );
};
export const Error = Template.bind({});
Error.args = {
  numInputs: 6,
  error: true,
  errorMessage: "Invalid code. Please try again.",
};

export const Input = Primary.bind({});
