import ChartCard, { Price } from "components/ChartCard/ChartCard";
import React from "react";
import { useTranslation } from "react-i18next";

interface HistoricalTrendProps {
  time: string;
  percentage: string;
}
export interface HistoricalTrend {
  month: number;
  sixMonth: number;
  twelveMonth: number;
}
export interface EtxInvestmentCardProps {
  // TODO: ETX/Blocks use ? typing instead of undefined
  historicalTrend: HistoricalTrend | undefined;
  totalInvestment: number;
  ariaLabel?: string;
}

export const EtxInvestmentCard: React.FC<EtxInvestmentCardProps> = ({
  historicalTrend,
  totalInvestment,
  ariaLabel,
}) => {
  const { t } = useTranslation();
  const historicalTrendArray = [
    {
      time: "1M",
      percentage: `${historicalTrend?.month?.toFixed(2) ?? 0}%`,
    },
    {
      time: "6M",
      percentage: `${historicalTrend?.sixMonth?.toFixed(2) ?? 0}%`,
    },
    {
      time: "1Y",
      percentage: `${historicalTrend?.twelveMonth?.toFixed(2) ?? 0}%`,
    },
  ];
  return (
    <ChartCard height="auto" backgroundSize="bg-cover" background="bg-etxCardBackground">
      <div className="pt-6 text-center text-dark-blue-1">
        <Price
          fontSize={28}
          value={totalInvestment}
          fontWeight="font-bold"
          ariaLabel={ariaLabel && `${ariaLabel}_AMOUNT_LABEL`}
        />
        <p
          className="text-base text-center text-dark-blue-1"
          aria-label={ariaLabel && `${ariaLabel}_TOTALINVESTMENT_LABEL`}
        >
          {t("etx-insights.total-investment")}
        </p>
      </div>
      <div className="w-full h-px background-light-blue-1 opacity-25 mt-3" />
      <div className="flex w-full my-4 text-center">
        {historicalTrendArray.map((historicalTrendData: HistoricalTrendProps) => {
          const totalInvestmentAreaLabel = ariaLabel
            ? `${ariaLabel}_TOTALINVESTMENT${historicalTrendData.time}_LABEL`
            : "";
          const investmentTitleAreaLabel = ariaLabel ? `${ariaLabel}_${historicalTrendData.time}_LABEL` : "";
          return (
            <div className="flex-1 text-dark-blue-1" key={historicalTrendData.time}>
              <div className="font-semibold text-xl" aria-label={totalInvestmentAreaLabel}>
                {historicalTrendData.percentage}
              </div>
              <div className="text-sm" aria-label={investmentTitleAreaLabel}>
                {historicalTrendData.time}
              </div>
            </div>
          );
        })}
      </div>
      <div
        className="text-center text-xs mb-3 text-light-grey"
        aria-label={ariaLabel && `${ariaLabel}_HISTORICALTREND_LABEL`}
      >
        {t("etx-insights.historical-trend")}
      </div>
    </ChartCard>
  );
};
