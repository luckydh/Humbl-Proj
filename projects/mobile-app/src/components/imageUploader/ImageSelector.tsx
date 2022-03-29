import AvatarEdit from "assets/svgs/AvatarEdit";
import { Avatar } from "components/Avatar/Avatar";
import React from "react";
import { Rect } from "self-define-app";
import ImageUploader from "./ImageUploader";
import AvatarPlaceHolder from "assets/svgs/CameraIcon.svg";
import { AvatarLines } from "../../assets/svgs/AvatarLines";

export type ImageEditSelectorProps = {
  onFinish: (image: string, pixels: Rect) => void;
  image?: string;
};
const ImageEditSelector: React.FC<ImageEditSelectorProps> = ({ image, onFinish }) => (
    <div className="flex relative flex-col items-center">
      <div className="absolute -top-10 text-white">
        <AvatarLines />
      </div>
      <div className="m-auto relative">
        {!image && (
          <>
            <ImageUploader onFinish={onFinish}>
              <div className="relative w-auto">
                <Avatar src={AvatarPlaceHolder} size="large" />
              </div>
            </ImageUploader>
          </>
        )}
        {image && (
          <>
            <Avatar src={image} size="large" />
            <span className="absolute bottom-1 right-3">
              <ImageUploader onFinish={onFinish}>
                <div className="w-12">
                  <AvatarEdit />
                </div>
              </ImageUploader>
            </span>
          </>
        )}
      </div>
    </div>
  );
export default ImageEditSelector;
