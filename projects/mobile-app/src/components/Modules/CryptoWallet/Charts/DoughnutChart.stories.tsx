import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import withPadding from "utils/withPadding";
import { DoughnutChart, DoughnutChartProps } from "./DoughnutChart";
import { WidgetContainer } from "components/Modules/Widgets/WidgetContainer";

export default {
  title: "CryptoWallet/Components/DoughnutChart",
  component: DoughnutChart,
  decorators: [withPadding],
} as Meta;

const dataArray = [50, 12.5, 25, 12.5];

const portfolioCompositionColor = [
  "#3A5B7A",
  "#4A729A",
  "#80A1C1",
  "#4BBDE8",
  "#7ED0EE",
  "#9EDCF2",
  "#D7D9DD",
  "#BEC2C8",
  "#A6ABB3",
  "#8E949F",
];

const chartData = {
  labels: [],
  datasets: [
    {
      data: dataArray,
      backgroundColor: portfolioCompositionColor,
      hoverOffset: 4,
      cutoutPercentage: 20,
    },
  ],
};

const chartOptions = {
  cutout: 300,
  responsive: true,
  elements: {
    arc: {
      borderWidth: 0,
    },
  },
};

const Template: Story<DoughnutChartProps> = (args) => (
  <WidgetContainer ariaLabel="DOUGHNUT_CHART_CONTAINER">
    <DoughnutChart {...args} />
  </WidgetContainer>
);

export const Primary = Template.bind({});
Primary.args = {
  data: chartData,
  options: chartOptions,
};
