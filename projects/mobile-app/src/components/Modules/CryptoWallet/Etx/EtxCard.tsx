import { IonCard, IonIcon } from "@ionic/react";
import { Icon } from "components/Icon/Icon";
import React, { FC } from "react";
import CoinAssetImage from "../CoinAssetImage/CoinAssetImage";
import cryptoChangeUp from "assets/svgs/crypto-change-up.svg";
import cryptoChangeDown from "assets/svgs/crypto-change-down.svg";
import cx from "classnames";
import { chevronForwardIcon } from "assets/icons";
import { useTranslation } from "react-i18next";
import ContentLoader from "react-content-loader";
import skeletonStyles from "utils/SkeletonStyles";
import { DistributionCurrency } from "generated/graphql";
import { useGetCurrentAccountCurrency } from "hooks/useGetCurrentAccountCurrency";
import { formatUsingIntl } from "utils/currency";

export interface EtxCardProps {
  logo?: string;
  totalInvestment: number;
  perf: number;
  blockName: string;
  currencyArray?: DistributionCurrency[];
  handleOnViewClick?: () => void;
  handleOnInfoClick?: () => void;
}

export const EtxCard: React.FC<EtxCardProps> = ({
  logo,
  totalInvestment,
  perf,
  currencyArray,
  blockName,
  handleOnViewClick,
  handleOnInfoClick,
}) => {
  const { t } = useTranslation();
  const currency = useGetCurrentAccountCurrency();

  return (
    <IonCard button className="rounded-lg mx-0 bg-blue-lightest">
      <div className="flex flex-col my-4 mr-3 ml-4" onClick={handleOnViewClick}>
        <div className="flex flex-row mb-2">
          <div className="flex flex-row items-center flex-1">
            {/* TODO: ETX/Blocks remove imageClass empty string */}
            <CoinAssetImage coinImage={logo} size="x-small" imageClass="" />
            <div className="text-blue-dark font-semibold text-base ml-1">{blockName}</div>
          </div>
          <div className="flex-1 flex justify-end items-center">
            <div className="text-blue leading-3">{t("etx.card.view")}</div>
            <div className="flex">
              <IonIcon className="text-xs opacity-50 -mr-1 text-blue" icon={chevronForwardIcon} />
              <IonIcon className="text-xs text-blue" icon={chevronForwardIcon} />
            </div>
          </div>
        </div>

        <div className="flex flex-row mt-1 mb-2 flex-wrap">
          <div className="font-medium text-sm text-light-grey mr-1">{t("etx.card.six_month_performance")}:</div>
          <div className="flex">
            {perf >= 0 ? (
              <img alt="" src={cryptoChangeUp} className="w-4 mb-1" />
            ) : (
              <img alt="" src={cryptoChangeDown} className="w-4 mb-1" />
            )}
            <div className={cx("leading-relaxed font-medium text-blue-dark ml-1")}>
              {perf > 0 && <span className="mr-0.5">+</span>}
              {perf < 0 && <span className="mr-0.5">-</span>}
              {Math.abs(perf).toFixed(2)}%
            </div>
          </div>
        </div>
        <div className="flex flex-row ml-1 mt-1.5 justify-between">
          <div className="flex items-center flex-row flex-wrap">
            {/* TODO: ETX/Blocks use optional chain instead of conditional execution (i.e. currencyArray?.map...) */}
            {currencyArray &&
              currencyArray.map((items) => (
                <div className="-ml-2.5" key={items.code}>
                  <CoinAssetImage coinImage={items.image} size="small" bgType="bg-solid" />
                </div>
              ))}
          </div>
          <div>
            <div className="text-blue-dark font-semibold text-lg text-right">
              {formatUsingIntl(totalInvestment, "standard", currency)}
            </div>
            <div className="text-light-grey font-medium text-xs text-right">{t("etx.card.total_investment")}</div>
          </div>
        </div>
      </div>
      <div onClick={handleOnInfoClick} className="bg-blue-dark">
        <div className="flex py-2 flex-row items-center justify-center text-center">
          <div className="text-white ml-4">{t("etx.card.learn_about_etx_block_x")}</div>
          <div className="pl-3">
            <Icon name="outline_info" size="xs" />
          </div>
        </div>
      </div>
    </IonCard>
  );
};

export const EtxCardSkeleton: FC = () => (
  <ContentLoader
    className="rounded-md"
    width="100%"
    height={177}
    viewBox="0 0  600 224"
    uniqueKey="digital-wallet-graph-skeleton"
    {...skeletonStyles}>
    <rect x="20" y="20" rx="4" ry="4" width="112" height="32" />
    <rect x="20" y="70" rx="4" ry="4" width="200" height="16" />
    <rect x="20" y="120" rx="4" ry="4" width="200" height="40" />
    <rect x="500" y="120" rx="4" ry="4" width="80" height="40" />
    <rect x="500" y="20" rx="4" ry="4" width="80" height="16" />
    <rect x="240" y="70" rx="4" ry="4" width="64" height="16" />
    <rect x="20" y="181" rx="4" ry="4" width="560" height="35" />
  </ContentLoader>
);

export default EtxCard;
