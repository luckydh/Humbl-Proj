import React, { FC } from "react";

import { Price } from "components/ChartCard/ChartCard";
import { GraphData } from "components/common/types";
import { Point } from "react-easy-crop/types";
import { ASSET_GRAPH_DECIMAL_PRECISION, decimalPrecision } from "utils/decimalPrecision";
import CoinAssetImage from "components/Modules/CryptoWallet/CoinAssetImage/CoinAssetImage";
import { useMeasure } from "react-use";
import { AssetLineGraph } from "./AssetLineGraph";
import { compactNumberFormat } from "utils/compactNumberFormat";
import { Pill } from "components/Pill/Pill";
import { useTranslation } from "react-i18next";
import MultipleCoinAssetImage from "components/Modules/CryptoWallet/MultipleCoinAssetImage/MultipleCoinAssetImage";

const GRAPH_HEIGHT = 40;

export interface AssetGraphProps {
  data: GraphData;
  styleObject?: Record<string, unknown>;
}

export interface MultipleCoinsLogo {
  currencyCode?: string;
  image?: string;
}

const DEFAULT_STATIC_DATA_POINTS: Point[] = [
  { x: new Date("2021-05-25").getTime(), y: 28 },
  { x: new Date("2021-05-26").getTime(), y: 38 },
  { x: new Date("2021-05-27").getTime(), y: 40 },
  { x: new Date("2021-05-28").getTime(), y: 30 },
  { x: new Date("2021-05-29").getTime(), y: 10 },
  { x: new Date("2021-05-30").getTime(), y: 15 },
  { x: new Date("2021-05-31").getTime(), y: 40 },
  { x: new Date("2021-06-01").getTime(), y: 50 },
  { x: new Date("2021-06-02").getTime(), y: 40 },
  { x: new Date("2021-06-03").getTime(), y: 35 },
  { x: new Date("2021-06-04").getTime(), y: 38 },
  { x: new Date("2021-06-05").getTime(), y: 41 },
];

export interface AssetGraphStaticProps {
  price: number;
  amount?: number;
  coin: string;
  coinName: string;
  logo: string;
  styleObject?: Record<string, unknown>;
  assetInterestRate?: number;
  ariaLabel?: string;
  multipleCoinsLogo?: Array<MultipleCoinsLogo>;
  multipleCoinsContent?: string;
}
/**
 * Static Asset Graph for use in widgets and success pages
 * @param props {
 * price: number;
  amount: number;
  coin: string;
  coinName: string;
  logo: string;}
 * @returns component
 */
export const AssetGraphStatic: FC<AssetGraphStaticProps> = ({
  amount,
  price,
  coin,
  coinName,
  logo,
  styleObject,
  assetInterestRate,
  ariaLabel,
  multipleCoinsLogo,
  multipleCoinsContent,
}) => {
  const { t } = useTranslation();
  const [ref, bounds] = useMeasure<HTMLDivElement>();
  return (
    <div
      className="flex-grow relative text-white rounded-lg font-hando overflow-hidden"
      style={{
        ...{
          background: "linear-gradient(220.53deg, #33C7FF 0%, #10B6EB 100%)",
          boxShadow: "2px 6px 20px rgba(0, 0, 0, 0.08)",
        },
        ...styleObject,
      }}
      ref={ref}>
      <div className="pt-4 pl-4">
        <div className="flex justify-between">
          <CoinAssetImage ariaLabel={ariaLabel} coinImage={logo} coinName={coinName} size="large" bgType="bg-opacity" />
          {assetInterestRate && (
            <div className="mx-2">
              <Pill color="green">
                <span className="p-1 text-xs">
                  {t("crypto-wallet.home.buy-pill.percentage.apy", {
                    interestRate: compactNumberFormat(assetInterestRate / 100, "percent"),
                  })}
                </span>
              </Pill>
            </div>
          )}
        </div>
        <p aria-label={ariaLabel && `${ariaLabel}_CRYPTOCARDSCRYPTONAME_LABEL`} className="mt-1 text-lg">
          {coinName}
        </p>
      </div>
      <AssetLineGraph
        points={DEFAULT_STATIC_DATA_POINTS}
        size={{ height: GRAPH_HEIGHT, width: bounds.width }}
        id={coin}
      />
      <div
        className="pb-3 pl-4"
        style={{
          background: "linear-gradient(180deg, #51D0FE 17.3%, rgba(57, 191, 239, 0) 100%)",
          marginTop: GRAPH_HEIGHT,
        }}>
        <Price
          ariaLabel={ariaLabel && `${ariaLabel}_CRYPTOCARDSCRYPTOBALANCE_LABEL`}
          fontSize={22}
          fontWeight="font-semibold"
          value={price}
          notation="compact"
        />
        <p aria-label={ariaLabel && `${ariaLabel}_CRYPTOCARDSCRYPTOCONVERSION_LABEL`} className="text-sm opacity-80">
          {amount && `${decimalPrecision(amount, ASSET_GRAPH_DECIMAL_PRECISION)} ${coin}`}
          {multipleCoinsLogo?.length && (
            <MultipleCoinAssetImage multipleCoinsLogo={multipleCoinsLogo} multipleCoinsContent={multipleCoinsContent} />
          )}
        </p>
      </div>
    </div>
  );
};
