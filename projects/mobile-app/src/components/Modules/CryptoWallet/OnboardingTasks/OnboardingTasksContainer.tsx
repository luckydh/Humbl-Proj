import React from "react";

import { useGetCurrentAccount } from "hooks/useGetCurrentAccount";
import { Illustration } from "components/Illustration/Illustration";
import { OnboardingTask } from "./OnboardingTask";
import { PaymentMethodCategory, MembershipStatus, useGetMyPaymentMethodsQuery } from "generated/graphql";
import { useTranslation } from "react-i18next";
import { PlaidWrapper } from "components/Plaid/PlaidWrapper";
import useRefreshFetch from "utils/hooks/useRefreshFetch";
import { useCanUsePlaid } from "components/Plaid/plaidHook";
import { useLayerManager } from "components/Layers/hooks";
import { IllustrationsType } from "assets/illustrations2";
import { useWarningModal } from "hooks/useWarningModal";

interface OnboardingTasksContainerProps {
  isRefreshing?: boolean;
}

export const OnboardingTasksContainer: React.FC<OnboardingTasksContainerProps> = ({ isRefreshing = false }) => {
  const { t } = useTranslation();
  const { currentAccount } = useGetCurrentAccount();
  const layerManager = useLayerManager();
  const canUsePlaid = useCanUsePlaid();
  const { warningModal, setWarningModalError } = useWarningModal();

  const { data: banksData, refetch } = useGetMyPaymentMethodsQuery({
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-first",
    variables: {
      paymentMethodCategory: PaymentMethodCategory.Ach,
    },
  });
  useRefreshFetch(isRefreshing, refetch);

  const taskList = [];

  if (currentAccount?.kycNeeded) {
    const kycStatus = currentAccount.kycStatus?.status;

    const kycTask = {} as { title: string; description: string; iconName: IllustrationsType };
    if (kycStatus === MembershipStatus.Pending) {
      kycTask.title = t("onboarding.tasks.kyc-pending.title");
      kycTask.description = t("onboarding.tasks.kyc-pending.description");
      kycTask.iconName = "bank_time";
    } else if (kycStatus === MembershipStatus.ActionsNeeded) {
      kycTask.title = t("onboarding.tasks.kyc-actions-needed.title");
      kycTask.description = t("onboarding.tasks.kyc-actions-needed.description");
      kycTask.iconName = "bank_warning";
    } else {
      // INITIAL STATE
      kycTask.title = t("onboarding.tasks.kyc.title");
      kycTask.description = t("onboarding.tasks.kyc.description");
      kycTask.iconName = "document";
    }

    taskList.push({
      key: "kyc",
      component: (
        <OnboardingTask
          title={kycTask.title}
          description={kycTask.description}
          icon={<Illustration name={kycTask.iconName} size="md" />}
          onClick={
            kycStatus === MembershipStatus.Pending
              ? undefined
              : () => {
                  layerManager.open("updateKYC");
                }
          }
          ariaLabel="WALLET_ADDDETAILS_BUTTON"
        />
      ),
    });
  }

  if (canUsePlaid && !banksData?.paymentMethods?.length) {
    const handleOnSuccess = () => {
      refetch();
    };

    taskList.push({
      key: t("onboarding.tasks.add-bank.title"),
      component: (
        <PlaidWrapper onSuccess={handleOnSuccess} onError={setWarningModalError}>
          <OnboardingTask
            title={t("onboarding.tasks.add-bank.title")}
            description={t("onboarding.tasks.add-bank.description")}
            icon={<Illustration name="bank_plus" size="md" />}
            ariaLabel="WALLET_ADDBANK_BUTTON"
          />
        </PlaidWrapper>
      ),
    });
  }

  if (!taskList.length) {
    return null;
  }

  return (
    <>
      <div className=" flex justify-between align-middle mx-5 mb-4">
        <h3 aria-label="WALLET_TASK_LABEL" className="font-semibold text-xl">
          {t("wallet.widget.title.tasks")}
        </h3>
      </div>
      <div className="w-full overflow-x-auto whitespace-nowrap flex">
        {taskList.map((task) => (
          <div key={task.key} className="first:ml-5 mr-5">
            {task.component}
          </div>
        ))}
      </div>
      {warningModal}
    </>
  );
};
