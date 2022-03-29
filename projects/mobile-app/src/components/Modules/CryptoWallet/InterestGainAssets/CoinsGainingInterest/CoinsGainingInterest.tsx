import React, { useState } from "react";
import { FlipCard } from "components/FlipCard/FlipCard";
import { Pill } from "components/Pill/Pill";
import { CreateAnimation } from "@ionic/react";
import { Icon } from "components/Icon/Icon";
import CoinAssetImage from "../../CoinAssetImage/CoinAssetImage";
import { AssetDataObjectInterface } from "../InterestGainAssets";
import { formatUsingIntl } from "utils/currency";
import { useGetCurrentAccountCurrency } from "hooks/useGetCurrentAccountCurrency";
import { compactNumberFormat } from "utils/compactNumberFormat";
import { useTranslation } from "react-i18next";

export interface CoinsGainingInterestProps {
  assetDataObject: AssetDataObjectInterface;
  totalInterestGained: number;
  frontCardTitle?: string | JSX.Element;
  frontCardSubTitle?: string | JSX.Element;
}

export const CoinsGainingInterest: React.FC<CoinsGainingInterestProps> = ({
  assetDataObject,
  totalInterestGained,
  frontCardTitle,
  frontCardSubTitle,
}) => {
  const currency = useGetCurrentAccountCurrency();
  const [flipped, setFlipped] = useState(false);
  const { t } = useTranslation();
  const assetDataKeys = Object.keys(assetDataObject);
  const assetDataLength = assetDataKeys.length;

  return (
    <FlipCard
      ariaLabel="EARNINTEREST_COMPONENT"
      onFlip={() => setFlipped((f) => !f)}
      front={
        <div className="rounded-md background-dark-blue-3 px-4 pt-3">
          <div className="border-b border-gray-600 pb-2 h-32">
            <span aria-label="EARNINTERESTTITLE_LABEL" className="font-semibold text-base text-white">
              {frontCardTitle}
            </span>
            <div aria-label="EARNINTERESTBODY_LABEL" className="text-sm text-white">
              {frontCardSubTitle}
            </div>
            <div className="mt-5 flex flex-wrap items-center justify-between">
              <span aria-label="EARNINTERESTAMOUNT_LABEL" className="text-lg font-semibold text-white">
                + {formatUsingIntl(totalInterestGained, "standard", currency)}
              </span>
              <div aria-label="EARNINTERESTCRYPTOICONS_SECTION" className="flex">
                {Object.keys(assetDataObject).map((key) => (
                  <div key={key} className="-mr-2.5 last:mr-0">
                    <CoinAssetImage coinImage={assetDataObject[key].logoImage} />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div aria-label="EARNINTERESTSEECOINS_BUTTON" className="py-2.5 text-sm flex text-white">
            {t("crypto-wallet.coingaining.see.coins.earning")}
            {!flipped && (
              <CreateAnimation
                duration={1100}
                iterations={3}
                play
                fromTo={[{ property: "transform", fromValue: "translateX(0)", toValue: "translateX(5px)" }]}>
                <div className="flex ml-1 items-center">
                  <div className="transform scale-75 opacity-50">
                    <Icon name="outline_chevron" size="xs" />
                  </div>
                  <div className="-ml-2 transform scale-75">
                    <Icon name="outline_chevron" size="xs" />
                  </div>
                </div>
              </CreateAnimation>
            )}
          </div>
        </div>
      }
      back={
        <div className="rounded-md background-dark-blue-3 px-4 pt-3">
          <div className="border-b border-gray-600 h-32">
            <span aria-label="EARNINTERESTTITLE_LABEL" className="font-semibold text-base text-white">
              {t("crypto-wallet.home.coins-gaining-interest")}
            </span>
            <div aria-label="EARNINTERESTCOININTEREST_SECTION" className="flex justify-around my-1">
              {assetDataKeys.map((key, index) => (
                <React.Fragment key={key}>
                  <div className="flex flex-col items-center text-center">
                    <CoinAssetImage
                      ariaLabel="EARNINTERESTCOIN"
                      size="small"
                      coinImage={assetDataObject[key].logoImage}
                    />
                    <span
                      aria-label="EARNINTERESTFIATAMOUNT_LABEL"
                      className="text-white text-xs font-medium leading-5">
                      {formatUsingIntl(assetDataObject[key].interestGainedFiat, "standard", currency)}
                    </span>
                    <span aria-label="EARNINTERESTCRYPTOAMOUNT_LABEL" className="text-white text-xxs">
                      {compactNumberFormat(assetDataObject[key].interestGained, "decimal")} {key}
                    </span>
                    <div className="pb-2 pt-1.5 transform">
                      <Pill outline color="green">
                        <span aria-label="EARNINTERESTINTERESTPILL_LABEL" className="text-xxs px-1">
                          {t("crypto-wallet.home.buy-pill.percentage.apy", {
                            interestRate: compactNumberFormat(
                              (assetDataObject[key].interestRate || 0) / 100,
                              "percent"
                            ),
                          })}
                        </span>
                      </Pill>
                    </div>
                  </div>
                  {assetDataLength > 1 && index !== assetDataLength - 1 && (
                    <div className="border-r border-gray-600 mb-2" />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
          <div aria-label="EARNINTERESTBACK_BUTTON" className="py-2.5 text-sm flex">
            {flipped && (
              <CreateAnimation
                duration={1100}
                iterations={3}
                play
                fromTo={[{ property: "transform", fromValue: "translateX(-5px)", toValue: "translateX(0)" }]}>
                <div className="flex mr-2 items-center">
                  <div className="rotate-180 transform scale-75">
                    <Icon name="outline_chevron" size="xs" />
                  </div>
                  <div className="-ml-2">
                    <div className="rotate-180 transform scale-75 opacity-50">
                      <Icon name="outline_chevron" size="xs" />
                    </div>
                  </div>
                </div>
              </CreateAnimation>
            )}
            <span className="text-white">{t("crypto-wallet.coingaining.back-total.interest")}</span>
          </div>
        </div>
      }
    />
  );
};
