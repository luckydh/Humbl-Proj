import React from "react";
import { useTranslation, Trans } from "react-i18next";
import { CreditCardIcon, InfoIconDark } from "assets/icons";
import Banner from "components/Banner/Banner";
import ActionModal from "components/Modules/CryptoWallet/ActionModalAndTabs/ActionModal/ActionModal";
import { Icon } from "components/Icon/Icon";
import Button from "components/Button/Button";

interface Props {
  ariaLabel?: string;
  isModalOpen: boolean;
  setIsModalOpen: (isModalOpen: boolean) => void;
}

export const PaymentLimitationsBanner: React.FC<Props> = ({ setIsModalOpen, isModalOpen, ariaLabel }) => {
  const { t } = useTranslation();

  const handleBannerClick = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleCloseDrawer = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="h-20 px-6 mb-6">
        <Banner
          text={
            <span aria-label={ariaLabel && `${ariaLabel}_PAYMENTLIMITATIONSBODY_LABEL`}>
              <Trans
                i18nKey="crypto-wallet.buy.banner.text"
                components={{ em: <em className="not-italic font-normal text-blue" /> }}
              />
            </span>
          }
          size="fill"
          fontSize="regular"
          bgColor="white"
          leftIcon={
            <img
              src={CreditCardIcon}
              alt="Credit Card Artwork"
              aria-label={ariaLabel && `${ariaLabel}_PAYMENTLIMITATIONSCREDITCARD_ICON`}
            />
          }
          rightIcon={
            <img
              src={InfoIconDark}
              alt="Letter i inside Circle"
              aria-label={ariaLabel && `${ariaLabel}_PAYMENTLIMITATIONSINFO_ICON`}
            />
          }
          onClick={handleBannerClick}
        />
      </div>
      <ActionModal
        background="bg-white"
        ariaLabel="PAYMENTLIMITATIONS"
        setShowActionModal={setIsModalOpen}
        showActionModal={isModalOpen}>
        <div className="pt-4">
          <h1
            className="mb-3 text-xl font-bold text-center text-blue-dark2"
            aria-label="PAYMENTLIMITATIONS_TITLE_LABEL">
            {t("payment-limitations.drawer.both.title")}
          </h1>
          <p className="mb-4 text-sm font-light text-center text-blue-dark2" aria-label="PAYMENTLIMITATIONS_BODY_LABEL">
            {t("payment-limitations.drawer.both.subtitle")}
          </p>
          <div className="flex py-4 border-b border-gray-200">
            <div className="w-max mt-2">
              <Icon name="bold_credit_card" color="blue" size="sm" />
            </div>
            <div className="flex-grow ml-4">
              <h2 className="font-semibold text-blue-dark2">
                {t("payment-limitations.drawer.both.card-section.title")}
              </h2>
              <p className="text-sm font-light leading-tight text-blue-dark2">
                {t("payment-limitations.drawer.both.card-section.subtitle")}
              </p>
            </div>
          </div>
          <div className="flex pt-4 mb-8">
            <div className="w-max mt-2">
              <Icon name="bold_bank" color="blue" size="sm" />
            </div>
            <div className="flex-grow ml-4">
              <h2 className="font-semibold text-blue-dark2">
                {t("payment-limitations.drawer.both.ach-section.title")}
              </h2>
              <p className="text-sm font-light leading-tight text-blue-dark2">
                {t("payment-limitations.drawer.both.ach-section.subtitle")}
              </p>
            </div>
          </div>
          <Button onClick={handleCloseDrawer} ariaLabel="PAYMENTLIMITATIONS_UNDERSTOOD_BUTTON">
            {t("payment-limitations.drawer.both.action")}
          </Button>
        </div>
      </ActionModal>
    </>
  );
};
