import React, { useEffect, useCallback, useState } from "react";
import Cropper from "react-easy-crop";
import { useTranslation } from "react-i18next";
import { Capacitor } from "@capacitor/core";
import { IonModal } from "@ionic/react";
import { Rect } from "self-define-app";
import { captureException } from "ErrorLogger";
import Modal from "components/Modal/Modal";
import createCroppedImage from "../../imageManipulation/createCroppedImage";
import Button from "../Button/Button";

const platform = Capacitor.getPlatform();

const initialCroppedArea = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
};

interface ImageEditProps {
  imageString?: string;
  cropShape?: "rect" | "round";
  includeBinary?: boolean;
  onCrop: (image: string, pixels: Rect, binary?: string) => void;
  isOpen: boolean;
  onDidDismiss: () => void;
  onChooseAnother: () => void;
  ariaLabel?: string;
  onBack?: () => void;
}

const ImageEdit: React.FC<ImageEditProps> = ({
  cropShape = "round",
  imageString,
  includeBinary,
  onCrop,
  isOpen,
  onDidDismiss,
  onChooseAnother,
  ariaLabel,
  onBack,
}) => {
  const { t } = useTranslation();
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(initialCroppedArea);
  const [image, setImage] = useState<string | undefined>(undefined);
  const [modalDidPresent, setModalDidPresent] = useState(false);
  const [fileInputValue, setFileInputValue] = useState<string | undefined>();

  // eslint-disable-next-line
  const onCropComplete = useCallback((_, croppedPixels) => {
    setCroppedAreaPixels(croppedPixels);
  }, []);

  const addCroppedImage = useCallback(async () => {
    if (!imageString && !image) {
      return;
    }
    try {
      const str = imageString || image;
      const data = await createCroppedImage(str!, croppedAreaPixels, includeBinary);
      if (!data.base64image) {
        throw new Error(data.error || "base64image failed to create");
      }

      onCrop(data.base64image, croppedAreaPixels, data.binary);
    } catch (e) {
      captureException(e);
    }
  }, [onCrop, imageString, croppedAreaPixels, image, includeBinary]);

  const onModalDidDismiss = () => {
    setImage(undefined);
    setModalDidPresent(false);
    onDidDismiss();
  };

  const fileInput = React.createRef<HTMLInputElement>();

  useEffect(() => {
    if (modalDidPresent) {
      setImage(imageString);
    }

    const file = fileInput.current?.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.addEventListener(
        "load",
        () => {
          setImage(reader.result as string);
        },
        false
      );

      if (file) {
        reader.readAsDataURL(file);
      }
    }
    // This wants to use fileInput as a dep but using that will trigger re-renders
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageString, modalDidPresent, fileInputValue, fileInput.current]);

  return (
    <IonModal
      onDidPresent={() => setModalDidPresent(true)}
      isOpen={isOpen}
      animated={false}
      onDidDismiss={onModalDidDismiss}>
      <Modal
        onClose={onDidDismiss}
        onBack={onBack}
        title={t("component-crop-photo.title.crop-photo")}
        ariaLabel={ariaLabel}>
        <Cropper
          image={image}
          classes={{ containerClassName: "mt-24 mb-32" }}
          crop={crop}
          zoom={zoom}
          aspect={cropShape === "round" ? 1 : 16 / 9}
          cropShape={cropShape}
          showGrid={false}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          style={{
            mediaStyle: { display: "block" },
            cropAreaStyle: { boxShadow: "0 0 .9em 1000px rgba(34,172,227, .5)" },
          }}
          onCropComplete={onCropComplete}
          aria-label={ariaLabel ? `${ariaLabel}_IMAGE_CROPPER` : "IMAGE_CROPPER"}
        />
        <div className="absolute bottom-0 inset-x-5 mb-4">
          <div className="flex flex-col items-center">
            {platform === "web" && (
              <input type="file" onChange={(e) => setFileInputValue(e.target.value)} ref={fileInput} />
            )}
            <Button onClick={addCroppedImage} ariaLabel={ariaLabel ? `${ariaLabel}_CROP_PHOTO` : "CROP_PHOTO_BUTTON"}>
              {t("edit-image.crop-photo.button")}
            </Button>
            <Button
              variant="text"
              onClick={onChooseAnother}
              className="mt-1"
              ariaLabel={ariaLabel ? `${ariaLabel}_CHOOSE_ANOTHER` : "CHOOSE_ANOTHER_BUTTON"}>
              {t("edit-image.cancel.choose-a-different-photo.button")}
            </Button>
          </div>
        </div>
      </Modal>
    </IonModal>
  );
};

export default ImageEdit;
