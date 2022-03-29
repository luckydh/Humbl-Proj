import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart, registerables, ChartData, ChartOptions } from "chart.js";

Chart.register(...registerables);

export interface DoughnutChartProps {
  data: ChartData<"doughnut">;
  options?: ChartOptions<"doughnut">;
}

export const DoughnutChart: React.FC<DoughnutChartProps> = ({ data, options = {} }) => (
  <Doughnut data={data} options={options} />
);

export default DoughnutChart;
