import { LayoutModal } from "components/PageTemplates/LayoutModal";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { WidgetContainer } from "components/Modules/Widgets/WidgetContainer";
import EtxActionButtons from "./EtxActionButtons/EtxActionButtons";
import AssetsMarketPrice from "./AssetsMarketPrice/AssetsMarketPrice";
import { EtxInvestmentCard, HistoricalTrend } from "./EtxInvestmentCard/EtxInvestmentCard";
import { LastRebalanceCard } from "./LastRebalanceCard/LastRebalanceCard";
import { RecentTransactions } from "./RecentTransactions/RecentTransactions";
import { PortfolioComposition, PortfolioCompositionDataProps } from "./PortfolioComposition/PortfolioComposition";
import { useHistory } from "react-router";
import { DistributionCurrency } from "generated/graphql";
import { buildPath } from "utils/routes";
import { OverlayLoading } from "components/OverlayLoading/OverlayLoading";

type HistoryState = {
  totalInvestment: number;
  month: number;
  sixMonth: number;
  twelveMonth: number;
  lastRebalance: string | null;
  portfolioData: PortfolioCompositionDataProps[] | [];
  logo: string;
  blockName: string;
  etxKey: string;
  distribution: DistributionCurrency[];
};

export const Etx: React.FC = () => {
  const { t } = useTranslation();
  const headingClass = "font-semibold text-xl text-white";
  const history = useHistory<HistoryState>();
  const [currentPageState] = useState<HistoryState>(history.location.state);

  const [historicTrend, setHistoricTrend] = useState<HistoricalTrend>();
  useEffect(() => {
    if (!currentPageState) {
      history.replace(buildPath("cryptoWallet"));
    } else {
      setHistoricTrend({
        month: currentPageState.month,
        sixMonth: currentPageState.sixMonth,
        twelveMonth: currentPageState.twelveMonth,
      });
    }
  }, [currentPageState, history]);

  if (!currentPageState) {
    return <OverlayLoading isOpen />;
  }

  return (
    <LayoutModal title={currentPageState.blockName} horizontalPadding={false} ariaLabel="ETX">
      <div className="mx-5 mb-5" aria-label="ETX_HISTORICALTREND_COMPONENT">
        <EtxInvestmentCard
          historicalTrend={historicTrend}
          totalInvestment={currentPageState.totalInvestment}
          ariaLabel="ETX"
        />
      </div>
      <EtxActionButtons
        ariaLabel="ETX"
        blockName={currentPageState.blockName}
        portfolioCompositionArray={currentPageState.portfolioData}
        distribution={currentPageState.distribution}
        blockLogo={currentPageState.logo}
        etxKey={currentPageState.etxKey}
      />
      <div className="m-5" aria-label="ETX_LASTREBALANCE_COMPONENT">
        <LastRebalanceCard lastRebalance={currentPageState.lastRebalance} />
      </div>
      <div className="mx-5">
        <span className={headingClass} aria-label="ETX_ASSETMARKETPRICESTITLE_LABEL">
          {t("etx-insights.asset-market-prices")}
        </span>
      </div>
      <WidgetContainer ariaLabel="ETX_ASSETMARKETPRICES_COMPONENT">
        <AssetsMarketPrice distribution={currentPageState.distribution} />
      </WidgetContainer>
      {/* TODO: ETX/Blocks remove unnecessary first condition, can simply be currentPageState.portfolioData.length > 0 */}
      {currentPageState.portfolioData && currentPageState.portfolioData.length > 0 && (
        <>
          <div className="mx-5">
            <span className={headingClass}>{t("etx-insights.portfolio-composition")}</span>
          </div>
          <WidgetContainer ariaLabel="ETX_PORTFOLIOCOMPOSITION_COMPONENT">
            <PortfolioComposition portfolioCompositionArray={currentPageState.portfolioData} />
          </WidgetContainer>
        </>
      )}
      <div className="mx-5">
        <span className={headingClass} aria-label="ETX_RECENTTRANSACTIONTITLE_LABEL">
          {t("etx-insights.recent-transaction")}
        </span>
      </div>
      <WidgetContainer ariaLabel="ETX_RECENTTRANSACTION_COMPONENT">
        <RecentTransactions />
      </WidgetContainer>
    </LayoutModal>
  );
};

export default Etx;
