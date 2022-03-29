import React from "react";
import { Meta, Story } from "@storybook/react";
import { LayoutModal } from "./LayoutModal";
import LayoutUnauthed from "./LayoutUnauthed";

export default {
  title: "Layout/Templates",
  decorators: [],
} as Meta;

export const LayoutModalTemplate: Story = () => <LayoutModal title="This is a title">This is content</LayoutModal>;

export const LayoutUnauthedTemplate: Story = () => <LayoutUnauthed>This is content</LayoutUnauthed>;
