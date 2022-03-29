import {
  useGetAllPortfolioQuery,
  useGetEtxHistoryQuery,
  useGetEtxProductQuery,
  DistributionCurrency,
} from "generated/graphql";
import React, { useCallback, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router";
import { buildPath } from "utils/routes";
import EtxCard, { EtxCardSkeleton } from "./EtxCard";
import cx from "classnames";
import { IonModal } from "@ionic/react";
import { ScrollableView } from "components/ScrollableView/ScrollableView";
import "./style.scss";
import { Icon } from "components/Icon/Icon";
import { WidgetContainer } from "components/Modules/Widgets/WidgetContainer";
import useRefreshFetch from "utils/hooks/useRefreshFetch";

interface EtxCardListContainerProps {
  isRefreshing: boolean;
}

const EtxCardListContainer: React.FC<EtxCardListContainerProps> = ({ isRefreshing = false }) => {
  const [showInfoModal, setShowInfoModal] = useState<boolean>(false);
  const history = useHistory();
  const { t } = useTranslation();
  /* TODO: ETX/Blocks reconsider fetch policy for all these queries. */
  const {
    data: etxHistoryData,
    loading: etxHistoryLoading,
    error: etxHistoryError,
    refetch: etxHistoryRefetch,
  } = useGetEtxHistoryQuery({
    fetchPolicy: "network-only",
  });
  const {
    data: portfolioData,
    loading: portfolioLoading,
    error: portfolioError,
    refetch: portfolioRefetch,
  } = useGetAllPortfolioQuery({
    fetchPolicy: "network-only",
  });
  const {
    data: etxProductData,
    loading: etxProductLoading,
    error: etxProductError,
    refetch: etxProductRefetch,
  } = useGetEtxProductQuery({
    fetchPolicy: "network-only",
  });
  useRefreshFetch(isRefreshing, etxHistoryRefetch);
  useRefreshFetch(isRefreshing, portfolioRefetch);
  useRefreshFetch(isRefreshing, etxProductRefetch);

  const contentElementRef = useRef<HTMLDivElement>(null);
  const [modalScrollTop, setModalScrollTop] = useState(0);
  const onModalScroll = useCallback(() => {
    if (contentElementRef.current) {
      setModalScrollTop(contentElementRef.current?.scrollTop);
    }
  }, []);
  const etxCardLoading = etxHistoryLoading || portfolioLoading || etxProductLoading;
  const etxCardError = etxHistoryError || portfolioError || etxProductError;
  const borderClass = "h-px background-light-blue-1 mt-3 mx-8";
  const etxBlocksData = [{ ...etxHistoryData, ...{ id: "blockX" } }];

  const handleInfoModalClose = () => {
    setShowInfoModal(false);
    contentElementRef.current?.removeEventListener("scroll", onModalScroll);
  };

  const onEtxCardClick = () => {
    if (!portfolioData || !etxHistoryData || !etxProductData) {
      return;
    }

    const { totalFiatBalance, portfolio, lastRebalancingOn } = portfolioData.getetxPortfolio!;
    const { Month, sixMonth, twelveMonth } = etxHistoryData.getEtxHistory!;
    const { logoImage, name, etxKey, distribution } = etxProductData.getEtxProduct!;

    history.push({
      pathname: buildPath("etxInsights"),
      state: {
        totalInvestment: totalFiatBalance,
        month: Month,
        sixMonth,
        twelveMonth,
        portfolioData: portfolio,
        lastRebalance: lastRebalancingOn,
        logo: logoImage,
        blockName: name,
        etxKey,
        distribution,
      },
    });
  };

  if (etxCardError) {
    return (
      <WidgetContainer ariaLabel="ETX_CARD_LIST_WIDGET_CONTAINER">
        <div className="mx-6 my-14 text-sm text-black">{t("widget.error.generic-loading-error")}</div>
      </WidgetContainer>
    );
  }

  // TODO: ETX/Blocks refactor render to better consume this directly instead of multiple loops and avoid direct name access (i.e. shouldn't see distributionMap['btc']).
  const distributionMap = etxProductData?.getEtxProduct?.distribution?.reduce((curr, nextETXProduct) => {
    const asset = nextETXProduct.code!;
    if (!curr[asset]) {
      curr[asset] = nextETXProduct;
    }
    return curr;
  }, {} as Record<string, DistributionCurrency>);

  return (
    <>
      <div className={cx("w-full h-auto overflow-x-auto flex px-5", { "justify-center": etxBlocksData.length === 1 })}>
        {!etxCardLoading &&
          // TODO: ETX/Blocks use optional chain instead of conditional execution
          etxBlocksData.length > 0 &&
          etxBlocksData.map(
            (crypto) =>
              crypto && (
                <div
                  className={cx(
                    "first:ml-0 mx-1 last:mr-0 flex-none",
                    etxBlocksData.length === 1 ? "w-full" : "w-11/12"
                  )}
                  key={crypto.id}
                >
                  <EtxCard
                    key={crypto.id}
                    blockName={etxProductData?.getEtxProduct?.name!}
                    totalInvestment={portfolioData?.getetxPortfolio?.totalFiatBalance || 0}
                    perf={crypto?.getEtxHistory?.sixMonth || 0}
                    currencyArray={etxProductData?.getEtxProduct?.distribution}
                    logo={etxProductData?.getEtxProduct?.logoImage}
                    handleOnInfoClick={() => {
                      setShowInfoModal(true);
                      requestAnimationFrame(() => {
                        contentElementRef.current?.addEventListener("scroll", onModalScroll);
                      });
                    }}
                    handleOnViewClick={onEtxCardClick}
                  />
                </div>
              )
          )}
        {etxCardLoading && <EtxCardSkeleton />}
      </div>
      <IonModal
        isOpen={showInfoModal}
        onDidDismiss={handleInfoModalClose}
        backdropDismiss
        showBackdrop
        cssClass="info-modal"
      >
        <div className="rounded-t-2xl mt-28 relative w-full bg-etxCardBackground bg-cover">
          <div className="flex justify-end pt-2 pr-2">
            <button
              type="button"
              className={cx("text-blue tracking-tight font-medium text-lg p-2")}
              onClick={handleInfoModalClose}
            >
              {t("global.close")}
            </button>
          </div>
          <div>
            <h1 className="text-blue-dark2 text-xl font-bold text-center mb-2">{t("etx.modal.blockX")}</h1>
          </div>
        </div>
        <ScrollableView ref={contentElementRef} customClass="bg-blue-lightest4">
          <div className="h-full bg-white">
            <div className="bg-blue-lightest4 relative w-full px-4">
              <p className={cx("text-blue-dark2 text-center py-4")}>{t("etx.modal.etx_description")}</p>
            </div>
            <div className="bg-white relative w-full px-4">
              <div className="py-4">
                <h1 className="text-blue-dark2 text-lg font-bold text-center mb-2">
                  {t("etx.modal.portfolio_composition")}
                </h1>
                <p className="text-blue-dark2 text-center mb-4">{t("etx.modal.portfolio_composition_description")}</p>
                <div className="flex flex-row justify-around items-center">
                  <div className="flex flex-col text-blue-dark text-xs pt-1">
                    <div className="flex flex-row">
                      <div className="bg-grey w-8 h-3 w" />
                      <span className="mx-2">
                        {t("etx.modal.bitcoin")}: {distributionMap?.BTC?.percentage}%
                      </span>
                    </div>
                    <div className="flex flex-row">
                      <div className="bg-blue-dark3 w-8 h-3 w" />
                      <span className="mx-2">
                        {t("etx.modal.ethereum")}: {distributionMap?.ETH?.percentage}%
                      </span>
                    </div>
                    <div className="flex flex-row">
                      <div className="bg-blue-lightest3 w-8 h-3 w" />
                      <span className="mx-2">
                        {t("etx.modal.bat")}: {distributionMap?.BAT?.percentage}%
                      </span>
                    </div>
                  </div>
                  <div>
                    <Icon name="graph" size="md" />
                  </div>
                </div>
              </div>
              <div className={borderClass} />
              <div className="pt-4">
                <h1 className="text-blue-dark2 text-xl font-bold text-center mb-2">{t("etx.modal.methodology")}</h1>
                <p className="text-blue-dark2 text-center mb-4">{t("etx.modal.methodology_description")}</p>
              </div>
              <div className={borderClass} />
              <div className="pt-4 py-2">
                <h1 className="text-blue-dark2 text-xl font-bold text-center mb-2">
                  {t("etx.modal.periodic_rebalancing")}
                </h1>
                <p className="text-blue-dark2 text-center mb-4">{t("etx.modal.periodic_rebalancing_description")}</p>
              </div>
            </div>
          </div>
        </ScrollableView>
        <button
          className="text-blue text-lg bg-white py-6 shadow-inner"
          type="button"
          onClick={() => {
            modalScrollTop < 50
              ? contentElementRef.current?.scrollBy(0, 1000)
              : contentElementRef.current?.scrollBy(0, -1000);
          }}
        >
          {modalScrollTop < 50 ? t("etx.modal.button.view_more") : t("etx.modal.button.top")}
        </button>
      </IonModal>
    </>
  );
};

export default EtxCardListContainer;
