import React from "react";
import { Meta, Story } from "@storybook/react/types-6-0";
import { withDesign } from "storybook-addon-designs";
import BottomAction, { BottomActionProps } from "./BottomAction";
import Timer from "../Timer";
import TickeriLogoSmall from "assets/svgs/TickeriLogoSmall";
import LoaderButton from "../../../LoaderButton/LoaderButton";

export default {
  decorators: [withDesign],
  title: "Ticketing/BottomAction",
  component: BottomAction,
} as Meta;

export const Primary: Story<BottomActionProps> = (args) => (
  <BottomAction {...args}>
    <h1 className="text-white text-center text-xl">
      This is the <strong>children</strong>
    </h1>
  </BottomAction>
);

export const CustomPlatformLogo = Primary.bind({});

CustomPlatformLogo.args = {
  platformLogo: <strong className="text-pink-500">Storybook</strong>,
};

export const CheckoutExample: Story<BottomActionProps> = (args) => {
  const onExpired = () => {};
  return (
    <BottomAction {...args} platformLogo={<TickeriLogoSmall />}>
      <div className="flex justify-center mb-2">
        <Timer startingTime={10 * 60} onExpired={onExpired} />
      </div>
      <LoaderButton text="Place order" />
    </BottomAction>
  );
};

export const SelectTicketsExample: Story<BottomActionProps> = (args) => (
  <BottomAction {...args} platformLogo={<TickeriLogoSmall />}>
    <LoaderButton text="Checkout" />
  </BottomAction>
);

SelectTicketsExample.parameters = {
  storyshots: false,
  design: {
    type: "figma",
    url: "https://www.figma.com/proto/QPSFMyF0BndoFizvebnr9b/HUMBL-Pay-Mobile?node-id=119%3A11851&scaling=min-zoom&page-id=66%3A11208",
  },
};

CheckoutExample.parameters = {
  storyshots: false,
  design: {
    type: "figma",
    url: "https://www.figma.com/proto/QPSFMyF0BndoFizvebnr9b/HUMBL-Pay-Mobile?node-id=75%3A11418&scaling=min-zoom&page-id=66%3A11208",
  },
};
