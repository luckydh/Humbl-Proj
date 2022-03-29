import React from "react";
import { IonIcon } from "@ionic/react";
import { CloseIcon } from "assets/svgs/CloseIcon";
import QuestionIcon from "assets/svgs/QuestionIcon.svg";
import { formatUsingIntl } from "utils/currency";
import { MarketPeriodInput } from "generated/graphql";
import { Trans } from "react-i18next";

interface CoingInfoGraphOverlayProps {
  coinName?: string;
  currentGraphPeriod: MarketPeriodInput;
  start: number;
  value: number;
  onClose: () => void;
}

export const CoinInfoGraphOverlay: React.FC<CoingInfoGraphOverlayProps> = ({
  coinName,
  currentGraphPeriod,
  onClose,
  start,
  value,
}) => {
  const priceDifference = value - start;
  const percent = ((priceDifference / start) * 100).toFixed(2);

  return (
    <div className="absolute background-dark-blue-3 opacity-95 h-full w-full z-30 px-10 pt-20 rounded-md">
      <div className="absolute right-5 top-5 pointer-events-auto" onClick={onClose}>
        <CloseIcon />
      </div>
      <div className="text-center mb-5">
        <IonIcon icon={QuestionIcon} className="text-2xl" />
      </div>
      {priceDifference > 0 && (
        <>
          <p className="text-lg text-center">
            <Trans
              i18nKey={`coin-info.asset-has-gained-${currentGraphPeriod.toLowerCase()}`}
              defaults="{{coinName}} has gained <bold>{{priceDifference}}</bold>"
              values={{ coinName, priceDifference: formatUsingIntl(priceDifference) }}
              components={{ bold: <span className="text-green-positive" /> }}
            />
          </p>

          <p className="text-lg text-center mt-5">
            <Trans
              i18nKey={`coin-info.asset-gain-description`}
              defaults="This signifies a  <bold>{{percentDifference}}%</bold> increase based on the current price of  <semibold>{{currentPrice}}</semibold>"
              values={{ currentPrice: formatUsingIntl(value), percentDifference: percent }}
              components={{
                bold: <span className="text-green-positive" />,
                semibold: <span className="font-semibold" />,
              }}
            />
          </p>
        </>
      )}
      {priceDifference < 0 && (
        <>
          <p className="text-lg text-center">
            <Trans
              i18nKey={`coin-info.asset-has-lost-${currentGraphPeriod.toLowerCase()}`}
              defaults="{{coinName}} has lost <bold>{{priceDifference}}</bold>"
              values={{ coinName, priceDifference: formatUsingIntl(priceDifference) }}
              components={{ bold: <span className="text-red" /> }}
            />
          </p>
          <p className="text-lg text-center mt-5">
            <Trans
              i18nKey={`coin-info.asset-lost-description}`}
              defaults="This signifies a  <bold>{{percentDifference}}%</bold> decrease based on the current price of  <semibold>{{currentPrice}}</semibold>"
              values={{ currentPrice: formatUsingIntl(value), percentDifference: percent }}
              components={{
                bold: <span className="text-red" />,
                semibold: <span className="font-semibold" />,
              }}
            />
          </p>
        </>
      )}
    </div>
  );
};
