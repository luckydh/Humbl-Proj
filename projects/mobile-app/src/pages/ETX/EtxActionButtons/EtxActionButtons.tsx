import React, { useState } from "react";
import { IonIcon } from "@ionic/react";
import { VectorIcon, TransferIcon } from "assets/icons";
import { buildPath } from "utils/routes";
import { useHistory } from "react-router";
import { useTranslation } from "react-i18next";
import { useGetEtxWalletMutation, DistributionCurrency } from "generated/graphql";
import { OverlayLoading } from "components/OverlayLoading/OverlayLoading";
import { WarningModal } from "components/WarningModal";
import { Icon } from "components/Icon/Icon";
import { captureException } from "ErrorLogger";
import { PortfolioCompositionDataProps } from "../PortfolioComposition/PortfolioComposition";

const DURATION = 2000;
interface EtxActionButtonsProps {
  portfolioCompositionArray: PortfolioCompositionDataProps[] | [];
  blockLogo: string;
  blockName: string;
  etxKey: string;
  distribution: DistributionCurrency[];
  ariaLabel?: string;
}

const EtxActionButtons: React.FC<EtxActionButtonsProps> = ({
  portfolioCompositionArray,
  blockLogo,
  blockName,
  etxKey,
  distribution,
  ariaLabel,
}) => {
  // TODO: ETX/Blocks move outside of component
  const BUTTON_BASE_STYLE = "rounded-lg flex flex-row items-center justify-center text-md py-3 w-full font-medium";
  const history = useHistory();
  const { t } = useTranslation();
  // TODO: ETX/Blocks consider lazy query here
  const [createEtxWallet, { loading }] = useGetEtxWalletMutation();
  const [showWarning, setShowWarning] = useState<boolean>(false);
  const onInvest = async () => {
    try {
      await createEtxWallet();
      history.push({
        pathname: buildPath("etxInsightsInvest"),
        state: {
          blockLogo,
          blockName,
          etxKey,
          distribution,
        },
      });
    } catch (error) {
      setShowWarning(true);
      captureException(error);
    }
  };

  return (
    <>
      <div className="flex px-5 space-x-2.5 justify-center">
        <button
          className={`${BUTTON_BASE_STYLE} bg-white text-blue-dark mr-2`}
          onClick={onInvest}
          aria-label={ariaLabel && `${ariaLabel}_INVEST_BUTTON`}
        >
          <IonIcon className="mr-2" icon={VectorIcon} />
          {t("etx-insights.invest")}
        </button>
        <button
          className={`${BUTTON_BASE_STYLE} bg-blue-dark text-white`}
          onClick={() => {
            // TODO: ETX/Blocks move to handler
            history.push({
              pathname: buildPath("etxWithdraw"),
              state: {
                portfolioCompositionArray,
                blockName,
                etxKey,
              },
            });
          }}
          aria-label={ariaLabel && `${ariaLabel}_WITHDRAW_BUTTON`}
        >
          <IonIcon className="mr-2 text-2xl" icon={TransferIcon} />
          {t("etx-insights.withdraw")}
        </button>
      </div>
      {loading && <OverlayLoading isOpen={loading} />}
      <WarningModal
        show={!!showWarning}
        duration={DURATION}
        title={<Icon name="bold_danger" color="red" size="md" />}
        onDismiss={() => setShowWarning(false)}
        message={t("global.generic.error")}
      />
    </>
  );
};

export default EtxActionButtons;
