import React, { useEffect, useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { IonApp, IonRouterOutlet } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { useTranslation } from "react-i18next";
import { TermsAndConditions } from "pages/TermsAndConditions/TermsAndConditions";
import { route } from "utils/routes";
import { AppUpdateModal } from "utils/update/AppUpdateModal";
import { CoinInfoScreen } from "components/Modules/CryptoWallet/CoinInfoScreen/CoinInfoScreen";
import { PersonalDetailsForm } from "pages/AddNewBankAccount/components/PersonalDetailsForm";
import { useAuth } from "./useAuth";
import Splash from "./pages/Splash";
import Search from "./pages/Search";
import QRCodeScan from "./pages/QRCodeScan/QRCodeScan";
import Login from "./pages/Login";
import ForgotPass from "./pages/ForgotPass";
import Home from "./pages/Home/Home";
import ProfileMain from "./pages/ProfileView/ProfileMain";
import Signup from "./pages/Signup";
import ProfileImageCreate from "./pages/ProfileImageCreate/ProfileImageCreate";
import ProfileEdit from "./pages/ProfileEdit/ProfileEdit";
import UpdateSecurity from "./pages/UpdateSecurity/UpdateSecurity";
import PaymentMethods from "./pages/PaymentMethods";
import CardAdd from "./pages/CardAdd";
import Transactions from "./pages/Transactions";
import CardEdit from "./pages/CardEdit";
import SwitchAccounts from "pages/SwitchAccounts/SwitchAccounts";
import Sales from "pages/Sales";
import SalesDetailsPage from "pages/SalesDetails";
import StripeConnect from "./pages/StripeConnect";
import StripeConfirm from "./pages/StripeConfirm";
import Payment from "pages/Payment";
import CreateMerchantProfile from "./pages/MerchantProfileCreate/MerchantProfileCreate";
import PrivateRoute from "components/PrivateRoute/PrivateRoute";
import PublicRoute from "components/Routes/PublicRoute";
import DiscoveryMap from "./pages/DiscoveryMap";
import MerchantProfileUpdatePage from "./pages/MerchantProfileUpdate/merchantProfileUpdate";
import SuccessMessage from "components/SuccessMessage/SuccessMessage";
import LoadingSplash from "pages/LoadingSplash/LoadingSplash";
import AppUrlListener from "AppUrlListener";
import ProcessorDashboard from "pages/ProcessorDashboard/ProcessorDashboard";
import EmailVerification from "pages/EmailVerification";
import PersonalLoansOffer from "pages/Offers/PersonalLoanOffers";
import CreditCardOffers from "pages/Offers/CreditCardOffers";
import MenuDrawer from "components/ProfileMenu/MenuDrawer";
import MenuSettings from "components/ProfileMenu/MenuSettings";
import { ReviewsPage } from "./pages/Reviews";
import TicketingCheckout from "./pages/Ticketing/Checkout";
import TicketingSuccess from "./pages/Ticketing/Success";
import Blocks from "pages/Offers/Blocks";
import { OnboardingUpdate } from "pages/OnboardingUpdate/OnboardingUpdate";
import { CryptoWalletHome } from "pages/CryptoWallet/CryptoWalletHome";
import { ChooseAssetReceive } from "pages/CryptoWallet/ReceiveFlow/ChooseAsset/ChooseAssetReceive";
import { Receive } from "pages/CryptoWallet/ReceiveFlow/Receive/Receive";
import { SplashScreen } from "@capacitor/splash-screen";
import EventDetail from "pages/EventDetail";
import { OnboardingContainer } from "./pages/MerchantOnboarding/OnboardingContainer";
import { HumblLogo } from "./assets/svgs/HumblLogo";
import Payouts from "pages/Payouts";
import { MyProfile } from "./pages/Profile/MyProfile";
import { BankInfoEditPage } from "./pages/BankInfoEdit/BankInfoEditPage";
import { Feature } from "utils/Feature";
import { MarketListPage } from "pages/MarketList/MarketListPage";
import { App, AppState } from "@capacitor/app";
import { trackEvent } from "utils/analytics/Segment";
import EVENTS from "utils/analytics/AnalyticEvents";
import { PortfolioContainer as Portfolio } from "pages/CryptoWallet/Portfolio/Portfolio";
import { CryptoWithdrawScreen } from "./pages/CryptoWithdraw/CryptoWithdrawScreen";
import { BankListPage } from "./pages/SelectBank/BankListPage";
import { AddBankAccountPage } from "./pages/AddNewBankAccount/AddBankAccountPage";
import { BankDetailsForm } from "pages/AddNewBankAccount/components/BankDetailsForm";
import { UserSearch } from "pages/CryptoWallet/UserSearch/UserSearch";
import { CryptoAllTransactionsContainer } from "./components/Modules/CryptoWallet/CryptoAllTransactions/CryptoAllTransactionsContainer";
import Etx from "pages/ETX/Etx";
import { RecentTransactionsPage } from "pages/ETX/RecentTransactions/RecentTransactionsPage";
import { InvestFlowContainer } from "pages/ETX/InvestFlow/InvestFlowContainer";
import { WithdrawFlowContainer } from "pages/ETX/WithdrawFlow/WithdrawFlowContainer";
import { LayersContainer } from "components/Layers/LayersContainer";

const Routes: React.FC = () => {
  // use auth
  const { authAttempted, user } = useAuth();
  const [showApp, setShowApp] = useState(false);
  const { t } = useTranslation();

  // Once this file is loaded (after <Suspense> on loading language files in the background)
  // we manually hide the native splash screen and instead show our in-app splash video for 3 seconds.
  SplashScreen.hide();

  // Show loading splash component until setTimeout sets showApp to true.
  useEffect(() => {
    setTimeout(() => {
      setShowApp(true);
    }, 4300);
  }, []);

  if (!showApp) {
    return <LoadingSplash />;
  }

  const onAppStateChange = (state: AppState) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    trackEvent(EVENTS.APP_STATE_CHANGED, state as any);
  };

  App.addListener("appStateChange", onAppStateChange);

  return (
    /**
     * We wait here for firebase to perform its initial auto login attempt
     * prior to rendering anything. Without this we see a flash of the login
     * page prior to Firebase logging you in and redirecting into the app.
     */
    authAttempted ? (
      <IonApp>
        <IonReactRouter>
          <AppUrlListener />

          <LayersContainer />

          {!!user && <MenuDrawer />}
          <IonRouterOutlet id="main_content">
            <Switch>
              <PublicRoute
                layout="none"
                path={route.splash}
                componentName="Splash"
                component={Splash}
                exact
                restricted
              />
              <PublicRoute path={route.login} componentName="Login" component={Login} restricted />
              <PublicRoute path={route.signUp} componentName="SignUp" component={Signup} restricted layout="none" />
              <PublicRoute path={route.forgotPassword} componentName="ForgotPass" component={ForgotPass} restricted />
              <PrivateRoute
                layout="none"
                componentName="Email Verification"
                path={route.verify}
                component={EmailVerification}
              />
              <PrivateRoute path={route.home} componentName="Home" component={Home} />
              <PrivateRoute path={route.search} componentName="Search" component={Search} exact />

              <PrivateRoute path={route.qrCodeScan} componentName="QRCodeScan" component={QRCodeScan} layout="none" />

              <PrivateRoute
                path={route.merchantCreateSuccess}
                layout="none"
                componentName="SuccessMessage"
                render={() => (
                  <SuccessMessage message={t("merchant-create-page.success.message.merchant-profile-created")} />
                )}
              />
              <PrivateRoute
                path={route.merchantPaymentAccountSuccess}
                componentName="MerchantPaymentAccountSuccess"
                render={() => <SuccessMessage message={t("post-payment-onboarding-modal")} />}
                layout="none"
              />
              <PrivateRoute
                path={route.stripeConnect}
                componentName="StripeConnect"
                component={StripeConnect}
                title={t("pages-accept-cards.title")}
                layout="modal"
              />
              <PrivateRoute
                path={route.stripeConfirm}
                componentName="StripeConfirm"
                component={StripeConfirm}
                title={t("pages-accept-cards.stripe-confirm.title")}
                layout="none"
              />
              <PrivateRoute
                path={route.processorDash}
                componentName="ProcessorDashboard"
                component={ProcessorDashboard}
                layout="modal"
                title={t("pages-processor-dashboard.title")}
              />
              <PrivateRoute
                path={route.profileImageCreate}
                exact
                layout="unauthed"
                background="bg-profiles"
                componentName="ProfileImageCreate"
                component={ProfileImageCreate}
              />
              <PrivateRoute
                path={route.profileUpdate}
                background="bg-profiles"
                layout="modal"
                title={t("profile-edit-page.title.update-profile")}
                componentName="ProfileEdit"
                component={ProfileEdit}
              />
              <PrivateRoute
                path={route.bankInfoUpdate}
                layout="modal"
                title={t("update-bank-page.title")}
                componentName="BankInfoEditPage"
                component={BankInfoEditPage}
              />
              <PrivateRoute
                path={route.merchantOnboarding}
                componentName="OnboardingContainer"
                component={OnboardingContainer}
                layout="none"
                title={<HumblLogo />}
              />
              <PrivateRoute
                path={route.merchantOnboardingUpdate}
                componentName="OnboardingUpdate"
                component={OnboardingUpdate}
                layout="modal"
                title={<HumblLogo />}
              />
              <PrivateRoute
                path={route.merchantOnboardingUpdateSuccess}
                layout="none"
                componentName="SuccessMessage"
                render={() => (
                  <SuccessMessage message={t("merchant-onboarding-update.success.thanks-for-applying")}>
                    <p className="text-white text-lg">
                      {t("merchant-onboarding-update.success.your-approval-is-pending")}
                    </p>
                  </SuccessMessage>
                )}
              />
              <PrivateRoute
                path={route.merchantCreate}
                componentName="CreateMerchantProfile"
                component={CreateMerchantProfile}
                layout="none"
              />
              <PrivateRoute path={route.profile} componentName="MyProfile" component={MyProfile} exact layout="none" />
              <PrivateRoute
                path={route.discoveryMap}
                componentName="DiscoveryMap"
                component={DiscoveryMap}
                background="bg-profiles"
              />
              <PrivateRoute
                path={route.account_Account_}
                componentName="ProfileMain"
                component={ProfileMain}
                layout="none"
                background="bg-profiles"
                exact
              />
              <PrivateRoute
                path={route.account_Account_ratings}
                componentName="ReviewsPage"
                component={ReviewsPage}
                layout="modal"
                background="bg-profiles"
                title={t("review-page.title.reviews")}
                exact
              />
              <PrivateRoute
                path={route.account_Account_pay}
                componentName="Payment"
                component={Payment}
                layout="none"
                exact
              />
              <PrivateRoute
                path={route.paymentMethods}
                title={t("pages-cards.title.my-payment-methods")}
                layout="modal"
                componentName="PaymentMethods"
                horizontalPadding={false}
                component={PaymentMethods}
                exact
              />
              <PrivateRoute path={route.cardsAdd} componentName="CardAdd" component={CardAdd} layout="none" exact />
              <PrivateRoute
                path={route.cards_Card_edit}
                layout="none"
                componentName="CardEdit"
                component={CardEdit}
                title={t("pages-card-edit.title.edit-card")}
              />
              <PrivateRoute
                path={route.updateSecurity}
                componentName="UpdateSecurity"
                component={UpdateSecurity}
                layout="none"
              />
              <PrivateRoute
                path={route.settings}
                componentName="MenuSettings"
                component={MenuSettings}
                title={t("pages-settings.title.my-settings")}
                layout="none"
              />
              <PrivateRoute
                path={route.accountSwitch}
                title={t("pages-switch-account.title.switch-accounts")}
                componentName="SwitchAccounts"
                component={SwitchAccounts}
                layout="none"
                exact
              />
              <PrivateRoute
                title={t("transactions-page.your-transactions")}
                path={route.transactions}
                layout="modal"
                componentName="Transactions"
                component={Transactions}
                exact
              />
              <PrivateRoute path={route.sales} layout="none" componentName="Sales" component={Sales} exact />
              <PrivateRoute
                path={route.sales_Sale}
                componentName="SalesDetailsPage"
                component={SalesDetailsPage}
                layout="none"
              />
              <PrivateRoute
                path={route.merchantUpdateProfile}
                title={t("merchant-profile-update-page.title.update-profile")}
                componentName="MerchantProfileUpdatePage"
                component={MerchantProfileUpdatePage}
                background="bg-profile"
                layout="modal"
              />
              <PrivateRoute path={route.payouts} exact componentName="Payouts" component={Payouts} layout="none" />
              <PrivateRoute
                path={route.offersPersonalLoans}
                exact
                title={t("pages.offers.personal-loans.title")}
                componentName="PersonalLoansOffer"
                component={PersonalLoansOffer}
                layout="modal"
              />
              <PrivateRoute
                path={route.offersCreditCards}
                exact
                title={t("pages.offers.credit-cards.title")}
                componentName="CreditCardOffers"
                component={CreditCardOffers}
                layout="modal"
              />
              <PrivateRoute
                path={route.offersBlocks}
                exact
                title={t("pages.offers.etx")}
                componentName="Blocks"
                component={Blocks}
                layout="modal"
              />
              <PrivateRoute
                path={route.account_Account_Ticketing_Platform_Events_Event__PageState_}
                exact
                componentName="EventDetail"
                component={EventDetail}
                layout="none"
              />
              <PrivateRoute
                path={route.account_Account_Ticketing_Platform_Orders_Order_}
                exact
                componentName="TicketingCheckout"
                component={TicketingCheckout}
                layout="none"
              />
              <PrivateRoute
                path={route.account_Account_Ticketing_Platform_Orders_Order_Success}
                exact
                componentName="TicketingSuccess"
                component={TicketingSuccess}
                layout="none"
              />
              <PrivateRoute
                path={route.cryptoWallet}
                exact
                componentName="CryptoWalletHome"
                component={CryptoWalletHome}
              />
              <PrivateRoute
                path={route.cryptoWalletTransactionsAll}
                exact
                layout="modal"
                horizontalPadding={false}
                title={t("crypto-wallet.all-transactions.title")}
                componentName="CryptoAllTransactionsContainer"
                component={CryptoAllTransactionsContainer}
              />
              <PrivateRoute
                path={route.cryptoWalletCoinInfo_Coin_}
                exact
                layout="none"
                componentName="CoinInfoScreen"
                component={CoinInfoScreen}
              />

              {/* RECEIVE FLOW ROUTES */}
              <PrivateRoute
                path={route.cryptoWalletReceive}
                exact
                layout="none"
                componentName="ChooseAssetReceive"
                component={ChooseAssetReceive}
              />
              <PrivateRoute
                path={route.cryptoWalletReceive_Crypto_}
                exact
                layout="none"
                componentName="Receive"
                component={Receive}
              />
              {/* RECEIVE FLOW ROUTES */}

              {/* SEND FLOW ROUTES */}
              <PrivateRoute
                path={route.cryptoWalletUserSearch}
                exact
                layout="none"
                componentName="CryptoUserSearch"
                render={() => <UserSearch title={t("user.search.title")} />}
              />
              <PrivateRoute
                path={route.cryptoWalletUserSearch_Currency_}
                exact
                layout="modal"
                horizontalPadding={false}
                title={t("user.search.title")}
                componentName="CryptoUserSearch"
                render={() => <UserSearch title={t("user.search.title")} />}
              />

              <PrivateRoute
                path={route.coinMarket}
                exact
                layout="none"
                componentName="MarketListPage"
                render={() => <MarketListPage title={t("market.title")} />}
              />
              <PrivateRoute
                ariaLabel="PORTFOLIO"
                path={route.portfolio}
                title={t("pages.crypto-wallet.portfolio.portfolio")}
                layout="modal"
                componentName="Portfolio"
                component={Portfolio}
                horizontalPadding={false}
                exact
              />

              <PrivateRoute
                path={route.terms}
                title={t("pages.crypto-wallet.portfolio.portfolio")}
                componentName="TermsAndConditions"
                component={TermsAndConditions}
                exact
              />

              <PrivateRoute
                path={route.cryptoWalletWitdraw}
                exact
                layout="none"
                componentName="CryptoWithdrawScreen"
                component={CryptoWithdrawScreen}
              />
              <PrivateRoute
                path={route.cryptoWalletWitdraw_Crypto_}
                exact
                layout="none"
                componentName="CryptoWithdrawScreen"
                component={CryptoWithdrawScreen}
              />
              <PrivateRoute
                path={route.bankSelect}
                exact
                layout="none"
                componentName="BankListPage"
                component={BankListPage}
              />
              <PrivateRoute
                path={route.bankAccountAdd}
                exact
                layout="none"
                componentName="AddBankAccountPage"
                component={AddBankAccountPage}
              />
              <PrivateRoute
                path={route.bankDetailsAdd}
                exact
                layout="none"
                componentName="BankDetailsForm"
                component={BankDetailsForm}
              />
              <PrivateRoute
                path={route.personalDetals}
                exact
                layout="none"
                componentName="PersonalDetailsForm"
                component={PersonalDetailsForm}
              />

              {/* TODO: ETX/Blocks determine which of these should be layers instead. */}
              <PrivateRoute
                path={route.etxInsights}
                exact
                componentName="EtxInsights"
                render={() => (
                  <Feature name="etx-feature-010722">
                    <Etx />
                  </Feature>
                )}
                layout="none"
              />
              <PrivateRoute
                path={route.etxInsightsInvest}
                exact
                componentName="InvestFlowContainer"
                render={() => (
                  <Feature name="etx-feature-010722">
                    <InvestFlowContainer />
                  </Feature>
                )}
                layout="none"
              />
              <PrivateRoute
                path={route.etxWithdraw}
                exact
                componentName="WithdrawFlowContainer"
                render={() => (
                  <Feature name="etx-feature-010722">
                    <WithdrawFlowContainer />
                  </Feature>
                )}
                layout="none"
              />
              <PrivateRoute
                path={route.etxTransactionsAll}
                exact
                layout="modal"
                horizontalPadding={false}
                title={t("etx.all-transactions.title")}
                componentName="RecentTransactionsPage"
                render={() => (
                  <Feature name="etx-feature-010722">
                    <RecentTransactionsPage />
                  </Feature>
                )}
              />
              <Route path="/" render={() => <Redirect to={route.splash} />} exact />
              <Redirect to={route.verify} />
            </Switch>
          </IonRouterOutlet>
        </IonReactRouter>
        <AppUpdateModal />
      </IonApp>
    ) : (
      <LoadingSplash /> // This should be a loading splash page
    )
  );
};

export default Routes;
