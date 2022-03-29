import React from "react";
import cx from "classnames";
import cryptoChangeUp from "assets/svgs/crypto-change-up.svg";
import cryptoChangeDown from "assets/svgs/crypto-change-down.svg";
import { GainingIcon } from "assets/icons";
import { decimalPrecision } from "utils/decimalPrecision";
import CoinAssetImage from "../CoinAssetImage/CoinAssetImage";
import { ListItem } from "components/ListItem/ListItem";
import { compactNumberFormat } from "utils/compactNumberFormat";
import { Pill } from "components/Pill/Pill";
import { useTranslation } from "react-i18next";

export type CryptoCurrencyItemVariant = "compact" | "default";

export interface CryptoCurrencyItemProps {
  // The cryptocurrency name (e.g. Bitcoin).
  name?: string;

  // The cryptocurrency "ticker" code (e.g. BTC).
  tickerCode: string;

  // The cryptocurrency logo image.
  image?: string;

  // The cryptocurrency change percentage over period (e.g. -3.21)
  change?: number;

  // The cryptocurrency value in fiat currency (e.g. $76543.21).
  valueInFiat?: string;

  // The cryptocurrency value (e.g. 0.000012345).
  valueInCrypto?: number | string;

  // The cryptocurrency interestGained (e.g. 75).
  interestGained?: number;

  // The cryptocurrency is interest gaining.
  interestGaining?: boolean;

  // Item component click handler.
  onClick?: () => void;

  /**
   * Item component variant. "compact" variant is intended
   * to be used when you have external margin, so the
   * item reduces internal padding to fit better the screen.
   */
  variant?: CryptoCurrencyItemVariant;

  liClassName?: string;

  /**
   * PortFolio Interest gain Props
   */
  color?: string;
  ariaLabel?: string;
  assetInterestRate?: number;
}

export const CryptoCurrencyItem: React.FC<CryptoCurrencyItemProps> = ({
  name,
  tickerCode,
  valueInFiat,
  image,
  change,
  valueInCrypto,
  interestGained,
  onClick,
  variant = "default",
  liClassName,
  color,
  ariaLabel,
  assetInterestRate,
}) => {
  const isPositive = change! > 0;
  const isNegative = change! < 0;
  const { t } = useTranslation();

  return (
    <ListItem
      mainText={
        <>
          {name}
          {assetInterestRate && (
            <div className="mx-2">
              <Pill color="green" outline>
                <span aria-label="CHOOSEASSET_CARDINTERESTPILL_LABEL" className="p-1 text-xs">
                  {t("crypto-wallet.home.buy-pill.percentage.apy", {
                    interestRate: compactNumberFormat(assetInterestRate / 100, "percent"),
                  })}
                </span>
              </Pill>
            </div>
          )}
          {interestGained && (
            <span className="ml-2">
              <img src={GainingIcon} alt={`${name} - ${tickerCode}`} />
            </span>
          )}
        </>
      }
      ariaLabel={ariaLabel}
      subText={tickerCode}
      image={image ? <CoinAssetImage coinImage={image} size="x-large" bgType="bg-solid" /> : undefined}
      color={!image ? color : undefined}
      onClick={onClick}
      variant={variant}
      liClassName={liClassName}
      detail={
        <>
          {valueInFiat && (
            <div
              className="text-base font-semibold text-right text-blue-dark"
              aria-label={ariaLabel && `${ariaLabel}_FIATAMOUNT_LABEL`}
            >
              {valueInFiat}
            </div>
          )}
          {valueInCrypto && (
            <div
              className="text-sm font-normal text-right text-blue-dark"
              aria-label={ariaLabel && `${ariaLabel}_CRYPTOAMOUNT_LABEL`}
            >
              {decimalPrecision(valueInCrypto, typeof valueInCrypto === "string" ? 8 : undefined)} {tickerCode}
            </div>
          )}
          {change && (
            <div
              aria-label={ariaLabel && `${ariaLabel}_CRYPTOVARIATION_LABEL`}
              className="text-blue-dark flex items-center justify-end"
            >
              <div className="mr-1">
                {isPositive && <img alt="" src={cryptoChangeUp} className={!valueInFiat ? "w-4" : ""} />}
                {isNegative && <img alt="" src={cryptoChangeDown} className={!valueInFiat ? "w-4" : ""} />}
              </div>
              <div
                className={cx("leading-relaxed font-medium", {
                  "text-sm": valueInFiat,
                  "text-xl": !valueInFiat,
                })}
              >
                <span aria-label={ariaLabel && `${ariaLabel}_CRYPTOVARIATION_LABEL`}>
                  <span className="mr-0.5">
                    {isPositive && "+"}
                    {isNegative && "-"}
                  </span>
                  {Math.abs(change).toFixed(2)}%
                </span>
              </div>
            </div>
          )}
        </>
      }
    />
  );
};

export default CryptoCurrencyItem;
