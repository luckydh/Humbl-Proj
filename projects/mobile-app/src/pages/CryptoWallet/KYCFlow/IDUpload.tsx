import React, { useState } from "react";
import { Icon } from "components/Icon/Icon";
import ImageUploader from "components/imageUploader/ImageUploader";
import { useKYCActions, useKYCForm } from "./KYCFlowContext";
import { ContinueButton } from "./ContinueButton";
import PageHeading from "./PageHeading";
import { Rect } from "self-define-app";
import { useTranslation } from "react-i18next";
import { Illustration } from "components/Illustration/Illustration";
import { CameraDirection } from "@capacitor/camera";
import { GovernmentIdInput } from "generated/graphql";
import { trackEvent } from "utils/analytics/Segment";
import { captureImage } from "imageManipulation/captureImage";
import EVENTS from "utils/analytics/AnalyticEvents";
import { captureException } from "ErrorLogger";
import { SelectDocument } from "./SelectDocumentModal";
import { GuideLineBox } from "./GuideLineBox";
import ImageEdit from "components/imageUploader/ImageEdit";

const REQUIRES_FRONT_BACK = new Set([GovernmentIdInput.GovtId, GovernmentIdInput.DrivingLicense]);

export const IDUpload: React.FC = () => {
  const { t } = useTranslation();
  const [showGuideLineModal, setGuideLineModal] = useState(false);
  const [showSelectDocumentModal, setSelectDocumentModal] = useState(false);
  const [shouldShowImageUploader, setShouldShowImageUploader] = useState(false);
  const [imageString, setImageString] = useState<string | undefined>(undefined);

  const {
    formData: { govIdBack, govIdFront, govIdType, isGuideLineAccepted },
    setFormData,
  } = useKYCForm();
  const { next } = useKYCActions();

  const needsBackImage = govIdType && REQUIRES_FRONT_BACK.has(govIdType);

  const onGuideLineContinueClick = () => {
    setGuideLineModal(false);
    setFormData({ type: "IsGuideLineAccepted", payload: true });
    handleCaptureImage();
  };

  const onImageEditCropDone = (image: string, pixels: Rect, binary?: string) => {
    setShouldShowImageUploader(false);
    trackEvent(EVENTS.PHOTO_VERIFIED, { screenName: "kyc" });
    if (!binary) {
      return;
    }
    setFormData({ type: "FrontImage", payload: { src: image, binary } });
  };

  const handleCaptureImage = async () => {
    trackEvent(EVENTS.PHOTO_CAPTURE_INITIATED, { screenName: "kyc" });
    await captureImage(CameraDirection.Rear)
      .then((response) => {
        trackEvent(EVENTS.PHOTO_SELECTED, { screenName: "kyc" });
        setShouldShowImageUploader(true);
        setImageString(response);
      })
      .catch((error) => {
        captureException(error);
        setShouldShowImageUploader(false);
      });
  };

  const onSelectDocumentContinue = () => {
    setSelectDocumentModal(false);
    setGuideLineModal(true);
  };

  const onImageEditModalBack = () => {
    setFormData({ type: "FrontImage", payload: { src: "", binary: "" } });
    setFormData({ type: "IsGuideLineAccepted", payload: false });
    setShouldShowImageUploader(false);
    setGuideLineModal(true);
  };

  const guideLineOptions = [
    {
      title:
        govIdType === GovernmentIdInput.Passport
          ? t("kyc.id.guidelines.personal.details.main.view")
          : t("kyc.id.guidelines.fit.inside.cropping.box"),
    },
    { title: t("kyc.id.guidelines.flat.surface") },
    { title: t("kyc.id.guidelines.dark.background") },
  ];

  return (
    <>
      <PageHeading title={t("kyc.id.page.title")} description={t("kyc.id.page.description")} ariaLabel="KYC_UPLOAD" />
      <div className="mb-6 w-full">
        {isGuideLineAccepted ? (
          <>
            <ImageInput showTitle={!!needsBackImage} imageType="FrontImage" image={govIdFront?.src} ariaLabel="KYC" />
            {needsBackImage && <ImageInput showTitle imageType="BackImage" image={govIdBack?.src} ariaLabel="KYC" />}
          </>
        ) : (
          <ImageUploadSection
            onClick={() => {
              setSelectDocumentModal(true);
            }}
            ariaLabel="KYC"
            icon={<Icon name="outline_send" size="lg" color="light-bright-blue" />}
            inputTitleText={t("kyc.id.page.title")}
            linkTitle={t("kyc.id.input.description")}
          />
        )}
      </div>
      <SelectDocument
        showSelectDocumentModal={showSelectDocumentModal}
        onClickContinue={onSelectDocumentContinue}
        ariaLabel="KYC_DOCUMENT"
        onClickBack={() => setSelectDocumentModal(false)}
      />
      <ContinueButton
        type="button"
        disabled={!govIdType || !govIdFront || (!govIdBack && needsBackImage) || !isGuideLineAccepted}
        onClick={next}
      />
      <GuideLineBox
        ariaLabel="KYC_GUIDELINE"
        onClickContinue={onGuideLineContinueClick}
        showGuideLineModal={showGuideLineModal}
        onClickBack={() => {
          setGuideLineModal(false);
        }}
        guideLineOptions={guideLineOptions}
      />
      <ImageEdit
        imageString={imageString}
        isOpen={shouldShowImageUploader}
        includeBinary
        cropShape="rect"
        onDidDismiss={() => {
          setShouldShowImageUploader(false);
        }}
        onChooseAnother={handleCaptureImage}
        onBack={onImageEditModalBack}
        onCrop={onImageEditCropDone}
      />
    </>
  );
};

interface ImageInpuProps {
  imageType: "BackImage" | "FrontImage";
  showTitle: boolean;
  image?: string;
  ariaLabel?: string;
}

const ImageInput: React.FC<ImageInpuProps> = ({ image, imageType, showTitle, ariaLabel }) => {
  const { t } = useTranslation();
  const {
    formData: { govIdType },
    setFormData,
  } = useKYCForm();

  const handleComplete = async (imageString: string, pixels: Rect, binary?: string) => {
    if (!binary) {
      return;
    }

    setFormData({ type: imageType, payload: { src: imageString, binary } });
  };

  const getInputTitleText = () => {
    switch (govIdType) {
      case GovernmentIdInput.GovtId:
        return imageType === "BackImage" ? t("kyc.id.input.back.govt.id.title") : t("kyc.id.input.front.govt.id.title");
      case GovernmentIdInput.DrivingLicense:
        return imageType === "BackImage"
          ? t("kyc.id.input.back.driver.license.title")
          : t("kyc.id.input.front.driver.license.title");
      case GovernmentIdInput.Passport:
        return imageType === "FrontImage" ? t("kyc.id.input.front.passport.title") : "";
      default:
        return t("kyc.id.input.back.title");
    }
  };

  const titleText = imageType === "BackImage" ? t("kyc.id.back.title") : t("kyc.id.front.title");
  // Front Input Title will never be visible
  const inputTitleText = getInputTitleText();
  const icon =
    imageType === "BackImage" ? (
      <Illustration name="id_back" size="md" />
    ) : (
      <Icon name="outline_send" size="xl" color="light-bright-blue" />
    );

  return (
    <div className="mt-8">
      {showTitle && <div className="text-lg font-semibold text-white mb-4">{titleText}</div>}
      <ImageUploader
        cameraDirection={CameraDirection.Rear}
        includeBinary
        variant="fill"
        cropShape="rect"
        onFinish={handleComplete}
        ariaLabel={ariaLabel}>
        {image ? (
          <div className="relative inline-block" aria-label={ariaLabel ? `${ariaLabel}_ID_IMAGE` : "ID_IMAGE"}>
            <img src={image} alt={imageType} />
            <div className="absolute bottom-2 right-2 shadow-md rounded-full p-3 bg-blue-dark2">
              <Icon name="bold_camera" size="sm" />
            </div>
          </div>
        ) : (
          <ImageUploadSection
            icon={icon}
            inputTitleText={inputTitleText}
            ariaLabel={ariaLabel}
            linkTitle={t("kyc.id.input.description")}
          />
        )}
      </ImageUploader>
    </div>
  );
};

type ImageUploadSectionProps = {
  icon: JSX.Element;
  inputTitleText: string;
  ariaLabel?: string;
  linkTitle: string;
  onClick?: () => void;
};
const ImageUploadSection: React.FC<ImageUploadSectionProps> = ({
  icon,
  inputTitleText,
  ariaLabel,
  onClick,
  linkTitle,
}) => (
  <div
    aria-label={ariaLabel ? `${ariaLabel}_UPLOAD_SECTION` : "UPLOAD_SECTION"}
    onClick={onClick}
    className="flex flex-col items-center border-2 border-dashed rounded-md border-blue-dark bg-blue-lightest px-4 py-7">
    {icon}
    <div
      aria-label={ariaLabel ? `${ariaLabel}_UPLOAD_DOCUMENT_TITLE_LABEL` : "UPLOAD_DOCUMENT_TITLE_LABEL"}
      className="text-lg mt-3 mb-2 text-blue-dark font-semibold">
      {inputTitleText}
    </div>
    <div
      aria-label={ariaLabel ? `${ariaLabel}_UPLOAD_DOCUMENT_LINK_LABEL` : "UPLOAD_DOCUMENT_LINK_LABEL"}
      className="text-base text-light-bright-blue font-semibold">
      {linkTitle}
    </div>
  </div>
);
