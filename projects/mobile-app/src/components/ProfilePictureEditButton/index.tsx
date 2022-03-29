import { EditIcon } from "assets/svgs/EditIcon";
import ImageUploader from "components/imageUploader/ImageUploader";
import React, { FC } from "react";
import { Rect } from "self-define-app";

export interface IProps {
  onFinish: (image: string, pixels: Rect) => void;
}

const ProfilePictureEditButton: FC<IProps> = ({ onFinish }) => (
    <div className="w-full h-full bg-blue-dark rounded-full text-center flex place-items-center justify-center text-white fill-current border-2 border-white border-solid p-3 shadow-lg">
      <ImageUploader onFinish={onFinish}>
        <EditIcon />
      </ImageUploader>
    </div>
  );

export default ProfilePictureEditButton;
