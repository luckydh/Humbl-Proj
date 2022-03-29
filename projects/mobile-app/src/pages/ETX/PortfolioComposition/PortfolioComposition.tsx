import React, { useEffect, useState } from "react";
import DoughnutChart from "components/Modules/CryptoWallet/Charts/DoughnutChart";
import { ListItem } from "components/ListItem/ListItem";
import { ChartData, ChartOptions } from "chart.js";

export interface PortfolioCompositionDataProps {
  currency: string;
  cryptoAmount: number;
  amountPer: number;
  currencyName: string;
  fiatAmount: number;
  logoImage: string;
  fiatCurrency: string;
  __typename: string | undefined;
}

export interface PortfolioCompositionProps {
  portfolioCompositionArray: PortfolioCompositionDataProps[];
}

// tailwind custom class were not working so direct hex code are used here
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

export const PortfolioComposition: React.FC<PortfolioCompositionProps> = ({ portfolioCompositionArray }) => {
  // TODO: ETX/Blocks clean up undefined's
  const [doughnutChart, setDoughnutChart] = useState<ChartData<"doughnut"> | undefined>(undefined);
  const [doughnutChartOptions, setDoughnutChartOptions] = useState<ChartOptions<"doughnut"> | undefined>({});

  useEffect(() => {
    const getChartData = () => {
      const chartData: number[] = [];
      portfolioCompositionArray.forEach((portfolioData: PortfolioCompositionDataProps) => {
        chartData.push(portfolioData.amountPer);
      });
      return chartData;
    };

    const setGraphData = () => {
      const data = getChartData();
      setDoughnutChart({
        labels: [],
        datasets: [
          {
            data,
            backgroundColor: portfolioCompositionColor,
            hoverOffset: 4,
          },
        ],
      });
      setDoughnutChartOptions({
        cutout: 69,
        responsive: true,
        layout: {
          padding: {
            bottom: 5,
          },
        },
        elements: {
          arc: {
            borderWidth: 0,
          },
        },
      });
    };

    setGraphData();
  }, [portfolioCompositionArray]);

  return (
    <>
      <div className="flex justify-center" aria-label="ETX_PORTFOLIOGRAPH_IMAGE">
        <div className="h-48 w-48 mt-5">
          {!!doughnutChart && <DoughnutChart data={doughnutChart} options={doughnutChartOptions} />}
        </div>
      </div>
      {/* TODO: ETX/Blocks remove unnecessary condition and/or use optional chain */}
      {portfolioCompositionArray &&
        portfolioCompositionArray.map((portfolioData: PortfolioCompositionDataProps, index: number) => (
          <ListItem
            ariaLabel="ETX"
            key={portfolioData.currency}
            mainText={portfolioData.currencyName}
            subText={portfolioData.currency}
            color={portfolioCompositionColor[index]}
            variant="compact"
            isCompact
            detail={<div className="text-blue-dark font-bold text-base text-right">{portfolioData.amountPer}%</div>}
          />
        ))}
    </>
  );
};
export default PortfolioComposition;
