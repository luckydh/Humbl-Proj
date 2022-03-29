import React from "react";
import { useTranslation } from "react-i18next";
import { CreateAnimation } from "@ionic/react";
import { Button } from "components/Button/Button";
import { AssetGraphStatic, MultipleCoinsLogo } from "components/AssetGraph/AssetGraph";
import LayoutUnauthed from "components/PageTemplates/LayoutUnauthed";
import { BuyingFlowStepProps } from "pages/CryptoWallet/BuyingFlow/sharedTypes";

export interface PurchaseSuccessScreenProps {
  title?: string;
  subTitle?: string;
  transactionId?: string;
  price: number;
  amount?: number;
  coin: string;
  coinName: string;
  logo: string;
  isLoading: boolean;
  multipleCoinsLogo?: Array<MultipleCoinsLogo>;
  multipleCoinsContent?: string;
  onClickCta?: () => void;
  selectedAssetInterestState?: BuyingFlowStepProps["selectedAssetInterestState"];
}

const ellipseStyle = {
  width: 265,
  height: 265,
};

const ellipseSolidStyle = {
  width: 205,
  height: 205,
};

export const PurchaseSuccessScreen: React.FC<PurchaseSuccessScreenProps> = ({
  title,
  subTitle,
  coin,
  coinName,
  logo,
  price,
  amount,
  transactionId,
  isLoading,
  multipleCoinsLogo,
  multipleCoinsContent,
  onClickCta,
  selectedAssetInterestState,
}) => {
  const { t } = useTranslation();
  return (
    <LayoutUnauthed>
      <div className="mb-5">
        <div className="flex flex-grow flex-col">
          <div className="flex justify-center items-center relative" style={{ height: ellipseStyle.height * 1.5 }}>
            <CreateAnimation
              duration={2000}
              iterations={Infinity}
              keyframes={[
                { offset: 0, transform: "scale(1)", opacity: ".4" },
                { offset: 0.5, transform: "scale(1.5)", opacity: ".7" },
                { offset: 1, transform: "scale(1)", opacity: ".4" },
              ]}
              play
            >
              <div className="absolute bg-cover bg-ellipse" style={ellipseStyle} />
              <div className="absolute bg-cover bg-ellipseSolid" style={ellipseSolidStyle} />
            </CreateAnimation>
            {!isLoading && (
              <CreateAnimation
                duration={2000}
                keyframes={[
                  { offset: 0, transform: "scale(0)" },
                  { offset: 0.15, transform: "scale(0)" },
                  { offset: 0.4, transform: "scale(1.4)" },
                  { offset: 0.5, transform: "scale(1)" },
                  { offset: 0.7, transform: "scale(1.2)" },
                  { offset: 0.8, transform: "scale(1)" },
                ]}
                play
              >
                <div className="flex justify-center items-center">
                  <AssetGraphStatic
                    logo={logo}
                    price={price}
                    coin={coin}
                    assetInterestRate={selectedAssetInterestState?.valueInPercent}
                    coinName={coinName}
                    amount={amount}
                    multipleCoinsLogo={multipleCoinsLogo}
                    multipleCoinsContent={multipleCoinsContent}
                    styleObject={{ minWidth: 193, maxWidth: window.innerWidth - 50 }}
                  />
                </div>
              </CreateAnimation>
            )}
          </div>
          <div className="justify-center items-center">
            <div className="text-center text-white text-2xl">{title}</div>
            <div className="text-center text-white text-base pt-2.5">{subTitle}</div>
            {!!transactionId && (
              <div className="my-9">
                <div className="text-center text-white text-base">{t("purchase-success.transaction-id")}</div>
                <div className="text-center text-white text-xl">{transactionId}</div>
              </div>
            )}
          </div>
        </div>
        <Button onClick={onClickCta}>{t("purchase-success.button-name")}</Button>
      </div>
    </LayoutUnauthed>
  );
};
