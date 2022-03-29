import React, { FC, useState } from "react";
import { captureImage } from "imageManipulation/captureImage";
import { Rect } from "../../self-define-app";
import ImageEdit from "./ImageEdit";
import { trackEvent } from "utils/analytics/Segment";
import EVENTS from "utils/analytics/AnalyticEvents";
import { useLocation } from "react-router";
import { captureException } from "ErrorLogger";
import { CameraDirection } from "@capacitor/camera";

export type ImageUploaderProps = {
  variant?: "block" | "fill";
  cropShape?: "rect" | "round";
  includeBinary?: boolean;
  onFinish: (image: string, pixels: Rect, binary?: string) => void;
  ariaLabel?: string;
  cameraDirection?: CameraDirection;
};

export const ImageUploader: FC<ImageUploaderProps> = ({
  cropShape,
  onFinish,
  children,
  includeBinary,
  variant = "block",
  ariaLabel,
  cameraDirection,
}) => {
  const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
  const [imageString, setImageString] = useState<string | undefined>(undefined);
  const location = useLocation();

  const onCloseEdit = (): void => {
    setImageString(undefined);
    setIsEditOpen(false);
  };

  const onCropDone = (image: string, pixels: Rect, binary?: string) => {
    setIsEditOpen(false);
    trackEvent(EVENTS.PHOTO_VERIFIED, { pathName: location.pathname });
    onFinish(image, pixels, binary);
  };

  const handleCaptureImage = async () => {
    trackEvent(EVENTS.PHOTO_CAPTURE_INITIATED, { pathName: location.pathname });
    await captureImage(cameraDirection)
      .then((response) => {
        trackEvent(EVENTS.PHOTO_SELECTED, { pathName: location.pathname });
        setIsEditOpen(true);
        setImageString(response);
      })
      .catch((error) => {
        captureException(error);
        setIsEditOpen(false);
      });
  };

  return (
    <>
      <ImageEdit
        imageString={imageString}
        cropShape={cropShape}
        isOpen={isEditOpen}
        includeBinary={includeBinary}
        onDidDismiss={onCloseEdit}
        onChooseAnother={handleCaptureImage}
        onCrop={onCropDone}
        ariaLabel={ariaLabel}
      />
      <button
        aria-label={ariaLabel ? `${ariaLabel}_UPLOAD_BUTTON` : "UPLOAD_IMAGE_BUTTON"}
        className={variant === "block" ? "block" : "w-full"}
        onClick={handleCaptureImage}>
        {children}
      </button>
    </>
  );
};

export default ImageUploader;
