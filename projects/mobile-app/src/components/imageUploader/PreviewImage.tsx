import React, { useState } from "react";
import Button from "../Button/Button";
import { ProfileAvatar } from "../Avatar/Avatar";
import { useTranslation } from "react-i18next";
import { Rect } from "self-define-app";
import ImageUploader from "./ImageUploader";
import { EditIcon } from "assets/svgs/EditIcon";

interface Iprops {
  avatar: string;
  pixels: Rect;
  userName: string;
  displayName: string;
  handleFinish: (image: string, pixels: Rect) => void;
}

const PreviewImage: React.FC<Iprops> = ({ avatar, pixels, displayName, userName, handleFinish }) => {
  const { t } = useTranslation();
  const [preview, setPreview] = useState(avatar);
  const [dimensions, setDimensions] = useState(pixels);

  const handleChange = (image: string, pixels: Rect) => {
    setPreview(image);
    setDimensions(pixels);
  };
  const handleComplete = () => handleFinish(preview, dimensions);

  const EditButton = (
    <div
      className="w-full h-full bg-blue-dark rounded-full text-center flex place-items-center justify-center text-white fill-current border-2 border-white border-solid p-3"
      style={{ boxShadow: "0px 5px 7px -1px rgba(0,0,0,.22)" }}>
      <ImageUploader onFinish={handleChange}>
        <EditIcon />
      </ImageUploader>
    </div>
  );

  return (
    <>
      <div className="flex flex-col flex-grow justify-center place-items-center">
        <div className=" -mt-24 ">
          <ProfileAvatar name={displayName} username={userName} src={preview} size="large" action={EditButton} />
        </div>
        <div className="flex flex-row space-x-4 mt-10">
          <Button onClick={handleComplete}>{t("profile-preview.finish.button")}</Button>
        </div>
      </div>
    </>
  );
};

export default PreviewImage;
