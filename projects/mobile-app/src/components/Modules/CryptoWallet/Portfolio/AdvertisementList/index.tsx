import React, { useCallback, useState } from "react";
import { ForwardIcon, AdvtGainingIcon, NoCoinIcon } from "assets/icons";
import { AdvertisementItem, AdvertisementItemProps } from "./AdvertisementItem";
import { Trans, useTranslation } from "react-i18next";
import cx from "classnames";
import { IconsType } from "assets/icons2";
import { useLayerManager } from "components/Layers/hooks";
import { CoinsGainingInterest } from "../../InterestGainAssets/CoinsGainingInterest/CoinsGainingInterest";
import { DigitalWalletSkeleton } from "components/DigitalWallet/DigitalWallet";
import { IonModal } from "@ionic/react";
import "./style.scss";
import { Icon } from "components/Icon/Icon";
import { AssetDataObjectInterface } from "../../InterestGainAssets/InterestGainAssets";
import { compactNumberFormat } from "utils/compactNumberFormat";
import { useTranslatedArray } from "utils/hooks/useTranslatedArray";
import ChartCard from "components/ChartCard/ChartCard";
import { formatUsingIntl } from "utils/currency";
import { useGetCurrentAccountCurrency } from "hooks/useGetCurrentAccountCurrency";

export interface AdvertisementListProps {
  hasGain?: boolean;
  items?: AdvertisementItemProps[];
  isLoading?: boolean;
  showGainingPopUp?: boolean;
  infoModal?: boolean;
  modalData?: string[];
  infoModalImage?: IconsType;
  infoModalTitle?: string;
  infoModalDescription?: string;
  onClick?: () => void;
  interestAssets: AssetDataObjectInterface;
  totalInterestGained?: number;
  assetsSummaryLoading?: boolean;
  ariaLabel?: string;
}

export const AdvertisementList: React.FC<AdvertisementListProps> = ({
  items = EMPTY_LIST,
  hasGain,
  isLoading,
  showGainingPopUp,
  infoModal = false,
  modalData,
  infoModalImage,
  infoModalTitle,
  infoModalDescription,
  onClick,
  interestAssets,
  totalInterestGained = 0,
  assetsSummaryLoading,
  ariaLabel,
}) => {
  const { t } = useTranslation();
  const layerManager = useLayerManager();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const maxInterestRate = items ? Math.max(...items.map((item) => item.valueInPercent), 0) : 0;
  const currency = useGetCurrentAccountCurrency();
  const availableAssets = useTranslatedArray(Object.keys(interestAssets));

  const handleClick = useCallback(
    (tickerCode: string) => {
      onClick?.();
      layerManager.open("cryptoWalletBuyingFlow", { currency: tickerCode });
    },
    [layerManager, onClick]
  );

  if (isLoading || assetsSummaryLoading) {
    return (
      <div className="mt-4 mx-2">
        <DigitalWalletSkeleton height={330} />
      </div>
    );
  }

  let description = t("crypto-wallet.buy.interestgaining.subheading");
  if (hasGain) {
    description = t("crypto-wallet.portfolio.keep-investing-to-gain");
  } else {
    description = t("crypto-wallet.buy.interestgaining.subheading");
  }

  if (!hasGain && infoModalTitle) {
    return (
      <div className="bg-blue-lightest justify-content rounded-lg">
        <div className={cx("flex-auto text-center p-6", { "pt-0": showGainingPopUp })}>
          <div>
            <img src={NoCoinIcon} alt={infoModalTitle} className="inline" />
          </div>
          <div className="mb-2">
            <span aria-label={ariaLabel && `${ariaLabel}_TITLE_LABEL`} className="text-blue-dark font-semibold text-lg">
              {infoModalTitle}
            </span>
          </div>
          <div className={cx({ "px-6": !showGainingPopUp })}>
            <span aria-label={ariaLabel && `${ariaLabel}_BODY_LABEL`} className="text-blue-dark text-sm">
              {infoModalDescription}
            </span>
          </div>
        </div>
        {!infoModal && (
          <div aria-label={ariaLabel && `${ariaLabel}_COIN_SECTION`}>
            {items.map((item) => (
              <AdvertisementItem
                key={item.name}
                ariaLabel={ariaLabel}
                onClick={handleClick}
                name={item.name}
                tickerCode={item.tickerCode}
                valueInPercent={item.valueInPercent}
                image={item.image}
                forwardIcon={ForwardIcon}
              />
            ))}
          </div>
        )}
        {infoModal && modalData && (
          <div className="mb-8">
            {modalData.map((content) => (
              <div className="flex flex-row my-3 items-center" key={content}>
                <div className="text-blue-dark">{infoModalImage && <Icon name={infoModalImage} color="green" />}</div>
                <div className="text-blue-dark ml-3">{content}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      aria-label="PORTFOLIO_INTERESTEARNED_SECTION"
      className="bg-blue-lightest flex flex-col justify-content rounded-lg">
      {totalInterestGained > 0 ? (
        <div className="mx-3 mt-3">
          <CoinsGainingInterest
            frontCardTitle={t("pages.crypto-wallet.portfolio.interest.total-gained")}
            frontCardSubTitle={`${t("crypto-wallet.home.you-are-currently-gaining")}  ${availableAssets}`}
            totalInterestGained={totalInterestGained || 0}
            assetDataObject={interestAssets}
          />
        </div>
      ) : (
        <ChartCard height="auto" isRounded>
          <div className="px-4 mt-2 pt-1">
            <span aria-label="EARNINTERESTTITLE_LABEL" className="font-semibold text-base text-white">
              {t("crypto-wallet.portfolio.gain.interest")}
            </span>
            <div aria-label="EARNINTERESTBODY_LABEL" className="text-sm text-white">
              <Trans
                values={{
                  interestRate: compactNumberFormat(maxInterestRate / 100, "percent"),
                }}
                i18nKey="crypto-wallet.portfolio.banner-modal-subtitle-earn-upto"
                components={{ text: <text className="px-1 text-green-500" /> }}
              />
            </div>
            <div className="mt-5 flex flex-wrap justify-between">
              <span aria-label="EARNINTERESTAMOUNT_LABEL" className="text-lg font-semibold text-white">
                + {formatUsingIntl(totalInterestGained, "standard", currency)}
              </span>
            </div>
          </div>
          <div className="text-sm text-white pl-4 mb-4">{t("crypto-wallet.portfolio.total.interest")}</div>
        </ChartCard>
      )}
      <div className="flex text-center items-center mt-4 px-4">
        <div>
          <img src={AdvtGainingIcon} alt={description} className="inline h-12 w-12" />
        </div>
        <div className="text-left">
          <div aria-label="PORTFOLIO_GAININTERESTTITLE_LABEL" className="text-blue-dark font-semibold text-sm">
            {t("crypto-wallet.portfolio.want-to-gain-interest.question")}
          </div>
          <span aria-label="PORTFOLIO_GAININTERESTBODY_LABEL" className="text-blue-dark font-normal text-xs">
            {description}
          </span>
        </div>
      </div>

      {items.map((item) => {
        if (!interestAssets[item.tickerCode]) {
          return (
            <div key={item.tickerCode} className="px-2.5">
              <AdvertisementItem
                key={item.name}
                ariaLabel="PORTFOLIO_GAININTEREST"
                onClick={handleClick}
                name={item.name}
                tickerCode={item.tickerCode}
                valueInPercent={item.valueInPercent}
                image={item.image}
                forwardIcon={ForwardIcon}
              />
            </div>
          );
        }
        return null;
      })}
      <button
        aria-label="PORTFOLIO_LEARNHOW_BUTTON"
        onClick={() => {
          setIsModalOpen(true);
        }}
        className="px-2 pb-4 py-2 text-sm text-blue font-semibold">
        {t("crypto-wallet.portfolio.learn-how-interest")}
      </button>
      <IonModal
        isOpen={isModalOpen}
        cssClass="advertisement-modal"
        backdropDismiss
        onDidDismiss={() => setIsModalOpen(false)}>
        <div className="bg-blue-lightest2 rounded-md">
          <div className="bg-blue-lightest rounded-md">
            <div className="flex justify-end pt-6 pr-6">
              <button
                aria-label={ariaLabel && `LEARNABOUT_${ariaLabel}_CLOSE_BUTTON`}
                type="button"
                onClick={() => setIsModalOpen(false)}>
                <Icon name="outline_exit" color="blue-dark2" size="sm" />
              </button>
            </div>
            <div className="flex justify-center">
              <img src={AdvtGainingIcon} alt={description} className="inline h-24 w-24" />
            </div>
            <h1
              aria-label={ariaLabel && `LEARNABOUT_${ariaLabel}_TITLE_LABEL`}
              className="text-blue-dark2 mt-1 text-lg font-bold text-center mb-1">
              {t("crypto-wallet.home.buy-banner-modal-title")}
            </h1>
            <div className="text-blue-dark px-5 text-center">
              {t("crypto-wallet.portfolio.depending-on-which-coin")}
            </div>
          </div>
          <ul
            aria-label={ariaLabel && `LEARNABOUT_${ariaLabel}_BODY_LABEL`}
            className="flex flex-col text-sm rounded-lg mt-4 mb-6 text-blue-dark2">
            <li className="mb-2 flex flex-row self-center w-10/12">
              <div className="w-1/12">
                <Icon name="outline_checkmark" color="green" />
              </div>
              <span className="ml-2">{t("crypto-wallet.home.buy-banner-modal-gain-interest-from")}</span>
            </li>
            <li className="mb-2 flex flex-row self-center w-10/12">
              <div className="w-1/12">
                <Icon name="outline_checkmark" color="green" />
              </div>
              <span className="ml-2">{t("crypto-wallet.portfolio.modal-interest-credited-on-1st-of-month")}</span>
            </li>
            <li className="flex flex-row self-center w-10/12">
              <div className="w-1/12">
                <Icon name="outline_checkmark" color="green" />
              </div>
              <span className="ml-2">{t("crypto-wallet.portfolio.modal-after-your-purchase-visit-portfolio")}</span>
            </li>
          </ul>
        </div>
      </IonModal>
    </div>
  );
};

const EMPTY_LIST: AdvertisementItemProps[] = [
  {
    name: "USD Coin",
    tickerCode: "USDC",
    valueInPercent: 8,
    forwardIcon: ForwardIcon,
    image:
      "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTEiIGhlaWdodD0iNTEiIHZpZXdCb3g9IjAgMCA1MSA1MSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgZmlsdGVyPSJ1cmwoI2ZpbHRlcjBfZCkiPgo8cGF0aCBkPSJNMjUuNSA0NkMzNy40MTQ3IDQ2IDQ3IDM2LjQxNDcgNDcgMjQuNUM0NyAxMi41ODUzIDM3LjQxNDcgMyAyNS41IDNDMTMuNTg1MyAzIDQgMTIuNTg1MyA0IDI0LjVDNCAzNi40MTQ3IDEzLjU4NTMgNDYgMjUuNSA0NloiIGZpbGw9IiMyNzc1Q0EiLz4KPHBhdGggZD0iTTMxLjgyNSAyNy45MTdDMzEuODI1IDI0Ljc5NDYgMjkuOTcxOCAyMy43MjQxIDI2LjI2NTUgMjMuMjc4MUMyMy42MTggMjIuOTIxMiAyMy4wODg2IDIyLjIwNzYgMjMuMDg4NiAyMC45NTg1QzIzLjA4ODYgMTkuNzA5NCAyMy45NzExIDE4LjkwNjcgMjUuNzM2IDE4LjkwNjdDMjcuMzI0NCAxOC45MDY3IDI4LjIwNyAxOS40NDIgMjguNjQ4MSAyMC43ODAxQzI4LjczNjQgMjEuMDQ3OCAyOS4wMDEyIDIxLjIyNjEgMjkuMjY1OSAyMS4yMjYxSDMwLjY3NzdDMzEuMDMwOCAyMS4yMjYxIDMxLjI5NTUgMjAuOTU4NSAzMS4yOTU1IDIwLjYwMThWMjAuNTEyNUMzMC45NDI1IDE4LjU0OTggMjkuMzU0IDE3LjAzMzMgMjcuMzI0NCAxNi44NTQ5VjE0LjcxMzhDMjcuMzI0NCAxNC4zNTY5IDI3LjA1OTcgMTQuMDg5MyAyNi42MTg1IDE0SDI1LjI5NDhDMjQuOTQxNyAxNCAyNC42NzcgMTQuMjY3NiAyNC41ODg3IDE0LjcxMzhWMTYuNzY1NkMyMS45NDEzIDE3LjEyMjUgMjAuMjY0NyAxOC45MDY3IDIwLjI2NDcgMjEuMTM3QzIwLjI2NDcgMjQuMDgxIDIyLjAyOTYgMjUuMjQwNiAyNS43MzYgMjUuNjg2OEMyOC4yMDcgMjYuMTMyOCAyOS4wMDEyIDI2LjY2ODEgMjkuMDAxMiAyOC4wOTU1QzI5LjAwMTIgMjkuNTIzIDI3Ljc2NTYgMzAuNTA0MiAyNi4wODkgMzAuNTA0MkMyMy43OTQ1IDMwLjUwNDIgMjMuMDAwMyAyOS41MjI4IDIyLjczNTUgMjguMTg0NkMyMi42NDc0IDI3LjgyNzkgMjIuMzgyNyAyNy42NDkzIDIyLjExNzkgMjcuNjQ5M0gyMC42MTc2QzIwLjI2NDcgMjcuNjQ5MyAyMCAyNy45MTcgMjAgMjguMjczOVYyOC4zNjMyQzIwLjM1MjggMzAuNTkzMyAyMS43NjQ5IDMyLjE5OTEgMjQuNjc3IDMyLjY0NTNWMzQuNzg2NEMyNC42NzcgMzUuMTQzMSAyNC45NDE4IDM1LjQxMDcgMjUuMzgyOSAzNS41SDI2LjcwNjZDMjcuMDU5NyAzNS41IDI3LjMyNDQgMzUuMjMyNCAyNy40MTI3IDM0Ljc4NjRWMzIuNjQ1M0MzMC4wNjAxIDMyLjE5OTEgMzEuODI1IDMwLjMyNTcgMzEuODI1IDI3LjkxN1oiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGQ9Ik0yMC41Njg2IDM3LjIwMTZDMTMuNiAzNC42Nzg5IDEwLjAyNjMgMjYuODQwMSAxMi42MTczIDE5LjkwMjFDMTMuOTU3NCAxNi4xMTc5IDE2LjkwNTcgMTMuMjM0NyAyMC41Njg2IDExLjg4MzJDMjAuOTI2IDExLjcwMyAyMS4xMDQ3IDExLjQzMjcgMjEuMTA0NyAxMC45ODIxVjkuNzIwNzRDMjEuMTA0NyA5LjM2MDI2IDIwLjkyNiA5LjA4OTk2IDIwLjU2ODYgOUMyMC40NzkyIDkgMjAuMzAwNiA5IDIwLjIxMTIgOS4wODk5NkMxMS43MjM5IDExLjc5MyA3LjA3ODA1IDIwLjg5MzQgOS43NTgyOCAyOS40NTNDMTEuMzY2NCAzNC40OTg2IDE1LjIwODEgMzguMzczIDIwLjIxMTIgMzkuOTk0OUMyMC41Njg2IDQwLjE3NSAyMC45MjYgMzkuOTk0OSAyMS4wMTUyIDM5LjYzNDRDMjEuMTA0NyAzOS41NDQ0IDIxLjEwNDcgMzkuNDU0MyAyMS4xMDQ3IDM5LjI3NDFWMzguMDEyNkMyMS4xMDQ3IDM3Ljc0MjMgMjAuODM2NiAzNy4zODIgMjAuNTY4NiAzNy4yMDE2Wk0zMC4wMzg4IDkuMDg5OTZDMjkuNjgxNCA4LjkwOTgzIDI5LjMyNCA5LjA4OTk2IDI5LjIzNDggOS40NTA0NEMyOS4xNDUzIDkuNTQwNjEgMjkuMTQ1MyA5LjYzMDU3IDI5LjE0NTMgOS44MTA5MVYxMS4wNzIzQzI5LjE0NTMgMTEuNDMyNyAyOS40MTM0IDExLjc5MyAyOS42ODE0IDExLjk3MzRDMzYuNjUgMTQuNDk2MSA0MC4yMjM3IDIyLjMzNDkgMzcuNjMyNyAyOS4yNzI5QzM2LjI5MjYgMzMuMDU3MSAzMy4zNDQzIDM1Ljk0MDMgMjkuNjgxNCAzNy4yOTE4QzI5LjMyNCAzNy40NzIgMjkuMTQ1MyAzNy43NDIzIDI5LjE0NTMgMzguMTkyOVYzOS40NTQzQzI5LjE0NTMgMzkuODE0NyAyOS4zMjQgNDAuMDg1IDI5LjY4MTQgNDAuMTc1QzI5Ljc3MDggNDAuMTc1IDI5Ljk0OTQgNDAuMTc1IDMwLjAzODggNDAuMDg1QzM4LjUyNjEgMzcuMzgyIDQzLjE3MiAyOC4yODE2IDQwLjQ5MTcgMTkuNzIyQzM4Ljg4MzYgMTQuNTg2MiAzNC45NTI0IDEwLjcxMTggMzAuMDM4OCA5LjA4OTk2WiIgZmlsbD0id2hpdGUiLz4KPC9nPgo8ZGVmcz4KPGZpbHRlciBpZD0iZmlsdGVyMF9kIiB4PSIwIiB5PSIwIiB3aWR0aD0iNTEiIGhlaWdodD0iNTEiIGZpbHRlclVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgY29sb3ItaW50ZXJwb2xhdGlvbi1maWx0ZXJzPSJzUkdCIj4KPGZlRmxvb2QgZmxvb2Qtb3BhY2l0eT0iMCIgcmVzdWx0PSJCYWNrZ3JvdW5kSW1hZ2VGaXgiLz4KPGZlQ29sb3JNYXRyaXggaW49IlNvdXJjZUFscGhhIiB0eXBlPSJtYXRyaXgiIHZhbHVlcz0iMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMTI3IDAiLz4KPGZlT2Zmc2V0IGR5PSIxIi8+CjxmZUdhdXNzaWFuQmx1ciBzdGREZXZpYXRpb249IjIiLz4KPGZlQ29sb3JNYXRyaXggdHlwZT0ibWF0cml4IiB2YWx1ZXM9IjAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAuMTUgMCIvPgo8ZmVCbGVuZCBtb2RlPSJub3JtYWwiIGluMj0iQmFja2dyb3VuZEltYWdlRml4IiByZXN1bHQ9ImVmZmVjdDFfZHJvcFNoYWRvdyIvPgo8ZmVCbGVuZCBtb2RlPSJub3JtYWwiIGluPSJTb3VyY2VHcmFwaGljIiBpbjI9ImVmZmVjdDFfZHJvcFNoYWRvdyIgcmVzdWx0PSJzaGFwZSIvPgo8L2ZpbHRlcj4KPC9kZWZzPgo8L3N2Zz4K",
  },
  {
    name: "Bitcoin",
    tickerCode: "BTC",
    valueInPercent: 8,
    forwardIcon: ForwardIcon,
    image:
      "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTEiIGhlaWdodD0iNTEiIHZpZXdCb3g9IjAgMCA1MSA1MSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgZmlsdGVyPSJ1cmwoI2ZpbHRlcjBfZCkiPgo8ZyBmaWx0ZXI9InVybCgjZmlsdGVyMV9kKSI+CjxwYXRoIGQ9Ik00Ni4zNTY0IDI5LjcwMUM0My40ODQ2IDQxLjIxODkgMzEuODE3NiA0OC4yMjg1IDIwLjI5NyA0NS4zNTYzQzguNzgxMjcgNDIuNDg0OCAxLjc3MDkyIDMwLjgxODMgNC42NDM5NiAxOS4zMDEyQzcuNTE0NDkgNy43ODIwMSAxOS4xODE2IDAuNzcxODczIDMwLjY5ODUgMy42NDMzNUM0Mi4yMTgzIDYuNTE0ODMgNDkuMjI4NSAxOC4xODI1IDQ2LjM1NjQgMjkuNzAxWiIgZmlsbD0iI0Y3OTMxQSIvPgo8L2c+CjxwYXRoIGQ9Ik0zNS4yMTY1IDIxLjgxODVDMzUuNjYzOCAxOC45NDMzIDMzLjM4NzEgMTcuMzk3NyAzMC4yNzM4IDE2LjM2NjZMMzEuMjgzOCAxMi40NzE4TDI4LjgxNzkgMTEuODgxMUwyNy44MzQ3IDE1LjY3MzNDMjcuMTg2NCAxNS41MTc5IDI2LjUyMDcgMTUuMzcxNCAyNS44NTkgMTUuMjI2MkwyNi44NDkzIDExLjQwODlMMjQuMzg1IDEwLjgxODFMMjMuMzc0NSAxNC43MTE3QzIyLjgzOCAxNC41OTQyIDIyLjMxMTEgMTQuNDc4MiAyMS43OTk5IDE0LjM1NTlMMjEuODAyOCAxNC4zNDM2TDE4LjQwMjMgMTMuNTI3MkwxNy43NDYzIDE2LjA1OTRDMTcuNzQ2MyAxNi4wNTk0IDE5LjU3NTggMTYuNDYyNiAxOS41MzczIDE2LjQ4NzVDMjAuNTM1OCAxNi43MjcxIDIwLjcxNjQgMTcuMzYyNiAyMC42ODY0IDE3Ljg2NjRMMTkuNTM1OSAyMi4zMDM1QzE5LjYwNDcgMjIuMzIwMyAxOS42OTM5IDIyLjM0NDYgMTkuNzkyMyAyMi4zODI2QzE5LjcxIDIyLjM2MyAxOS42MjI1IDIyLjM0MTUgMTkuNTMxNyAyMi4zMjA2TDE3LjkxOTEgMjguNTM2NEMxNy43OTcxIDI4LjgyODEgMTcuNDg3MyAyOS4yNjU4IDE2Ljc4OTIgMjkuMDk5NkMxNi44MTM5IDI5LjEzNCAxNC45OTcgMjguNjY5NSAxNC45OTcgMjguNjY5NUwxMy43NzI3IDMxLjM4MzVMMTYuOTgxNiAzMi4xNTI2QzE3LjU3ODYgMzIuMjk2NSAxOC4xNjM2IDMyLjQ0NzEgMTguNzM5NyAzMi41ODg4TDE3LjcxOTMgMzYuNTI4MkwyMC4xODIzIDM3LjExOUwyMS4xOTI5IDMzLjIyMTNDMjEuODY1NyAzMy4zOTcgMjIuNTE4NyAzMy41NTkgMjMuMTU4IDMzLjcxMTdMMjIuMTUwOSAzNy41OTFMMjQuNjE2OSAzOC4xODE3TDI1LjYzNzIgMzQuMjQ5N0MyOS44NDIgMzUuMDE0OCAzMy4wMDM3IDM0LjcwNjMgMzQuMzM0NSAzMS4wNDk1QzM1LjQwNjkgMjguMTA1NCAzNC4yODExIDI2LjQwNzIgMzIuMDY5IDI1LjI5OThDMzMuNjgwMiAyNC45NDI1IDM0Ljg5MzggMjMuOTIzNiAzNS4yMTc0IDIxLjgxODlMMzUuMjE2NiAyMS44MTgzTDM1LjIxNjUgMjEuODE4NVpNMjkuNTgyNiAyOS40MTQ1QzI4LjgyMDUgMzIuMzU4NiAyMy42NjQ5IDMwLjc2NzEgMjEuOTkzNCAzMC4zNjhMMjMuMzQ3NSAyNS4xNDg5QzI1LjAxODkgMjUuNTUwMSAzMC4zNzkgMjYuMzQ0MSAyOS41ODI3IDI5LjQxNDVIMjkuNTgyNlpNMzAuMzQ1MiAyMS43NzU5QzI5LjY1IDI0LjQ1MzkgMjUuMzU4OSAyMy4wOTMzIDIzLjk2NyAyMi43NTk3TDI1LjE5NDYgMTguMDI2M0MyNi41ODY2IDE4LjM1OTkgMzEuMDY5NCAxOC45ODI2IDMwLjM0NTQgMjEuNzc1OUgzMC4zNDUyWiIgZmlsbD0id2hpdGUiLz4KPC9nPgo8ZGVmcz4KPGZpbHRlciBpZD0iZmlsdGVyMF9kIiB4PSIwIiB5PSIwIiB3aWR0aD0iNTEiIGhlaWdodD0iNTEiIGZpbHRlclVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgY29sb3ItaW50ZXJwb2xhdGlvbi1maWx0ZXJzPSJzUkdCIj4KPGZlRmxvb2QgZmxvb2Qtb3BhY2l0eT0iMCIgcmVzdWx0PSJCYWNrZ3JvdW5kSW1hZ2VGaXgiLz4KPGZlQ29sb3JNYXRyaXggaW49IlNvdXJjZUFscGhhIiB0eXBlPSJtYXRyaXgiIHZhbHVlcz0iMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMTI3IDAiLz4KPGZlT2Zmc2V0IGR5PSIxIi8+CjxmZUdhdXNzaWFuQmx1ciBzdGREZXZpYXRpb249IjIiLz4KPGZlQ29sb3JNYXRyaXggdHlwZT0ibWF0cml4IiB2YWx1ZXM9IjAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAuMTUgMCIvPgo8ZmVCbGVuZCBtb2RlPSJub3JtYWwiIGluMj0iQmFja2dyb3VuZEltYWdlRml4IiByZXN1bHQ9ImVmZmVjdDFfZHJvcFNoYWRvdyIvPgo8ZmVCbGVuZCBtb2RlPSJub3JtYWwiIGluPSJTb3VyY2VHcmFwaGljIiBpbjI9ImVmZmVjdDFfZHJvcFNoYWRvdyIgcmVzdWx0PSJzaGFwZSIvPgo8L2ZpbHRlcj4KPGZpbHRlciBpZD0iZmlsdGVyMV9kIiB4PSIwIiB5PSIwIiB3aWR0aD0iNTEiIGhlaWdodD0iNTEiIGZpbHRlclVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgY29sb3ItaW50ZXJwb2xhdGlvbi1maWx0ZXJzPSJzUkdCIj4KPGZlRmxvb2QgZmxvb2Qtb3BhY2l0eT0iMCIgcmVzdWx0PSJCYWNrZ3JvdW5kSW1hZ2VGaXgiLz4KPGZlQ29sb3JNYXRyaXggaW49IlNvdXJjZUFscGhhIiB0eXBlPSJtYXRyaXgiIHZhbHVlcz0iMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMTI3IDAiLz4KPGZlT2Zmc2V0IGR5PSIxIi8+CjxmZUdhdXNzaWFuQmx1ciBzdGREZXZpYXRpb249IjIiLz4KPGZlQ29sb3JNYXRyaXggdHlwZT0ibWF0cml4IiB2YWx1ZXM9IjAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAuMTUgMCIvPgo8ZmVCbGVuZCBtb2RlPSJub3JtYWwiIGluMj0iQmFja2dyb3VuZEltYWdlRml4IiByZXN1bHQ9ImVmZmVjdDFfZHJvcFNoYWRvdyIvPgo8ZmVCbGVuZCBtb2RlPSJub3JtYWwiIGluPSJTb3VyY2VHcmFwaGljIiBpbjI9ImVmZmVjdDFfZHJvcFNoYWRvdyIgcmVzdWx0PSJzaGFwZSIvPgo8L2ZpbHRlcj4KPC9kZWZzPgo8L3N2Zz4K",
  },
  {
    name: "Ethereum",
    tickerCode: "ETH",
    valueInPercent: 5,
    forwardIcon: ForwardIcon,
    image:
      "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzQiIGhlaWdodD0iNTAiIHZpZXdCb3g9IjAgMCAzNCA1MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgZmlsdGVyPSJ1cmwoI2ZpbHRlcjBfZCkiPgo8cGF0aCBkPSJNMTYuODkzIDNMMTYuNjExMSAzLjk1NzIzVjMxLjczMTRMMTYuODkzIDMyLjAxMjVMMjkuNzg1MSAyNC4zOTE4TDE2Ljg5MyAzWiIgZmlsbD0iIzM0MzQzNCIvPgo8cGF0aCBkPSJNMTYuODkyNSAzTDQgMjQuMzkxOEwxNi44OTI1IDMyLjAxMjVWMTguNTMxN1YzWiIgZmlsbD0iIzhDOEM4QyIvPgo8cGF0aCBkPSJNMTYuODkzIDM0LjQ0OUwxNi43MzQyIDM0LjY0MjdWNDQuNTM2M0wxNi44OTMgNDQuOTk5OUwyOS43OTMxIDI2LjgzMjNMMTYuODkzIDM0LjQ0OVoiIGZpbGw9IiMzQzNDM0IiLz4KPHBhdGggZD0iTTE2Ljg5MjUgNDQuOTk5OVYzNC40NDlMNCAyNi44MzIzTDE2Ljg5MjUgNDQuOTk5OVoiIGZpbGw9IiM4QzhDOEMiLz4KPHBhdGggZD0iTTE2Ljg5MyAzMi4wMTcyTDI5Ljc4NTIgMjQuMzk2NUwxNi44OTMgMTguNTM2NFYzMi4wMTcyWiIgZmlsbD0iIzE0MTQxNCIvPgo8cGF0aCBkPSJNNCAyNC4zOTY1TDE2Ljg5MjUgMzIuMDE3MlYxOC41MzY0TDQgMjQuMzk2NVoiIGZpbGw9IiMzOTM5MzkiLz4KPC9nPgo8ZGVmcz4KPGZpbHRlciBpZD0iZmlsdGVyMF9kIiB4PSIwIiB5PSIwIiB3aWR0aD0iMzMuNzkzMSIgaGVpZ2h0PSI0OS45OTk5IiBmaWx0ZXJVbml0cz0idXNlclNwYWNlT25Vc2UiIGNvbG9yLWludGVycG9sYXRpb24tZmlsdGVycz0ic1JHQiI+CjxmZUZsb29kIGZsb29kLW9wYWNpdHk9IjAiIHJlc3VsdD0iQmFja2dyb3VuZEltYWdlRml4Ii8+CjxmZUNvbG9yTWF0cml4IGluPSJTb3VyY2VBbHBoYSIgdHlwZT0ibWF0cml4IiB2YWx1ZXM9IjAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDEyNyAwIi8+CjxmZU9mZnNldCBkeT0iMSIvPgo8ZmVHYXVzc2lhbkJsdXIgc3RkRGV2aWF0aW9uPSIyIi8+CjxmZUNvbG9yTWF0cml4IHR5cGU9Im1hdHJpeCIgdmFsdWVzPSIwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwLjE1IDAiLz4KPGZlQmxlbmQgbW9kZT0ibm9ybWFsIiBpbjI9IkJhY2tncm91bmRJbWFnZUZpeCIgcmVzdWx0PSJlZmZlY3QxX2Ryb3BTaGFkb3ciLz4KPGZlQmxlbmQgbW9kZT0ibm9ybWFsIiBpbj0iU291cmNlR3JhcGhpYyIgaW4yPSJlZmZlY3QxX2Ryb3BTaGFkb3ciIHJlc3VsdD0ic2hhcGUiLz4KPC9maWx0ZXI+CjwvZGVmcz4KPC9zdmc+Cg==",
  },
];
