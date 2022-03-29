import React from "react";
import { IonIcon } from "@ionic/react";
import { useTranslation } from "react-i18next";
import CoinAssetImage from "../../CoinAssetImage/CoinAssetImage";
import { compactNumberFormat } from "utils/compactNumberFormat";
import { Pill } from "components/Pill/Pill";

export interface AdvertisementItemProps {
  /**
   * The Advertisement item name (e.g. Bitcoin).
   */
  name: string;
  /**
   * The Advertisement item "ticker" code (e.g. BTC).
   */
  tickerCode: string;
  /**
   * The Advertisement item logo image.
   */
  image?: string;
  /**
   * The Advertisement item value in percent (e.g. 8%).
   */
  valueInPercent: number;
  /**
   * The Advertisement item right side image.
   */
  forwardIcon?: string;
  /**
   * Item component click handler.
   */
  onClick?: (tickerCode: string) => void;

  ariaLabel?: string;
}

export const AdvertisementItem: React.FC<AdvertisementItemProps> = ({
  name,
  tickerCode,
  image,
  valueInPercent,
  forwardIcon,
  onClick,
  ariaLabel,
}) => {
  const { t } = useTranslation();

  const percentDisplay = compactNumberFormat(valueInPercent / 100, "percent");

  return (
    <>
      <div className="w-full mix-blend-normal bg-white" />
      <div className="flex h-16">
        <button className="flex items-center justify-between px-1 w-full" onClick={() => onClick?.(tickerCode)}>
          <div className="flex items-center w-2/5">
            <div aria-label={ariaLabel && `${ariaLabel}_${tickerCode}_ICON`} className="mr-2">
              <CoinAssetImage coinImage={image} size="large" bgType="bg-solid" />
            </div>
            <span
              aria-label={ariaLabel && `${ariaLabel}_${tickerCode}_LABEL`}
              className="truncate font-semibold text-base text-blue-dark">
              {name}
            </span>
          </div>

          <div className="flex w-3/5">
            <div className="w-2/5 whitespace-nowrap">
              <Pill color="green" outline>
                <span aria-label={ariaLabel && `${ariaLabel}_${tickerCode}PILL_LABEL`} className="p-1 text-xs">
                  {" "}
                  {t("crypto-wallet.home.buy-pill.percentage.apy", {
                    interestRate: percentDisplay,
                  })}
                </span>
              </Pill>
            </div>
            <div aria-label={ariaLabel && `${ariaLabel}_${tickerCode}BUY_BUTTON`} className="w-2/3 justify-end flex">
              <span className="truncate text-blue-dark font-semibold text-base ml-1">
                {t("crypto-wallet.buy.asset", { coin: tickerCode })}
              </span>
              <span className="relative top-0.5">
                <IonIcon icon={forwardIcon} />
              </span>
            </div>
          </div>
        </button>
      </div>
    </>
  );
};
