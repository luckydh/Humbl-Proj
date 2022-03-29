import { IonModal } from "@ionic/react";
import { CloseIcon } from "assets/svgs/CloseIcon";
import { Illustration } from "components/Illustration/Illustration";
import { LayoutModal } from "components/PageTemplates/LayoutModal";
import { GovernmentIdInput } from "generated/graphql";
import React from "react";
import { useTranslation } from "react-i18next";
import { useKYCForm } from "./KYCFlowContext";
import cx from "classnames";
import { GovtId, Passport } from "assets/icons";
import { ContinueButton } from "./ContinueButton";
import { Icon } from "components/Icon/Icon";

interface GuideLineBoxProps {
  guideLineOptions: { title: string }[];
  showGuideLineModal: boolean;
  onClickBack: () => void;
  onClickContinue: () => void;
  ariaLabel?: string;
}

export const GuideLineBox: React.FC<GuideLineBoxProps> = ({
  guideLineOptions,
  showGuideLineModal,
  onClickBack,
  onClickContinue,
  ariaLabel,
}) => {
  const { t } = useTranslation();
  const {
    formData: { govIdType },
  } = useKYCForm();
  const isPassportSelected = govIdType === GovernmentIdInput.Passport;

  return (
    <IonModal isOpen={showGuideLineModal}>
      <LayoutModal
        title={t("kyc.id.guidelines.id.guidelines")}
        horizontalPadding={false}
        ariaLabel={ariaLabel}
        onClickBack={onClickBack}
        rightClickIcon={
          <div className="m-2 mt-3">
            <CloseIcon />
          </div>
        }
        onRightClick={onClickBack}>
        <div className="h-full flex flex-col text-white">
          <div aria-label={ariaLabel && `${ariaLabel}_ICON`} className="mb-3 mt-4 self-center">
            <Illustration name="id_check" size="md" />
          </div>
          <div className="mx-6 text-white">
            <h6 aria-label={ariaLabel && `${ariaLabel}_TITLE`} className="text-lg font-semibold text-center mb-6">
              {isPassportSelected ? t("kyc.id.guidelines.tips.uploading.passport") : t("kyc.id.guidelines.title")}
            </h6>
            {guideLineOptions?.map((item, index) => (
              <div key={item.title} className="my-4">
                <GuideLineItem
                  title={item.title}
                  shouldShowBorder={index !== guideLineOptions.length - 1}
                  ariaLabel="KYC"
                />
              </div>
            ))}
          </div>
          <div className="mx-4 mt-4">
            <div
              className={cx("background-dark-blue-4 border-green-positive rounded-md border-4 flex flex-col px-4", {
                "py-4": !isPassportSelected,
                "pb-4": isPassportSelected,
              })}>
              {isPassportSelected ? (
                <img aria-label={ariaLabel && `${ariaLabel}_IDENTIFICATION_IMAGE`} src={Passport} alt="Passport" />
              ) : (
                <img aria-label={ariaLabel && `${ariaLabel}_IDENTIFICATION_IMAGE`} src={GovtId} alt="Govt Id" />
              )}
            </div>
          </div>
          <ContinueButton type="button" variant="normal" onClick={onClickContinue} />
        </div>
      </LayoutModal>
    </IonModal>
  );
};

type GuideLineItemProps = {
  title: string;
  shouldShowBorder?: boolean;
  ariaLabel?: string;
};

export const GuideLineItem: React.FC<GuideLineItemProps> = ({ title, shouldShowBorder, ariaLabel }) => (
  <>
    <div className="flex flex-row">
      <Icon name="outline_checkmark" size="sm" />
      <div className="pl-3 flex-1">
        <div
          className="text-base font-semibold"
          aria-label={ariaLabel ? `${ariaLabel}_GUIDE_ITEM_TITLE` : "GUIDE_ITEM_TITLE"}>
          {title}
        </div>
      </div>
    </div>
    <div className={cx({ "border-b mt-4 border-white opacity-50": shouldShowBorder })} />
  </>
);
