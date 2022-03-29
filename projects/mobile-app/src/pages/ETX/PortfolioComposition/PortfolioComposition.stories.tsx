import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import withPadding from "utils/withPadding";
import { WidgetContainer } from "components/Modules/Widgets/WidgetContainer";
import { PortfolioComposition, PortfolioCompositionProps } from "./PortfolioComposition";
import { PortfolioCompositionData } from "__fixtures__/etxAssets";

export default {
  title: "Pages/Etx/PortfolioComposition",
  component: PortfolioComposition,
  decorators: [withPadding],
  parameters: {
    storyshots: false,
  },
} as Meta;

const Template: Story<PortfolioCompositionProps> = (args) => (
  <WidgetContainer ariaLabel="PORTFOLIO_COMPOSITION_WIDGET_CONTAINER">
    <PortfolioComposition {...args} />
  </WidgetContainer>
);

export const Primary = Template.bind({});
Primary.args = {
  portfolioCompositionArray: PortfolioCompositionData,
};
