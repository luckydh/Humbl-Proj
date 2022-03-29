import React, { CSSProperties, useEffect, useRef, useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { CryptoCurrencyListTabContainer } from "components/Modules/CryptoWallet/CryptoCurrencyList/CryptoCurrencyListTabContainer";
import { CryptoCurrencyTopMoversWidgetContainer } from "components/Modules/CryptoWallet/CryptoCurrencyList/CryptoCurrencyTopMoversWidgetContainer";
import { MyAssetsWidgetContainer } from "components/Modules/CryptoWallet/MyAssets/MyAssetsWidgetContainer";
import NewsFeed from "components/Modules/CryptoWallet/NewsFeed";
import Tab from "components/Modules/CryptoWallet/Tabs/Tab";
import Tabs from "components/Modules/CryptoWallet/Tabs/Tabs";
import { useTranslation } from "react-i18next";
import { getShouldShowOnBoarding, setShouldShowOnBoarding } from "state/cache";
import CryptoWalletHeaderContainer from "components/Modules/CryptoWallet/CryptoWalletHeader";
import { IntersectionDetector } from "components/common";
import { Button } from "components/Button/Button";
import { VectorIcon } from "assets/icons";
import WalletBalanceHistoryGraph from "components/Modules/CryptoWallet/Widgets/WalletBalanceHistoryGraph";
import { InterestGainAssets } from "components/Modules/CryptoWallet/InterestGainAssets";
import { Feature } from "utils/Feature";
import { trackEvent } from "utils/analytics/Segment";
import EVENTS from "utils/analytics/AnalyticEvents";
import { ActionBuyButtons } from "components/Modules/CryptoWallet/ActionBuyButtons/ActionBuyButtons";
import { buildPath } from "utils/routes";
import { Disabled, NO_ASSETS_DISABLED_TABS } from "components/Modules/CryptoWallet/ActionModalAndTabs";
import { IonSpinner } from "@ionic/react";
import { useUnmount } from "react-use";
import PullToRefresh from "react-simple-pull-to-refresh";
import { CryptoRecentTransactionsContainer } from "../../components/Modules/CryptoWallet/CryptoRecentTransactions/CryptoRecentTransactionsContainer";
import { Onboarding } from "./Onboarding/Onboarding";
import EtxCardListContainer from "components/Modules/CryptoWallet/Etx/EtxCardListContainer";
import { useLayerManager } from "components/Layers/hooks";
import { OnboardingTasksContainer } from "components/Modules/CryptoWallet/OnboardingTasks/OnboardingTasksContainer";
import { useGetCurrentAccount } from "../../hooks/useGetCurrentAccount";

const smVectorIcon: CSSProperties = { height: 15, width: 15 };

const SMALL_BUY_BUTTON_STYLES =
  "text-center bg-blue-dark rounded-md h-9 px-4 justify-center items-center translate-y-3/4";

export const CryptoWalletHome: React.FC = () => {
  const layerManager = useLayerManager();

  const [shouldShowOnBoarding, setShouldShowOnBoardingState] = useState(false);
  const [userHasAssets, setUserHasAssets] = useState(false);
  const [disabledTabs, setDisabledTabs] = useState<Set<Disabled>>();
  const [isRefreshing, setRefreshing] = useState(false);
  const { currentAccount } = useGetCurrentAccount();
  const history = useHistory();
  const { t } = useTranslation();
  const refreshTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleOnBuy = () => {
    trackEvent(EVENTS.BUTTON_CLICK, { type: "Buy", status: "Crypto Wallet Initiated" });
    layerManager.open("cryptoWalletBuyingFlow", {});
  };

  useEffect(() => {
    const getShouldShowOnBoardingFromStorage = async () => {
      const val = await getShouldShowOnBoarding();
      setShouldShowOnBoardingState(val);
    };

    getShouldShowOnBoardingFromStorage();
  }, []);

  useEffect(() => {
    const updatedDisabledTabs = userHasAssets ? undefined : new Set(NO_ASSETS_DISABLED_TABS);

    setDisabledTabs(updatedDisabledTabs);
  }, [userHasAssets]);

  useUnmount(() => {
    if (refreshTimeout.current) {
      clearTimeout(refreshTimeout.current);
    }
  });

  const setShouldShowOnBoardingBoolean = async (val: boolean) => {
    await setShouldShowOnBoarding(val);
    setShouldShowOnBoardingState(val);
  };
  // If the user is authorized and it is a merchant account user will be redirected to home.
  if (currentAccount?.isMerchant) {
    return <Redirect to={buildPath("home")} push />;
  }
  const onClickSeePortfolio = () => {
    history.push(buildPath("portfolio"));
  };

  if (shouldShowOnBoarding) {
    return <Onboarding setShouldShowOnBoardingBoolean={setShouldShowOnBoardingBoolean} />;
  }

  const onRefresh = () =>
    new Promise((res) => {
      setRefreshing(true);
      refreshTimeout.current = setTimeout(() => {
        res(setRefreshing(false));
      }, 2000);
    });

  return (
    <div>
      {/* This zIndex is magic/hackery to maintain the header abvove the content
        while avoiding iOS rendering improperly.
        Refer to this PR for what this aims to resolve.
        https://bitbucket.org/humbl/humbl-consumer/pull-requests/834
        */}
      <IntersectionDetector animate zIndex={1}>
        <CryptoWalletHeaderContainer ariaLabel="WALLET" />
      </IntersectionDetector>
      <IntersectionDetector animate threshold={0.75} zIndex={1}>
        <div className="safe-area-top flex flex-row fixed right-2.5 sm:right-5 top-0 z-20">
          <Button
            ariaLabel="WALLET_STICKYHEADERBUY_BUTTON"
            variant="custom"
            size="xsmall"
            className={SMALL_BUY_BUTTON_STYLES}
            onClick={handleOnBuy}>
            <img src={VectorIcon} alt="buy" className="mr-2 brightness-[5]" style={smVectorIcon} />
            <span className="text-base">{t("crypto-wallet.home.buy")}</span>
          </Button>
        </div>
      </IntersectionDetector>
      <PullToRefresh
        refreshingContent={
          <div className="text-center">
            <IonSpinner />
          </div>
        }
        pullingContent=""
        onRefresh={onRefresh}
        className="btnBuyTransform">
        <>
          <div className="m-6" data-testid="wallet-balance">
            <WalletBalanceHistoryGraph ariaLabel="WALLET" isRefreshing={isRefreshing} />
          </div>
          <div className="flex px-6 space-x-2.5 justify-center">
            <ActionBuyButtons ariaLabel="WALLET" onBuy={handleOnBuy} disableTabs={disabledTabs} />
          </div>
          <Feature name="humblPay-interestgaining-temp-091221">
            <InterestGainAssets ariaLabel="WALLET" isRefreshing={isRefreshing} />
          </Feature>

          <Feature name="ach-feature-redux-121521">
            <div aria-label="WALLET_TASKS_SECTION" className="mt-4">
              <OnboardingTasksContainer isRefreshing={isRefreshing} />
            </div>
          </Feature>

          <div className="mt-4">
            <div aria-label="WALLET_MYASSETS_COMPONENT">
              <div className=" flex justify-between align-middle mx-5 mb-4">
                <h3 aria-label="WALLET_MYASSETSTITLE_LABEL" className="font-semibold text-xl">
                  {t("wallet.widget.title.my-assets")}
                </h3>
                <button
                  aria-label="WALLET_MYASSETSSEEPORTFOLIO_BUTTON"
                  className="button-small text-blue-dark2"
                  onClick={onClickSeePortfolio}>
                  {t("wallet.widget.action.see-portfolio")}
                </button>
              </div>
              <MyAssetsWidgetContainer ariaLabel="WALLET" checkAssets={setUserHasAssets} isRefreshing={isRefreshing} />
            </div>

            <Feature name="etx-feature-010722">
              <>
                <div className=" flex justify-between align-middle mx-5">
                  <h3 className="font-semibold text-xl">{t("crypto_wallet_home.etx")}</h3>
                </div>
                <EtxCardListContainer isRefreshing={isRefreshing} />
              </>
            </Feature>

            <Tabs ariaLabel="WALLET">
              <Tab title={t("wallet.tab.title.market")} key="market">
                <CryptoCurrencyListTabContainer ariaLabel="WALLET_MARKET" isRefreshing={isRefreshing} />
              </Tab>
              <Tab title={t("wallet.tab.title.transactions")} key="transactions">
                <CryptoRecentTransactionsContainer ariaLabel="WALLET" isRefreshing={isRefreshing} />
              </Tab>
              <Tab title={t("wallet.tab.title.top-movers")} key="movers">
                <CryptoCurrencyTopMoversWidgetContainer ariaLabel="WALLET_TOPMOVERS" isRefreshing={isRefreshing} />
              </Tab>
            </Tabs>
            <div aria-label="WALLET_NEWS_SECTION " className="mx-5">
              <p aria-label="WALLET_NEWSTITLE_LABEL" className="mb-4 font-semibold text-xl">
                {t("wallet.widget.title.news")}
              </p>
              <NewsFeed ariaLabel="WALLET" isRefreshing={isRefreshing} />
            </div>
          </div>
        </>
      </PullToRefresh>
    </div>
  );
};
