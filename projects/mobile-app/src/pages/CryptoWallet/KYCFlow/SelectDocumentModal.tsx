import Button from "components/Button/Button";
import { CheckBoxCard } from "components/CheckBoxCard";
import { Icon } from "components/Icon/Icon";
import ActionModal from "components/Modules/CryptoWallet/ActionModalAndTabs/ActionModal/ActionModal";
import { GovernmentIdInput } from "generated/graphql";
import { Title } from "pages/PaymentMethods/common";
import React from "react";
import { useTranslation } from "react-i18next";
import { useKYCForm } from "./KYCFlowContext";
import "./style.scss";

const options = [
  { label: "kyc.id.input.gov-id", value: GovernmentIdInput.GovtId, icon: <Icon name="bold_id" size="md" /> },
  {
    label: "kyc.id.input.drivers-license",
    value: GovernmentIdInput.DrivingLicense,
    icon: <Icon name="outline_gov" size="md" />,
  },
  {
    label: "kyc.id.input.passport",
    value: GovernmentIdInput.Passport,
    icon: <Icon name="bold_passport" size="md" />,
  },
];

const CheckIsSelected = (identifier?: string) => {
  const {
    formData: { govIdType },
  } = useKYCForm();

  if (govIdType) {
    return govIdType === identifier;
  }
  return false;
};

interface SelectDocumentProps {
  showSelectDocumentModal: boolean;
  onClickBack: () => void;
  onClickContinue: () => void;
  ariaLabel: string;
}

export const SelectDocument: React.FC<SelectDocumentProps> = ({
  showSelectDocumentModal,
  onClickBack,
  onClickContinue,
  ariaLabel,
}) => {
  const { t } = useTranslation();
  const {
    formData: { govIdType },
    setFormData,
  } = useKYCForm();

  const handleSelectChange = (value: GovernmentIdInput) => {
    setFormData({ type: "GovIdType", payload: value as GovernmentIdInput });
  };

  return (
    <ActionModal
      titleVariant="semiBold"
      showCloseButton
      closeButtonIsText
      title="Select Document"
      crossButtonTestId="KYC_DOCUMENT_CLOSE_BUTTON"
      ariaLabel={ariaLabel}
      background="bg-blue-lightest"
      showActionModal={showSelectDocumentModal}
      setShowActionModal={onClickBack}
      onCloseClick={onClickBack}
    >
      <div className="max-w-full overflow-hidden">
        <div className="-mx-6">
          {options?.map((option) => (
            <div key={option.label} className="mb-2">
              <CheckBoxCard
                ariaLabel={ariaLabel}
                title={<Title>{t(option.label)!}</Title>}
                icon={<div className="rounded-lg p-1.5 background-blue">{option.icon}</div>}
                onClick={() => {
                  handleSelectChange(option.value);
                }}
                selected={CheckIsSelected(option.value)}
              />
            </div>
          ))}
          <div className="mx-6 mt-4 my-6">
            <Button
              size="small"
              ariaLabel={ariaLabel && `${ariaLabel}_CONTINUE_BUTTON`}
              type="button"
              isDisabled={!govIdType}
              onClick={onClickContinue}
            >
              {t("global.continue")}
            </Button>
          </div>
        </div>
      </div>
    </ActionModal>
  );
};
