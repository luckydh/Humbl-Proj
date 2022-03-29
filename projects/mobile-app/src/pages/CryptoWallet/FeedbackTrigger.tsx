import { showReportDialog } from "ErrorLogger";
import { useGetCurrentAccount } from "hooks/useGetCurrentAccount";
import React, { useState } from "react";
import ActionModal from "components/Modules/CryptoWallet/ActionModalAndTabs/ActionModal/ActionModal";
import { useTranslation } from "react-i18next";
import { getCurrentUserEmail } from "../../Firebase";

export const FeedbackTrigger: React.FC = ({ children }) => {
  const { currentAccount } = useGetCurrentAccount();
  const { t } = useTranslation();

  const [showFeedbackModal, setShowFeedbackModal] = useState(false);

  const handleFeedbackWrapperClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowFeedbackModal(true);
  };

  const handleSendFeedback = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowFeedbackModal(false);
    showReportDialog({
      name: currentAccount?.displayName ?? "",
      email: getCurrentUserEmail(),
    });
  };

  return (
    <>
      <div onClick={handleFeedbackWrapperClick}>{children}</div>
      <ActionModal
        ariaLabel="FEEDBACK_TRIGGER"
        background="bg-white"
        showActionModal={showFeedbackModal}
        contentClass="send-feedback"
        setShowActionModal={setShowFeedbackModal}
        showCloseButton
      >
        <h1 className="text-blue-dark2 text-xl font-bold text-center mb-2">{t("send-feedback-modal.title")}</h1>
        <p className="text-blue-dark2 text-center mb-4">{t("send-feedback-modal.description")}</p>
        <button className="text-blue" type="button" onClick={handleSendFeedback}>
          {t("send-feedback-modal.send-button")}
        </button>
      </ActionModal>
    </>
  );
};
