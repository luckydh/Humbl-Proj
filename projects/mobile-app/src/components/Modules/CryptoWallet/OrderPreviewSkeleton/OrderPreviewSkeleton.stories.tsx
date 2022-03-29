import React from "react";
import { Story, Meta } from "@storybook/react";
import { OrderPreviewSkeleton } from "./OrderPreviewSkeleton";
import { withDesign } from "storybook-addon-designs";

export default {
  title: "Components/CryptoWallet/OrderPreviewSkeleton",
  component: OrderPreviewSkeleton,
  decorators: [withDesign],
} as Meta;

export const Primary: Story = (args) => <OrderPreviewSkeleton {...args} />;

Primary.parameters = {
  design: {
    type: "figma",
    url: "https://www.figma.com/file/QPSFMyF0BndoFizvebnr9b/HUMBL-Pay-Mobile?node-id=5980%3A75139",
  },
};
