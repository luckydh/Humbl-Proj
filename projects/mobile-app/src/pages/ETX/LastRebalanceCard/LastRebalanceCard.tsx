import React from "react";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { Icon } from "components/Icon/Icon";
import Banner from "components/Banner/Banner";

interface LastRebalanceCardProps {
  lastRebalance: string | null;
}

export const LastRebalanceCard: React.FC<LastRebalanceCardProps> = ({ lastRebalance }) => {
  const { t } = useTranslation();

  return (
    <Banner
      bgColor="white"
      justifyBetween={false}
      isFlex
      padding="p-4"
      leftIcon={
        <div className="flex justify-center items-center w-10 h-10 rounded-lg bg-blue-dark">
          <Icon name="outline_balance" size="md" />
        </div>
      }
      text={
        <>
          <div className="text-blue-dark font-normal text-xs items-center flex" aria-label="ETX_LASTREBALANCE_LABEL">
            {t("etx-insights.last-rebalance")}
          </div>
          <div
            className="text-blue-dark font-semibold text-base leading-relaxed truncate whitespace-normal"
            aria-label={lastRebalance ? "ETX_DATE_LABEL" : "ETX_EMPTYMESSAGE_LABEL"}
          >
            {lastRebalance ? moment(lastRebalance).format("MMM DD, YYYY") : t("etx-insights.na")}
          </div>
        </>
      }
    />
  );
};
